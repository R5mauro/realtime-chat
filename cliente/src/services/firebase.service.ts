import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDxFXVBJFD-FGthdMiBmIHC6DrhlFRlsfY",
    authDomain: "chat-realapp.firebaseapp.com",
    projectId: "chat-realapp",
    storageBucket: "chat-realapp.appspot.com",
    messagingSenderId: "570688701673",
    appId: "1:570688701673:web:7265281ce5671222675c78"
};

const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);

export const db = getFirestore(app);

