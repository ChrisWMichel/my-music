<template>
  <!-- Auth Modal -->
  <transition name="fade">
    <div v-if="modalStore.isOpen" class="fixed inset-0 z-10 overflow-y-auto" id="modal">
      <div
        class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div
          class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="px-6 py-4 text-left">
            <!--Title-->
            <div class="flex items-center justify-between pb-4">
              <p class="text-2xl font-bold">Your Account</p>
              <!-- Modal Close Button -->
              <div class="z-50 cursor-pointer modal-close" @click="modalStore.toggle">
                <i class="fas fa-times"></i>
              </div>
            </div>

            <!-- Tabs -->
            <ul class="flex flex-wrap mb-4">
              <li class="flex-auto text-center">
                <a
                  class="block px-4 py-3 transition rounded"
                  href="#"
                  @click.prevent="tab = 'login'"
                  :class="{
                    'text-white bg-blue-600 rounded': tab === 'login',
                    'hover:text-blue-600': tab === 'register',
                  }"
                >
                  Login
                </a>
              </li>
              <li class="flex-auto text-center">
                <a
                  class="block px-4 py-3 transition rounded"
                  href="#"
                  @click.prevent="tab = 'register'"
                  :class="{
                    'text-white bg-blue-600 rounded': tab === 'register',
                    'hover:text-blue-600': tab === 'login',
                  }"
                >
                  Register
                </a>
              </li>
            </ul>

            <!-- Login Form -->
            <LoginForm v-if="tab === 'login'" />
            <!-- Registration Form -->
            <RegistrationForm v-else />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import LoginForm from './LoginForm.vue'
import RegistrationForm from './RegistrationForm.vue'

const modalStore = useModalStore()
const tab = ref('login')
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
