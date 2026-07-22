<template>
  <section class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto py-12 lg:py-20 min-[1920px]:py-24 px-4 -mt-[110px]" dir="rtl">
     
     <div class="mb-8 lg:mb-12">
       <h2 class="text-xl sm:text-2xl lg:text-3xl min-[1920px]:text-4xl font-bold text-[#0F184B] dark:text-dark-text mb-4">تجربه همکاری از زبان مشتری </h2>
     </div>
 
     <!-- حالت لودینگ -->
     <div v-if="loading" class="text-center py-10 text-[#0F184B] dark:text-dark-text">در حال بارگذاری نظرات مشتریان...</div>
 
     <!-- حالت خطا -->
     <div v-else-if="error" class="text-center py-10 text-red-500 dark:text-red-400">خطا در دریافت نظرات مشتریان</div>
 
     <div 
       v-else
       ref="scrollContainer" 
       class="flex gap-3 lg:gap-6 min-[1920px]:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8"
       style="scrollbar-width: none; -ms-overflow-style: none;" 
     >
         <div 
           v-for="customer in customers"
           :key="customer.id"
           ref="cardRefs"
           class="min-w-[200px] sm:min-w-[320px] lg:min-w-[390px] min-[1920px]:min-w-[460px] h-[260px] sm:h-[370px] lg:h-[410px] min-[1920px]:h-[470px] border border-slate-300 dark:border-dark-border rounded-[17px] overflow-hidden shadow-xl dark:shadow-none transition-all hover:shadow-xl dark:hover:ring-1 dark:hover:ring-dark-accent snap-center flex flex-col"
           dir="rtl"
         >
         <!-- بخش پروفایل -->
         <div class="bg-[#EDEDED] dark:bg-[#D5E2E53B] px-4 lg:px-8 min-[1920px]:px-10 pt-4 lg:pt-8 min-[1920px]:pt-10 pb-3 lg:pb-6 min-[1920px]:pb-8 shadow-xl dark:shadow-none -mt-[20px] shrink-0">
           <img
             :src="customer.image"
             :alt="customer.name"
             class="w-[120px] h-[100px] sm:w-[210px] sm:h-[180px] lg:w-[246px] lg:h-[210px] min-[1920px]:w-[290px] min-[1920px]:h-[250px] rounded-[14px] mx-auto mb-2 lg:mb-6 min-[1920px]:mb-8 object-cover object-top"
           />
 
           <h3 class="text-[12px] lg:text-[14px] min-[1920px]:text-[16px] font-extrabold text-[#0F184B] dark:text-dark-text mb-1 rokh-bold text-center">
             {{ customer.name }}
           </h3>
 
           <p class="text-[#0F184B] dark:text-dark-text/80 font-roboto font-medium text-[11px] lg:text-[14px] min-[1920px]:text-[15px] text-center">
             {{ customer.role }}
           </p>
         </div>
 
         <!-- بخش نظر - flex-1 یعنی هر فضای باقی‌مونده از کارت رو پر می‌کنه، دیگه نیازی به ارتفاع دستی نیست -->
         <div class="bg-[#EDEDED] dark:bg-[#D5E2E53B] p-4 lg:p-8 min-[1920px]:p-10 relative flex-1 min-h-0">
           <p
             :ref="(el) => setCommentRef(el, customer.id)"
             class="comment-clamp text-[#747893] dark:text-dark-text/80 text-[12px] lg:text-[15px] min-[1920px]:text-[16px] leading-relaxed font-roboto text-right -mt-[20px]"
           >
             {{ customer.comment }}
           </p>
           <button
             v-if="overflowMap[customer.id]"
             type="button"
             @click="openModal(customer)"
             class="absolute bottom-2 left-4 lg:left-8 min-[1920px]:left-10 text-[10px] lg:text-[12px] min-[1920px]:text-[13px] font-bold text-[#2D7A6F] dark:text-dark-highlight hover:underline bg-[#EDEDED] dark:bg-[#D5E2E53B] pr-1"
           >
             ادامه مطلب
           </button>
         </div>
       </div>
     </div>
 
     <div class="flex items-center justify-between mt-4 gap-5">
 
 <div class="hidden sm:flex gap-2">
         <HomeIconsSliderButtonFb 
           direction="left" 
           @click="scroll('right')" 
           class=" hover:text-gray transition" 
         />
         <HomeIconsSliderButtonFb 
           direction="right" 
           @click="scroll('left')" 
           class=" hover:text-gray transition" 
         />
       </div>
       <div class="flex gap-2">
         <div 
           v-for="(item, index) in customers" 
           :key="item.id"
           :class="[
             'h-2 rounded-full transition-all duration-300',
             activeIndex === index ? 'w-8 bg-[#2D7A6F] dark:bg-dark-accent' : 'w-2 bg-slate-300 dark:bg-dark-border'
           ]"
         ></div>
       </div>
     </div>
   </section>
   <!-- مودال نمایش کامل نظر مشتری -->
   <Teleport to="body">
     <div
       v-if="activeCustomer"
       class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
     >
       <div class="absolute inset-0 bg-black/50 dark:bg-black/60" @click="closeModal"></div>
 
       <div
         class="relative bg-white dark:bg-dark-surface w-full max-w-lg rounded-[20px] p-6 lg:p-8 shadow-2xl dark:shadow-none dark:ring-1 dark:ring-dark-border max-h-[85vh] overflow-y-auto"
         dir="rtl"
       >
         <button
           type="button"
           @click="closeModal"
           class="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full text-[#747893] dark:text-dark-text/70 hover:bg-[#EDEDED] dark:hover:bg-dark-input hover:text-[#0F184B] dark:hover:text-dark-text text-lg leading-none transition"
           aria-label="بستن"
         >
           ✕
         </button>
 
         <div class="flex items-center gap-3 lg:gap-4 mb-5">
           <img
             :src="activeCustomer.image"
             :alt="activeCustomer.name"
             class="w-14 h-14 lg:w-16 lg:h-16 rounded-[14px] object-cover"
           />
           <div class="text-right">
             <h4 class="font-extrabold text-[#0F184B] dark:text-dark-text text-[14px] lg:text-[15px]">{{ activeCustomer.name }}</h4>
             <p class="text-[#747893] dark:text-dark-text/70 text-[12px] lg:text-[13px] font-roboto font-medium">{{ activeCustomer.role }}</p>
           </div>
         </div>
 
         <p class="text-[#616474] dark:text-dark-text/90 leading-[28px] lg:leading-[34px] text-[13px] lg:text-[14px] font-roboto text-right whitespace-pre-line">
           {{ activeCustomer.comment }}
         </p>
       </div>
     </div>
   </Teleport>
 </template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';

const scrollContainer = ref(null);
const cardRefs = ref([]);
const activeIndex = ref(0);
const cardWidth = ref(414);

const loading = ref(true);
const error = ref(false);
const customers = ref([]);

const commentEls = new Map();
const overflowMap = ref({});
let resizeObserver;

const setCommentRef = (el, id) => {
  if (el) {
    commentEls.set(id, el);
    resizeObserver?.observe(el);
  } else {
    commentEls.delete(id);
  }
};

const checkOverflow = () => {
  commentEls.forEach((el, id) => {
    overflowMap.value[id] = el.scrollHeight - el.clientHeight > 1;
  });
};

const activeCustomer = ref(null);

const openModal = (customer) => {
  activeCustomer.value = customer;
};

const closeModal = () => {
  activeCustomer.value = null;
};

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeModal();
};

watch(activeCustomer, (val) => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = val ? 'hidden' : '';
});

const config = useRuntimeConfig();

const { items: resumeItems, pending: listPending, error: listError } = useResumes();

const MAX_FEEDBACK_COUNT = 6;

const updateCardWidth = () => {
  if (cardRefs.value && cardRefs.value.length > 0) {
    const firstCard = cardRefs.value[0];
    const gap = window.innerWidth >= 1920 ? 32 : window.innerWidth >= 1024 ? 24 : 16;
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
    activeIndex.value = Math.round(Math.abs(scrollContainer.value.scrollLeft) / cardWidth.value);
  }
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
    checkOverflow();
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
  window.addEventListener('resize', checkOverflow);
  window.addEventListener('keydown', handleKeydown);

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => checkOverflow());
    commentEls.forEach((el) => resizeObserver.observe(el));
  }
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', updateIndex);
  window.removeEventListener('resize', updateCardWidth);
  window.removeEventListener('resize', checkOverflow);
  window.removeEventListener('keydown', handleKeydown);
  resizeObserver?.disconnect();
  if (typeof document !== 'undefined') document.body.style.overflow = '';
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