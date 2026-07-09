<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div
      class="bg-[#F7F3EB] text-[#0F184B] py-3 px-4 lg:px-6 rounded-full w-full max-w-[812px] lg:w-[812px] h-[52px] lg:h-[60px] mx-auto mb-6 lg:mb-10 font-bold text-[16px] sm:text-[18px] lg:text-[20px] flex items-center justify-center shadow-xl"
    >
      تغییر عکس بنر
    </div>

    <!-- پیام خطا / بارگذاری کلی لیست -->
    <div v-if="loadingList" class="text-center text-[#0F184B] font-bold py-6">
      در حال بارگذاری بنرها...
    </div>
    <div v-else-if="listError" class="text-center text-red-600 font-bold py-6">
      {{ listError }}
      <button @click="fetchBanners" class="underline mr-2">تلاش مجدد</button>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-10 lg:gap-x-20 gap-y-6 sm:gap-y-8 lg:gap-y-10 justify-items-center"
      dir="ltr"
    >
      <div
        v-for="banner in banners"
        :key="banner.id ?? banner.tempId"
        class="w-full max-w-[437px] lg:w-[437px]"
        dir="rtl"
      >

        <template v-if="banner.image">
          <div
            class="relative rounded-[20px] lg:rounded-[27px] overflow-hidden shadow-lg w-full aspect-[437/283] lg:w-[437px] lg:h-[283px]"
          >
            <img :src="banner.image" class="w-full h-full object-cover" />

            <div
              class="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] lg:w-[72px] lg:h-[71px] absolute top-0 right-0 bg-[#08103580] backdrop-blur-md text-white rounded-bl-2xl rounded-tr-[20px] lg:rounded-tr-[27px] font-black text-[24px] sm:text-[30px] lg:text-[36px] shadow-lg flex items-center justify-center"
            >
              {{ banner.id }}
            </div>

            <!-- نشان‌گر وضعیت فعال بودن -->
            <div
              v-if="banner.is_active"
              class="absolute bottom-2 left-2 bg-green-600/90 text-white text-xs font-bold px-3 py-1 rounded-full"
            >
              فعال روی سایت
            </div>

            <!-- لودینگ روی عکس هنگام آپلود/بروزرسانی -->
            <div
              v-if="banner.busy"
              class="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-sm"
            >
              در حال پردازش...
            </div>
          </div>

          <div class="flex justify-center gap-3 lg:gap-4 mt-4 w-full lg:w-[437px]">
            <button
              @click="toggleActive(banner)"
              :disabled="banner.busy"
              :class="[
                'w-[140px] sm:w-[160px] lg:w-[172px] h-[34px] rounded-[27px] font-bold flex items-center justify-center text-[14px] sm:text-[15px] lg:text-[16px] disabled:opacity-50',
                banner.is_active
                  ? 'bg-[#7FCB86] hover:bg-[#66B36D] text-black'
                  : 'bg-[#ABD7D8] hover:bg-[#8FB0B2] text-black'
              ]"
            >
              {{ banner.is_active ? 'فعال است' : 'تایید' }}
            </button>
            <button
              @click="deleteBanner(banner)"
              :disabled="banner.busy"
              class="w-[140px] sm:w-[160px] lg:w-[172px] h-[34px] bg-[#ABD7D8] hover:bg-[#8FB0B2] rounded-[27px] font-bold text-black flex items-center justify-center text-[14px] sm:text-[15px] lg:text-[16px] disabled:opacity-50"
            >
              حذف
            </button>
          </div>

          <p v-if="banner.error" class="text-red-600 text-xs text-center mt-2">
            {{ banner.error }}
          </p>
        </template>

        <div
          v-else
          class="relative w-full aspect-[437/325] lg:w-[437px] lg:h-[325px] border-4 border-dashed border-[#BFD1D5] rounded-[20px] lg:rounded-[27px] flex flex-col items-center justify-center cursor-pointer hover:bg-[#FDFBF7] transition-all"
        >
          <input
            type="file"
            accept="image/*"
            class="hidden"
            :id="'file-' + (banner.id ?? banner.tempId)"
            @change="uploadBanner($event, banner)"
          />
          <label
            :for="'file-' + (banner.id ?? banner.tempId)"
            class="cursor-pointer text-5xl sm:text-6xl text-[#BFD1D5]"
          >
            +
          </label>
          <span class="text-[#0F184B] font-bold mt-2 text-sm sm:text-base">افزودن بنر جدید</span>

          <div
            v-if="banner.busy"
            class="absolute inset-0 bg-black/30 rounded-[20px] lg:rounded-[27px] flex items-center justify-center text-white font-bold text-sm"
          >
            در حال آپلود...
          </div>
          <p v-if="banner.error" class="text-red-600 text-xs text-center mt-2 px-2">
            {{ banner.error }}
          </p>
        </div>

      </div>

      <!-- کارت خالی برای افزودن بنر کاملا جدید -->
      <div class="w-full max-w-[437px] lg:w-[437px]" dir="rtl">
        <div
          class="relative w-full aspect-[437/325] lg:w-[437px] lg:h-[325px] border-4 border-dashed border-[#BFD1D5] rounded-[20px] lg:rounded-[27px] flex flex-col items-center justify-center cursor-pointer hover:bg-[#FDFBF7] transition-all"
        >
          <input
            type="file"
            accept="image/*"
            class="hidden"
            id="file-new-banner"
            @change="uploadNewBanner"
          />
          <label for="file-new-banner" class="cursor-pointer text-5xl sm:text-6xl text-[#BFD1D5]">
            +
          </label>
          <span class="text-[#0F184B] font-bold mt-2 text-sm sm:text-base">افزودن بنر جدید</span>

          <div
            v-if="newBannerBusy"
            class="absolute inset-0 bg-black/30 rounded-[20px] lg:rounded-[27px] flex items-center justify-center text-white font-bold text-sm"
          >
            در حال آپلود...
          </div>
        </div>
        <p v-if="newBannerError" class="text-red-600 text-xs text-center mt-2 px-2">
          {{ newBannerError }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminAuth } from '@/composables/useAdminAuth' // مسیر رو با ساختار پروژه‌تون تطبیق بدید

const { authHeader, initFromStorage, isLoggedIn, clearAuth } = useAdminAuth()

// همون دامنه‌ای که در صفحه‌ی لاگین استفاده شده
const BASE_URL = 'https://nadertechnologyteam.ir/api/admin/banners'

/**
 * لایه‌ی نازک روی $fetch نوکس:
 * - هدر Authorization رو خودکار اضافه می‌کنه
 * - اگه 401 بگیریم یعنی توکن نامعتبر/منقضی شده، auth رو پاک و به لاگین هدایت می‌کنیم
 */
async function apiFetch(url, options = {}) {
  try {
    return await $fetch(url, {
      ...options,
      headers: {
        ...authHeader(),
        ...(options.headers || {}),
      },
    })
  } catch (err) {
    const status = err.response?.status || err.statusCode
    const body = err.response?._data || err.data

    if (status === 401) {
      clearAuth()
      await navigateTo('/admin/login') // مسیر صفحه‌ی لاگین رو در صورت نیاز تطبیق بدید
      throw new Error('نشست شما منقضی شده. لطفا دوباره وارد شوید.')
    }

    const message =
      body?.message ||
      (body?.errors && Object.values(body.errors).flat().join(' ')) ||
      'خطایی رخ داد. لطفا دوباره تلاش کنید.'
    throw new Error(message)
  }
}

/** ====== state ====== */
const banners = ref([])
const loadingList = ref(false)
const listError = ref('')
const newBannerBusy = ref(false)
const newBannerError = ref('')

/** ====== دریافت لیست بنرها ====== */
const fetchBanners = async () => {
  loadingList.value = true
  listError.value = ''
  try {
    const res = await apiFetch(`${BASE_URL}?page=1`, { method: 'GET' })
    banners.value = (res.data || []).map((b) => ({
      ...b,
      busy: false,
      error: '',
    }))
  } catch (err) {
    listError.value = err.message
  } finally {
    loadingList.value = false
  }
}

onMounted(() => {
  // اول توکن رو از localStorage بازیابی کن، بعد لیست رو بگیر
  initFromStorage()
  if (!isLoggedIn()) {
    navigateTo('/admin/login') // مسیر صفحه‌ی لاگین رو در صورت نیاز تطبیق بدید
    return
  }
  fetchBanners()
})

/** ====== تغییر وضعیت فعال/غیرفعال (دکمه‌ی تایید) ====== */
const toggleActive = async (banner) => {
  banner.busy = true
  banner.error = ''
  const nextValue = !banner.is_active
  try {
    const res = await apiFetch(`${BASE_URL}/${banner.id}/status`, {
      method: 'PUT',
      body: { is_active: nextValue },
    })
    banner.is_active = res.data.is_active
  } catch (err) {
    banner.error = err.message
  } finally {
    banner.busy = false
  }
}

/** ====== حذف بنر ====== */
const deleteBanner = async (banner) => {
  if (!confirm('آیا از حذف این بنر مطمئن هستید؟')) return

  banner.busy = true
  banner.error = ''
  try {
    await apiFetch(`${BASE_URL}/${banner.id}`, { method: 'DELETE' })
    banners.value = banners.value.filter((b) => b.id !== banner.id)
  } catch (err) {
    banner.error = err.message
    banner.busy = false
  }
}

/** ====== آپلود / جایگزینی تصویر یک بنر موجود ====== */
const uploadBanner = async (event, banner) => {
  const file = event.target.files[0]
  if (!file) return

  banner.busy = true
  banner.error = ''

  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await apiFetch(`${BASE_URL}/${banner.id}/image`, {
      method: 'PUT',
      body: formData,
    })
    Object.assign(banner, res.data)
  } catch (err) {
    banner.error = err.message
  } finally {
    banner.busy = false
    event.target.value = ''
  }
}

/** ====== ساخت یک بنر کاملا جدید ====== */
const uploadNewBanner = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  newBannerBusy.value = true
  newBannerError.value = ''

  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await apiFetch(BASE_URL, {
      method: 'POST',
      body: formData,
    })
    banners.value.push({ ...res.data, busy: false, error: '' })
  } catch (err) {
    newBannerError.value = err.message
  } finally {
    newBannerBusy.value = false
    event.target.value = ''
  }
}
</script>