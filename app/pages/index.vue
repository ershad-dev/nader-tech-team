<template>
  <div>
    <Navbar />
    <HomeHeroSection />
    <HomeLeadMembers />
    <HomeProjectShowcase />
    <HomeFeedback />
  </div>
</template>

<script setup>
const footerConfig = useState('footerConfig');
footerConfig.value = {
  title: 'شروع یک تجربه متفاوت',
  bgColor: 'bg-purple-800'
};

const scrollbarConfig = useScrollbarConfig();
scrollbarConfig.value = {
  light: '#0F184B',
  dark: '#0F184B'
};
</script>