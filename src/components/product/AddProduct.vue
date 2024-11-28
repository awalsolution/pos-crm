<template>
  <Card>
    <template #content>
      <Divider
        align="center"
        type="dashed"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0 0 2rem 0' } }"
      >
        <b class="text-xl">Add Product</b>
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
            <InputText id="name" name="name" placeholder="Enter Name" variant="filled" fluid />
            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
              {{ $form.name.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="weight" class="block font-semibold mb-1">weight</label>
            <InputText
              id="weight"
              name="weight"
              placeholder="Enter Weight"
              variant="filled"
              fluid
            />
            <Message v-if="$form.weight?.invalid" severity="error" size="small" variant="simple">
              {{ $form.weight.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="description" class="block font-semibold mb-1">description</label>
            <InputText
              id="description"
              name="description"
              placeholder="Enter description"
              variant="filled"
              fluid
            />
            <Message
              v-if="$form.description?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.description.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="reminder" class="block font-semibold mb-1">reminder</label>
            <InputText
              id="reminder"
              name="reminder"
              placeholder="Enter reminder"
              variant="filled"
              fluid
            />
            <Message v-if="$form.reminder?.invalid" severity="error" size="small" variant="simple">
              {{ $form.reminder.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="location" class="block font-semibold mb-1">location</label>
            <InputText
              id="location"
              name="location"
              placeholder="Enter location"
              variant="filled"
              fluid
            />
            <Message v-if="$form.location?.invalid" severity="error" size="small" variant="simple">
              {{ $form.location.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="manufacture" class="block font-semibold mb-1">manufacture</label>
            <InputText
              id="manufacture"
              name="manufacture"
              placeholder="Enter manufacture"
              variant="filled"
              fluid
            />
            <Message
              v-if="$form.manufacture?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.manufacture.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="base_price" class="block font-semibold mb-1">base_price</label>
            <InputNumber
              inputId="base_price"
              name="base_price"
              placeholder="Enter base_price"
              variant="filled"
              fluid
            />
            <Message
              v-if="$form.base_price?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.base_price.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="list_price" class="block font-semibold mb-1">list_price</label>
            <InputNumber
              inputId="list_price"
              name="list_price"
              placeholder="Enter list_price"
              variant="filled"
              fluid
            />
            <Message
              v-if="$form.list_price?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.list_price.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="discount" class="block font-semibold mb-1">discount</label>
            <InputNumber
              inputId="discount"
              name="discount"
              placeholder="Enter discount"
              variant="filled"
              fluid
            />
            <Message v-if="$form.discount?.invalid" severity="error" size="small" variant="simple">
              {{ $form.discount.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="min_qty" class="block font-semibold mb-1">min_qty</label>
            <InputNumber
              inputId="min_qty"
              name="min_qty"
              placeholder="Enter min_qty"
              variant="filled"
              fluid
            />
            <Message v-if="$form.min_qty?.invalid" severity="error" size="small" variant="simple">
              {{ $form.min_qty.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="target_qty" class="block font-semibold mb-1">target_qty</label>
            <InputNumber
              inputId="target_qty"
              name="target_qty"
              placeholder="Enter target_qty"
              variant="filled"
              fluid
            />
            <Message
              v-if="$form.target_qty?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.target_qty.error?.message }}
            </Message>
          </div>
        </div>
      </Form>
    </template>
    <!-- <template #footer>
      <div class="flex gap-4 mt-3 justify-end">
        <Button label="Save" @click="onFormSubmit" />
      </div>
    </template> -->
  </Card>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { createRecordApi } from '@src/api/endpoints';
import { InputText, Divider, Button, Card, InputNumber } from 'primevue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { z } from 'zod';

const router = useRouter();

const formValues = ref({});

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string({ message: 'Name is required!' }),
      weight: z.string({ message: 'Weight is required!' }),
      description: z.string({ message: 'description is required!' }),
      reminder: z.string({ message: 'reminder is required!' }),
      location: z.string({ message: 'location is required!' }),
      manufacture: z.string({ message: 'manufacture is required!' }),
      base_price: z.number({ message: 'base_price is required!' }),
      list_price: z.number({ message: 'list_price is required!' }),
      discount: z.number({ message: 'discount is required!' }),
      min_qty: z.number({ message: 'min_qty is required!' }),
      target_qty: z.number({ message: 'target_qty is required!' })
    })
  )
);

const onFormSubmit = ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    createRecordApi('/products', values).then((res: any) => {
      window.toast('success', 'Product Information', res.message);
      router.push({ name: 'products_list' });
    });
  }
};
</script>

<style lang="scss" scoped></style>
