<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const update = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>

<template>
  <label class="inline-flex items-center gap-3 cursor-pointer select-none">
    <input
      v-bind="$attrs"
      type="checkbox"
      class="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      :checked="modelValue"
      :disabled="disabled"
      @change="update"
    />

    <span class="text-sm text-gray-700">
      {{ label }}
    </span>
  </label>
</template>
