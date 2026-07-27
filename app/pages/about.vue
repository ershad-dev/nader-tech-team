<template>
  <div class="max-w-6xl 2xl:max-w-[1600px] mx-auto py-16 px-4 2xl:px-12 overflow-x-hidden" dir="rtl">
    
    <!-- Hero Section -->
<section class="flex flex-col md:flex-row items-center gap-12 2xl:gap-20 mb-20 2xl:mb-28 mt-8">
  
  <div class="flex-1 w-full text-center md:text-right relative pt-[70px] sm:pt-[90px] md:pt-0">

    <div class="md:flex md:items-center md:gap-6 lg:block">

      <!-- محتوا: عنوان، متن، فلش، دکمه (نسخه‌ی موبایل/دسکتاپ) -->
      <div class="md:w-1/2 lg:w-full">
        <h1 class="relative z-10 text-[#0F184B] dark:text-dark-text font-black text-[28px] sm:text-[30px] md:text-[32px] lg:text-[36px] 2xl:text-[42px] mb-6 leading-tight mt-12 sm:mt-14 md:mt-0" v-html="pageData.title">
        </h1>

        <!-- max-w فقط تو md بیشتر شد تا خط‌ها بلندتر بشن -->
        <p class="relative z-10 text-[#0F184B] dark:text-dark-text font-bold leading-relaxed text-[18px] sm:text-[20px] md:text-[26px] lg:text-[28px] 2xl:text-[30px] rokh-light mb-8 max-w-2xl md:max-w-[520px] lg:max-w-xl 2xl:max-w-3xl mx-auto md:mx-0">
          {{ pageData.intro_text }}
        </p>

        <div class="hidden lg:flex justify-center px-4">
          <img src="/images/curved-arrow.png" alt="فلش" class="w-[750px] 2xl:w-[850px] object-contain mt-10 lg:-mt-1 lg:ml-[150px]" />
        </div>

        <!-- دکمه نسخه اصلی: موبایل و دسکتاپ (نه md) -->
        <div class="flex justify-center mt-10 md:hidden lg:flex lg:justify-end lg:mt-0 lg:-mt-10">
          <NuxtLink
            to="/order/requestProject"
            class="bg-[#ECD0A0] dark:bg-dark-gold border border-white dark:border-dark-border w-full sm:w-[220px] lg:w-[241px] 2xl:w-[280px] h-[57px] 2xl:h-[64px] px-8 py-3 text-[20px] 2xl:text-[22px] rounded-[16px] font-bold text-[#000000] dark:text-dark-text-deep shadow-lg lg:ml-[80px] flex items-center justify-center lg:-mt-10 md:-mt-10"
          >
            ارتباط با ما
          </NuxtLink>
        </div>
      </div>

      <!-- ستون دایره + دکمه‌ی زیرش (فقط md) -->
      <div class="absolute -top-[10px] sm:-top-[15px] left-1/2 -translate-x-1/2 z-0
                  md:static md:left-auto md:translate-x-0 md:top-auto md:mt-0 md:w-1/2 md:flex md:flex-col md:items-center md:self-start md:-mt-8
                  lg:absolute lg:block lg:w-auto lg:top-0 lg:left-0 lg:-translate-y-1/3 lg:mt-[120px] 2xl:mt-[140px]">

        <p class="bg-black rounded-full
                  w-[160px] h-[160px]
                  sm:w-[220px] sm:h-[220px]
                  md:w-[220px] md:h-[220px]
                  lg:w-[360px] lg:h-[360px]
                  2xl:w-[360px] 2xl:h-[360px]
                  -mt-12
                  sm:mt-[50px]
                  lg:mt-0">
        </p>

<div class="hidden md:flex lg:hidden justify-center mt-[100px] w-full ">
  <NuxtLink
    to="/order/requestProject"
    class="bg-[#ECD0A0] dark:bg-dark-gold border border-white dark:border-dark-border w-[200px] h-[57px] px-8 py-3 text-[20px] rounded-[16px] font-bold text-[#000000] dark:text-dark-text-deep shadow-lg flex items-center justify-center "
  >
    ارتباط با ما
  </NuxtLink>
</div>
      </div>

    </div>
  </div>
</section>

    <!-- About Section -->
<section class="mb-20 2xl:mb-28">
  <!-- بنر از API: banner_image -->
  <img 
    :src="pageData.banner_image" 
    class="w-full h-[250px] sm:h-[350px] md:h-[490px] 2xl:h-[600px] object-cover rounded-[1.5rem] md:rounded-[3rem]" 
  />
  
  <!-- بند توضیحات ۱ -->
  <p class="text-[14px] md:text-[16px] 2xl:text-[19px] mt-8 leading-[30px] md:leading-[50px] 2xl:leading-[52px] font-roboto font-normal text-[#0F184B] dark:text-dark-text px-2 md:px-0">
    {{ pageData.description_top }}
  </p>  

  <!-- بند توضیحات ۲ (در صورت وجود در دیزاین جدا نمایش داده می‌شود) -->
  <p v-if="pageData.description_bottom" class="text-[14px] md:text-[16px] 2xl:text-[19px] mt-4 leading-[30px] md:leading-[50px] 2xl:leading-[52px] font-roboto font-normal text-[#0F184B] dark:text-dark-text px-2 md:px-0">
    {{ pageData.description_bottom }}
  </p>
</section>

    <!-- Team Section -->
    <section class="mb-20 2xl:mb-28">
      <h2 class="text-[32px] 2xl:text-[38px] font-bold mb-12 text-[#877048] dark:text-dark-gold text-center">
        +۱۵ سال تجربه در ساخت <br> محصولات دیجیتال موفق
      </h2>

<!-- کانتینر اسلایدر: اضافه شدن snap-x snap-mandatory فقط برای موبایل -->
<div 
  ref="slider" 
  class="flex overflow-x-auto gap-6 2xl:gap-8 pb-4 px-4 scrollbar-hide cursor-grab active:cursor-grabbing max-md:snap-x max-md:snap-mandatory max-md:scroll-pl-4 md:snap-x md:snap-mandatory scroll-smooth"
>    
  <!-- کارت‌های تیم -->
  <div 
    v-for="(member, index) in teamMembers" 
    :key="index" 
    class="min-w-[85vw] max-w-[340px] md:w-[calc(50%-12px)] md:min-w-[calc(50%-12px)] md:max-w-none 2xl:w-[calc(50%-16px)] 2xl:min-w-[calc(50%-16px)] h-[194px] 2xl:h-[220px] bg-[#BFD1D5] dark:bg-[#3B5D6C] rounded-[40px] flex items-center overflow-hidden shadow-sm snap-start shrink-0"
  >
    <div class="w-[120px] md:w-[205px] 2xl:w-[230px] h-full shrink-0">
      <img :src="member.image" :alt="member.name" class="w-full h-full object-cover object-top rounded-[40px]" />
    </div>
    <div class="p-4 md:p-6 2xl:p-7 text-right flex-1 overflow-hidden">
      <h3 class="text-[18px] md:text-[20px] 2xl:text-[22px] font-bold text-[#2D4745] dark:text-white mb-1">{{ member.name }}</h3>
      <p class="text-[#5A6E6C] dark:text-white text-[16px] md:text-[20px] 2xl:text-[21px] font-medium mb-2">{{ member.role }}</p>
      <p class="text-[14px] md:text-[16px] 2xl:text-[17px] text-[#747893] dark:text-white font-roboto leading-relaxed line-clamp-3">
        {{ member.desc }}
      </p>
    </div>
  </div>
</div>
            <div>
      <p class="font-roboto text-[14px] 2xl:text-[16px] font-normal text-[#0F184B] dark:text-dark-text leading-[40px] 2xl:leading-[44px] mt-[20px]">
        تیم ما با بیش از ۱۵ سال تجربه حرفه‌ای، پروژه‌ها را از مرحله ایده تا اجرا و توسعه همراهی می‌کند. از طراحی و توسعه وب‌سایت‌های اختصاصی، فروشگاه‌های اینترنتی و سیستم‌های تحت وب گرفته تا تولید محتوای حرفه‌ای، هویت بصری و راهکارهای رسانه‌ای؛ تمرکز ما تنها روی اجرا نیست، بلکه روی ساخت درست است؛ جایی که عملکرد، تجربه کاربری، امنیت و رشد بلندمدت در کنار یکدیگر معنا پیدا می‌کنند.
      </p>
    </div>
    </section>

    <!-- Services Section -->
<section class="mt-20 2xl:mt-28">
  <!-- کاهش پدینگ در موبایل و حذف حاشیه اضافی -->
  <div class="p-4 md:p-8 2xl:p-10 rounded-[2rem] md:rounded-[2.5rem]">
    
    <transition name="fade" mode="out-in">
      <div :key="currentCategory.title">
        
        <!-- عنوان دسته‌بندی با عرض متناسب -->
        <h3 class="flex items-center justify-center text-center text-[14px] md:text-[15px] 2xl:text-[16px] font-bold text-white dark:text-white mb-8 bg-[#67A9A8] dark:bg-dark-accent py-2 rounded-[17px] w-[180px] 2xl:w-[200px] h-[43px] 2xl:h-[46px] mx-auto px-4">
          {{ currentCategory.title }}
        </h3>

        <!-- اصلاح گرید: در موبایل تمام عرض، در دسکتاپ طبق طراحی قبلی -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-[20px] 2xl:gap-x-16 2xl:gap-y-[24px] max-w-[662px] 2xl:max-w-[820px] mx-auto">
          <div
            v-for="(service, index) in currentCategory.items"
            :key="index"
            class="flex items-center justify-center border-[1.5px] border-[#CFD2E3] dark:border-dark-border w-full h-[60px] 2xl:h-[68px] rounded-[17px] text-center hover:border-[#2D7A6F] dark:hover:border-dark-highlight transition cursor-pointer text-[#0F184B] dark:text-dark-text px-4 text-[13px] md:text-[16px] 2xl:text-[17px]"
          >
            {{ service }}
          </div>
        </div>
      </div>
    </transition>
  </div>

  <!-- دکمه‌های کنترل اسلایدر -->
  <div class="flex items-center justify-center gap-4 mt-8">
    <SliderButton direction="left" @click="prevCategory" />
    <SliderButton direction="right" @click="nextCategory" />
  </div>
</section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// =====================================================
// اتصال به API صفحه about
// =====================================================
// کلیدهای ثابت طبق مستندات:
// title, intro_text, description_top, description_bottom, banner_image
const pageData = ref({
  title: '',
  intro_text: '',
  description_top: '',
  description_bottom: '',
  banner_image: '/images/about-img.png' // مقدار پیش‌فرض تا لود شدن API
})

const { data: aboutRes, error: aboutError } = await useFetch(
  'https://nadertechnologyteam.ir/api/page/about'
)

if (aboutRes.value && aboutRes.value.data) {
  aboutRes.value.data.forEach((item) => {
    pageData.value[item.key] = item.value
  })
} else if (aboutError.value) {
  console.error('خطا در دریافت اطلاعات صفحه about:', aboutError.value)
}

// =====================================================
// بخش تیم (فعلاً hardcode - بعداً از API میاد)
// =====================================================
const teamMembers = [
  {
    name: "علی رضایی",
    role: "مدیر پروژه",
    desc: "هدایت و هماهنگی بین تیم. نظارت بر روند اجرا و اطمینان از دستیابی به اهداف پروژه",
    image: "/images/customer.jpg"
  },
  {
    name: "علی رضایی",
    role: "مدیر پروژه",
    desc: "هدایت و هماهنگی بین تیم. نظارت بر روند اجرا و اطمینان از دستیابی به اهداف پروژه",
    image: "/images/man-about.png"
  },
  {
    name: "علی رضایی",
    role: "مدیر پروژه",
    desc: "هدایت و هماهنگی بین تیم. نظارت بر روند اجرا و اطمینان از دستیابی به اهداف پروژه",
    image: "/images/man-about.png"
  },
  {
    name: "علی رضایی",
    role: "مدیر پروژه",
    desc: "هدایت و هماهنگی بین تیم. نظارت بر روند اجرا و اطمینان از دستیابی به اهداف پروژه",
    image: "/images/man-about.png"
  }
];

// =====================================================
// بخش خدمات - اتصال به API project-services (ساختار درختی)
// =====================================================
// هر آیتم اصلی (parent) یک دسته می‌شود و children آن، آیتم‌های داخلش
const categories = ref([])

const { data: servicesRes, error: servicesError } = await useFetch(
  'https://nadertechnologyteam.ir/api/services/tree'
)

if (servicesRes.value && servicesRes.value.data && servicesRes.value.data.services) {
  categories.value = servicesRes.value.data.services
    .filter((s) => s.is_active) // فقط سرویس‌های فعال
    .map((parent) => ({
      title: parent.title,
      // اگر زیرسرویس (children) داشت، عنوان‌شان را نمایش می‌دهیم
      // در غیر این صورت description خودِ سرویس اصلی را نشان می‌دهیم
      items: parent.children && parent.children.length
        ? parent.children.filter((c) => c.is_active).map((c) => c.title)
        : [parent.description]
    }))
} else if (servicesError.value) {
  console.error('خطا در دریافت خدمات پروژه:', servicesError.value)
}

const currentIndex = ref(0);
const currentCategory = computed(() => categories.value[currentIndex.value] || { title: '', items: [] });

const nextCategory = () => {
  if (!categories.value.length) return
  currentIndex.value = (currentIndex.value + 1) % categories.value.length;
};
const prevCategory = () => {
  if (!categories.value.length) return
  currentIndex.value = (currentIndex.value - 1 + categories.value.length) % categories.value.length;
};

// با این کد، هر وقت وارد صفحه about می‌شوید، فوترِ لایوت خودش را آپدیت می‌کند
const footerConfig = useState('footerConfig');
footerConfig.value = {
  title1: '    در <span class="text-[#ECD0A0]">نادر تکنولوژی</span>، کیفیت یک انتخاب نیست؛ یک اصل است.',
  titleMargin: '-mt-[100px]'
};

// =====================================================
// اسلایدر تیم: درگ با موس/لمس + autoplay
// اصلاح‌شده: autoplay فقط زمانی فعال است که اسلایدر
// واقعاً در دید کاربر باشد، و اسکرول فقط داخل خودِ
// کانتینر انجام می‌شود (بدون جابه‌جایی کل صفحه)
// =====================================================
const slider = ref(null)
let teamAutoplayTimer = null
let teamAutoplayIndex = 0
let sliderObserver = null
let isSliderVisible = false

const clearTeamAutoplay = () => {
  if (teamAutoplayTimer) {
    clearInterval(teamAutoplayTimer)
    teamAutoplayTimer = null
  }
}

const startTeamAutoplay = () => {
  clearTeamAutoplay()
  if (!teamMembers.length || !isSliderVisible) return

  teamAutoplayTimer = setInterval(() => {
    const el = slider.value
    if (!el || !el.children.length) return

    teamAutoplayIndex = (teamAutoplayIndex + 1) % el.children.length
    const target = el.children[teamAutoplayIndex]

    if (target) {
      // به‌جای scrollIntoView (که کل صفحه را اسکرول می‌کرد)
      // فقط اسکرول افقیِ خودِ کانتینر را تغییر می‌دهیم
      el.scrollTo({
        left: target.offsetLeft - el.offsetLeft,
        behavior: 'smooth'
      })
    }
  }, 5000) // هر ۵ ثانیه
}

onMounted(() => {
  const el = slider.value
  if (!el) return

  // --- IntersectionObserver: فقط وقتی اسلایدر دیده می‌شود autoplay را روشن کن ---
  sliderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isSliderVisible = entry.isIntersecting
        if (isSliderVisible) {
          startTeamAutoplay()
        } else {
          clearTeamAutoplay()
        }
      })
    },
    { threshold: 0.4 } // وقتی حداقل ۴۰٪ از اسلایدر دیده شود
  )
  sliderObserver.observe(el)

  // --- درگ با ماوس (دسکتاپ) ---
  let isDown = false
  let startX
  let scrollLeft

  el.addEventListener('mousedown', (e) => {
    isDown = true
    startX = e.pageX - el.offsetLeft
    scrollLeft = el.scrollLeft
    clearTeamAutoplay()
  })

  el.addEventListener('mouseleave', () => {
    isDown = false
    if (isSliderVisible) startTeamAutoplay()
  })

  el.addEventListener('mouseup', () => {
    isDown = false
    if (isSliderVisible) startTeamAutoplay()
  })

  el.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - startX) * 2
    el.scrollLeft = scrollLeft - walk
  })

  // توقف autoplay وقتی موس روی اسلایدر است (دسکتاپ)
  el.addEventListener('mouseenter', clearTeamAutoplay)

  // --- درگ با لمس (موبایل) ---
  let touchStartX = 0
  let touchScrollLeft = 0

  el.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX
    touchScrollLeft = el.scrollLeft
    clearTeamAutoplay()
  })

  el.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX
    const walk = (x - touchStartX) * 2
    el.scrollLeft = touchScrollLeft - walk
  })

  el.addEventListener('touchend', () => {
    if (isSliderVisible) startTeamAutoplay()
  })
})

onBeforeUnmount(() => {
  clearTeamAutoplay()
  if (sliderObserver) sliderObserver.disconnect()
})
</script>



<style scoped> 

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

</style>