<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth'

const config = useRuntimeConfig?.() || { public: { apiBase: 'https://nadertechnologyteam.ir' } }
const API_BASE = config.public?.apiBase || 'https://nadertechnologyteam.ir'

const { authHeader, initFromStorage, isLoggedIn } = useAdminAuth()

// تب‌ها - مقدار slug باید با آنچه سرور برمی‌گرداند مطابقت داشته باشد
// ⚠️ فقط web-design تایید شده از مثال Swagger است، بقیه را با پاسخ واقعی API چک کن
const activeTab = ref('design')
const tabs = [
  { id: 'design', label: 'درخواست طراحی سایت', slug: 'web-design' },
  { id: 'content', label: 'درخواست تولید محتوا', slug: 'content-production' },
  { id: 'event', label: 'درخواست برگزاری ایونت', slug: 'event' },
  { id: 'collab', label: 'درخواست همکاری', slug: 'collaboration' },
  { id: 'feedback', label: 'انتقادات و پیشنهادات', slug: 'feedback' },
]

const DEFAULT_AVATAR = '/images/user-avatar.jpg'

// وضعیت‌ها
const isLoading = ref(false)
const errorMessage = ref('')
const requests = ref([])

// صفحه‌بندی
const currentPage = ref(1)
const perPage = ref(10)
const meta = ref({ current_page: 1, last_page: 1, total: 0 })

const fetchProjectRequests = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await $fetch(`https://nadertechnologyteam.ir/api/admin/requests`, {
      method: 'GET',
      headers: {
        ...authHeader(),
      },
      query: {
        page: currentPage.value,
        per_page: perPage.value,
      },
    })

    requests.value = (res.data || []).map((item) => ({
      id: item.id,
      name: item.name,
      phone: item.mobile,
      email: item.email,
      details: item.description,
      serviceSlug: item.service?.slug || '',
      serviceTitle: item.service?.title || '',
      avatar: DEFAULT_AVATAR,
    }))

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

onMounted(() => {
  initFromStorage()
  fetchProjectRequests()
})

// هر بار صفحه تغییر کند، دوباره دیتا بگیر
watch(currentPage, () => {
  fetchProjectRequests()
})

// فیلتر کردن بر اساس تب انتخاب‌شده (بر اساس slug سرویس)
const filteredUsers = computed(() => {
  const currentTab = tabs.find((t) => t.id === activeTab.value)
  if (!currentTab) return requests.value
  return requests.value.filter((r) => r.serviceSlug === currentTab.slug)
})

const goToPage = (page) => {
  if (page < 1 || page > meta.value.last_page) return
  currentPage.value = page
}

// مدیریت آکاردئون
const openUserId = ref(null)
const toggleAccordion = (id) => {
  openUserId.value = openUserId.value === id ? null : id
}
</script>

<template>
  <div class="p-4 sm:p-5 lg:p-6" dir="rtl">

    <div class="flex flex-wrap justify-center items-center gap-2 mb-6 lg:mb-8 bg-[#F7F3EB] py-3 lg:py-0 lg:h-[78px] rounded-[27px] px-2 lg:px-0">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-3 sm:px-4 lg:px-5 py-2 rounded-full transition-all text-[12px] sm:text-[13px] lg:text-[14px] font-medium h-[36px] sm:h-[38px] lg:h-[41px]',
          activeTab === tab.id
            ? 'bg-[#67A9A8] text-[#0F184B] shadow-md'
            : 'text-[] hover:bg-gray-200'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- حالت لودینگ -->
    <div v-if="isLoading" class="text-center text-gray-400 mt-10">
      در حال بارگذاری...
    </div>

    <!-- حالت خطا -->
    <div v-else-if="errorMessage" class="text-center text-red-500 mt-10">
      {{ errorMessage }}
      <button @click="fetchProjectRequests" class="block mx-auto mt-2 text-sm text-[#2d6a66] underline">
        تلاش مجدد
      </button>
    </div>

    <template v-else>
      <div class="space-y-4">
        <div v-for="user in filteredUsers" :key="user.id"
             class="bg-[#FFFFFF3B] p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-300 transition-all duration-300">

          <div class="flex justify-between items-start">
            <div class="flex items-center gap-3 sm:gap-4">
              <img
                :src="user.avatar"
                :alt="user.name"
                class="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] lg:w-[114px] lg:h-[114px] rounded-full border border-gray-200 object-cover shrink-0"
              />
              <div>
                <h3 class="font-bold text-[15px] sm:text-[17px] lg:text-[20px] text-[#000000] font-roboto lg:-mt-[40px]">{{ user.name }}</h3>
                <p class="text-black mt-1 lg:mt-2 font-roboto text-[13px] sm:text-[15px] lg:text-[20px]">{{ user.phone }}</p>
                <p v-if="openUserId === user.id" class="text-[13px] sm:text-[15px] lg:text-[20px] text-black font-roboto break-all">{{ user.email }}</p>
              </div>
            </div>
          </div>

          <div v-if="openUserId === user.id" class="mt-4 lg:mt-6 pt-4 lg:pt-6">
            <div class="w-full h-28 sm:h-32 p-3 sm:p-4 border border-[#2C7379] rounded-[5px] bg-white/17 text-balck text-[13px] sm:text-[14px] mb-4 font-roboto">
              {{ user.details }}
            </div>
          </div>

          <div :class="`font-roboto ${openUserId === user.id ? '' : 'lg:mr-[120px]'}`">
            <button
              @click="toggleAccordion(user.id)"
              :class="[
                'text-gray-600 text-xs sm:text-sm flex items-center gap-1 hover:text-[#2d6a66] transition-colors mt-2 lg:mt-0',
                openUserId === user.id ? 'lg:mt-0' : 'lg:-mt-[30px]'
              ]"
            >
              {{ openUserId === user.id ? 'بستن اطلاعات' : 'دیدن کامل اطلاعات' }}
              <span :class="{'rotate-180': openUserId === user.id}" class="transition-transform duration-300">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.41 7.41L0 6L6 0L12 6L10.59 7.41L6 2.83L1.41 7.41Z" fill="#747893"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <p v-if="filteredUsers.length === 0" class="text-center text-gray-400 mt-10">موردی برای نمایش وجود ندارد.</p>
      </div>

      <!-- صفحه‌بندی -->
      <div v-if="meta.last_page > 1" class="flex justify-center items-center gap-2 mt-6">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="px-3 py-1.5 rounded-lg border border-gray-300 text-sm disabled:opacity-40"
        >
          قبلی
        </button>
        <span class="text-sm text-gray-600">
          صفحه {{ meta.current_page }} از {{ meta.last_page }}
        </span>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= meta.last_page"
          class="px-3 py-1.5 rounded-lg border border-gray-300 text-sm disabled:opacity-40"
        >
          بعدی
        </button>
      </div>
    </template>
  </div>
</template>