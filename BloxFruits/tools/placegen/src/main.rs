//! Generates the first version of `BloxFruits/BloxFruits.rbxl` from the Luau scripts in
//! `place/` plus the starter island geometry defined below.
//!
//! This is a one-time seed. After the place has been opened and saved in Roblox Studio, the
//! `.rbxl` in the repo is the source of truth; running this again would overwrite Studio edits.
//!
//! Script files map to instances by suffix:
//!   `Name.server.luau` -> Script, `Name.client.luau` -> LocalScript, `Name.luau` -> ModuleScript,
//!   directories -> Folder.
//!
//! Usage: `cargo run --release -- <place dir> <output .rbxl>`
//! Every script is compiled with the Luau compiler first, so syntax errors fail the build.

use std::{
    collections::BTreeMap,
    fs,
    io::BufWriter,
    path::{Path, PathBuf},
};

use rbx_dom_weak::{InstanceBuilder, WeakDom};
use rbx_types::{
    Attributes, BrickColor, CFrame, Color3, Color3uint8, Enum, Matrix3, UDim2, Variant, Vector3,
};

// ---------------------------------------------------------------------------------------------
// Enum values (from the Roblox API)

mod material {
    pub const SMOOTH_PLASTIC: u32 = 272;
    pub const NEON: u32 = 288;
    pub const WOOD: u32 = 512;
    pub const WOOD_PLANKS: u32 = 528;
    pub const SLATE: u32 = 800;
    pub const ROCK: u32 = 896;
    pub const METAL: u32 = 1088;
    pub const GRASS: u32 = 1280;
    pub const SAND: u32 = 1296;
    pub const FABRIC: u32 = 1312;
    pub const COBBLESTONE: u32 = 880;
}

const SHAPE_BALL: u32 = 0;
const SHAPE_CYLINDER: u32 = 2;

// ---------------------------------------------------------------------------------------------
// Math helpers

fn v3(x: f32, y: f32, z: f32) -> Vector3 {
    Vector3::new(x, y, z)
}

fn mul(a: &Matrix3, b: &Matrix3) -> Matrix3 {
    let r = |row: &Vector3, m: &Matrix3| {
        v3(
            row.x * m.x.x + row.y * m.y.x + row.z * m.z.x,
            row.x * m.x.y + row.y * m.y.y + row.z * m.z.y,
            row.x * m.x.z + row.y * m.y.z + row.z * m.z.z,
        )
    };
    Matrix3::new(r(&a.x, b), r(&a.y, b), r(&a.z, b))
}

/// Same as Roblox's `CFrame.Angles(rx, ry, rz)` (degrees), rows of the rotation matrix.
fn angles(rx: f32, ry: f32, rz: f32) -> Matrix3 {
    let (a, b, c) = (rx.to_radians(), ry.to_radians(), rz.to_radians());
    let mx = Matrix3::new(v3(1.0, 0.0, 0.0), v3(0.0, a.cos(), -a.sin()), v3(0.0, a.sin(), a.cos()));
    let my = Matrix3::new(v3(b.cos(), 0.0, b.sin()), v3(0.0, 1.0, 0.0), v3(-b.sin(), 0.0, b.cos()));
    let mz = Matrix3::new(v3(c.cos(), -c.sin(), 0.0), v3(c.sin(), c.cos(), 0.0), v3(0.0, 0.0, 1.0));
    mul(&mul(&mx, &my), &mz)
}

fn cf(x: f32, y: f32, z: f32) -> CFrame {
    CFrame::new(v3(x, y, z), Matrix3::identity())
}

fn cf_rot(x: f32, y: f32, z: f32, rx: f32, ry: f32, rz: f32) -> CFrame {
    CFrame::new(v3(x, y, z), angles(rx, ry, rz))
}

fn rgb(r: u8, g: u8, b: u8) -> Color3uint8 {
    Color3uint8::new(r, g, b)
}

// ---------------------------------------------------------------------------------------------
// Instance helpers

fn folder(name: &str) -> InstanceBuilder {
    InstanceBuilder::new("Folder").with_name(name)
}

struct PartSpec {
    class: &'static str,
    name: String,
    size: Vector3,
    cframe: CFrame,
    color: Color3uint8,
    material: u32,
    shape: Option<u32>,
    transparency: f32,
    can_collide: bool,
    can_query: bool,
}

fn part(name: &str, size: Vector3, cframe: CFrame, color: Color3uint8, material: u32) -> PartSpec {
    PartSpec {
        class: "Part",
        name: name.to_string(),
        size,
        cframe,
        color,
        material,
        shape: None,
        transparency: 0.0,
        can_collide: true,
        can_query: true,
    }
}

impl PartSpec {
    fn shape(mut self, shape: u32) -> Self {
        self.shape = Some(shape);
        self
    }
    fn wedge(mut self) -> Self {
        self.class = "WedgePart";
        self
    }
    fn ghost(mut self, transparency: f32) -> Self {
        self.transparency = transparency;
        self.can_collide = false;
        self.can_query = false;
        self
    }
    fn build(self) -> InstanceBuilder {
        let mut b = InstanceBuilder::new(self.class)
            .with_name(self.name)
            .with_property("Anchored", true)
            .with_property("Size", self.size)
            .with_property("CFrame", self.cframe)
            .with_property("Color", self.color)
            .with_property("Material", Enum::from_u32(self.material))
            .with_property("TopSurface", Enum::from_u32(0))
            .with_property("BottomSurface", Enum::from_u32(0))
            .with_property("Transparency", self.transparency)
            .with_property("CanCollide", self.can_collide)
            .with_property("CanQuery", self.can_query)
            .with_property("CanTouch", self.can_collide);
        if let Some(shape) = self.shape {
            b = b.with_property("Shape", Enum::from_u32(shape));
        }
        b
    }
}

fn attrs(pairs: &[(&str, Variant)]) -> Attributes {
    let mut a = Attributes::new();
    for (k, v) in pairs {
        a.insert(k.to_string(), v.clone());
    }
    a
}

// ---------------------------------------------------------------------------------------------
// Scripts

fn compile_check(path: &Path, source: &str) -> Result<(), String> {
    let lua = mlua::Lua::new();
    lua.load(source)
        .set_name(path.display().to_string())
        .into_function()
        .map(|_| ())
        .map_err(|e| e.to_string())
}

/// Turns a directory of `.luau` files into Folder/Script/LocalScript/ModuleScript builders.
fn scripts_from_dir(dir: &Path, errors: &mut Vec<String>) -> Vec<InstanceBuilder> {
    let mut entries: Vec<PathBuf> = fs::read_dir(dir)
        .unwrap_or_else(|e| panic!("reading {}: {e}", dir.display()))
        .map(|e| e.unwrap().path())
        .collect();
    entries.sort();
    let mut out = Vec::new();
    for path in entries {
        let file_name = path.file_name().unwrap().to_string_lossy().to_string();
        if path.is_dir() {
            out.push(folder(&file_name).with_children(scripts_from_dir(&path, errors)));
            continue;
        }
        let Some(stem) = file_name.strip_suffix(".luau") else {
            continue;
        };
        let (class, name) = if let Some(n) = stem.strip_suffix(".server") {
            ("Script", n)
        } else if let Some(n) = stem.strip_suffix(".client") {
            ("LocalScript", n)
        } else {
            ("ModuleScript", stem)
        };
        let source = fs::read_to_string(&path).unwrap();
        if let Err(e) = compile_check(&path, &source) {
            errors.push(e);
        }
        out.push(
            InstanceBuilder::new(class)
                .with_name(name)
                .with_property("Source", source),
        );
    }
    out
}

/// Children of a service directory in `place/`, or nothing if it doesn't exist.
fn service_scripts(root: &Path, service: &str, errors: &mut Vec<String>) -> Vec<InstanceBuilder> {
    let dir = root.join(service);
    if dir.is_dir() {
        scripts_from_dir(&dir, errors)
    } else {
        Vec::new()
    }
}

// ---------------------------------------------------------------------------------------------
// The starter island

fn palm_tree(name: &str, x: f32, z: f32, lean: f32, turn: f32) -> InstanceBuilder {
    let trunk_color = rgb(124, 92, 62);
    let leaf_color = rgb(76, 150, 62);
    let mut model = InstanceBuilder::new("Model").with_name(name);
    // Trunk: three segments leaning a little further each time.
    let mut base = v3(x, 3.0, z);
    let seg = 5.0;
    for i in 0..3 {
        let tilt = lean * (i as f32 + 1.0) / 3.0;
        let rot = angles(0.0, turn, 0.0);
        let tilt_rot = mul(&rot, &angles(tilt, 0.0, 0.0));
        // Direction of the segment's Y axis in world space is the second column.
        let up = v3(tilt_rot.x.y, tilt_rot.y.y, tilt_rot.z.y);
        let center = v3(base.x + up.x * seg / 2.0, base.y + up.y * seg / 2.0, base.z + up.z * seg / 2.0);
        model.add_child(
            part(
                &format!("Trunk{}", i + 1),
                v3(1.6 - i as f32 * 0.2, seg + 0.4, 1.6 - i as f32 * 0.2),
                CFrame::new(center, tilt_rot),
                trunk_color,
                material::WOOD,
            )
            .build(),
        );
        base = v3(base.x + up.x * seg, base.y + up.y * seg, base.z + up.z * seg);
    }
    // Leaves: flat slabs fanning out from the top, drooping outward.
    for i in 0..6 {
        let yaw = turn + i as f32 * 60.0;
        let r = angles(0.0, yaw, 0.0);
        let dir = v3(r.x.z, 0.0, r.z.z); // local +Z in world
        let center = v3(base.x + dir.x * 3.2, base.y - 0.6, base.z + dir.z * 3.2);
        model.add_child(
            part(
                &format!("Leaf{}", i + 1),
                v3(2.4, 0.3, 7.0),
                CFrame::new(center, mul(&r, &angles(-18.0, 0.0, 0.0))),
                leaf_color,
                material::GRASS,
            )
            .build(),
        );
    }
    model.add_child(
        part("Coconuts", v3(1.2, 1.2, 1.2), cf(base.x, base.y - 0.9, base.z), rgb(90, 64, 40), material::WOOD)
            .shape(SHAPE_BALL)
            .build(),
    );
    model
}

fn hut(name: &str, x: f32, z: f32, yaw: f32, wall: Color3uint8) -> InstanceBuilder {
    let mut model = InstanceBuilder::new("Model").with_name(name);
    let r = angles(0.0, yaw, 0.0);
    let at = |lx: f32, ly: f32, lz: f32| -> Vector3 {
        v3(
            x + r.x.x * lx + r.x.y * ly + r.x.z * lz,
            3.0 + ly,
            z + r.z.x * lx + r.z.y * ly + r.z.z * lz,
        )
    };
    let (w, d, h) = (14.0, 12.0, 9.0);
    model.add_child(part("Walls", v3(w, h, d), CFrame::new(at(0.0, h / 2.0, 0.0), r), wall, material::WOOD_PLANKS).build());
    model.add_child(
        part("Door", v3(3.6, 6.5, 0.4), CFrame::new(at(0.0, 3.25, d / 2.0 + 0.1), r), rgb(80, 52, 32), material::WOOD).build(),
    );
    for (i, side) in [-1.0f32, 1.0].iter().enumerate() {
        model.add_child(
            part(
                &format!("Window{}", i + 1),
                v3(2.4, 2.4, 0.3),
                CFrame::new(at(side * 4.2, 5.2, d / 2.0 + 0.1), r),
                rgb(120, 180, 220),
                material::SMOOTH_PLASTIC,
            )
            .build(),
        );
    }
    // Roof: two wedges meeting at the ridge.
    let roof = rgb(150, 70, 45);
    let roof_h = 4.0;
    for (i, side) in [-1.0f32, 1.0].iter().enumerate() {
        let rot = mul(&r, &angles(0.0, if *side < 0.0 { -90.0 } else { 90.0 }, 0.0));
        model.add_child(
            part(
                &format!("Roof{}", i + 1),
                v3(d + 2.0, roof_h, w / 2.0 + 1.0),
                CFrame::new(at(side * (w / 4.0 + 0.5), h + roof_h / 2.0, 0.0), rot),
                roof,
                material::SLATE,
            )
            .wedge()
            .build(),
        );
    }
    model
}

fn crate_box(name: &str, x: f32, y: f32, z: f32, yaw: f32, s: f32) -> InstanceBuilder {
    part(name, v3(s, s, s), cf_rot(x, y + s / 2.0, z, 0.0, yaw, 0.0), rgb(150, 110, 70), material::WOOD_PLANKS).build()
}

fn tent(name: &str, x: f32, z: f32, yaw: f32, color: Color3uint8) -> InstanceBuilder {
    let mut model = InstanceBuilder::new("Model").with_name(name);
    let r = angles(0.0, yaw, 0.0);
    for (i, side) in [-1.0f32, 1.0].iter().enumerate() {
        let rot = mul(&r, &angles(0.0, if *side < 0.0 { -90.0 } else { 90.0 }, 0.0));
        let off = v3(r.x.x * side * 2.5, 0.0, r.z.x * side * 2.5);
        model.add_child(
            part(&format!("Side{}", i + 1), v3(8.0, 5.0, 5.0), CFrame::new(v3(x + off.x, 5.5, z + off.z), rot), color, material::FABRIC)
                .wedge()
                .build(),
        );
    }
    model
}

fn campfire(x: f32, z: f32) -> InstanceBuilder {
    let mut model = InstanceBuilder::new("Model").with_name("Campfire");
    for i in 0..6 {
        let a = i as f32 * 60.0;
        let (s, c) = (a.to_radians().sin(), a.to_radians().cos());
        model.add_child(
            part(&format!("Stone{}", i + 1), v3(1.2, 0.9, 1.2), cf_rot(x + s * 2.0, 3.4, z + c * 2.0, 0.0, a, 0.0), rgb(110, 110, 115), material::ROCK)
                .build(),
        );
    }
    let logs = part("Logs", v3(0.7, 0.7, 3.0), cf_rot(x, 3.4, z, 0.0, 30.0, 0.0), rgb(90, 60, 35), material::WOOD)
        .build()
        .with_child(InstanceBuilder::new("Fire").with_name("Fire").with_property("Size", 5.0f32).with_property("Heat", 9.0f32))
        .with_child(
            InstanceBuilder::new("PointLight")
                .with_property("Color", Color3::new(1.0, 0.6, 0.25))
                .with_property("Range", 22.0f32)
                .with_property("Brightness", 2.0f32),
        );
    model.add_child(logs);
    model
}

fn sign(name: &str, text: &str, x: f32, z: f32, yaw: f32) -> InstanceBuilder {
    let mut model = InstanceBuilder::new("Model").with_name(name);
    model.add_child(part("Post", v3(0.6, 6.0, 0.6), cf_rot(x, 6.0, z, 0.0, yaw, 0.0), rgb(100, 70, 45), material::WOOD).build());
    let board = part("Board", v3(7.0, 2.2, 0.4), cf_rot(x, 8.2, z, 0.0, yaw, 0.0), rgb(160, 120, 75), material::WOOD_PLANKS)
        .build()
        .with_child(
            InstanceBuilder::new("SurfaceGui")
                .with_property("Face", Enum::from_u32(5)) // Front
                .with_property("PixelsPerStud", 50.0f32)
                .with_property("SizingMode", Enum::from_u32(1)) // PixelsPerStud
                .with_child(
                    InstanceBuilder::new("TextLabel")
                        .with_property("Size", UDim2::new(rbx_types::UDim::new(1.0, 0), rbx_types::UDim::new(1.0, 0)))
                        .with_property("BackgroundTransparency", 1.0f32)
                        .with_property("Text", text.to_string())
                        .with_property("TextScaled", true)
                        .with_property("TextColor3", Color3::new(0.18, 0.1, 0.05))
                        .with_property("Font", Enum::from_u32(4)), // SourceSansBold
                ),
        );
    model.add_child(board);
    model
}

fn starter_island() -> InstanceBuilder {
    let sand = rgb(236, 214, 160);
    let grass = rgb(98, 170, 76);

    let mut geometry = folder("Geometry");
    geometry.add_child(
        part("Beach", v3(10.0, 250.0, 250.0), cf_rot(0.0, -3.0, 0.0, 0.0, 0.0, 90.0), sand, material::SAND)
            .shape(SHAPE_CYLINDER)
            .build(),
    );
    geometry.add_child(
        part("Grass", v3(2.0, 196.0, 196.0), cf_rot(0.0, 2.0, 0.0, 0.0, 0.0, 90.0), grass, material::GRASS)
            .shape(SHAPE_CYLINDER)
            .build(),
    );
    // A dirt path from the spawn to the bandit camp.
    for (i, (x, z, yaw)) in [(0.0f32, 22.0f32, 0.0f32), (-6.0, 0.0, 15.0), (-14.0, -22.0, 25.0)].iter().enumerate() {
        geometry.add_child(
            part(&format!("Path{}", i + 1), v3(7.0, 0.2, 24.0), cf_rot(*x, 3.05, *z, 0.0, *yaw, 0.0), rgb(170, 140, 95), material::SAND).build(),
        );
    }
    // Dock
    geometry.add_child(part("Dock", v3(14.0, 1.0, 50.0), cf(0.0, 2.5, 122.0), rgb(140, 100, 62), material::WOOD_PLANKS).build());
    for (i, (x, z)) in [(-6.5f32, 102.0f32), (6.5, 102.0), (-6.5, 122.0), (6.5, 122.0), (-6.5, 145.0), (6.5, 145.0)].iter().enumerate() {
        geometry.add_child(part(&format!("DockPost{}", i + 1), v3(1.2, 12.0, 1.2), cf(*x, -2.0, *z), rgb(100, 72, 45), material::WOOD).build());
    }
    // Rocks
    for (i, (x, z, s, yaw)) in [(60.0f32, -60.0f32, 7.0f32, 20.0f32), (70.0, 40.0, 5.0, 60.0), (-75.0, -10.0, 8.0, 35.0), (35.0, 80.0, 4.0, 10.0)]
        .iter()
        .enumerate()
    {
        geometry.add_child(
            part(&format!("Rock{}", i + 1), v3(*s * 1.4, *s, *s), cf_rot(*x, 2.5 + s / 2.0, *z, 8.0, *yaw, 12.0), rgb(125, 125, 130), material::ROCK).build(),
        );
    }

    let mut props = folder("Props");
    props.add_child(hut("HutEast", 42.0, -8.0, -90.0, rgb(200, 170, 120)));
    props.add_child(hut("HutSouthEast", 48.0, 34.0, -120.0, rgb(190, 150, 110)));
    props.add_child(hut("HutWest", -58.0, 40.0, 110.0, rgb(205, 180, 130)));
    // Sword dealer stall: counter between the dealer and the customer, awning on posts.
    let mut stall = InstanceBuilder::new("Model").with_name("SwordStall");
    stall.add_child(part("Counter", v3(10.0, 3.0, 2.0), cf(-26.0, 4.5, 22.0), rgb(130, 90, 55), material::WOOD_PLANKS).build());
    for (i, (x, z)) in [(-31.0f32, 16.0f32), (-21.0, 16.0), (-31.0, 23.5), (-21.0, 23.5)].iter().enumerate() {
        stall.add_child(part(&format!("Post{}", i + 1), v3(0.7, 9.0, 0.7), cf(*x, 7.5, *z), rgb(100, 70, 45), material::WOOD).build());
    }
    stall.add_child(part("Awning", v3(12.0, 0.6, 9.5), cf_rot(-26.0, 12.2, 19.8, -6.0, 0.0, 0.0), rgb(60, 90, 160), material::FABRIC).build());
    stall.add_child(part("Rack", v3(6.0, 4.0, 0.5), cf(-26.0, 5.0, 15.6), rgb(90, 60, 38), material::WOOD).build());
    for i in 0..3 {
        stall.add_child(
            part(&format!("DisplayBlade{}", i + 1), v3(0.2, 3.4, 0.35), cf_rot(-28.0 + i as f32 * 2.0, 5.4, 15.3, 0.0, 0.0, 8.0), rgb(215, 222, 230), material::METAL).build(),
        );
    }
    props.add_child(stall);
    props.add_child(sign("SwordSign", "SWORDS", -34.0, 25.0, 30.0));
    props.add_child(sign("CampSign", "BANDIT CAMP - KEEP OUT", -8.0, -30.0, 10.0));
    // Bandit camp
    let mut camp = InstanceBuilder::new("Model").with_name("BanditCamp");
    camp.add_child(tent("Tent1", -40.0, -62.0, 20.0, rgb(150, 60, 50)));
    camp.add_child(tent("Tent2", -10.0, -70.0, -15.0, rgb(120, 100, 70)));
    camp.add_child(tent("Tent3", -48.0, -38.0, 70.0, rgb(150, 60, 50)));
    camp.add_child(campfire(-22.0, -52.0));
    for (i, (x, z, yaw, s)) in [(-2.0f32, -48.0f32, 10.0f32, 3.0f32), (0.0, -45.0, 40.0, 2.2), (-52.0, -58.0, 25.0, 3.0), (-30.0, -75.0, 5.0, 2.5)]
        .iter()
        .enumerate()
    {
        camp.add_child(crate_box(&format!("Crate{}", i + 1), *x, 3.0, *z, *yaw, *s));
    }
    // Fence posts around the camp's back edge
    for i in 0..10 {
        let x = -58.0 + i as f32 * 6.0;
        camp.add_child(part(&format!("Fence{}", i + 1), v3(0.8, 5.0, 0.8), cf_rot(x, 5.5, -82.0, 0.0, 0.0, (i % 3) as f32 * 4.0 - 4.0), rgb(110, 80, 50), material::WOOD).build());
    }
    camp.add_child(part("FenceRail", v3(58.0, 0.6, 0.5), cf(-31.0, 6.5, -82.0), rgb(110, 80, 50), material::WOOD).build());
    props.add_child(camp);
    // Palm trees around the island
    let trees = [
        (70.0f32, 10.0f32, 12.0f32, 30.0f32),
        (62.0, 60.0, 16.0, 200.0),
        (20.0, 78.0, 10.0, 160.0),
        (-30.0, 78.0, 14.0, 90.0),
        (-80.0, 20.0, 12.0, 250.0),
        (-80.0, -40.0, 16.0, 300.0),
        (-60.0, -85.0, 10.0, 330.0),
        (20.0, -85.0, 14.0, 20.0),
        (55.0, -45.0, 12.0, 60.0),
        (-15.0, 55.0, 8.0, 120.0),
        (82.0, -20.0, 15.0, 80.0),
        (-90.0, 70.0, 12.0, 230.0),
    ];
    let mut tree_folder = folder("Trees");
    for (i, (x, z, lean, turn)) in trees.iter().enumerate() {
        tree_folder.add_child(palm_tree(&format!("Palm{}", i + 1), *x, *z, *lean, *turn));
    }
    props.add_child(tree_folder);

    // NPC anchors: the World service puts an NPC on each and hides the anchor at runtime.
    let npcs = folder("NPCs")
        .with_child(
            part("QuestGiver", v3(3.0, 1.0, 3.0), cf_rot(14.0, 3.5, 20.0, 0.0, 200.0, 0.0), rgb(255, 215, 60), material::NEON)
                .build()
                .with_property(
                    "Attributes",
                    attrs(&[("Role", Variant::String("QuestGiver".into())), ("GiverId", Variant::String("PirateStarter".into()))]),
                ),
        )
        .with_child(
            part("SwordDealer", v3(3.0, 1.0, 3.0), cf_rot(-26.0, 3.5, 19.0, 0.0, 180.0, 0.0), rgb(120, 220, 255), material::NEON)
                .build()
                .with_property(
                    "Attributes",
                    attrs(&[("Role", Variant::String("Shop".into())), ("ShopId", Variant::String("StarterSwords".into()))]),
                ),
        );

    let zones = folder("EnemyZones").with_child(
        part("BanditZone", v3(64.0, 4.0, 42.0), cf(-24.0, 5.0, -56.0), rgb(255, 60, 60), material::SMOOTH_PLASTIC)
            .ghost(0.8)
            .build()
            .with_property(
                "Attributes",
                attrs(&[("EnemyType", Variant::String("Bandit".into())), ("Count", Variant::Float64(6.0))]),
            ),
    );

    let region = part("Region", v3(300.0, 120.0, 300.0), cf(0.0, 40.0, 0.0), rgb(255, 255, 255), material::SMOOTH_PLASTIC)
        .ghost(1.0)
        .build();

    InstanceBuilder::new("Model")
        .with_name("PirateStarter")
        .with_property("Attributes", attrs(&[("DisplayName", Variant::String("Pirate Starter Island".into()))]))
        .with_child(geometry)
        .with_child(props)
        .with_child(npcs)
        .with_child(zones)
        .with_child(region)
}

// ---------------------------------------------------------------------------------------------

const REMOTE_EVENTS: &[&str] = &[
    // client -> server
    "Combat",
    "Dash",
    "SpendStat",
    "ResetStats",
    "QuestAction",
    "ShopAction",
    "ChooseTeam",
    // server -> client
    "OpenDialog",
    "DamageNumber",
    "Notify",
    "Effect",
    "MoveUsed",
];

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let root = PathBuf::from(args.get(1).map(String::as_str).unwrap_or("place"));
    let output = PathBuf::from(args.get(2).map(String::as_str).unwrap_or("BloxFruits.rbxl"));
    let mut errors = Vec::new();

    // ReplicatedStorage.Shared gets the Net folder of remotes on top of the scripts.
    let net = folder("Net").with_children(REMOTE_EVENTS.iter().map(|n| InstanceBuilder::new("RemoteEvent").with_name(*n)));
    let shared = folder("Shared")
        .with_children(scripts_from_dir(&root.join("ReplicatedStorage").join("Shared"), &mut errors))
        .with_child(net);
    let replicated = InstanceBuilder::new("ReplicatedStorage").with_child(shared);

    let server = InstanceBuilder::new("ServerScriptService").with_children(service_scripts(&root, "ServerScriptService", &mut errors));

    let player_scripts = InstanceBuilder::new("StarterPlayerScripts")
        .with_children(service_scripts(&root.join("StarterPlayer"), "StarterPlayerScripts", &mut errors));
    let starter_player = InstanceBuilder::new("StarterPlayer")
        .with_property("CameraMaxZoomDistance", 60.0f32)
        .with_child(player_scripts)
        .with_child(InstanceBuilder::new("StarterCharacterScripts"));

    if !errors.is_empty() {
        for e in &errors {
            eprintln!("Luau error: {e}");
        }
        std::process::exit(1);
    }

    let workspace = InstanceBuilder::new("Workspace")
        .with_property("Attributes", attrs(&[("GenerateSea", Variant::Bool(true))]))
        .with_child(InstanceBuilder::new("Terrain"))
        .with_child(folder("Islands").with_child(starter_island()))
        .with_child(
            InstanceBuilder::new("SpawnLocation")
                .with_name("StarterSpawn")
                .with_property("Anchored", true)
                .with_property("Size", v3(10.0, 1.0, 10.0))
                .with_property("CFrame", cf(0.0, 3.5, 42.0))
                .with_property("Color", rgb(240, 240, 240))
                .with_property("Material", Enum::from_u32(material::COBBLESTONE))
                .with_property("TopSurface", Enum::from_u32(0))
                .with_property("BottomSurface", Enum::from_u32(0))
                .with_property("Neutral", true)
                .with_property("AllowTeamChangeOnTouch", false)
                .with_property("Duration", 3i32),
        )
        .with_child(
            part("SeaPreview", v3(1600.0, 24.0, 1600.0), cf(0.0, -12.0, 0.0), rgb(40, 110, 190), material::SMOOTH_PLASTIC)
                .ghost(0.5)
                .build(),
        );

    let lighting = InstanceBuilder::new("Lighting")
        .with_property("ClockTime", 14.0f32)
        .with_property("Brightness", 2.5f32)
        .with_property("Ambient", Color3::new(0.35, 0.35, 0.4))
        .with_property("OutdoorAmbient", Color3::new(0.55, 0.55, 0.6))
        .with_property("GlobalShadows", true)
        .with_child(
            InstanceBuilder::new("Atmosphere")
                .with_property("Density", 0.28f32)
                .with_property("Haze", 1.2f32)
                .with_property("Color", Color3::new(0.78, 0.86, 0.95))
                .with_property("Decay", Color3::new(0.45, 0.6, 0.8)),
        )
        .with_child(
            InstanceBuilder::new("ColorCorrectionEffect")
                .with_property("Saturation", 0.15f32)
                .with_property("Contrast", 0.05f32),
        )
        .with_child(InstanceBuilder::new("BloomEffect").with_property("Intensity", 0.4f32).with_property("Threshold", 1.4f32));

    let teams = InstanceBuilder::new("Teams")
        .with_child(
            InstanceBuilder::new("Team")
                .with_name("Pirates")
                .with_property("TeamColor", BrickColor::BrightRed)
                .with_property("AutoAssignable", false),
        )
        .with_child(
            InstanceBuilder::new("Team")
                .with_name("Marines")
                .with_property("TeamColor", BrickColor::BrightBlue)
                .with_property("AutoAssignable", false),
        );

    let dom = WeakDom::new(
        InstanceBuilder::new("DataModel")
            .with_child(workspace)
            .with_child(lighting)
            .with_child(replicated)
            .with_child(server)
            .with_child(InstanceBuilder::new("ServerStorage"))
            .with_child(starter_player)
            .with_child(InstanceBuilder::new("StarterGui"))
            .with_child(InstanceBuilder::new("StarterPack"))
            .with_child(teams)
            .with_child(InstanceBuilder::new("SoundService")),
    );

    let top: Vec<_> = dom.root().children().to_vec();
    let file = BufWriter::new(fs::File::create(&output).expect("create output"));
    rbx_binary::to_writer(file, &dom, &top).expect("write rbxl");

    // Summary so the build log shows what went in.
    let mut counts: BTreeMap<String, usize> = BTreeMap::new();
    for inst in dom.descendants() {
        *counts.entry(inst.class.to_string()).or_default() += 1;
    }
    println!("Wrote {}", output.display());
    for (class, n) in counts {
        println!("  {class}: {n}");
    }
}
