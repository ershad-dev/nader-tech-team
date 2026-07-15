<template>
  <section class="relative bg-[#ABD7D8] p-5 sm:p-8 md:p-9 xl:p-10 min-[1920px]:p-12 rounded-[16px] md:rounded-[18px] xl:rounded-[20px] min-[1920px]:rounded-[24px] mt-8 mx-auto w-full xl:w-[1110px] min-[1920px]:w-[1400px] max-w-full">

    <img
      src="/images/texture.png"
      alt=""
      class="absolute w-[220px] sm:w-[380px] md:w-[550px] xl:w-[900px] min-[1920px]:w-[1050px] h-auto object-contain opacity-30 pointer-events-none -mt-[60px] sm:-mt-[120px] md:-mt-[200px] xl:-mt-[350px] min-[1920px]:-mt-[420px] -mr-[20px] sm:-mr-[40px] md:-mr-[60px] xl:-mr-[100px] min-[1920px]:-mr-[130px] top-0 right-0 xl:top-auto xl:right-auto"
    />

    <!-- بخش توضیحات -->
    <div class="mb-8 md:mb-9 xl:mb-10 relative z-10">

      <p class="max-w-full xl:max-w-[865px] min-[1920px]:max-w-[1100px] font-400 text-[#0F184B] text-[14px] sm:text-[15px] md:text-[15px] xl:text-[16px] min-[1920px]:text-[18px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px] min-[1920px]:leading-[44px]">
        {{ pageData.description_1 }}

        <br>
        <br>
      <p class="max-w-full xl:max-w-[865px] min-[1920px]:max-w-[1100px] font-roboto font-light text-[#0F184B] text-[14px] sm:text-[15px] md:text-[15px] xl:text-[16px] min-[1920px]:text-[18px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px] min-[1920px]:leading-[44px]">
        {{ pageData.description_2 }}
      </p>

      </p>
    </div>

    <h2 class="relative z-10 text-[20px] sm:text-[22px] md:text-[24px] xl:text-[26px] min-[1920px]:text-[30px] text-[#A36C53] font-bold mb-4 pr-0 sm:pr-[40px] md:pr-[60px] xl:pr-[90px] min-[1920px]:pr-[120px] text-center sm:text-right">خدمات ایونت</h2>

    <!-- لیست کارت‌ها (فراخوانی کامپوننت با ارسال services به عنوان prop) -->
    <div class="relative z-10 space-y-6 mb-10 md:mb-11 xl:mb-12 flex flex-col items-center text-center">
      <ServiceCard :services="services" />
    </div>

    <!-- بخش دکمه و فلش -->
    <div class="relative z-10 flex flex-col xl:flex-row items-center xl:justify-between mt-6 md:mt-8 xl:mt-10 px-2 md:px-4 gap-6 md:gap-7 xl:gap-0">

      <!-- متن (سمت راست) -->
      <div class="text-center xl:text-right mr-0 xl:mr-[20px] min-[1920px]:mr-[35px] mt-0 xl:-mt-[100px] min-[1920px]:-mt-[115px] order-1 lg:mt-0.5">
        <span class="text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] min-[1920px]:text-[28px] font-bold text-[#747893] block">رویداد بعدی خود را</span>
        <span class="text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] min-[1920px]:text-[28px] font-bold text-[#747893] block">حرفه‌ای برگزار کنید</span>
      </div>

      <!-- فلش (وسط) - فقط در دسکتاپ واقعی نمایش داده می‌شود -->
      <div class="hidden xl:flex flex-1 justify-center px-4 order-2">
        <img src="/images/curved-arrow.png" alt="فلش" class="min-w-[600px] lg:min-w-[650px] xl:min-w-[700px] min-[1920px]:min-w-[780px] -ml-[150px] lg:-ml-[175px] xl:-ml-[195px] min-[1920px]:-ml-[220px] object-contain" />
      </div>

      <!-- دکمه ( درخواست همکاری) -->
      <NuxtLink to="/order/requestProject" class="order-3">
        <button class="bg-[#ECD0A0] px-10 py-4 rounded-[16px] font-bold shadow-md hover:bg-[#dcc090] transition w-full max-w-[263px] md:w-[263px] xl:w-[263px] min-[1920px]:w-[300px] h-[48px] min-[1920px]:h-[54px] mt-0 xl:mt-[90px] min-[1920px]:mt-[105px]">
          درخواست همکاری
        </button>
      </NuxtLink>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
// وارد کردن کامپوننت کارت خدمات
import ServiceCard from '@/components/events/landing/ServiceCard.vue'

// =====================================================
// اتصال به API صفحه events
// =====================================================
const pageData = ref({
  description_1: '',
  description_2: ''
})

// تصاویر پیش‌فرض برای هر کارت (چون API فعلاً image برنمی‌گردونه،
// فقط title/description) - این‌ها رو می‌تونی جای‌گذاری کنی
const defaultImages = [
  '/images/event-card-1.png',
  '/images/event-card-2.jpg',
  '/images/event-card-3.jpg'
]

// لیست خدمات - از API پر می‌شود
const services = ref([])

const { data: eventsRes, error: eventsError } = await useFetch(
  'https://nadertechnologyteam.ir/api/page/events'
)

if (eventsRes.value && eventsRes.value.data) {
  const items = eventsRes.value.data
  const findValue = (key) => items.find((i) => i.key === key)?.value || ''

  pageData.value.description_1 = findValue('description_1')
  pageData.value.description_2 = findValue('description_2')

  // ساخت آرایه‌ی services از کلیدهای service_1_title, service_1_description و ...
  services.value = [1, 2, 3].map((n, index) => ({
    title: findValue(`service_${n}_title`),
    description: findValue(`service_${n}_description`),
    image: defaultImages[index]
  }))
} else if (eventsError.value) {
  console.error('خطا در دریافت اطلاعات صفحه events:', eventsError.value)
}
</script>