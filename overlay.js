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

const overlayRef = ref(db, "overlay");

onValue(overlayRef, (snapshot) => {

    const data = snapshot.val();

    if(!data){
        console.log("No hay datos en Firebase");
        return;
    }

    const selectedOrder = data.selectedOrder || [];

    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    if(selectedOrder.length > 0){

        img1.src = selectedOrder[0].img;

    }else{

        img1.src = "";
    }

    if(selectedOrder.length > 1){

        img2.src = selectedOrder[1].img;

    }else{

        img2.src = "";
    }

    document.getElementById("winStreak").textContent =
        data.winStreak || 0;

    document.getElementById("bestStreak").textContent =
        data.bestStreak || 0;

});
