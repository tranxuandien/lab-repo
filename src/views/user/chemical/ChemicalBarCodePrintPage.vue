<template>
    <div>
        <div style="margin-bottom: 10px;">
            <h2><b> In tem hóa chất</b></h2>
        </div>
        <Vueform :endpoint="false" @submit="print">
            <ChemicalSelectBox />
            <TextElement name="printNumber" input-type="number" placeholder="Nhập số lượng tem" :rules=[maxPrint] 
                :columns="2" :messages="{ required: 'Nhập khối lượng hóa chất' }" ></TextElement>
            <ButtonElement name="submit" add-class="mt-2" submits>In tem</ButtonElement>
        </Vueform>
    </div>
</template>

<script>
import ChemicalSelectBox from '@/components/chemical/ChemicalSelectBox.vue'
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';
import { Validator } from '@vueform/vueform'
// maxPrint:
const maxPrint = class extends Validator {
  check(value) {
    return value&&(value<10)&&/^\d+$/.test(value);
  }

  get msg() {
    return 'Nhập số lượng tem (không vượt quá 10)'
  }
}

export default {
    data(){
        return {
            maxPrint
        }
    },
    components: {
        ChemicalSelectBox
    },
    methods: {
        async print(form$) {
            const data = form$.data
            form$.submitting = true
            await axiosWrapper.get(API_PATH.CHEMICAL.PRINT + '?chemicalName=' + data.chemical.chemicalName + '&chemicalId=' + data.chemical.id + '&number=' + data.printNumber, null, true)
                .finally(() => {
                    form$.submitting = false
                })
        }
    }
}
</script>