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
    <label v-if="label" class="block text-sm font-semibold text-gray-700">
      {{ label }}

      <span v-if="required" class="text-red-500"> * </span>
    </label>

    <div class="relative">
      <slot name="prefix" />

      <input
        v-model="value"
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="w-full rounded-xl border bg-white px-4 py-2.5 outline-none transition-all duration-200"
        :class="[
          error
            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
          disabled ? 'bg-gray-100 cursor-not-allowed' : '',
          readonly ? 'bg-gray-50' : '',
        ]"
      />

      <slot name="suffix" />
    </div>

    <p v-if="hint && !error" class="text-xs text-gray-500">
      {{ hint }}
    </p>

    <div v-if="error" class="flex items-center gap-1 text-red-500 text-xs">
      <CircleAlert :size="14" />
      {{ error }}
    </div>
  </div>
</template>
