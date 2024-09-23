<template>
    <div class="container mt-6">
        


        <div class="card">
            <DataTable :value="chemicals" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="name" header="Name" style="width: 25%"></Column>
                <Column field="brand" header="Country" style="width: 25%"></Column>
                <Column field="chemicalType" header="Company" style="width: 25%"></Column>
                <Column field="manufactoryQuantity" header="Representative" style="width: 25%"></Column>
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