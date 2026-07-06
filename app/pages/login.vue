<script setup>
definePageMeta({
  layout: "auth",
});

import { reactive, ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { Eye, EyeOff } from "lucide-vue-next";

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
  } catch (err) {
    errorMessage.value = "NIP atau password salah";
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    <div
      class="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2"
    >
      <!-- Left -->

      <div
        class="hidden lg:flex relative bg-gradient-to-br from-indigo-600 to-blue-500 items-center justify-center"
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

      <div class="p-10 lg:p-16 flex flex-col justify-center">
        <div class="mb-10">
          <h2 class="text-3xl font-bold">Welcome Back 👋</h2>

          <p class="text-gray-500 mt-2">Silakan login menggunakan NIP dan Password.</p>
        </div>

        <Transition name="fade">
          <div
            v-if="errorMessage"
            class="mb-5 rounded-xl bg-red-50 border border-red-200 p-4 text-red-600"
          >
            {{ errorMessage }}
          </div>
        </Transition>

        <!-- NIP -->

        <div class="mb-5">
          <label class="block mb-2 font-medium"> NIP </label>

          <input
            v-model="form.nip"
            class="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Masukkan NIP"
          />
        </div>

        <!-- Password -->

        <div class="mb-4">
          <label class="block mb-2 font-medium"> Password </label>

          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full rounded-xl border px-4 py-3 pr-12 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />

            <button
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              @click="showPassword = !showPassword"
            >
              <Eye v-if="!showPassword" :size="18" />

              <EyeOff v-else :size="18" />
            </button>
          </div>
        </div>

        <!-- Button -->

        <button
          @click="handleLogin"
          :disabled="loading"
          class="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 font-semibold"
        >
          <span v-if="loading"> Signing In... </span>

          <span v-else> Login </span>
        </button>

        <div class="mt-10 text-center text-gray-400 text-sm">
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
