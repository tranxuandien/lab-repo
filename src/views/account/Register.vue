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
            ]" :messages="{
                required: 'Điền tên đăng nhập',
                max: 'Tên đăng nhập tối đa 255 ký tự',
            }" />
            <TextElement name="firstName" placeholder="Họ" :columns="{
                container: 6,
                label: 12,
                wrapper: 12,
            }" field-name="First name" :rules="[
                'required',
                'max:20',
            ]" :messages="{
                required: 'Điền họ',
                max: 'Họ điền tối đa 20 ký tự',
            }" />
            <TextElement name="lastName" placeholder="Tên" :columns="{
                container: 6,
                label: 12,
                wrapper: 12,
            }" field-name="Last name" :rules="[
                'required',
                'max:50',
            ]" :messages="{
                required: 'Điền tên',
                max: 'Tên điền tối đa 50 ký tự',
            }" />
        </GroupElement>
        <TextElement name="email" input-type="email" :rules="[
            'required',
            'max:100',
            'email',
        ]" placeholder="Email" field-name="Email" :messages="{
            required: 'Điền địa chỉ email ',
            max: 'Email điền tối đa 100 ký tự',
            email: 'Định dạng email chưa chính xác'
        }" />
        <TextElement name="password" input-type="password" :rules="[
            'required',
            'min:8',
        ]" field-name="Password" placeholder="Mật khẩu" :messages="{
            required: 'Điền mật khẩu',
            max: 'Mật khẩu ít nhất 8 ký tự',
        }" />
        <TextElement name="password_confirmation" input-type="password" :rules="[
            'required',
            'same:password',
        ]" field-name="Password confirmation" placeholder="Nhập lại mật khẩu" :messages="{
            required: 'Điền mật khẩu',
            max: 'Mật khẩu ít nhất 8 ký tự',
            same: 'Mật khẩu không khớp'
        }" />
        <SelectElement :search="false" name="role" label-prop="label" value-prop="value"
            :items="[{ label: 'Sinh viên', value: 'ROLE_USER' }, { label: 'GV Hướng dẫn', value: 'ROLE_BUDDY' }]"
            placeholder="Loại tài khoản đăng ký" :columns="12" rules="required"
            :messages="{ required: 'Chọn loại tài khoản muốn đăng ký' }" />
        <TextElement name="studentId" :rules="[
            'required',
            'max:8',
            'min:8',
        ]" placeholder="Mã số sinh viên" field-name="studentId" :messages="{
            required: 'Điền mã số sinh viên',
            max: 'Mã số sinh viên 8 ký tự số',
            min: 'Mã số sinh viên 8 ký tự số',
        }" :conditions="[['role','==','ROLE_USER']]" :mask="{
              mask: 'number',
              thousandsSeparator: '',     // any single char
              scale: 0,                   // digits after fractional delimiter, 0 for integers
              padFractionalZeros: false,  // pads zeros at end to the length of scale
              normalizeZeros: true,       // removes zeros at ends (eg. 1,10 -> 1,1)
              radix: '.',                 // fractional delimiter
              mapToRadix: ['.'],          // symbols to process as radix
              autofix: false,              // replace with min/max value if outside of range
            }" />
        <CheckboxElement name="terms" text="Đồng ý với điều kiện và điều khoản sử dụng." rules="accepted" />
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
        },
    }
}
</script>