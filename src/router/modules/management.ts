import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@src/router/constant';

const routes: RouteRecordRaw[] = [
  {
    path: '/supplier',
    component: DashboardLayout,
    meta: {
      title: 'Management',
      permissions: ['management menu'],
      sort: 2
    },
    children: [
      {
        path: '/supplier',
        name: 'supplier',
        redirect: '/supplier/list',
        meta: {
          title: 'Supplier',
          icon: 'pi pi-user',
          permissions: ['supplier menu']
        },
        children: [
          {
            path: '/supplier/list',
            name: 'supplier_list',
            meta: {
              title: 'Supplier List',
              icon: 'pi pi-user',
              permissions: ['supplier menu']
            },
            component: () => import('@src/views/supplier/index.vue')
          },
          {
            path: '/supplier/add',
            name: 'supplier_add',
            meta: {
              title: 'Add Supplier',
              icon: 'pi pi-user',
              permissions: ['supplier create']
            },
            component: () => import('@src/components/supplier/AddSupplier.vue')
          },
          {
            path: '/supplier/:supplier_id/edit',
            name: 'supplier_edit',
            meta: {
              title: 'Edit Supplier',
              permissions: ['supplier update'],
              hidden: true
            },
            component: () => import('@src/components/supplier/EditSupplier.vue')
          }
        ]
      },

      {
        path: '/customer',
        name: 'customer',
        meta: {
          title: 'Customer',
          icon: 'pi pi-users',
          permissions: ['customer menu']
        },
        component: () => import('@src/views/customer/index.vue')
      },
      {
        path: '/purchase',
        name: 'purchase',
        meta: {
          title: 'Purchase',
          icon: 'pi pi-shopping-cart',
          permissions: ['purchase menu']
        },
        children: [
          {
            path: '/purchase/list',
            name: 'purchase_list',
            meta: {
              title: 'Purchase List',
              icon: 'pi pi-shopping-cart',
              permissions: ['purchase menu']
            },
            component: () => import('@src/views/purchase/index.vue')
          }
        ]
      },
      {
        path: '/products',
        name: 'products',
        meta: {
          title: 'Products',
          icon: 'pi pi-shopping-bag',
          permissions: ['product menu']
        },
        children: [
          {
            path: '/products/list',
            name: 'products_list',
            meta: {
              title: 'Products List',
              icon: 'pi pi-briefcase',
              permissions: ['product menu']
            },
            component: () => import('@src/views/product/index.vue')
          },
          {
            path: '/products/add',
            name: 'products_add',
            meta: {
              title: 'Add Product',
              icon: 'pi pi-briefcase',
              permissions: ['product create']
            },
            component: () => import('@src/components/product/AddProduct.vue')
          },
          {
            path: '/products/edit/:product_id',
            name: 'products_edit',
            meta: {
              title: 'Edit Product',
              icon: 'pi pi-briefcase',
              permissions: ['product update'],
              hidden: true
            },
            component: () => import('@src/components/product/EditProduct.vue')
          },
          {
            path: '/product-categories',
            name: 'product-categories',
            meta: {
              title: 'Categories',
              icon: 'pi pi-briefcase',
              permissions: ['product category menu']
            },
            component: () => import('@src/views/product_categories/index.vue')
          }
        ]
      }
    ]
  }
];

export default routes;
