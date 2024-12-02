<template>
  <div class="relative flex flex-col bg-white border border-gray-200 rounded">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="float-right text-2xl text-green-400 fas fa-upload"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 text-center text-gray-400 transition duration-500 border border-gray-400 border-dashed rounded cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @drop.prevent.stop="upload($event)"
      >
        <h5 style="pointer-events: none">Drop your files here</h5>
      </div>

      <hr class="my-6" />
      <!-- Upload Button -->
      <button
        @click="triggerFileInput"
        class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Select Song(s)
      </button>
      <!-- Hidden File Input -->
      <input type="file" class="hidden" multiple @change="upload($event)" ref="fileInput" />
      <!-- Progress Bars -->
      <div class="mb-4" v-for="file in files" :key="file.name">
        <!-- File Name -->
        <div class="text-sm font-bold" :class="file.text_class">
          <i :class="file.icon" class="mr-2"></i>{{ file.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="file.variant"
            :style="{ width: file.progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, defineEmits } from 'vue'
import { storage, auth, songsCollection } from '@/includes/firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc } from 'firebase/firestore'

// const props = defineProps({
//   addSong: Function,
// })
const emit = defineEmits(['song-uploaded'])

const is_dragover = ref(false)
const files = ref([])
const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

onBeforeUnmount(() => {
  files.value.forEach((file) => {
    if (file.uploadTask) {
      file.uploadTask.cancel()
    }
  })
})

const upload = (event) => {
  const droppedFiles = event.dataTransfer ? event.dataTransfer.files : event.target.files
  for (const file of droppedFiles) {
    if (file.type !== 'audio/mpeg' || file.size >= 10 * 1024 * 1024) {
      console.error('File does not meet content type or size requirements')
      files.value.push({
        name: file.name,
        progress: 0,
        variant: 'bg-red-400',
        icon: 'fas fa-exclamation-circle',
        text_class: 'text-red-600',
      })
      continue
    }

    const songRef = storageRef(storage, `songs/${file.name}`)
    const uploadTask = uploadBytesResumable(songRef, file)

    files.value.push({
      name: file.name,
      progress: 0,
      variant: 'bg-blue-400',
      icon: 'fas fa-spinner fa-spin',
      text_class: '',
      uploadTask,
    })

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        const fileIndex = files.value.findIndex((f) => f.name === file.name)
        if (fileIndex !== -1) {
          files.value[fileIndex].progress = progress
        }
      },
      (error) => {
        const fileIndex = files.value.findIndex((f) => f.name === file.name)
        if (fileIndex !== -1) {
          files.value[fileIndex].variant = 'bg-red-400'
          files.value[fileIndex].icon = 'fas fa-exclamation-circle'
          files.value[fileIndex].text_class = 'text-red-600'
        }
        console.error('Error uploading file:', error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available at', downloadURL)

        const song = {
          created_at: new Date(),
          uid: auth.currentUser.uid,
          url: downloadURL,
          display_name: auth.currentUser.displayName,
          original_name: uploadTask.snapshot.ref.name,
          modified_name: uploadTask.snapshot.ref.name,
          genre: '',
          comment_count: 0,
        }

        const docRef = await addDoc(songsCollection, song)
        const fileIndex = files.value.findIndex((f) => f.name === file.name)
        files.value[fileIndex].variant = 'bg-green-400'
        files.value[fileIndex].icon = 'fas fa-check-circle'
        files.value[fileIndex].text_class = 'text-green-600'

        emit('song-uploaded', { id: docRef.id, ...song })
      },
    )
  }
}
</script>

<style></style>
