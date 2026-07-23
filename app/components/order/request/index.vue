<template>
  <div class="max-w-5xl mx-auto p-4 sm:p-6 md:p-10 mt-[10px] sm:mt-[15px] md:mt-[20px]">

    <!-- عنوان‌ها -->
    <div class="text-center mb-6 sm:mb-8 md:mt-2 mt-8">
      <h2 class="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-gray-800 dark:text-dark-text leading-snug">مسیر <span class="text-[#2C7379] dark:text-dark-highlight">رشد</span>، از اینجا آغاز می‌شود</h2>
      <h1 class="text-[22px] sm:text-[26px] md:text-[32px] font-extrabold text-[#2C7379] dark:text-dark-highlight mt-2 font-roboto">درخواست پروژه</h1>
      <p class="text-gray-500 mt-4 sm:mt-5 md:mt-6 text-[#2C7379] dark:text-dark-text text-[12px] sm:text-[13px] md:text-[14px] font-roboto px-2">برای شروع همکاری، فرم زیر را تکمیل کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند.</p>
    </div>

    <!-- بدنه اصلی (گرید) -->
    <div class="bg-[#2C737938] dark:bg-dark-surface p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

      <div class="md:col-span-1 border-b-2 md:border-b-0 md:border-l-2 border-gray-300 dark:border-dark-border pb-6 md:pb-0 md:pl-6 space-y-4 sm:space-y-6 md:space-y-8">

        <div class="flex justify-center mb-4 md:mb-6">
          <div class="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[190px] md:h-[190px] flex items-center justify-center -mb-[15px] sm:-mb-[25px] md:-mb-[35px]">
            <img src="/images/req-icon.png" alt="">
          </div>
        </div>

        <a class="text-[#0F184B] dark:text-dark-text text-[13px] sm:text-[14px] md:text-[16px] flex items-center justify-center font-noto-light font-bold underline underline-offset-4 whitespace-nowrap">
          چرا با ما همکاری کنید
        </a>

        <div class="grid grid-cols-3 md:grid-cols-1 gap-2 sm:gap-3 md:gap-0 md:space-y-6">

          <div class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center md:text-right min-w-0 md:min-w-0">
            <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
              <OrderRequestIconsFlash class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
            </div>
            <div class="min-w-0 md:min-w-fit">
              <h4 class="font-bold text-[#0F184B] dark:text-dark-text font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">پاسخ سریع</h4>
              <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] dark:text-dark-text font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">کارشناسان ما در کمتر از ۲۴ ساعت <br>با شما تماس خواهند گرفت.</p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center md:text-right min-w-0 md:min-w-0">
            <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
              <OrderRequestIconsPoint class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
            </div>
            <div class="min-w-0 md:min-w-fit">
              <h4 class="font-bold text-[#0F184B] dark:text-dark-text font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">راهکار اختصاصی</h4>
              <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] dark:text-dark-text font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">ما برای هر پروژه،<br> راهکار متناسب<br> با نیاز شما ارائه می‌دهیم.</p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center md:text-right min-w-0 md:min-w-0">
            <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
              <OrderRequestIconsTeam class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
            </div>
            <div class="min-w-0 md:min-w-fit">
              <h4 class="font-bold text-[#0F184B] dark:text-dark-text font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">تجربه و تخصص</h4>
              <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] dark:text-dark-text font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">تیم ما با سال ها <br> تجربه بهترین نتیجه را به <br> شما تضمین می‌کند.</p>
            </div>
          </div>

        </div>
      </div>

      <!-- فرم (سمت راست) -->
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
            <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">نام و نام خانوادگی</label>
            <div class="relative group">
              <div
                v-show="!form.name"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 pointer-events-none"
              >
                <OrderRequestIconsPerson />
              </div>

              <input
                v-model="form.name"
                class="w-full pr-10 p-3 sm:p-3.5 md:p-4 bg-white/35 dark:bg-dark-input/40 rounded-xl border outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px] text-black dark:text-black"
                :class="errors.name ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
              />
            </div>
            <p v-if="errors.name" class="text-red-600 dark:text-red-400 text-[11px] sm:text-[12px] mt-1">{{ errors.name[0] }}</p>
          </div>

          <div>
            <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">
              شماره تماس
            </label>
            <div class="relative group">

              <div
                v-show="!form.mobile"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 pointer-events-none"
              >
                <OrderRequestIconsCall />
              </div>

              <input
                v-model="form.mobile"
                placeholder=" "
                class="w-full pr-10 p-3 sm:p-3.5 md:p-4 bg-white/35 dark:bg-dark-input/40 rounded-xl border outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px] text-black dark:text-black"
                :class="errors.mobile ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
              />
            </div>
            <p v-if="errors.mobile" class="text-red-600 dark:text-red-400 text-[11px] sm:text-[12px] mt-1">{{ errors.mobile[0] }}</p>
          </div>

        </div>

        <div>
          <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">
            ایمیل
          </label>
          <div class="relative group">

            <div
              v-show="!form.email"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 pointer-events-none"
            >
              <OrderRequestIconsEmail />
            </div>

            <input
              v-model="form.email"
              placeholder=" "
              class="w-full pr-10 p-3 sm:p-3.5 md:p-4 bg-white/35 dark:bg-dark-input/40 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] border outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px] text-black dark:text-black"
              :class="errors.email ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            />
          </div>
          <p v-if="errors.email" class="text-red-600 dark:text-red-400 text-[11px] sm:text-[12px] mt-1">{{ errors.email[0] }}</p>
        </div>

        <div>
          <label class="block mb-2 text-[#0F184B] dark:text-dark-text font-medium font-roboto mt-[30px] sm:mt-[40px] md:mt-[50px] text-[13px] sm:text-[14px] md:text-[16px]">
             درخواست برای
          </label>

          <div class="relative">
            <div
              @click="isOpen = !isOpen"
              class="w-full p-3 sm:p-3.5 md:p-4 bg-white/35 dark:bg-dark-input/40 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] border cursor-pointer flex justify-between items-center shadow-[0_3px_0px_rgba(0,0,0,0.15)] -mb-[5px]"
              :class="errors.service_id ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            >
              <span class="text-gray-500 dark:text-dark-text-deep text-[13px] sm:text-[14px] md:text-[16px]">
                {{ selected ? selected.title : (servicesLoading ? 'در حال بارگذاری...' : 'انتخاب کنید') }}
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
            توضیحات
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
          {{ submitting ? 'در حال ارسال...' : 'ارسال درخواست' }}
        </button>

      </form>

    </div>
  </div>
</template>

<script setup>
// ---- state لیست خدمات (درخواست برای) ----
const options = ref([])       // { id, title, slug, ... }
const isOpen = ref(false)
const selected = ref(null)
const servicesLoading = ref(false)

const select = (option) => {
  selected.value = option
  form.service_id = option.id
  isOpen.value = false
  if (errors.value.service_id) delete errors.value.service_id
}

const fetchServices = async () => {
  servicesLoading.value = true
  try {
    const res = await $fetch(`https://nadertechnologyteam.ir/api/requests/types`)
    options.value = res?.data || []
  } catch (e) {
    console.error('خطا در دریافت لیست خدمات:', e)
  } finally {
    servicesLoading.value = false
  }
}

onMounted(() => {
  fetchServices()
})

// ---- state فرم ----
const form = reactive({
  service_id: null,
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
  form.service_id = null
  form.name = ''
  form.mobile = ''
  form.email = ''
  form.description = ''
  selected.value = null
}

const submitForm = async () => {
  errors.value = {}
  generalError.value = ''
  successMessage.value = ''
  submitting.value = true

  try {
    const res = await $fetch(`https://nadertechnologyteam.ir/api/requests`, {
      method: 'POST',
      body: {
        service_id: form.service_id,
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        description: form.description
      }
    })

    successMessage.value = res?.message || 'درخواست با موفقیت ثبت شد.'
    resetForm()
  } catch (e) {
    const status = e?.response?.status || e?.statusCode
    const data = e?.data || e?.response?._data

    if (status === 422 && data?.errors) {
      // خطاهای اعتبارسنجی فیلد به فیلد
      errors.value = data.errors
      generalError.value = data.message || 'The given data was invalid.'
    } else if (status === 401) {
      generalError.value = data?.message || 'Unauthenticated.'
    } else {
      generalError.value = data?.message || 'خطایی رخ داد. لطفا دوباره تلاش کنید.'
    }
  } finally {
    submitting.value = false
  }
}
</script>