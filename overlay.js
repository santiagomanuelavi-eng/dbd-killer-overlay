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

onValue(ref(db, "overlay"), (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    const selectedOrder = data.selectedOrder || [];
    const killerStreaks = data.killerStreaks || {};

    const current = selectedOrder[0];
    const next = selectedOrder[1];

    document.getElementById("img1").src = current?.img || "";
    document.getElementById("img2").src = next?.img || "";

    document.getElementById("name1").textContent = current?.name || "";
    document.getElementById("name2").textContent = next?.name || "";

    document.getElementById("killerStreak1").textContent =
        current ? (killerStreaks[current.name] || 0) : 0;

    document.getElementById("killerStreak2").textContent =
        next ? (killerStreaks[next.name] || 0) : 0;

    document.getElementById("winStreak").textContent =
        data.winStreak || 0;

    document.getElementById("bestStreak").textContent =
        data.bestStreak || 0;
});
