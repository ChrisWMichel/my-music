<template>
  <div>
    <li
      class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
    >
      <div>
        <router-link
          :to="{ name: 'song', params: { id: song.id } }"
          class="block font-bold text-gray-600"
          >{{ song.modified_name }}</router-link
        >
        <span class="text-sm text-gray-500">{{ song.display_name }}</span>
      </div>

      <div class="text-lg text-gray-600">
        <span class="comments">
          <i class="text-gray-600 fa fa-comments"></i>
          {{ song.comment_count }}
        </span>
      </div>
    </li>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  song: Object,
})
</script>

<style></style>
