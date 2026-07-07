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

  size?: "xs" | "sm" | "md" | "lg";

  loading?: boolean;

  disabled?: boolean;

  block?: boolean;

  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  loading: false,
  disabled: false,
  block: false,
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
    xs: "px-2 py-1 text-xs",

    sm: "px-3 py-2 text-sm",

    md: "px-4 py-2.5 text-sm",

    lg: "px-6 py-3 text-base",
  };

  return [
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[props.variant],
    sizes[props.size],
    props.rounded ? "rounded-xl" : "rounded-md",
    props.block ? "w-full" : "",
  ];
});
</script>

<template>
  <button :disabled="loading || disabled" :class="classes">
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />

    <template v-else-if="$slots.leftIcon">
      <slot name="leftIcon" />
    </template>

    <slot />

    <slot name="rightIcon" />
  </button>
</template>
