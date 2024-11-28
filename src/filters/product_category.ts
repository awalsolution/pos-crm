import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useProductCategoryfilter() {
  const productCategories: any = ref([]);
  const productCategorieLoading = ref(false);
  const productCategoriesInitialized = ref(false);

  async function findProductCategorie(query: any) {
    if (isEmpty(query)) {
      productCategories.value = [];
    } else {
      productCategorieLoading.value = true;
      const response: any = await getRecordsApi('/product-categories', {
        name: query
      });
      productCategories.value = response.data;
      productCategorieLoading.value = false;
    }
  }

  async function getProductCategories() {
    productCategorieLoading.value = true;
    const response: any = await getRecordsApi('/product-categories');
    productCategories.value = response.data;
    productCategorieLoading.value = false;
  }

  async function getProductCategoriesOnFocus() {
    if (!productCategoriesInitialized.value) {
      await getProductCategories();
      productCategoriesInitialized.value = true;
    }
  }

  return {
    productCategories,
    productCategorieLoading,
    productCategoriesInitialized,
    findProductCategorie,
    getProductCategories,
    getProductCategoriesOnFocus
  };
}
