<script setup lang="ts">
import { computed } from "vue";
import { Search, X } from "lucide-vue-next";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Cari data...",
});

const emit = defineEmits(["update:modelValue", "search", "clear"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
    emit("search", val);
  },
});

const clear = () => {
  emit("update:modelValue", "");
  emit("clear");
};
</script>

<template>
  <div class="relative w-full">
    <Search class="absolute left-3 top-3 text-gray-400" :size="18" />

    <input
      v-model="value"
      v-bind="$attrs"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-10 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      @keyup.enter="$emit('search', value)"
    />

    <button v-if="value" type="button" class="absolute right-3 top-3" @click="clear">
      <X :size="18" class="text-gray-400 hover:text-red-500" />
    </button>
  </div>
</template>
