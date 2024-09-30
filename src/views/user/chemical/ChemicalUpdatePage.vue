<template>
    <div>
        <div style="margin-bottom: 10px;">
            <h2><b>Cập nhật thông tin hóa chất</b></h2>
        </div>
        <div>
            <ChemicalUpdateForm :chemical="chemical"/>
        </div>
    </div>
</template>

<script>
import ChemicalUpdateForm from '@/components/chemical/ChemicalUpdateForm.vue'
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';
import { useRoute } from 'vue-router'

export default {
    data() {
        return {
            chemical: null,
        }
    },
    components: {
        ChemicalUpdateForm
    },
    methods: {
        async getChemical(id) {
            this.chemical = await axiosWrapper.get(API_PATH.CHEMICAL.GET + id);
        }
    },
    mounted() {
        const route = useRoute()
        this.getChemical(route.params?.id);
    }
}
</script>