<template>
  <div class="max-w-6xl mx-auto py-16 px-4" dir="rtl">
    
    <!-- Hero Section -->
<section class="flex flex-col md:flex-row items-center gap-12 mb-20">
  <div class="flex-1 w-full text-center md:text-right">
    <!-- حذف <br> اضافی و استفاده از حداکثر عرض برای کنترل خطوط -->
    <h1 class="text-[#0F184B] font-black text-[28px] md:text-[32px] mb-6 leading-tight"> 
      نادر تکنولوژی فقط یک نام نیست؛ یک <span class="text-[#2C7379]">نگاه</span> است.
    </h1>
    
    <!-- حذف <br> های سخت که باعث به هم ریختگی در موبایل می‌شدند -->
    <p class="text-[#0F184B] font-bold leading-relaxed text-[18px] md:text-[26px] rokh-light mb-8 max-w-2xl mx-auto md:mx-0">
      نگاهی که از جسارت، دقت و ساختن مسیرهای تازه الهام گرفته شده است. در دنیایی که تکنولوژی هر روز در حال تغییر است، ما باور داریم موفقیت فقط در همراه شدن با این تغییرات نیست؛ بلکه در خلق مسیرهای جدید و ساختن راه‌حل‌هایی است که بتوانند رشد واقعی ایجاد کنند.
    </p>

    <!-- تصویر فلش: فقط در دسکتاپ نمایش داده می‌شود -->
    <div class="hidden md:flex justify-center px-4">
      <img src="/images/curved-arrow.png" alt="فلش" class="w-[700px] object-contain -mt-10" />
    </div>

    <!-- دکمه: در موبایل وسط‌چین و در دسکتاپ طبق طراحی شما -->
<div class="flex justify-center md:justify-end mt-6 md:-mt-10">
  <NuxtLink
    to="/order/requestProject"
    class="bg-[#ECD0A0] border border-white w-full md:w-[241px] h-[57px] px-8 py-3 text-[20px] rounded-[16px] font-bold text-[#000000] shadow-lg md:ml-[80px] flex items-center justify-center"
  >
    ارتباط با ما
  </NuxtLink>
</div>
  </div>
</section>

    <!-- About Section -->
<section class="mb-20">
  <!-- ارتفاع تصویر در موبایل کاهش یافته و در دسکتاپ به حالت قبل برمی‌گردد -->
  <img 
    src="/images/about-img.png" 
    class="w-full h-[250px] sm:h-[350px] md:h-[490px] object-cover rounded-[1.5rem] md:rounded-[3rem]" 
  />
  
  <!-- تنظیمات متن برای خوانایی بهتر در موبایل -->
  <p class="text-[14px] md:text-[16px] mt-8 leading-[30px] md:leading-[50px] font-roboto font-normal text-[#0F184B] px-2 md:px-0">
    نادر تکنولوژی مجموعه‌ای تخصصی در حوزه تکنولوژی، توسعه وب، تولید محتوا و توسعه برند است که با ترکیب خلاقیت، استراتژی و فناوری، ایده‌ها را به پروژه‌هایی قابل رشد و ماندگار تبدیل می‌کند. ما معتقدیم هر پروژه فراتر از یک سفارش است؛ فرصتی برای ساختن تجربه‌ای ارزشمند که بتواند برای یک کسب‌وکار مسیر تازه‌ای ایجاد کند.
  </p>  
</section>

    <!-- Team Section -->
    <section class="mb-20">
      <h2 class="text-[32px] font-bold mb-12 text-[#877048] text-center">
        +۱۵ سال تجربه در ساخت <br> محصولات دیجیتال موفق
      </h2>

<!-- کانتینر اسلایدر: اضافه شدن snap-x snap-mandatory فقط برای موبایل -->
<div 
  ref="slider" 
  class="flex overflow-x-auto gap-6 pb-4 px-4 scrollbar-hide cursor-grab active:cursor-grabbing max-md:snap-x max-md:snap-mandatory max-md:scroll-pl-4"
>    
  <!-- کارت‌های تیم -->
  <div 
    v-for="(member, index) in teamMembers" 
    :key="index" 
    class="min-w-[300px] md:min-w-[500px] h-[194px] bg-[#BFD1D5] rounded-[40px] flex items-center overflow-hidden shadow-sm max-md:snap-start"
  >
    <div class="w-[120px] md:w-[205px] h-full shrink-0">
      <img :src="member.image" :alt="member.name" class="w-full h-full object-cover object-top rounded-[40px]" />
    </div>
    <div class="p-4 md:p-6 text-right flex-1 overflow-hidden">
      <h3 class="text-[18px] md:text-[20px] font-bold text-[#2D4745] mb-1">{{ member.name }}</h3>
      <p class="text-[#5A6E6C] text-[16px] md:text-[20px] font-medium mb-2">{{ member.role }}</p>
      <p class="text-[14px] md:text-[16px] text-[#747893] font-roboto leading-relaxed line-clamp-3">
        {{ member.desc }}
      </p>
    </div>
  </div>
</div>
            <div>
      <p class="font-roboto text-[14px] font-normal text-[#0F184B] leading-[40px] mt-[20px]">
        تیم ما با بیش از ۱۵ سال تجربه حرفه‌ای، پروژه‌ها را از مرحله ایده تا اجرا و توسعه همراهی می‌کند. از طراحی و توسعه وب‌سایت‌های اختصاصی، فروشگاه‌های اینترنتی و سیستم‌های تحت وب گرفته تا تولید محتوای حرفه‌ای، هویت بصری و راهکارهای رسانه‌ای؛ تمرکز ما تنها روی اجرا نیست، بلکه روی ساخت درست است؛ جایی که عملکرد، تجربه کاربری، امنیت و رشد بلندمدت در کنار یکدیگر معنا پیدا می‌کنند.
      </p>
    </div>
    </section>

    <!-- Services Section -->
<section class="mt-20">
  <!-- کاهش پدینگ در موبایل و حذف حاشیه اضافی -->
  <div class="p-4 md:p-8 rounded-[2rem] md:rounded-[2.5rem]">
    
    <transition name="fade" mode="out-in">
      <div :key="currentCategory.title">
        
        <!-- عنوان دسته‌بندی با عرض متناسب -->
        <h3 class="flex items-center justify-center text-center text-[14px] md:text-[15px] font-bold text-white mb-8 bg-[#67A9A8] py-2 rounded-[17px] w-[180px] h-[43px] mx-auto px-4">
          {{ currentCategory.title }}
        </h3>

        <!-- اصلاح گرید: در موبایل تمام عرض، در دسکتاپ طبق طراحی قبلی -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-[20px] max-w-[662px] mx-auto">
          <div
            v-for="(service, index) in currentCategory.items"
            :key="index"
            class="flex items-center justify-center border-[1.5px] border-[#CFD2E3] w-full h-[60px] rounded-[17px] text-center hover:border-[#2D7A6F] transition cursor-pointer text-[#0F184B] px-4 text-[13px] md:text-[16px]"
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
import { ref, computed, onMounted } from 'vue'
//بخش تتیم ما
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



//بخش خدمات 
const categories = [
  {
    title: 'خدمات طراحی سایت',
    items: ['طراحی UI/UX مدرن و کاربرمحور', 'بهینه‌سازی عملکرد و سرعت پروژه‌ها', 'توسعه فرانت‌اند و بک‌اند', 'مشاوره فنی و تحلیل ایده‌های کسب‌وکار', ' طراحی پنل‌های مدیریتی و API', 'طراحی فروشگاه‌های اینترنتی و سیستم‌های تحت وب']
  },
  {
    title: 'خدمات تولید محتوا',
    items: [' تولید ودیو های حرفه ای شبکه های اجتماعی ', '  فیلم برداری و تدوین', ' ساخت ریلز های ویومحور', ' موشن گرافیک و هویت بصری', 'سناریو نویسی و ایده پردازی', ' طراحی کمپین های محتوایی برند']
  },
    {
    title: 'خدمات برگزاری ایونت',
    items: [' برگزاری ایونت ها و رویداد ها ', 'مشاوره دیجیتال مارکتینگ  ', ' شبکه سازی بین برند ها و کسب و کار', ' ایجاد ارتباط بین تیم ها و متخصصان ', 'مشاوره رشد برند و توسعه کسب و کار', '   توسعه اکوسیستم کسب و کار ها ']
  }
];

const currentIndex = ref(0);
const currentCategory = computed(() => categories[currentIndex.value]);

const nextCategory = () => { currentIndex.value = (currentIndex.value + 1) % categories.length; };
const prevCategory = () => { currentIndex.value = (currentIndex.value - 1 + categories.length) % categories.length; };

//یک ایده، یک تیم، یک اثر  

// با این کد، هر وقت وارد صفحه about می‌شوید، فوترِ لایوت خودش را آپدیت می‌کند
const footerConfig = useState('footerConfig');
footerConfig.value = {
  title1: '    در <span class="text-[#ECD0A0]">نادر تکنولوژی</span>، کیفیت یک انتخاب نیست؛ یک اصل است.'
};

//اسلایدر با کشید موس در حالت دسکتاپ
const slider = ref(null)
onMounted(() => {
  const el = slider.value

  if (!el) return

  let isDown = false
  let startX
  let scrollLeft

  el.addEventListener('mousedown', (e) => {
    isDown = true
    startX = e.pageX - el.offsetLeft
    scrollLeft = el.scrollLeft
  })

  el.addEventListener('mouseleave', () => {
    isDown = false
  })

  el.addEventListener('mouseup', () => {
    isDown = false
  })

  el.addEventListener('mousemove', (e) => {
    if (!isDown) return

    e.preventDefault()

    const x = e.pageX - el.offsetLeft
    const walk = (x - startX) * 2

    el.scrollLeft = scrollLeft - walk
  })


  //حالت موبایل با کشیدن انگشت
  let touchStartX = 0
  let touchScrollLeft = 0

  el.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX
    touchScrollLeft = el.scrollLeft
  })

  el.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX
    const walk = (x - touchStartX) * 2

    el.scrollLeft = touchScrollLeft - walk
  })
})


//loop slide


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