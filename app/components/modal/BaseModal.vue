<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
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
      enter-active-class="transition duration-300 ease-out"
      leave-active-class="transition duration-200 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm p-4 transition-colors duration-300"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="open"
            :class="[
              'w-full overflow-hidden flex flex-col shadow-2xl border transition-all duration-300',
              'bg-white dark:bg-slate-900',
              'border-gray-200 dark:border-slate-700',
              'text-slate-900 dark:text-slate-100',
              modalWidth,
              size !== 'fullscreen' ? 'rounded-2xl' : '',
            ]"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300"
            >
              <slot name="header">
                <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
                  {{ title }}
                </h2>
              </slot>

              <button
                class="rounded-xl p-2 text-slate-500 hover:bg-gray-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all"
                @click="close"
              >
                <X :size="20" />
              </button>
            </div>

            <!-- Body -->
            <div
              class="flex-1 overflow-auto p-6 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 transition-colors duration-300"
            >
              <slot />
            </div>

            <!-- Footer -->
            <div
              class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 transition-colors duration-300"
            >
              <slot name="footer">
                <!-- Batal -->
                <button
                  type="button"
                  class="rounded-xl px-5 py-2.5 text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 transition-all duration-200"
                  @click="close"
                >
                  Batal
                </button>

                <!-- Simpan -->
                <button
                  type="button"
                  :disabled="loading"
                  class="rounded-xl px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                  @click="save"
                >
                  <span v-if="loading" class="flex items-center gap-2">
                    <svg
                      class="w-4 h-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />

                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>

                    Menyimpan...
                  </span>

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
