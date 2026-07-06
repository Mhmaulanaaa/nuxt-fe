<script setup lang="ts">
import { Search, Plus, RefreshCcw, Pencil, Trash2 } from "lucide-vue-next";

const search = ref("");
const openModal = ref(false);

const form = reactive({
  id: null,
  kode_poli: "",
  nama_poli: "",
  status: true,
});

const items = ref([
  {
    id: 1,
    kode_poli: "INT",
    nama_poli: "Internis",
    status: true,
  },
  {
    id: 2,
    kode_poli: "BED",
    nama_poli: "Bedah",
    status: true,
  },
]);

const columns = [
  {
    accessorKey: "kode_poli",
    header: "Kode Poli",
  },
  {
    accessorKey: "nama_poli",
    header: "Nama Poli",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "action",
    header: "Action",
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

    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-4">No</th>

            <th class="p-4">Kode</th>

            <th class="p-4">Nama Poli</th>

            <th class="p-4">Status</th>

            <th class="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
            class="border-t hover:bg-gray-50 text-center"
          >
            <td class="p-4">
              {{ index + 1 }}
            </td>

            <td class="p-4">
              {{ item.kode_poli }}
            </td>

            <td class="p-4">
              {{ item.nama_poli }}
            </td>

            <td class="p-4">
              <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Aktif
              </span>
            </td>

            <td class="p-4">
              <div class="flex justify-center gap-2">
                <button class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                  <Pencil :size="16" />
                </button>

                <button class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                  <Trash2 :size="16" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->

    <UModal v-model:open="openModal" title="Tambah Data Poli">
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="font-medium"> Kode Poli </label>

            <input v-model="form.kode_poli" class="w-full rounded-xl border p-3 mt-2" />
          </div>

          <div>
            <label class="font-medium"> Nama Poli </label>

            <input v-model="form.nama_poli" class="w-full rounded-xl border p-3 mt-2" />
          </div>

          <div>
            <label class="font-medium"> Status </label>

            <select v-model="form.status" class="w-full rounded-xl border p-3 mt-2">
              <option :value="true">Aktif</option>

              <option :value="false">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-3">
          <button @click="openModal = false" class="border rounded-xl px-5 py-2">
            Batal
          </button>

          <button @click="save" class="bg-indigo-600 text-white rounded-xl px-5 py-2">
            Simpan
          </button>
        </div>
      </template>
    </UModal>
  </div>
</template>
