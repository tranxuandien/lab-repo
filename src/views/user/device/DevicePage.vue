<template>
  <div>
    <div style="margin-bottom: 10px;">
      <b>
        <h2>Danh sách thiết bị</h2>
      </b>
    </div>
    <div>
      <div class="col-md-12 d-flex justify-content-center">
        <SearchDeviceForm @getData="searchData" />
      </div>
    </div>
    <div>
      <DevicesViewTable :devices="devices" @updateData="updateDataTable" />
    </div>
  </div>
</template>

<script>
import DevicesViewTable from '@/components/device/DevicesViewTable.vue'
import SearchDeviceForm from '@/components/device/SearchDeviceForm.vue'

export default {
  data() {
    return {
      devices: null
    }
  },
  components: {
    SearchDeviceForm,
    DevicesViewTable
  }
  ,
  methods: {
    searchData(data) {
      console.log(data)
      this.devices = data;
    },
    updateDataTable(deviceId) {
      this.devices = this.devices.filter(item => item.id != deviceId);
    }
  }
}
</script>