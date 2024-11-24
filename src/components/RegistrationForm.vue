<template>
  <div>
    <div
      class="p-4 mb-4 font-bold text-center text-white rounded"
      v-if="reg_show_alert"
      :class="reg_alert_variant"
    >
      {{ reg_alert_text }}
    </div>
    <transition name="fade">
      <Form :validation-schema="schema" @submit="registerSubmit" :initial-values="userData">
        <!-- Name -->
        <div class="mb-3">
          <label class="inline-block mb-2">Name</label>
          <Field
            type="text"
            name="name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Name"
          />
          <ErrorMessage name="name" class="block text-red-600" />
        </div>
        <!-- Email -->
        <div class="mb-3">
          <label class="inline-block mb-2">Email</label>
          <Field
            type="email"
            name="email"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email"
          />
          <ErrorMessage name="email" class="block text-red-600" />
        </div>
        <!-- Age -->
        <div class="mb-3">
          <label class="inline-block mb-2">Age</label>
          <Field
            type="number"
            name="age"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          />
          <ErrorMessage name="age" class="block text-red-600" />
        </div>
        <!-- Password -->
        <div class="mb-3">
          <label class="inline-block mb-2">Password</label>
          <Field name="password" :bails="false" v-slot="{ field, errors }">
            <input
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Password"
              v-bind="field"
              type="password"
            />
            <div class="text-red-600" v-for="error in errors" :key="error">
              {{ error }}
            </div>
          </Field>
        </div>
        <!-- Confirm Password -->
        <div class="mb-3">
          <label class="inline-block mb-2">Confirm Password</label>
          <Field
            type="password"
            name="confirm_password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confirm_password" class="text-red-600" />
        </div>
        <!-- Country -->
        <div class="mb-3">
          <label class="inline-block mb-2">Country</label>
          <Field
            as="select"
            name="country"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="USA">USA</option>
            <option value="Mexico">Mexico</option>
            <option value="Germany">Germany</option>
          </Field>
        </div>
        <ErrorMessage name="country" class="block text-red-600" />
        <!-- TOS -->
        <div class="pl-6 mb-3">
          <Field
            type="checkbox"
            name="tos"
            value="1"
            class="float-left w-4 h-4 mt-1 -ml-6 rounded"
          />
          <ErrorMessage name="tos" class="block text-red-600" />
          <label class="inline-block">Accept terms of service</label>
        </div>
        <button
          type="submit"
          class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
          :disabled="reg_in_progress"
        >
          Submit
        </button>
      </Form>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref, defineComponent } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import { useModalStore } from '@/stores/modalStore'

defineComponent({
  name: 'RegistrationForm',
})

const userStore = useUserStore()
const modalStore = useModalStore()

let reg_in_progress = ref(false)
let reg_show_alert = ref(false)
const reg_alert_variant = ref('bg-blue-500')
const reg_alert_text = ref('Please wait while we process your registration')

const schema = reactive({
  name: {
    required: true,
    min: 3,
    max: 50,
    alphaSpaces: true,
  },
  email: {
    required: true,
    email: true,
  },
  age: {
    required: true,
    minValue: 18,
  },
  password: {
    required: true,
    min: 6,
  },
  confirm_password: {
    confirmed: '@password',
  },
  country: {
    required: true,
  },
  tos: 'tos',
})

const userData = reactive({
  name: '',
  email: '',
  age: '',
  password: '',
  confirm_password: '',
  country: 'USA',
  tos: '',
})

const registerSubmit = async (values) => {
  reg_show_alert.value = true
  reg_in_progress.value = true
  reg_alert_variant.value = 'bg-blue-500'
  reg_alert_text.value = 'Please wait while we process your registration'

  try {
    await userStore.register(values)
    //console.log('User signed up:', userCredential.user)
  } catch (error) {
    console.error('Error signing up:', error)
    reg_in_progress.value = false
    reg_alert_variant.value = 'bg-red-500'
    reg_alert_text.value = 'An error occurred while processing your registration'
    return
  }

  reg_alert_variant.value = 'bg-green-500'
  reg_alert_text.value = 'Registration successful!'
  modalStore.toggle()
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
