<template>
  <Card>
    <template #content>
      <Divider
        align="center"
        type="dotted"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0 0 2rem 0' } }"
      >
        <b class="text-xl">Organization Information</b>
      </Divider>
      <div class="flex flex-col gap-6">
        <div class="flex gap-5">
          <div class="w-full">
            <label for="name" class="block font-bold mb-3">Name</label>
            <InputText id="name" v-model.trim="data.name" placeholder="Name" fluid />
            <!-- <small v-if="submitted && !data.name" class="text-red-500"> Name is required. </small> -->
          </div>
          <div class="w-full">
            <label for="contact" class="block font-bold mb-3">Contact</label>
            <InputText id="contact" v-model.trim="data.contact" placeholder="Contect" fluid />
            <!-- <small v-if="submitted && !data.first_name" class="text-red-500">
              Contact is required.
            </small> -->
          </div>
          <div class="w-full">
            <label for="phone" class="block font-bold mb-3">Phone</label>
            <InputText id="phone" v-model.trim="data.phone" placeholder="Phone" fluid />
            <!-- <small v-if="submitted && !data.first_name" class="text-red-500">
              Phone is required.
            </small> -->
          </div>
          <div class="w-full">
            <label for="email" class="block font-bold mb-3">Email</label>
            <InputText id="email" v-model.trim="data.email" placeholder="Email" fluid />
            <!-- <small v-if="submitted && !data.last_name" class="text-red-500">
              Email is required.
            </small> -->
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
        <!-- <div class="grid grid-cols-2 gap-5">
          <div class="2xl:col-span-1 col-span-2">
            <Divider align="center" type="dotted" class="2xl:col-span-1 col-span-2">
              Shipping Address
            </Divider>
            <div class="grid grid-cols-2 gap-3">
              <div class="w-full">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText
                  id="street"
                  v-model="data.shippingAddress.street"
                  placeholder="Street"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText
                  id="city"
                  v-model.trim="data.shippingAddress.city"
                  placeholder="City"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText
                  id="state"
                  v-model.trim="data.shippingAddress.state"
                  placeholder="State"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText
                  id="zip"
                  v-model.trim="data.shippingAddress.zip"
                  placeholder="Zip"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  v-model.trim="data.shippingAddress.country"
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
              <div v-if="!data.sameAsShipping" class="w-full">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText
                  id="street"
                  v-model.trim="data.mailingAddress.street"
                  placeholder="Street"
                  fluid
                />
              </div>
              <div v-if="!data.sameAsShipping" class="w-full">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText
                  id="city"
                  v-model.trim="data.mailingAddress.city"
                  placeholder="City"
                  fluid
                />
              </div>
              <div v-if="!data.sameAsShipping" class="w-full">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText
                  id="state"
                  v-model.trim="data.mailingAddress.state"
                  placeholder="State"
                  fluid
                />
              </div>
              <div v-if="!data.sameAsShipping" class="w-full">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText
                  id="zip"
                  v-model.trim="data.mailingAddress.zip"
                  placeholder="Zip"
                  fluid
                />
              </div>
              <div v-if="!data.sameAsShipping" class="w-full">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  v-model.trim="data.mailingAddress.country"
                  placeholder="Country"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="sameAddress" class="block font-bold mb-3"
                  >Same As Shipping Address</label
                >
                <ToggleSwitch v-model="data.sameAsShipping" />
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="flex gap-5">
          <div class="w-full">
            <label for="status" class="block font-bold mb-3">Status</label>
            <ToggleSwitch id="status" v-model="data.status" :true-value="1" :false-value="0" />
          </div>
        </div> -->
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-3 justify-end">
        <Button label="Cancel" severity="danger" @click="handleCancel" />
        <Button label="Save" @click="saveForm" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';

import ToggleSwitch from 'primevue/toggleswitch';
import InputNumber from 'primevue/inputnumber';
import Divider from 'primevue/divider';
import Button from 'primevue/button';

// const props = defineProps<{ tenantData: any }>();
const route = useRoute();
const router = useRouter();
const data: Ref = ref({});

const saveForm = () => {
  updateRecordApi(`/vendors/${data.value.id}`, data.value).then((res: any) => {
    window.toast('success', 'Vendor Information', res.message);
    router.push({ name: 'vendor' });
  });
  data.value = {};
};

const handleCancel = () => {
  router.push({ name: 'vendor' });
};

onMounted(async () => {
  if (route.params && route.params.vendor_id) {
    const res: any = await getRecordApi(`/vendors/${route.params.vendor_id}`);
    data.value = res?.data;
  } else {
    window.toast('error', 'Error Message', 'Route Params is Wrong!');
    router.replace({ name: 'ErrorPageSon' });
  }
});
</script>

<style lang="scss" scoped></style>
