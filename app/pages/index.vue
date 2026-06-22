<template>
  <div class="bg-[#F8F5F0] min-h-screen">
    <Navbar />

    <HomeHeroSection />

    <HomeLeadMembers />

    <HomeProjectShowcase />

  
    <HomeFeedback/>


  
  </div>
</template>

<script setup>
  const footerConfig = useState('footerConfig');
footerConfig.value = {
  title: ' شروع یک تجربه متفاوت ',
  bgColor: 'bg-purple-800'
};
</script>



