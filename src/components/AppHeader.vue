<template>
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <router-link
        class="mr-4 text-2xl font-bold text-white uppercase"
        :to="{ name: 'home' }"
        active-class="no-active"
        >Music App</router-link
      >

      <div class="flex items-center flex-grow">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">About</router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="modalStore.toggle"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click="signOut">Logout</a>
            </li>
          </template>
        </ul>
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
