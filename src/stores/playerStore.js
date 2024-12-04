import { defineStore } from 'pinia'
import { Howl } from 'howler'
import { ref, computed } from 'vue'
import { formatTime } from '@/includes/helper'

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref(null)
  let sound = null
  const isPlaying = ref(false)
  let seek = ref('00:00')
  let duration = ref('00:00')
  let playerProgress = ref(0)
  let formattedDuration = ref('00:00')
  let modified_name = ref('')
  //const commentCount = ref(0)

  const newSong = (song) => {
    currentSong.value = song
    modified_name.value = song.modified_name
    if (sound) {
      sound.unload()
    }
    sound = new Howl({
      src: [currentSong.value.url],
      html5: true,
      preload: true,
    })
    sound.play()
    isPlaying.value = true

    sound.on('play', () => {
      requestAnimationFrame(progress)
    })
  }
  const progress = () => {
    seek.value = formatTime(sound.seek())
    duration.value = formatTime(sound.duration())
    formattedDuration.value = formatTime(sound.duration())
    playerProgress.value = (sound.seek() / sound.duration()) * 100

    if (sound.playing()) {
      requestAnimationFrame(progress)
    }
  }

  const toggleAudio = () => {
    if (sound) {
      if (sound.playing()) {
        sound.pause()
        isPlaying.value = false
      } else {
        sound.play()
        isPlaying.value = true
      }
    }
  }

  const updateSeek = (value) => {
    if (!sound.playing) {
      return
      //sound.seek(sound.duration() * (value / 100))
    }
    const { x, width } = value.currentTarget.getBoundingClientRect()
    const clickX = value.clientX - x
    const percentage = clickX / width
    const seconds = sound.duration() * percentage

    sound.seek(seconds)
    sound.once('seek', () => {
      progress()
    })
  }

  const playing = computed(() => isPlaying.value)

  return {
    newSong,
    toggleAudio,
    playing,
    seek,
    duration,
    playerProgress,
    formattedDuration,
    modified_name,
    updateSeek,
  }
})
