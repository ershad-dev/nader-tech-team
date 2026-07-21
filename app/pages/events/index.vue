<template>
  <div class="min-h-screen bg-[#F5F3EF] dark:bg-dark-bg">
    <!-- Navbar قبلاً ساخته شده است -->
    <Navbar />

    <main>
      <!-- بخش Hero (تصویر تمام عرض با افکت شیشه‌ای و هلال) -->
      <EventsLandingEventHero />
        <EventsLandingEventServices />
        <EventsLandingLotterySection />
        
        <EventsLandingEventFeedback />


      <!-- بخش‌های دیگر لندینگ -->
      <!-- <div class="container mx-auto px-4 py-12 space-y-16">
        <EventsLandingEventInfo />
        <EventsLandingEventServices />
        <EventsLandingRaffleCta />
        <EventsLandingEventGallery />
      </div> -->
    </main>

    <!-- Footer قبلاً ساخته شده است -->
    <Footer />
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
</script>