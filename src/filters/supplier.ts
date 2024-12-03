import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash-es';

export function useSupplierfilter() {
  const suppliers: any = ref([]);
  const supplierLoading = ref(false);
  const suppliersInitialized = ref(false);

  async function findSupplier(query: any) {
    if (isEmpty(query)) {
      suppliers.value = [];
    } else {
      supplierLoading.value = true;
      const response: any = await getRecordsApi('/suppliers', {
        name: query
      });
      suppliers.value = response.data;
      supplierLoading.value = false;
    }
  }

  async function getSuppliers() {
    supplierLoading.value = true;
    const response: any = await getRecordsApi('/suppliers');
    suppliers.value = response.data;
    supplierLoading.value = false;
  }

  async function getSuppliersOnFocus() {
    if (!suppliersInitialized.value) {
      await getSuppliers();
      suppliersInitialized.value = true;
    }
  }

  return {
    suppliers,
    supplierLoading,
    suppliersInitialized,
    findSupplier,
    getSuppliers,
    getSuppliersOnFocus
  };
}
