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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4"
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

            <div class="border-t px-6 py-6 flex justify-end gap-3">
              <slot name="footer">
                <BaseButton variant="outline" @click="close"> Batal </BaseButton>

                <BaseButton :loading="loading" @click="save"> Simpan </BaseButton>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
