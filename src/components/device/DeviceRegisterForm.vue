<template>
    <Vueform :endpoint="false" @submit="submitForm" name="registerForm">
        <GroupElement name="deviceInformation" label="Thông tin cơ bản">
            <TextElement name="name" rules="required" :messages="{ required: 'Nhập tên thiết bị' }"
                placeholder="Tên thiết bị" :columns="6" />
        </GroupElement>
        <GroupElement name="gr1">
            <SelectElement :search="true" name="position" label-prop="positionInfo" value-prop="id" :items="positionLst"
                placeholder="Vị trí đặt thiết bị" :columns="2" />
        </GroupElement>
        <GroupElement name="gr2">
            <TextElement name="otherInfo" placeholder="Thông tin khác" :columns="6" />
        </GroupElement>
        <ButtonElement name="submit" add-class="mt-2" submits>
            Đăng kí thiết bị
        </ButtonElement>
    </Vueform>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
    data() {
        return {
            positionLst: null,
        }
    },
    methods: {
        async getAllPosition() {
            this.positionLst = await axiosWrapper.get(API_PATH.POSITION.LIST_MASTER);
        },
        async submitForm(form$) {
            const data = form$.data
            console.log(data)
            await axiosWrapper.post(API_PATH.DEVICE.ADD, data).finally(() => {
                form$.submitting = false;
            });
        }
    },
    mounted() {
        this.getAllPosition()
    }
}
</script>