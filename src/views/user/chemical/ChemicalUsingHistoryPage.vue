<template>
    <div>
        <div style="margin-bottom: 10px;">
            <b>
                <h2>Lịch sử sử dụng hóa chất trong phòng thí nghiệm</h2>
            </b>
        </div>
        <div>
            <div class="col-md-12 d-flex justify-content-center">
                <SearchChemicalUsingHistoryForm @getData="searchData" />
            </div>
        </div>
        <div>
            <ChemicalsUsingHistoryViewTable :chemicals="chemicals" @updateData="updateDataTable" />
        </div>
    </div>
</template>

<script>
import ChemicalsUsingHistoryViewTable from '@/components/chemical/ChemicalsUsingHistoryViewTable.vue'
import SearchChemicalUsingHistoryForm from '@/components/chemical/SearchChemicalUsingHistoryForm.vue'

export default {
    data() {
        return {
            chemicals: null
        }
    },
    components: {
        SearchChemicalUsingHistoryForm,
        ChemicalsUsingHistoryViewTable
    }
    ,
    methods: {
        searchData(data) {
            console.log(data)
            this.chemicals = data;
        },
        updateDataTable(chemicalId) {
            this.chemicals = this.chemicals.filter(item => item.id != chemicalId);
        }
    }
}
</script>