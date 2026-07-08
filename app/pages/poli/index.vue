<script setup lang="ts">
import { Hospital, Pencil, Trash2, RefreshCcw, Search } from "lucide-vue-next";
import BaseCard from "~/components/card/BaseCard.vue";
import BaseModal from "~/components/modal/BaseModal.vue";
import BaseTable from "~/components/table/BaseTable.vue";
import BaseButton from "~/components/button/BaseButton.vue";
import BaseSelect from "~/components/base/BaseSelect.vue";
import { toastSuccess, toastError, toastWarning } from "~/utils/toast";
import { confirmAction, successAlert, errorAlert } from "~/utils/swal";

useHead({
  title: "Master Poli",
});
definePageMeta({
  breadcrumb: [{ label: "Poli", to: "/poli" }, { label: "Poli" }],
});

const { getList, create, update, remove, getDetail, search, count } = usePoli();

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
      value: item.kode_poli,
    }));
    // console.log(optionsPoli.value);
  } catch (error) {
    console.error(error);
  }
}

async function loadData() {
  try {
    loading.value = true;

    const response: any = await getList();

    rows.value = response.data;
    total.value = response.data.length;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function searchData() {
  try {
    loading.value = true;

    const params: any = {};

    if (keyword.value.trim()) {
      params.keyword = keyword.value.trim();
    }

    if (poliSearch.value) {
      params.kode_poli = poliSearch.value;
    }
    if (statusSearch.value !== null && statusSearch.value !== undefined) {
      params.status = statusSearch.value;
    }

    const response: any = await search(params);

    rows.value = response.data;
    total.value = response.data.length;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function simpanData() {
  try {
    loading.value = true;

    const payload = {
      kode_poli: form.value.kode_poli,
      nama_poli: form.value.nama_poli,
      is_active: form.value.status,
    };

    if (isEdit.value) {
      await update(selectedId.value!, payload);
      toastSuccess("Data sukses diubah");
    } else {
      toastSuccess("Data sukses ditambah");
      await create(payload);
    }

    showModal.value = false;

    resetForm();

    await refreshData();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const selectedId = ref<number | null>(null);

async function edit(row: any) {
  try {
    loading.value = true;

    isEdit.value = true;

    const response: any = await getDetail(row.poli_id);

    selectedId.value = row.poli_id;

    form.value = {
      kode_poli: response.data.kode_poli,
      nama_poli: response.data.nama_poli,
      status: response.data.is_active,
    };

    showModal.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function hapusData(row: any) {
  const result = await confirmAction(
    `Apakah Anda yakin ingin menghapus poli "${row.nama_poli}"?`
  );

  if (!result.isConfirmed) return;

  try {
    loading.value = true;

    await remove(row.poli_id);

    await loadData();
    await loadDataCount();
    await loadSelectPoli();
  } catch (error) {
    console.error(error);
  } finally {
    toastSuccess("Data sukses dihapus");
    loading.value = false;
  }
}

const loading = ref(false);
const countPoli = ref({
  total: 0,
  aktif: 0,
  nonaktif: 0,
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

  selectedId.value = null;
}

function tambahData() {
  isEdit.value = false;
  resetForm();
  showModal.value = true;
}

async function refreshData() {
  await Promise.all([loadData(), loadDataCount(), loadSelectPoli()]);
}

const keyword = ref("");
const poliSearch = ref<string | null>(null);
const statusSearch = ref<boolean | null>(null);
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
async function resetSearch() {
  keyword.value = "";
  poliSearch.value = null;
  statusSearch.value = null;

  await loadData();
}
// Count dan Select and Search

const page = ref(1);
const pageSize = ref(10);
const total = ref(3);
const rows = ref<any[]>([]);
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
    accessorKey: "is_active",
    header: "Status",
  },
  {
    id: "aksi",
    header: "Aksi",
  },
];

onMounted(() => {
  loadDataCount();
  loadSelectPoli();
  loadData();
});

const showModal = ref(false);
const isEdit = ref(false);
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
        <BaseButton variant="primary" @click="searchData">
          <template #leftIcon>
            <Search :size="18" />
          </template>
          Cari
        </BaseButton>

        <BaseButton variant="secondary" @click="resetSearch">
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
      <BaseButton variant="primary" size="sm" @click="tambahData()">
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
        <template #cell-is_active="{ value }">
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

            <button
              class="rounded-lg bg-red-500 p-2 text-white"
              @click.stop="hapusData(row)"
            >
              <Trash2 :size="16" />
            </button>
          </div>
        </template>
      </BaseTable>
      <!-- Modal -->
      <BaseModal
        v-model="showModal"
        :title="isEdit ? 'Edit Data Poli' : 'Tambah Data Poli'"
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
