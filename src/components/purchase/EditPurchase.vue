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
              v-model.number="formValues.supplier_id"
              :invalid="submitted && !formValues.supplier_id"
              :options="suppliers"
              option-label="name"
              option-value="id"
              placeholder="Select supplier"
              variant="filled"
              fluid
            />
            <Message
              v-if="submitted && !formValues.supplier_id"
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
              v-model.trim="formValues.notes"
              :invalid="submitted && !formValues.notes"
              rows="1"
              cols="30"
              placeholder="Enter Notes"
              variant="filled"
              fluid
            />
            <Message
              v-if="submitted && !formValues.notes"
              severity="error"
              size="small"
              variant="simple"
            >
              Notes is required
            </Message>
          </div>
        </div>
        <div class="flex justify-end mt-3">
          <Button label="Save" icon="pi pi-check" @click="handleSubmit" />
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
            v-model.trim="formValues.status"
            :invalid="submitted && !formValues.status"
            :options="statusOptions"
            option-label="label"
            option-value="key"
            placeholder="Select Status"
            variant="filled"
            fluid
          />
          <Message
            v-if="submitted && !formValues.status"
            severity="error"
            size="small"
            variant="simple"
          >
            Status is required
          </Message>
        </div>
        <div class="flex justify-end mt-3">
          <Button label="Save" icon="pi pi-check" @click="handleSubmit" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { useSupplierfilter } from '@src/filters/supplier';
import { Select, Textarea, Divider, Button, Card, Message } from 'primevue';

const router = useRouter();
const route = useRoute();
const { suppliers, getSuppliers } = useSupplierfilter();
const submitted: Ref = ref(false);
const formValues: Ref = ref({});

const findSupplier = async () => {
  const res: any = await getRecordApi(`/purchases/${route.params.purchase_id}`);
  formValues.value = res?.data;
};

onMounted(async () => {
  await findSupplier();
  await getSuppliers();
});

const handleSubmit = async () => {
  submitted.value = true;
  if (formValues?.value.supplier_id !== undefined) {
    const res: any = await updateRecordApi(
      `/purchases/${route.params.purchase_id}`,
      formValues.value
    );
    window.toast('success', 'Purchase Information', res.message);
    router.push({ name: 'purchase_list' });
  }
};

const statusOptions = [
  { key: 'darft', label: 'Darft' },
  { key: 'pending', label: 'Pending' },
  { key: 'proceeding', label: 'Proceeding' },
  { key: 'completed', label: 'Completed' }
];
</script>

<style lang="scss" scoped></style>
