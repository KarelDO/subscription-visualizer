import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { store } from './store/index'

const firebaseConfig = {
  apiKey: "AIzaSyDsihV4xc82H9ujIncR3vSiAye92MeY_oE",
  authDomain: "creditviz-b5a8d.firebaseapp.com",
  databaseURL: "https://creditviz-b5a8d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "creditviz-b5a8d",
  storageBucket: "creditviz-b5a8d.appspot.com",
  messagingSenderId: "1077218130742",
  appId: "1:1077218130742:web:c8e1e3fb4017d97e2dd197",
  measurementId: "G-372GMD33HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const dp = getFirestore(app)

// Link firebase authentication with vuex
const auth = getAuth()
auth.onAuthStateChanged(user => {
  store.dispatch('fetchUser', user)
})


export default dp