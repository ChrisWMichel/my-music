<template>
  <div>
    <!-- Header -->
    <AppHeader />

    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>

    <!-- Player -->
    <AppPlayer />

    <!-- Auth Modal -->
    <AppAuth />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import AppHeader from './components/AppHeader.vue'
import AppAuth from './components/AppAuth.vue'
import AppPlayer from './components/AppPlayer.vue'
import { useUserStore } from './stores/userStore'
import { auth } from './includes/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const userStore = useUserStore()
let loggedIn = ref(userStore.loggedIn)

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userStore.setUserLoggedIn(true)
      loggedIn.value = true
      // Optionally, fetch additional user data
      //const userData =
      await userStore.getUserDocument(user.uid)
      //console.log('User data:', userData)
    } else {
      userStore.setUserLoggedIn(false)
      loggedIn.value = false
    }
  })
})
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s linear;
}
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s linear;
}
</style>
