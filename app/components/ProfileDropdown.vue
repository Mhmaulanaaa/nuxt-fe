<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { User, Settings, KeyRound, LogOut, ChevronDown } from "lucide-vue-next";

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
};
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- Button -->

    <button
      @click="dropdown = !dropdown"
      class="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-gray-100 transition"
    >
      <!-- Avatar -->

      <div
        class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold"
      >
        {{ initials }}
      </div>

      <!-- User -->

      <div class="hidden md:block text-left">
        <div class="font-semibold text-sm">
          {{ user?.name }}
        </div>

        <div class="text-xs text-gray-500">
          {{ user?.role ?? "Administrator" }}
        </div>
      </div>

      <ChevronDown class="hidden md:block" :size="18" />
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
        class="absolute right-0 mt-3 w-72 rounded-2xl bg-white shadow-2xl border overflow-hidden z-50"
      >
        <!-- Header -->

        <div class="p-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold"
            >
              {{ initials }}
            </div>

            <div>
              <div class="font-semibold text-lg">
                {{ user?.name }}
              </div>

              <div class="text-sm opacity-90">
                {{ user?.nip }}
              </div>

              <div class="inline-flex mt-2 rounded-full bg-white/20 px-3 py-1 text-xs">
                {{ user?.role || "Administrator" }}
              </div>
            </div>
          </div>
        </div>

        <!-- Menu -->

        <div class="p-2">
          <NuxtLink
            to="/profile"
            class="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100"
          >
            <User :size="18" />

            Profile
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100"
          >
            <Settings :size="18" />

            Settings
          </NuxtLink>

          <NuxtLink
            to="/change-password"
            class="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100"
          >
            <KeyRound :size="18" />

            Change Password
          </NuxtLink>
        </div>

        <div class="border-t" />

        <!-- Logout -->

        <div class="p-2">
          <button
            @click="handleLogout"
            class="w-full rounded-xl px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50"
          >
            <LogOut :size="18" />

            Logout
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
