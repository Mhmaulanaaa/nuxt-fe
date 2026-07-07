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

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="text-sm font-semibold text-gray-700">
      {{ label }}

      <span v-if="required" class="text-red-500"> * </span>
    </label>

    <div class="relative">
      <select
        v-model="value"
        v-bind="$attrs"
        :disabled="disabled"
        class="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      >
        <option disabled value="">
          {{ placeholder ?? "Pilih Data" }}
        </option>

        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <ChevronDown class="absolute right-3 top-3 text-gray-500" :size="18" />
    </div>

    <p v-if="hint && !error" class="text-xs text-gray-500">
      {{ hint }}
    </p>

    <div v-if="error" class="flex items-center gap-1 text-xs text-red-500">
      <CircleAlert :size="14" />
      {{ error }}
    </div>
  </div>
</template>
