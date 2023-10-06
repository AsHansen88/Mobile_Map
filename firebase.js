// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYtgJKq-SqHEp4tH3iRpJeZVdkcCAWrg4',
  authDomain: 'maps-cb4d1.firebaseapp.com',
  projectId: 'maps-cb4d1',
  storageBucket: 'maps-cb4d1.appspot.com',
  messagingSenderId: '974698943371',
  appId: '1:974698943371:web:1f45b783f37440fd1d958e',
  measurementId: 'G-SZ6EKT403J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);



export { app, storage };
