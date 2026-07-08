<script setup lang="ts">
const { isCollapsed } = useSidebar();
</script>

<template>
  <div
    class="flex min-h-screen bg-gray-100 text-gray-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
  >
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Content -->
    <div
      class="flex-1 transition-all duration-300"
      :class="isCollapsed ? 'lg:ml-20' : 'lg:ml-64'"
    >
      <!-- Navbar -->
      <AppNavbar />

      <!-- Page -->
      <main
        class="min-h-[calc(100vh-64px)] bg-gray-100 p-6 transition-colors duration-300 dark:bg-slate-950"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
