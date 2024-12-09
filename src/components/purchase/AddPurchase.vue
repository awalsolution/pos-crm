<template>
  <Card>
    <template #content>
      <Divider
        align="center"
        type="dashed"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0 0 2rem 0' } }"
      >
        <b class="text-xl">Add Purchase</b>
      </Divider>
      <div class="flex flex-col gap-1 mb-3">
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
          rows="5"
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
      <div class="flex justify-end mt-3">
        <Button label="Save" icon="pi pi-check" @click="handleSubmit" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { createRecordApi } from '@src/api/endpoints';
import { useSupplierfilter } from '@src/filters/supplier';
import { Select, Textarea, Divider, Button, Card, Message } from 'primevue';

const router = useRouter();
const submitted: Ref = ref(false);
const { suppliers, getSuppliers } = useSupplierfilter();
const formValues: Ref = ref({});

const handleSubmit = async () => {
  submitted.value = true;
  if (formValues.value.supplier_id !== undefined) {
    const res: any = await createRecordApi('/purchases', formValues.value);
    window.toast('success', 'Purchase Information', res.message);
    router.push({ name: 'purchase_list' });
    formValues.value = {};
  }
};

onMounted(async () => {
  await getSuppliers();
});
</script>

<style lang="scss" scoped></style>
