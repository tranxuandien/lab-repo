<template>
    <Vueform :endpoint="false" @submit="submitForm" name="registerForm">
        <GroupElement name="buddyInformation">
            <SelectElement :search="true" name="buddy" :items="buddyList"
                placeholder="Người hướng dẫn" :columns="2" />
            <MultiselectElement :native="false" :search="true" name="users" :items="userList"
                placeholder="Sinh viên" :columns="2" />
        </GroupElement>
        <ButtonElement name="submit" add-class="mt-2" submits>
            Đăng kí người hướng dẫn
        </ButtonElement>
    </Vueform>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
    data() {
        return {
            buddyList: null,
            userList: null
        }
    },
    methods: {
        async getAllBuddy()
        {
            this.buddyList = await axiosWrapper.get(API_PATH.USER.BUDDY_LIST);
            console.log(this.buddyList);
        },
        async getAllUser()
        {
            this.userList = await axiosWrapper.get(API_PATH.USER.STUDENT_LIST);
        },
        async submitForm(form$) {
            const data = form$.data
            console.log(data)
            await axiosWrapper.post(API_PATH.USER.BUDDY_REGISTER, data).finally(() => {
                form$.submitting = false;
            });
        }
    },
    mounted() {
        this.getAllBuddy();
        this.getAllUser();
    }
}
</script>