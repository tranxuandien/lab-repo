<template>
    <SelectElement :search="true" label-prop="userName" value-prop="id" name="user" :native="true"
        :items="userList" placeholder="Chọn người dùng" :columns="{ container: 3, label: 4, wrapper: 12 }"
        :object="true"/>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper'
import { API_PATH } from '@/router/apiPath';


export default {
    data() {
        return {
            userList: null,
            userName: null,
            userId: null
        }
    },
    watch: {

    },
    methods: {
        async getAllUser() {
            this.userList = await axiosWrapper.get(API_PATH.USER.LIST_MASTER);
        },
    },
    mounted() {
        this.getAllUser()
    }
}
</script>