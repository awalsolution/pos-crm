import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash-es';

export function useCustomerfilter() {
  const customers: any = ref([]);
  const customerLoading = ref(false);
  const customersInitialized = ref(false);

  async function findCustomer(query: any) {
    if (isEmpty(query)) {
      customers.value = [];
    } else {
      customerLoading.value = true;
      const response: any = await getRecordsApi('/customers', {
        name: query
      });
      customers.value = response.data;
      customerLoading.value = false;
    }
  }

  async function getCustomers() {
    customerLoading.value = true;
    const response: any = await getRecordsApi('/customers');
    customers.value = response.data;
    customerLoading.value = false;
  }

  async function getCustomersOnFocus() {
    if (!customersInitialized.value) {
      await getCustomers();
      customersInitialized.value = true;
    }
  }

  return {
    customers,
    customerLoading,
    customersInitialized,
    findCustomer,
    getCustomers,
    getCustomersOnFocus
  };
}
