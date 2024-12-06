<template>
  <Card>
    <template #content>
      <Divider
        align="center"
        type="dashed"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0 0 2rem 0' } }"
      >
        <b class="text-xl">Add Supplier</b>
      </Divider>
      <div class="flex flex-col gap-6">
        <div class="flex gap-5">
          <div class="w-full">
            <label for="name" class="block font-bold mb-3">Name</label>
            <InputText
              id="name"
              v-model.trim="formValues.name"
              :invalid="submitted && !formValues.name"
              placeholder="Enter name"
              fluid
            />
            <Message
              v-if="submitted && !formValues.name"
              severity="error"
              size="small"
              variant="simple"
            >
              Name is required!
            </Message>
          </div>
          <div class="w-full">
            <label for="contact" class="block font-bold mb-3">Contact</label>
            <InputText
              id="contact"
              v-model.trim="formValues.contact"
              :invalid="submitted && !formValues.contact"
              placeholder="Enter contact"
              fluid
            />
            <Message
              v-if="submitted && !formValues.contact"
              severity="error"
              size="small"
              variant="simple"
            >
              Contact is required!
            </Message>
          </div>
          <div class="w-full">
            <label for="phone" class="block font-bold mb-3">Phone</label>
            <InputText
              id="phone"
              v-model.trim="formValues.phone"
              :invalid="submitted && !formValues.phone"
              placeholder="Enter phone"
              fluid
            />
            <Message
              v-if="submitted && !formValues.phone"
              severity="error"
              size="small"
              variant="simple"
            >
              Phone is required!
            </Message>
          </div>
          <div class="w-full">
            <label for="email" class="block font-bold mb-3">Email</label>
            <InputText
              id="email"
              v-model.trim="formValues.email"
              :invalid="submitted && !formValues.email"
              placeholder="Enter email"
              fluid
            />
            <Message
              v-if="submitted && !formValues.email"
              severity="error"
              size="small"
              variant="simple"
            >
              Email is required!
            </Message>
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
                  v-model.trim="formValues.shipping_address.street"
                  :invalid="submitted && !formValues.shipping_address.street"
                  placeholder="Enter street"
                  fluid
                />
                <Message
                  v-if="submitted && !formValues.shipping_address.street"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  Street is required!
                </Message>
              </div>
              <div class="w-full">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText
                  id="city"
                  v-model.trim="formValues.shipping_address.city"
                  :invalid="submitted && !formValues.shipping_address.city"
                  placeholder="Enter city"
                  fluid
                />
                <Message
                  v-if="submitted && !formValues.shipping_address.city"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  City is required!
                </Message>
              </div>
              <div class="w-full">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText
                  id="state"
                  v-model="formValues.shipping_address.state"
                  placeholder="Enter state"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText
                  id="zip"
                  v-model="formValues.shipping_address.zip"
                  placeholder="Enter zip"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  v-model="formValues.shipping_address.country"
                  placeholder="Enter country"
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
              <div v-if="!formValues.same_as_shipping" class="w-full">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText
                  id="street"
                  v-model="formValues.mailing_address.street"
                  placeholder="Enter street"
                  fluid
                />
              </div>
              <div v-if="!formValues.same_as_shipping" class="w-full">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText
                  id="city"
                  v-model="formValues.mailing_address.city"
                  placeholder="Enter city"
                  fluid
                />
              </div>
              <div v-if="!formValues.same_as_shipping" class="w-full">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText
                  id="state"
                  v-model="formValues.mailing_address.state"
                  placeholder="Enter state"
                  fluid
                />
              </div>
              <div v-if="!formValues.same_as_shipping" class="w-full">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText
                  id="zip"
                  v-model="formValues.mailing_address.zip"
                  placeholder="Enter zip"
                  fluid
                />
              </div>
              <div v-if="!formValues.same_as_shipping" class="w-full">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  v-model="formValues.mailing_address.country"
                  placeholder="Enter country"
                  fluid
                />
              </div>
              <div class="w-full">
                <label for="sameAddress" class="block font-bold mb-3">
                  Same As Shipping Address
                </label>
                <ToggleSwitch v-model="formValues.same_as_shipping" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <Button label="Save" icon="pi pi-check" @click="handleSubmit" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { createRecordApi } from '@src/api/endpoints';
import { InputText, Divider, Button, Card, ToggleSwitch, Message } from 'primevue';

const router = useRouter();
const submitted: Ref = ref(false);

const formValues: Ref = ref({
  name: '',
  contact: '',
  phone: '',
  email: '',
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

const handleSubmit = async () => {
  submitted.value = true;
  if (formValues?.value.name !== undefined) {
    const res: any = await createRecordApi('/suppliers', formValues.value);
    window.toast('success', 'Supplier Information', res.message);
    router.push({ name: 'supplier_list' });
  }
};
</script>

<style lang="scss" scoped></style>
