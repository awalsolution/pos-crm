import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@src/router/constant';

const routes: RouteRecordRaw[] = [
  {
    path: '/vendor',
    component: DashboardLayout,
    meta: {
      title: 'Management',
      permissions: ['management menu'],
      sort: 2
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
        path: '/products',
        name: 'products',
        redirect: '/products/list',
        meta: {
          title: 'Products',
          icon: 'pi pi-shopping-bag',
          permissions: ['product menu']
        },
        children: [
          {
            path: '/products/list',
            name: 'products-list',
            meta: {
              title: 'Products',
              icon: 'pi pi-briefcase',
              permissions: ['product menu']
            },
            component: () => import('@src/views/product/index.vue')
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
