<template>
    <Vueform :endpoint="false" @submit="submitForm" name="registerForm">
        <GroupElement name="chemicalInformation" label="Thông tin cơ bản">
            <TextElement name="name" rules="required" :messages="{ required: 'Nhập tên hóa chất' }"
                placeholder="Tên hóa chất" :columns="6" />
            <SelectElement :search="true" label-prop="name" value-prop="id" name="brand" :native="true"
                :items="brandList" placeholder="Nơi sản xuất" :columns="3" rules="required"
                :messages="{ required: 'Chọn nơi sản xuất' }" />
        </GroupElement>
        <GroupElement name="chemicalClassGroup" label="Phân loại hóa chất">
            <SelectElement :search="true" name="chemicalClass" :native="false"
                :items="['Sinh học phân tử', 'Hóa chất vi sinh', 'Dung môi']" :columns="2"
                placeholder="Phân loại hóa chất" default="Sinh học phân tử" rules="required"
                :messages="{ required: 'Chọn phân loại hóa chất' }" />
            <SelectElement :search="true" name="chemicalClassInfo" :native="false" :items="['Vô cơ', 'Hữu cơ']"
                :columns="2" placeholder="Loại HC vi sinh" :conditions="[
                    [
                        'chemicalClassGroup.chemicalClass',
                        '==',
                        'Hóa chất vi sinh'
                    ]
                ]" rules="required" :messages="{ required: 'Chọn loại HC vi sinh' }" />
            <TextElement name="chemicalClassInfo1" :native="false" :columns="3" placeholder="Mô tả phân loại hóa chất"
                :conditions="[
                    [
                        'chemicalClassGroup.chemicalClass',
                        '!=',
                        'Hóa chất vi sinh'
                    ]
                ]" rules="required" :messages="{ required: 'Chọn mô tả phân loại hóa chất' }" />
            <TextElement name="otherInfo" :native="false" :columns="2" placeholder="Mô tả khác" />
        </GroupElement>
        <TextElement name="registerUser" :columns="2" hidden="true" />
        <GroupElement name="chemicalImportDescription" label="Thông tin nhập hóa chất">
            <SelectElement :search="true" name="chemicalType" :native="false" :items="['Dung dịch', 'Bột']" :columns="2"
                placeholder="Loại hóa chất" rules="required" :messages="{ required: 'Chọn loại hóa chất' }"
                default="Dung dịch" />
            <SelectElement :search="true" name="chemicalTypeInfo" :native="false" :items="['Lọ', 'Gói']" :columns="2"
                placeholder="Đóng gói" rules="required" :messages="{ required: 'Chọn cách đóng gói' }" default="Lọ" />
            <TextElement id="alertQuantity" name="alertQuantity" placeholder="Ngưỡng k/lượng,Thể tích gửi thông báo" :columns="3"
                rules="required" :messages="{ required: 'Nhập ngưỡng k/lượng,thể tích gửi thông báo' }" :mask="{
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
                }" />(g/ml)
        </GroupElement>
        <ButtonElement name="submit" add-class="mt-2" submits>
            Đăng kí hóa chất
        </ButtonElement>
    </Vueform>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';
import { useAuthStore } from '@/stores/auth';

export default {
    data() {
        return {
            chemical: {
                name: '',
                manufactoryQuantity: '',
                shptChemical: '',
                other: '',
                importUser: '',
                chemicalProperty: '',
                purchaseSrc: '',
            },
            brandList: null,
            positionLst: null,
        }
    },
    methods: {
        async getAllBrand() {
            this.brandList = await axiosWrapper.get(API_PATH.BRAND.LIST_MASTER);
        }
        ,
        async submitForm(form$) {
            const data = form$.data
            const { user } = useAuthStore();
            form$.submitting = true
            //refine
            data.registerUser = user.data?.userDto?.username
            if (data.chemicalClass != 'Hóa chất vi sinh') {
                data.chemicalClassInfo = data.chemicalClassInfo1;
            }
            try {
                await axiosWrapper.post(API_PATH.CHEMICAL.ADD, data).finally(() => {
                    form$.submitting = false;
                });
            }
            catch (error) {
                console.log(error);
                this.errorMessage = error.data.errorMessage;
            }
        }
    },
    mounted() {
        this.getAllBrand()
    }
}
</script>