import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAgWj1VQivvcyLLqO99za37bQy3wOyzUuU",
  authDomain: "whatsapp-clone-dbb61.firebaseapp.com",
  projectId: "whatsapp-clone-dbb61",
  storageBucket: "whatsapp-clone-dbb61.appspot.com",
  messagingSenderId: "107827106857",
  appId: "1:107827106857:web:16ac728411fe089bed3838",
  measurementId: "G-E17XPN10M0"
};

// Initializing the app
const fireBaseApp = firebase.initializeApp(firebaseConfig);

const db = fireBaseApp.firestore();
const auth = fireBaseApp.auth();

// this will help in authenticating to google
const provider = new firebase.auth.GoogleAuthProvider;

export { auth, provider };
export default db;