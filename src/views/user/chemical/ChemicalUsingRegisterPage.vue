<template>
    <div>
      <div style="margin-bottom: 10px;">
        <h2><b>Đăng kí sử dụng hóa chất</b></h2>
      </div>
      <div>
        <ChemicalUsingRegisterForm />
      </div>
    </div>
  </template>
  
  <script>
  import ChemicalUsingRegisterForm from '@/components/chemical/ChemicalUsingRegisterForm.vue'
  
  export default {
    components: {
        ChemicalUsingRegisterForm
    }
  }
  </script>