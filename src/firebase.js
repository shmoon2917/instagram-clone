import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUptSeOCUEJZvR59y6exHPY-ndOx-0n9M",
  authDomain: "instagram-clone-249b5.firebaseapp.com",
  databaseURL: "https://instagram-clone-249b5.firebaseio.com",
  projectId: "instagram-clone-249b5",
  storageBucket: "instagram-clone-249b5.appspot.com",
  messagingSenderId: "843987064638",
  appId: "1:843987064638:web:eda6fdd6ce8a8169e8be6f",
  measurementId: "G-VD3LG8GTQJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

// export default db;
