<template>
  <div class="max-w-6xl mx-auto py-16 px-4" dir="rtl">
    
    <section class="flex flex-col md:flex-row items-center gap-12 mb-20">
<div class="flex-1">
  <h1 class=" text-[#0F184B] font-900 text-[32px] mb-6"> 
    نادر تکنولوژی فقط یک نام نیست؛ یک <span class="text-[#2C7379]">نگاه</span> <br> است.
  </h1>
  
  <p class="text-[#0F184B] font-bold leading-relaxed text-[26px] rokh-light mb-8">
    نگاهی که از جسارت، دقت و ساختن مسیرهای تازه الهام <br> گرفته شده است. در دنیایی که تکنولوژی هر روز در حال<br> تغییر است، ما باور داریم موفقیت فقط در همراه شدن با<br> این تغییرات نیست؛ بلکه در خلق مسیرهای جدید و <br> ساختن راه‌حل‌هایی است که بتوانند رشد واقعی ایجاد <br>کنند.
  </p>

  <div class="flex-1 flex justify-center px-4">
  <img src="/images/curved-arrow.png" alt="فلش" class="w-[700px] object-contain -mt-[100px] object-contain" />
</div>

  <div class="flex justify-end">
<button class="bg-[#ECD0A0] border-[1px] border-white w-[241px] h-[57px] px-8 py-3 text-[20px] rounded-[16px] font-bold text-[#000000] shadow-lg -mt-[50px] ml-[80px]">
  ارتباط با ما
</button>
  </div>
</div>
    
    </section>
    <section class="mb-20">
      <img src="/images/about-img.png" class="w-full h-[490px] object-cover rounded-[3rem]" />
      <p class="text-[14px] mt-8 leading-[50px] font-roboto font-normal text-[#0F184B] ">
          نادر تکنولوژی مجموعه‌ای تخصصی در حوزه تکنولوژی، توسعه وب، تولید محتوا و توسعه برند است که با ترکیب خلاقیت، استراتژی و فناوری، ایده‌ها را به پروژه‌هایی قابل رشد و ماندگار تبدیل می‌کند. ما معتقدیم هر پروژه فراتر از یک سفارش است؛ فرصتی برای ساختن تجربه‌ای ارزشمند که بتواند برای یک کسب‌وکار مسیر تازه‌ای ایجاد کند.
      </p>  
    </section>

<section class="mb-20">
  <h2 class="text-[32px] font-bold mb-12 text-[#877048] text-center">
    +۱۵ سال تجربه در ساخت <br> محصولات دیجیتال موفق
  </h2>

    <div
      ref="slider"
      class="flex overflow-x-auto gap-6 pb-4 px-4 scrollbar-hide cursor-grab active:cursor-grabbing"
    >    
    <div v-for="(member, index) in teamMembers" :key="index" 
         class="min-w-[500px] h-[194px] bg-[#BFD1D5] rounded-[40px] flex items-center overflow-hidden shadow-sm">
      
    <div class="w-[205px] h-full shrink-0">
        <img :src="member.image" 
             :alt="member.name" 
             class="w-[205px] h-[194px] object-cover object-top rounded-[40px]" />
      </div>

      <div class="p-6 text-right flex-1 overflow-hidden">
        <h3 class="text-[20px] font-bold text-[#2D4745] mb-1">{{ member.name }}</h3>
        <p class="text-[#5A6E6C] text-[20px] font-medium mb-2">{{ member.role }}</p>
        <p class="text-[16px] text-[#747893] font-roboto leading-relaxed line-clamp-3">
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
<!-- بخش خدمات (اسلایدر سوئیچ شونده) -->
<section class="mt-20">
  <!-- اضافه کردن یک کانتینر برای کنترل افکت -->
  <div class="p-8 rounded-[2.5rem] transition-all duration-500">
    
    <!-- استفاده از Transition برای ایجاد افکت نرم هنگام تغییر دسته‌بندی -->
    <transition name="fade" mode="out-in">
      <div :key="currentCategory.title">
        
        <h3 class="flex items-center justify-center text-center text-[15px] font-bold text-white mb-8 bg-[#67A9A8] py-2 rounded-[17px] w-[178px] h-[43px] mx-auto px-6">
          {{ currentCategory.title }}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] gap-x-12 max-w-[662px] mx-auto">
          <div
            v-for="(service, index) in currentCategory.items"
            :key="index"
            class="flex items-center justify-center border-[1.5px] border-[#CFD2E3] w-[317px] h-[60px] rounded-[17px] text-center hover:border-[#2D7A6F] transition cursor-pointer text-[#0F184B]"
          >
            {{ service }}
          </div>
        </div>
      </div>
    </transition>
  </div>

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