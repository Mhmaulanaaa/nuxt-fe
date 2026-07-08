<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

/**
 * Column Configuration
 */
interface Column {
  id?: string;
  accessorKey?: string;
  header: string;

  align?: "left" | "center" | "right";

  width?: string;

  sortable?: boolean;
}

/**
 * Props
 */
interface Props {
  /**
   * Table columns
   */
  columns: Column[];

  /**
   * Table data
   */
  rows: any[];

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Empty message
   */
  emptyText?: string;

  /**
   * Search
   */
  searchable?: boolean;

  /**
   * Search placeholder
   */
  searchPlaceholder?: string;

  /**
   * Pagination
   */
  showPagination?: boolean;

  page?: number;

  pageSize?: number;

  total?: number;

  pageSizeOptions?: number[];

  /**
   * Appearance
   */
  striped?: boolean;

  hover?: boolean;

  bordered?: boolean;

  stickyHeader?: boolean;

  maxHeight?: string;

  /**
   * Infinite scroll
   */
  infiniteScroll?: boolean;

  hasMore?: boolean;

  loadingMore?: boolean;

  /**
   * Sorting
   */
  sortable?: boolean;

  /**
   * Select Row
   */
  selectable?: boolean;

  /**
   * Loading Skeleton
   */
  skeleton?: boolean;

  /**
   * Refresh Button
   */
  refreshable?: boolean;
}

/**
 * Default Props
 */
const props = withDefaults(defineProps<Props>(), {
  loading: false,

  emptyText: "Tidak ada data",

  searchable: false,

  searchPlaceholder: "Cari data...",

  showPagination: false,

  page: 1,

  pageSize: 10,

  total: 0,

  pageSizeOptions: () => [10, 25, 50, 100],

  striped: true,

  hover: true,

  bordered: true,

  stickyHeader: true,

  maxHeight: "600px",

  infiniteScroll: false,

  hasMore: false,

  loadingMore: false,

  sortable: true,

  selectable: false,

  skeleton: false,

  refreshable: false,
});

/**
 * Emits
 */
const emit = defineEmits<{
  "update:page": [value: number];

  "update:pageSize": [value: number];

  "update:search": [value: string];

  "row-click": [row: any];

  sort: [column: Column, direction: "asc" | "desc"];

  refresh: [];

  "selection-change": [rows: any[]];

  "load-more": [];
}>();

/**
 * Local Search
 */
const keyword = ref("");

watch(keyword, (value) => {
  emit("update:search", value);
});

/**
 * Computed Rows
 */
const tableRows = computed(() => {
  return props.rows ?? [];
});

/**
 * Empty State
 */
const isEmpty = computed(() => {
  return !props.loading && tableRows.value.length === 0;
});

/**
 * Pagination
 */

const totalPages = computed(() => {
  if (!props.total) return 0;

  return Math.ceil(props.total / props.pageSize);
});

const fromData = computed(() => {
  if (props.total === 0) return 0;

  return (props.page - 1) * props.pageSize + 1;
});

const toData = computed(() => {
  return Math.min(
    props.page * props.pageSize,

    props.total
  );
});

function changePage(page: number) {
  if (page < 1) return;

  if (page > totalPages.value) return;

  emit("update:page", page);
}

function changePageSize(size: number) {
  emit("update:pageSize", size);

  emit("update:page", 1);
}

/**
 * Column Helper
 */

const sortColumn = ref<string | null>(null);

const sortDirection = ref<"asc" | "desc">("asc");

function sortTable(column: Column) {
  if (!column.sortable) return;

  const key = column.accessorKey || column.id;

  if (sortColumn.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = key as string;

    sortDirection.value = "asc";
  }

  emit("sort", column, sortDirection.value);
}

const getAlign = (align?: string) => {
  switch (align) {
    case "left":
      return "text-left";

    case "right":
      return "text-right";

    case "center":
    default:
      return "text-center";
  }
};
function getCellValue(row: any, column: Column) {
  if (!column.accessorKey) return "";

  return row[column.accessorKey];
}

/**
 * Row Click
 */

function rowClick(row: any) {
  emit("row-click", row);
}

/**
 * Infinite Scroll
 */

const selectedRows = ref<any[]>([]);

function toggleSelect(row: any) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id);

  if (index >= 0) {
    selectedRows.value.splice(index, 1);
  } else {
    selectedRows.value.push(row);
  }

  emit("selection-change", selectedRows.value);
}

const observerTarget = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

function setupObserver() {
  if (!props.infiniteScroll || !observerTarget.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries && entries[0];
      if (!entry) return;

      if (entry.isIntersecting && props.hasMore && !props.loadingMore && !props.loading) {
        emit("load-more");
      }
    },
    {
      rootMargin: "100px",
    }
  );

  observer.observe(observerTarget.value);
}

onMounted(async () => {
  await nextTick();

  setupObserver();
});

onBeforeUnmount(() => {
  observer?.disconnect();
});

/**
 * Expose
 * digunakan jika parent
 * ingin akses internal state
 */
defineExpose({
  keyword,

  tableRows,

  totalPages,
});
</script>
<template>
  <div
    class="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
  >
    <!-- =========================
         TOOLBAR
    ========================== -->
    <div
      v-if="searchable || $slots.toolbar"
      class="flex flex-col gap-3 border-b border-gray-100 px-4 py-4 dark:border-slate-700 md:flex-row md:items-center md:justify-between"
    >
      <!-- Search -->
      <div v-if="searchable" class="relative w-full md:max-w-sm">
        <svg
          class="absolute left-3 top-3 h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5Z"
          />
        </svg>

        <input
          v-model="keyword"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        />
      </div>

      <!-- Custom Toolbar -->
      <div v-if="$slots.toolbar" class="flex items-center gap-2">
        <slot name="toolbar" />
      </div>
    </div>

    <!-- =========================
         LOADING OVERLAY
    ========================== -->

    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="loading"
        class="absolute inset-0 z-30 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-slate-900/70"
      >
        <div class="flex flex-col items-center gap-3">
          <div
            class="h-9 w-9 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"
          />

          <span class="text-sm text-gray-500 dark:text-slate-400"> Memuat data... </span>
        </div>
      </div>
    </Transition>

    <!-- =========================
         TABLE WRAPPER
    ========================== -->

    <div
      class="overflow-auto"
      :style="{
        maxHeight,
      }"
    >
      <table class="min-w-full border-collapse">
        <!-- HEADER -->

        <thead
          :class="[
            stickyHeader ? 'sticky top-0 z-10' : '',
            'bg-gray-50 dark:bg-slate-800',
          ]"
        >
          <tr>
            <th
              v-for="column in columns"
              :key="column.id || column.accessorKey"
              :style="{ width: column.width }"
              class="border-b border-gray-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:border-slate-700 dark:text-slate-400 text-center"
            >
              <div class="flex items-center justify-center">
                {{ column.header }}

                <span v-if="sortColumn === (column.accessorKey || column.id)">
                  {{ sortDirection === "asc" ? "↑" : "↓" }}
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <!-- BODY -->

        <tbody>
          <tr v-if="loading && skeleton" v-for="i in 5" :key="i">
            <td v-for="column in columns" :key="column.header" class="px-4 py-3">
              <div
                class="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-slate-700"
              />
            </td>
          </tr>
          <!-- EMPTY -->

          <tr v-if="isEmpty">
            <td :colspan="columns.length" class="py-16">
              <div class="flex flex-col items-center justify-center gap-3">
                <svg
                  class="h-12 w-12 text-gray-300 dark:text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0-4 4m4-4-4-4M4 13l4 4m-4-4 4-4"
                  />
                </svg>

                <span class="text-sm text-gray-400 dark:text-slate-500">
                  {{ emptyText }}
                </span>
              </div>
            </td>
          </tr>

          <!-- DATA ROW -->

          <tr
            v-for="(row, index) in tableRows"
            :key="row.id ?? index"
            @click="rowClick(row)"
            :class="[
              bordered ? 'border-b border-gray-100 dark:border-slate-700' : '',

              hover
                ? 'cursor-pointer transition hover:bg-gray-50 dark:hover:bg-slate-800'
                : '',

              striped && index % 2 ? 'bg-gray-50/50 dark:bg-slate-800/30' : '',
            ]"
          >
            <td v-if="selectable" class="px-4">
              <input
                type="checkbox"
                :checked="selectedRows.some((item) => item.id === row.id)"
                @click.stop="toggleSelect(row)"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.id || column.accessorKey"
              class="px-4 py-3 text-sm text-gray-700 dark:text-slate-200 text-center"
            >
              <!-- SLOT CELL -->

              <slot
                v-if="$slots[`cell-${column.id || column.accessorKey}`]"
                :name="`cell-${column.id || column.accessorKey}`"
                :row="row"
                :value="getCellValue(row, column)"
                :column="column"
              />

              <!-- DEFAULT VALUE -->

              <template v-else>
                {{ getCellValue(row, column) }}
              </template>
            </td>
          </tr>

          <!-- INFINITE SCROLL -->

          <tr v-if="infiniteScroll">
            <td :colspan="columns.length" class="py-4 text-center">
              <div ref="observerTarget" class="h-1" />

              <span v-if="loadingMore" class="text-xs text-gray-400">
                Memuat lebih banyak...
              </span>

              <span v-else-if="!hasMore" class="text-xs text-gray-400">
                Semua data sudah ditampilkan
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- =========================
         FOOTER
    ========================== -->

    <div
      v-if="$slots.footer || showPagination"
      class="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 dark:border-slate-700 md:flex-row md:items-center md:justify-between"
    >
      <slot name="footer">
        <span class="text-sm text-gray-500 dark:text-slate-400">
          {{ fromData }} -
          {{ toData }}
          dari
          {{ total }}
          data
        </span>
      </slot>

      <!-- PAGINATION PLACE HOLDER -->

      <div v-if="showPagination" class="flex items-center gap-2">
        <div class="flex items-center gap-2">
          <!-- Previous -->
          <button
            @click="changePage(page - 1)"
            class="rounded-lg border border-gray-300 bg-white px-3 py-1 text-gray-700 transition-colors hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            ‹
          </button>

          <!-- Number -->
          <button
            v-for="p in totalPages"
            :key="p"
            @click="changePage(p)"
            :class="[
              'rounded-lg border px-3 py-1 text-sm transition-colors',

              page === p
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
            ]"
          >
            {{ p }}
          </button>

          <!-- Next -->
          <button
            @click="changePage(page + 1)"
            class="rounded-lg border border-gray-300 bg-white px-3 py-1 text-gray-700 transition-colors hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            ›
          </button>
        </div>

        <!-- Info -->
        <span class="text-sm text-gray-500 dark:text-slate-400">
          {{ page }} / {{ totalPages }}
        </span>

        <!-- Next Button -->
        <button
          class="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          @click="changePage(page + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
