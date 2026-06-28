<script setup>
const menuItems = [
  { name: 'اطلاعات کاربران', path: '/profile', icon: 'UserIcon' },
  { name: 'تغییر عکس بنر', path: '/banner', icon: 'PhotoIcon' },
  { name: 'درخواست کاربران', path: '/requests', icon: 'DocumentTextIcon' },
  // و بقیه موارد...
];
</script>

<template>
  <div class="w-64 bg-teal-700/20 h-screen p-4 flex flex-col gap-2">
    <div class="text-center mb-6">
      <img src="..." class="rounded-full w-20 h-20 mx-auto" />
      <h3 class="mt-2 font-bold">ثمین زارعی</h3>
    </div>

    <NuxtLink 
      v-for="item in menuItems" 
      :key="item.path"
      :to="item.path"
      class="p-3 rounded-lg hover:bg-white/50 transition flex items-center gap-2"
      active-class="bg-white/80 font-bold"
    >
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>