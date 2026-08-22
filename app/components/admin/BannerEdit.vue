<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div
      class="bg-[#F7F3EB] dark:bg-dark-surface text-[#0F184B] dark:text-dark-text py-3 px-4 lg:px-6 rounded-full w-full max-w-[812px] h-[52px] lg:h-[60px] mx-auto mb-6 lg:mb-10 font-bold text-[16px] sm:text-[18px] lg:text-[20px] flex items-center justify-center shadow-xl"
    >
      تغییر عکس بنر
    </div>

    <!-- بنر اطلاع‌رسانی حالت فقط-نمایش -->
    <div
      v-if="isReadOnly"
      class="text-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-bold py-2 px-4 rounded-xl mb-6 max-w-[812px] mx-auto"
    >
      شما فقط دسترسی مشاهده دارید و امکان ویرایش وجود ندارد.
    </div>

    <!-- پیام خطا / بارگذاری کلی لیست -->
    <div v-if="loadingList" class="text-center text-[#0F184B] dark:text-dark-text font-bold py-6">
      در حال بارگذاری بنرها...
    </div>
    <div v-else-if="listError" class="text-center text-red-600 font-bold py-6">
      {{ listError }}
      <button @click="fetchBanners" class="underline mr-2">تلاش مجدد</button>
    </div>

    <div
      v-else
      class="grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:gap-x-10 gap-y-6 sm:gap-y-8 lg:gap-y-10 justify-items-center"
      dir="ltr"
    >
      <!--
        همیشه دو ستونه (grid-cols-2 ثابت). اما برخلاف قبل، هیچ آیتمی
        عرض پیکسلیِ ثابت (مثل w-[437px]) نداره؛ همه w-full با max-w-[437px] هستن.
        یعنی هر ستون از گرید عرض 1fr (نصف عرض واقعیِ خودِ container) می‌گیره
        و کارت داخلش خودش رو با همون عرض تطبیق می‌ده. پس وقتی سایدبار باز
        می‌شه و عرض واقعی محتوا کم می‌شه (مثلا در iPad Pro)، دو ستون همچنان
        کنار هم می‌مونن ولی هر دو کمی کوچیک‌تر می‌شن، نه اینکه روی هم بیفتن.

        همیشه دقیقا ۶ اسلات ثابت رندر می‌شه (slotIndex از 0 تا 5).
        slots[i] از روی slotMap[i] (که یک id بنر یا null هست) ساخته می‌شه،
        نه از روی ایندکس آرایه‌ی banners. یعنی با حذف یک بنر، فقط همون
        اسلات خالی می‌شه و بقیه‌ی اسلات‌ها جابه‌جا نمی‌شن.
      -->
      <div
        v-for="(slot, slotIndex) in slots"
        :key="'slot-' + slotIndex"
        class="w-full max-w-[437px]"
        dir="rtl"
      >
        <template v-if="slot">
          <div
            class="relative rounded-[20px] lg:rounded-[27px] overflow-hidden shadow-lg w-full aspect-[437/283]"
          >
            <img :src="slot.image" class="w-full h-full object-cover" />

            <div
              class="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] lg:w-[72px] lg:h-[71px] absolute top-0 right-0 bg-[#08103580] backdrop-blur-md text-white rounded-bl-2xl rounded-tr-[20px] lg:rounded-tr-[27px] font-black text-[24px] sm:text-[30px] lg:text-[36px] shadow-lg flex items-center justify-center"
            >
              {{ slotIndex + 1 }}
            </div>

            <!-- نشان‌گر وضعیت فعال بودن -->
            <div
              v-if="slot.is_active"
              class="absolute bottom-2 left-2 bg-green-600/90 text-white text-xs font-bold px-3 py-1 rounded-full"
            >
              فعال روی سایت
            </div>

            <!-- لودینگ روی عکس هنگام آپلود/بروزرسانی -->
            <div
              v-if="slot.busy"
              class="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-sm"
            >
              در حال پردازش...
            </div>
          </div>

          <div class="flex justify-center gap-3 lg:gap-4 mt-4 w-full">
            <button
              @click="toggleActive(slot)"
              :disabled="slot.busy || isReadOnly"
              :title="isReadOnly ? 'شما فقط دسترسی مشاهده دارید' : ''"
              :class="[
                'w-[140px] sm:w-[160px] lg:w-[172px] h-[34px] rounded-[27px] font-bold flex items-center justify-center text-[14px] sm:text-[15px] lg:text-[16px] disabled:opacity-50 disabled:cursor-not-allowed',
                slot.is_active
                  ? 'bg-[#7FCB86] hover:bg-[#66B36D] dark:bg-dark-accent dark:hover:bg-dark-accent-hover text-black dark:text-dark-text-deep'
                  : 'bg-[#ABD7D8] hover:bg-[#8FB0B2] dark:bg-dark-input dark:hover:bg-dark-input/80 text-black dark:text-dark-text-deep'
              ]"
            >
              {{ slot.is_active ? 'فعال است' : 'تایید' }}
            </button>
            <button
              @click="deleteBanner(slot, slotIndex)"
              :disabled="slot.busy || isReadOnly"
              :title="isReadOnly ? 'شما فقط دسترسی مشاهده دارید' : ''"
              class="w-[140px] sm:w-[160px] lg:w-[172px] h-[34px] bg-[#ABD7D8] hover:bg-[#8FB0B2] dark:bg-dark-input dark:hover:bg-dark-input/80 rounded-[27px] font-bold text-black dark:text-dark-text-deep flex items-center justify-center text-[14px] sm:text-[15px] lg:text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              حذف
            </button>
          </div>

          <p v-if="slot.error" class="text-red-600 text-xs text-center mt-2">
            {{ slot.error }}
          </p>
        </template>

        <!-- اسلات خالی: هم برای جایگزینی و هم برای بنر کاملا جدید از همینجا آپلود می‌شه -->
        <div
          v-else
          class="relative w-full aspect-[437/325] border-4 border-dashed border-[#BFD1D5] dark:border-dark-border rounded-[20px] lg:rounded-[27px] flex flex-col items-center justify-center transition-all"
          :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#FDFBF7] dark:hover:bg-dark-input/20'"
        >
          <input
            type="file"
            accept="image/*"
            class="hidden"
            :id="'file-slot-' + slotIndex"
            :disabled="isReadOnly"
            @change="uploadToSlot($event, slotIndex)"
          />
          <label
            :for="'file-slot-' + slotIndex"
            class="text-5xl sm:text-6xl text-[#BFD1D5] dark:text-dark-border"
            :class="isReadOnly ? 'cursor-not-allowed' : 'cursor-pointer'"
          >
            +
          </label>
          <span class="text-[#0F184B] dark:text-dark-text font-bold mt-2 text-sm sm:text-base">افزودن بنر جدید</span>

          <div
            v-if="emptySlotBusy[slotIndex]"
            class="absolute inset-0 bg-black/30 rounded-[20px] lg:rounded-[27px] flex items-center justify-center text-white font-bold text-sm"
          >
            در حال آپلود...
          </div>
          <p v-if="emptySlotError[slotIndex]" class="text-red-600 text-xs text-center mt-2 px-2">
            {{ emptySlotError[slotIndex] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAdminAuth } from '@/composables/useAdminAuth' // مسیر رو با ساختار پروژه‌تون تطبیق بدید
import { useAdminPermissions } from '@/composables/useAdminPermissions' // مسیر رو با ساختار پروژه‌تون تطبیق بدید

const { authHeader, initFromStorage, isLoggedIn, clearAuth } = useAdminAuth()
const { isReadOnly } = useAdminPermissions()

// همون دامنه‌ای که در صفحه‌ی لاگین استفاده شده
const BASE_URL = 'https://nadertechnologyteam.ir/api/admin/banners'
const MAX_BANNERS = 6
const SLOT_MAP_STORAGE_KEY = 'admin-banner-slot-map-v1'

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
// banners: همه‌ی بنرهایی که واقعا در بک‌اند وجود دارن، به همراه busy/error محلی
const banners = ref([])
const loadingList = ref(false)
const listError = ref('')

// وضعیت آپلود برای اسلات‌های خالی (بر اساس ایندکس اسلات 0..5)
const emptySlotBusy = ref({})
const emptySlotError = ref({})

/**
 * نگاشت ثابتِ "شماره اسلات → id بنر".
 * slotMap[i] یا null هست (اسلات خالی) یا id یک بنر.
 * این آرایه مستقل از ترتیب آرایه‌ی banners مدیریت می‌شه و در localStorage
 * ذخیره می‌شه تا بعد از رفرش صفحه هم ترتیب و جای خالی‌ها حفظ بمونه.
 */
const slotMap = ref(Array(MAX_BANNERS).fill(null))

function loadSlotMap() {
  try {
    const raw = localStorage.getItem(SLOT_MAP_STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length === MAX_BANNERS) {
      slotMap.value = parsed
    }
  } catch (e) {
    // اگه چیز خرابی در استوریج بود، نادیده بگیر و از حالت پیش‌فرض استفاده کن
  }
}

function saveSlotMap() {
  try {
    localStorage.setItem(SLOT_MAP_STORAGE_KEY, JSON.stringify(slotMap.value))
  } catch (e) {
    // نبود دسترسی به localStorage نباید کل کامپوننت رو خراب کنه
  }
}

watch(slotMap, saveSlotMap, { deep: true })

/**
 * ۶ اسلات ثابت برای نمایش، بر اساس slotMap ساخته می‌شن، نه ایندکس آرایه‌ی banners.
 * slots[i] = بنری که id اش برابر slotMap[i] هست، یا null.
 */
const slots = computed(() => {
  return slotMap.value.map((id) => {
    if (id == null) return null
    return banners.value.find((b) => b.id === id) ?? null
  })
})

/**
 * تطبیق بنرهای دریافتی از بک‌اند با slotMap فعلی:
 * - اگه id ای که قبلاً در یک اسلات بوده، دیگه در لیست بک‌اند نباشه، همون اسلات null می‌شه.
 * - اگه بنری از بک‌اند بیاد که در هیچ اسلاتی نیست (مثلاً از جای دیگه‌ای اضافه شده)،
 *   به اولین اسلات خالی اختصاص داده می‌شه.
 */
function reconcileSlotMap(fetchedBanners) {
  const fetchedIds = new Set(fetchedBanners.map((b) => b.id))

  // پاک کردن اسلات‌هایی که بنرشون دیگه وجود نداره
  const newMap = slotMap.value.map((id) => (id != null && fetchedIds.has(id) ? id : null))

  // اضافه کردن بنرهایی که هنوز در نقشه جا نگرفتن
  const mappedIds = new Set(newMap.filter((id) => id != null))
  for (const b of fetchedBanners) {
    if (mappedIds.has(b.id)) continue
    const emptyIndex = newMap.findIndex((id) => id == null)
    if (emptyIndex === -1) break // دیگه جا نیست (بیشتر از MAX_BANNERS)
    newMap[emptyIndex] = b.id
    mappedIds.add(b.id)
  }

  slotMap.value = newMap
}

/** ====== دریافت لیست بنرها ====== */
const fetchBanners = async () => {
  loadingList.value = true
  listError.value = ''
  try {
    const res = await apiFetch(`${BASE_URL}?page=1`, { method: 'GET' })
    const list = res.data || []
    banners.value = list.map((b) => ({
      ...b,
      busy: false,
      error: '',
    }))
    reconcileSlotMap(banners.value)
  } catch (err) {
    listError.value = err.message
  } finally {
    loadingList.value = false
  }
}

onMounted(() => {
  // اول توکن رو از localStorage بازیابی کن، بعد slotMap و لیست رو بگیر
  initFromStorage()
  if (!isLoggedIn()) {
    navigateTo('/admin/login') // مسیر صفحه‌ی لاگین رو در صورت نیاز تطبیق بدید
    return
  }
  loadSlotMap()
  fetchBanners()
})

/**
 * ====== تغییر وضعیت فعال/غیرفعال (دکمه‌ی تایید) ======
 * گارد isReadOnly یک لایه‌ی دفاعی اضافه در فرانت هست (کنار disabled روی دکمه)،
 * تا حتی با فراخوانی مستقیم تابع از DevTools هم کاری انجام نشه.
 * جلوگیری واقعی و قطعی باید سمت بک‌اند روی همین اندپوینت اعمال بشه.
 */
const toggleActive = async (banner) => {
  if (isReadOnly.value) return

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

/**
 * ====== حذف بنر ======
 * فقط id بنر رو از آرایه‌ی banners حذف می‌کنیم و اسلات مربوطه در slotMap
 * رو null می‌کنیم. به بقیه‌ی slotMap دست نمی‌زنیم، پس بقیه اسلات‌ها جابه‌جا نمی‌شن.
 */
const deleteBanner = async (banner, slotIndex) => {
  if (isReadOnly.value) return
  if (!confirm('آیا از حذف این بنر مطمئن هستید؟')) return

  banner.busy = true
  banner.error = ''
  try {
    await apiFetch(`${BASE_URL}/${banner.id}`, { method: 'DELETE' })
    banners.value = banners.value.filter((b) => b.id !== banner.id)
    slotMap.value = slotMap.value.map((id, i) => (i === slotIndex ? null : id))
  } catch (err) {
    banner.error = err.message
    banner.busy = false
  }
}

/**
 * ====== آپلود در یک اسلات خالی خاص ======
 * بنر جدید در بک‌اند ساخته می‌شه (POST) و سپس id اون دقیقا در همون
 * slotIndex ای که کاربر از روش آپلود کرده قرار می‌گیره، نه انتهای لیست.
 */
const uploadToSlot = async (event, slotIndex) => {
  if (isReadOnly.value) {
    event.target.value = ''
    return
  }

  const file = event.target.files[0]
  if (!file) return

  if (slotMap.value[slotIndex] != null) {
    // این اسلات از قبل پر شده (مثلاً با یک تب دیگه) - جلوی بازنویسی رو می‌گیریم
    emptySlotError.value = { ...emptySlotError.value, [slotIndex]: 'این اسلات خالی نیست.' }
    event.target.value = ''
    return
  }

  emptySlotBusy.value = { ...emptySlotBusy.value, [slotIndex]: true }
  emptySlotError.value = { ...emptySlotError.value, [slotIndex]: '' }

  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await apiFetch(BASE_URL, {
      method: 'POST',
      body: formData,
    })
    banners.value.push({ ...res.data, busy: false, error: '' })
    slotMap.value = slotMap.value.map((id, i) => (i === slotIndex ? res.data.id : id))
  } catch (err) {
    emptySlotError.value = { ...emptySlotError.value, [slotIndex]: err.message }
  } finally {
    emptySlotBusy.value = { ...emptySlotBusy.value, [slotIndex]: false }
    event.target.value = ''
  }
}
</script>