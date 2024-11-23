<template>
  <div>
    <h1>Firebase Example</h1>
    <button @click="signIn">Sign In</button>
    <button @click="addData">Add Data</button>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const signIn = async () => {
  try {
    const userCredential = await proxy.$auth.signInWithEmailAndPassword(
      'user@example.com',
      'password',
    )
    console.log('Signed in:', userCredential.user)
  } catch (error) {
    console.error('Error signing in:', error)
  }
}

const addData = async () => {
  try {
    const docRef = await proxy.$db.collection('users').add({
      name: 'John Doe',
      email: 'john.doe@example.com',
    })
    console.log('Document written with ID:', docRef.id)
  } catch (error) {
    console.error('Error adding document:', error)
  }
}
</script>
