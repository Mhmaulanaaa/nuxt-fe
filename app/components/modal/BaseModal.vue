<script setup lang="ts">
import { computed } from "vue";
import { X } from "lucide-vue-next";

interface Props {
  modelValue: boolean;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "fullscreen";
  loading?: boolean;
  persistent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  size: "md",
  loading: false,
  persistent: false,
});

const emit = defineEmits(["update:modelValue", "save", "close"]);

const open = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const close = () => {
  if (props.persistent) return;

  open.value = false;

  emit("close");
};

const save = () => {
  emit("save");
};

const modalWidth = computed(() => {
  switch (props.size) {
    case "sm":
      return "max-w-md";

    case "md":
      return "max-w-xl";

    case "lg":
      return "max-w-3xl";

    case "xl":
      return "max-w-5xl";

    case "fullscreen":
      return "w-screen h-screen rounded-none";

    default:
      return "max-w-xl";
  }
});

const onEsc = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    close();
  }
};

onMounted(() => {
  window.addEventListener("keydown", onEsc);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onEsc);
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200"
      leave-active-class="transition duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition duration-200"
          leave-active-class="transition duration-150"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-if="open"
            :class="[
              'bg-white shadow-2xl w-full overflow-hidden flex flex-col',
              modalWidth,
              size !== 'fullscreen' ? 'rounded-2xl' : '',
            ]"
          >
            <!-- Header -->

            <div class="border-b px-6 py-4 flex items-center justify-between">
              <slot name="header">
                <h2 class="text-lg font-semibold">
                  {{ title }}
                </h2>
              </slot>

              <button class="rounded-lg p-2 hover:bg-gray-100" @click="close">
                <X :size="20" />
              </button>
            </div>

            <!-- Body -->

            <div class="p-6 overflow-auto flex-1">
              <slot />
            </div>

            <!-- Footer -->

            <div
              class="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <slot name="footer">
                <!-- Tombol Batal -->
                <button
                  type="button"
                  class="rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  @click="close"
                >
                  Batal
                </button>

                <!-- Tombol Simpan -->
                <button
                  type="button"
                  :disabled="loading"
                  class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                  @click="save"
                >
                  <span v-if="loading">Menyimpan...</span>
                  <span v-else>Simpan</span>
                </button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
