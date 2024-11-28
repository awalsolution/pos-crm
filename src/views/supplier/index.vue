<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Supplier List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add Supplier"
        icon="pi pi-plus"
        v-permission="{ action: ['supplier create'] }"
      />
    </div>
    <DataTable
      class=""
      :value="list"
      stripedRows
      dataKey="id"
      scrollable
      v-model:filters="filters"
      filterDisplay="row"
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Suppliers`"
    >
      <template #empty> <div class="text-center">No Suppliers found.</div> </template>
      <Column
        field="name"
        header="Name"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Email"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="email"
        header="Email"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.email }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Email"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="contact"
        header="Contact"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.contact }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Phone"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="phone"
        header="Phone#"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.phone }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Phone"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column field="min_order" header="Min Order" class="whitespace-nowrap">
        {{ data?.min_order }}
      </Column>
      <Column field="pd_fright_amount" header="PD Fright Amount" class="whitespace-nowrap">
        {{ data?.pd_fright_amount }}
      </Column>
      <Column field="ship_via" header="Ship Via" class="whitespace-nowrap">
        {{ data?.ship_via }}
      </Column>
      <Column field="defaul_po_days" header="Default Po Days" class="whitespace-nowrap">
        {{ data?.defaul_po_days }}
      </Column>
      <Column field="status" header="Status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="auther" header="Auther" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.auther?.name }}
        </template>
      </Column>
      <Column field="created_at" header="Created At" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.created_at }}
        </template>
      </Column>
      <Column
        header="Actions"
        v-permission="{ action: ['supplier update', 'supplier delete'] }"
        class="whitespace-nowrap"
        alignFrozen="right"
        frozen
      >
        <template #body="{ data }">
          <Button
            label="Edit Supplier"
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="router.push({ name: 'supplier_edit', params: { supplier_id: data.id } })"
            v-permission="{ action: ['supplier update'] }"
          />
          <Button
            label="Delete Supplier"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['supplier delete'] }"
          />
        </template>
      </Column>
    </DataTable>
    <!-- add and update form -->
    <Dialog
      v-model:visible="addDialog"
      class="w-1/2"
      :header="dialogHeader"
      :modal="true"
      :closable="false"
    >
      <div class="flex flex-col gap-6">
        <div class="flex gap-5">
          <div class="w-full">
            <label for="name" class="block font-bold mb-3">Name</label>
            <InputText id="name" v-model="data.name" placeholder="Name" fluid />
          </div>
          <div class="w-full">
            <label for="contact" class="block font-bold mb-3">Contact</label>
            <InputText id="contact" v-model="data.contact" placeholder="Contect" fluid />
          </div>
          <div class="w-full">
            <label for="phone" class="block font-bold mb-3">Phone</label>
            <InputText id="phone" v-model="data.phone" placeholder="Phone" fluid />
          </div>
          <div class="w-full">
            <label for="email" class="block font-bold mb-3">Email</label>
            <InputText id="email" v-model="data.email" placeholder="Email" fluid />
          </div>
        </div>
        <div class="flex gap-5">
          <div class="w-full">
            <label for="min_order" class="block font-bold mb-3">Min Order</label>
            <InputNumber
              v-model="data.min_order"
              mode="decimal"
              inputId="stacked-buttons"
              :minFractionDigits="2"
              showButtons
              fluid
              :min="0"
            />
          </div>
          <div class="w-full">
            <label for="pd_fright_amount" class="block font-bold mb-3">PD Fright Amount</label>
            <InputNumber
              v-model.trim="data.pd_fright_amount"
              mode="decimal"
              inputId="stacked-buttons"
              :minFractionDigits="2"
              showButtons
              fluid
              :min="0"
            />
          </div>
          <div class="w-full">
            <label for="defaul_po_days" class="block font-bold mb-3">Default Po Days</label>
            <InputNumber
              v-model.trim="data.defaul_po_days"
              inputId="stacked-buttons"
              showButtons
              fluid
              :min="7"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-5">
          <div class="2xl:col-span-1 col-span-2">
            <Divider align="center" type="dotted" class="2xl:col-span-1 col-span-2">
              Shipping Address
            </Divider>
            <div class="grid grid-cols-2 gap-3">
              <div class="w-full">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText
                  id="street"
                  v-model.trim="data.shipping_address.street"
                  placeholder="Street"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText
                  id="city"
                  v-model.trim="data.shipping_address.city"
                  placeholder="City"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText
                  id="state"
                  v-model.trim="data.shipping_address.state"
                  placeholder="State"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText
                  id="zip"
                  v-model.trim="data.shipping_address.zip"
                  placeholder="Zip"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  v-model.trim="data.shipping_address.country"
                  placeholder="Country"
                  fluid
                />
              </div>
            </div>
          </div>
          <div class="2xl:col-span-1 col-span-2">
            <Divider align="center" type="dotted" class="2xl:col-span-1 col-span-2">
              Mailing Address
            </Divider>
            <div class="grid grid-cols-2 gap-3">
              <div v-if="!data.same_as_shipping" class="w-full">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText
                  id="street"
                  v-model.trim="data.mailing_address.street"
                  placeholder="Street"
                  fluid
                />
              </div>
              <div v-if="!data.same_as_shipping" class="w-full">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText
                  id="city"
                  v-model.trim="data.mailing_address.city"
                  placeholder="City"
                  fluid
                />
              </div>
              <div v-if="!data.same_as_shipping" class="w-full">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText
                  id="state"
                  v-model.trim="data.mailing_address.state"
                  placeholder="State"
                  fluid
                />
              </div>
              <div v-if="!data.same_as_shipping" class="w-full">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText
                  id="zip"
                  v-model.trim="data.mailing_address.zip"
                  placeholder="Zip"
                  fluid
                />
              </div>
              <div v-if="!data.same_as_shipping" class="w-full">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  v-model.trim="data.mailing_address.country"
                  placeholder="Country"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="sameAddress" class="block font-bold mb-3"
                  >Same As Shipping Address</label
                >
                <ToggleSwitch v-model="data.same_as_shipping" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveForm" />
      </template>
    </Dialog>
    <!-- delete form -->
    <Dialog v-model:visible="deleteDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="data">
          Are you sure you want to delete <b>{{ data.email }} </b>?
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
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import InputNumber from 'primevue/inputnumber';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';

const router = useRouter();
const data: Ref = ref({
  defaul_po_days: 7,
  min_order: 0.0,
  pd_fright_amount: 0.0,
  same_as_shipping: false,
  shipping_address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  },
  mailing_address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  }
});
const submitted: Ref = ref({});
const addDialog: Ref = ref(false);
const deleteDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
const deleteId: Ref = ref();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/suppliers');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
  contact: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || '',
    email: filters.value.email.value || '',
    phone: filters.value.phone.value || '',
    contact: filters.value.contact.value || ''
  };
  getList(searchParams.value);
};
// Debounce fetchList by 2 seconds
const debouncedFetchList = debounce(fetchList, 1000);

// Watch filters and call the debounced function when they change
watch(filters, debouncedFetchList, { deep: true });

onMounted(() => {
  console.log(data.value.shippingAddress);
  fetchList();
});

function openAddDialog() {
  dialogHeader.value = 'Add Supplier';
  submitted.value = false;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit Supplier';
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
  fetchList();
}

const saveForm = () => {
  submitted.value = true;
  if (data?.value.id) {
    updateRecordApi(`/suppliers/${data.value.id}`, data.value).then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    });
  } else {
    createRecordApi('/suppliers', data.value).then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    });
  }
  addDialog.value = false;
  data.value = {
    defaul_po_days: 7,
    min_order: 0.0,
    sameAsShipping: false,
    pd_fright_amount: 0.0,
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    mailingAddress: { street: '', city: '', state: '', zip: '', country: '' }
  };
};

function handleDelete() {
  deleteRecordApi(`/suppliers/${deleteId.value}`)
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
