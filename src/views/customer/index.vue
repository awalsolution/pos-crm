<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Customer List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add Customer"
        icon="pi pi-plus"
        v-permission="{ action: ['customer create'] }"
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
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Customers`"
    >
      <template #empty> <div class="text-center">No Customers found.</div> </template>
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
      <Column field="status" header="Status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="guid" header="GUID" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.guid }}
        </template>
      </Column>
      <Column field="max_credit" header="Max Credit" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.max_credit }}
        </template>
      </Column>
      <Column field="tex_category" header="Tex Category" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.tex_category }}
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
        v-permission="{ action: ['customer update', 'customer delete'] }"
        class="whitespace-nowrap"
        alignFrozen="right"
        frozen
      >
        <template #body="{ data }">
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{ action: ['customer update'] }"
          />
          <!-- @click="router.push({ name: 'customer_edit', params: { customer_id: data.id } })" -->
          <Button
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['customer delete'] }"
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
            <InputText
              id="name"
              v-model.trim="data.name"
              :required="true"
              :invalid="submitted && !data.name"
              placeholder="Name"
              fluid
            />
            <small v-if="submitted && !data.name" class="text-red-500"> Name is required. </small>
          </div>
          <div class="w-full">
            <label for="contact" class="block font-bold mb-3">Contact</label>
            <InputText id="contact" v-model.trim="data.contact" placeholder="Contect" fluid />
            <small v-if="submitted && !data.contact" class="text-red-500">
              Contact is required.
            </small>
          </div>
          <div class="w-full">
            <label for="phone" class="block font-bold mb-3">Phone</label>
            <InputText id="phone" v-model.trim="data.phone" placeholder="Phone" fluid />
            <small v-if="submitted && !data.phone" class="text-red-500"> Phone is required. </small>
          </div>
          <div class="w-full">
            <label for="email" class="block font-bold mb-3">Email</label>
            <InputText id="email" v-model.trim="data.email" placeholder="Email" fluid />
            <small v-if="submitted && !data.email" class="text-red-500"> Email is required. </small>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="2xl:col-span-1 col-span-2">
            <Divider align="center" type="dotted" class="2xl:col-span-1 col-span-2">
              Address
            </Divider>
            <div class="grid grid-cols-2 gap-3">
              <div class="w-full">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText id="street" v-model="data.address.street" placeholder="Street" fluid />
              </div>
              <div class="w-full">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText id="city" v-model.trim="data.address.city" placeholder="City" fluid />
              </div>
              <div class="w-full">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText id="state" v-model.trim="data.address.state" placeholder="State" fluid />
              </div>
              <div class="w-full">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText id="zip" v-model.trim="data.address.zip" placeholder="Zip" fluid />
              </div>
              <div class="w-full">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  v-model.trim="data.address.country"
                  placeholder="Country"
                  fluid
                />
              </div>
            </div>
          </div>
          <div class="2xl:col-span-1 col-span-2">
            <Divider align="center" type="dotted" class="2xl:col-span-1 col-span-2">
              Billing Address
            </Divider>
            <div class="grid grid-cols-2 gap-3">
              <div v-if="!data.same_as" class="w-full">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText
                  id="street"
                  v-model.trim="data.billing.street"
                  placeholder="Street"
                  fluid
                />
              </div>
              <div v-if="!data.same_as" class="w-full">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText id="city" v-model.trim="data.billing.city" placeholder="City" fluid />
              </div>
              <div v-if="!data.same_as" class="w-full">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText id="state" v-model.trim="data.billing.state" placeholder="State" fluid />
              </div>
              <div v-if="!data.same_as" class="w-full">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText id="zip" v-model.trim="data.billing.zip" placeholder="Zip" fluid />
              </div>
              <div v-if="!data.same_as" class="w-full">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  v-model.trim="data.billing.country"
                  placeholder="Country"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="sameAddress" class="block font-bold mb-3">Same As Address</label>
                <ToggleSwitch v-model="data.same_as" />
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
// import { useRouter } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';

// const router = useRouter();
const data: Ref = ref({
  same_as: false,
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  },
  billing: {
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
  usePagination('/customers');

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
  fetchList();
});

function openAddDialog() {
  dialogHeader.value = 'Add Customer';
  submitted.value = false;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit Customer';
  data.value = item;
  item?.address?.map((item: any) => {
    console.log(item);
    if (item.type === 'billing') {
      data.value.billing = item;
    }
    if (item.type === 'address') {
      data.value.address = item;
    }
  });

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
    updateRecordApi(`/customers/${data.value.id}`, data.value).then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    });
  } else {
    createRecordApi('/customers', data.value).then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    });
  }
  addDialog.value = false;
  data.value = {
    same_as: false,
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    billing: { street: '', city: '', state: '', zip: '', country: '' }
  };
};

function handleDelete() {
  deleteRecordApi(`/customers/${deleteId.value}`)
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

<!-- <template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Customer List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add Customer"
        icon="pi pi-plus"
        v-permission="{ action: ['custromer create'] }"
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
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Customers`"
    >
      <template #empty> No Customers found. </template>
      <Column field="name" header="Name" :show-filter-menu="false" :showClearButton="false">
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
      <Column field="status" header="status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="created_by" header="Auther">
        <template #body="{ data }">
          {{ data.created_by }}
        </template>
      </Column>
      <Column field="created_at" header="Created At">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column header="Actions" v-permission="{ action: ['customer update', 'customer delete'] }">
        <template #body="{ data }">
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{ action: ['customer update'] }"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['customer delete'] }"
          />
        </template>
      </Column>
    </DataTable>
  
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
import { FilterMatchMode } from '@primevue/core/api';
import ToggleSwitch from 'primevue/toggleswitch';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';

const data: Ref = ref({});
const submitted: Ref = ref({});
const addDialog: Ref = ref(false);
const deleteDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
const deleteId: Ref = ref();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/customers');

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
  dialogHeader.value = 'Add Customer';
  data.value = {};
  submitted.value = false;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit Customer';
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
      updateRecordApi(`/customers/${data.value.id}`, data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    } else {
      createRecordApi('/customers', data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    }
    addDialog.value = false;
    data.value = {};
  }
};

function handleDelete() {
  deleteRecordApi(`/customers/${deleteId.value}`)
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

<style lang="scss" scoped></style> -->
