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
            <label for="product_category_id" class="block font-semibold mb-1">
              Select Product Category
            </label>
            <Select
              id="product_category_id"
              name="product_category_id"
              :options="productCategories"
              option-label="name"
              option-value="id"
              placeholder="Select product category"
              variant="filled"
              fluid
            />
            <Message
              v-if="$form.product_category_id?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.product_category_id.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="name" class="block font-semibold mb-1">Name</label>
            <InputText id="name" name="name" placeholder="Enter name" variant="filled" fluid />
            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
              {{ $form.name.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="weight" class="block font-semibold mb-1">Weight</label>
            <InputText
              id="weight"
              name="weight"
              placeholder="Enter weight"
              variant="filled"
              fluid
            />
            <Message v-if="$form.weight?.invalid" severity="error" size="small" variant="simple">
              {{ $form.weight.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="description" class="block font-semibold mb-1">Description</label>
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
            <label for="reminder" class="block font-semibold mb-1">Reminder</label>
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
            <label for="location" class="block font-semibold mb-1">Location</label>
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
            <label for="manufacture" class="block font-semibold mb-1">Manufacture</label>
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
            <label for="base_price" class="block font-semibold mb-1">Base Price</label>
            <InputNumber
              inputId="base_price"
              name="base_price"
              placeholder="Enter base price"
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
            <label for="list_price" class="block font-semibold mb-1">List Price</label>
            <InputNumber
              inputId="list_price"
              name="list_price"
              placeholder="Enter list price"
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
            <label for="discount" class="block font-semibold mb-1">Discount</label>
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
            <label for="min_qty" class="block font-semibold mb-1">Min Quantity</label>
            <InputNumber
              inputId="min_qty"
              name="min_qty"
              placeholder="Enter min quantity"
              variant="filled"
              fluid
            />
            <Message v-if="$form.min_qty?.invalid" severity="error" size="small" variant="simple">
              {{ $form.min_qty.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="target_qty" class="block font-semibold mb-1">Target Quantity</label>
            <InputNumber
              inputId="target_qty"
              name="target_qty"
              placeholder="Enter target quantity"
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
          <div class="flex flex-col gap-1">
            <label for="tax-able" class="block font-bold mb-3">Taxable</label>
            <ToggleSwitch id="tax_able" name="tax_able" :true-value="1" :false-value="0" />
          </div>
          <div class="flex flex-col gap-1">
            <label for="gst" class="block font-bold mb-3">GST</label>
            <ToggleSwitch id="gst" name="gst" :true-value="1" :false-value="0" />
          </div>
          <div class="flex flex-col gap-1">
            <label for="status" class="block font-bold mb-3">Status</label>
            <ToggleSwitch id="status" name="status" :true-value="1" :false-value="0" />
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
import {
  InputText,
  Divider,
  Button,
  Card,
  InputNumber,
  Select,
  ToggleSwitch,
  Message
} from 'primevue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { z } from 'zod';
import { useProductCategoryfilter } from '@src/filters/product_category';

const router = useRouter();
const { productCategories, getProductCategories } = useProductCategoryfilter();
const formValues = ref({});

const resolver = ref(
  zodResolver(
    z.object({
      product_category_id: z.number({ message: 'Product category is required!' }),
      name: z.string({ message: 'Name is required!' }),
      weight: z.string({ message: 'Weight is required!' }),
      description: z.string({ message: 'description is required!' }),
      reminder: z.string({ message: 'reminder is required!' }),
      location: z.string({ message: 'location is required!' }),
      manufacture: z.string({ message: 'manufacture is required!' }),
      base_price: z.number({ message: 'Base price is required!' }),
      list_price: z.number({ message: 'List price is required!' }),
      discount: z.number({ message: 'discount is required!' }),
      min_qty: z.number({ message: 'Min qty is required!' }),
      target_qty: z.number({ message: 'Target qty is required!' }),
      gst: z.number().optional(),
      tax_able: z.number().optional(),
      status: z.number().optional()
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

onMounted(() => {
  getProductCategories();
});
</script>

<style lang="scss" scoped></style>
