import { ErrorPage, RedirectName, DashboardLayout } from '@src/router/constant';
import type { RouteRecordRaw } from 'vue-router';

// 404 on a page
export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: DashboardLayout,
  meta: {
    title: 'Error Page'
  },
  children: [
    {
      path: 'child',
      name: 'ErrorPageChild',
      component: ErrorPage,
      meta: {
        title: 'Error Page Child'
      }
    }
  ]
};

export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  name: RedirectName,
  component: DashboardLayout,
  meta: {
    title: RedirectName,
    dismissTab: true
  },
  children: [
    {
      path: ':path(.*)',
      name: `${RedirectName}Child`,
      component: () => import('@src/views/common/redirect/index.vue'),
      meta: {
        title: 'Redirect Child',
        dismissTab: true
      }
    }
  ]
};
