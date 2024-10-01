<template>
    <div>
      <div style="margin-bottom: 10px;">
        <b>
          <h2>Đăng kí nơi sản xuất</h2>
        </b>
      </div>
      <div>
        <div class="col-md-12 d-flex justify-content-center">
          <BrandRegisterForm @updateData="getBrandData"/>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <BrandsViewTable :brands="brands" @updateData="updateDataTable"/>
      </div>
    </div>
  </template>
  
  <script>
  import BrandsViewTable from '@/components/brand/BrandsViewTable.vue'
  import BrandRegisterForm from '@/components/brand/BrandRegisterForm.vue'
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';
  
  export default {
    data() {
      return {
        brands: null
      }
    },
    components: {
        BrandRegisterForm,
        BrandsViewTable
    }
    ,
    methods: {
      searchData(data) {
        console.log(data)
        this.brands = data;
      },
      updateDataTable(brandId) {
        this.brands = this.brands.filter(item => item.id != brandId);
      },
      async getBrandData()
      {
        this.brands = await axiosWrapper.get(API_PATH.BRAND.LIST_MASTER);
      }
    },
    mounted(){
        this.getBrandData()
    }
  }
  </script>