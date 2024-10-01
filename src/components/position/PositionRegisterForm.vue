<template>
    <Vueform :endpoint="false" @submit="submitForm" name="registerForm">
        <GroupElement name="positionInformation" >
            <TextElement name="lab" rules="required" :messages="{ required: 'Nhập tên phòng thí nghiệm' }"
                placeholder="Tên phòng thí nghiệm" :columns="3" />
            <TextElement name="room" placeholder="Tên phòng chứa HC" :columns="3" />
            <TextElement name="ray" placeholder="Tủ đặt hóa chất" :columns="3" />
        </GroupElement>
        <ButtonElement style="padding-left:26% ;" name="submit" add-class="mt-2" submits>
            Đăng kí nơi đặt hóa chất
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
            await axiosWrapper.post(API_PATH.POSITION.ADD, data).finally(() => {
                form$.submitting = false;
                this.$emit("updateData");
            });
        }
    },
}
</script>