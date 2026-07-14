<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">

    <div ref="pdfTarget" class="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden relative pb-8">

      <div class="w-full h-48 md:h-56 relative">
        <img src="/images/lottery-header-reg.jpg" class="w-full h-full object-cover" />
      </div>

      <div class="px-6 md:px-10">

        <h2 class="text-green-600 font-bold text-lg md:text-xl text-center my-6">ثبت‌نام با موفقیت انجام شد</h2>

        <div v-if="!registration" class="text-center text-gray-400 text-sm py-6">
          اطلاعات ثبت‌نامی یافت نشد. لطفاً دوباره از صفحه ثبت‌نام اقدام کنید.
        </div>

        <template v-else>
          <div class="bg-[#BFD1D580]/50 border border-[#6F78B780] rounded-2xl p-4 md:p-6 mb-8 w-full">
            <div class="space-y-4 text-gray-600 text-sm md:text-base">
              <div class="flex justify-between border-b pb-3 font-roboto">
                <span>نام و نام خانوادگی</span>
                <span class="font-medium text-gray-800 font-roboto">{{ registration.user.full_name }}</span>
              </div>

              <div class="flex justify-between border-b pb-3 font-roboto">
                <span>شماره موبایل</span>
                <span class="font-medium text-gray-800 font-roboto">{{ registration.user.mobile }}</span>
              </div>

              <div class="flex justify-between border-b pb-3 font-roboto">
                <span>مبلغ پرداختی</span>
                <span class="font-medium text-gray-800 font-roboto">{{ formatPrice(registration.lottery.price) }} تومان</span>
              </div>

              <div class="flex justify-between font-roboto">
                <span>وضعیت پرداخت</span>
                <span class="text-green-600 font-bold font-roboto">موفق</span>
              </div>
            </div>
          </div>

          <div class="text-center mb-8">
            <div class="bg-[#C5E0E3] text-[#2D7A6F] px-6 py-2 rounded-full inline-block font-bold mb-3 text-sm">قرعه‌کشی</div>
            <p class="text-lg md:text-xl font-bold text-[#2C7379]">{{ registration.lottery.title }}</p>
            <p class="text-gray-400 text-xs mt-2 font-roboto">تاریخ ثبت‌نام: {{ formatDate(registration.registered_at) }}</p>
          </div>

          <p class="text-red-400 text-xs text-center mb-8 leading-relaxed font-roboto">
            لطفاً از این صفحه اسکرین‌شات تهیه کنید؛ هنگام ورود، بلیط شما بر اساس این اطلاعات بررسی خواهد شد.
          </p>

          <div class="flex flex-col items-center w-full px-6 md:px-10 mb-8 gap-4">

            <button
              @click="downloadPDF"
              class="w-[95px] h-[21px] bg-[#ED8480]/50 flex justify-center items-center rounded-lg hover:bg-[#ED8480] transition shadow-lg"
            >
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </button>

            <NuxtLink to="/" class="w-full max-w-[375px] h-[47px] bg-[#2D7A6F] text-white flex justify-center items-center rounded-2xl font-bold hover:bg-teal-800 transition shadow-lg">
              بازگشت به خانه
            </NuxtLink>

          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const pdfTarget = ref(null)

// این مقدار در register.vue بعد از موفقیت‌آمیز بودن POST /api/lotteries/{lottery}/register
// داخل useState('lottery-registration', ...) ذخیره شده
const registration = useState('lottery-registration', () => null)

// توجه: پاسخ API فیلدی به اسم "کد قرعه‌کشی/بلیط" (ticket code) برنمی‌گردونه.
// اگر بک‌اند چنین کدی تولید می‌کنه، لازمه به پاسخ register/my-status اضافه بشه
// تا اینجا نمایش داده بشه. فعلاً این بخش حذف شده تا داده ساختگی نشون داده نشه.

onMounted(() => {
  // اگر کاربر مستقیم وارد این صفحه شده و داده‌ای در حافظه نیست،
  // می‌تونیم بعداً اینجا از my-status هم به عنوان fallback استفاده کنیم.
})

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatPrice(value) {
  if (value == null) return '-'
  return new Intl.NumberFormat('fa-IR').format(value)
}

const downloadPDF = async () => {
  // بارگذاری داینامیک برای سازگاری با Nuxt 3
  const html2pdf = (await import('html2pdf.js')).default

  const options = {
    margin: 10,
    filename: 'Lottery-Registration.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  html2pdf().set(options).from(pdfTarget.value).save()
}
</script>