<template>
  <div class="grid grid-cols-2 gap-5">
    <Divider
      class="col-span-2"
      align="center"
      type="dashed"
      :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0' } }"
    >
      <b class="text-xl">Edit Purchase</b>
    </Divider>
    <Card>
      <template #content>
        <Divider
          align="center"
          type="dashed"
          :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0' } }"
        >
          <b class="text-xl">Edit General Information</b>
        </Divider>
        <div class="grid grid-cols-2 gap-5">
          <div class="flex flex-col gap-1">
            <label for="supplier_id" class="block font-semibold mb-1"> Select Supplier </label>
            <Select
              inputId="supplier_id"
              v-model.number="generalInfo.supplier_id"
              :invalid="generalInfoSubmitted && !generalInfo.supplier_id"
              :options="suppliers"
              option-label="name"
              option-value="id"
              placeholder="Select supplier"
              variant="filled"
              fluid
            />
            <Message
              v-if="generalInfoSubmitted && !generalInfo.supplier_id"
              severity="error"
              size="small"
              variant="simple"
            >
              Supplier is required
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label class="block font-semibold mb-1">Notes</label>
            <Textarea
              v-model.trim="generalInfo.notes"
              :invalid="generalInfoSubmitted && !generalInfo.notes"
              rows="1"
              cols="30"
              placeholder="Enter Notes"
              variant="filled"
              fluid
            />
            <Message
              v-if="generalInfoSubmitted && !generalInfo.notes"
              severity="error"
              size="small"
              variant="simple"
            >
              Notes is required
            </Message>
          </div>
        </div>
        <div class="flex justify-end mt-3">
          <Button label="Save" icon="pi pi-save" @click="handlePurchaseGeneralInfoUpdate" />
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <Divider
          align="center"
          type="dashed"
          :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0' } }"
        >
          <b class="text-xl">Edit Status</b>
        </Divider>
        <div class="flex flex-col gap-1 mb-3">
          <label for="status" class="block font-semibold mb-1"> Select Status </label>
          <Select
            inputId="status"
            v-model.trim="formStaus.status"
            :invalid="statusSubmitted && !formStaus.status"
            :options="statusOptions"
            option-label="label"
            option-value="key"
            placeholder="Select Status"
            variant="filled"
            fluid
          />
          <Message
            v-if="statusSubmitted && !formStaus.status"
            severity="error"
            size="small"
            variant="simple"
          >
            Status is required
          </Message>
        </div>
        <div class="flex justify-end mt-3">
          <Button label="Save" icon="pi pi-save" @click="handleStatusUpdate" />
        </div>
      </template>
    </Card>
  </div>
  <div class="mt-5">
    <Divider
      align="center"
      type="dashed"
      :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '15px 0' } }"
    >
      <b class="text-xl">Purchase Items List</b>
    </Divider>
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center w-1/3">
        <Select
          filter
          :dt="{ root: { borderRadius: '25px 0px 0px 25px' } }"
          v-model.number="data.products"
          :options="products"
          option-label="name"
          placeholder="Search Products"
          variant="filled"
          class="flex-1"
          @focus="getProductsOnFocus"
        />
        <Button
          @click="handleAddPurchaseItem"
          class="rounded-none"
          :dt="{ root: { borderRadius: '0px 25px 25px 0px' } }"
          severity="primary"
          icon="pi pi-save"
          v-permission="{ action: ['purchase create'] }"
        />
      </div>
      <Button
        @click="handleSavePurchaseItem"
        severity="primary"
        label="Save Purchase"
        icon="pi pi-save"
        v-permission="{ action: ['purchase create'] }"
      />
    </div>
    <DataTable :value="purchaseItems" stripedRows>
      <template #empty> Purchase Items Not found. </template>
      <Column field="name" header="Product Name" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.products?.name }}
        </template>
      </Column>
      <Column field="ordered_qty" header="Ordered Quantity" class="whitespace-nowrap">
        <template #body="{ data }">
          <InputNumber
            inputId="ordered_qty"
            v-model.number="data.ordered_qty"
            variant="filled"
            fluid
          />
        </template>
      </Column>
      <Column field="recevied_qty" header="Recevied Quantity" class="whitespace-nowrap">
        <template #body="{ data }">
          <InputNumber
            inputId="recevied_qty"
            v-model.number="data.recevied_qty"
            variant="filled"
            fluid
          />
        </template>
      </Column>
      <Column field="cost_price" header="Cost Price" class="whitespace-nowrap">
        <template #body="{ data }">
          <InputNumber
            inputId="cost_price"
            v-model.number="data.cost_price"
            variant="filled"
            fluid
          />
        </template>
      </Column>
      <Column field="list_price" header="List Price" class="whitespace-nowrap">
        <template #body="{ data }">
          <InputNumber
            inputId="list_price"
            v-model.number="data.list_price"
            variant="filled"
            fluid
          />
        </template>
      </Column>
      <Column field="sale_price" header="Sale Price" class="whitespace-nowrap">
        <template #body="{ data }">
          <InputNumber
            inputId="sale_price"
            v-model.number="data.sale_price"
            variant="filled"
            fluid
          />
        </template>
      </Column>
      <Column field="total_amount" header="Total Amount" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.total_amount }}
        </template>
      </Column>
      <Column field="created_at" header="Created At" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column header="Actions" class="whitespace-nowrap" v-if="hasPermission(['purchase delete'])">
        <template #body="{ data }">
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
        <span> Are you sure you want to delete ? </span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  createRecordApi,
  deleteRecordApi,
  getRecordApi,
  updateRecordApi
} from '@src/api/endpoints';
import { useSupplierfilter } from '@src/filters/supplier';
import { useProductfilter } from '@src/filters/product';
import { usePermission } from '@src/hooks/permission/usePermission';
import {
  Select,
  Textarea,
  Divider,
  Button,
  Card,
  Message,
  DataTable,
  Column,
  Dialog,
  InputNumber
} from 'primevue';

const router = useRouter();
const route = useRoute();
const { suppliers, getSuppliers } = useSupplierfilter();
const { products, getProducts, getProductsOnFocus } = useProductfilter();
const { hasPermission } = usePermission();
const purchasId: Ref = ref();
const generalInfoSubmitted: Ref = ref(false);
const generalInfo: Ref = ref({});
const statusSubmitted: Ref = ref(false);
const formStaus: Ref = ref({});
const purchaseItems: Ref = ref([]);

const findPurchase = async () => {
  const res: any = await getRecordApi(`/purchases/${purchasId.value}`);
  generalInfo.value = res?.data;
};

const findPurchaseItems = async () => {
  const res: any = await getRecordApi(`/purchases/items/list/${purchasId.value}`);
  purchaseItems.value = res?.data;
};

onMounted(async () => {
  purchasId.value = route.params.purchase_id;
  await findPurchase();
  await getSuppliers();
  await findPurchaseItems();
});

// update purchase general informations
const handlePurchaseGeneralInfoUpdate = async () => {
  generalInfoSubmitted.value = true;
  if (generalInfo?.value.supplier_id !== undefined) {
    const res: any = await updateRecordApi(`/purchases/${purchasId.value}`, generalInfo.value);
    window.toast('success', 'Purchase General Information', res.message);
  }
};

// update purchase status
const handleStatusUpdate = async () => {
  statusSubmitted.value = true;
  if (formStaus?.value.status !== undefined) {
    const res: any = await updateRecordApi(`/purchases/status/${purchasId.value}`, formStaus.value);
    window.toast('success', 'Purchase Status Information', res.message);
  }
};

const statusOptions = [
  { key: 'darft', label: 'Darft' },
  { key: 'pending', label: 'Pending' },
  { key: 'proceeding', label: 'Proceeding' },
  { key: 'completed', label: 'Completed' }
];

// add and update purchase item
const data: Ref = ref({});
const deleteDialog: Ref = ref(false);
const deleteId: Ref = ref();

const handleAddPurchaseItem = async () => {
  purchaseItems.value.push(data.value);
};

const handleSavePurchaseItem = async () => {
  if (purchaseItems.value !== undefined) {
    const res: any = await createRecordApi(`/purchases/items/${purchasId.value}`, {
      purchase_items: purchaseItems.value
    });
    window.toast('success', 'Add Purchase Item Information', res.message);
    await findPurchaseItems();
  }
};

// delete purchase item
const openDeleteDialog = (item: any) => {
  deleteId.value = item.id;
  deleteDialog.value = true;
};

const handleDelete = async () => {
  const res: any = await deleteRecordApi(`/purchases/items/${deleteId.value}`);
  window.toast('success', 'Purchase Item Information', res.message);
  await findPurchaseItems();
  deleteDialog.value = false;
  deleteId.value = null;
};
</script>

<style lang="scss" scoped></style>
