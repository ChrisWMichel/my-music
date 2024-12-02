<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <UploadMusic @song-uploaded="addSong" />
      </div>

      <div class="col-span-2">
        <div class="relative flex flex-col bg-white border border-gray-200 rounded">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="float-right text-2xl text-green-400 fa fa-compact-disc"></i>
          </div>
          <div class="p-6">
            <div v-if="pageLoading" class="flex items-center justify-center h-64">
              <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            </div>
            <!-- Composition Items -->
            <div v-else>
              <div v-for="song in songs" :key="song.id">
                <CompositionItem
                  :song="song"
                  @update-song="updateSong"
                  @delete-song="deleteSong"
                  :updateUnsavedFlag="updateUnsavedFlag"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import UploadMusic from '@/components/UploadMusic.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { songsCollection, auth } from '@/includes/firebase'
import { query, where, getDocs } from 'firebase/firestore'

const songs = ref([])
const pageLoading = ref(true)

const updateSong = (updatedSong) => {
  const songIndex = songs.value.findIndex((song) => song.id === updatedSong.id)
  if (songIndex !== -1) {
    songs.value[songIndex].modified_name = updatedSong.modified_name
    songs.value[songIndex].genre = updatedSong.genre
  }
}

const addSong = (newSong) => {
  songs.value.push(newSong)
}

onMounted(async () => {
  const user = auth.currentUser
  //console.log('User ID:', user.uid)
  if (!user || !user.uid) {
    console.error('User is not authenticated')
    return
  }
  pageLoading.value = true
  try {
    const q = query(songsCollection, where('uid', '==', user.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      songs.value.push({ id: doc.id, ...doc.data() })
    })
  } catch (error) {
    console.error('Error fetching songs:', error)
  } finally {
    pageLoading.value = false
  }
})

const deleteSong = (id) => {
  const songIndex = songs.value.findIndex((song) => song.id === id)
  if (songIndex !== -1) {
    songs.value.splice(songIndex, 1)
  }
}

const unsavedFlag = ref(false)

const updateUnsavedFlag = (value) => {
  unsavedFlag.value = value
}
onBeforeRouteLeave((to, from, next) => {
  if (unsavedFlag.value) {
    const answer = window.confirm('You have unsaved changes. Are you sure you want to leave?')
    if (answer) {
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
</script>

<style></style>
