<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;

  // Nanti jika color-mode sudah aktif tinggal ganti menjadi:
  const colorMode = useColorMode();
  colorMode.preference = isDark.value ? "dark" : "light";
};
</script>

<template>
  <header
    class="h-16 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between px-5 transition-colors duration-300"
  >
    <!-- Title -->
    <div class="font-semibold text-gray-800 dark:text-white hidden md:block">
      Dashboard
    </div>

    <!-- Right -->
    <div class="flex items-center gap-3">
      <!-- Theme Toggle -->
      <UButton
        color="neutral"
        variant="ghost"
        square
        class="rounded-full hover:rotate-180 transition-all duration-500"
        @click="toggleTheme"
      >
        <Sun v-if="isDark" class="w-5 h-5 text-yellow-500" />

        <Moon v-else class="w-5 h-5 text-slate-700" />
      </UButton>

      <!-- Profile -->
      <ProfileDropdown />
    </div>
  </header>
</template>
