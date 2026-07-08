<script setup lang="ts">
const { user } = useAuth();
import { ref } from "vue";

const stats = [
  {
    title: "Total User",
    value: "245",
    color: "bg-blue-500",
    icon: "👤",
  },
  {
    title: "Master Data",
    value: "32",
    color: "bg-green-500",
    icon: "📁",
  },
  {
    title: "Transaksi",
    value: "1.254",
    color: "bg-orange-500",
    icon: "📊",
  },
  {
    title: "Online User",
    value: "17",
    color: "bg-purple-500",
    icon: "🟢",
  },
];

const quickMenus = [
  {
    title: "Provinsi",
    icon: "🗺️",
    link: "/provinsi",
  },
  {
    title: "Kabupaten",
    icon: "🏢",
    link: "/kabupaten",
  },
  {
    title: "Users",
    icon: "👥",
    link: "/users",
  },
  {
    title: "Settings",
    icon: "⚙️",
    link: "/settings",
  },
];
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div
      class="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg"
    >
      <h1 class="text-3xl font-bold">Selamat Datang, {{ user?.name }}</h1>

      <p class="mt-2 text-white/90">Semoga harimu menyenangkan. Selamat bekerja.</p>
    </div>

    <!-- Statistik -->
    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="item in stats"
        :key="item.title"
        class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-slate-400">
              {{ item.title }}
            </p>

            <h2 class="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
              {{ item.value }}
            </h2>
          </div>

          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white shadow"
            :class="item.color"
          >
            {{ item.icon }}
          </div>
        </div>
      </div>
    </div>

    <!-- Chart + Activity -->
    <div class="grid gap-6 xl:grid-cols-3">
      <!-- Grafik -->
      <div
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 xl:col-span-2"
      >
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
          Statistik Aktivitas
        </h2>

        <div
          class="mt-5 flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400 dark:border-slate-700 dark:text-slate-500"
        >
          Grafik akan ditampilkan di sini
        </div>
      </div>

      <!-- Aktivitas -->
      <div
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white">
          Aktivitas Terbaru
        </h2>

        <div class="space-y-4">
          <div
            class="rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div class="font-medium text-gray-800 dark:text-white">Login berhasil</div>

            <div class="mt-1 text-xs text-gray-500 dark:text-slate-400">Baru saja</div>
          </div>

          <div
            class="rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div class="font-medium text-gray-800 dark:text-white">
              Data master diperbarui
            </div>

            <div class="mt-1 text-xs text-gray-500 dark:text-slate-400">
              10 menit lalu
            </div>
          </div>

          <div
            class="rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div class="font-medium text-gray-800 dark:text-white">
              User baru ditambahkan
            </div>

            <div class="mt-1 text-xs text-gray-500 dark:text-slate-400">1 jam lalu</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Menu -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white">Quick Menu</h2>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <NuxtLink
          v-for="menu in quickMenus"
          :key="menu.title"
          :to="menu.link"
          class="rounded-xl border border-gray-200 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:bg-indigo-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <div class="text-4xl">
            {{ menu.icon }}
          </div>

          <div class="mt-3 font-medium text-gray-800 dark:text-white">
            {{ menu.title }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
