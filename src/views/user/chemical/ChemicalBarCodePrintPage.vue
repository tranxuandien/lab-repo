<template>
    <div>
        <div style="margin-bottom: 10px;">
            <h2><b> In tem hóa chất</b></h2>
        </div>
        <Vueform :endpoint="false" @submit="print">
            <ListElement name="list" add-text="Thêm hóa chất">
                <template #default="{ index }">
                    <ObjectElement :name="index">
                        <ChemicalSelectBox />
                        <TextElement name="printNumber" input-type="number" placeholder="Nhập số lượng tem"
                            :rules=[maxPrint] :columns="2" :messages="{ required: 'Nhập khối lượng hóa chất' }">
                        </TextElement>
                    </ObjectElement>
                </template>
            </ListElement>
            <ButtonElement id="printButton" name="submit" add-class="mt-2" submits>In tem</ButtonElement>
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
        return value && (value < 10) && /^\d+$/.test(value);
    }

    get msg() {
        return 'Nhập số lượng tem (không vượt quá 10)'
    }
}

export default {
    data() {
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
            if (data.list?.length == 0)
                return;
            console.log(data)
            form$.submitting = true
            await axiosWrapper.post(API_PATH.CHEMICAL.PRINT, data, true)
                .finally(() => {
                    form$.submitting = false
                })
        }
    }
}
</script>