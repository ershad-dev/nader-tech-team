<template>
  <div class="p-4 sm:p-6">
    <div
      class="w-full max-w-[812px] lg:w-[812px] bg-[#F7F3EB] text-[#0F184B] py-3 px-4 lg:px-6 rounded-full mx-auto mb-6 lg:mb-8 font-bold text-[18px] sm:text-[20px] lg:text-[24px] flex justify-center items-center shadow-xl"
    >
      اطلاعات کاربران
    </div>

    <!-- حالت لودینگ -->
    <div v-if="loading" class="text-center py-10 text-[#0F184B] font-bold">
      در حال بارگذاری...
    </div>

    <!-- حالت خطا -->
    <div
      v-else-if="errorMessage"
      class="text-center py-10 text-red-600 font-bold"
    >
      {{ errorMessage }}
      <div>
        <button
          @click="fetchUsers()"
          class="mt-3 px-4 py-2 bg-[#0F184B] text-white rounded-full text-sm"
        >
          تلاش مجدد
        </button>
      </div>
    </div>

    <template v-else>
      <div class="w-full text-black text-[14px] sm:text-[16px] lg:text-[20px] font-noto-light font-medium">
        <!-- Table Header (فقط دسکتاپ) -->
        <div class="hidden lg:grid grid-cols-4 bg-[#BFD1D5] py-4 px-6 rounded-t-2xl font-bold text-center">
          <div>کد کاربری</div>
          <div>نام و نام خانوادگی</div>
          <div>شماره موبایل</div>
          <div>ایمیل</div>
        </div>

        <!-- بدون کاربر -->
        <div
          v-if="users.length === 0"
          class="text-center py-10 text-gray-500 bg-[#F7F3EB] rounded-2xl lg:rounded-none"
        >
          کاربری یافت نشد
        </div>

        <div
          v-for="user in users"
          :key="user.id"
          class="border-b border-[#E5E5E5] last:border-none bg-[#F7F3EB] rounded-2xl lg:rounded-none mb-3 lg:mb-0 shadow-sm lg:shadow-none overflow-hidden"
        >
          <!-- Row: دسکتاپ همون گرید قبلی / موبایل و تبلت کارت عمودی -->
          <div
            @click="toggleUser(user.id)"
            class="cursor-pointer hover:bg-[#FDFBF7] transition-all
                   flex flex-col gap-2 py-4 px-4
                   lg:grid lg:grid-cols-4 lg:text-[18px] lg:font-bold lg:py-6 lg:px-6 lg:text-center lg:gap-0"
          >
            <div class="flex justify-between items-center lg:block">
              <span class="text-xs text-gray-500 font-normal lg:hidden">کد کاربری</span>
              <span class="font-bold">{{ user.id }}</span>
            </div>

            <div class="flex justify-between items-center lg:block">
              <span class="text-xs text-gray-500 font-normal lg:hidden">نام و نام خانوادگی</span>
              <span class="break-words whitespace-normal">{{ user.full_name }}</span>
            </div>

            <div class="flex justify-between items-center lg:block">
              <span class="text-xs text-gray-500 font-normal lg:hidden">شماره موبایل</span>
              <span class="break-words whitespace-normal" dir="ltr">{{ user.mobile || '—' }}</span>
            </div>

            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
              <span class="text-xs text-gray-500 font-normal lg:hidden">ایمیل</span>
              <span class="break-words whitespace-normal text-left lg:text-center w-full" dir="ltr">{{ user.email || '—' }}</span>
            </div>
          </div>

          <!-- Expanded Details -->
          <div
            v-if="expandedId === user.id"
            class="px-4 pb-4 lg:px-6 lg:pb-6 bg-[#F7F3EB]"
          >
            <!-- لودینگ جزئیات (در صورت فراخوانی GET /api/admin/users/{user}) -->
            <div v-if="detailLoading" class="text-center py-4 text-sm text-gray-500">
              در حال دریافت جزئیات...
            </div>

            <div v-else class="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6">

              <img
                :src="getAvatarUrl(user.avatar)"
                @error="onAvatarError"
                class="w-[90px] h-[90px] lg:w-[128px] lg:h-[128px] rounded-full shadow-lg object-cover shrink-0"
              />

              <div
                class="border border-[#BFD1D5] rounded-2xl bg-white/20 p-4 lg:p-6 w-full max-w-full lg:max-w-[850px]"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  <div>
                    <label class="block text-xs text-gray-500 mb-1">
                      تاریخ تولد
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm break-words whitespace-normal">
                      {{ formatDate(user.birth_date) }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 mb-1">
                      استان
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.province || '—' }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 mb-1">
                      کد ملی
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.national_code || '—' }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 mb-1">
                      کد پستی
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.postal_code || '—' }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 mb-1">
                      نام کاربری
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.username || '—' }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 mb-1">
                      تاریخ عضویت
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm break-words whitespace-normal">
                      {{ formatDate(user.created_at) }}
                    </div>
                  </div>

                  <div class="col-span-1 sm:col-span-2 lg:col-span-3">
                    <label class="block text-xs text-gray-500 mb-1">
                      آدرس و نشانی
                    </label>
                    <div class="min-h-[48px] px-3 py-3 bg-[#BFD1D580] border rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.address || '—' }}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="meta && meta.last_page > 1"
        class="flex justify-center items-center gap-2 mt-6 flex-wrap"
      >
        <button
          :disabled="!links.prev"
          @click="goToPage(meta.current_page - 1)"
          class="px-3 py-1 rounded-full bg-[#F7F3EB] disabled:opacity-40 text-sm"
        >
          قبلی
        </button>

        <span class="text-sm">
          صفحه {{ meta.current_page }} از {{ meta.last_page }}
        </span>

        <button
          :disabled="!links.next"
          @click="goToPage(meta.current_page + 1)"
          class="px-3 py-1 rounded-full bg-[#F7F3EB] disabled:opacity-40 text-sm"
        >
          بعدی
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// هدر Authorization از همان composable مشترک لاگین گرفته می‌شود
const { authHeader, initFromStorage } = useAdminAuth()

const users = ref([])
const meta = ref(null)
const links = ref({})
const loading = ref(false)
const errorMessage = ref('')

const expandedId = ref(null)
const detailLoading = ref(false)

const currentPage = ref(1)
const perPage = ref(15)

const API_BASE = 'https://nadertechnologyteam.ir'
const DEFAULT_AVATAR = '/images/user-avatar.jpg'

const fetchUsers = async (page = currentPage.value) => {
  loading.value = true
  errorMessage.value = ''
  try {
    const data = await $fetch(`${API_BASE}/api/admin/users`, {
      method: 'GET',
      headers: authHeader(),
      params: {
        page,
        per_page: perPage.value,
      },
    })

    users.value = data.data
    meta.value = data.meta
    links.value = data.links
    currentPage.value = data.meta.current_page
  } catch (err) {
    const status = err.response?.status || err.statusCode

    if (status === 401) {
      errorMessage.value = 'ابتدا وارد حساب کاربری شوید.'
    } else if (status === 403) {
      errorMessage.value = 'شما دسترسی ادمین برای مشاهده این بخش را ندارید.'
    } else if (status === 422) {
      errorMessage.value = 'پارامترهای درخواست نامعتبر است.'
    } else {
      errorMessage.value = 'خطا در دریافت اطلاعات کاربران.'
    }
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  if (page < 1 || (meta.value && page > meta.value.last_page)) return
  fetchUsers(page)
}

// در صورت نیاز به جزئیات کامل‌تر از GET /api/admin/users/{user}
const fetchUserDetail = async (id) => {
  detailLoading.value = true
  try {
    const data = await $fetch(`${API_BASE}/api/admin/users/${id}`, {
      method: 'GET',
      headers: authHeader(),
    })
    const index = users.value.findIndex((u) => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...data.data }
    }
  } catch (err) {
    // در صورت خطا، اطلاعات پایه‌ای که از لیست داریم همچنان نمایش داده می‌شود
    console.error('خطا در دریافت جزئیات کاربر', err)
  } finally {
    detailLoading.value = false
  }
}

const toggleUser = (id) => {
  if (expandedId.value === id) {
    expandedId.value = null
    return
  }
  expandedId.value = id
  fetchUserDetail(id) // برای دریافت جزئیات به‌روز کاربر (اختیاری)
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('fa-IR')
  } catch {
    return dateStr
  }
}

// ساخت آدرس کامل آواتار: اگر مسیر نسبی از سرور باشد (مثل /avatars/xxx.webp) با API_BASE ترکیب می‌شود
const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return DEFAULT_AVATAR
  if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
    return avatarPath
  }
  return `${API_BASE}${avatarPath}`
}

// اگر عکس آواتار لود نشد (خراب یا ۴۰۴)، به عکس پیش‌فرض برگردد
const onAvatarError = (event) => {
  event.target.src = DEFAULT_AVATAR
}

onMounted(() => {
  initFromStorage() // اطمینان از بازیابی توکن قبل از اولین درخواست
  fetchUsers()
})
</script>