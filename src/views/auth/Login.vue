<template>
    <Vueform :endpoint="false" @submit="login" size="md" :display-errors="false">
        <StaticElement name="login_title" content="Đăng nhập" tag="h1" />
        <StaticElement name="divider" tag="hr" />
        <GroupElement name="container" :columns="{
            container: 6,
            label: 6,
            wrapper: 8,
        }">
            <TextElement name="username" placeholder="Tên đăng nhập" :columns="{
                container: 12,
                label: 12,
                wrapper: 12,
            }" field-name="userName" :rules="[
                'required',
                'max:255',
            ]" />
            <TextElement name="password" input-type="password" :rules="[
                'required',
                'min:8',
            ]" field-name="Password" placeholder="Mật khẩu" :columns="{
                container: 12,
                label: 12,
                wrapper: 12,
            }" />
        </GroupElement>
        <StaticElement name="divider_1" tag="hr" />
        <ButtonElement name="login" :submits="true" button-label="Đăng nhập" :full="true" size="md" :columns="2" />
    </Vueform>
</template>

<script>
// import { API_PATH } from '@/router/apiPath';
// import Router from '@/router';
// import { toast } from 'vue3-toastify';
import Router from '@/router';
import { useAuthStore } from '@/stores/auth'



export default {
    data() {
        return {
        }
    },
    components: {
    }
    ,
    methods: {
        async login(form$) {
            const data = form$.data
            form$.submitting = true
            const authStore = useAuthStore();
            await authStore.login(data.username, data.password).finally(() => {
                form$.submitting = false
            });
        },
        checkLogin() {
            const authStore = useAuthStore();
            if (authStore.isLogIn()) {
                Router.push(authStore.returnUrl)
            }
        }
    },
    mounted() {
        this.checkLogin()
    }
}
</script>