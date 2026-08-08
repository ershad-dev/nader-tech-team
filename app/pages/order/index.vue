<template>
    <OrderLandingSiteOrder/>
    <OrderLandingContentOrder/>
    <OrderLandingServiceSection/>
</template>

<script setup> 
const footerConfig = useState('footerConfig');
footerConfig.value = {
  title1: 'اگر فقط اجرا نمیخواهی ،<br> اگر <span class="text-[#ECD0A0]">مسیر</span>،     میخواهی ، اینجا شروعش است',
  titleMargin: '-m-[100px]'
};

const scrollbarConfig = useScrollbarConfig();
scrollbarConfig.value = {
  light: '#67A9A8',
  dark: '#67A9A8'
};
</script>