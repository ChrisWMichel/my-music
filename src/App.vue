<template>
  <div>
    <!-- Header -->
    <AppHeader />

    <!-- Introduction -->
    <section class="relative py-20 mb-8 text-center text-white">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="mb-5 text-5xl font-bold">Listen to Great Music!</h1>
          <p class="w-full mx-auto md:w-8/12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis,
            congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block w-auto max-w-full mx-auto mt-5 -mb-20"
        :src="introductionImg"
        alt="Music"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="relative flex flex-col bg-white border border-gray-200 rounded">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i class="float-right text-xl text-green-400 fa fa-headphones-alt"></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
          <li
            class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
          >
            <div>
              <a href="#" class="block font-bold text-gray-600">Song Title</a>
              <span class="text-sm text-gray-500">Artist Name</span>
            </div>

            <div class="text-lg text-gray-600">
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                15
              </span>
            </div>
          </li>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>

    <!-- Player -->
    <div class="fixed bottom-0 left-0 w-full px-4 py-2 bg-white">
      <!-- Track Info -->
      <div class="text-center">
        <span class="font-bold song-title">Song Title</span> by
        <span class="song-artist">Artist</span>
      </div>
      <div class="flex items-center gap-4 flex-nowrap">
        <!-- Play/Pause Button -->
        <button type="button">
          <i class="text-xl text-gray-500 fa fa-play"></i>
        </button>
        <!-- Current Position -->
        <div class="player-currenttime">00:00</div>
        <!-- Scrub Container  -->
        <div class="relative w-full h-2 bg-gray-200 rounded cursor-pointer">
          <!-- Player Ball -->
          <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            style="width: 50%"
          ></span>
        </div>
        <!-- Duration -->
        <div class="player-duration">03:06</div>
      </div>
    </div>

    <!-- Auth Modal -->
    <AppAuth />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import introductionMusic from '@/assets/img/introduction-music.png'
import AppHeader from './components/AppHeader.vue'
import AppAuth from './components/AppAuth.vue'
import { useUserStore } from './stores/userStore'
import { auth } from './includes/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const introductionImg = ref(introductionMusic)

const userStore = useUserStore()
let loggedIn = ref(userStore.loggedIn)

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userStore.setUserLoggedIn(true)
      loggedIn.value = true
      // Optionally, fetch additional user data
      const userData = await userStore.getUserDocument(user.uid)
      console.log('User data:', userData)
    } else {
      userStore.setUserLoggedIn(false)
      loggedIn.value = false
    }
  })
})
</script>
