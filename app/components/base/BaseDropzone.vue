<script setup lang="ts">
import { Upload, X, Image as ImageIcon, File } from "lucide-vue-next";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue?: File[];
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // MB
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  multiple: false,
  accept: "*",
  maxFiles: 10,
  maxSize: 5,
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", files: File[]): void;
}>();

const inputFile = ref<HTMLInputElement>();

const files = ref<File[]>([...props.modelValue]);

watch(
  () => props.modelValue,
  (val) => {
    files.value = [...val];
  }
);

const previews = computed(() =>
  files.value.map((file) => ({
    file,
    url: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
  }))
);

const openFile = () => {
  if (props.disabled) return;

  inputFile.value?.click();
};

const addFiles = (selected: FileList | null) => {
  if (!selected) return;

  let newFiles = [...files.value];

  Array.from(selected).forEach((file) => {
    if (newFiles.length >= props.maxFiles) return;

    const size = file.size / 1024 / 1024;

    if (size > props.maxSize) {
      alert(`${file.name} melebihi ${props.maxSize} MB`);
      return;
    }

    newFiles.push(file);
  });

  files.value = newFiles;

  emit("update:modelValue", newFiles);
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);

  emit("update:modelValue", files.value);
};

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  addFiles(target.files);

  target.value = "";
};

const dragOver = ref(false);

const onDrop = (e: DragEvent) => {
  dragOver.value = false;

  addFiles(e.dataTransfer?.files ?? null);
};
</script>

<template>
  <div class="space-y-4">
    <div
      class="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all"
      :class="[
        dragOver
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-300 hover:border-indigo-400',
      ]"
      @click="openFile"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="onDrop"
    >
      <Upload class="mx-auto text-indigo-600" :size="40" />

      <p class="mt-3 font-semibold">Drag & Drop File</p>

      <p class="text-sm text-gray-500">atau klik untuk memilih file</p>

      <p class="text-xs text-gray-400 mt-2">
        Maksimal {{ maxFiles }} File ({{ maxSize }} MB)
      </p>

      <input
        ref="inputFile"
        hidden
        type="file"
        :multiple="multiple"
        :accept="accept"
        @change="onChange"
      />
    </div>

    <!-- Preview -->

    <div v-if="files.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(item, index) in previews"
        :key="index"
        class="border rounded-xl p-3 relative"
      >
        <button
          class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          @click.stop="removeFile(index)"
        >
          <X :size="14" />
        </button>

        <img
          v-if="item.url"
          :src="item.url"
          class="rounded-lg w-full h-40 object-cover"
        />

        <div v-else class="flex flex-col items-center justify-center h-40">
          <File :size="45" class="text-gray-500" />

          <span class="text-xs mt-2 break-all">
            {{ item.file.name }}
          </span>
        </div>

        <div class="mt-3">
          <div class="font-medium truncate">
            {{ item.file.name }}
          </div>

          <div class="text-xs text-gray-500">
            {{ (item.file.size / 1024 / 1024).toFixed(2) }} MB
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
