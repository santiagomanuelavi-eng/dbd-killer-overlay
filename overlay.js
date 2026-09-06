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

function updateBanner(prefix, killerData, streakValue){

    const img = document.getElementById(`img${prefix}`);
    const nameEl = document.getElementById(`name${prefix}`);
    const streakEl = document.getElementById(`killerStreak${prefix}`);

    const newSrc = killerData?.img || "";
    const newName = killerData?.name || "";

    streakEl.textContent = streakValue;

    if(img.dataset.currentSrc === newSrc){
        return;
    }

    img.style.opacity = 0;
    nameEl.style.opacity = 0;

    setTimeout(() => {
        img.src = newSrc;
        nameEl.textContent = newName;
        img.dataset.currentSrc = newSrc;

        requestAnimationFrame(() => {
            img.style.opacity = 1;
            nameEl.style.opacity = 1;
        });
    }, 250);
}

onValue(ref(db, "overlay"), (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    const selectedOrder = data.selectedOrder || [];
    const killerStreaks = data.killerStreaks || {};

    const current = selectedOrder[0];
    const next = selectedOrder[1];

    updateBanner(1, current, current ? (killerStreaks[current.name] || 0) : 0);
    updateBanner(2, next, next ? (killerStreaks[next.name] || 0) : 0);

    document.getElementById("winStreak").textContent =
        data.winStreak || 0;

    document.getElementById("bestStreak").textContent =
        data.bestStreak || 0;
});
