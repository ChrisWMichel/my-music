<template>
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-between px-4 py-5 mx-auto">
      <div class="text-lg font-semibold text-white">
        <router-link
          class="mr-4 text-2xl font-bold text-white uppercase"
          :to="{ name: 'home' }"
          active-class="no-active"
        >
          Music App
        </router-link>
        <router-link class="px-2 text-white" :to="{ name: 'about' }">About</router-link>
        <!-- <div v-if="userStore.userLoggedIn"> -->
        <router-link v-if="userStore.userLoggedIn" class="px-2 text-white" :to="{ name: 'manage' }"
          >Manage</router-link
        >
        <!-- </div> -->
      </div>
      <div class="flex items-center space-x-4">
        <div v-if="!userStore.userLoggedIn">
          <a class="px-2 text-white" href="#" @click.prevent="modalStore.toggle"
            >Login / Register</a
          >
        </div>
        <div v-else>
          <a class="px-2 text-white" href="#" @click="signOut">Logout</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import { useRouter, useRoute } from 'vue-router'

const modalStore = useModalStore()
const userStore = useUserStore()
const $router = useRouter()
const route = useRoute()

const signOut = () => {
  userStore.signOut()
  if (route.meta.requiresAuth) {
    $router.push({ name: 'home' })
  }
}
</script>
