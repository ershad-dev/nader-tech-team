<script setup>
import { ref, watch } from 'vue'

const router = useRouter()

const MOCK_USER = {
  identifier: 'admin@test.com',
  password: '123456'
}

const identifier = ref('')
const password = ref('')

const errors = ref({
  identifier: '',
  password: '',
  general: ''
})

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

watch(identifier, () => {
  errors.value.identifier = ''
  errors.value.general = ''
})

watch(password, () => {
  errors.value.password = ''
  errors.value.general = ''
})

const handleLogin = () => {
  errors.value = {
    identifier: '',
    password: '',
    general: ''
  }

  const userIdentifier = identifier.value.trim()
  const userPassword = password.value.trim()

  // شناسه
  if (!userIdentifier) {
    errors.value.identifier = 'شماره تلفن یا ایمیل الزامی است'
  }

  // اگر ایمیل وارد شده باشد فرمتش بررسی شود
  if (
    userIdentifier.includes('@') &&
    !validateEmail(userIdentifier)
  ) {
    errors.value.identifier = 'فرمت ایمیل صحیح نیست'
  }

  // رمز عبور
  if (!userPassword) {
    errors.value.password = 'رمز عبور الزامی است'
  } else if (userPassword.length < 3) {
    errors.value.password = 'رمز عبور حداقل ۳ کاراکتر باشد'
  }

  if (
    errors.value.identifier ||
    errors.value.password
  ) {
    return
  }

  if (
    userIdentifier === MOCK_USER.identifier &&
    userPassword === MOCK_USER.password
  ) {
    localStorage.setItem('isAdminLoggedIn', 'true')
    router.push('/admin')
  } else {
    errors.value.general = 'ایمیل یا رمز عبور اشتباه است'
  }
}
</script>

<template>
  <div
    class="h-[600px] w-full flex items-center justify-center p-4"
    dir="rtl"
  >
    <div>
      <h1 class="text-center font-bold text-lg mb-10 text-[#1a2333] font-roboto">
        اطلاعات خود را وارد کنید
      </h1>

      <div class="space-y-4 text-right w-[400px]">
        <div>
          <AuthInput
            v-model="identifier"
            label="شماره تلفن یا ایمیل"
            type="text"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"
          />

          <p
            v-if="errors.identifier"
            class="mt-1 text-xs text-red-500"
          >
            {{ errors.identifier }}
          </p>
        </div>

        <div>
          <AuthInput
            v-model="password"
            label="رمز عبور"
            type="password"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"
          />

          <p
            v-if="errors.password"
            class="mt-1 text-xs text-red-500"
          >
            {{ errors.password }}
          </p>
        </div>

        <p
          v-if="errors.general"
          class="text-center text-sm text-red-500 font-medium"
        >
          {{ errors.general }}
        </p>

        <AuthButton
          @click="handleLogin"
          class="w-full mt-8 !bg-[#2d6a66]"
        >
          ورود
        </AuthButton>
      </div>
    </div>
  </div>
</template>