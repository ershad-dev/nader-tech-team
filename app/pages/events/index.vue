<template>
  <div class="min-h-screen bg-[#F5F3EF] dark:bg-dark-bg">


    <main>
      <!-- بخش Hero (تصویر تمام عرض با افکت شیشه‌ای و هلال) -->
      <EventsLandingEventHero />
        <EventsLandingEventServices />
        <EventsLandingLotterySection />
        
        <!-- <EventsLandingEventFeedback /> -->



    </main>


  </div>
</template>

<script setup>
// استفاده از layout اختصاصی اگر لازم است
definePageMeta({
  layout: 'default' // یا هر لایوتی که برای سایت اصلی دارید
})

  const footerConfig = useState('footerConfig');
footerConfig.value = {
  title: ' شروع یک تجربه متفاوت ',
  bgColor: 'bg-purple-800'
};

const scrollbarConfig = useScrollbarConfig();
scrollbarConfig.value = {
  light: '#747893',
  dark: '#747893'
};
</script>