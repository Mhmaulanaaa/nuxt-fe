<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { User, Settings, KeyRound, LogOut, ChevronDown } from "lucide-vue-next";
import { toastSuccess, toastError, toastWarning } from "~/utils/toast";
import { confirmAction, successAlert, errorAlert } from "~/utils/swal";

const dropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const auth = useAuth();

// watchEffect(() => {
//   console.log("Profile User:", auth.user.value);
// });

const { user, logout } = useAuth();

const initials = computed(() => {
  if (!user.value?.name) return "A";

  return (user.value?.name as string)
    .split(" ")
    .map((v: string) => v[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
});

const closeOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeOutside);
});

const handleLogout = async () => {
  dropdown.value = false;
  await logout();

  toastSuccess("Logout berhasil");
};
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- Button -->
    <button
      @click="dropdown = !dropdown"
      class="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800"
    >
      <!-- Avatar -->
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
      >
        {{ initials }}
      </div>

      <!-- User -->
      <div class="hidden text-left md:block">
        <div class="text-sm font-semibold text-gray-800 dark:text-white">
          {{ user?.name }}
        </div>

        <div class="text-xs text-gray-500 dark:text-slate-400">
          {{ user?.role ?? "Administrator" }}
        </div>
      </div>

      <ChevronDown
        :size="18"
        class="hidden text-gray-500 transition dark:text-slate-400 md:block"
      />
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="dropdown"
        class="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-blue-600 p-5 text-white">
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold"
            >
              {{ initials }}
            </div>

            <div>
              <div class="text-lg font-semibold">
                {{ user?.name }}
              </div>

              <div class="text-sm opacity-90">
                {{ user?.nip }}
              </div>

              <div class="mt-2 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs">
                {{ user?.role || "Administrator" }}
              </div>
            </div>
          </div>
        </div>

        <!-- Menu -->
        <div class="p-2">
          <NuxtLink
            to="/profile"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <User :size="18" />
            <span>Profile</span>
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Settings :size="18" />
            <span>Settings</span>
          </NuxtLink>

          <NuxtLink
            to="/change-password"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <KeyRound :size="18" />
            <span>Change Password</span>
          </NuxtLink>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200 dark:border-slate-700" />

        <!-- Logout -->
        <div class="p-2">
          <button
            @click="handleLogout"
            class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            <LogOut :size="18" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
