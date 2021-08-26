import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiihXK0YJH_dbEVBtoXmoK_4O58xueI14",
  authDomain: "anas-yt-clone.firebaseapp.com",
  projectId: "anas-yt-clone",
  storageBucket: "anas-yt-clone.appspot.com",
  messagingSenderId: "110569210453",
  appId: "1:110569210453:web:47d698e095f70ec04bcadc",
};
firebase.initializeApp(firebaseConfig);

export default firebase.auth();
