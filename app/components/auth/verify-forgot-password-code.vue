<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

definePageMeta({
  layout: 'auth'
})

const config = useRuntimeConfig()

const otp = ref(new Array(6).fill(''))
const inputRefs = ref([])

const loading = ref(false)

const timer = ref(180)
let interval = null

const toast = ref({
  message: '',
  type: ''
})

const showToast = (
  message,
  type = 'error'
) => {
  toast.value = {
    message,
    type
  }

  setTimeout(() => {
    toast.value = {
      message: '',
      type: ''
    }
  }, 4000)
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval)
  }
})

const startTimer = () => {
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

const formattedTimer = computed(() => {
  const m = Math.floor(timer.value / 60)
  const s = timer.value % 60

  return `${m}:${s
    .toString()
    .padStart(2, '0')}`
})

const handleInput = (index) => {
  otp.value[index] =
    otp.value[index].replace(/\D/g, '')

  if (
    otp.value[index] &&
    index < 5
  ) {
    inputRefs.value[
      index + 1
    ]?.focus()
  }
}

const handleBackspace = (
  event,
  index
) => {
  if (
    event.key === 'Backspace' &&
    !otp.value[index] &&
    index > 0
  ) {
    inputRefs.value[
      index - 1
    ]?.focus()
  }
}

const verifyCode = async () => {
  const login =
    localStorage.getItem(
      'reset_login'
    )

  if (!login) {
    navigateTo(
      '/auth/forgot-password'
    )
    return
  }

  const codeValue =
    otp.value.join('')

  if (codeValue.length !== 6) {
    showToast(
      'کد باید ۶ رقمی باشد'
    )
    return
  }

  loading.value = true

  try {
    const response = await $fetch(
      '/auth/verify-forgot-password-code',
      {
        baseURL:
          config.public.apiBase,
        method: 'POST',
        headers: {
          Accept:
            'application/json'
        },
        body: {
          login,
          code: codeValue
        }
      }
    )

    localStorage.setItem(
      'reset_token',
      response.reset_token
    )

    localStorage.setItem(
      'reset_login',
      login
    )

    showToast(
      'کد با موفقیت تایید شد',
      'success'
    )

    setTimeout(() => {
      navigateTo(
        '/auth/reset-password'
      )
    }, 1000)

  } catch (error) {
    showToast(
      error?.response?._data
        ?.message ||
      'کد نامعتبر یا منقضی شده است'
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="text-center"
    dir="rtl"
  >
    <div
      v-if="toast.message"
      :class="[
        'fixed top-5 left-5 z-50 px-4 py-3 rounded-xl text-white shadow-lg',
        toast.type === 'success'
          ? 'bg-green-500'
          : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

```
<h1
  class="text-xl font-bold text-[#1a2333] mb-3"
>
  تایید کد بازیابی
</h1>

<p
  class="text-sm text-gray-500 mb-8"
>
  کد ارسال شده را وارد کنید
</p>

<div
  class="flex justify-center gap-3 mb-8"
  dir="ltr"
>
  <input
    v-for="(
      _,
      index
    ) in otp"
    :key="index"
    :ref="
      el =>
        inputRefs[index] =
          el
    "
    v-model="otp[index]"
    maxlength="1"
    type="text"
    inputmode="numeric"
    class="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-300 bg-white focus:border-[#2d6a66] focus:outline-none"
    @input="
      handleInput(index)
    "
    @keydown="
      handleBackspace(
        $event,
        index
      )
    "
  />
</div>

<div
  class="text-[#2d6a66] font-bold text-sm mb-8"
>
  زمان باقی مانده:
  {{ formattedTimer }}
</div>

<AuthButton
  @click="verifyCode"
  :disabled="
    loading ||
    timer === 0
  "
>
  {{
    loading
      ? 'در حال بررسی...'
      : 'تایید کد'
  }}
</AuthButton>

<div
  v-if="timer === 0"
  class="mt-4 text-red-500 text-sm font-bold"
>
  زمان اعتبار کد به پایان رسیده است
</div>
```

  </div>
</template>
