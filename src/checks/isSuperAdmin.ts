import { useUserStore } from '@src/store/modules/user';

// check for all super admins users to access some thing or not
export const isSuperAdminUser = () => {
  const userStore = useUserStore();
  if (userStore.hasData()) {
    if (userStore.currentUser.shop_id === null) {
      return true;
    } else {
      return false;
    }
  } else {
    window.toast('error', 'Error Message', 'User Store has not current user data!');
  }
};

// check only super admin
export const isSuperAdmin = () => {
  const userStore = useUserStore();
  if (userStore.hasData()) {
    const isSuperAdmin = userStore.roles?.find((item: any) => item.name === 'super admin');

    return isSuperAdmin;
  } else {
    window.toast('error', 'Error Message', 'User Store has not current user data!');
    return false;
  }
};

// check only vendor
export const isVendor = () => {
  const userStore = useUserStore();
  if (userStore.hasData()) {
    const isSuperAdmin = userStore.roles.some((item: any) => {
      return item.name === 'vendor';
    });

    return isSuperAdmin;
  } else {
    window.toast('error', 'Error Message', 'User Store has not current user data!');
    return false;
  }
};
