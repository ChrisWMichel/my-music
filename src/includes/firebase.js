import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

// Initialize Firebase Auth
const auth = getAuth(app)

const storage = getStorage(app)

// Initialize Firestore Collection Reference
const usersCollection = collection(db, 'users')
const songsCollection = collection(db, 'songs')
const commentsCollection = collection(db, 'comments')

export { db, auth, usersCollection, songsCollection, commentsCollection, storage }
