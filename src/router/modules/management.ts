import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@src/router/constant';

const routes: RouteRecordRaw[] = [
  {
    path: '/vendor',
    component: DashboardLayout,
    meta: {
      title: 'Management',
      permissions: ['management menu'],
      sort: 1
    },
    children: [
      {
        path: '/vendor',
        name: 'vendor',
        meta: {
          title: 'Vendor',
          icon: 'pi pi-user',
          permissions: ['vendor menu']
        },
        component: () => import('@src/views/vendor/index.vue')
      },
      {
        path: '/vendor/:vendor_id/edit',
        name: 'vendor_edit',
        meta: {
          title: 'Edit Vendor',
          permissions: ['vendor update'],
          hidden: true
        },
        component: () => import('@src/components/vendor/EditVendor.vue')
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
      // {
      //   path: '/customer/:customer_id/edit',
      //   name: 'customer_edit',
      //   meta: {
      //     title: 'Edit Customer',
      //     permissions: ['customer update'],
      //     hidden: true
      //   },
      //   component: () => import('@src/components/customer/EditCustomer.vue')
      // },
      {
        path: '/purchase',
        name: 'purchase',
        meta: {
          title: 'Purchase',
          icon: 'pi pi-shopping-cart',
          permissions: ['purchase menu']
        },
        component: () => import('@src/views/purchase/index.vue')
      },
      {
        path: '/inventories',
        name: 'inventories',
        meta: {
          title: 'Inventory',
          icon: 'pi pi-shopping-bag',
          permissions: ['inventory menu']
        },
        component: () => import('@src/views/inventory/index.vue')
      },
      {
        path: '/inventory-categories',
        name: 'inventory_categories',
        meta: {
          title: 'Inventory Categories',
          icon: 'pi pi-briefcase',
          permissions: ['inventoryCategory menu']
        },
        component: () => import('@src/views/inventory_category/index.vue')
      }
    ]
  }
];

export default routes;
