<template>
    <div class="container mt-6">
        <div v-if="devices" class="card">
            <DataTable :value="devices" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column sortable field="name" header="Tên thiết bị" style="width: 20%"></Column>
                <Column sortable field="position" header="Vị trí" style="width: 10%"></Column>
                <Column sortable field="user" header="Người đăng ký" style="width: 10%"></Column>
                <Column sortable field="otherInfo" header="Thông tin khác" style="width: 10%"></Column>
                <Column sortable v-if="hasPermission()" :exportable="false" style="min-width: 12rem;width: 5%;"
                    header="Cập nhật">
                    <template #body="slotProps">
                        <Button v-if="!slotProps.data.deviceStatus" icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="confirmActiveDevice(slotProps.data)"></Button>
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteDevice(slotProps.data)"></Button>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="activeDeviceDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl"></i>
                    <span v-if="device">Thiết bị được sửa xong và đưa vào hoạt động?: <b>{{ device.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Chưa sửa thiết bị" icon="pi pi-times" text @click="activeDeviceDialog = false" />
                    <Button label="Đúng" icon="pi pi-check" @click="activeDevice" />
                </template>
            </Dialog>
            <Dialog v-model:visible="deleteDeviceDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl"></i>
                    <span v-if="device">Bạn chắc chắn muốn xóa thiết bị: <b>{{ device.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteDeviceDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteDevice" />
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
import { useAuthStore } from '@/stores/auth';

export default {
    components: {
        DataTable,
        Column,
        Dialog,
        Button
    },
    props: ['devices'],
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            rows: this.devices?.length,
            mutableList: JSON.parse(this.devices),
            device: null,
            deleteDeviceDialog: false,
            activeDeviceDialog: false,
        };
    },
    methods: {
        hasPermission() {
            const {hasRoleBuddy} = useAuthStore();
            return hasRoleBuddy();
        },
        confirmDeleteDevice(device) {
            console.log(device)
            this.device = device;
            this.deleteDeviceDialog = true;
        },
        async deleteDevice() {
            await axiosWrapper.delete(API_PATH.DEVICE.DELETE + '/' + this.device.id).then((data) => {
                // console.log(data);
                this.deleteDeviceDialog = false;
                if (data) {
                    this.$emit('updateData', this.device.id);
                    this.device = {};
                }
            });
        },
        confirmActiveDevice(device) {
            this.device = device;
            this.activeDeviceDialog = true;
        },
        async activeDevice() {
            await axiosWrapper.get(API_PATH.DEVICE.ACTIVE + this.device.id).then(() => {
                this.activeDeviceDialog = false;
                document.getElementById("searchDeviceBtn").click();
            });
        }
    },
}
</script>

<style scoped>
/* Tùy chỉnh CSS nếu cần */
.table {
    width: 100%;
}
</style>