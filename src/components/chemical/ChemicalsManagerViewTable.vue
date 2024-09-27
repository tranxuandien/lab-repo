<template>
    <div class="container mt-6">
        <div v-if="chemicals" class="card">
            <DataTable :value="chemicals" showGridlines=true paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="name" header="Tên hóa chất" style="width: 20%"></Column>
                <Column field="brand" header="Hãng sản xuất" style="width: 10%"></Column>
                <Column field="chemicalType" header="Dạng hóa chất" style="width: 10%"></Column>
                <Column field="chemicalTypeInfo" header="Mô tả đóng gói" style="width: 5%"></Column>
                <Column field="chemicalClass" header="Phân loại hóa chất" style="width: 20%"></Column>
                <Column field="chemicalClassInfo" header="Phân loại hóa chất" style="width: 10%"></Column>
                <Column field="remain" header="Khối lượng còn lại" style="width: 10%"></Column>
                <Column field="position" header="Vị trí" style="width: 10%"></Column>
                <Column field="expiredDate" header="Hạn dụng" style="width: 10%"></Column>
                <Column field="impExpInfo" header="Tình trạng hóa chất" style="width: 10%">
                    <template #body="slotProps">
                        <Badge :value="slotProps.data.impExpInfo" :severity="statusSeverity(slotProps.data)" />
                    </template>
                </Column>
                <Column field="chemicalStatus" header="Khác" style="width: 10%"></Column>
                <Column field="purchaseSrc" header="Khác" style="width: 10%"></Column>
                <Column v-if="hasPermission('ROLE_ADMIN')" :exportable="false" style="min-width: 12rem;width: 5%;"
                    header="Cập nhật">
                    <template #body="slotProps">
                        <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" /> -->
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteChemical(slotProps.data)">Xóa</Button>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="deleteChemicalDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl"></i>
                    <span v-if="chemical">Bạn chắc chắn muốn xóa hóa chất: <b>{{ chemical.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteChemicalDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteChemical" />
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
import Badge from 'primevue/badge';
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';
import { useAuthStore } from '@/stores/auth';

export default {
    components: {
        DataTable,
        Column,
        Dialog,
        Button, Badge
    },
    props: ['chemicals'],
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            rows: this.chemicals?.length,
            mutableList: JSON.parse(this.chemicals),
            chemical: null,
            deleteChemicalDialog: false,
        };
    },
    methods: {
        hasPermission(role) {
            const user = useAuthStore().user;
            return user && user?.data?.userDto?.role === role;
        },
        confirmDeleteChemical(chemical) {
            this.chemical = chemical;
            this.deleteChemicalDialog = true;
        },
        async deleteChemical() {
            await axiosWrapper.delete(API_PATH.CHEMICAL.INVENTORY_DELETE + '/' + this.chemical.id).then(() => {
                this.deleteChemicalDialog = false;
                this.$emit('updateData', this.chemical.id);
                this.chemical = {};
            });
        },
        rowClass(data) {
            return [{ '!bg-primary !text-primary-contrast': data.category === 'Fitness' }];
        },
        rowStyle(data) {
            if (data.quantity === 0) {
                return { fontWeight: 'bold', fontStyle: 'italic' };
            }
        },
        statusSeverity(data) {
            if (data.remain == 0) {
                data.impExpInfo = 'Hết';
                return 'danger';
            }
            else if (data.remain > 0 && data.remain < 100) {
                data.impExpInfo = "Sắp hết";
                return 'warn';
            }
            else {
                data.impExpInfo = "Mới";
                return 'success';
            }
        }
    },
}
</script>

<style scoped>
.table {
    width: 100%;
}
</style>