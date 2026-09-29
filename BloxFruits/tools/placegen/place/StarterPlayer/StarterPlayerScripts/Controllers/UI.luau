-- Small helpers for building scale-based UI in code, plus the shared colour theme.

local UserInputService = game:GetService("UserInputService")

local UI = {}

UI.Theme = {
	Panel = Color3.fromRGB(22, 26, 38),
	PanelLight = Color3.fromRGB(38, 44, 62),
	Stroke = Color3.fromRGB(0, 0, 0),
	Text = Color3.fromRGB(245, 245, 245),
	SubText = Color3.fromRGB(180, 190, 210),
	Accent = Color3.fromRGB(255, 196, 0),
	Health = Color3.fromRGB(70, 200, 80),
	Energy = Color3.fromRGB(60, 140, 255),
	Exp = Color3.fromRGB(255, 205, 60),
	Beli = Color3.fromRGB(110, 230, 110),
	Good = Color3.fromRGB(70, 180, 90),
	Bad = Color3.fromRGB(200, 60, 60),
	Button = Color3.fromRGB(58, 92, 170),
	ButtonDisabled = Color3.fromRGB(70, 70, 80),
}

-- True on phones and tablets (touch screen and no keyboard).
UI.IsTouch = UserInputService.TouchEnabled and not UserInputService.KeyboardEnabled

-- Creates an instance with properties and children: UI.new("Frame", { Size = ... }, { child })
function UI.new(className: string, props: { [string]: any }?, children: { Instance }?): any
	local instance = Instance.new(className)
	local parent = nil
	for key, value in props or {} do
		if key == "Parent" then
			parent = value
		else
			(instance :: any)[key] = value
		end
	end
	for _, child in children or {} do
		child.Parent = instance
	end
	if parent then
		instance.Parent = parent
	end
	return instance
end

function UI.corner(radius: number?): UICorner
	return UI.new("UICorner", { CornerRadius = UDim.new(radius or 0.2, 0) })
end

function UI.stroke(thickness: number?, color: Color3?): UIStroke
	return UI.new("UIStroke", {
		Thickness = thickness or 2,
		Color = color or UI.Theme.Stroke,
		ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
	})
end

function UI.aspect(ratio: number): UIAspectRatioConstraint
	return UI.new("UIAspectRatioConstraint", { AspectRatio = ratio })
end

function UI.textLimit(maxSize: number, minSize: number?): UITextSizeConstraint
	return UI.new("UITextSizeConstraint", { MaxTextSize = maxSize, MinTextSize = minSize or 8 })
end

-- A text label with outlined, scaled text.
function UI.label(props: { [string]: any }, maxTextSize: number?): TextLabel
	local defaults = {
		BackgroundTransparency = 1,
		Font = Enum.Font.GothamBold,
		TextColor3 = UI.Theme.Text,
		TextScaled = true,
		TextStrokeTransparency = 0.4,
	}
	for key, value in props do
		defaults[key] = value
	end
	return UI.new("TextLabel", defaults, { UI.textLimit(maxTextSize or 24) })
end

function UI.button(props: { [string]: any }, maxTextSize: number?): TextButton
	local defaults = {
		BackgroundColor3 = UI.Theme.Button,
		AutoButtonColor = true,
		Font = Enum.Font.GothamBold,
		TextColor3 = UI.Theme.Text,
		TextScaled = true,
		TextStrokeTransparency = 0.5,
	}
	for key, value in props do
		defaults[key] = value
	end
	return UI.new("TextButton", defaults, { UI.corner(0.25), UI.stroke(1.5), UI.textLimit(maxTextSize or 22) })
end

-- A progress bar. Returns the bar frame, its fill and its caption label.
function UI.bar(props: { [string]: any }, color: Color3): (Frame, Frame, TextLabel)
	local bar = UI.new("Frame", {
		BackgroundColor3 = Color3.fromRGB(15, 15, 20),
		BorderSizePixel = 0,
	}, { UI.corner(0.3), UI.stroke(1.5) })
	for key, value in props do
		(bar :: any)[key] = value
	end
	local fill = UI.new("Frame", {
		Name = "Fill",
		BackgroundColor3 = color,
		BorderSizePixel = 0,
		Size = UDim2.fromScale(1, 1),
		Parent = bar,
	}, { UI.corner(0.3) })
	local caption = UI.label({
		Name = "Caption",
		Size = UDim2.fromScale(1, 1),
		ZIndex = 3,
		Parent = bar,
	}, 16)
	return bar, fill, caption
end

function UI.formatNumber(n: number): string
	local s = tostring(math.floor(n))
	local formatted = s:reverse():gsub("(%d%d%d)", "%1,"):reverse()
	if formatted:sub(1, 1) == "," then
		formatted = formatted:sub(2)
	end
	return formatted
end

return UI
