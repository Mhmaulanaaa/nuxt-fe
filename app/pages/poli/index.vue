<script setup lang="ts">
import { Hospital, Pencil, Trash2, RefreshCcw, Search } from "lucide-vue-next";
import BaseCard from "~/components/card/BaseCard.vue";
import BaseModal from "~/components/modal/BaseModal.vue";
import BaseTable from "~/components/table/BaseTable.vue";
import BaseButton from "~/components/button/BaseButton.vue";
import BaseSelect from "~/components/base/BaseSelect.vue";

useHead({
  title: "Master Poli",
});
definePageMeta({
  breadcrumb: [{ label: "Poli", to: "/poli" }, { label: "Poli" }],
});

const { getList, create, update, remove, getDetail, search, count } = usePoli();

const loading = ref(false);

const poli = ref<any[]>([]);
const countPoli = ref({
  total: 0,
  aktif: 0,
  nonaktif: 0,
});

async function loadDataCount() {
  try {
    loading.value = true;

    const response: any = await count();

    countPoli.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function loadSelectPoli() {
  try {
    const response: any = await getList();

    optionsPoli.value = response.data.map((item: any) => ({
      label: item.nama_poli,
      value: item.poli_id,
    }));
  } catch (error) {
    console.error(error);
  }
}

const poliSearch = ref<number | null>(null);
const statusSearch = ref<number | null>(null);
const optionsPoli = ref([]);
const options = [
  {
    label: "Semua",
    value: null,
  },
  {
    label: "Aktif",
    value: true,
  },
  {
    label: "Tidak Aktif",
    value: false,
  },
];

onMounted(() => {
  loadDataCount();
  loadSelectPoli();
});

const form = ref({
  kode_poli: "",
  nama_poli: "",
  status: true,
});

function resetForm() {
  form.value = {
    kode_poli: "",
    nama_poli: "",
    status: true,
  };
}

const formEdit = ref({
  kode_poli: "",
  nama_poli: "",
  status: true,
});

function tambahData() {
  form.value.kode_poli = "";
  form.value.nama_poli = "";
  form.value.status = true;

  resetForm();
  showModal.value = false;
}

function simpanData() {
  formEdit.value.kode_poli = "";
  formEdit.value.nama_poli = "";
  formEdit.value.status = true;

  resetForm();
  showEditModal.value = false;
}

const showModal = ref(false);
const showEditModal = ref(false);
const searchQuery = ref("");

const page = ref(1);
const pageSize = ref(10);
const total = ref(3);
const keyword = ref("");
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
    id: "aksi",
    header: "Aksi",
  },
];
function edit(row: any) {
  console.log("Edit", row);
}

function hapus(row: any) {
  console.log("Delete", row);
}
</script>

<template>
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">Master Poli</h1>
    <AppBreadcrumb />
  </div>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <BaseCard title="Total Poli" :value="countPoli.total" variant="blue">
      <template #icon>
        <Hospital :size="26" />
      </template>
    </BaseCard>
    <BaseCard title="Poli Aktif" :value="countPoli.aktif" variant="blue">
      <template #icon>
        <Hospital :size="26" />
      </template>
    </BaseCard>
    <BaseCard title="Poli Tidak Aktif" :value="countPoli.nonaktif" variant="blue">
      <template #icon>
        <Hospital :size="26" />
      </template>
    </BaseCard>
  </div>
  <!-- Base Card -->

  <div
    class="mt-6 shadow-sm rounded-2xl border p-6 shadow-sm transition-all duration-300 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700"
  >
    <h1
      class="text-md font-semibold text-gray-800 dark:text-white mb-5 justify-start flex-1"
    >
      Cari Poli
    </h1>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <BaseSelect
        v-model="poliSearch"
        label="Poli"
        placeholder="Pilih Poli"
        :options="optionsPoli"
        class="w-1/3"
      />
      <BaseSelect
        v-model="statusSearch"
        label="Status"
        placeholder="Pilih Status"
        :options="options"
        class="w-1/3"
      />
      <div class="flex flex-wrap items-center gap-2">
        <BaseButton variant="primary" @click="loadData">
          <template #leftIcon>
            <Search :size="18" />
          </template>
          Cari
        </BaseButton>

        <BaseButton variant="secondary" @click="loadData">
          <template #leftIcon>
            <RefreshCcw :size="18" />
          </template>
          Muat Ulang
        </BaseButton>
      </div>
    </div>
  </div>

  <div
    class="mt-6 shadow-sm rounded-2xl border p-6 shadow-sm transition-all duration-300 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700"
  >
    <div class="flex items-center justify-end mb-4 gap-2">
      <h1
        class="text-md font-semibold text-gray-800 dark:text-white mb-1 justify-start flex-1"
      >
        Daftar Poli
      </h1>
      <BaseButton variant="primary" size="sm" @click="showModal = true">
        Tambah Poli
      </BaseButton>
    </div>
    <div>
      <BaseTable
        :columns="columns"
        :rows="rows"
        :loading="loading"
        searchable
        show-pagination
        :page="page"
        :page-size="pageSize"
        :total="total"
        @update:page="page = $event"
        @update:pageSize="pageSize = $event"
        @update:search="keyword = $event"
        @row-click="console.log"
      >
        <!-- Status -->
        <template #cell-status="{ value }">
          <span
            :class="
              value
                ? 'rounded-full bg-green-100 px-3 py-1 text-xs text-green-700'
                : 'rounded-full bg-red-100 px-3 py-1 text-xs text-red-700'
            "
          >
            {{ value ? "Aktif" : "Non Aktif" }}
          </span>
        </template>

        <!-- Aksi -->
        <template #cell-aksi="{ row }">
          <div class="flex justify-center gap-2">
            <button
              class="rounded-lg bg-amber-500 p-2 text-white"
              @click.stop="edit(row)"
            >
              <Pencil :size="16" />
            </button>

            <button class="rounded-lg bg-red-500 p-2 text-white" @click.stop="hapus(row)">
              <Trash2 :size="16" />
            </button>
          </div>
        </template>
      </BaseTable>
      <BaseModal
        v-model="showModal"
        title="Tambah Data Poli"
        size="md"
        @save="simpanData"
      >
        <div class="space-y-5">
          <BaseInput
            v-model="form.kode_poli"
            label="Kode Poli"
            placeholder="Masukkan kode poli"
          />

          <BaseInput
            v-model="form.nama_poli"
            label="Nama Poli"
            placeholder="Masukkan nama poli"
          />

          <BaseSelect
            v-model="form.status"
            label="Status"
            :options="[
              {
                label: 'Aktif',
                value: true,
              },
              {
                label: 'Non Aktif',
                value: false,
              },
            ]"
          />
        </div>
      </BaseModal>
    </div>
  </div>
</template>
