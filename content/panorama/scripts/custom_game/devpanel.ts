/* Toggle functionality */
const collapseButton = $("#CollapseButton") as LabelPanel;
let expanded = false;
collapseButton.SetPanelEvent("onactivate", () => {
    $.GetContextPanel().ToggleClass("Collapsed");
    expanded = !expanded;

    collapseButton.text = expanded ? "X  DEV  X" : "^  DEV  ^";
    Game.EmitSound("ui_chat_slide_out");
});

/* Skip to section buttons */
const sections = {
    "CH1 - Opening": SectionName.Chapter1_Opening,
    "CH1 - Camera Unlock": SectionName.Chapter1_CameraUnlock,
    "CH1 - Leveling": SectionName.Chapter1_Leveling,
    "CH1 - Casting": SectionName.Chapter1_Casting,
    "CH2 - Opening": SectionName.Chapter2_Opening,
    "CH3": SectionName.Chapter3_Opening,
};

// Add a button for each section
for (const [sectionName, sectionCode] of Object.entries(sections)) {
    const button = addSkipToSectionButton(sectionName);
    button.SetPanelEvent("onactivate", () => {
        GameEvents.SendCustomGameEventToServer("skip_to_section", { section: sectionCode });
        Game.EmitSound("ui_generic_button_click");
    });
}

// Create a section button
function addSkipToSectionButton(sectionName: string): Panel {
    const button = $.CreatePanel("Label", $("#ButtonContainer"), "");
    button.AddClass("SkipButton");
    button.text = sectionName;

    return button;
}
