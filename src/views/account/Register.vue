<template>
    <Vueform @submit="registerUser" size="md" :display-errors="false">
        <StaticElement name="register_title" content="Tạo tài khoản" tag="h1" />
        <StaticElement name="divider" tag="hr" />
        <GroupElement name="container">
            <TextElement name="username" placeholder="Tên đăng nhập" :columns="{
                container: 12,
                label: 12,
                wrapper: 12,
            }" field-name="userName" :rules="[
                'required',
                'max:255',
            ]" />
            <TextElement name="firstName" placeholder="Họ" :columns="{
                container: 6,
                label: 12,
                wrapper: 12,
            }" field-name="First name" :rules="[
                'required',
                'max:255',
            ]" />
            <TextElement name="lastName" placeholder="Tên" :columns="{
                container: 6,
                label: 12,
                wrapper: 12,
            }" field-name="Last name" :rules="[
                'required',
                'max:255',
            ]" />
        </GroupElement>
        <TextElement name="email" input-type="email" :rules="[
            'required',
            'max:255',
            'email',
        ]" placeholder="Email" field-name="Email" />
        <TextElement name="password" input-type="password" :rules="[
            'required',
            'min:8',
            'same:password_confirmation',
        ]" field-name="Password" placeholder="Password" />
        <TextElement name="password_confirmation" input-type="password" :rules="[
            'required',
            'same:password',
        ]" field-name="Password confirmation" placeholder="Password again" />
        <CheckboxElement name="terms" text="Đồng ý với điều kiện và điều khoản sử dụng." />
        <StaticElement name="divider_1" tag="hr" />
        <ButtonElement name="register" :submits="true" button-label="Tạo tài khoản" :full="true" size="md"
            :columns="2" />
        <ButtonElement name="login" :submits="false" button-label="Đăng nhập" href="/auth/login" button-type="anchor"
            :full="true" size="md" :columns="2" />
    </Vueform>
</template>

<script>
import { API_PATH } from '@/router/apiPath';
import { axiosWrapper } from '@/plugin/axiosWrapper';

export default {
    data() {
        return {
        }
    },
    components: {
    }
    ,
    methods: {
        async registerUser(form$) {
            const data = form$.data
            form$.submitting = true
            await axiosWrapper.post(API_PATH.ACCOUNT.USER_REGISTER, data).finally(() => {
                form$.submitting = false
            })
        }
    }
}
</script>