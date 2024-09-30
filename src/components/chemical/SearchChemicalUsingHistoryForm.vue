<template>
    <div class="col-md-12 form-search">
        <Vueform :endpoint="false" @submit="doSearch" name="searchChemicalUsingHistoryForm">
            <GroupElement name="group1" :columns="{ container: 12, label: 4, wrapper: 12 }">
                <ChemicalSelectBox />
                <SelectElement :search="true" label-prop="name" value-prop="id" name="brand" :native="true"
                    :items="brandList" placeholder="Nơi sản xuất" :columns="{ container: 3, label: 4, wrapper: 12 }" />
                <SelectElement :search="true" name="chemicalType" :native="false" :items="['Dung dịch', 'Bột']"
                    :columns="{ container: 3, label: 4, wrapper: 12 }" placeholder="Loại hóa chất" />
            </GroupElement>
            <GroupElement name="group2">
                <SelectElement :search="true" name="chemicalClass" :native="false"
                    :items="['Sinh học phân tử', 'Hóa chất vi sinh', 'Dung môi']" :columns="2"
                    placeholder="Phân loại hóa chất" />
                <SelectElement :search="true" name="position" label-prop="positionInfo" value-prop="id"
                    :items="positionLst" placeholder="Vị trí đặt hóa chất" :columns="2" />
                <UserSelectBox v-if="hasPermission('ROLE_ADMIN')" />
            </GroupElement>
            <ButtonElement name="submit" add-class="md-2 btn-search" submits>
                Tìm kiếm
            </ButtonElement>
        </Vueform>
    </div>
</template>
<script>
import ChemicalSelectBox from '@/components/chemical/ChemicalSelectBox.vue'
import UserSelectBox from '@/components/user/UserSelectBox.vue'
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';
import { useAuthStore } from '@/stores/auth';

export default {
    components: {
        ChemicalSelectBox,
        UserSelectBox
    },
    data() {
        return {
            // abc,
            chemical: {
                name: '',
                manufactoryQuantity: '',
                shptChemical: '',
                other: '',
                importUser: '',
                chemicalProperty: '',
                purchaseSrc: '',
            },
            brandList: null,
            positionLst: null
        }
    },
    methods: {
        async getAllBrand() {
            this.brandList = await axiosWrapper.get(API_PATH.BRAND);
        }
        ,
        async getAllPosition() {
            this.positionLst = await axiosWrapper.get(API_PATH.POSITION);
        },
        async doSearch(form$) {
            const data = form$.data;
            form$.submitting = true;
            const tableResult = await axiosWrapper.post(API_PATH.CHEMICAL.HISTORY, data);
            const chartResult = await axiosWrapper.post(API_PATH.CHEMICAL.HISTORY_CHART, data).finally(() => {
                form$.submitting = false;
            })
            this.$emit('getData', tableResult.data, chartResult.data);
        },
        hasPermission(role) {
            const user = useAuthStore().user;
            return user && user?.data?.userDto?.role === role;
        },
    },
    mounted() {
        this.getAllBrand()
        this.getAllPosition()
    }
} 
</script>
<style>
.form-search {
    padding-left: 8%;
}

.btn-search {
    padding-left: 40%;
    margin-bottom: 50px;
}
</style>