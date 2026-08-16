const killerPerks = [
    "Barbecue & Chilli", "Corrupt Intervention", "Hex: Ruin", "Pop Goes the Weasel",
    "Tinkerer", "A Nurse's Calling", "Sloppy Butcher", "Thanatophobia",
    "Whispers", "Bitter Murmur", "Deerstalker", "Monitor & Abuse",
    "Save the Best for Last", "Enduring", "Spirit Fury", "Bamboozle",
    "Brutal Strength", "Agitation", "Iron Grasp", "Mad Grit",
    "Fire Up", "Hex: Devour Hope", "Hex: No One Escapes Death", "Blood Warden",
    "Remember Me", "Rancor", "Territorial Imperative", "Nowhere to Hide",
    "Discordance", "Surveillance", "Overcharge", "Call of Brine",
    "Eruption", "Deadlock", "Scourge Hook: Pain Resonance", "Grim Embrace",
    "Dragon's Grip", "Franklin's Demise", "Distressing", "Unnerving Presence",
    "Coulrophobia", "Furtive Chase", "Predator", "Beast of Prey",
    "Insidious", "Shadowborn", "Lightborn", "Hoarder",
    "Zanshin Tactics", "Gearhead", "Trail of Torment", "Hex: Undying"
];

const survivorPerks = [
    "Adrenaline", "Borrowed Time", "Bond", "Kindred",
    "Self-Care", "Sprint Burst", "Dead Hard", "Decisive Strike",
    "Unbreakable", "We'll Make It", "Prove Thyself", "Windows of Opportunity",
    "Déjà Vu", "Iron Will", "Resilience", "Spine Chill",
    "Empathy", "Botany Knowledge", "Vigil", "We're Gonna Live Forever",
    "Quick & Quiet", "Lithe", "Balanced Landing", "Head On",
    "Flip-Flop", "Boil Over", "Breakdown", "Object of Obsession",
    "Distortion", "Calm Spirit", "No Mither", "Autodidact",
    "Desperate Measures", "For the People", "Inner Strength", "Left Behind",
    "Alert", "Diversion", "Any Means Necessary", "Detective's Hunch",
    "Buckle Up", "Off the Record", "Deliverance", "Soul Guard",
    "Wake Up!", "Second Wind", "Kinship", "Aftercare",
    "Small Game", "This Is Not Happening"
];

function nameToIconUrl(name){

    let clean = name
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/-/g, " ")
        .replace(/'/g, "")
        .replace(/&/g, "And")
        .replace(/[:.!,]/g, "")
        .trim();

    const words = clean.split(/\s+/);

    const camel = words.map((w, i) => {
        const lower = w.toLowerCase();
        return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    }).join("");

    return `https://deadbydaylight.wiki.gg/images/thumb/IconPerks_${camel}.png/256px-IconPerks_${camel}.png`;
}

const FALLBACK_ICON = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
    '<rect width="24" height="24" fill="#1a0505"/>' +
    '<path d="M4 2 L7 22 M9 1 L12 22 M15 1 L17 22 M20 2 L22 20" stroke="#8B0000" stroke-width="1.4" fill="none"/>' +
    '</svg>'
);

function pickRandomFour(list){

    const pool = [...list];
    const result = [];

    for(let i = 0; i < 4; i++){
        const index = Math.floor(Math.random() * pool.length);
        result.push(pool[index]);
        pool.splice(index, 1);
    }

    return result;
}

function setSlotText(slot, perkName){
    slot.querySelector("span").textContent = perkName;
}

function setSlotFinal(slot, perkName){

    const img = slot.querySelector("img");
    const span = slot.querySelector("span");

    img.onerror = () => { img.src = FALLBACK_ICON; };
    img.src = nameToIconUrl(perkName);
    img.style.visibility = "visible";
    span.textContent = perkName;
}

function rollSequential(containerId, list){

    const container = document.getElementById(containerId);
    const finalPerks = pickRandomFour(list);

    container.innerHTML = finalPerks.map(() => `
        <div class="perk-card">
            <img src="" alt="" style="visibility:hidden">
            <span>&nbsp;</span>
        </div>
    `).join("");

    const slots = container.querySelectorAll(".perk-card");

    function animateSlot(slotIndex){

        if(slotIndex >= finalPerks.length){
            return;
        }

        const slot = slots[slotIndex];

        let ticks = 0;
        const totalTicks = 10;

        const interval = setInterval(() => {

            ticks++;

            if(ticks >= totalTicks){
                clearInterval(interval);
                setSlotFinal(slot, finalPerks[slotIndex]);
                slot.classList.add("locked");
                animateSlot(slotIndex + 1);
                return;
            }

            setSlotText(slot, list[Math.floor(Math.random() * list.length)]);

        }, 130);
    }

    animateSlot(0);
}

window.rollKillerPerks = function(){
    rollSequential("killerPerksResult", killerPerks);
}

window.rollSurvivorPerks = function(){
    rollSequential("survivorPerksResult", survivorPerks);
}

window.showTab = function(tab){

    document.getElementById("view-killers").style.display = tab === "killers" ? "" : "none";
    document.getElementById("view-survivor").style.display = tab === "survivor" ? "" : "none";
    document.getElementById("view-killerperks").style.display = tab === "killerperks" ? "" : "none";
    document.getElementById("view-stats").style.display = tab === "stats" ? "" : "none";

    document.getElementById("tabBtnKillers").classList.toggle("active", tab === "killers");
    document.getElementById("menuBtn").classList.toggle("active", tab !== "killers");

    document.getElementById("menuItemSurvivor").classList.toggle("active", tab === "survivor");
    document.getElementById("menuItemKillerPerks").classList.toggle("active", tab === "killerperks");
    document.getElementById("menuItemStats").classList.toggle("active", tab === "stats");

    if(tab === "stats" && window.renderStats){
        window.renderStats();
    }

    closeMenu();
}

window.toggleMenu = function(){
    document.getElementById("menuDropdown").classList.toggle("open");
}

function closeMenu(){
    document.getElementById("menuDropdown").classList.remove("open");
}

document.addEventListener("click", (e) => {

    const wrapper = document.querySelector(".menu-wrapper");

    if(wrapper && !wrapper.contains(e.target)){
        closeMenu();
    }
});
