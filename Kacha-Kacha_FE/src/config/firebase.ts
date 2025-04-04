// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import {
  getAuth,
  GoogleAuthProvider,
  // signInWithPopup,
  Auth,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBFEaKI6LCxDOqYlSNMlmNA9lw0SNV4peU',
  authDomain: 'fdiamondshop-e6f42.firebaseapp.com',
  projectId: 'fdiamondshop-e6f42',
  storageBucket: 'fdiamondshop-e6f42.appspot.com',
  messagingSenderId: '56244500164',
  appId: '1:56244500164:web:391ee6d85197e214c13b91',
  measurementId: 'G-6FRFPZ9F61',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

// const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };

export { storage, auth, provider };
