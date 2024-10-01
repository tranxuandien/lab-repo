<template>
    <Vueform :endpoint="false" @submit="submitForm" name="registerForm">
        <GroupElement name="brandInformation" label="Thông tin nơi sản xuất">
            <TextElement name="name" rules="required" :messages="{ required: 'Nhập tên nơi sản xuất' }"
                placeholder="Nơi sản xuất" :columns="6" />
        </GroupElement>
        <ButtonElement name="submit" add-class="mt-2" submits>
            Đăng kí nơi sản xuất
        </ButtonElement>
    </Vueform>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
    data() {
        return {
        }
    },
    methods: {
        async submitForm(form$) {
            const data = form$.data
            form$.submitting = true
            await axiosWrapper.post(API_PATH.BRAND.ADD, data).finally(() => {
                form$.submitting = false;
                this.$emit("updateData")
            });
        }
    },
}
</script>