<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  disabled?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

import { toRefs } from "vue";
const { modelValue, disabled, label } = toRefs(props);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const toggle = () => {
  emit("update:modelValue", !modelValue.value);
};
</script>

<template>
  <div class="flex items-center justify-between">
    <span class="text-sm font-medium text-gray-700">
      {{ label }}
    </span>

    <button
      type="button"
      @click="toggle"
      :disabled="disabled"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition"
      :class="modelValue ? 'bg-indigo-600' : 'bg-gray-300'"
    >
      <span
        class="inline-block h-5 w-5 transform rounded-full bg-white transition"
        :class="modelValue ? 'translate-x-5' : 'translate-x-1'"
      />
    </button>
  </div>
</template>
