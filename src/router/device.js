import DevicePage from '@/views/user/device/DevicePage.vue'
import DeviceRegisterPage from '@/views/user/device/DeviceRegisterPage.vue'
import DeviceUsingRegisterPage from '@/views/user/device/DeviceUsingRegisterPage.vue';

export default {
    path: 'device',
    name: 'device',
    children: [
        {
            path: '',
            name: 'devicePage',
            component: DevicePage
        },
        {
            path: 'register',
            name: 'deviceRegister',
            component: DeviceRegisterPage
        },
        {
            path: 'using/register',
            name: 'deviceUsingRegister',
            component: DeviceUsingRegisterPage
        },
    ]
}