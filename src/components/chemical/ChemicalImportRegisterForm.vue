<template>
  <div>
    <div>
      <Vueform :endpoint="false" ref="form$" @submit="chemicalImport">
        <GroupElement name="scanCode" label="Mã barcode hóa chất">
          <TextElement id="barcode" name="barcode" placeholder="Mã hóa chất" :columns="6" @change="getInfo"
            rules="required" :messages="{ required: 'Nhập mã barcode hóa chất' }">
          </TextElement>
        </GroupElement>
        <GroupElement name="importInfo" label="Thông tin nhập hóa chất">
          <TextElement id="quantity" name="manufactoryQuantity" placeholder="K/lượng,Thể tích" :columns="2"
            rules="required" :messages="{ required: 'Nhập lượng hóa chất' }" :mask="{
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
          <DateElement name="expiredDate" :columns="1" placeholder="Hạn sử dụng" rules="required"
            :messages="{ required: 'Chọn hạn sử dụng' }" />
        </GroupElement>
        <GroupElement name="importInfo#">
          <SelectElement :search="true" name="position" label-prop="positionInfo" value-prop="id" :items="positionLst"
            placeholder="Vị trí đặt hóa chất" :columns="2" rules="required"
            :messages="{ required: 'Chọn vị trí đặt hóa chất' }" />
          <TextElement name="chemicalStatus" placeholder="Tình trạng hóa chất" :columns="2" />
          <TextElement name="purchaseSrc" placeholder="Nguồn" :columns="2" />
        </GroupElement>
        <ButtonElement :disabled="!chemical" submits name="submit" add-class="mt-2 btn-import">
          Đăng kí
        </ButtonElement>
      </Vueform>
    </div>
    <div v-if="chemical">
      <div>
        <h6>Thông tin hóa chất</h6>
      </div>
      <div>
        <table class="table table-bordered table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Tên hóa chất</th>
              <th>Hãng sản xuất</th>
              <th>Dạng hóa chất</th>
              <th>Mô tả đóng gói</th>
              <th>Phân loại hóa chất</th>
              <th>Phân loại chi tiết</th>
              <th>Người đăng ký HC</th>
              <th>Thông tin khác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="chemical">
              <td>{{ chemical.name }}</td>
              <td>{{ chemical.brand }}</td>
              <td>{{ chemical.chemicalType }}</td>
              <td>{{ chemical.chemicalTypeInfo }}</td>
              <td>{{ chemical.chemicalClass }}</td>
              <td>{{ chemical.chemicalClassInfo }}</td>
              <td>{{ chemical.registerUser }}</td>
              <td>{{ chemical.otherInfo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
  data() {
    return {
      chemical: null,
      positionLst: []
    }
  },
  methods: {
    async getInfo(n) {
      if (/^\d+$/.test(n) && n.length == 10)//check barcode length
      {
        try {
          await axiosWrapper.get(API_PATH.CHEMICAL.REGISTER + "?barcode=" + n).then((data) => {
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
    async chemicalImport($form) {
      const data = $form.data;
      console.log($form)
      await axiosWrapper.post(API_PATH.CHEMICAL.IMPORT, data).then(() => {
        this.$refs.form$.reset();
        this.chemical = null;
        document.getElementById("barcode").focus();
      });
    },
    async getAllPosition() {
      this.positionLst = await axiosWrapper.get(API_PATH.POSITION.LIST_MASTER);
    }
  },
  mounted() {
    this.getAllPosition()
  }
}
</script>
<style>
.btn-import {
  margin-bottom: 50px;
}
</style>