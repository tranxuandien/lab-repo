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
        <div style="margin-bottom: 10px;">
            <b>
                <h2>Biểu đồ lịch sử sử dụng hóa chất</h2>
            </b>
        </div>
        <div v-if="chartData" class="card">
            <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
        </div>
    </div>
</template>

<script>
import ChemicalsUsingHistoryViewTable from '@/components/chemical/ChemicalsUsingHistoryViewTable.vue'
import SearchChemicalUsingHistoryForm from '@/components/chemical/SearchChemicalUsingHistoryForm.vue'
import Chart from 'primevue/chart';

export default {
    data() {
        return {
            chemicals: null,
            chartData: null,
            chartOptions: null
        }
    },
    components: {
        SearchChemicalUsingHistoryForm,
        ChemicalsUsingHistoryViewTable,
        Chart
    }
    ,
    methods: {
        searchData(data, chartData) {
            console.log(data)
            this.chemicals = data;
            this.chartData = this.setChartData(chartData)
        },
        updateDataTable(chemicalId) {
            this.chemicals = this.chemicals.filter(item => item.id != chemicalId);
        },
        setChartData(data) {
            const documentStyle = getComputedStyle(document.documentElement);
            if (!data) return {};
            return {
                labels: data.map((item) => { return item.userName }),
                datasets: [
                    {
                        label: 'Lượng hóa chất sử dụng',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: data.map((item) => { return item.useQuantity })
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
        }
    },
    mounted() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    }
}
</script>