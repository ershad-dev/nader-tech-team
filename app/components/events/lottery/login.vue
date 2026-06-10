<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">
    <RaffleCard>
      
      <!-- عنوان صفحه -->
      <div class="text-center mb-10">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">ورود به قرعه‌کشی</h1>
        <p class="text-gray-500 text-sm">برای شرکت در قرعه‌کشی، اطلاعات خود را وارد کنید.</p>
      </div>

      //فرم 
<form @submit.prevent="handleLogin" class="flex flex-col items-center gap-4 mb-8">
  <input 
    type="text" 
    placeholder="نام و نام خانوادگی" 
    v-model="form.name"
    class="w-[325px] h-[55px] p-4 rounded-2xl border border-gray-200 outline-none focus:border-[#2D7A6F] transition"
  />
<input 
    type="tel" 
    placeholder="شماره موبایل" 
    v-model="form.phone"
    dir="rtl"
    class="w-[325px] h-[55px] p-4 rounded-2xl border border-gray-200 outline-none focus:border-[#2D7A6F] transition text-right"
  />
  <input 
    type="text" 
    placeholder="کد قرعه‌کشی" 
    v-model="form.code"
    class="w-[325px] h-[55px] p-4 rounded-2xl border border-gray-200 outline-none focus:border-[#2D7A6F] transition"
  />
</form>

      <!-- دکمه ورود -->
      <button 
        @click="handleLogin"
        class="w-full bg-[#2D7A6F] text-white py-4 rounded-2xl font-bold hover:bg-teal-800 transition shadow-lg mt-[50px]"
      >
        ورود به قرعه‌کشی
      </button>

    </RaffleCard>
  </div>
</template>

<script setup>
// تعریف یک شیء واکنش‌گرا برای نگهداری داده‌های فرم
const form = ref({ name: '', phone: '', code: '' })

// تابعی برای پردازش اطلاعات هنگام ثبت فرم
const handleLogin = () => {
  console.log('اطلاعات ارسالی:', form.value)
}
</script>