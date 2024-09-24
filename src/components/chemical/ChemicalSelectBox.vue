<template>
    <SelectElement :search="true" label-prop="chemicalName" value-prop="id" name="chemical" :native="true"
        :items="chemicalList" placeholder="Chọn hóa chất" :columns="{ container: 3, label: 4, wrapper: 12 }"
        :object="true" :rules="[
            {
                required: ['printNumber', '!=', null]//validate for case print barcode
            }
        ]" :messages ="{ required: 'Chọn hóa chất'}" />
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper'
import { API_PATH } from '@/router/apiPath';


export default {
    data() {
        return {
            chemicalList: null,
            chemicalName: null,
            chemicalId: null
        }
    },
    watch: {

    },
    methods: {
        async getAllChemical() {
            this.chemicalList = await axiosWrapper.get(API_PATH.CHEMICAL.LIST_MASTER);
        },
    },
    mounted() {
        this.getAllChemical()
    }
}
</script>