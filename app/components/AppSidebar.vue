<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  LayoutDashboard,
  Users,
  Settings,
  MapPinned,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-vue-next";

const route = useRoute();

const { isSidebarOpen, isCollapsed, toggleCollapse } = useSidebar();

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    title: "Poli",
    icon: Building2,
    to: "/poli",
  },
  {
    title: "Users",
    icon: Users,
    to: "/users",
  },
  {
    title: "Provinsi",
    icon: MapPinned,
    to: "/provinsi",
  },
  {
    title: "Gedung",
    icon: Building2,
    to: "/gedung",
  },
  {
    title: "Settings",
    icon: Settings,
    to: "/settings",
  },
];
</script>

<template>
  <!-- Overlay Mobile -->
  <Transition name="fade">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/40 lg:hidden z-40"
      @click="isSidebarOpen = false"
    />
  </Transition>

  <aside
    class="fixed left-0 top-0 h-screen bg-white border-r shadow-lg transition-all duration-300 z-20"
    :class="[
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',

      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Logo -->

    <div class="h-16 border-b flex items-center justify-between px-4">
      <div class="font-bold text-indigo-600 text-xl whitespace-nowrap">
        <span v-if="!isCollapsed"> Line Project </span>

        <span v-else> LP </span>
      </div>

      <button
        class="hidden lg:flex rounded-lg hover:bg-gray-100 p-2"
        @click="toggleCollapse"
      >
        <ChevronLeft v-if="!isCollapsed" :size="18" />

        <ChevronRight v-else :size="18" />
      </button>
    </div>

    <!-- Menu -->

    <nav class="px-3 py-5 space-y-2">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.title"
        :to="menu.to"
        class="flex items-center rounded-xl transition-all duration-200 px-3 py-3"
        :class="[
          route.path === menu.to
            ? 'bg-indigo-600 text-white shadow'
            : 'hover:bg-gray-100 text-gray-700',

          isCollapsed ? 'justify-center' : '',
        ]"
      >
        <component :is="menu.icon" :size="20" />

        <span v-if="!isCollapsed" class="ml-3 font-medium">
          {{ menu.title }}
        </span>
      </NuxtLink>
    </nav>

    <!-- Footer -->

    <div class="absolute bottom-0 left-0 right-0 border-t p-4">
      <button
        class="w-full flex items-center rounded-lg hover:bg-red-50 text-red-600 transition p-3"
        :class="isCollapsed ? 'justify-center' : ''"
      >
        <LogOut :size="20" />

        <span v-if="!isCollapsed" class="ml-3"> Logout </span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
