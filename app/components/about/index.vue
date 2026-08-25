<template>
  <div class="max-w-6xl 2xl:max-w-[1600px] mx-auto py-16 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-12 overflow-x-hidden" :dir="isRtl ? 'rtl' : 'ltr'">    <!-- بخش هیرو (لوگو، عنوان، متن مقدماتی، دکمه) -->
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
        class="tiptap-render text-[#0F184B] dark:text-dark-text font-black text-[28px] sm:text-[30px] lg:text-[34px] 2xl:text-[40px] mb-6 leading-tight mt-8 font-roboto"
        v-html="pageData.title"
      ></h1>
  
  <!-- متن مقدماتی -->
  <div
    class="tiptap-render text-[#0F184B] dark:text-dark-text leading-relaxed text-[14px] md:text-[16px] 2xl:text-[19px] rokh-light mb-8 max-w-[600px] sm:max-w-[750px] lg:max-w-[1100px] 2xl:max-w-[1450px] mx-auto font-roboto"
    v-html="pageData.intro_text"
  ></div>
  
  <!-- فلش تزئینی (فقط از lg به بالا) -->
  <div class="hidden lg:flex justify-center px-4 w-full">
    <img
      src="/images/curved-arrow.png"
      :alt="$t('about.arrowAlt')"
      class="w-full max-w-[750px] 2xl:max-w-[850px] object-contain mt-10 lg:mt-8 2xl:mt-10"
      :class="isRtl ? '' : 'scale-x-[-1]'"
    />
  </div>
  
  <!-- دکمه تماس/سفارش پروژه -->
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
  
      <!-- بخش درباره‌ی ما (بنر و توضیحات) -->
  <section class="mb-20 2xl:mb-28">
    <img 
      :src="pageData.banner_image" 
      class="w-full h-[250px] sm:h-[350px] md:h-[490px] 2xl:h-[600px] object-cover rounded-[1.5rem] md:rounded-[3rem]" 
    />
    
    <div
      class="tiptap-render text-[14px] md:text-[16px] 2xl:text-[19px] mt-8 leading-[30px] md:leading-[50px] 2xl:leading-[52px] font-roboto font-normal text-[#0F184B] dark:text-dark-text px-2 md:px-0"
      v-html="pageData.description_top"
    ></div>
  
    <div
      v-if="pageData.description_bottom"
      class="tiptap-render text-[14px] md:text-[16px] 2xl:text-[19px] mt-4 leading-[30px] md:leading-[50px] 2xl:leading-[52px] font-roboto font-normal text-[#0F184B] dark:text-dark-text px-2 md:px-0"
      v-html="pageData.description_bottom"
    ></div>
  </section>
  
      <!-- بخش اسلایدر اعضای تیم -->
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
      @click="openMemberModal(member)"
      class="min-w-[85vw] max-w-[340px] md:w-[calc(50%-12px)] md:min-w-[calc(50%-12px)] md:max-w-none 2xl:w-[calc(50%-16px)] 2xl:min-w-[calc(50%-16px)] h-[194px] 2xl:h-[220px] bg-[#BFD1D5] dark:bg-[#3B5D6C] rounded-[40px] flex items-center overflow-hidden shadow-sm snap-start shrink-0 cursor-pointer"
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
  
      <!-- بخش خدمات (اسلایدر دسته‌بندی‌های خدمات) -->
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
    <IconsSliderButton direction="left" @click="prevCategory" />
    <IconsSliderButton direction="right" @click="nextCategory" />
  </div>
  </section>
  
      <!-- مودال جزئیات عضو تیم -->
      <Teleport to="body">
        <Transition name="fade">
          <div 
            v-if="selectedMember"
            @click.self="closeMemberModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          >
            <div 
              class="relative bg-[#BFD1D5] dark:bg-[#3B5D6C] rounded-[32px] w-full max-w-md max-h-[85vh] overflow-y-auto p-6 sm:p-8"
              :dir="isRtl ? 'rtl' : 'ltr'"
            >
              <!-- دکمه بستن -->
              <button 
                @click="closeMemberModal"
                class="absolute top-4 rtl:left-4 ltr:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/40 dark:bg-white/10 text-[#2D4745] dark:text-white hover:bg-white/70 dark:hover:bg-white/20 transition"
                aria-label="close"
              >
                ✕
              </button>
  
              <div class="flex justify-center mb-5">
                <img 
                  :src="selectedMember.image" 
                  :alt="selectedMember.name" 
                  class="w-[130px] h-[130px] object-cover object-top rounded-full"
                />
              </div>
  
              <div :class="isRtl ? 'text-right' : 'text-left'">
                <h3 class="text-[20px] sm:text-[22px] font-bold text-[#2D4745] dark:text-white mb-1 text-center">
                  {{ selectedMember.name }}
                </h3>
                <p class="text-[#5A6E6C] dark:text-white text-[16px] sm:text-[18px] font-medium mb-4 text-center">
                  {{ selectedMember.role }}
                </p>
                <p class="text-[14px] sm:text-[16px] text-[#747893] dark:text-white font-roboto leading-relaxed">
                  {{ selectedMember.desc }}
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  
  const localePath = useLocalePath();
  const { locale, localeProperties, tm, t, rt } = useI18n();
  const isRtl = computed(() => localeProperties.value.dir === 'rtl');
  
  const STORAGE_BASE = 'https://nadertechnologyteam.ir/storage/'
  
  // تبدیل مسیر نسبی تصویر به URL کامل قابل نمایش
  const resolveImageUrl = (value) => {
    if (!value) return value
    if (/^(https?:|blob:|data:)/.test(value)) return value
    return STORAGE_BASE + value.replace(/^\/+/, '')
  }
  
  // دریافت خام داده‌های صفحه‌ی about از API
  const rawPageItems = ref([])
  
  const { data: aboutRes, error: aboutError } = await useFetch(
    'https://nadertechnologyteam.ir/api/page/about'
  )
  
  if (aboutRes.value && aboutRes.value.data) {
    rawPageItems.value = aboutRes.value.data
  } else if (aboutError.value) {
    console.error('خطا در دریافت اطلاعات صفحه about:', aboutError.value)
  }
  
  // map سریع key -> item برای دسترسی راحت‌تر
  const rawPageMap = computed(() => {
    const map = {}
    rawPageItems.value.forEach((item) => {
      map[item.key] = item
    })
    return map
  })
  
  const pageKeys = ['title', 'intro_text', 'description_top', 'description_bottom', 'banner_image']
  
  // ساخت نسخه‌ی نهایی و دوزبانه‌ی محتوای صفحه با fallback به فارسی
  const pageData = computed(() => {
    const result = {
      title: '',
      intro_text: '',
      description_top: '',
      description_bottom: '',
      banner_image: '/images/about-banner.png'
    }
  
    pageKeys.forEach((key) => {
      const faEntry = rawPageMap.value[key]
      const enEntry = rawPageMap.value[`${key}_en`]
  
      const useEn = locale.value === 'en' && enEntry && enEntry.value
      const entry = useEn ? enEntry : faEntry
      if (!entry) return
  
      result[key] = entry.type === 'image_path' ? resolveImageUrl(entry.value) : entry.value
    })
  
    return result
  })
  
  // تصاویر ثابت اعضای تیم (متن از فایل ترجمه میاد)
  const teamImages = [
    '/images/customer.jpg',
    '/images/man-about.png',
    '/images/man-about.png',
    '/images/man-about.png'
  ]
  
  // ساخت لیست نهایی اعضای تیم با متن ترجمه‌شده و تصویر متناظر
  const teamMembers = computed(() => {
    const items = tm('about.team') || []
    return items.map((item, index) => ({
      name: rt(item.name),
      role: rt(item.role),
      desc: rt(item.desc),
      image: teamImages[index] ?? teamImages[0]
    }))
  })
  
  // دریافت درخت خدمات پروژه از API
  const rawServices = ref([])
  
  const { data: servicesRes, error: servicesError } = await useFetch(
    'https://nadertechnologyteam.ir/api/services/tree'
  )
  
  if (servicesRes.value && servicesRes.value.data && servicesRes.value.data.services) {
    rawServices.value = servicesRes.value.data.services
  } else if (servicesError.value) {
    console.error('خطا در دریافت خدمات پروژه:', servicesError.value)
  }
  
  // انتخاب فیلد انگلیسی در صورت وجود، وگرنه fallback به فارسی
  const pickLocalized = (obj, faKey, enKey) => {
    const enVal = obj?.[enKey]
    return (locale.value === 'en' && enVal) ? enVal : obj?.[faKey]
  }
  
  // ساخت لیست دسته‌بندی‌های فعال خدمات برای نمایش در اسلایدر
  const categories = computed(() => {
    return rawServices.value
      .filter((s) => s.is_active)
      .map((parent) => ({
        title: pickLocalized(parent, 'title', 'title_en'),
        items: parent.children && parent.children.length
          ? parent.children
              .filter((c) => c.is_active)
              .map((c) => pickLocalized(c, 'title', 'title_en'))
          : [pickLocalized(parent, 'description', 'description_en')]
      }))
  })
  
  const currentIndex = ref(0);
  const currentCategory = computed(() => categories.value[currentIndex.value] || { title: '', items: [] });
  
  // رفتن به دسته‌بندی بعدی خدمات
  const nextCategory = () => {
    if (!categories.value.length) return
    currentIndex.value = (currentIndex.value + 1) % categories.value.length;
  };
  // رفتن به دسته‌بندی قبلی خدمات
  const prevCategory = () => {
    if (!categories.value.length) return
    currentIndex.value = (currentIndex.value - 1 + categories.value.length) % categories.value.length;
  };
  
  // تنظیم محتوای فوتر سراسری مخصوص این صفحه
  const footerConfig = useState('footerConfig');
  footerConfig.value = {
    ...footerConfig.value,
    title1: t('about.footerTitle'),
    titleMargin: ''
  };
  
  const selectedMember = ref(null)
  
  // باز کردن مودال جزئیات یک عضو تیم
  function openMemberModal(member) {
    selectedMember.value = member
  }
  
  // بستن مودال جزئیات عضو تیم
  function closeMemberModal() {
    selectedMember.value = null
  }
  
  // بستن مودال با کلید Escape
  function handleEscKey(e) {
    if (e.key === 'Escape') closeMemberModal()
  }
  
  const slider = ref(null)
  let teamAutoplayTimer = null
  let teamAutoplayIndex = 0
  let sliderObserver = null
  let isSliderVisible = false
  
  // توقف اسلاید خودکار تیم
  const clearTeamAutoplay = () => {
    if (teamAutoplayTimer) {
      clearInterval(teamAutoplayTimer)
      teamAutoplayTimer = null
    }
  }
  
  // شروع اسلاید خودکار اعضای تیم
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
  
  // راه‌اندازی رویدادهای کیبورد، اینترسکشن‌آبزرور و درگ اسلایدر تیم
  onMounted(() => {
    window.addEventListener('keydown', handleEscKey)
  
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
  
  // پاکسازی رویدادها و تایمرها هنگام خروج از صفحه
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscKey)
    clearTeamAutoplay()
    if (sliderObserver) sliderObserver.disconnect()
  })
  
  // تنظیم رنگ اسکرول‌بار سراسری برای این صفحه
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
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* استایل‌های محتوای HTML که از RichTextEditor پنل ادمین می‌آید،
     هماهنگ با استایل خودِ ادیتور تا آنچه ادمین می‌نویسد همان‌طور نمایش داده شود */
  .tiptap-render :deep(p) {
    margin: 0 0 0.6em 0;
  }
  .tiptap-render :deep(p:last-child) {
    margin-bottom: 0;
  }
  .tiptap-render :deep(h2) {
    font-size: 1.15em;
    font-weight: 700;
    margin: 0.6em 0 0.3em 0;
  }
  .tiptap-render :deep(h3) {
    font-size: 1.05em;
    font-weight: 700;
    margin: 0.5em 0 0.3em 0;
  }
  .tiptap-render :deep(ul) {
    list-style: disc;
    padding-inline-start: 1.25rem;
    margin: 0.4em 0;
  }
  .tiptap-render :deep(ol) {
    list-style: decimal;
    padding-inline-start: 1.25rem;
    margin: 0.4em 0;
  }
  .tiptap-render :deep(blockquote) {
    border-inline-start: 3px solid #2d6a66;
    padding-inline-start: 0.75rem;
    margin: 0.5em 0;
    opacity: 0.85;
  }
  .tiptap-render :deep(a) {
    color: #2d6a66;
    text-decoration: underline;
  }
  .tiptap-render :deep(strong) {
    font-weight: 700;
  }
  
  </style>