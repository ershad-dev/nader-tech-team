<template>
    <OrderLandingSiteOrder/>
    <OrderLandingContentOrder/>
    <OrderLandingServiceSection/>
</template>

<script setup>
    const { t } = useI18n();

useHead({
  title: computed(() => t('order.pageTitle'))
});
</script>