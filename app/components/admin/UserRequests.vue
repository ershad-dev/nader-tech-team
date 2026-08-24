<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth'

const config = useRuntimeConfig?.() || { public: { apiBase: 'https://nadertechnologyteam.ir' } }
const API_BASE = config.public?.apiBase || 'https://nadertechnologyteam.ir'

const { authHeader, initFromStorage, isLoggedIn } = useAdminAuth()

const colorMode = useColorMode()
const chevronColor = computed(() => (colorMode.value === 'dark' ? '#FFFFFF' : '#747893'))

const tabs = ref([])
const activeTab = ref(null)
const tabsLoading = ref(true)   // 👈 تغییر: از false به true

const fetchRequestTypes = async () => {
  tabsLoading.value = true
  try {
    const res = await $fetch(`${API_BASE}/admin/requests/types`, {
      method: 'GET',
      headers: { ...authHeader() },
    })
    tabs.value = res?.data || []
  } catch (err) {
    console.error('خطا در دریافت انواع درخواست:', err)
    tabs.value = []
  } finally {
    tabsLoading.value = false
  }
}

const DEFAULT_AVATAR = '/images/user-avatar.jpg'
const isLoading = ref(true)   // 👈 تغییر: از false به true
const errorMessage = ref('')
const requests = ref([])
const currentPage = ref(1)
const perPage = ref(10)
const meta = ref({ current_page: 1, last_page: 1, total: 0 })

// 👇 جدید: state لودینگ ترکیبی برای کل صفحه
const isPageLoading = computed(() => tabsLoading.value || isLoading.value)

// نگاشت یک آیتم خام API به شکلی که در قالب استفاده می‌شود (هم برای لیست صفحه‌بندی‌شده و هم برای سرچ)
const mapRequestItem = (item) => ({
  id: item.id,
  name: item.name,
  phone: item.mobile,
  email: item.email,
  details: item.description,
  serviceId: item.type?.id ?? null,
  serviceTitle: item.type?.title || '',
  avatar: DEFAULT_AVATAR,
})

const fetchProjectRequests = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await $fetch(`${API_BASE}/admin/requests`, {
      method: 'GET',
      headers: { ...authHeader() },
      query: {
        page: currentPage.value,
        per_page: perPage.value,
      },
    })

    requests.value = (res.data || []).map(mapRequestItem)

    if (res.meta) {
      meta.value = res.meta
    }
  } catch (err) {
    if (err?.response?.status === 401) {
      errorMessage.value = 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید.'
    } else if (err?.response?.status === 403) {
      errorMessage.value = 'شما اجازه دسترسی به این بخش را ندارید.'
    } else {
      errorMessage.value = 'خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  initFromStorage()
  await fetchRequestTypes()
  activeTab.value = tabs.value.length > 0 ? tabs.value[0].id : null   // 👈 تغییر اینجا
  await fetchProjectRequests()
})

watch(currentPage, () => {
  fetchProjectRequests()
})

const filteredUsers = computed(() => {
  if (activeTab.value === null) return requests.value
  return requests.value.filter((r) => r.serviceId === activeTab.value)
})

// --- جستجو ---
const searchMode = ref('mobile') // 'mobile' | 'name'
const searchQuery = ref('')
let searchDebounceTimer = null

const allRequestsCache = ref([])
const allRequestsLoaded = ref(false)
const searchLoading = ref(false)

const isSearching = computed(() => searchQuery.value.trim().length > 0)

const loadAllRequestsForSearch = async () => {
  if (allRequestsLoaded.value) return
  searchLoading.value = true
  errorMessage.value = ''
  try {
    const collected = []
    let page = 1
    let lastPage = 1
    const MAX_PAGES_SAFETY = 50 // جلوگیری از حلقه بی‌نهایت در صورت خطای غیرمنتظره بک‌اند

    do {
      const res = await $fetch(`${API_BASE}/admin/requests`, {
        method: 'GET',
        headers: { ...authHeader() },
        query: { page, per_page: 100 },
      })
      collected.push(...(res.data || []).map(mapRequestItem))
      lastPage = res.meta?.last_page || 1
      page++
    } while (page <= lastPage && page <= MAX_PAGES_SAFETY)

    allRequestsCache.value = collected
    allRequestsLoaded.value = true
  } catch (err) {
    console.error('خطا در بارگذاری کامل درخواست‌ها برای جستجو', err)
    errorMessage.value = 'خطا در دریافت اطلاعات برای جستجو.'
  } finally {
    searchLoading.value = false
  }
}

// نتیجه‌ی سرچ: هم روی موبایل/نام فیلتر میشه، هم تب فعال (نوع درخواست) رعایت میشه
const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return allRequestsCache.value.filter((r) => {
    const field = searchMode.value === 'mobile' ? r.phone : r.name
    const matchesQuery = (field || '').toLowerCase().includes(q)
    const matchesTab = activeTab.value === null ? true : r.serviceId === activeTab.value
    return matchesQuery && matchesTab
  })
})

// چیزی که واقعاً توی لیست نمایش داده میشه: یا نتیجه‌ی سرچ، یا لیست عادیِ فیلترشده با تب
const displayedUsers = computed(() => (isSearching.value ? searchResults.value : filteredUsers.value))

const setSearchMode = (mode) => {
  if (searchMode.value === mode) return
  searchMode.value = mode
  if (searchQuery.value.trim() && !allRequestsLoaded.value) {
    loadAllRequestsForSearch()
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const triggerSearch = (delay = 400) => {
  clearTimeout(searchDebounceTimer)
  searchDebounceTimer = setTimeout(() => {
    if (searchQuery.value.trim() && !allRequestsLoaded.value) {
      loadAllRequestsForSearch()
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

const goToPage = (page) => {
  if (page < 1 || page > meta.value.last_page) return
  currentPage.value = page
}

const openUserId = ref(null)
const toggleAccordion = (id) => {
  openUserId.value = openUserId.value === id ? null : id
}
</script>

<template>
  <div class="p-4 sm:p-5 lg:p-6" dir="rtl">

    <!-- تب‌ها فقط وقتی نمایش داده می‌شن که واقعاً آماده باشن -->
    <div
      v-if="tabs.length > 0"
      class="flex flex-wrap justify-center items-center gap-2 mb-4 bg-[#F7F3EB] dark:bg-dark-surface py-3 lg:py-0 lg:h-[78px] rounded-[27px] px-2 lg:px-0"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-3 sm:px-4 lg:px-5 py-2 rounded-full transition-all text-[12px] sm:text-[13px] lg:text-[14px] font-medium h-[36px] sm:h-[38px] lg:h-[41px]',
          activeTab === tab.id
            ? 'bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white shadow-md'
            : 'text-[] dark:text-white hover:bg-gray-200 dark:hover:bg-dark-input'
        ]"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- نوار جستجو -->
    <div class="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 lg:mb-8">
      <!-- دکمه جابجایی حالت جستجو -->
      <div class="flex bg-[#F7F3EB] dark:bg-dark-surface rounded-full p-1 shrink-0 self-start sm:self-auto">
        <button
          type="button"
          @click="setSearchMode('mobile')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-bold transition-all',
            searchMode === 'mobile'
              ? 'bg-[#2d6a66] dark:bg-dark-accent text-[#ffffff] dark:text-white'
              : 'text-[#0F184B] dark:text-white/70'
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
              ? 'bg-[#2d6a66] dark:bg-dark-accent text-[#ffffff] dark:text-white'
              : 'text-[#0F184B] dark:text-white/70'
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
  class="w-full py-2.5 rounded-full bg-white dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border text-[#0F184B] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#67A9A8]/40"
/>
<button
  v-if="searchQuery"
  type="button"
  @click="clearSearch"
  style="left: 0.75rem; width: 1.25rem; height: 1.25rem; line-height: 1;"
  class="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-white mt-[3px]"
>
  ✕
</button>
      </div>
    </div>

    <!-- یک state واحد برای «کل صفحه در حال بارگذاری» -->
    <div v-if="isPageLoading" class="text-center text-gray-400 dark:text-white mt-10">
      در حال بارگذاری...
    </div>

    <!-- در حال بارگذاری کل لیست برای جستجو -->
    <div v-else-if="isSearching && searchLoading" class="text-center text-gray-400 dark:text-white mt-10">
      در حال جستجو در همه درخواست‌ها...
    </div>

    <div v-else-if="errorMessage" class="text-center text-red-500 dark:text-red-300 mt-10">
      {{ errorMessage }}
      <button @click="fetchProjectRequests" class="block mx-auto mt-2 text-sm text-[#2d6a66] dark:text-dark-highlight underline">
        تلاش مجدد
      </button>
    </div>

    <template v-else>
      <div class="space-y-4">
        <div v-for="user in displayedUsers" :key="user.id"
             class="bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-300 dark:border-dark-border transition-all duration-300">

          <div class="flex justify-between items-start">
            <div class="flex items-center gap-3 sm:gap-4">
              <div>
                <h3 class="font-bold text-[15px] sm:text-[17px] lg:text-[20px] text-[#000000] dark:text-white font-roboto">{{ user.name }}</h3>
                <p class="text-black dark:text-white mt-1 lg:mt-2 font-roboto text-[13px] sm:text-[15px] lg:text-[20px]">{{ user.phone }}</p>
                <p v-if="openUserId === user.id" class="text-[13px] sm:text-[15px] lg:text-[20px] text-black dark:text-white font-roboto break-all">{{ user.email }}</p>
              </div>
            </div>
          </div>

          <div v-if="openUserId === user.id" class="mt-4 lg:mt-6 pt-4 lg:pt-6">
            <div class="w-full h-28 sm:h-32 p-3 sm:p-4 border border-[#2C7379] dark:border-dark-accent rounded-[5px] bg-white/17 dark:bg-dark-input/20 text-balck dark:text-white text-[13px] sm:text-[14px] mb-4 font-roboto">
              {{ user.details }}
            </div>
          </div>

          <div :class="`font-roboto ${openUserId === user.id ? '' : ''}`">
            <button
              @click="toggleAccordion(user.id)"
              :class="[
                'text-gray-600 dark:text-white/70 text-xs sm:text-sm flex items-center gap-1 hover:text-[#2d6a66] dark:hover:text-white transition-colors mt-2 lg:mt-0',
                openUserId === user.id ? 'lg:mt-0' : ''
              ]"
            >
              {{ openUserId === user.id ? 'بستن اطلاعات' : 'دیدن کامل اطلاعات' }}
              <span :class="{'rotate-180': openUserId === user.id}" class="transition-transform duration-300">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.41 7.41L0 6L6 0L12 6L10.59 7.41L6 2.83L1.41 7.41Z" :fill="chevronColor"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <p v-if="displayedUsers.length === 0" class="text-center text-gray-400 dark:text-white/70 mt-10">موردی برای نمایش وجود ندارد.</p>
      </div>

      <div v-if="!isSearching && meta.last_page > 1" class="flex justify-center items-center gap-2 mt-6">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-border dark:text-white text-sm disabled:opacity-40"
        >
          قبلی
        </button>
        <span class="text-sm text-gray-600 dark:text-white/70">
          صفحه {{ meta.current_page }} از {{ meta.last_page }}
        </span>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= meta.last_page"
          class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-border dark:text-white text-sm disabled:opacity-40"
        >
          بعدی
        </button>
      </div>
    </template>
  </div>
</template>