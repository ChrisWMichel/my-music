import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUmCxWEh6delwT80b-8Y23Hyk9aSObexo',
  authDomain: 'music-16d2a.firebaseapp.com',
  projectId: 'music-16d2a',
  storageBucket: 'music-16d2a.appspot.com',
  messagingSenderId: '134892352117',
  appId: '1:134892352117:web:c52f0728a8185bc88a3e3c',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

// Initialize Firebase Auth
const auth = getAuth(app)

// Initialize Firestore Collection Reference
const usersCollection = collection(db, 'users')

export { db, auth, usersCollection }
