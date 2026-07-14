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
  Hospital,
  Pill,
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
    icon: Hospital,
    to: "/poli",
  },
  {
    title: "Obat",
    icon: Pill,
    to: "/obat",
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
      class="fixed inset-0 z-40 bg-black/40 lg:hidden"
      @click="isSidebarOpen = false"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    class="fixed left-0 top-0 z-20 h-screen border-r bg-white shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-900"
    :class="[
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Logo -->
    <div
      class="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-slate-700"
    >
      <div
        class="whitespace-nowrap text-xl font-bold text-indigo-600 dark:text-indigo-400"
      >
        <span v-if="!isCollapsed">Line Project</span>
        <span v-else>LP</span>
      </div>

      <button
        class="hidden rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white lg:flex"
        @click="toggleCollapse"
      >
        <ChevronLeft v-if="!isCollapsed" :size="18" />
        <ChevronRight v-else :size="18" />
      </button>
    </div>

    <!-- Menu -->
    <nav class="space-y-2 px-3 py-5">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.title"
        :to="menu.to"
        class="flex items-center rounded-xl px-3 py-3 transition-all duration-200"
        :class="[
          route.path === menu.to
            ? 'bg-indigo-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
          isCollapsed ? 'justify-center' : '',
        ]"
      >
        <component :is="menu.icon" :size="20" />

        <span v-if="!isCollapsed" class="ml-3 truncate font-medium">
          {{ menu.title }}
        </span>
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div
      class="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4 dark:border-slate-700"
    >
      <button
        class="flex w-full items-center rounded-xl p-3 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
        :class="isCollapsed ? 'justify-center' : ''"
      >
        <LogOut :size="20" />

        <span v-if="!isCollapsed" class="ml-3 font-medium"> Logout </span>
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
