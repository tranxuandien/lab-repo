<template>
    <div>
        <div style="margin-bottom: 10px;">
            <b>
                <h2>Tình trạng hóa chất trong phòng thí nghiệm</h2>
            </b>
        </div>
        <div>
            <div class="col-md-12 d-flex justify-content-center">
                <SearchChemicalManagerForm @getData="searchData" />
            </div>
        </div>
        <div>
            <ChemicalsManagerViewTable :chemicals="chemicals" @updateData="updateDataTable" />
        </div>
    </div>
</template>

<script>
import ChemicalsManagerViewTable from '@/components/chemical/ChemicalsManagerViewTable.vue'
import SearchChemicalManagerForm from '@/components/chemical/SearchChemicalManagerForm.vue'

export default {
    data() {
        return {
            chemicals: null
        }
    },
    components: {
        SearchChemicalManagerForm,
        ChemicalsManagerViewTable
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