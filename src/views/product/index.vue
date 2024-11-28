<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Products List</h1>
      <Button
        @click="router.push('/products/add')"
        severity="primary"
        label="Add Product"
        icon="pi pi-plus"
        v-permission="{ action: ['product create'] }"
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
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Products`"
    >
      <template #empty> No Products found. </template>
      <Column
        field="name"
        header="Name"
        :show-filter-menu="false"
        :showClearButton="false"
        class="whitespace-nowrap min-w-48"
      >
        <template #body="{ data }">
          {{ data.name }}
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
      <Column field="tax_able" header="Tax Able" class="whitespace-nowrap">
        <template #body="{ data }">
          <ToggleSwitch v-model="data.tax_able" disabled />
        </template>
      </Column>
      <Column field="gst" header="GST" class="whitespace-nowrap">
        <template #body="{ data }">
          <ToggleSwitch v-model="data.gst" disabled />
        </template>
      </Column>
      <Column field="status" header="Status" class="whitespace-nowrap">
        <template #body="{ data }">
          <ToggleSwitch v-model="data.status" disabled />
        </template>
      </Column>
      <!-- <Column field="status" header="status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column> -->
      <Column field="weight" header="Weight" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.weight }}
        </template>
      </Column>
      <Column field="base_price" header="Base Price" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.base_price }}
        </template>
      </Column>
      <Column field="list_price" header="List Price" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.list_price }}
        </template>
      </Column>
      <Column field="discount" header="Discount" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.discount }}
        </template>
      </Column>
      <Column field="reminder" header="Reminder" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.reminder }}
        </template>
      </Column>
      <Column field="location" header="Location" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.location }}
        </template>
      </Column>
      <Column field="min_qty" header="min Qty" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.min_qty }}
        </template>
      </Column>
      <Column field="target_qty" header="Target Qty" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.target_qty }}
        </template>
      </Column>
      <Column field="manufacture" header="Manufacture" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.manufacture }}
        </template>
      </Column>
      <Column field="thumbnail" header="Thumbnail" class="whitespace-nowrap">
        <template #body="{ data }">
          <Image :src="data.manufacture" alt="Image" width="100" />
        </template>
      </Column>
      <Column field="auther" header="Auther">
        <template #body="{ data }">
          {{ data.auther.name }}
        </template>
      </Column>
      <Column field="created_at" header="Created At" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column header="Actions" v-if="hasPermission(['product update', 'product delete'])">
        <template #body="{ data }">
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{ action: ['product update'] }"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['product delete'] }"
          />
        </template>
      </Column>
    </DataTable>
    <!-- add edit form -->
    <Dialog v-model:visible="addDialog" class="w-1/3" :header="dialogHeader" :modal="true">
      <div class="flex flex-col gap-6">
        <div>
          <label for="name" class="block font-bold mb-3">Name</label>
          <InputText
            id="name"
            v-model.trim="data.name"
            :required="true"
            :invalid="submitted && !data.name"
            fluid
          />
          <small v-if="submitted && !data.name" class="text-red-500">Name is required.</small>
        </div>
        <div>
          <label for="status" class="block font-bold mb-3">Status</label>
          <ToggleSwitch id="status" v-model="data.status" :true-value="1" :false-value="0" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveForm" />
      </template>
    </Dialog>
    <!-- delete form  -->
    <Dialog v-model:visible="deleteDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="data">
          Are you sure you want to delete <b>{{ data.name }} </b>?
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
import { Image, ToggleSwitch, Dialog, Button, InputText, DataTable, Column } from 'primevue';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { usePermission } from '@src/hooks/permission/usePermission';
import { debounce } from 'lodash-es';

const router = useRouter();
const data: Ref = ref({});
const submitted: Ref = ref({});
const addDialog: Ref = ref(false);
const deleteDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
const deleteId: Ref = ref();
const { hasPermission } = usePermission();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/products');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS }
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

function openAddDialog() {
  dialogHeader.value = 'Add Aroduct';
  data.value = {};
  submitted.value = false;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit Product';
  data.value = item;
  submitted.value = false;
  addDialog.value = true;
}

function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  data.value = item;
  deleteDialog.value = true;
}

function hideDialog() {
  addDialog.value = false;
  submitted.value = false;
}

const saveForm = () => {
  submitted.value = true;
  if (data?.value.name?.trim()) {
    if (data?.value.id) {
      updateRecordApi(`/products/${data.value.id}`, data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    } else {
      createRecordApi('/products', data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    }
    addDialog.value = false;
    data.value = {};
  }
};

function handleDelete() {
  deleteRecordApi(`/products/${deleteId.value}`)
    .then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    })
    .catch((res) => {
      window.toast('error', 'Error Message', res.message);
    });
  deleteDialog.value = false;
  deleteId.value = null;
}
</script>

<style lang="scss" scoped></style>
