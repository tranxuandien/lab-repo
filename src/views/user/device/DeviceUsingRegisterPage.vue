<template>
    <div>
      <div style="margin-bottom: 10px;">
        <h2><b>Đăng kí sử dụng thiết bị</b></h2>
      </div>
      <div>
        <DeviceUsingRegisterForm />
      </div>
    </div>
  </template>
  
  <script>
  import DeviceUsingRegisterForm from '@/components/device/DeviceUsingRegisterForm.vue'
  
  export default {
    components: {
        DeviceUsingRegisterForm
    }
  }
  </script>