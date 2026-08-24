<script setup>
import { ref, watch } from 'vue'
import { useAdminAuth } from '@/composables/useAdminAuth'

const { setAuth } = useAdminAuth()

const identifier = ref('')
const password = ref('')
const loading = ref(false)

const errors = ref({
  identifier: '',
  password: '',
  general: ''
})

// پاک کردن خطاها هنگام تایپ مجدد کاربر
watch([identifier, password], () => {
  errors.value = { identifier: '', password: '', general: '' }
})

// انجام عملیات ورود و مدیریت خطاهای احتمالی
const handleLogin = async () => {
  errors.value = { identifier: '', password: '', general: '' }

  const loginValue = identifier.value.trim()
  const passwordValue = password.value.trim()

  if (!loginValue) errors.value.identifier = 'نام کاربری یا ایمیل الزامی است'
  if (!passwordValue) errors.value.password = 'رمز عبور الزامی است'

  if (errors.value.identifier || errors.value.password) return

  loading.value = true

  try {
    const response = await $fetch('https://nadertechnologyteam.ir/api/admin/auth/login', {
      method: 'POST',
      body: {
        login: loginValue,
        password: passwordValue,
      },
    })

    const { access_token, admin } = response.data
    setAuth(access_token, admin)

    await navigateTo('/admin')
  } catch (err) {
    const status = err.response?.status || err.statusCode
    const body = err.response?._data || err.data

    if (status === 401) {
      errors.value.general = body?.message || 'اطلاعات ورود نادرست است.'
    } else if (status === 422) {
      const fieldErrors = body?.errors || {}
      errors.value.identifier = fieldErrors.login?.[0] || ''
      errors.value.password = fieldErrors.password?.[0] || ''
      if (!errors.value.identifier && !errors.value.password) {
        errors.value.general = body?.message || 'اطلاعات ارسالی نامعتبر است.'
      }
    } else if (status === 429) {
      errors.value.general = 'تعداد تلاش‌های ورود بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.'
    } else {
      errors.value.general = 'خطا در برقراری ارتباط با سرور. لطفاً دوباره تلاش کنید.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- فرم ورود ادمین -->
  <form @submit.prevent="handleLogin">
    <div class="min-h-[400px] w-full flex items-center justify-center p-4 sm:p-6" dir="rtl">
      <div class="w-full max-w-[400px] lg:w-auto lg:max-w-none">
        <h1 class="text-center font-bold text-base sm:text-lg mb-6 sm:mb-8 lg:mb-10 text-[#1a2333] font-roboto">
          اطلاعات خود را وارد کنید
        </h1>

        <div class="space-y-4 text-right w-full lg:w-[400px]">
          <!-- فیلد نام کاربری -->
          <div>
            <AuthInput
              v-model="identifier"
              label="نام کاربری"
              type="text"
              :disabled="loading"
              class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"
            />
            <p v-if="errors.identifier" class="mt-1 text-xs text-red-500">
              {{ errors.identifier }}
            </p>
          </div>

          <!-- فیلد رمز عبور -->
          <div>
            <AuthInput
              v-model="password"
              label="رمز عبور"
              type="password"
              :disabled="loading"
              class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"
            />
            <p v-if="errors.password" class="mt-1 text-xs text-red-500">
              {{ errors.password }}
            </p>
          </div>

          <p v-if="errors.general" class="text-center text-sm text-red-500 font-medium">
            {{ errors.general }}
          </p>

          <!-- دکمه ارسال فرم -->
          <AuthButton type="submit" :disabled="loading" class="w-full mt-8 !bg-[#2d6a66]">
            {{ loading ? 'در حال ورود...' : 'ورود' }}
          </AuthButton>
        </div>
      </div>
    </div>
  </form>
</template>