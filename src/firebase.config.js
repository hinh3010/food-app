import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

console.log(process.env.REACT_APP_FIREBASE_APIKEY)

const firebaseConfig = {
    apiKey: "AIzaSyBZfxYRouWq_2PU0JVa2IfZxeilwdqaS_A",
    authDomain: "restaurant-app-2a31f.firebaseapp.com",
    databaseURL: "https://restaurant-app-2a31f-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-2a31f",
    storageBucket: "restaurant-app-2a31f.appspot.com",
    messagingSenderId: "208380397659",
    appId: "1:208380397659:web:240599d14092199129177e",
    measurementId: "G-SBW0EPJDNK"
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
