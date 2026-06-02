<!-- pages/events/index.vue -->
<template>
  <div class="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 md:p-10 dir-rtl">
    <!-- ۱. تایمر معکوس -->
    <EventsEventTimer />

    <!-- ۲. شبیه‌ساز اعلام برندگان لایو -->
    <EventsLiveWinner />

    <!-- ۳. لیست کارت‌های بلیت کاربر -->
    <EventsTicketCard />
  </div>
</template>