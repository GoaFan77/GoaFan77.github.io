
function Initialize() {
    document.querySelectorAll("input[type=checkbox]").forEach(mod => mod.addEventListener("click", () => GenerateModOrder()));
    document.querySelectorAll("input[type=radio]").forEach(mod => mod.addEventListener("click", () => GenerateModOrder()));
}

function UpdateMainMod() {
    const selectedMod = document.querySelector('input[name="MainMod"]:checked').value;
    document.querySelectorAll("input[type=checkbox]").forEach(mod => {
        if(!mod.dataset.mods.includes(selectedMod)) {
            mod.parentNode.style.visibility = "hidden";
            mod.checked = false;
        }
        else {
            mod.parentNode.style.visibility = "visible";
        }
    });
}

function GenerateModOrder() {
    const E4X = document.getElementById("MainModE4X");

    // Start by adding the main mods to the list.
    let selectedMods = [{priority: E4X.dataset.modPriority, name: E4X.dataset.modName}];
    const mainMod = document.querySelector('input[name="MainMod"]:checked').value;

    if (mainMod === "INT") {
        const INT = document.getElementById("MainModINT");
        selectedMods.push({priority: INT.dataset.modPriority, name: INT.dataset.modName});
    }

    // Get all checked minimods and add them to the list.
    document.querySelectorAll("input[type=checkbox]:checked").forEach(mod => {
        // Options that actually enable multiple minimods will have their options delimited by "|"
        if (mod.dataset.modName.includes('|')) {
            const modNames = mod.dataset.modName.split('|');
            const modPriorities = mod.dataset.modPriority.split('|');
            const mainMods = mod.dataset.mods.split('|');
            for (i = 0; i < modNames.length; i++) {
                if (mainMods[i].includes(mainMod)) {
                    selectedMods.push({priority: modPriorities[i], name: modNames[i].replace('PFX', mainMod)})
                }              
            }
        } 
        else {
            selectedMods.push({priority: mod.dataset.modPriority, name: mod.dataset.modName.replace('PFX', mainMod)});
        }
    });

    // Sort mods by priority in descending order. Mods with higher priority are printed first.
    selectedMods = selectedMods.sort((a, b) => b.priority - a.priority);

    // Build the EnabledMods text.
    let modOrder = "TXT2\n"
    modOrder += "SinsArchiveVersion 194\n"
    modOrder += "Version 0\n"
    modOrder += "enabledModNameCount " + selectedMods.length + "\n";
    selectedMods.forEach(mod => {
        modOrder += 'enabledModName "' + mod.name + '"\n';
    });

    document.getElementById("Results").innerHTML = modOrder;
}

function CopyClipboard() {
    const EnabledMods = document.getElementById("Results").innerHTML;
    navigator.clipboard.writeText(EnabledMods);
}

function DownloadEnabledMods() {
    let enabledMods = new Blob([document.getElementById("Results").innerHTML], {type: "text/plain;charset=utf-8"});
    saveAs(enabledMods, "EnabledMods.txt");
}