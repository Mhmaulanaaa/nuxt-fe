<script setup lang="ts">
import { computed } from "vue";
import { Loader2 } from "lucide-vue-next";

interface Props {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "outline"
    | "ghost";

  size?: "sm" | "md" | "lg";

  loading?: boolean;

  disabled?: boolean;

  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  loading: false,
  disabled: false,
  rounded: true,
});

const classes = computed(() => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",

    secondary: "bg-gray-600 text-white hover:bg-gray-700",

    success: "bg-green-600 text-white hover:bg-green-700",

    danger: "bg-red-600 text-white hover:bg-red-700",

    warning: "bg-yellow-500 text-white hover:bg-yellow-600",

    outline: "border border-gray-300 bg-white hover:bg-gray-100 text-gray-700",

    ghost: "hover:bg-gray-100 text-gray-700",
  };

  const sizes = {
    sm: "w-8 h-8",

    md: "w-10 h-10",

    lg: "w-12 h-12",
  };

  return [
    "inline-flex items-center justify-center transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[props.variant],
    sizes[props.size],
    props.rounded ? "rounded-xl" : "rounded-full",
  ];
});
</script>

<template>
  <button :disabled="loading || disabled" :class="classes">
    <Loader2 v-if="loading" class="animate-spin" :size="18" />

    <slot v-else />
  </button>
</template>
