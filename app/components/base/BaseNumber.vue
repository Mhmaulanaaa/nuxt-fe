<script setup lang="ts">
import { computed } from "vue";
import { CircleAlert } from "lucide-vue-next";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue?: number | null;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  step: 1,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (val: string | number | null) => {
    if (val === "" || val === null) {
      emit("update:modelValue", null);
      return;
    }

    emit("update:modelValue", Number(val));
  },
});
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="text-sm font-semibold text-gray-700">
      {{ label }}

      <span v-if="required" class="text-red-500"> * </span>
    </label>

    <input
      v-model="value"
      v-bind="$attrs"
      type="number"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      class="w-full rounded-xl border px-4 py-2.5 outline-none transition"
      :class="[
        error
          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
          : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
      ]"
    />

    <p v-if="hint && !error" class="text-xs text-gray-500">
      {{ hint }}
    </p>

    <div v-if="error" class="flex items-center gap-1 text-xs text-red-500">
      <CircleAlert :size="14" />
      {{ error }}
    </div>
  </div>
</template>
