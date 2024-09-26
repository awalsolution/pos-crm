import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useInventoryCategoryfilter() {
  const inventoryCategories: any = ref([]);
  const inventoryCategorieLoading = ref(false);
  const inventoryCategoriesInitialized = ref(false);

  async function findInventoryCategorie(query: any) {
    if (isEmpty(query)) {
      inventoryCategories.value = [];
    } else {
      inventoryCategorieLoading.value = true;
      const response: any = await getRecordsApi('/inventory-categories', {
        name: query
      });
      inventoryCategories.value = response.data;
      inventoryCategorieLoading.value = false;
    }
  }

  async function getInventoryCategories() {
    inventoryCategorieLoading.value = true;
    const response: any = await getRecordsApi('/inventory-categories');
    inventoryCategories.value = response.data;
    inventoryCategorieLoading.value = false;
  }

  async function getInventoryCategoriesOnFocus() {
    if (!inventoryCategoriesInitialized.value) {
      await getInventoryCategories();
      inventoryCategoriesInitialized.value = true;
    }
  }

  return {
    inventoryCategories,
    inventoryCategorieLoading,
    inventoryCategoriesInitialized,
    findInventoryCategorie,
    getInventoryCategories,
    getInventoryCategoriesOnFocus
  };
}
