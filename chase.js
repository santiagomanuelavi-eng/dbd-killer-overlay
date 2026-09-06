import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const db = getDatabase(getApp());

let chaseLog = JSON.parse(localStorage.getItem("chaseLog")) || [];
let chaseStartTime = null;
let chaseRunning = false;
let chaseInterval = null;

const chaseClock = document.getElementById("chaseClock");
const chaseLogEl = document.getElementById("chaseLog");

function formatTime(ms){

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
}

function currentElapsed(){

    if(!chaseStartTime){
        return 0;
    }

    return Date.now() - chaseStartTime;
}

function syncChaseState(){

    set(ref(db, "chase"), {
        running: chaseRunning,
        startTime: chaseStartTime,
        name: document.getElementById("chaseName").value || ""
    });
}

function tick(){
    chaseClock.textContent = formatTime(currentElapsed());
}

window.startChase = function(){

    if(chaseRunning){
        return;
    }

    chaseStartTime = Date.now();
    chaseRunning = true;

    chaseInterval = setInterval(tick, 250);

    syncChaseState();
}

window.stopChase = function(){

    if(!chaseRunning){
        return;
    }

    chaseRunning = false;
    clearInterval(chaseInterval);

    syncChaseState();
}

window.resetChase = function(){

    chaseRunning = false;
    chaseStartTime = null;
    clearInterval(chaseInterval);
    chaseClock.textContent = "00:00";

    syncChaseState();
}

window.saveChaseEntry = function(){

    const name = document.getElementById("chaseName").value.trim();
    const elapsed = currentElapsed();

    if(!name){
        return;
    }

    chaseLog.unshift({
        name,
        time: formatTime(elapsed)
    });

    localStorage.setItem("chaseLog", JSON.stringify(chaseLog));

    renderChaseLog();
    window.resetChase();
}

function renderChaseLog(){

    chaseLogEl.innerHTML = chaseLog.map(entry => `
        <div class="chase-entry">
            <span class="chase-entry-name">${entry.name}</span>
            <span class="chase-entry-time">${entry.time}</span>
        </div>
    `).join("");
}

renderChaseLog();
