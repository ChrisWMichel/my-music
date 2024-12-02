<template>
  <div>
    <!-- Music Header -->
    <section class="relative w-full mb-8 text-center text-white py-14">
      <div
        class="box-border absolute inset-0 w-full h-full bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container flex items-center mx-auto">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 w-24 h-24 text-3xl text-black bg-white rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 ml-8 text-left">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song?.modified_name }}</div>
          <div>{{ song?.display_name }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div class="relative flex flex-col bg-white border border-gray-200 rounded">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ sortedComments.length }})</span>
          <i class="float-right text-2xl text-green-400 fa fa-comments"></i>
        </div>
        <div class="p-6">
          <div
            class="p-4 mb-4 font-bold text-center text-white"
            v-if="comment_show_alert"
            :class="comment_alert_variant"
          >
            {{ comment_alert_text }}
          </div>
          <Form
            :validation-schema="commentSchema"
            @submit="addComment"
            v-if="userStore.userLoggedIn"
          >
            <Field
              as="textarea"
              name="comment"
              v-model="commentContent"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></Field>
            <ErrorMessage name="comment" class="text-red-600" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </Form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.sid"
        class="p-6 border border-gray-200 bg-gray-50"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ formatDate(comment.created_at) }}</time>
        </div>

        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc, addDoc, getDocs, query, where } from 'firebase/firestore'
import { songsCollection, commentsCollection } from '@/includes/firebase'
import { auth } from '@/includes/firebase'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const songId = route.params.id
const song = ref(null)
const commentContent = ref('')
const commentSchema = {
  comment: 'required|min:5',
}
const comment_in_submission = ref(false)
const comment_show_alert = ref(false)
const comment_alert_variant = ref('bg-blue-500')
const comment_alert_text = ref('Adding comment...')
const allComments = ref([])
const sort = ref(1)

const fetchSong = async (id) => {
  try {
    const songDoc = await getDoc(doc(songsCollection, id))
    if (songDoc.exists()) {
      song.value = songDoc.data()
    } else {
      console.error('No such document!')
      router.push({ name: 'home' })
      return
    }
  } catch (error) {
    console.error('Error fetching song:', error)
  }
}

const addComment = async (value, { resetForm }) => {
  comment_in_submission.value = true
  comment_show_alert.value = true
  comment_alert_variant.value = 'bg-blue-500'
  comment_alert_text.value = 'Adding comment...'

  const comment = {
    //content: commentContent.value,
    content: value.comment,
    created_at: new Date().toString(),
    sid: route.params.id,
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
  }

  try {
    await addDoc(commentsCollection, comment)
    comment_alert_variant.value = 'bg-green-500'
    comment_alert_text.value = 'Comment added successfully!'
    commentContent.value = ''
    await getComments(songId)
    resetForm()
  } catch (error) {
    console.error('Error adding comment:', error)
    comment_alert_variant.value = 'bg-red-500'
    comment_alert_text.value = 'Error adding comment.'
  } finally {
    comment_in_submission.value = false

    resetForm()
  }
}

const getComments = async (songId) => {
  try {
    const q = query(commentsCollection, where('sid', '==', songId))
    const querySnapshot = await getDocs(q)
    allComments.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching comments:', error)
  }
}

const sortedComments = computed(() => {
  //console.log('sort', sort.value)
  return allComments.value.slice().sort((a, b) => {
    if (sort.value === 1) {
      return new Date(b.created_at) - new Date(a.created_at)
    } else {
      return new Date(a.created_at) - new Date(b.created_at)
    }
  })
})

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

watch(sort, (newVal) => {
  if (newVal === route.query.sort) return
  router.push({ query: { sort: newVal } })
})

onMounted(async () => {
  fetchSong(songId)

  const { sort: sortQuery } = route.query
  if (sortQuery) {
    sort.value = parseInt(sortQuery)
  }
  getComments(songId)
})
</script>

<style></style>
