<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    description?: string;
    variant?:
      | "blue"
      | "green"
      | "red"
      | "yellow"
      | "purple"
      | "primary"
      | "success"
      | "warning"
      | "danger";
  }>(),
  {
    variant: "blue",
  }
);

const colors = computed(() => {
  switch (props.variant) {
    case "green":
    case "success":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "red":
    case "danger":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    case "yellow":
    case "warning":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "purple":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    default:
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
  }
});

const cardClass = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-blue-600 text-white border-blue-600";

    case "success":
      return "bg-green-600 text-white border-green-600";

    case "warning":
      return "bg-yellow-500 text-white border-yellow-500";

    case "danger":
      return "bg-red-600 text-white border-red-600";

    default:
      return "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700";
  }
});
</script>

<template>
  <div
    :class="['rounded-2xl border p-6 shadow-sm transition-all duration-300', cardClass]"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-slate-400">
          {{ title }}
        </p>

        <div class="mt-2 text-3xl font-bold dark:text-white">
          {{ value }}
        </div>

        <div v-if="description" class="mt-2 text-sm text-gray-500 dark:text-slate-400">
          {{ description }}
        </div>
      </div>

      <div class="flex h-14 w-14 items-center justify-center rounded-xl" :class="colors">
        <slot name="icon" />
      </div>
    </div>
  </div>
</template>
