
function GenerateCounterChart(element) {
    const data = document.getElementById("DataInput").value;
    const lines = data.split(/\r?\n/);
    const counters = {};
    let output = "<table class='resultTable'><caption class='caption'>Armor Type</caption>";

    if (lines.length == 0) {
        alert("Please enter text, with one line per item, into the text area.");
        return;
    }

    lines.forEach(line => {
        line = line.trim();
        const items = line.split(/:| /);

        if (!counters[items[1]]) {
            counters[items[1]] = {}
        }

        counters[items[1]][items[2]] = items[3];
    });

    // Create the header row.
    output += "<thread><tr class='tableHeaders'><th>Damage Type</th>"
    for (const armorType in counters[Object.keys(counters)[0]]) {
        output += `<th class="armorHeader" title="${GetArmorShips(armorType)}">${armorType}</th>`;
    }
    output += "</tr></thread><tbody>";

    for (const damageType in counters) {
        output += `<tr class='tableHeaders'><td class="damageHeader">${damageType}</td>`;
        for (const armorType in counters[damageType]) {
            output += `<td class=${GetCellClass(counters[damageType][armorType])}>${counters[damageType][armorType]}</td>`
        }
        output += "</tr>"
    }

    output += "</tbody></table>"

    const resultElement = document.getElementById("Results");
    resultElement.innerHTML = output;
}

function GetCellClass(damageMultiplier) {
    if (damageMultiplier >= 2) {
        return "excellent";
    }
    else if (damageMultiplier >= 1.5) {
        return "great";
    }    
    else if (damageMultiplier >= 1) {
        return "good";
    }
    else if (damageMultiplier >= 0.5) {
        return "average";
    }
    else {
        return "weak";
    }
}

function GetArmorShips(armorType) {
    switch(armorType) {
        case "CapitalShip":
            return "All Capitalships";
        case "VeryLight":
            return "Fighters, Corvettes";
        case "Light":
            return "Long Range, Siege, Scout, Colony Frigates, Antimodule Cruisers, and Bombers";
        case "Medium":
            return "Light Frigates";
        case "Heavy":
            return "Antifighter Frigates, Support and Carrier Cruisers";
        case "VeryHeavy":
            return "Heavy Cruisers";
        case "Module":
            return "Structures and Starbases";
        case "Pirate":
            return "Pirate Ships";
        case "Titan":
            return "All Titans";
        default:
            return "";
    }
}