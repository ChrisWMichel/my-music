<template>
  <div>
    <div
      v-if="login_show_alert"
      class="p-4 mb-4 font-bold text-center text-white"
      :class="login_alert_variant"
    >
      {{ login_alert_text }}
    </div>
    <transition name="fade">
      <Form :validation-schema="loginSchema" @submit="loginSubmit">
        <!-- Email -->
        <div class="mb-3">
          <label class="inline-block mb-2">Email</label>
          <Field
            name="email"
            type="email"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email"
          />
          <ErrorMessage name="email" class="text-red-600" />
        </div>
        <!-- Password -->
        <div class="mb-3">
          <label class="inline-block mb-2">Password</label>
          <Field
            name="password"
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
          />
          <ErrorMessage name="password" class="text-red-600" />
        </div>
        <button
          type="submit"
          class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
          :disabled="login_in_submission"
        >
          Submit
        </button>
      </Form>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, defineComponent } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { Form, Field, ErrorMessage } from 'vee-validate'
defineComponent({
  name: 'LoginForm',
})

const userStore = useUserStore()

let login_in_submission = ref(false)
let login_show_alert = ref(false)
const login_alert_variant = ref('bg-blue-500')
const login_alert_text = ref('Login in progress...')
const loginSchema = reactive({
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    min: 6,
  },
})

const loginSubmit = async (values) => {
  login_in_submission.value = true
  login_show_alert.value = true
  login_alert_variant.value = 'bg-blue-500'
  login_alert_text.value = 'Login in progress...'

  try {
    const userCredential = await userStore.authenticateUser(values.email, values.password)
    login_alert_variant.value = 'bg-green-500'
    login_alert_text.value = 'Login successful!'
    console.log('User logged in:', userCredential.user)
  } catch (error) {
    login_alert_variant.value = 'bg-red-500'
    login_alert_text.value = 'Login failed. Please try again.'
    console.error('Error logging in:', error)
  } finally {
    login_in_submission.value = false
  }
}
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
