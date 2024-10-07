<template>
    <div>
        <div>
            <Vueform ref="form$" @submit="deviceUsing" @change="revalidate">
                <GroupElement name="gr1">
                    <SelectElement :search="true" name="deviceId" label-prop="name" value-prop="id" :items="deviceList"
                        placeholder="Chọn thiết bị" :columns="2" :native="true" rules="required"
                        :messages="{ required: 'Chọn thiết bị sử dụng' }" />
                    <DateElement name="start" rules="validateTime|required" :time="true" :seconds="false" :min="new Date().toJSON().slice(0,10)+' '+new Date().toLocaleTimeString().slice(0,5)" :columns="2"
                        placeholder="Thời gian bắt đầu sử dụng"
                        :messages="{ required: 'Chọn thời gian bắt đầu sử dụng' }" />
                    <DateElement name="end" rules="validateTime|required" :time="true" :seconds="false" :min="new Date().toJSON().slice(0,10)+' '+new Date().toLocaleTimeString().slice(0,5)" :columns="2"
                        placeholder="Thời gian kết thúc sử dụng"
                        :messages="{ required: 'Chọn thời gian kết thúc sử dụng' }" />
                </GroupElement>
                <GroupElement name="gr2">
                    <CheckboxElement name="deviceStatus">
                        Trạng thái thiết bị lúc đăng ký là bình thường
                    </CheckboxElement>
                    <TextElement name="info" :native="false" :columns="2" placeholder="Mô tả khác"  rules="required" :messages="{ required: 'Điền trạng thái thiết bị' }" />
                </GroupElement>
                <ButtonElement :disabled="false" submits name="submit" add-class="mt-2 btn-import">
                    Đăng kí sử dụng
                </ButtonElement>
            </Vueform>
        </div>
        <div><h2>Danh sách thiết bị đăng ký sử dụng</h2></div>
        <div v-if="usingDeviceList" class="card">
            <DataTable :value="usingDeviceList" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="device" header="Tên thiết bị" style="width: 20%"></Column>
                <Column field="start" header="Thời gian bắt đầu sử dụng" style="width: 10%"></Column>
                <Column field="end" header="Thời gian kết thúc sử dụng" style="width: 10%"></Column>
                <Column field="user" header="Người đăng ký sử dụng" style="width: 5%"></Column>
                <Column field="status" header="Trạng thái" style="width: 5%"></Column>
                <Column :exportable="false" style="min-width: 12rem;width: 5%;" header="Cập nhật">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editDevice(slotProps.data)"></Button>
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteDevice(slotProps.data)"></Button>
                    </template>
                </Column>
            </DataTable>
            <!-- <Dialog v-model:visible="deleteDeviceDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl"></i>
                    <span v-if="chemical">Bạn chắc chắn muốn xóa thiết bị: <b>{{ chemical.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteDeviceDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteDevice" />
                </template>
            </Dialog> -->
        </div>
    </div>
</template>
<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';


export default {
    components: {
        DataTable,
        Column,
        // Dialog,
        Button
    },
    data() {
        return {
            device: null,
            deviceList: null,
            usingDeviceList: null,
        }
    },
    methods: {
        async getDeviceList() {
            await axiosWrapper.get(API_PATH.DEVICE.LIST_MASTER).then((res) => {
                this.deviceList = res?.data;
            });
        },
        async deviceUsingList(){
            await axiosWrapper.get(API_PATH.DEVICE.USING_LIST).then((res) => {
                this.usingDeviceList = res?.data;
            });
        },
        async deviceUsing(form$) {
            const data = form$.data
            form$.submitting = true
            await axiosWrapper.post(API_PATH.DEVICE.USING, data).finally(() => {
                form$.submitting = false;
                form$.reset();
            });

        },
        revalidate() {
            this.$refs.form$.resetValidators();
        },
    },
    mounted() {
        this.getDeviceList();
        this.deviceUsingList();
    }
}
</script>
<style>
.btn-import {
    margin-bottom: 50px;
}
</style>