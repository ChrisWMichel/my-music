import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, db } from '@/includes/firebase'
import { setDoc, getDoc, doc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export const useUserStore = defineStore('user', () => {
  const userLoggedIn = ref(false)
  const userId = ref(null)

  const setUserLoggedIn = (isLoggedIn) => {
    userLoggedIn.value = isLoggedIn
  }

  const setUserId = (uid) => {
    userId.value = uid
  }

  const toggleUserLoggedIn = () => {
    userLoggedIn.value = !userLoggedIn.value
  }

  const register = async (values) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)
      const uid = userCred.user.uid

      await setDoc(doc(db, 'users', uid), {
        uid: uid,
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      })

      await updateProfile(userCred.user, {
        displayName: values.name,
      })

      setUserLoggedIn(true)
      setUserId(uid)
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  const getUserDocument = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        //console.log('User document data:', userDoc.data())
        return userDoc.data()
      } else {
        console.log('No such document!')
        return null
      }
    } catch (error) {
      console.error('Error getting document:', error)
    }
  }

  const authenticateUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUserLoggedIn(true)
      setUserId(userCredential.user.uid)
      return userCredential
    } catch (error) {
      console.error('Error during authentication:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
      setUserLoggedIn(false)
    } catch (error) {
      console.error('Error during sign out:', error)
    }
  }

  return {
    userLoggedIn,
    setUserLoggedIn,
    setUserId,
    toggleUserLoggedIn,
    register,
    getUserDocument,
    authenticateUser,
    signOut,
  }
})
