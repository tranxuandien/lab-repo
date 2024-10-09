import ChemicalPage from '@/views/user/chemical/ChemicalPage.vue'
import ChemicalRegisterPage from '@/views/user/chemical/ChemicalRegisterPage.vue'
import ChemicalImportRegisterPage from '@/views/user/chemical/ChemicalImportRegisterPage.vue'
import ChemicalBarCodePrintPage from '@/views/user/chemical/ChemicalBarCodePrintPage.vue'
import ChemicalUsingRegisterPage from '@/views/user/chemical/ChemicalUsingRegisterPage.vue'
import ChemicalManagerPage from '@/views/user/chemical/ChemicalManagerPage.vue'
import ChemicalUsingHistoryPage from '@/views/user/chemical/ChemicalUsingHistoryPage.vue'
import ChemicalUpdatePage from '@/views/user/chemical/ChemicalUpdatePage.vue'

export default {
    path: 'chemical',
    name: 'chemical',
    children: [
        {
            path: '',
            name: 'chemicalPage',
            component: ChemicalPage,
        },
        {
            path: 'register',
            name: 'chemicalRegister',
            component: ChemicalRegisterPage
        },
        {
            path: 'update/:id',
            name: 'chemicalUpdate',
            component: ChemicalUpdatePage
        },
        {
            path: 'import/register',
            name: 'chemicalImportRegister',
            component: ChemicalImportRegisterPage
        },
        {
            path: 'barcode/print',
            name: 'chemicalBarCodePrintPage',
            component: ChemicalBarCodePrintPage
        },
        {
            path: 'using/register',
            name: 'chemicalUsingRegisterPage',
            component: ChemicalUsingRegisterPage
        },
        {
            path: 'manager',
            name: 'chemicalManagerPage',
            component: ChemicalManagerPage
        },
        {
            path: 'using/history',
            name: 'chemicalUsingHistoryPage',
            component: ChemicalUsingHistoryPage
        },
    ]
}