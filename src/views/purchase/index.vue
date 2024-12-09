<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Purchase List</h1>
      <Button
        @click="router.push('/purchase/add')"
        severity="primary"
        label="Add Purchase"
        icon="pi pi-plus"
        v-permission="{ action: ['purchase create'] }"
      />
    </div>
    <DataTable
      :value="list"
      stripedRows
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="row"
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Purchases`"
    >
      <template #empty> No Purchase found. </template>
      <Column
        field="id"
        header="SN#"
        :show-filter-menu="false"
        :showClearButton="false"
        class="whitespace-nowrap min-w-56"
      >
        <template #body="{ data }">
          {{ data.id }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by ID"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="name"
        header="Supplier Name"
        :show-filter-menu="false"
        :showClearButton="false"
        class="whitespace-nowrap min-w-56"
      >
        <template #body="{ data }">
          {{ data.supplier.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Name"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="invoice_no"
        header="Invoice No"
        :show-filter-menu="false"
        :showClearButton="false"
        class="whitespace-nowrap min-w-56"
      >
        <template #body="{ data }">
          {{ data?.invoice_no }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by invoice"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column field="status" header="status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag severity="primary">
            {{ data.status }}
          </Tag>
        </template>
      </Column>
      <Column field="gst" header="GST" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.gst }}
        </template>
      </Column>
      <Column field="shipping_amount" header="Shipping Amount" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.shipping_amount }}
        </template>
      </Column>
      <Column field="total_items" header="Total Items" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.total_items }}
        </template>
      </Column>
      <Column field="total_qty" header="Total Quantity" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.total_qty }}
        </template>
      </Column>
      <Column field="total_amount" header="Total Amount" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.total_amount }}
        </template>
      </Column>
      <Column field="auther" header="Auther" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.auther.name }}
        </template>
      </Column>
      <Column field="created_at" header="Created At" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column
        header="Actions"
        v-permission="{ action: ['purchase update', 'purchase delete'] }"
        class="whitespace-nowrap"
      >
        <template #body="{ data }">
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="router.push(`/purchase/${data.id}/edit`)"
            v-permission="{ action: ['purchase update'] }"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['purchase delete'] }"
          />
        </template>
      </Column>
    </DataTable>
    <!-- delete form  -->
    <Dialog v-model:visible="deleteDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="formValues">
          Are you sure you want to delete <b>{{ formValues.name }} </b>?
        </span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import { Dialog, Button, InputText, Tag, DataTable, Column } from 'primevue';
import { deleteRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';

const router = useRouter();
const formValues: Ref = ref({});
const deleteDialog: Ref = ref(false);
const deleteId: Ref = ref();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/purchases');

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  invoice_no: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || ''
  };
  getList(searchParams.value);
};
// Debounce fetchList by 2 seconds
const debouncedFetchList = debounce(fetchList, 1000);
// Watch filters and call the debounced function when they change
watch(filters, debouncedFetchList, { deep: true });

onMounted(() => {
  fetchList();
});

const openDeleteDialog = (item: any) => {
  deleteId.value = item.id;
  formValues.value = item;
  deleteDialog.value = true;
};
const handleDelete = async () => {
  const res: any = await deleteRecordApi(`/purchases/${deleteId.value}`);
  window.toast('success', 'Success Message', res.message);
  getList();
  deleteDialog.value = false;
  deleteId.value = null;
};
</script>

<style lang="scss" scoped></style>
