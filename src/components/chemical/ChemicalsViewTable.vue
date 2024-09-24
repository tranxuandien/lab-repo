<template>
    <div class="container mt-6">
        


        <div class="card">
            <DataTable :value="chemicals" showGridlines="true" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="name" header="Tên hóa chất" style="width: 10%"></Column>
                <Column field="brand" header="Hãng sản xuất" style="width: 10%"></Column>
                <Column field="chemicalType" header="Dạng hóa chất" style="width: 10%"></Column>
                <Column field="manufactoryQuantity" header="Khối lượng đăng kí" style="width: 10%"></Column>
                <Column field="remain" header="Khối lượng còn lại" style="width: 10%"></Column>
                <Column field="chemicalTypeInfo" header="Mô tả đóng gói" style="width: 10%"></Column>
                <Column field="chemicalClass" header="Phân loại hóa chất" style="width: 10%"></Column>
                <Column field="chemicalClassInfo" header="Phân loại hóa chất" style="width: 10%"></Column>
                <Column field="position" header="Vị trí" style="width: 10%"></Column>
                <Column field="expiredDate" header="Hạn dụng" style="width: 10%"></Column>
                <Column field="impExpInfo" header="Tình trạng hóa chất" style="width: 10%"></Column>
                <Column field="otherInfo" header="Khác" style="width: 10%"></Column>
                <Column field="manufactoryQuantity" header="Cập nhật" style="width: 10%"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
// import TablePagination from '@/components/TablePagination.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import api from '@/plugin/axios';
// import { ref } from 'vue'
export default {
    components: {
        DataTable,
        Column
    },
    props: ['chemicals'],
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            rows: this.chemicals?.length,
            mutableList: JSON.parse(this.chemicals)
        };
    },
    methods: {
        hasPermission(role) {
            const userRole = 'ROLE_USER'; // Thay thế bằng quyền thực tế của người dùng
            return role === userRole || role === 'ROLE_ADMIN';
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