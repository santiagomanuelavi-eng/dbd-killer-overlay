import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

function formatTime(ms){

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
}

let chaseTickInterval = null;

onValue(ref(db, "chase"), (snapshot) => {

    const chase = snapshot.val();

    const chaseBox = document.getElementById("chaseBox");
    const chaseName = document.getElementById("chaseName");
    const chaseClock = document.getElementById("chaseClockOverlay");

    clearInterval(chaseTickInterval);

    if(!chase || !chase.running || !chase.startTime){
        chaseBox.style.display = "none";
        return;
    }

    chaseBox.style.display = "";
    chaseName.textContent = chase.name || "";

    const update = () => {
        chaseClock.textContent = formatTime(Date.now() - chase.startTime);
    };

    update();
    chaseTickInterval = setInterval(update, 250);
});
