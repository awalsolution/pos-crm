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
      <Form
        v-slot="$form: any"
        :resolver="resolver"
        :initialValues="formValues"
        @submit="onFormSubmit"
      >
        <div class="grid grid-cols-3 gap-5">
          <div class="flex flex-col gap-1">
            <label for="name" class="block font-semibold mb-1">Name</label>
            <InputText id="name" name="name" placeholder="Enter name" variant="filled" fluid />
            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
              {{ $form.name.error?.message }}
            </Message>
          </div>

          <div class="flex flex-col gap-1">
            <label for="contact" class="block font-bold mb-1">Contact</label>
            <InputText
              id="contact"
              name="contact"
              placeholder="Enter Contact"
              variant="filled"
              fluid
            />
            <Message v-if="$form.contact?.invalid" severity="error" size="small" variant="simple">
              {{ $form.contact.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="phone" class="block font-bold mb-1">Phone</label>
            <InputText id="phone" name="phone" placeholder="Enter Phone" variant="filled" fluid />
            <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
              {{ $form.phone.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="email" class="block font-bold mb-1">Email</label>
            <InputText id="email" name="email" placeholder="Enter Email" variant="filled" fluid />
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
              {{ $form.email.error?.message }}
            </Message>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="2xl:col-span-1 col-span-2">
            <Divider align="center" type="dotted" class="2xl:col-span-1 col-span-2">
              Shipping Address
            </Divider>
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col gap-1">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText
                  id="street"
                  name="shipping_address.street"
                  placeholder="Enter Street"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.street.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText
                  id="city"
                  name="shipping_address.city"
                  placeholder="Enter City"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.city.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText
                  id="state"
                  name="shipping_address.state"
                  placeholder="Enter State"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.state.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText
                  id="zip"
                  name="shipping_address.zip"
                  placeholder="Enter Zip"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.zip.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  name="shipping_address.country"
                  placeholder="Enter Country"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.country.error?.message }}
                </Message>
              </div>
            </div>
          </div>

          <div class="2xl:col-span-1 col-span-2">
            <Divider align="center" type="dotted" class="2xl:col-span-1 col-span-2">
              Mailing Address
            </Divider>
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col gap-1">
                <label for="street" class="block font-bold mb-3">Street</label>
                <InputText
                  id="street"
                  name="mailing_address.street"
                  placeholder="Enter Street"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.street.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label for="city" class="block font-bold mb-3">City</label>
                <InputText
                  id="city"
                  name="mailing_address.city"
                  placeholder="Enter City"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.city.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label for="state" class="block font-bold mb-3">State</label>
                <InputText
                  id="state"
                  name="mailing_address.state"
                  placeholder="Enter State"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.state.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label for="zip" class="block font-bold mb-3">Zip</label>
                <InputText
                  id="zip"
                  name="mailing_address.zip"
                  placeholder="Enter Zip"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.zip.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-1">
                <label for="country" class="block font-bold mb-3">Country</label>
                <InputText
                  id="country"
                  name="mailing_address.country"
                  placeholder="Enter Country"
                  fluid
                  variant="filled"
                />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.country.error?.message }}
                </Message>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <Button type="submit" severity="primary" label="Save" class="mt-5" />
        </div>
      </Form>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { createRecordApi } from '@src/api/endpoints';
import { InputText, Divider, Button, Card, ToggleSwitch, Message, ChipStyle } from 'primevue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { z } from 'zod';

const router = useRouter();
const formValues = ref({});

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string({ message: 'Name is required!' }),
      contact: z.string({ message: 'Contact is required!' }),
      phone: z.string({ message: 'Phonee is required!' }),
      email: z.string({ message: 'Email is required!' }),
      'shipping_address.street': z.string({ message: 'Street is required!' }),
      'shipping_address.city': z.string({ message: 'City is required!' }),
      'shipping_address.state': z.string({ message: 'State is required!' }),
      'shipping_address.zip': z.string({ message: 'Zip is required!' }),
      'shipping_address.country': z.string({ message: 'Country is required!' }),
      'mailing_address.street': z.string().optional(),
      'mailing_address.city': z.string().optional(),
      'mailing_address.state': z.string().optional(),
      'mailing_address.zip': z.string().optional(),
      'mailing_address.country': z.string().optional(),
      status: z.number().optional()
    })
  )
);

const onFormSubmit = async ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    const res: any = await createRecordApi('/suppliers', values);
    window.toast('success', 'Supplier Information', res.message);
    router.push({ name: 'supplier_list' });
  }
};
</script>

<style lang="scss" scoped></style>
