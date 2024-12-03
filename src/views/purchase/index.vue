<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Purchase List</h1>
      <Button
        @click="openAddDialog"
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
      <Column field="id" header="SN#" :show-filter-menu="false" :showClearButton="false">
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
      <Column field="status" header="status">
        <template #body="{ data }">
          <Tag severity="primary">
            {{ data.status }}
          </Tag>
        </template>
      </Column>
      <Column field="auther" header="Auther">
        <template #body="{ data }">
          {{ data.auther.name }}
        </template>
      </Column>
      <Column field="created_at" header="Created At">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column header="Actions" v-permission="{ action: ['purchase update', 'purchase delete'] }">
        <template #body="{ data }">
          <!-- <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
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
          /> -->
        </template>
      </Column>
    </DataTable>
    <!-- add edit form -->
    <Dialog v-model:visible="addDialog" class="w-1/3" :header="dialogHeader" :modal="true">
      <Form
        v-slot="$form: any"
        :resolver="resolver"
        :initialValues="formValues"
        @submit="onFormSubmit"
      >
        <div class="flex flex-col gap-1 mb-3">
          <label for="supplier_id" class="block font-semibold mb-1"> Select Supplier </label>
          <Select
            id="supplier_id"
            name="supplier_id"
            :options="suppliers"
            option-label="name"
            option-value="id"
            placeholder="Select supplier"
            variant="filled"
            fluid
          />
          <Message v-if="$form.supplier_id?.invalid" severity="error" size="small" variant="simple">
            {{ $form.supplier_id.error?.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <label class="block font-semibold mb-1">Notes</label>
          <Textarea
            name="notes"
            rows="5"
            cols="30"
            placeholder="Enter Notes"
            variant="filled"
            fluid
          />
          <Message v-if="$form.notes?.invalid" severity="error" size="small" variant="simple">
            {{ $form.notes.error?.message }}
          </Message>
        </div>
        <div class="flex justify-end">
          <Button type="submit" severity="primary" label="Save" class="mt-5" />
        </div>
      </Form>
    </Dialog>
    <!-- delete form  -->
    <!-- <Dialog v-model:visible="deleteDialog" class="w-1/3" header="Confirm" :modal="true">
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
    </Dialog> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import {
  Dialog,
  Button,
  InputText,
  Textarea,
  Select,
  Tag,
  DataTable,
  Column,
  Message
} from 'primevue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { z } from 'zod';
import {
  createRecordApi
  // deleteRecordApi, updateRecordApi
} from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';
import { useSupplierfilter } from '@src/filters/supplier';

const router = useRouter();
const { suppliers, getSuppliers } = useSupplierfilter();
const formValues = ref({});
const addDialog: Ref = ref(false);
// const deleteDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
// const deleteId: Ref = ref();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/purchases');

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.CONTAINS },
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

onMounted(async () => {
  await getSuppliers();
  fetchList();
});

const resolver = ref(
  zodResolver(
    z.object({
      supplier_id: z.number({ message: 'Supplier is required!' }),
      notes: z.string().optional()
    })
  )
);

function openAddDialog() {
  dialogHeader.value = 'Add Purchase';
  formValues.value = {};
  addDialog.value = true;
}

const onFormSubmit = async ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    const res: any = await createRecordApi('/purchases', values);
    window.toast('success', 'Purchase Information', res.message);
    // router.push({ name: 'purchase_list' });
    addDialog.value = true;
    formValues.value = {};
  }
};

// function handleDelete() {
//   deleteRecordApi(`/purchases/${deleteId.value}`)
//     .then((res: any) => {
//       window.toast('success', 'Success Message', res.message);
//       getList();
//     })
//     .catch((res) => {
//       window.toast('error', 'Error Message', res.message);
//     });
//   deleteDialog.value = false;
//   deleteId.value = null;
// }
</script>

<style lang="scss" scoped></style>
