<template>
    <div class="col-md-12 form-search">
        <Vueform :endpoint="false" @submit="doSearch" name="searchUserForm">
            <GroupElement name="group1" :columns="{ container: 12, label: 4, wrapper: 12 }">
                <TextElement name="name" placeholder="Tên người dùng" :columns="6" />
            </GroupElement>
            <ButtonElement id="searchUserBtn" name="submit" add-class="md-2 btn-search" submits>
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
        }
    },
    methods: {
        async doSearch(form$) {
            const name = form$.data.name?form$.data.name:'';
            form$.submitting = true;
            const result = await axiosWrapper.get(API_PATH.USER.LIST+name).finally(() => {
                form$.submitting = false;
                
            })
            this.$emit('getData', result.data);
        }
    },
    mounted() {
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