<template>
    <div class="container mt-6">
        <div v-if="chemicals" class="card">
            <DataTable :value="chemicals" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="name" header="Tên hóa chất" style="width: 20%"></Column>
                <Column field="brand" header="Hãng sản xuất" style="width: 10%"></Column>
                <Column field="quantity" header="Khối lượng sử dụng" style="width: 10%"></Column>
                <Column field="usingDate" header="Ngày sử dụng" style="width: 10%"></Column>
                <Column field="impExpUser" header="Người sử dụng" style="width: 10%"></Column>
                <Column field="barcode" header="Mã hóa chất" style="width: 10%"></Column>
                <Column field="chemicalType" header="Dạng hóa chất" style="width: 10%"></Column>
                <Column field="chemicalTypeInfo" header="Mô tả đóng gói" style="width: 5%"></Column>
                <Column field="chemicalClass" header="Phân loại hóa chất" style="width: 20%"></Column>
                <Column field="chemicalClassInfo" header="Phân loại hóa chất" style="width: 10%"></Column>
                <Column field="position" header="Vị trí" style="width: 10%"></Column>
                <Column field="impExpType" header="Thao tác" style="width: 10%"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    components: {
        DataTable,
        Column,
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
    },
}
</script>

<style scoped>
.table {
    width: 100%;
}
</style>