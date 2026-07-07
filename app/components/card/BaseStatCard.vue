<script setup lang="ts">
interface Props {
  title: string;
  value: string | number;
  description?: string;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  color: "blue",
});
</script>

<template>
  <div
    class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-slate-400">
          {{ title }}
        </p>

        <h2 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {{ value }}
        </h2>

        <p v-if="description" class="mt-2 text-sm text-gray-500 dark:text-slate-400">
          {{ description }}
        </p>
      </div>

      <div
        :class="[
          'flex h-14 w-14 items-center justify-center rounded-xl',
          `bg-${color}-100`,
          `text-${color}-600`,
        ]"
      >
        <slot name="icon" />
      </div>
    </div>
  </div>
</template>
