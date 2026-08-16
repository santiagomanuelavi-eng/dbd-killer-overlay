import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjfzsrXDWEeCdFiIvMebJ2Wz3LdK8wt5I",
  authDomain: "dbd-killer-overlay.firebaseapp.com",
  databaseURL: "https://dbd-killer-overlay-default-rtdb.firebaseio.com",
  projectId: "dbd-killer-overlay",
  storageBucket: "dbd-killer-overlay.firebasestorage.app",
  messagingSenderId: "1095235884841",
  appId: "1:1095235884841:web:7c60d377704702dd2b4938"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
    {name:"El Primero", img:"images/K42_TheFirst_Portrait.png"},
{name:"Jason", img:"images/T_UI_K43_TheSlasher_Portrait.png"}
];


let selectedOrder = JSON.parse(localStorage.getItem("selectedOrder")) || [];
let winStreak = parseInt(localStorage.getItem("winStreak")) || 0;
let bestStreak = parseInt(localStorage.getItem("bestStreak")) || 0;
let killerStreaks = JSON.parse(localStorage.getItem("killerStreaks")) || {};
let matchStats = JSON.parse(localStorage.getItem("matchStats")) || {};

const killerGrid = document.getElementById("killerGrid");

let syncTimeout = null;

function saveData(){
    localStorage.setItem("selectedOrder", JSON.stringify(selectedOrder));
    localStorage.setItem("winStreak", winStreak);
    localStorage.setItem("bestStreak", bestStreak);
    localStorage.setItem("killerStreaks", JSON.stringify(killerStreaks));
    localStorage.setItem("matchStats", JSON.stringify(matchStats));
}

function syncFirebase(){

    clearTimeout(syncTimeout);

    syncTimeout = setTimeout(() => {
        set(ref(db, "overlay"), {
            selectedOrder,
            winStreak,
            bestStreak,
            killerStreaks,
            matchStats
        });
    }, 250);
}

function registerMatch(killerName, result){

    if(!killerName){
        return;
    }

    if(!matchStats[killerName]){
        matchStats[killerName] = { wins: 0, losses: 0, draws: 0 };
    }

    if(result === "win"){
        matchStats[killerName].wins++;
    }else if(result === "loss"){
        matchStats[killerName].losses++;
    }else if(result === "draw"){
        matchStats[killerName].draws++;
    }
}

const killerElements = {};

function buildKillerGrid(){

    killerGrid.innerHTML = "";

    killers.forEach(killer => {

        const killerBox = document.createElement("div");
        killerBox.classList.add("killer");

        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order-number");
        orderDiv.style.display = "none";

        const img = document.createElement("img");
        img.src = killer.img;
        img.loading = "lazy";

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("killer-name");
        nameDiv.textContent = killer.name;

        killerBox.appendChild(orderDiv);
        killerBox.appendChild(img);
        killerBox.appendChild(nameDiv);

        killerBox.onclick = () => selectKiller(killer);

        killerGrid.appendChild(killerBox);

        killerElements[killer.name] = { box: killerBox, orderDiv };
    });
}

function renderKillers(){

    killers.forEach(killer => {

        const el = killerElements[killer.name];

        if(!el){
            return;
        }

        const selectedIndex = selectedOrder.findIndex(
            k => k.name === killer.name
        );

        if(selectedIndex !== -1){
            el.box.classList.add("selected");
            el.orderDiv.style.display = "";
            el.orderDiv.textContent = selectedIndex + 1;
        }else{
            el.box.classList.remove("selected");
            el.orderDiv.style.display = "none";
        }
    });

    syncFirebase();
    saveData();
}

function selectKiller(killer){

    const exists = selectedOrder.find(
        k => k.name === killer.name
    );

    if(exists){
        selectedOrder = selectedOrder.filter(
            k => k.name !== killer.name
        );
    }else{
        selectedOrder.push(killer);
    }

    renderKillers();
}

window.randomOrder = function(){

    selectedOrder = [...selectedOrder].sort(
        () => Math.random() - 0.5
    );

    renderKillers();
}

function rotateNext(){

    if(selectedOrder.length > 0){
        selectedOrder.shift();
    }
}

window.addWin = function(){

    const current = selectedOrder[0];

    winStreak++;

    if(winStreak > bestStreak){
        bestStreak = winStreak;
    }

    if(current){
        killerStreaks[current.name] = (killerStreaks[current.name] || 0) + 1;
        registerMatch(current.name, "win");
    }

    rotateNext();

    renderKillers();
}

window.addLoss = function(){

    const current = selectedOrder[0];

    winStreak = 0;

    if(current){
        killerStreaks[current.name] = 0;
        registerMatch(current.name, "loss");
    }

    rotateNext();

    renderKillers();
}

window.addDraw = function(){

    const current = selectedOrder[0];

    if(current){
        registerMatch(current.name, "draw");
    }

    rotateNext();

    renderKillers();
}

window.resetAll = function(){

    selectedOrder = [];
    winStreak = 0;
    bestStreak = 0;
    killerStreaks = {};
    matchStats = {};

    localStorage.clear();

    renderKillers();
}

buildKillerGrid();
renderKillers();

document.addEventListener("keydown", (e) => {

    const tag = document.activeElement.tagName;

    if(tag === "INPUT" || tag === "TEXTAREA"){
        return;
    }

    const killersView = document.getElementById("view-killers");

    if(!killersView || killersView.style.display === "none"){
        return;
    }

    const key = e.key.toLowerCase();

    if(key === "v"){
        window.addWin();
    }else if(key === "d"){
        window.addLoss();
    }else if(key === "e"){
        window.addDraw();
    }
});
