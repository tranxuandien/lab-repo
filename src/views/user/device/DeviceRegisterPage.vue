<template>
  <div>
    <div style="margin-bottom: 10px;">
      <h2><b>Đăng kí thiết bị</b></h2>
    </div>
    <div>
      <DeviceRegisterForm />
    </div>
  </div>
</template>

<script>
import DeviceRegisterForm from '@/components/device/DeviceRegisterForm.vue'

export default {
  components: {
    DeviceRegisterForm
  }
}
</script>