<template>
    <div>
        <div>
            <Vueform ref="form$" @submit="chemicalUsing">
                <GroupElement name="scanCode">
                    <TextElement id="barcode" name="barcode" placeholder="Mã hóa chất" :columns="3" @change="getInfo"
                        rules="required" :messages="{ required: 'Nhập mã hóa chất' }">
                    </TextElement>
                    <TextElement id="quantity" name="quantity" placeholder="Số lượng sử dụng" :columns="3"
                        rules="required" :messages="{ required: 'Nhập lượng hóa chất sử dụng' }" :mask="{
                            mask: 'number',
                            thousandsSeparator: '',     // any single char
                            scale: 2,                   // digits after fractional delimiter, 0 for integers
                            padFractionalZeros: false,  // pads zeros at end to the length of scale
                            normalizeZeros: true,       // removes zeros at ends (eg. 1,10 -> 1,1)
                            radix: '.',                 // fractional delimiter
                            mapToRadix: ['.'],          // symbols to process as radix
                            min: 0,                // minimum allowed value
                            max: 10000,                 // maximum allowed value
                            autofix: true,              // replace with min/max value if outside of range
                        }">
                    </TextElement>
                    (g/ml)
                </GroupElement>
                <ButtonElement :disabled="!chemical" submits name="submit" add-class="mt-2 btn-import">
                    Đăng kí sử dụng
                </ButtonElement>
            </Vueform>
        </div>
        <div v-if="chemical">
            <table class="table table-bordered table-striped table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>Tên hóa chất</th>
                        <th>Hãng sản xuất</th>
                        <th>Dạng hóa chất</th>
                        <th>Khối lượng đăng kí</th>
                        <th>Khối lượng còn lại</th>
                        <th>Mô tả lọ đựng</th>
                        <th>Hóa chất SHPT</th>
                        <th>Thông tin người nhập</th>
                        <th>Vị trí</th>
                        <th>Trạng thái nhập xuất</th>
                        <th>Tình trạng hóa chất</th>
                        <th>Nguồn</th>
                        <th>Khác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="chemical">
                        <td>{{ chemical.name }}</td>
                        <td>{{ chemical.brand }}</td>
                        <td>{{ chemical.chemicalType }}</td>
                        <td>{{ chemical.quantity }}</td>
                        <td>{{ chemical.remain }}</td>
                        <td>{{ chemical.description }}</td>
                        <td>{{ chemical.chemicalShpt }}</td>
                        <td>{{ chemical.registerUser }}</td>
                        <td>{{ chemical.position }}</td>
                        <td>{{ chemical.chemicalStatus }}</td>
                        <td>{{ chemical.chemicalStatus }}</td>
                        <td>{{ chemical.purchaseSrc }}</td>
                        <td>{{ chemical.otherInfo }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
    data() {
        return {
            chemical: null
        }
    },
    methods: {
        async getInfo(n) {
            if (/^\d+$/.test(n) && n.length == 10)//check barcode length
            {
                try {
                    await axiosWrapper.get(API_PATH.CHEMICAL.USING_GET + "?barcode=" + n).then((data) => {
                        this.chemical = data;
                        document.getElementById("quantity").focus();
                    });
                } catch (error) {
                    console.error('There was a problem with the axios request:', error);
                }
            }
            else {
                this.chemical = null
            }
            return;
        }
        ,
        async chemicalUsing(form$) {
            const data = form$.data
            form$.submitting = true
            try {
                await axiosWrapper.post(API_PATH.CHEMICAL.USING, data).finally(() => {
                    form$.submitting = false;
                    form$.reset();
                    document.getElementById("barcode").focus();
                });
            }
            catch (error) {
                console.log(error);
                this.errorMessage = error.data.errorMessage;
            }
        }
    }
}
</script>
<style>
.btn-import {
    margin-bottom: 50px;
}
</style>