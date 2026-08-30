<template>
  <div>
    <Navbar />
    <HomeHeroSection />
    <HomeLeadMembers />
    <HomeProjectShowcase />
    <!-- <HomeFeedback /> -->
  </div>
</template>

<script setup>
const { t } = useI18n();

useHead({
  title: computed(() => t('home.pageTitle'))
});

const footerConfig = useState('footerConfig');
footerConfig.value = {
  title: t('home.footerTitle'),
  bgColor: 'bg-purple-800'
};

const scrollbarConfig = useScrollbarConfig();
scrollbarConfig.value = {
  light: '#0F184B',
  dark: '#0F184B'
};
</script>