<script setup lang="ts">
import { computed } from "vue";
import { ChevronDown, CircleAlert } from "lucide-vue-next";

defineOptions({
  inheritAttrs: false,
});

interface Option {
  label: string;
  value: any;
}

interface Props {
  modelValue?: any;
  label?: string;
  placeholder?: string;
  options: Option[];
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Pilih Data",
  modelValue: "",
  error: "",
  hint: "",
  required: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
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
      class="block text-sm font-semibold text-gray-700 dark:text-gray-200"
    >
      {{ label }}

      <span v-if="required" class="ml-1 text-red-500"> * </span>
    </label>

    <!-- Select -->
    <div class="relative">
      <select
        v-model="value"
        v-bind="$attrs"
        :disabled="disabled"
        :class="[
          'peer h-11 w-full appearance-none rounded-lg border bg-white px-4 pr-10 text-sm text-gray-700 transition-all duration-200 outline-none',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
            : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100',
          disabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : '',
          'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20',
        ]"
      >
        <option
          v-if="value === null || value === '' || value === undefined"
          disabled
          :value="null"
        >
          {{ placeholder }}
        </option>

        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Icon -->
      <ChevronDown
        :size="18"
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 peer-focus:rotate-180 dark:text-slate-400"
      />
    </div>

    <!-- Hint -->
    <p v-if="hint && !error" class="text-xs text-gray-500 dark:text-slate-400">
      {{ hint }}
    </p>

    <!-- Error -->
    <div v-if="error" class="flex items-center gap-1 text-xs text-red-500">
      <CircleAlert :size="14" />

      <span>{{ error }}</span>
    </div>
  </div>
</template>
