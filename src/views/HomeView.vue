<template>
  <main>
    <!-- Introduction -->
    <section class="relative py-20 mb-8 text-center text-white">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="mb-5 text-5xl font-bold">Listen to Great Music!</h1>
          <p class="w-full mx-auto text-2xl md:w-8/12">
            I would encourage you to register and login to the app so that you can appreciate the
            full functionality this app has to offer.
          </p>
        </div>
      </div>

      <img
        class="relative block w-auto max-w-full mx-auto mt-5 -mb-20"
        src="../assets/img/introduction-music.png"
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
        <div v-show="loading" class="flex items-center justify-center h-64">
          <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
        <div>
          <ol id="playlist">
            <songItem v-for="song in songs" :key="song.id" :song="song" />
          </ol>
        </div>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script setup>
import songItem from '@/components/songItem.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore'
import { songsCollection } from '@/includes/firebase'

const songs = ref([])
const maxPerPage = 5
const loading = ref(false)
let lastVisible = null

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight + 10 >= scrollHeight && !loading.value) {
    console.log('Fetching more songs...')
    getSongs()
  }
}

onMounted(async () => {
  getSongs()

  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const getSongs = async () => {
  loading.value = true
  try {
    let q
    if (lastVisible) {
      q = query(songsCollection, orderBy('created_at'), startAfter(lastVisible), limit(maxPerPage))
    } else {
      q = query(songsCollection, orderBy('created_at'), limit(maxPerPage))
    }

    const songDocs = await getDocs(q)
    const newSongs = songDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    songs.value = [...songs.value, ...newSongs]

    // Update the last visible document
    if (songDocs.docs.length > 0) {
      lastVisible = songDocs.docs[songDocs.docs.length - 1]
    }
  } catch (error) {
    console.error('Error fetching songs:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style></style>
