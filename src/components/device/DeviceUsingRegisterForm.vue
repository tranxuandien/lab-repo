<template>
    <div>
        <div>
            <Vueform ref="form$" @submit="deviceUsing" @change="revalidate">
                <GroupElement name="gr1">
                    <SelectElement :search="true" name="deviceId" label-prop="name" value-prop="id" :items="deviceList"
                        placeholder="Chọn thiết bị" :columns="2" :native="true" rules="required"
                        :messages="{ required: 'Chọn thiết bị sử dụng' }" @change="getDeviceUsingByDeviceId" />
                    <DateElement name="start" rules="validateTime|required" :time="true" :seconds="false"
                        :min="new Date().toJSON().slice(0, 10) + ' ' + new Date().toLocaleTimeString().slice(0, 5)"
                        :columns="2" placeholder="Thời gian bắt đầu sử dụng"
                        :messages="{ required: 'Chọn thời gian bắt đầu sử dụng' }" />
                    <DateElement name="end" rules="validateTime|required" :time="true" :seconds="false"
                        :min="new Date().toJSON().slice(0, 10) + ' ' + new Date().toLocaleTimeString().slice(0, 5)"
                        :columns="2" placeholder="Thời gian kết thúc sử dụng"
                        :messages="{ required: 'Chọn thời gian kết thúc sử dụng' }" />
                </GroupElement>
                <GroupElement name="gr2">
                    <CheckboxElement name="centrifuge" :default="false" @change="setDefaultSpeed">
                        Đăng ký máy ly tâm
                    </CheckboxElement>
                    <TextElement name="centrifugeSpeed" :native="false" :columns="2" placeholder="Tốc độ máy ly tâm"
                        rules="required" :messages="{ required: 'Điền tốc độ máy ly tâm' }"
                        :conditions="[['gr2.centrifuge', true]]" :mask="{
                            mask: 'number',
                            thousandsSeparator: '',     // any single char
                            scale: 0,                   // digits after fractional delimiter, 0 for integers
                            padFractionalZeros: false,  // pads zeros at end to the length of scale
                            normalizeZeros: true,       // removes zeros at ends (eg. 1,10 -> 1,1)
                            radix: '.',                 // fractional delimiter
                            mapToRadix: ['.'],          // symbols to process as radix
                            min: 1000,                // minimum allowed value
                            max: 18000,                 // maximum allowed value
                            autofix: true,              // replace with min/max value if outside of range
                        }" />
                    <CheckboxElement name="deviceStatus" :default="true">
                        Trạng thái thiết bị lúc đăng ký là bình thường
                    </CheckboxElement>
                    <TextElement name="info" :native="false" :columns="2" placeholder="Mô tả bất thường"
                        rules="required" :messages="{ required: 'Điền trạng thái thiết bị' }"
                        :conditions="[['gr2.deviceStatus', false]]" />
                </GroupElement>
                <GroupElement name="gr3">
                    <MultiselectElement :search="true" label-prop="userName" value-prop="id" name="user" :native="true"
                        :items="userList" placeholder="Chọn người dùng"
                        :columns="{ container: 3, label: 4, wrapper: 12 }" />
                    <TextElement name="expect" :native="false" :columns="2" placeholder="Mục đích sử dụng"
                        rules="required" :messages="{ required: 'Điền mục đích sử dụng thiết bị' }" />
                </GroupElement>
                <ButtonElement :disabled="false" submits name="submit" add-class="mt-2 btn-import">
                    Đăng kí sử dụng
                </ButtonElement>
            </Vueform>
        </div>
        <div v-if="usingUserList">
            <div>
                <h2>Danh sách người đang sử dụng thiết bị</h2>
            </div>
            <div class="card">
                <DataTable :value="usingUserList" showGridlines paginator :rows="5"
                    :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}">
                    <Column sortable field="device" header="Tên thiết bị" style="width: 20%"></Column>
                    <Column sortable field="start" header="Thời gian bắt đầu sử dụng" style="width: 10%">
                        <template #body="slotProps">
                            {{ slotProps.data.start.replaceAll('-', '/').replaceAll('T', ' ') }}
                        </template>
                    </Column>
                    <Column sortable field="end" header="Thời gian kết thúc sử dụng" style="width: 10%"><template
                            #body="slotProps">
                            {{ slotProps.data.end.replaceAll('-', '/').replaceAll('T', ' ') }}
                        </template></Column>
                    <Column sortable field="users" header="Người đăng ký sử dụng" style="width: 5%"></Column>
                    <Column sortable field="registerStatus" header="Trạng thái đăng ký" style="width: 5%"></Column>
                    <!-- <Column sortable  :exportable="false" style="min-width: 12rem;width: 5%;" header="Cập nhật">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                                @click="editDevice(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" outlined rounded severity="danger"
                                @click="confirmDeleteDevice(slotProps.data)"></Button>
                        </template>
                    </Column> -->
                </DataTable>
            </div>
        </div>
        <div v-if="usingDeviceList">
            <div>
                <h2>Danh sách thiết bị bạn đăng ký sử dụng</h2>
            </div>
            <div class="card">
                <DataTable :value="usingDeviceList" showGridlines paginator :rows="5"
                    :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}">
                    <Column sortable field="device" header="Tên thiết bị" style="width: 20%"></Column>
                    <Column sortable field="start" header="Thời gian bắt đầu sử dụng" style="width: 10%">
                        <template #body="slotProps">
                            {{ slotProps.data.start.replaceAll('-', '/').replaceAll('T', ' ') }}
                        </template>
                    </Column>
                    <Column sortable field="end" header="Thời gian kết thúc sử dụng" style="width: 10%">
                        <template #body="slotProps">
                            {{ slotProps.data.end.replaceAll('-', '/').replaceAll('T', ' ') }}
                        </template>
                    </Column>
                    <Column sortable field="registerStatus" header="Trạng thái đăng ký" style="width: 5%"></Column>
                    <Column sortable field="centrifugeSpeed" header="Tốc độ ly tâm" style="width: 5%"></Column>
                    <Column sortable field="expect" header="Mục đích sử dụng" style="width: 5%"></Column>
                    <Column sortable field="buddy" header="Người hướng dẫn" style="width: 5%"></Column>
                    <Column sortable field="users" header="Người sử dụng" style="width: 5%"></Column>
                    <Column sortable :exportable="false" style="min-width: 12rem;width: 5%;" header="Cập nhật">
                        <template #body="slotProps">
                            <Button v-if="slotProps.data.registerStatus === 'Đăng ký'" icon="pi pi-pencil" outlined
                                rounded class="mr-2" @click="confirmDoneUsingDevice(slotProps.data)"></Button>
                            <Button v-if="slotProps.data.registerStatus === 'Đăng ký'" icon="pi pi-times-circle"
                                outlined rounded severity="danger"
                                @click="confirmCancelUsingDevice(slotProps.data)"></Button>
                            <Button v-if="slotProps.data.registerStatus === 'Đăng ký'" icon="pi pi-exclamation-triangle"
                                outlined rounded severity="warn"
                                @click="confirmReportDeviceStatus(slotProps.data)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <Dialog v-model:visible="cancelUsingDeviceDialog" :style="{ width: '550px' }" header="Xác nhận"
                    :modal="true">
                    <div class="flex items-center gap-4">
                        <span v-if="device">Bạn chắc chắn muốn hủy đăng ký sử dụng thiết bị: <b>{{ device.device
                                }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="Không" icon="pi pi-times" text @click="cancelUsingDeviceDialog = false" />
                        <Button label="Hủy đăng ký sử dụng" severity="danger" icon="pi pi-check"
                            @click="cancelUsingDevice" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="doneUsingDeviceDialog" :style="{ width: '450px' }" header="Xác nhận"
                    :modal="true">
                    <div class="flex items-center gap-4">
                        <span v-if="device">Bạn đã sử dụng xong thiết bị: <b>{{ device.device
                                }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="Không" icon="pi pi-times" text @click="doneUsingDeviceDialog = false" />
                        <Button label="Sử dụng xong" icon="pi pi-check" @click="doneUsingDevice" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="reportDeviceStatusDialog" modal header="Cập nhật trạng thái thiết bị"
                    :style="{ width: '40rem' }">
                    <span class="text-surface-500 dark:text-surface-400 block mb-8">Điển thông tin tình trạng thiết bị
                        trong quá
                        trình sử dụng.</span>
                    <Vueform ref="form1$" @submit="reportDeviceStatus">
                        <GroupElement name="gr2">
                            <TextElement name="deviceStatusDetail" :native="false" :columns="12"
                                placeholder="Trạng thái bất thường của thiết bị" rules="required"
                                :messages="{ required: 'Điền trạng thái thiết bị' }" />
                            <TextElement name="id" :native="false" hidden="true" />
                        </GroupElement>
                        <ButtonElement :disabled="false" submits name="submit" button-class="report-btn">
                            Báo cáo tình trạng thiết bị
                        </ButtonElement>
                    </Vueform>
                </Dialog>
            </div>
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
    data() {
        return {
            device: null,
            deviceList: null,
            usingDeviceList: null,
            usingUserList: null,
            cancelUsingDeviceDialog: false,
            doneUsingDeviceDialog: false,
            reportDeviceStatusDialog: false,
            userList: null
        }
    },
    methods: {
        async getDeviceList() {
            await axiosWrapper.get(API_PATH.DEVICE.LIST_MASTER).then((res) => {
                this.deviceList = res?.data;
            });
        },
        //get using when select device
        async getDeviceUsingByDeviceId(deviceId) {
            if (deviceId != null) {
                await axiosWrapper.get(API_PATH.DEVICE.FOR_DEVICE + deviceId).then((res) => {
                    this.usingUserList = res?.data?.length == 0 ? null : res?.data;
                });
            } else {
                this.usingUserList = null;
            }
        },
        //list device using of current user
        async deviceUsingList() {
            await axiosWrapper.get(API_PATH.DEVICE.USING_LIST).then((res) => {
                this.usingDeviceList = res?.data;
            });
        },
        async deviceUsing(form$) {
            const data = form$.data
            form$.submitting = true
            console.log(data)
            await axiosWrapper.post(API_PATH.DEVICE.USING, data).then((res) => {
                if (res) {
                    form$.reset();
                    this.deviceUsingList();
                }
            }).finally(() => {
                form$.submitting = false;
            });
        },
        //dialog
        confirmCancelUsingDevice(device) {
            this.device = device;
            this.cancelUsingDeviceDialog = true;
        },
        confirmDoneUsingDevice(device) {
            this.device = device;
            this.doneUsingDeviceDialog = true;
        },
        confirmReportDeviceStatus(device) {
            this.device = device;
            this.reportDeviceStatusDialog = true;
        },
        //cancel using
        async cancelUsingDevice() {
            this.cancelUsingDeviceDialog = false;
            await axiosWrapper.get(API_PATH.DEVICE.CANCEL_USING + this.device.id).finally(() => {
                this.deviceUsingList();
            });
        },
        //done using
        async doneUsingDevice() {
            this.doneUsingDeviceDialog = false;
            await axiosWrapper.get(API_PATH.DEVICE.DONE_USING + this.device.id).finally(() => {
                this.deviceUsingList();
            });
        },
        //report device status
        async reportDeviceStatus(form$) {
            this.reportDeviceStatusDialog = false;
            const data = form$.data;
            data.id = this.device.id;
            form$.submitting = true;
            await axiosWrapper.post(API_PATH.DEVICE.REPORT_STATUS, data).finally(() => {
                form$.submitting = false;
                this.deviceUsingList();
            });
        },
        revalidate() {
            this.$refs.form$.resetValidators();
        },
        async getAllUser() {
            this.userList = await axiosWrapper.get(API_PATH.USER.LIST_MASTER);
        },
        setDefaultSpeed(val) {
            if (val)
                this.$refs.form$.update({
                    centrifugeSpeed: 10000,
                });
            else
                this.$refs.form$.update({
                    centrifugeSpeed: '',
                });
        }
    },
    mounted() {
        this.getDeviceList();
        this.deviceUsingList();
        this.getAllUser();
    }
}
</script>
<style>
.btn-import {
    margin-bottom: 50px;
}

.report-btn {
    background-color: #ffc107 !important;
    border-color: #ffc107 !important;
    color: white !important;
}
</style>