<template>
  <!-- نمایش لیست کارت‌های خدمات -->
  <div 
    v-for="(service, index) in services" 
    :key="index"
    class="bg-white dark:bg-[#435056] rounded-[24px] sm:rounded-[35px] md:rounded-[40px] xl:rounded-[49px] min-[1920px]:rounded-[56px] flex items-center shadow-sm overflow-hidden h-[110px] sm:h-[150px] md:h-[160px] xl:h-[180.11px] min-[1920px]:h-[210px] w-full xl:w-[860px] min-[1920px]:w-[1000px]"
  >
    
    <!-- تصویر سرویس -->
    <div class="w-[35%] sm:w-[30%] md:w-[32%] xl:w-[209px] min-[1920px]:w-[245px] h-full shrink-0 self-stretch">
      <img :src="service.image" :alt="stripHtml(service.title)" class="w-full h-full object-cover rounded-[24px] sm:rounded-[35px] md:rounded-[40px] xl:rounded-[49px] min-[1920px]:rounded-[56px]" />
    </div>

    <!-- عنوان و توضیحات سرویس -->
    <!-- توجه: اینجا از متن خالص (stripHtml) استفاده می‌کنیم نه v-html، چون line-clamp
         با تگ‌های بلاک داخل HTML (مثل <p> که خروجی RichTextEditor است) درست کار نمی‌کند. -->
    <div 
      class="flex-1 flex items-center py-2 sm:py-3 md:py-3 xl:py-0 min-w-0 h-full"
      :class="isRtl 
        ? 'pr-3 sm:pr-4 md:pr-5 xl:pr-[16px] min-[1920px]:pr-[20px]' 
        : 'pl-3 sm:pl-4 md:pl-5 xl:pl-[16px] min-[1920px]:pl-[20px]'"
    >
      <div class="w-full" :class="isRtl ? 'text-right' : 'text-left'">
        <h3 class="text-[13px] sm:text-[18px] md:text-[19px] xl:text-[22px] min-[1920px]:text-[25px] font-bold text-[#606792] dark:text-white mb-1 sm:mb-2 line-clamp-2 leading-tight sm:leading-normal">{{ stripHtml(service.title) }}</h3>
        <p 
          class="text-[10px] sm:text-[13px] md:text-[13px] xl:text-[15px] min-[1920px]:text-[17px] font-roboto text-[#606792] dark:text-white leading-[15px] sm:leading-relaxed md:leading-relaxed mt-1 sm:mt-2 md:mt-2 xl:mt-[12px] min-[1920px]:mt-[16px] line-clamp-3"
          :class="isRtl 
            ? 'pl-6 sm:pl-8 md:pl-10 xl:pl-[28px] min-[1920px]:pl-[36px]' 
            : 'pr-6 sm:pr-8 md:pr-10 xl:pr-[28px] min-[1920px]:pr-[36px]'"
        >{{ stripHtml(service.description) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { localeProperties } = useI18n();
const isRtl = computed(() => localeProperties.value.dir === 'rtl');

defineProps({
  services: {
    type: Array,
    default: () => []
  }
})

// حذف تگ‌های HTML برای نمایش متن خالص در کارت‌های line-clamp شده
// (خروجی فیلدهای متنی/HTML از RichTextEditor پنل ادمین می‌آید و همیشه شامل تگ‌هایی مثل <p> است)
function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}
</script>

<style scoped>
/* استایل‌های محتوای HTML که از RichTextEditor پنل ادمین می‌آید،
   هماهنگ با استایل خودِ ادیتور تا آنچه ادمین می‌نویسد همان‌طور نمایش داده شود */
.tiptap-render :deep(p) {
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
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