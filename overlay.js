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

    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    img1.src = selectedOrder[0]?.img || "";
    img2.src = selectedOrder[1]?.img || "";

    document.getElementById("winStreak").textContent =
        data.winStreak || 0;

    document.getElementById("bestStreak").textContent =
        data.bestStreak || 0;
});
