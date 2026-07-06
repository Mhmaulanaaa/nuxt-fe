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
      <h1 class="text-3xl font-bold">Selamat Datang</h1>

      <p class="mt-2 opacity-90">Semoga harimu menyenangkan. Selamat bekerja.</p>
    </div>

    <!-- Statistik -->
    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="item in stats"
        :key="item.title"
        class="rounded-2xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">
              {{ item.title }}
            </p>

            <h2 class="mt-2 text-3xl font-bold">
              {{ item.value }}
            </h2>
          </div>

          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white"
            :class="item.color"
          >
            {{ item.icon }}
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-3">
      <!-- Grafik -->
      <div class="xl:col-span-2 rounded-2xl bg-white p-6 shadow">
        <h2 class="text-lg font-semibold">Statistik Aktivitas</h2>

        <div
          class="mt-5 flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400"
        >
          Grafik akan ditampilkan di sini
        </div>
      </div>

      <!-- Aktivitas -->
      <div class="rounded-2xl bg-white p-6 shadow">
        <h2 class="mb-5 text-lg font-semibold">Aktivitas Terbaru</h2>

        <div class="space-y-4">
          <div class="rounded-lg bg-gray-50 p-3">
            Login berhasil
            <div class="text-xs text-gray-500">Baru saja</div>
          </div>

          <div class="rounded-lg bg-gray-50 p-3">
            Data master diperbarui
            <div class="text-xs text-gray-500">10 menit lalu</div>
          </div>

          <div class="rounded-lg bg-gray-50 p-3">
            User baru ditambahkan
            <div class="text-xs text-gray-500">1 jam lalu</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Menu -->
    <div class="rounded-2xl bg-white p-6 shadow">
      <h2 class="mb-5 text-lg font-semibold">Quick Menu</h2>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <NuxtLink
          v-for="menu in quickMenus"
          :key="menu.title"
          :to="menu.link"
          class="rounded-xl border p-5 text-center transition hover:border-indigo-500 hover:bg-indigo-50"
        >
          <div class="text-4xl">
            {{ menu.icon }}
          </div>

          <div class="mt-3 font-medium">
            {{ menu.title }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
