import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import "firebase/compat/auth";
import "firebase/compat/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyANg18z5iaMwkRol-HnfjgZKPujNzW57nU",
    authDomain: "ekkyfolio.firebaseapp.com",
    projectId: "ekkyfolio",
    storageBucket: "ekkyfolio.appspot.com",
    messagingSenderId: "1010790668888",
    appId: "1:1010790668888:web:a261841d6f61bd968e082d",
    measurementId: "G-TTFS6QPM8B"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const analytics = firebase.analytics();


export {
    firebase,
    analytics,
    auth,
    firestore,
    storage,
}
