<template>
    <div class="container mt-6">
        <div v-if="brands" class="card">
            <DataTable :value="brands" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="name" header="Tên nơi sản xuất" style="min-width: 12rem;width: 80%;"></Column>
                <Column v-if="hasPermission()" :exportable="false" style="min-width: 12rem;width: 20%;"
                    header="Cập nhật">
                    <template #body="slotProps">
                        <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editBrand(slotProps.data)"></Button> -->
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteBrand(slotProps.data)"></Button>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="deleteBrandDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl"></i>
                    <span v-if="brand">Bạn chắc chắn muốn xóa thông tin nơi sản xuất: <b>{{ brand.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteBrandDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteBrand" />
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
    props: ['brands'],
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            rows: this.brands?.length,
            mutableList: JSON.parse(this.brands),
            brand: null,
            deleteBrandDialog: false,
        };
    },
    methods: {
        hasPermission() {
            const {hasRoleBuddy} = useAuthStore();
            return hasRoleBuddy();
        },
        confirmDeleteBrand(brand) {
            console.log(brand)
            this.brand = brand;
            this.deleteBrandDialog = true;
        },
        async deleteBrand() {
            await axiosWrapper.delete(API_PATH.BRAND.DELETE + '/' + this.brand.id).then(() => {
                this.deleteBrandDialog = false;
                this.$emit('updateData', this.brand.id);
                this.brand = {};
            });
        },
    },
}
</script>

<style scoped>
/* Tùy chỉnh CSS nếu cần */
.table {
    width: 50%;
}
</style>