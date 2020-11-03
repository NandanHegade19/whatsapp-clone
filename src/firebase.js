import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDps7994vsLrqsGW_5K-EKRSCb0PFWUHB8",
    authDomain: "whatsapp-clone-70e71.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-70e71.firebaseio.com",
    projectId: "whatsapp-clone-70e71",
    storageBucket: "whatsapp-clone-70e71.appspot.com",
    messagingSenderId: "80713765091",
    appId: "1:80713765091:web:98b77455bb91010b31f5d6"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;