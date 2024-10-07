<template>
    <div class="col-md-12 form-search">
        <Vueform :endpoint="false" @submit="doSearch" name="searchDeviceForm">
            <GroupElement name="group1" :columns="{ container: 12, label: 4, wrapper: 12 }">
                <TextElement name="name" placeholder="Tên thiết bị" :columns="6" />
                <SelectElement :search="true" name="positionId" label-prop="positionInfo" value-prop="id"
                    :items="positionLst" placeholder="Vị trí đặt thiết bị" :columns="2" />
            </GroupElement>
            <ButtonElement name="submit" add-class="md-2 btn-search" submits>
                Tìm kiếm
            </ButtonElement>
        </Vueform>
    </div>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
    components: {
    },
    data() {
        return {
            positionLst: null
        }
    },
    methods: {
        async getAllPosition() {
            this.positionLst = await axiosWrapper.get(API_PATH.POSITION.LIST_MASTER);
        },
        async doSearch(form$) {
            const data = form$.data;
            form$.submitting = true;
            const result = await axiosWrapper.post(API_PATH.DEVICE.LIST, data).finally(() => {
                form$.submitting = false;
            })
            this.$emit('getData', result.data);
        }
    },
    mounted() {
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