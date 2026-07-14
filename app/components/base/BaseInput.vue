<script setup lang="ts">
import { computed } from "vue";
import { CircleAlert } from "lucide-vue-next";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  placeholder: "",
  disabled: false,
  readonly: false,
  required: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="space-y-2">
    <!-- Label -->
    <label
      v-if="label"
      class="block text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors"
    >
      {{ label }}

      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Input -->
    <div class="relative">
      <slot name="prefix" />

      <input
        v-model="value"
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all duration-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        :class="[
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/15'
            : 'border-gray-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15',

          disabled
            ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed'
            : '',

          readonly ? 'bg-gray-50 dark:bg-slate-800' : '',
        ]"
      />

      <slot name="suffix" />
    </div>

    <!-- Hint -->
    <p
      v-if="hint && !error"
      class="text-xs text-slate-500 dark:text-slate-400 transition-colors"
    >
      {{ hint }}
    </p>

    <!-- Error -->
    <div v-if="error" class="flex items-center gap-1.5 text-xs text-red-500">
      <CircleAlert :size="14" />

      <span>{{ error }}</span>
    </div>
  </div>
</template>
