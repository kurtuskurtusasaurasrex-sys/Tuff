// Prints a place file's tree with property types, for checking generated output.
use std::{fs::File, io::BufReader};
fn main() {
    let path = std::env::args().nth(1).expect("path");
    let filter = std::env::args().nth(2).unwrap_or_default();
    let dom = rbx_binary::from_reader(BufReader::new(File::open(path).unwrap())).unwrap();
    for inst in dom.descendants() {
        let full = dom.full_path_of(inst.referent(), ".");
        if !full.contains(&filter) { continue; }
        println!("{} ({})", full, inst.class);
        let mut props: Vec<_> = inst.properties.iter().collect();
        props.sort_by_key(|(k, _)| k.as_str().to_string());
        for (k, v) in props {
            let s = format!("{:?}", v);
            println!("    {} = {}", k, if s.len() > 90 { format!("{}...", &s[..90]) } else { s });
        }
    }
}
