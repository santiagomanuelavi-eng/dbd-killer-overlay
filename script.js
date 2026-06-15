const killers = [
    {name:"El Trampero", img:"images/K01_TheTrapper_Portrait.png"},
    {name:"El Espectro", img:"images/K02_TheWraith_Portrait.png"},
    {name:"El Pueblerino", img:"images/K03_TheHillbilly_Portrait.png"},
    {name:"La Enfermera", img:"images/K04_TheNurse_Portrait.png"},
    {name:"Michael Myers", img:"images/K06_TheShape_Portrait.png"},
    {name:"La Bruja", img:"images/K05_TheHag_Portrait.png"},
    {name:"El Doctor", img:"images/K07_TheDoctor_Portrait.png"},
    {name:"La Cazadora", img:"images/K08_TheHuntress_Portrait.png"},
    {name:"El Caníbal", img:"images/K09_TheCannibal_Portrait.png"},
    {name:"La Pesadilla", img:"images/K10_TheNightmare_Portrait.png"},
    {name:"La Cerda", img:"images/K11_ThePig_Portrait.png"},
    {name:"El Payaso", img:"images/K12_TheClown_Portrait.png"},
    {name:"La Espíritu", img:"images/K13_TheSpirit_Portrait.png"},
    {name:"La Legión", img:"images/K14_TheLegion_Portrait.png"},
    {name:"La Plaga", img:"images/K15_ThePlague_Portrait.png"},
    {name:"Ghost Face", img:"images/K16_TheGhostface_Portrait.png"},
    {name:"Demogorgon", img:"images/K17_TheDemogorgon_Portrait.png"},
    {name:"El Oni", img:"images/K18_TheOni_Portrait.png"},
    {name:"El Arponero", img:"images/K19_TheDeathslinger_Portrait.png"},
    {name:"El Ejecutor", img:"images/K20_TheExecutioner_Portrait.png"},
    {name:"El Deterioro", img:"images/K21_TheBlight_Portrait.png"},
    {name:"Los Gemelos", img:"images/K22_TheTwins_Portrait.png"},
    {name:"El Embaucador", img:"images/K23_TheTrickster_Portrait.png"},
    {name:"Némesis", img:"images/K24_TheNemesis_Portrait.png"},
    {name:"El Cenobita", img:"images/K25_TheCenobite_Portrait.png"},
    {name:"La Artista", img:"images/K26_TheArtist_Portrait.png"},
    {name:"La Onryō", img:"images/K27_TheOnryo_Portrait.png"},
    {name:"La Draga", img:"images/K28_TheDredge_Portrait.png"},
    {name:"La Mente Maestra", img:"images/K29_TheMasterMind_Portrait.png"},
    {name:"El Caballero", img:"images/K30_TheKnight_Portrait.png"},
    {name:"La Comerciante de Calaveras", img:"images/K31_TheSkullMerchant_Portrait.png"},
    {name:"La Singularidad", img:"images/K32_TheSingularity_Portrait.png"},
    {name:"El Xenomorfo", img:"images/K33_TheXenomorph_Portrait.png"},
    {name:"El Buen Chico", img:"images/K34_TheYerkes_Portrait.png"},
    {name:"Lo Desconocido", img:"images/K35_TheUnknown_Portrait.png"},
    {name:"El Lich", img:"images/K36_TheLich_Portrait.png"},
    {name:"El Señor Oscuro", img:"images/K37_TheDracula_Portrait.png"},
    {name:"La Señora de los Sabuesos", img:"images/K38_TheHoundmaster_Portrait.png"},
    {name:"El Ghoul", img:"images/K39_TheGhoul_Portrait.png"},
    {name:"El Animatrónico", img:"images/K40_TheAnimatronic_Portrait.png"},
    {name:"La Krasue", img:"images/K41_TheKrasue_Portrait.png"},
    {name:"El Primero", img:"images/K42_TheFirst_Portrait.png"}
];

let selectedOrder = [];

const killerGrid = document.getElementById("killerGrid");

function renderKillers() {

    killerGrid.innerHTML = "";

    killers.forEach(killer => {

        const killerBox = document.createElement("div");
        killerBox.classList.add("killer");

        const selectedIndex =
            selectedOrder.findIndex(
                k => k.name === killer.name
            );

        if (selectedIndex !== -1) {
            killerBox.classList.add("selected");
        }

        killerBox.innerHTML = `
            ${selectedIndex !== -1
                ? `<div class="order-number">${selectedIndex + 1}</div>`
                : ""
            }
            <img src="${killer.img}" alt="${killer.name}">
            <div class="killer-name">${killer.name}</div>
        `;

        killerBox.onclick = () => {

            const exists =
                selectedOrder.find(
                    k => k.name === killer.name
                );

            if (exists) {

                selectedOrder =
                    selectedOrder.filter(
                        k => k.name !== killer.name
                    );

            } else {

                selectedOrder.push(killer);

            }

            renderKillers();
        };

        killerGrid.appendChild(killerBox);
    });
}

window.randomOrder = function() {

    selectedOrder =
        [...selectedOrder]
        .sort(() => Math.random() - 0.5);

    renderKillers();
};

window.resetAll = function() {

    selectedOrder = [];

    renderKillers();
};

renderKillers();
