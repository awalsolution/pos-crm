import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { Person32Regular } from '@vicons/fluent';
import { renderIcon } from '@/utils/index';

const routeName = 'customer';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/customer',
    name: routeName,
    redirect: `${routeName}/list`,
    component: Layout,
    meta: {
      title: 'Customers',
      icon: renderIcon(Person32Regular),
      permissions: ['can view customers'],
      sort: 4,
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Customer',
          permissions: ['can view customers'],
        },
        component: () => import('@/views/customer/index.vue'),
      },
      {
        path: 'profile/:id',
        name: `${routeName}_profile`,
        meta: {
          title: 'Customer Profile',
          permissions: ['can view customers'],
        },
        component: () => import('@/views/customer/Profile.vue'),
      },
    ],
  },
];

export default routes;
