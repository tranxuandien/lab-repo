<template>
    <div>
      <div style="margin-bottom: 10px;">
        <h2><b>Đăng kí người hướng dẫn sinh viên</b></h2>
      </div>
      <div>
        <BuddyRegisterForm />
      </div>
    </div>
  </template>
  
  <script>
  import BuddyRegisterForm from '@/components/user/BuddyRegisterForm.vue'
  
  export default {
    components: {
      BuddyRegisterForm
    }
  }
  </script>