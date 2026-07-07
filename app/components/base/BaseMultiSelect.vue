<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronDown, Check, X } from "lucide-vue-next";

interface Option {
  label: string;
  value: any;
}

interface Props {
  modelValue: any[];
  label?: string;
  options: Option[];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  placeholder: "Pilih Data",
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);

const selected = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const toggle = (value: any) => {
  let arr = [...selected.value];

  if (arr.includes(value)) arr = arr.filter((i) => i !== value);
  else arr.push(value);

  selected.value = arr;
};

const remove = (value: any) => {
  selected.value = selected.value.filter((i) => i !== value);
};

const getLabel = (value: any) => {
  return props.options.find((i) => i.value === value)?.label;
};
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="font-medium text-sm">
      {{ label }}
    </label>

    <div class="border rounded-xl p-3 cursor-pointer bg-white" @click="open = !open">
      <div v-if="selected.length" class="flex flex-wrap gap-2">
        <div
          v-for="item in selected"
          :key="item"
          class="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-sm flex items-center gap-2"
        >
          {{ getLabel(item) }}

          <X :size="14" @click.stop="remove(item)" />
        </div>
      </div>

      <div v-else class="text-gray-400">
        {{ placeholder }}
      </div>
    </div>

    <div
      v-if="open"
      class="border rounded-xl mt-2 bg-white shadow max-h-60 overflow-auto"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
        @click="toggle(option.value)"
      >
        {{ option.label }}

        <Check
          v-if="selected.includes(option.value)"
          :size="18"
          class="text-indigo-600"
        />
      </div>
    </div>
  </div>
</template>
