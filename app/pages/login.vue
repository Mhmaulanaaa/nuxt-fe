<script setup>
definePageMeta({
  layout: "auth",
});

import { reactive, ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { Eye, EyeOff } from "lucide-vue-next";
import { toastSuccess, toastError, toastWarning } from "~/utils/toast";
import { confirmAction, successAlert, errorAlert } from "~/utils/swal";

const showPassword = ref(false);

const { login, loading } = useAuth();

const form = reactive({
  nip: "",
  password: "",
});

const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";

  try {
    await login(form);

    toastSuccess("Login berhasil");
  } catch (err) {
    toastError("NIP atau Password salah");
  }
};
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-100 p-6 transition-colors duration-300 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
  >
    <div
      class="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 lg:grid-cols-2"
    >
      <!-- Left -->

      <div
        class="relative hidden items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 transition-colors duration-300 lg:flex"
      >
        <div class="absolute inset-0 bg-black/20" />

        <div class="relative text-center text-white px-10">
          <ShieldCheck :size="70" class="mx-auto mb-6" />

          <h1 class="text-4xl font-bold">Dashboard System</h1>

          <p class="mt-4 text-white/80">
            Kelola seluruh data aplikasi Anda secara mudah, cepat dan aman.
          </p>
        </div>
      </div>

      <!-- Right -->

      <div
        class="p-10 lg:p-16 flex flex-col justify-center p-10 transition-all duration-300 lg:p-16"
      >
        <div class="mb-10">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back 👋
          </h2>

          <p class="mt-2 text-gray-500 dark:text-slate-400">
            Silakan login menggunakan NIP dan Password.
          </p>
        </div>

        <Transition name="fade">
          <div
            v-if="errorMessage"
            class="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300"
          >
            {{ errorMessage }}
          </div>
        </Transition>

        <form @submit.prevent="handleLogin">
          <!-- NIP -->
          <div class="mb-5">
            <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              NIP
            </label>

            <input
              v-model="form.nip"
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
              placeholder="Masukkan NIP"
            />
          </div>

          <!-- Password -->
          <div class="mb-4">
            <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              Password
            </label>

            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 placeholder:text-gray-400 transition-all duration-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
                placeholder="••••••••"
              />

              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" :size="18" />
                <EyeOff v-else :size="18" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-60"
          >
            <svg
              v-if="loading"
              class="h-5 w-5 animate-spin"
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
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 00-10 10h2z"
              />
            </svg>

            <span>
              {{ loading ? "Signing In..." : "Login" }}
            </span>
          </button>
        </form>

        <div class="mt-10 text-center text-sm text-gray-400 dark:text-slate-500">
          © {{ new Date().getFullYear() }}
          Line Project
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
