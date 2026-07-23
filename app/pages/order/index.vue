<template>
    <OrderLandingSiteOrder/>
    <OrderLandingContentOrder/>
    <OrderLandingServiceSection/>
</template>

<script setup> 
const footerConfig = useState('footerConfig');
footerConfig.value = {
  title1: 'اگر فقط اجرا نمیخواهی ،<br> اگر <span class="text-[#ECD0A0]">مسیر</span>،     میخواهی ، اینجا شروعش است',
  titleMargin: '-m-[100px]'
};
</script>