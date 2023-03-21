import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOkXWe2X7wgX8K3D5a44GLedUFRkP4UKY',
  authDomain: 'whereswaldo-e790d.firebaseapp.com',
  projectId: 'whereswaldo-e790d',
  storageBucket: 'whereswaldo-e790d.appspot.com',
  messagingSenderId: '509700973374',
  appId: '1:509700973374:web:9f2bb3e14389ad26a3026f',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
