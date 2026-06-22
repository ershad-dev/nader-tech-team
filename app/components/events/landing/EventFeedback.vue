  <template>
    <!-- کانتینر اصلی بخش رضایت‌مندی -->
    <section class="max-w-6xl mx-auto py-12 px-4">

      <!-- عنوان بخش -->
      <div class="mb-12 flex flex-col items-center">
        <h2 class="bg-white px-8 py-4 rounded-t-[20px] rounded-b-[4px] shadow-xl border-[0.5px] font-bold text-[#0F184B] border w-[266px] h-[78px] text-[20px] flex items-center justify-center text-center whitespace-nowrap">
          رضایت از ایونت‌های برگزار شده
        </h2>
      </div>

      <!-- لیست کارت‌های تصاویر -->
      <div class="relative w-full flex flex-col items-center gap-6 mb-6">
        <div class="flex gap-6 overflow-hidden w-full justify-center">
          <!-- حلقه برای نمایش تصاویر نظرات -->
<div
  v-for="(item, index) in visibleTestimonials"
  :key="currentSlide + index"
  :ref="el => { cardRefs[currentSlide + index] = el }"
  @click="selectCard(currentSlide + index)"
  class="relative flex flex-col items-center"
>
  <img
    :src="item.image"
    :alt="'testimonial-' + (currentSlide + index)"
    :class="[
      'cursor-pointer w-[266px] h-[313px] object-cover rounded-[49px] transition-all duration-300',
      selectedIndex === (currentSlide + index)
        ? 'opacity-100 ring-4 ring-[#A36C53] ring-inset'
        : 'opacity-95 hover:opacity-100'
    ]"
  />
</div>
        </div>
      </div>
          <div class="flex justify-center items-center gap-2 mt-8">
              <SliderButton
                direction="left"
                @click="prevSlide"
              />

              <SliderButton
                direction="right"
                @click="nextSlide"
              />
          </div>
      <!-- بخش نمایش متن انتخاب شده (در صورت انتخاب یک کارت) -->
          <div
            v-if="selectedIndex !== null"
            class="testimonial-box relative bg-[#ABD7D840] w-[919px] min-h-[496px] rounded-[40px] p-8 mt-12 mx-auto transition-all duration-500"
          >
        
        <!-- نشانگر زبانه (Indicator) که به سمت کارت انتخاب شده اشاره می‌کند -->
          <div 
            class="notch absolute -top-[30px] w-[120px] bg-[#F7F3EB] transition-all duration-500 ease-out flex justify-center items-center z-10 mt-[30px]"
            :style="{ left: indicatorLeft + 'px', width: '140px', transform: 'translateX(-50%)' }"
          >
            <img src="/images/arrow-on-team3.png" alt="arrow" class="-mt-[35px] h-[69px]">
          </div>

        <!-- متن نظرات -->
        <h1 class="font-bold text-[#0F184B] text-[24px] mt-[50px]">
          تجربه همکاری از زبان مشتری 
        </h1>
  <p class="text-[#616474] text-right text-[24px] font-light leading-[50px] pt-4 text-center font-roboto">
    {{ testimonials[selectedIndex].text }}
  </p>
      </div>
    </section>
  </template>

  <script setup>
  import { ref, computed, onMounted, nextTick } from 'vue'

  const selectedIndex = ref(0); // کارت اول به صورت پیش‌فرض انتخاب شده است
  const cardRefs = ref([]);
  const indicatorLeft = ref(0);

  const testimonials = [
    { image: '/images/img-services.png', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
    { image: '/images/eventheader.jpg', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
    { image: '/images/img-services.png', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
    { image: '/images/eventheader.jpg', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
    { image: '/images/eventheader.jpg', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' }
  ];

  // تابع محاسبه موقعیت نشانگر
const updateIndicator = async () => {
  await nextTick()

  const card = cardRefs.value[selectedIndex.value]

  if (!card) {
    indicatorLeft.value = 70
    return
  }

  const detailsBox = document.querySelector('.testimonial-box')

  if (!detailsBox) return

  const cardRect = card.getBoundingClientRect()
  const detailsRect = detailsBox.getBoundingClientRect()

  indicatorLeft.value =
    cardRect.left -
    detailsRect.left +
    cardRect.width / 2

    //این باعث میشود که فرورفتگی از شو کیس بیرون نزند
    indicatorLeft.value = Math.max(
  70,
  Math.min(
    cardRect.left - detailsRect.left + cardRect.width / 2,
    detailsRect.width - 70
  )
)
}

  // اجرای محاسبه موقعیت در لحظه لود شدن صفحه
  onMounted(() => {
    updateIndicator();
    // برای بروزرسانی در صورت تغییر سایز صفحه
    window.addEventListener('resize', updateIndicator);
  });

  const selectCard = (index) => { 
    selectedIndex.value = index; 
    updateIndicator();
  };




  //slide
  const currentSlide = ref(0)
  const visibleCount = 3

  const visibleTestimonials = computed(() => {
    return testimonials.slice(
      currentSlide.value,
      currentSlide.value + visibleCount
    )
  })

const nextSlide = async () => {
  if (currentSlide.value < testimonials.length - visibleCount) {
    currentSlide.value++

    selectedIndex.value = currentSlide.value

    await nextTick()
    updateIndicator()
  }
}

const prevSlide = async () => {
  if (currentSlide.value > 0) {
    currentSlide.value--

    selectedIndex.value = currentSlide.value

    await nextTick()
    updateIndicator()
  }
}

  </script>

  <style scoped>

  .notch {
    position: absolute;
    height: 25px;
    background: #F7F3EB;

    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  /* قوس چپ */
  .notch::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 0;
    width: 20px;
    height: 20px;

    border-top-right-radius: 20px;
    box-shadow: 10px -10px 0 #F7F3EB; 
  }

  /* قوس راست */
  .notch::after {
    content: "";
    position: absolute;
    right: -20px;
    top: 0;
    width: 20px;
    height: 20px;
    border-top-left-radius: 20px;
    box-shadow: -10px -10px 0 #F7F3EB;
  }

  </style>