<script setup>
const route = useRoute();
const { resume: project, pending, error } = useResume(route.params.slug);

// آرایه‌ی عکس‌ها رو می‌گیریم و اگه کمتر از ۳ تا بود (خیلی وقتا فقط یه cover هست)
// با چرخش همون عکس‌ها پرش می‌کنیم تا چیدمان پله‌ای سه‌تایی خراب نشه.
const galleryImages = computed(() => {
  const imgs = resumeImages(project.value);
  if (imgs.length === 0) return [];
  return [imgs[0 % imgs.length], imgs[1 % imgs.length], imgs[2 % imgs.length]];
});

const hasReview = computed(() => !!project.value?.review?.description);

// --- مودال نمایش عکس ---
const isModalOpen = ref(false);
const activeImage = ref(null);

function openImageModal(src) {
  activeImage.value = src;
  isModalOpen.value = true;
}

function closeImageModal() {
  isModalOpen.value = false;
  activeImage.value = null;
}

// وقتی مودال بازه، اسکرول صفحه پشت رو قفل می‌کنیم
watch(isModalOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : '';
  }
});

// بستن مودال با کلید Esc
function handleKeydown(e) {
  if (e.key === 'Escape') closeImageModal();
}
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (import.meta.client) document.body.style.overflow = '';
});
</script>

<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center text-[#747893] dark:text-dark-text">
    در حال بارگذاری...
  </div>

  <div v-else-if="error || !project" class="min-h-screen flex items-center justify-center text-red-500 dark:text-red-400">
    پروژه مورد نظر یافت نشد
  </div>

  <div v-else class="min-h-screen p-5 sm:p-8 lg:p-10 bg-[#BFD1D5] dark:bg-dark-bg -mt-[80px] lg:-mt-[100px] overflow-hidden">
    <div class="text-center mt-[120px] lg:mt-[120px] flex flex-wrap justify-center items-center gap-1 sm:gap-2 px-2">
      <h2 class="text-lg sm:text-2xl lg:text-3xl font-bold text-[#2C7379] dark:text-dark-highlight flex flex-wrap items-baseline justify-center">
        <span class="rotate-12 origin-bottom translate-y-2 lg:translate-y-3 inline-block">آینده</span>
        <span class="rotate-6 origin-bottom translate-y-1 inline-block">برند</span>
        <span class="rotate-3 origin-bottom inline-block">شما</span>
        <span class="text-[#D4A373] dark:text-dark-gold rotate-0 inline-block mx-1 lg:mx-2">همینجا</span>
        <span class="-rotate-3 origin-bottom inline-block">آغاز</span>
        <span class="-rotate-6 origin-bottom translate-y-1 inline-block">می‌شود</span>
      </h2>
    </div>

    <!-- بخش بالایی: تصاویر پله‌ای -->
    <div class="relative w-full py-10 lg:py-20 mt-[50px]">
      <div
  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[654px] lg:h-[654px] rounded-full z-0 -mt-[60px] lg:-mt-[100px]
  bg-gradient-to-b from-[#2C7379] via-[#2C7379]/80 via-[#B2B4C2] to-[#BFD1D5]
  dark:bg-gradient-to-b dark:from-[#BFD1D5] dark:via-[#B2B4C2] dark:via-[#2C7379]/80 dark:to-[#2C7379]"
></div>
      <div class="hidden sm:block absolute top-10 left-10 w-16 h-16 lg:w-24 lg:h-24 bg-teal-700 rounded-full opacity-80 dark:bg-[#ADE9EA]"></div>
      <div class="hidden sm:block absolute bottom-20 right-20 w-10 h-10 lg:w-16 lg:h-16 bg-teal-700 rounded-full opacity-80 dark:bg-[#ADE9EA]"></div>
      <div class="absolute top-0 right-0 w-[40%] h-full bg-[#a8c1c3]/20 rounded-l-full -z-20"></div>

      <div v-if="galleryImages.length" class="flex justify-center items-center gap-3 sm:gap-6 lg:gap-14 mb-10 lg:mb-16 px-4 mt-[20px] lg:mt-[30px] z-10">
        <div
          class="w-[80px] h-[180px] sm:w-[180px] sm:h-[380px] lg:w-[321px] lg:h-[640px] rounded-[14px] lg:rounded-[25px] overflow-hidden -mt-16 sm:-mt-28 lg:-mt-40 shadow-xl z-20 cursor-pointer"
          @click="openImageModal(galleryImages[0])"
        >
          <img :src="galleryImages[0]" class="w-full h-full object-cover" :alt="project.title" />
        </div>
        <div
          class="w-[95px] h-[220px] sm:w-[210px] sm:h-[440px] lg:w-[321px] lg:h-[640px] shadow-2xl rounded-[14px] lg:rounded-[25px] overflow-hidden z-20 cursor-pointer"
          @click="openImageModal(galleryImages[1])"
        >
          <img :src="galleryImages[1]" class="w-full h-full object-cover" :alt="project.title" />
        </div>
        <div
          class="w-[80px] h-[180px] sm:w-[180px] sm:h-[380px] lg:w-[321px] lg:h-[640px] shadow-2xl rounded-[14px] lg:rounded-[25px] overflow-hidden mt-16 sm:mt-28 lg:mt-40 z-20 cursor-pointer"
          @click="openImageModal(galleryImages[2])"
        >
          <img :src="galleryImages[2]" class="w-full h-full object-cover" :alt="project.title" />
        </div>
      </div>
    </div>

    <!-- متن توضیحات پروژه -->
    <div class="mb-8 lg:mb-10">
      <h2 class="text-teal-800 dark:text-dark-highlight text-[19px] sm:text-[22px] lg:text-[26px] font-bold mb-2">{{ project.title }}</h2>
      <p class="text-[13px] lg:text-[14px] text-[#0F184B] dark:text-dark-text leading-[28px] sm:leading-[36px] lg:leading-[45px] font-roboto mt-[24px] lg:mt-[40px]">
        {{ project.description }}
      </p>
    </div>

    <!-- <div class="w-full sm:w-3/4 mx-auto mb-8 lg:mb-10 h-[1.5px] bg-gradient-to-r from-white/75 dark:from-dark-highlight/20 to-gray-400 dark:to-dark-border"></div> -->

    <!-- بخش نظر مشتری - فقط وقتی review.description وجود داره نمایش داده می‌شه -->
    <!-- <div v-if="hasReview" class="mt-10 lg:mt-16 max-w-[900px] mx-auto -mb-[100px] lg:-mb-[200px]">
      <h3 class="text-[#2C7379] dark:text-dark-highlight font-bold text-[22px] sm:text-[26px] lg:text-[32px] mb-6 lg:mb-8 flex flex-col items-center">اعتماد مشتریان</h3>
      <div class="w-full shadow-sm">
        <div class="flex items-center gap-3 lg:gap-4 mb-6 flex-wrap">
          <img
            :src="project.review.avatar || '/images/avater-man.jpg'"
            alt="Customer"
            class="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[131px] lg:h-[131px] rounded-[14px] lg:rounded-[17px] border-4 border-white dark:border-dark-border shadow-md object-cover cursor-pointer"
            @click="openImageModal(project.review.avatar || '/images/avater-man.jpg')"
          />
          <div class="text-right mr-[6px] lg:mr-[10px]">
            <p class="text-[#747893] dark:text-dark-text text-[13px] lg:text-[14px] font-medium">{{ project.review.name }}</p>
            <p v-if="project.review.position" class="text-[12px] lg:text-[13px] text-[#747893] dark:text-dark-text font-roboto font-medium mt-[10px] lg:mt-[25px]">{{ project.review.position }}</p>
          </div>
        </div>

<div class="mb-[100px] lg:mb-[300px] w-full bg-white/50 dark:bg-[#00000040] p-5 lg:p-6 border border-white dark:border-dark-border rounded-tl-[30px] lg:rounded-tl-[60px] rounded-br-[30px] lg:rounded-br-[60px] rounded-bl-[30px] lg:rounded-bl-[60px]">
  <h4 class="text-[#0F184B] dark:text-white font-robot font-bold mb-3 text-[14px] lg:text-[16px] mt-[10px] lg:mt-[20px]">
    تجربه همکاری از زبان مشتری
  </h4>

  <p class="text-[#616474] dark:text-white leading-[26px] sm:leading-[32px] lg:leading-[40px] text-[13px] lg:text-[14px] font-noto-regular">
    "{{ project.review.description }}"
  </p>
</div>
      </div>
    </div> -->

    <!-- مودال نمایش عکس تمام‌صفحه -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          @click.self="closeImageModal"
        >
          <!-- دکمه بستن -->
          <button
            @click="closeImageModal"
            class="absolute top-4 left-4 sm:top-6 sm:left-6 z-[10000] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl transition-colors"
            aria-label="بستن"
          >
            &times;
          </button>

          <!-- کانتینر عکس با قابلیت اسکرول عمودی برای عکس‌های بزرگ -->
          <div
            class="w-full max-w-[95vw] sm:max-w-[85vw] lg:max-w-[75vw] max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-lg"
            @click.self="closeImageModal"
          >
            <img
              :src="activeImage"
              class="block w-full h-auto mx-auto rounded-lg"
              alt="نمایش کامل تصویر"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>