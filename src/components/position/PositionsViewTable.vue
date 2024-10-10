<template>
    <div class="container mt-6">
        <div v-if="positions" class="card">
            <DataTable :value="positions" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column sortable field="positionInfo" header="Nơi đặt hóa chất" style="min-width: 12rem;width: 80%;"></Column>
                <Column sortable v-if="hasPermission()" :exportable="false" style="min-width: 12rem;width: 20%;"
                    header="Cập nhật">
                    <template #body="slotProps">
                        <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editPosition(slotProps.data)"></Button> -->
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeletePosition(slotProps.data)"></Button>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="deletePositionDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl"></i>
                    <span v-if="position">Bạn chắc chắn muốn xóa thông tin nơi đặt hóa chất: <b>{{ position.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deletePositionDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deletePosition" />
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
    props: ['positions'],
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            rows: this.positions?.length,
            mutableList: JSON.parse(this.positions),
            position: null,
            deletePositionDialog: false,
        };
    },
    methods: {
        hasPermission() {
            const {hasRoleBuddy} = useAuthStore();
            return hasRoleBuddy();
        },
        confirmDeletePosition(position) {
            console.log(position)
            this.position = position;
            this.deletePositionDialog = true;
        },
        async deletePosition() {
            await axiosWrapper.delete(API_PATH.POSITION.DELETE + '/' + this.position.id).then(() => {
                this.deletePositionDialog = false;
                this.$emit('updateData', this.position.id);
                this.position = {};
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