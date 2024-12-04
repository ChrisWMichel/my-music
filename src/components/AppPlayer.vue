<template>
  <div class="fixed bottom-0 left-0 w-full px-4 py-2 bg-white">
    <!-- Track Info -->
    <div class="text-center" v-if="modifiedName">
      <span class="font-bold song-title">{{ modifiedName }}</span>
      <!-- by
      <span class="song-artist">Artist</span> -->
    </div>
    <div class="flex items-center gap-4 flex-nowrap">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleMusic">
        <i
          class="text-xl text-gray-500 fa"
          :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ playerStore.seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="playerStore.updateSeek"
        class="relative w-full h-2 bg-gray-200 rounded cursor-pointer"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: progress + '%' }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: progress + '%' }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ playerStore.formattedDuration }}</div>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from '@/stores/playerStore'
import { computed } from 'vue'

const playerStore = usePlayerStore()

const toggleMusic = () => {
  playerStore.toggleAudio()
}

const isPlaying = computed(() => playerStore.playing)
const progress = computed(() => playerStore.playerProgress)
const modifiedName = computed(() => playerStore.modified_name)
</script>

<style></style>
