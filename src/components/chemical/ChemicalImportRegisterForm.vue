<template>
  <div>
    <div>
      <Vueform ref="form$" @submit="chemicalImport">
        <GroupElement name="scanCode" label="Mã barcode hóa chất">
          <TextElement name="barcode" placeholder="Mã hóa chất" :columns="6" @change="getInfo" rules="required"
            :messages="{ required: 'Nhập mã barcode hóa chất' }">
          </TextElement>
        </GroupElement>
        <GroupElement name="importInfo" label="Thông tin nhập hóa chất">
          <TextElement name="manufactoryQuantity" placeholder="K/lượng,Thể tích" :columns="2" rules="required"
            :messages="{ required: 'Nhập lượng hóa chất' }" :mask="{
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
            }" />
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
      chemical: null,
      positionLst: []
    }
  },
  methods: {
    async getInfo(n) {
      if (/^\d+$/.test(n) && n.length == 10)//check barcode length
      {
        try {
          this.chemical = await axiosWrapper.get(API_PATH.CHEMICAL.REGISTER + "?barcode=" + n);
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
      });
    },
    async getAllPosition() {
      this.positionLst = await axiosWrapper.get(API_PATH.POSITION);
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