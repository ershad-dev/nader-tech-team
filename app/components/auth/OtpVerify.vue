<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()

const otp = ref(['', '', '', '', '', ''])
const loginToken = ref('')
const timer = ref(120)
const inputRefs = ref([])

let interval = null

onMounted(() => {
  const storedToken = localStorage.getItem('login_token')

  if (!storedToken) {
    navigateTo('/auth/login')
    return
  }

  loginToken.value = storedToken
  startTimer()
})

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval)
  }
})

// تایمر
const startTimer = () => {
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

// نمایش تایمر
const formattedTimer = computed(() => {
  const m = Math.floor(timer.value / 60)
  const s = timer.value % 60

  return `${m}:${s.toString().padStart(2, '0')}`
})

// مدیریت ورود اعداد و فوکوس خودکار
const handleInput = (index) => {
  otp.value[index] = otp.value[index].replace(/\D/g, '')

  if (otp.value[index] && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

// تایید OTP
const verifyCode = async () => {
  const code = otp.value.join('')

  if (code.length !== 6) {
    alert('کد ۶ رقمی را کامل وارد کنید')
    return
  }

  if (!loginToken.value) {
    alert('توکن ورود پیدا نشد')
    await navigateTo('/auth/login')
    return
  }

  try {
    const response = await $fetch('/auth/verify-otp', {
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: {
        login_token: loginToken.value,
        code
      }
    })

    console.log('VERIFY RESPONSE =>', response)

    const accessToken = response?.data?.access_token
    const user = response?.data?.user

    if (!accessToken) {
      alert('توکن دریافت نشد')
      return
    }

    localStorage.setItem('access_token', accessToken)

    if (user) {
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      )
    }

    localStorage.removeItem('login_token')

    await navigateTo('/profile')

  } catch (error) {
    console.error('VERIFY OTP ERROR =>', error)

    alert(
      error?.data?.message ||
      error?.response?._data?.message ||
      'کد وارد شده نامعتبر یا منقضی شده است'
    )
  }
}
</script>

  <template>
    <div class="text-center" dir="rtl">
      <h1 class="text-xl font-bold text-[#1a2333] mb-10">کد تأیید را وارد کنید</h1>

      <div class="flex justify-center gap-2 mb-6">
        <input 
          v-for="i in 6" :key="i"
          v-model="otp[i-1]"
          :ref="el => inputRefs[i-1] = el"
          @input="handleInput(i-1)"
          type="text" maxlength="1" 
          class="w-12 h-16 bg-[#cedce0] rounded-xl text-center text-2xl font-bold text-[#1a2333] focus:outline-none focus:ring-2 focus:ring-[#2d6a66]"
        />
      </div>

      <div class="mb-10 text-sm text-[#1a2333] font-medium">
        {{ formattedTimer }}
      </div>
      
      <AuthButton @click="verifyCode">تایید کد</AuthButton>

      <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer">
        <NuxtLink to="/auth/login">بازگشت به صفحه ورود</NuxtLink>
      </div>
    </div>
  </template>