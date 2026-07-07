<script setup lang="ts">
import { Search, Plus, RefreshCcw, Pencil, Trash2 } from "lucide-vue-next";
import BaseModal from "~/components/modal/BaseModal.vue";
import BaseTable from "~/components/table/BaseTable.vue";

const search = ref("");
const openModal = ref(false);
const files = ref<File[]>([]);

const form = reactive({
  id: null,
  nama: "",
  kode_poli: "",
  nama_poli: "",
  tanggal: "",
  status: true,
  status_multi: [],
});

const loading = ref(false);

const data = ref([
  {
    id: 1,
    kode: "INT",
    nama: "Internis",
    status: true,
  },
  {
    id: 2,
    kode: "BED",
    nama: "Bedah",
    status: false,
  },
  {
    id: 3,
    kode: "IGD",
    nama: "IGD",
    status: true,
  },
  {
    id: 4,
    kode: "GIGI",
    nama: "Gigi",
    status: true,
  },
  {
    id: 5,
    kode: "MATA",
    nama: "Mata",
    status: false,
  },
  {
    id: 6,
    kode: "UMUM",
    nama: "Umum",
    status: true,
  },
]);

const columns = [
  {
    accessorKey: "kode",
    header: "Kode Poli",
  },
  {
    accessorKey: "nama",
    header: "Nama Poli",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "action",
    header: "Aksi",
  },
];

const save = () => {
  console.log(form);

  openModal.value = false;
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Master Poli</h1>

        <p class="text-gray-500">Kelola data poli</p>
      </div>

      <button
        @click="openModal = true"
        class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-3 flex items-center gap-2"
      >
        <Plus :size="18" />

        Tambah
      </button>
    </div>

    <!-- Search -->
    <div class="bg-white rounded-xl shadow p-5">
      <div class="flex gap-3">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-3 text-gray-400" :size="18" />

          <input
            v-model="search"
            placeholder="Cari data..."
            class="w-full rounded-xl border pl-10 pr-4 py-3"
          />
        </div>

        <button class="border rounded-xl px-5 hover:bg-gray-100">
          <RefreshCcw :size="18" />
        </button>
      </div>
    </div>
    <!-- Table -->
    <BaseTable
      :columns="columns"
      :rows="data"
      :loading="loading"
      :skeleton="true"
      searchable
      show-pagination
      :total="data.length"
    >
      <template #cell-action="{ row }">
        <div class="flex items-center justify-center gap-5">
          <button class="hover:text-indigo-600 bg-gray-100 rounded-lg p-2">
            <Pencil :size="18" />
          </button>

          <button class="hover:text-red-600 bg-gray-100 rounded-lg p-2">
            <Trash2 :size="18" />
          </button>
        </div>
      </template>
    </BaseTable>
  </div>
</template>
