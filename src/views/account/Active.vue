<template>
    <div></div>
</template>

<script>
import { API_PATH } from '@/router/apiPath';
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { useRoute } from 'vue-router'
import Router from '@/router';

export default {
    methods: {
        async activeUser(token) {
            await axiosWrapper.get(API_PATH.ACCOUNT.USER_ACTIVE + token).then(() => {
                setTimeout(() => {
                    Router.push("/auth/login");
                }, 6000);
            })
        }
    },
    mounted() {
        const route = useRoute()
        console.log(route.query)
        this.activeUser(route.query?.token)
    }
}
</script>