<script setup lang="ts">
import { computed } from "vue";
import { Calendar, CircleAlert } from "lucide-vue-next";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue?: string | null;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Pilih tanggal",
  disabled: false,
  readonly: false,
  required: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value ?? ""),
});
</script>

<template>
  <div class="space-y-2">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-semibold text-gray-700">
      {{ label }}

      <span v-if="required" class="text-red-500"> * </span>
    </label>

    <!-- Input -->
    <div class="relative">
      <Calendar
        :size="18"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        v-model="value"
        v-bind="$attrs"
        type="date"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        class="w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 outline-none transition-all"
        :class="[
          error
            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
          disabled ? 'cursor-not-allowed bg-gray-100' : '',
          readonly ? 'bg-gray-50' : '',
        ]"
      />
    </div>

    <!-- Hint -->
    <p v-if="hint && !error" class="text-xs text-gray-500">
      {{ hint }}
    </p>

    <!-- Error -->
    <div v-if="error" class="flex items-center gap-1 text-xs text-red-500">
      <CircleAlert :size="14" />
      {{ error }}
    </div>
  </div>
</template>
