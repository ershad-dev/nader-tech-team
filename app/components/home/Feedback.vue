<template>
  <section
    ref="sectionRef"
    class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto py-12 lg:py-20 min-[1920px]:py-24 px-4 -mt-[110px]"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >

    <div class="mb-8 lg:mb-12">
      <h2 class="text-xl sm:text-2xl lg:text-3xl min-[1920px]:text-4xl font-bold text-[#0F184B] dark:text-dark-text mb-4">{{ $t('home.feedback.title') }}</h2>
    </div>

    <!-- حالت لودینگ -->
    <div v-if="loading" class="text-center py-10 text-[#0F184B] dark:text-dark-text">{{ $t('home.feedback.loading') }}</div>

    <!-- حالت خطا -->
    <div v-else-if="error" class="text-center py-10 text-red-500 dark:text-red-400">{{ $t('home.feedback.error') }}</div>

    <div
      v-else
      ref="scrollContainer"
      class="flex gap-3 lg:gap-6 min-[1920px]:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8"
      style="scrollbar-width: none; -ms-overflow-style: none;"
      @pointerdown="pauseAutoplayTemporarily"
      @touchstart.passive="pauseAutoplayTemporarily"
    >
        <div
          v-for="customer in customers"
          :key="customer.id"
          ref="cardRefs"
          class="min-w-[200px] sm:min-w-[260px] lg:min-w-[320px] min-[1920px]:min-w-[380px] h-[260px] sm:h-[300px] lg:h-[340px] min-[1920px]:h-[400px] border border-slate-300 dark:border-dark-border rounded-[17px] overflow-hidden shadow-xl dark:shadow-none transition-all hover:shadow-xl dark:hover:ring-1 dark:hover:ring-dark-accent snap-center flex flex-col"
          :dir="isRtl ? 'rtl' : 'ltr'"
        >
        <!-- بخش پروفایل -->
        <div class="bg-[#EDEDED] dark:bg-[#D5E2E53B] px-4 lg:px-6 min-[1920px]:px-8 pt-4 lg:pt-6 min-[1920px]:pt-8 pb-3 lg:pb-4 min-[1920px]:pb-6 shadow-xl dark:shadow-none -mt-[5px] shrink-0">
          <img
            :src="customer.image"
            :alt="customer.name"
            class="w-[120px] h-[100px] sm:w-[170px] sm:h-[145px] lg:w-[200px] lg:h-[170px] min-[1920px]:w-[230px] min-[1920px]:h-[195px] rounded-[14px] mx-auto mb-2 lg:mb-4 min-[1920px]:mb-6 object-cover object-top"
          />

          <!-- نکته: اسم مشتری همیشه فارسی می‌مونه (اسامی معمولاً ترجمه نمی‌شن) -->
          <h3 class="text-[12px] lg:text-[13px] min-[1920px]:text-[15px] font-extrabold text-[#0F184B] dark:text-dark-text mb-1 rokh-bold text-center">
            {{ customer.name }}
          </h3>

          <p class="text-[#0F184B] dark:text-dark-text/80 font-roboto font-medium text-[11px] lg:text-[13px] min-[1920px]:text-[14px] text-center">
            {{ displayRole(customer) }}
          </p>
        </div>

       <!-- بخش نظر - flex-1 یعنی هر فضای باقی‌مونده از کارت رو پر می‌کنه، دیگه نیازی به ارتفاع دستی نیست -->
       <div class="bg-[#EDEDED] dark:bg-[#D5E2E53B] p-4 lg:p-6 min-[1920px]:p-8 flex-1 min-h-0 flex flex-col">
         <p
           class="comment-clamp text-[#747893] dark:text-dark-text/80 text-[12px] lg:text-[13px] min-[1920px]:text-[14px] leading-relaxed font-roboto -mt-[20px] flex-1"
           :dir="commentDir(customer)"
         >
           {{ displayComment(customer) }}
         </p>
       </div>
      </div>
    </div>

    <div class="flex items-center justify-center sm:justify-between mt-4 gap-5">

<div class="hidden sm:flex gap-2">
        <IconsSliderButton
          :direction="isRtl ? 'left' : 'right'"
          @click="scroll('right')"
          class=" hover:text-gray transition"
        />
        <IconsSliderButton
          :direction="isRtl ? 'right' : 'left'"
          @click="scroll('left')"
          class=" hover:text-gray transition"
        />
      </div>
<div class="flex gap-2">
  <button
    v-for="(dot, index) in dotsArray"
    :key="index"
    type="button"
    :aria-label="$t('home.feedback.goToSlide', { number: index + 1 })"
    @click="goToSlide(index)"
    :class="[
      'h-2 rounded-full transition-all duration-300 cursor-pointer',
      activeIndex === index ? 'w-8 bg-[#2D7A6F] dark:bg-dark-accent' : 'w-2 bg-slate-300 dark:bg-dark-border'
    ]"
  ></button>
</div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';

const { locale, localeProperties } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const { getTranslated, logMissingTranslation } = useManualTranslation('reviews')

const sectionRef = ref(null);
const scrollContainer = ref(null);
const cardRefs = ref([]);
const activeIndex = ref(0);
const cardWidth = ref(414);

const loading = ref(true);
const error = ref(false);
const customers = ref([]);

const config = useRuntimeConfig();

const { items: resumeItems, pending: listPending, error: listError } = useResumes();

const MAX_FEEDBACK_COUNT = 6;
const AUTOPLAY_INTERVAL_MS = 5000;
const AUTOPLAY_RESUME_DELAY_MS = 4000;
const MAX_DOTS = 3;

/* ----------------- ترجمه‌ی دستی نظرات ----------------- */
const displayRole = (customer) => {
  if (isRtl.value) return customer.role
  return getTranslated(customer.id, 'role', customer.role)
}

const displayComment = (customer) => {
  if (isRtl.value) return customer.comment
  return getTranslated(customer.id, 'comment', customer.comment)
}

// جهت پاراگراف نظر: اگه ترجمه‌ی دستی موجود بود انگلیسیه (ltr)، وگرنه فارسیه (rtl)
const commentDir = (customer) => {
  if (isRtl.value) return 'rtl'
  return getTranslated(customer.id, 'comment', null) ? 'ltr' : 'rtl'
}

// وقتی صفحه انگلیسیه، هر مشتری‌ای که ترجمه‌ی دستی نداره رو تو localStorage ثبت می‌کنیم
watch([customers, locale], () => {
  if (isRtl.value) return
  customers.value.forEach((c) => logMissingTranslation(c, ['role', 'comment']))
})

/* ----------------- Dots (حداکثر 3 تا) ----------------- */
const dotsCount = computed(() => Math.min(customers.value.length, MAX_DOTS));
const dotsArray = computed(() => Array.from({ length: dotsCount.value }));
const itemsPerDot = computed(() =>
  dotsCount.value > 0 ? Math.ceil(customers.value.length / dotsCount.value) : 1
);

const updateCardWidth = () => {
  if (cardRefs.value && cardRefs.value.length > 0) {
    const firstCard = cardRefs.value[0];
    const gap = window.innerWidth >= 1920 ? 32 : window.innerWidth >= 1024 ? 24 : window.innerWidth >= 640 ? 24 : 12;
    cardWidth.value = firstCard.offsetWidth + gap;
  }
};

const scroll = (direction) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -cardWidth.value : cardWidth.value,
      behavior: 'smooth'
    });
  }
};

const updateIndex = () => {
  if (scrollContainer.value) {
    const cardIndex = Math.round(Math.abs(scrollContainer.value.scrollLeft) / cardWidth.value);
    const dotIndex = Math.min(Math.floor(cardIndex / itemsPerDot.value), dotsCount.value - 1);
    activeIndex.value = Math.max(dotIndex, 0);
  }
};

const goToSlide = (dotIndex) => {
  const cardIndex = dotIndex * itemsPerDot.value;
  const card = cardRefs.value[cardIndex];
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
  pauseAutoplayTemporarily();
};

/* ----------------- Autoplay ----------------- */
let autoplayTimer = null;
let resumeTimeout = null;
let sectionObserver = null;
const isSectionVisible = ref(false);

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const startAutoplay = () => {
  stopAutoplay();
  if (!isSectionVisible.value || !cardRefs.value || cardRefs.value.length <= 1) return;

  autoplayTimer = setInterval(() => {
    if (!cardRefs.value || cardRefs.value.length === 0) return;
    const nextIndex = (activeIndex.value + 1) % cardRefs.value.length;
    cardRefs.value[nextIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, AUTOPLAY_INTERVAL_MS);
};

// وقتی کاربر خودش اسکرول/سوایپ کرد، اتوپلی رو موقتاً متوقف می‌کنیم و بعد از چند ثانیه دوباره شروع می‌کنیم
const pauseAutoplayTemporarily = () => {
  stopAutoplay();
  if (resumeTimeout) clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => {
    startAutoplay();
  }, AUTOPLAY_RESUME_DELAY_MS);
};

const buildFeedbacks = async (list) => {
  loading.value = true;
  error.value = false;

  try {
    const slice = list.slice(0, MAX_FEEDBACK_COUNT);

    const details = await Promise.all(
      slice.map((item) =>
        $fetch(`/resumes/${item.slug}`, { baseURL: config.public.apiBase }).catch(() => null)
      )
    );

    customers.value = details
      .map((res) => res?.data)
      .filter((resume) => resume && resume.review)
      .map((resume) => ({
        id: resume.id,
        name: resume.review.name,
        role: resume.review.position,
        comment: resume.review.description,
        image: resume.review.avatar || '/images/customer.jpg'
      }));

    await nextTick();
    updateCardWidth();

    // اگه سکشن همین الان دیده میشه، اتوپلی رو استارت کن
    if (isSectionVisible.value) startAutoplay();
  } catch (err) {
    error.value = true;
    console.error('خطا در دریافت نظرات مشتریان:', err);
  } finally {
    loading.value = false;
  }
};

watch(
  listPending,
  (isPending) => {
    if (isPending) return;

    if (listError.value) {
      error.value = true;
      loading.value = false;
      return;
    }

    buildFeedbacks(resumeItems.value);
  },
  { immediate: true }
);

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', updateIndex);
  window.addEventListener('resize', updateCardWidth);

  // اتوپلی وقتی که کاربر با اسکرول به این بخش رسید شروع میشه و وقتی از دیدش خارج شد متوقف میشه
  if (typeof IntersectionObserver !== 'undefined' && sectionRef.value) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isSectionVisible.value = entry.isIntersecting;
          if (entry.isIntersecting) {
            startAutoplay();
          } else {
            stopAutoplay();
            if (resumeTimeout) clearTimeout(resumeTimeout);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionObserver.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', updateIndex);
  window.removeEventListener('resize', updateCardWidth);
  sectionObserver?.disconnect();
  stopAutoplay();
  if (resumeTimeout) clearTimeout(resumeTimeout);
});
</script>
<style scoped>
.comment-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>