<template>
  <div class="p-4 sm:p-6">
    <!-- عنوان صفحه -->
    <div
      class="w-full max-w-[812px] lg:w-[812px] bg-[#F7F3EB] dark:bg-dark-surface text-[#0F184B] dark:text-dark-text py-3 px-4 lg:px-6 rounded-full mx-auto mb-6 lg:mb-8 font-bold text-[18px] sm:text-[20px] lg:text-[24px] flex justify-center items-center shadow-xl"
    >
      اطلاعات کاربران
    </div>

    <!-- نوار جستجو -->
    <div
      class="w-full max-w-[812px] lg:w-[812px] mx-auto mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
    >
      <!-- دکمه جابجایی حالت جستجو -->
      <div class="flex bg-[#F7F3EB] dark:bg-dark-surface rounded-full p-1 shrink-0 self-start sm:self-auto">
        <button
          type="button"
          @click="setSearchMode('mobile')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-bold transition-all',
            searchMode === 'mobile'
              ? 'bg-[#2d6a66] dark:bg-dark-accent text-white dark:text-dark-text-deep'
              : 'text-[#0F184B] dark:text-dark-text'
          ]"
        >
          موبایل
        </button>
        <button
          type="button"
          @click="setSearchMode('name')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-bold transition-all',
            searchMode === 'name'
              ? 'bg-[#2d6a66] dark:bg-dark-accent text-white dark:text-dark-text-deep'
              : 'text-[#0F184B] dark:text-dark-text'
          ]"
        >
          نام
        </button>
      </div>

      <!-- اینپوت جستجو -->
      <div class="relative flex-1">
        <input
  v-model="searchQuery"
  type="text"
  :dir="searchMode === 'mobile' ? 'ltr' : 'rtl'"
  :placeholder="searchMode === 'mobile' ? 'جستجو بر اساس شماره موبایل' : 'جستجو بر اساس نام و نام‌خانوادگی'"
  :style="searchMode === 'mobile'
    ? 'padding-right: 1rem; padding-left: 2.75rem; text-align: right; box-sizing: border-box; display: block;'
    : 'padding-right: 1rem; padding-left: 2.75rem; text-align: right; box-sizing: border-box; display: block;'"
  class="w-full py-2.5 rounded-full bg-white dark:bg-dark-surface border border-[#BFD1D5] dark:border-dark-border/40 text-[#0F184B] dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-[#0F184B]/30"
/>
<button
  v-if="searchQuery"
  type="button"
  @click="clearSearch"
  style="left: 0.75rem; width: 1.25rem; height: 1.25rem; line-height: 1;"
  class="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-dark-text mt-[3px]"
>
  ✕
</button>
      </div>
    </div>

    <!-- حالت لودینگ -->
    <div v-if="loading || (isSearching && searchLoading)" class="text-center py-10 text-[#0F184B] dark:text-dark-text font-bold">
      {{ isSearching ? 'در حال جستجو در همه کاربران...' : 'در حال بارگذاری...' }}
    </div>

    <!-- حالت خطا -->
    <div
      v-else-if="errorMessage"
      class="text-center py-10 text-red-600 dark:text-red-400 font-bold"
    >
      {{ errorMessage }}
      <div>
        <button
          @click="fetchUsers()"
          class="mt-3 px-4 py-2 bg-[#0F184B] dark:bg-dark-accent text-white dark:text-dark-text-deep rounded-full text-sm"
        >
          تلاش مجدد
        </button>
      </div>
    </div>

    <template v-else>
      <div class="w-full text-black dark:text-dark-text text-[14px] sm:text-[16px] lg:text-[20px] font-noto-light font-medium">
        <!-- هدر جدول (فقط دسکتاپ) -->
        <div class="hidden lg:grid grid-cols-4 bg-[#BFD1D5] dark:bg-dark-surface py-4 px-6 rounded-t-2xl font-bold text-center">
          <div>کد کاربری</div>
          <div>نام و نام خانوادگی</div>
          <div>شماره موبایل</div>
          <div>ایمیل</div>
        </div>

        <!-- حالت بدون نتیجه -->
        <div
          v-if="!(loading || (isSearching && searchLoading)) && displayedUsers.length === 0"
          class="text-center py-10 text-gray-500 dark:text-dark-text/60 bg-[#F7F3EB] dark:bg-dark-bg rounded-2xl lg:rounded-none"
        >
          کاربری یافت نشد
        </div>

        <!-- لیست کاربران با جزئیات قابل بازشدن -->
        <div
          v-for="user in displayedUsers"
          :key="user.id"
          class="border-b border-[#E5E5E5] dark:border-dark-border/30 last:border-none bg-[#F7F3EB] dark:bg-dark-bg rounded-2xl lg:rounded-none mb-3 lg:mb-0 shadow-sm lg:shadow-none overflow-hidden"
        >
          <!-- ردیف اصلی کاربر (دسکتاپ: جدول / موبایل: کارت) -->
          <div
            @click="toggleUser(user.id)"
            class="cursor-pointer hover:bg-[#FDFBF7] dark:hover:bg-dark-surface/50 transition-all
                   flex flex-col gap-2 py-4 px-4
                   lg:grid lg:grid-cols-4 lg:text-[18px] lg:font-bold lg:py-6 lg:px-6 lg:text-center lg:gap-0 mb-[20px]"
          >
            <div class="flex justify-between items-center lg:block">
              <span class="text-xs text-gray-500 dark:text-dark-text/60 font-normal lg:hidden">کد کاربری</span>
              <span class="font-bold">{{ user.id }}</span>
            </div>

            <div class="flex justify-between items-center lg:block">
              <span class="text-xs text-gray-500 dark:text-dark-text/60 font-normal lg:hidden">نام و نام خانوادگی</span>
              <span class="break-words whitespace-normal">{{ user.full_name }}</span>
            </div>

            <div class="flex justify-between items-center lg:block">
              <span class="text-xs text-gray-500 dark:text-dark-text/60 font-normal lg:hidden">شماره موبایل</span>
              <span class="break-words whitespace-normal" dir="ltr">{{ user.mobile || '—' }}</span>
            </div>

            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
              <span class="text-xs text-gray-500 dark:text-dark-text/60 font-normal lg:hidden">ایمیل</span>
              <span class="break-words whitespace-normal text-left lg:text-center w-full" dir="ltr">{{ user.email || '—' }}</span>
            </div>
          </div>

          <!-- جزئیات باز شده‌ی کاربر -->
          <div
            v-if="expandedId === user.id"
            class="px-4 pb-4 lg:px-6 lg:pb-6 bg-[#F7F3EB] dark:bg-dark-bg"
          >
            <div v-if="detailLoading" class="text-center py-4 text-sm text-gray-500 dark:text-dark-text/60">
              در حال دریافت جزئیات...
            </div>

            <div v-else class="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6">

              <img
                :src="getAvatarUrl(user.avatar)"
                @error="onAvatarError"
                class="w-[90px] h-[90px] lg:w-[128px] lg:h-[128px] rounded-full shadow-lg object-cover shrink-0"
              />

              <div
                class="border border-[#BFD1D5] dark:border-dark-border/40 rounded-2xl bg-white/20 dark:bg-dark-surface/30 p-4 lg:p-6 w-full max-w-full lg:max-w-[850px]"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  <div>
                    <label class="block text-xs text-gray-500 dark:text-dark-text/60 mb-1">
                      تاریخ تولد
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] dark:bg-dark-input/50 border dark:border-dark-border/30 rounded-[10px] text-sm break-words whitespace-normal">
                      {{ formatDate(user.birth_date) }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 dark:text-dark-text/60 mb-1">
                      استان
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] dark:bg-dark-input/50 border dark:border-dark-border/30 rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.province || '—' }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 dark:text-dark-text/60 mb-1">
                      کد ملی
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] dark:bg-dark-input/50 border dark:border-dark-border/30 rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.national_code || '—' }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 dark:text-dark-text/60 mb-1">
                      کد پستی
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] dark:bg-dark-input/50 border dark:border-dark-border/30 rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.postal_code || '—' }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 dark:text-dark-text/60 mb-1">
                      نام کاربری
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] dark:bg-dark-input/50 border dark:border-dark-border/30 rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.username || '—' }}
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs text-gray-500 dark:text-dark-text/60 mb-1">
                      تاریخ عضویت
                    </label>
                    <div class="min-h-11 px-3 py-2 flex items-center bg-[#BFD1D580] dark:bg-dark-input/50 border dark:border-dark-border/30 rounded-[10px] text-sm break-words whitespace-normal">
                      {{ formatDate(user.created_at) }}
                    </div>
                  </div>

                  <div class="col-span-1 sm:col-span-2 lg:col-span-3">
                    <label class="block text-xs text-gray-500 dark:text-dark-text/60 mb-1">
                      آدرس و نشانی
                    </label>
                    <div class="min-h-[48px] px-3 py-3 bg-[#BFD1D580] dark:bg-dark-input/50 border dark:border-dark-border/30 rounded-[10px] text-sm break-words whitespace-normal">
                      {{ user.address || '—' }}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- صفحه‌بندی (فقط وقتی جستجو فعال نیست) -->
      <div
        v-if="!isSearching && meta && meta.last_page > 1"
        class="flex justify-center items-center gap-2 mt-6 flex-wrap"
      >
        <button
          :disabled="!links.prev"
          @click="goToPage(meta.current_page - 1)"
          class="px-3 py-1 rounded-full bg-[#F7F3EB] dark:bg-dark-surface dark:text-dark-text disabled:opacity-40 text-sm"
        >
          قبلی
        </button>

        <span class="text-sm dark:text-dark-text">
          صفحه {{ meta.current_page }} از {{ meta.last_page }}
        </span>

        <button
          :disabled="!links.next"
          @click="goToPage(meta.current_page + 1)"
          class="px-3 py-1 rounded-full bg-[#F7F3EB] dark:bg-dark-surface dark:text-dark-text disabled:opacity-40 text-sm"
        >
          بعدی
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

// هدر Authorization از composable مشترک لاگین
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

// حالت جستجو: سمت فرانت‌اند روی کش کامل کاربران انجام می‌شود
const searchMode = ref('mobile') // 'mobile' | 'name'
const searchQuery = ref('')
let searchDebounceTimer = null

const allUsersCache = ref([])
const allUsersLoaded = ref(false)
const searchLoading = ref(false)

const isSearching = computed(() => searchQuery.value.trim().length > 0)

// فیلتر کاربران کش‌شده بر اساس عبارت جستجو
const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return allUsersCache.value.filter((u) => {
    const field = searchMode.value === 'mobile' ? u.mobile : u.full_name
    return (field || '').toLowerCase().includes(q)
  })
})

// انتخاب لیست نمایشی: نتیجه‌ی سرچ یا لیست صفحه‌بندی‌شده‌ی عادی
const displayedUsers = computed(() => (isSearching.value ? searchResults.value : users.value))

const API_BASE = 'https://nadertechnologyteam.ir'
const DEFAULT_AVATAR = '/images/user-avatar.jpg'

// دریافت کامل تمام کاربران (با گذر از همه‌ی صفحات) برای استفاده در جستجو
const loadAllUsersForSearch = async () => {
  if (allUsersLoaded.value) return
  searchLoading.value = true
  errorMessage.value = ''
  try {
    const collected = []
    let page = 1
    let lastPage = 1
    const MAX_PAGES_SAFETY = 50

    do {
      const data = await $fetch(`${API_BASE}/api/admin/users`, {
        method: 'GET',
        headers: authHeader(),
        params: { page, per_page: 100 },
      })
      collected.push(...data.data)
      lastPage = data.meta.last_page
      page++
    } while (page <= lastPage && page <= MAX_PAGES_SAFETY)

    allUsersCache.value = collected
    allUsersLoaded.value = true
  } catch (err) {
    console.error('خطا در بارگذاری کامل کاربران برای جستجو', err)
    errorMessage.value = 'خطا در دریافت اطلاعات برای جستجو.'
  } finally {
    searchLoading.value = false
  }
}

// دریافت لیست صفحه‌بندی‌شده‌ی کاربران
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

// رفتن به صفحه‌ی مشخص از لیست کاربران
const goToPage = (page) => {
  if (page < 1 || (meta.value && page > meta.value.last_page)) return
  fetchUsers(page)
}

// دریافت جزئیات کامل‌تر یک کاربر خاص
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
    console.error('خطا در دریافت جزئیات کاربر', err)
  } finally {
    detailLoading.value = false
  }
}

// باز/بسته کردن جزئیات یک کاربر
const toggleUser = (id) => {
  if (expandedId.value === id) {
    expandedId.value = null
    return
  }
  expandedId.value = id
  fetchUserDetail(id)
}

// جابجایی بین حالت جستجوی موبایل و نام
const setSearchMode = (mode) => {
  if (searchMode.value === mode) return
  searchMode.value = mode
  if (searchQuery.value.trim() && !allUsersLoaded.value) {
    loadAllUsersForSearch()
  }
}

// پاک کردن عبارت جستجو
const clearSearch = () => {
  searchQuery.value = ''
}

// اجرای جستجو با تاخیر (debounce) برای جلوگیری از فراخوانی زودهنگام
const triggerSearch = (delay = 400) => {
  clearTimeout(searchDebounceTimer)
  searchDebounceTimer = setTimeout(() => {
    if (searchQuery.value.trim() && !allUsersLoaded.value) {
      loadAllUsersForSearch()
    }
  }, delay)
}

watch(searchQuery, () => {
  if (searchQuery.value.trim()) {
    triggerSearch()
  }
})

onBeforeUnmount(() => {
  clearTimeout(searchDebounceTimer)
})

// فرمت‌دهی تاریخ به شکل فارسی
const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('fa-IR')
  } catch {
    return dateStr
  }
}

// ساخت آدرس کامل آواتار کاربر
const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return DEFAULT_AVATAR
  if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
    return avatarPath
  }
  return `${API_BASE}${avatarPath}`
}

// جایگزینی آواتار خراب با تصویر پیش‌فرض
const onAvatarError = (event) => {
  event.target.src = DEFAULT_AVATAR
}

// مقداردهی اولیه احراز هویت و دریافت لیست کاربران
onMounted(() => {
  initFromStorage()
  fetchUsers()
})
</script>