import Layout from '@/views/user/Layout.vue';
import BrandRegisterPage from '@/views/user/brand/BrandRegisterPage.vue'
import PositionRegisterPage from '@/views/user/position/PositionRegisterPage.vue'
import { useAuthStore } from '@/stores/auth';
import chemical from './chemical';
import device from './device';
import UserPage from '@/views/user/usermanage/UserPage.vue';
import BuddyRegisterPage from '@/views/user/usermanage/BuddyRegisterPage.vue';
export default {
    path: '/user',
    component: Layout,
    // eslint-disable-next-line
    beforeEnter: (to, from) => {
        const { isLogIn } = useAuthStore();
        return isLogIn();
    },
    children: [
        {
            path: '',
            name: 'UserPage',
            component: UserPage
        },
        {
            path: 'buddy/register',
            name: 'BuddyRegisterPage',
            component: BuddyRegisterPage
        },
        { ...chemical },
        { ...device },
        {
            path: 'brand',
            children: [
                {
                    path: 'register',
                    name: 'BrandRegisterPage',
                    component: BrandRegisterPage
                },
            ]
        },
        {
            path: 'position',
            children: [
                {
                    path: 'register',
                    name: 'PositionRegisterPage',
                    component: PositionRegisterPage
                },
            ]
        },
    ]
}