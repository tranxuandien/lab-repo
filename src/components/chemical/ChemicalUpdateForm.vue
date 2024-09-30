<template>
    <Vueform ref="form$" :endpoint="false" @submit="submitForm" name="updateForm">
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
        <TextElement name="id" :columns="2" hidden="true" />
        <GroupElement name="chemicalImportDescription" label="Thông tin nhập hóa chất">
            <SelectElement :search="true" name="chemicalType" :native="false" :items="['Dung dịch', 'Bột']" :columns="2"
                placeholder="Loại hóa chất" rules="required" :messages="{ required: 'Chọn loại hóa chất' }"
                default="Dung dịch" />
            <SelectElement :search="true" name="chemicalTypeInfo" :native="false" :items="['Lọ', 'Gói']" :columns="2"
                placeholder="Đóng gói" rules="required" :messages="{ required: 'Chọn cách đóng gói' }" default="Lọ" />
        </GroupElement>
        <GroupElement>
            <ButtonElement name="submit" add-class="mt-2" submits :columns="2" :full="true" size="md">
                Cập nhật hóa chất
            </ButtonElement>
            <ButtonElement name="goBack" add-class="mt-2" @click="$router.go(-1)" :columns="1" :full="true" size="md">
                Trở lại
            </ButtonElement>
        </GroupElement>
    </Vueform>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
    data() {
        return {
            brandList: null,
            item: null
        }
    },
    props: ['chemical'],
    methods: {
        async getAllBrand() {
            this.brandList = await axiosWrapper.get(API_PATH.BRAND);
        },
        async submitForm(form$) {
            const data = form$.data
            form$.submitting = true
            if (data.chemicalClass != 'Hóa chất vi sinh') {
                data.chemicalClassInfo = data.chemicalClassInfo1;
            }
            try {
                await axiosWrapper.put(API_PATH.CHEMICAL.UPDATE, data).finally(() => {
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
        this.getAllBrand();
    },
    updated() {
        this.item = this.chemical.data;
        this.$refs.form$.update({ // updates form data
            name: this.item.name,
            chemicalClass: this.item.chemicalClass,
            chemicalClassInfo: 'Hóa chất vi sinh' === this.item.chemicalClass ? this.item.chemicalClassInfo : null,
            chemicalClassInfo1: 'Hóa chất vi sinh' === this.item.chemicalClass ? null : this.item.chemicalClassInfo,
            chemicalType: this.item.chemicalType,
            chemicalTypeInfo: this.item.chemicalTypeInfo,
            otherInfo: this.item.otherInfo,
            brand: this.item.brand,
            id: this.item.id,
            registerUser: "user"//optional
        })
    }
}
</script>