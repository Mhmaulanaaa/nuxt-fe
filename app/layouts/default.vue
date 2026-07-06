<script setup lang="ts">
const { isCollapsed } = useSidebar();
</script>

<template>
  <div class="flex bg-gray-100 min-h-screen">
    <AppSidebar />

    <div
      class="flex-1 transition-all duration-300"
      :class="isCollapsed ? 'lg:ml-20' : 'lg:ml-64'"
    >
      <AppNavbar />

      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
