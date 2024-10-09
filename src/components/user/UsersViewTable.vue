<template>
    <div class="container mt-6">
        <div v-if="users" class="card">
            <DataTable :value="users" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="name" header="Tên người dùng" style="width: 20%"></Column>
                <Column field="address" header="Địa chỉ" style="width: 10%"></Column>
                <Column field="buddy" header="Người hướng dẫn" style="width: 10%"></Column>
                <Column field="email" header="Địa chỉ email" style="width: 10%"></Column>
                <Column :exportable="false" style="min-width: 12rem;width: 5%;" header="Cập nhật">
                    <template #body="slotProps">
                        <Button v-if="!slotProps.data.userStatus" icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="confirmActiveUser(slotProps.data)"></Button>
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteUser(slotProps.data)"></Button>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="activeUserDialog" :style="{ width: '550px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <span v-if="user">Cập nhật tài khoản người dùng <b>{{ user.name }}</b> sang trạng thái hoạt động?</span>
                </div>
                <template #footer>
                    <Button label="Đóng" icon="pi pi-times" text @click="activeUserDialog = false" />
                    <Button label="Cập nhật" icon="pi pi-check" @click="activeUser" />
                </template>
            </Dialog>
            <Dialog v-model:visible="deleteUserDialog" :style="{ width: '550px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <span v-if="user">Bạn chắc chắn muốn xóa tài khoản người dùng: <b>{{ user.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteUserDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteUser" />
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
    components: {
        DataTable,
        Column,
        Dialog,
        Button
    },
    props: ['users'],
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            rows: this.users?.length,
            mutableList: JSON.parse(this.users),
            user: null,
            deleteUserDialog: false,
            activeUserDialog: false,
        };
    },
    methods: {
        confirmDeleteUser(user) {
            console.log(user)
            this.user = user;
            this.deleteUserDialog = true;
        },
        async deleteUser() {
            await axiosWrapper.delete(API_PATH.DEVICE.DELETE + '/' + this.user.id).then((data) => {
                // console.log(data);
                this.deleteUserDialog = false;
                if (data) {
                    this.$emit('updateData', this.user.id);
                    this.user = {};
                }
            });
        },
        confirmActiveUser(user) {
            this.user = user;
            this.activeUserDialog = true;
        },
        async activeUser() {
            await axiosWrapper.get(API_PATH.DEVICE.ACTIVE + this.user.id).then(() => {
                this.activeUserDialog = false;
                document.getElementById("searchUserBtn").click();
            });
        }
    },
}
</script>

<style scoped>
.table {
    width: 100%;
}
</style>