<template>
  <div class="max-w-6xl 2xl:max-w-[1600px] mx-auto py-16 px-4 2xl:px-12 overflow-x-hidden" :dir="isRtl ? 'rtl' : 'ltr'">
    
    <!-- Hero Section -->
<section class="flex flex-col items-center gap-6 mb-20 2xl:mb-28 -mt-[20px]">

  <div class="w-full text-center">

<!-- لوگو -->
<div class="flex justify-center">
  <img
    src="/images/ntt-logo.png"
    :alt="$t('about.logoAlt')"
    class="rounded-full object-cover
           w-[190px] h-[190px]
           sm:w-[250px] sm:h-[250px]
           lg:w-[310px] lg:h-[310px]
           2xl:w-[370px] 2xl:h-[370px]"
  />
</div>
    <!-- عنوان -->
    <h1
      class="text-[#0F184B] dark:text-dark-text font-black text-[28px] sm:text-[30px] lg:text-[34px] 2xl:text-[40px] mb-6 leading-tight mt-8 font-roboto"
      v-html="pageData.title"
    ></h1>

<!-- متن مقدماتی -->
<p
  class="text-[#0F184B] dark:text-dark-text leading-relaxed text-[14px] md:text-[16px] 2xl:text-[19px] rokh-light mb-8 max-w-[600px] sm:max-w-[750px] lg:max-w-[1100px] 2xl:max-w-[1450px] mx-auto font-roboto"
>
  {{ pageData.intro_text }}
</p>

<!-- فلش (فقط از lg به بالا) -->
<div class="hidden lg:flex justify-center px-4 w-full">
  <img
    src="/images/curved-arrow.png"
    :alt="$t('about.arrowAlt')"
    class="w-full max-w-[750px] 2xl:max-w-[850px] object-contain mt-10 lg:mt-8 2xl:mt-10"
    :class="isRtl ? '' : 'scale-x-[-1]'"
  />
</div>

<!-- دکمه -->
<div class="flex justify-center mt-10 lg:justify-end lg:-mt-10 2xl:-mt-16">
  <NuxtLink
    :to="localePath('/order/requestProject')"
    class="bg-[#ECD0A0] dark:bg-dark-gold border border-white dark:border-dark-border w-full sm:w-[220px] xl:w-[241px] 2xl:w-[280px] h-[57px] 2xl:h-[64px] px-8 py-3 text-[20px] 2xl:text-[22px] rounded-[16px] font-bold text-[#000000] dark:text-dark-text-deep shadow-lg flex items-center justify-center whitespace-nowrap"
  >
    {{ $t('about.contactButton') }}
  </NuxtLink>
</div>
  </div>
</section>

    <!-- About Section -->
<section class="mb-20 2xl:mb-28">
  <img 
    :src="pageData.banner_image" 
    class="w-full h-[250px] sm:h-[350px] md:h-[490px] 2xl:h-[600px] object-cover rounded-[1.5rem] md:rounded-[3rem]" 
  />
  
  <p class="text-[14px] md:text-[16px] 2xl:text-[19px] mt-8 leading-[30px] md:leading-[50px] 2xl:leading-[52px] font-roboto font-normal text-[#0F184B] dark:text-dark-text px-2 md:px-0">
    {{ pageData.description_top }}
  </p>  

  <p v-if="pageData.description_bottom" class="text-[14px] md:text-[16px] 2xl:text-[19px] mt-4 leading-[30px] md:leading-[50px] 2xl:leading-[52px] font-roboto font-normal text-[#0F184B] dark:text-dark-text px-2 md:px-0">
    {{ pageData.description_bottom }}
  </p>
</section>

    <!-- Team Section -->
    <section class="mb-20 2xl:mb-28">
<h2 class="text-[20px] sm:text-[22px] md:text-[28px] lg:text-[32px] 2xl:text-[38px] font-bold mb-12 text-[#877048] dark:text-dark-gold text-center lg:whitespace-nowrap">
  {{ $t('about.teamHeading') }}
</h2>

<div 
  ref="slider" 
  class="flex overflow-x-auto gap-6 2xl:gap-8 pb-4 px-4 scrollbar-hide cursor-grab active:cursor-grabbing max-md:snap-x max-md:snap-mandatory max-md:scroll-pl-4 md:snap-x md:snap-mandatory scroll-smooth"
>    
  <div 
    v-for="(member, index) in teamMembers" 
    :key="index" 
    class="min-w-[85vw] max-w-[340px] md:w-[calc(50%-12px)] md:min-w-[calc(50%-12px)] md:max-w-none 2xl:w-[calc(50%-16px)] 2xl:min-w-[calc(50%-16px)] h-[194px] 2xl:h-[220px] bg-[#BFD1D5] dark:bg-[#3B5D6C] rounded-[40px] flex items-center overflow-hidden shadow-sm snap-start shrink-0"
  >
    <div class="w-[120px] md:w-[205px] 2xl:w-[230px] h-full shrink-0">
      <img :src="member.image" :alt="member.name" class="w-full h-full object-cover object-top rounded-[40px]" />
    </div>
    <div class="p-4 md:p-6 2xl:p-7 flex-1 overflow-hidden" :class="isRtl ? 'text-right' : 'text-left'">
      <h3 class="text-[18px] md:text-[20px] 2xl:text-[22px] font-bold text-[#2D4745] dark:text-white mb-1">{{ member.name }}</h3>
      <p class="text-[#5A6E6C] dark:text-white text-[16px] md:text-[20px] 2xl:text-[21px] font-medium mb-2">{{ member.role }}</p>
      <p class="text-[14px] md:text-[16px] 2xl:text-[17px] text-[#747893] dark:text-white font-roboto leading-relaxed line-clamp-3">
        {{ member.desc }}
      </p>
    </div>
  </div>
</div>
    </section>

    <!-- Services Section -->
<section class="mt-20 2xl:mt-28">
  <div class="p-4 md:p-8 2xl:p-10 rounded-[2rem] md:rounded-[2.5rem]">
    
    <transition name="fade" mode="out-in">
      <div :key="currentCategory.title">
        
        <h3 class="flex items-center justify-center text-center text-[17px] md:text-[19px] lg:text-[20px] 2xl:text-[24px] font-extrabold text-white dark:text-white mb-8 bg-[#67A9A8] dark:bg-dark-accent py-3 rounded-[17px] w-[260px] md:w-[300px] 2xl:w-[340px] h-[44px] md:h-[48px] 2xl:h-[56px] mx-auto px-4">
  {{ currentCategory.title }}
</h3>

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

<div class="flex items-center justify-center gap-4 mt-8">
  <SliderButton :direction="isRtl ? 'left' : 'right'" @click="prevCategory" />
  <SliderButton :direction="isRtl ? 'right' : 'left'" @click="nextCategory" />
</div>
</section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const localePath = useLocalePath();
const { locale, localeProperties, tm, t, rt } = useI18n();
const isRtl = computed(() => localeProperties.value.dir === 'rtl');

// =====================================================
// تبدیل مسیر نسبی تصویر به URL کامل قابل نمایش
// =====================================================
const STORAGE_BASE = 'https://nadertechnologyteam.ir/storage/'

const resolveImageUrl = (value) => {
  if (!value) return value
  if (/^(https?:|blob:|data:)/.test(value)) return value
  return STORAGE_BASE + value.replace(/^\/+/, '')
}

// =====================================================
// اتصال به API صفحه about
// نکته: محتوای این بخش از سرور میاد و فعلاً فقط فارسیه؛
// برای دوزبانه‌شدن واقعی این متن‌ها، API باید پارامتر locale
// رو پشتیبانی کنه (خارج از محدوده‌ی این تغییرات فرانت‌اند)
// =====================================================
const pageData = ref({
  title: '',
  intro_text: '',
  description_top: '',
  description_bottom: '',
  banner_image: '/images/about-img.png'
})

const { data: aboutRes, error: aboutError } = await useFetch(
  'https://nadertechnologyteam.ir/api/page/about'
)

if (aboutRes.value && aboutRes.value.data) {
  aboutRes.value.data.forEach((item) => {
    if (item.type === 'image_path') {
      pageData.value[item.key] = resolveImageUrl(item.value)
    } else {
      pageData.value[item.key] = item.value
    }
  })
} else if (aboutError.value) {
  console.error('خطا در دریافت اطلاعات صفحه about:', aboutError.value)
}

// =====================================================
// بخش تیم (فعلاً hardcode - بعداً از API میاد)
// متن (نام/سمت/توضیح) از فایل ترجمه میاد، عکس‌ها ثابت می‌مونن
// =====================================================
const teamImages = [
  '/images/customer.jpg',
  '/images/man-about.png',
  '/images/man-about.png',
  '/images/man-about.png'
]

const teamMembers = computed(() => {
  const items = tm('about.team') || []
  return items.map((item, index) => ({
    name: rt(item.name),
    role: rt(item.role),
    desc: rt(item.desc),
    image: teamImages[index] ?? teamImages[0]
  }))
})

// =====================================================
// بخش خدمات - اتصال به API project-services (ساختار درختی)
// نکته: عنوان دسته‌ها و آیتم‌ها هم از API میان و فعلاً فقط فارسی هستن
// =====================================================
const categories = ref([])

const { data: servicesRes, error: servicesError } = await useFetch(
  'https://nadertechnologyteam.ir/api/services/tree'
)

if (servicesRes.value && servicesRes.value.data && servicesRes.value.data.services) {
  categories.value = servicesRes.value.data.services
    .filter((s) => s.is_active)
    .map((parent) => ({
      title: parent.title,
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

// =====================================================
// تنظیم محتوای فوتر سبز برای این صفحه
// -----------------------------------------------------
// نکته مهم: footerConfig یک useState سراسریه که بین صفحات
// پایدار می‌مونه. اگر یک کلید (مثل titleMargin) رو ست کنیم
// ولی صفحهٔ بعدی همون کلید رو ست نکنه، مقدار قبلی باقی می‌مونه
// و باعث می‌شه چیدمان صفحهٔ بعدی به‌هم بریزه (باگی که داشتیم).
// راه‌حل: همیشه هر کلیدی که استفاده می‌کنیم رو صریح مقداردهی کنیم،
// حتی اگر مقدارش خالیه.
// =====================================================
const footerConfig = useState('footerConfig');
footerConfig.value = {
  ...footerConfig.value,
  title1: t('about.footerTitle'),
  titleMargin: '' // قبلاً اینجا '-mt-[100px]' بود که باعث چسبیدن متن به بالا می‌شد
};

// =====================================================
// اسلایدر تیم: درگ با موس/لمس + autoplay
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
  if (!teamMembers.value.length || !isSliderVisible) return

  teamAutoplayTimer = setInterval(() => {
    const el = slider.value
    if (!el || !el.children.length) return

    teamAutoplayIndex = (teamAutoplayIndex + 1) % el.children.length
    const target = el.children[teamAutoplayIndex]

    if (target) {
      el.scrollTo({
        left: target.offsetLeft - el.offsetLeft,
        behavior: 'smooth'
      })
    }
  }, 3000)
}

onMounted(() => {
  const el = slider.value
  if (!el) return

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
    { threshold: 0.4 }
  )
  sliderObserver.observe(el)

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

  el.addEventListener('mouseenter', clearTeamAutoplay)

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

const scrollbarConfig = useScrollbarConfig();
scrollbarConfig.value = {
  light: '#ECD0A0',
  dark: '#ECD0A0'
};
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