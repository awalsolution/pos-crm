import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@src/router/constant';

const routes: RouteRecordRaw[] = [
  {
    path: '/vendor',
    component: DashboardLayout,
    meta: {
      title: 'Management',
      permissions: ['dashboard menu'],
      sort: 1
    },
    children: [
      {
        path: '/vendor',
        name: 'vendor',
        meta: {
          title: 'Vendor',
          icon: 'pi pi-user',
          permissions: ['dashboard menu']
        },
        component: () => import('@src/views/vendor/index.vue')
      },
      {
        path: '/vendor/:vendor_id/edit',
        name: 'vendor_edit',
        meta: {
          title: 'Edit Vendor',
          permissions: ['user update'],
          hidden: true
        },
        component: () => import('@src/components/vendor/EditVendor.vue')
      }
    ]
  }
];

export default routes;
