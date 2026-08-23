<template>
  <div class="max-w-5xl mx-auto p-4 sm:p-6 md:p-10 mt-[10px] sm:mt-[15px] md:mt-[20px]" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- عنوان‌ها -->
    <div class="text-center mb-6 sm:mb-8 md:mt-2 mt-8">
      <h2 class="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-gray-800 dark:text-dark-text leading-snug">
        {{ $t('order.requestForm.titlePart1') }}
        <span class="text-[#2C7379] dark:text-dark-highlight">{{ $t('order.requestForm.titleHighlight') }}</span>
        {{ $t('order.requestForm.titlePart2') }}
      </h2>
      <h1 class="text-[22px] sm:text-[26px] md:text-[32px] font-extrabold text-[#2C7379] dark:text-dark-highlight mt-2 font-roboto">{{ $t('order.requestForm.pageTitle') }}</h1>
      <p class="text-gray-500 mt-4 sm:mt-5 md:mt-6 text-[#2C7379] dark:text-dark-text text-[12px] sm:text-[13px] md:text-[14px] font-roboto px-2">{{ $t('order.requestForm.subtitle') }}</p>
    </div>

    <!-- بدنه اصلی (گرید) -->
    <div class="bg-[#2C737938] dark:bg-dark-surface p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

      <div
        :class="[
          'md:col-span-1 border-b-2 md:border-b-0 border-gray-300 dark:border-dark-border pb-6 md:pb-0 space-y-4 sm:space-y-6 md:space-y-8',
          isRtl ? 'md:border-l-2 md:pl-6' : 'md:border-r-2 md:pr-6'
        ]"
      >

        <div class="flex justify-center mb-4 md:mb-6">
          <div class="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[190px] md:h-[190px] flex items-center justify-center -mb-[15px] sm:-mb-[25px] md:-mb-[35px]">
            <img src="/images/req-icon.png" alt="">
          </div>
        </div>

        <a class="text-[#0F184B] dark:text-dark-text text-[13px] sm:text-[14px] md:text-[16px] flex items-center justify-center font-noto-light font-bold whitespace-nowrap">
          {{ $t('order.requestForm.whyUs') }}
        </a>

<div
  class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center min-w-0"
  :class="isRtl ? 'md:text-right' : 'md:text-left'"
>
  <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
    <OrderRequestIconsFlash class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
  </div>
  <div class="min-w-0 flex-1">
    <h4 class="font-bold text-[#0F184B] dark:text-dark-text font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">{{ $t('order.requestForm.perks.fast.title') }}</h4>
    <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] dark:text-dark-text font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">{{ $t('order.requestForm.perks.fast.desc') }}</p>
  </div>
</div>

<div
  class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center min-w-0"
  :class="isRtl ? 'md:text-right' : 'md:text-left'"
>
  <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
    <OrderRequestIconsPoint class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
  </div>
  <div class="min-w-0 flex-1">
    <h4 class="font-bold text-[#0F184B] dark:text-dark-text font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">{{ $t('order.requestForm.perks.custom.title') }}</h4>
    <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] dark:text-dark-text font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">{{ $t('order.requestForm.perks.custom.desc') }}</p>
  </div>
</div>

<div
  class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center min-w-0"
  :class="isRtl ? 'md:text-right' : 'md:text-left'"
>
  <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
    <OrderRequestIconsTeam class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
  </div>
  <div class="min-w-0 flex-1">
    <h4 class="font-bold text-[#0F184B] dark:text-dark-text font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">{{ $t('order.requestForm.perks.experience.title') }}</h4>
    <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] dark:text-dark-text font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">{{ $t('order.requestForm.perks.experience.desc') }}</p>
  </div>
</div>
      </div>

      <!-- فرم -->
      <form class="md:col-span-2 space-y-5 sm:space-y-6" @submit.prevent="submitForm">

        <!-- پیام موفقیت -->
        <div
          v-if="successMessage"
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-[13px] sm:text-[14px]"
        >
          {{ successMessage }}
        </div>

        <!-- پیام خطای عمومی -->
        <div
          v-if="generalError"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-[13px] sm:text-[14px]"
        >
          {{ generalError }}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">{{ $t('order.requestForm.fields.name') }}</label>
            <div class="relative group">
              <div
                v-show="!form.name"
                class="absolute top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 pointer-events-none"
                :class="isRtl ? 'right-3' : 'left-3'"
              >
                <OrderRequestIconsPerson />
              </div>

              <input
                v-model="form.name"
                class="w-full p-3 sm:p-3.5 md:p-4 bg-white/35 dark:bg-dark-input/40 rounded-xl border outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px] text-black dark:text-black"
                :class="[errors.name ? 'border-red-500' : 'border-gray-300 dark:border-dark-border', isRtl ? 'pr-10' : 'pl-10']"
              />
            </div>
            <p v-if="errors.name" class="text-red-600 dark:text-red-400 text-[11px] sm:text-[12px] mt-1">{{ errors.name[0] }}</p>
          </div>

          <div>
            <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">
              {{ $t('order.requestForm.fields.mobile') }}
            </label>
            <div class="relative group">

              <div
                v-show="!form.mobile"
                class="absolute top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 pointer-events-none"
                :class="isRtl ? 'right-3' : 'left-3'"
              >
                <OrderRequestIconsCall />
              </div>

              <input
                v-model="form.mobile"
                placeholder=" "
                class="w-full p-3 sm:p-3.5 md:p-4 bg-white/35 dark:bg-dark-input/40 rounded-xl border outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px] text-black dark:text-black"
                :class="[errors.mobile ? 'border-red-500' : 'border-gray-300 dark:border-dark-border', isRtl ? 'pr-10' : 'pl-10']"
              />
            </div>
            <p v-if="errors.mobile" class="text-red-600 dark:text-red-400 text-[11px] sm:text-[12px] mt-1">{{ errors.mobile[0] }}</p>
          </div>

        </div>

        <div>
          <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">
            {{ $t('order.requestForm.fields.email') }}
          </label>
          <div class="relative group">

            <div
              v-show="!form.email"
              class="absolute top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 pointer-events-none"
              :class="isRtl ? 'right-3' : 'left-3'"
            >
              <OrderRequestIconsEmail />
            </div>

            <input
              v-model="form.email"
              placeholder=" "
              class="w-full p-3 sm:p-3.5 md:p-4 bg-white/35 dark:bg-dark-input/40 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] border outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px] text-black dark:text-black"
              :class="[errors.email ? 'border-red-500' : 'border-gray-300 dark:border-dark-border', isRtl ? 'pr-10' : 'pl-10']"
            />
          </div>
          <p v-if="errors.email" class="text-red-600 dark:text-red-400 text-[11px] sm:text-[12px] mt-1">{{ errors.email[0] }}</p>
        </div>

        <div>
          <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto mt-[30px] sm:mt-[40px] md:mt-[50px] text-[13px] sm:text-[14px] md:text-[16px]">
            {{ $t('order.requestForm.fields.requestFor') }}
          </label>

          <div class="relative">
            <div
              @click="isOpen = !isOpen"
              class="w-full p-3 sm:p-3.5 md:p-4 bg-white/35 dark:bg-dark-input/40 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] border cursor-pointer flex justify-between items-center shadow-[0_3px_0px_rgba(0,0,0,0.15)] -mb-[5px]"
              :class="errors.service_id ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            >
              <span
                class="text-[13px] sm:text-[14px] md:text-[16px] font-roboto"
                :class="selected ? 'text-black dark:text-white' : 'text-gray-500 dark:text-white'"
              >
                {{ selected ? selected.title : (servicesLoading ? $t('order.requestForm.loadingServices') : $t('order.requestForm.selectPlaceholder')) }}
              </span>
              <Icon name="heroicons:chevron-down" class="text-gray-400 dark:text-dark-text-deep" />
            </div>

            <ul
              v-if="isOpen"
              class="absolute w-full bg-white dark:bg-dark-input mt-2 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] shadow-xl z-50 border border-gray-200 dark:border-dark-border overflow-hidden max-h-60 overflow-y-auto"
            >
              <li
                v-for="option in options"
                :key="option.id"
                @click="select(option)"
                class="p-2.5 sm:p-3 text-[#747893] dark:text-dark-text-deep min-h-[40px] sm:min-h-[44px] md:min-h-[47px] font-noto-light font-bold text-[13px] sm:text-[16px] md:text-[20px] text-center cursor-pointer transition hover:bg-gray-100 dark:hover:bg-dark-border/40 border-b border-gray-400 dark:border-dark-border last:border-b-0 flex items-center justify-center"
              >
                {{ option.title }}
              </li>
            </ul>
          </div>
          <p v-if="errors.service_id" class="text-red-600 dark:text-red-400 text-[11px] sm:text-[12px] mt-1">{{ errors.service_id[0] }}</p>
        </div>

        <div>
          <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto mt-[30px] sm:mt-[40px] md:mt-[50px] text-[13px] sm:text-[14px] md:text-[16px]">
            {{ $t('order.requestForm.fields.description') }}
          </label>

          <textarea
            v-model="form.description"
            class="w-full bg-white/35 dark:bg-dark-input/40 p-3 sm:p-3.5 md:p-4 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] border outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] h-32 sm:h-36 md:h-40 text-[13px] sm:text-[14px] md:text-[16px] text-black dark:text-black"
            :class="errors.description ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
          ></textarea>
          <p v-if="errors.description" class="text-red-600 dark:text-red-400 text-[11px] sm:text-[12px] mt-1">{{ errors.description[0] }}</p>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full bg-teal-800 dark:bg-dark-accent text-white dark:text-dark-text-deep py-3 sm:py-3.5 md:py-4 rounded-xl font-bold hover:bg-teal-900 dark:hover:bg-dark-accent-hover transition flex justify-center items-center gap-2 text-[14px] sm:text-[15px] md:text-[16px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <OrderRequestIconsSend />
          {{ submitting ? $t('order.requestForm.submitting') : $t('order.requestForm.submit') }}
        </button>

      </form>

    </div>
  </div>
</template>

<script setup>
// --- i18n ---
const { t, locale, localeProperties } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// ---- state لیست خدمات (درخواست برای) ----
// دیتای خام از API رو جدا نگه می‌داریم و «options» رو بر اساس زبان فعلی
// می‌سازیم؛ این‌جوری اگه کاربر وسط پر کردن فرم زبان رو عوض کنه، هم لیست
// دراپ‌داون هم گزینه‌ی انتخاب‌شده خودکار به‌روز میشه (بدون فچ دوباره).
// چون title_en فعلاً توی بک‌اند خالیه (null)، وقتی انگلیسی نبود fallback
// به فارسی میاد تا دراپ‌داون خالی نمونه.
const rawOptions = ref([])       // { id, title, title_en, ... } خام از سرور
const isOpen = ref(false)
const selectedId = ref(null)
const servicesLoading = ref(false)
const dropdownRef = ref(null)

const localizeTitle = (item) => {
  if (locale.value === 'en') return item.title_en || item.title
  return item.title
}

const options = computed(() =>
  rawOptions.value.map((o) => ({ ...o, title: localizeTitle(o) }))
)

const selected = computed(() => options.value.find((o) => o.id === selectedId.value) || null)

const select = (option) => {
  selectedId.value = option.id
  form.type_id = option.id
  isOpen.value = false
  if (errors.value.type_id) delete errors.value.type_id
}

// --- بستن دراپ‌داون با کلیک بیرون ---
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

const fetchServices = async () => {
  servicesLoading.value = true
  try {
    const res = await $fetch(`https://nadertechnologyteam.ir/api/requests/types`)
    rawOptions.value = res?.data || res || []
  } catch (e) {
    // این لاگ فقط برای دیباگ در کنسوله، کاربر نمی‌بینتش، نیازی به ترجمه نداره
    console.error('خطا در دریافت لیست خدمات:', e)
  } finally {
    servicesLoading.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  fetchServices()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// ---- state فرم ----
const form = reactive({
  type_id: null,
  name: '',
  mobile: '',
  email: '',
  description: ''
})

const errors = ref({})
const generalError = ref('')
const successMessage = ref('')
const submitting = ref(false)

const resetForm = () => {
  form.type_id = null
  form.name = ''
  form.mobile = ''
  form.email = ''
  form.description = ''
  selectedId.value = null
}

// --- اعتبارسنجی سمت کلاینت قبل از ارسال ---
// پیام‌های خطا حالا از i18n خونده می‌شن، نه هاردکد فارسی
const validateClientSide = () => {
  const localErrors = {}
  if (!form.name.trim()) localErrors.name = [t('order.requestForm.validation.nameRequired')]
  if (!form.mobile.trim()) localErrors.mobile = [t('order.requestForm.validation.mobileRequired')]
  if (!form.type_id) localErrors.type_id = [t('order.requestForm.validation.typeRequired')]
  if (!form.description.trim()) localErrors.description = [t('order.requestForm.validation.descriptionRequired')]
  errors.value = localErrors
  return Object.keys(localErrors).length === 0
}

const submitForm = async () => {
  errors.value = {}
  generalError.value = ''
  successMessage.value = ''

  if (!validateClientSide()) return

  submitting.value = true

  const payload = {
    type_id: form.type_id,
    name: form.name,
    mobile: form.mobile,
    email: form.email,
    description: form.description
  }

  try {
    const res = await $fetch(`https://nadertechnologyteam.ir/api/requests`, {
      method: 'POST',
      body: payload
    })

    successMessage.value = res?.message || t('order.requestForm.successDefault')
    resetForm()
  } catch (e) {
    const status = e?.response?.status || e?.statusCode
    const data = e?.data || e?.response?._data

    if (status === 422 && data?.errors) {
      errors.value = data.errors
      generalError.value = data.message || 'The given data was invalid.'
    } else if (status === 401) {
      generalError.value = data?.message || 'Unauthenticated.'
    } else {
      generalError.value = data?.message || t('order.requestForm.errorDefault')
    }
  } finally {
    submitting.value = false
  }
}
</script>