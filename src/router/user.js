import Layout from '@/views/user/Layout.vue';
import ChemicalPage from '@/views/user/chemical/ChemicalPage.vue'
import ChemicalRegisterPage from '@/views/user/chemical/ChemicalRegisterPage.vue'
import ChemicalImportRegisterPage from '@/views/user/chemical/ChemicalImportRegisterPage.vue'
import ChemicalBarCodePrintPage from '@/views/user/chemical/ChemicalBarCodePrintPage.vue'
import ChemicalUsingRegisterPage from '@/views/user/chemical/ChemicalUsingRegisterPage.vue'
import ChemicalManagerPage from '@/views/user/chemical/ChemicalManagerPage.vue'
import ChemicalUsingHistoryPage from '@/views/user/chemical/ChemicalUsingHistoryPage.vue'
import ChemicalUpdatePage from '@/views/user/chemical/ChemicalUpdatePage.vue'
import { useAuthStore } from '@/stores/auth';

export default {
    path: '/user',
    component: Layout,
    // eslint-disable-next-line
    beforeEnter: (to,from)=>{
        const {isLogIn} = useAuthStore();
        return isLogIn();
    },
    children: [
        {
            path: 'chemical',
            name: 'chemical',
            component: ChemicalPage
        },
        {
            path: 'chemical/register',
            name: 'chemicalRegister',
            component: ChemicalRegisterPage
        },
        {
            path: 'chemical/update/:id',
            name: 'chemicalUpdate',
            component: ChemicalUpdatePage
        },
        {
            path: 'chemical/import/register',
            name: 'chemicalImportRegister',
            component: ChemicalImportRegisterPage
        },
        {
            path: 'chemical/barcode/print',
            name: 'chemicalBarCodePrintPage',
            component: ChemicalBarCodePrintPage
        },
        {
            path: 'chemical/using/register',
            name: 'chemicalUsingRegisterPage',
            component: ChemicalUsingRegisterPage
        },
        {
            path: 'chemical/manager',
            name: 'chemicalManagerPage',
            component: ChemicalManagerPage
        },
        {
            path: 'chemical/using/history',
            name: 'chemicalUsingHistoryPage',
            component: ChemicalUsingHistoryPage
        },
    ]
}