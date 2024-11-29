<template>
  <div class="p-3 mb-4 border border-gray-200 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        @click.prevent="deleteSong(song.id)"
        class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click="toggleForm"
        class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <transition
      name="expand"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="showForm" class="mt-4">
        <div
          class="p-4 mb-4 font-bold text-center text-white"
          v-if="showAlert"
          :class="alertVariant"
        >
          {{ alertText }}
        </div>
        <Form :validation-schema="schema" :initial-values="song">
          <div class="mb-3">
            <label class="inline-block mb-2">Song Title</label>
            <Field
              name="modified_name"
              type="text"
              v-model="modifiedName"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Song Title"
              @input="updateUnsavedFlag(true)"
            />
            <ErrorMessage name="modified_name" class="text-red-600" />
          </div>
          <div class="mb-3">
            <label class="inline-block mb-2">Genre</label>
            <Field
              name="genre"
              type="text"
              v-model="genre"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Genre"
              @input="updateUnsavedFlag(true)"
            />
            <ErrorMessage name="genre" class="text-red-600" />
          </div>
          <button
            @click.prevent="updateSong()"
            :disabled="inSubmition"
            type="submit"
            class="py-1.5 px-3 mr-2 rounded text-white bg-green-600"
          >
            Submit
          </button>
          <button
            type="button"
            @click="showForm = false"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
          >
            Go Back
          </button>
        </Form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { db, storage } from '@/includes/firebase'

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
  updateUnsavedFlag: {
    type: Function,
  },
})
const emit = defineEmits(['update-song', 'delete-song'])

const schema = reactive({
  modified_name: {
    required: true,
    min: 3,
  },
  genre: {
    required: false,
    min: 3,
    alphaSpaces: true,
  },
})

let showForm = ref(false)
let modifiedName = ref(props.song.modified_name)
let genre = ref(props.song.genre)
let inSubmition = ref(false)
let showAlert = ref(false)
let alertVariant = ref('bg-blue-500')
let alertText = ref('Please wait while we update the song')

const toggleForm = () => {
  showForm.value = !showForm.value
}

const updateSong = async () => {
  inSubmition.value = true
  showAlert.value = true
  alertVariant.value = 'bg-blue-500'
  alertText.value = 'Please wait while we update the song'
  try {
    const songRef = doc(db, 'songs', props.song.id)
    await updateDoc(songRef, {
      modified_name: modifiedName.value,
      genre: genre.value,
    })

    emit('update-song', {
      id: props.song.id,
      modified_name: modifiedName.value,
      genre: genre.value,
    })
    showForm.value = false
    props.updateUnsavedFlag(false)
  } catch (error) {
    alertVariant.value = 'bg-red-500'
    alertText.value = 'Error updating song'
    inSubmition.value = false
    console.error('Error updating song:', error)
    return
  }
  inSubmition.value = false
  alertVariant.value = 'bg-green-500'
  alertText.value = 'Song updated successfully'
}

const deleteSong = async (id) => {
  try {
    const songStorageRef = storageRef(storage, `songs/${props.song.original_name}`)
    await deleteObject(songStorageRef)
    const songDocRef = doc(db, 'songs', id)
    await deleteDoc(songDocRef)
    console.log('Song deleted:', id)

    emit('delete-song', id)
  } catch (error) {
    console.error('Error deleting song:', error)
  }
}

// JavaScript hooks for transition - not working
const beforeEnter = (el) => {
  el.style.height = '0'
}
const enter = (el) => {
  el.style.height = el.scrollHeight + 'px'
}
const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
}
const leave = (el) => {
  el.style.height = '0'
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.5s ease;
}
.expand-enter, .expand-leave-to /* .expand-leave-active in <2.1.8 */ {
  max-height: 0;
  overflow: hidden;
}
</style>
