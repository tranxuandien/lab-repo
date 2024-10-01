<template>
  <div>
    <div style="margin-bottom: 10px;">
      <b>
        <h2>Đăng kí nơi đặt hóa chất</h2>
      </b>
    </div>
    <div>
      <div class="col-md-12 d-flex justify-content-center">
        <PositionRegisterForm @updateData="getPositionData"/>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <PositionsViewTable :positions="positions" @updateData="updateDataTable" />
    </div>
  </div>
</template>

<script>
import PositionsViewTable from '@/components/position/PositionsViewTable.vue'
import PositionRegisterForm from '@/components/position/PositionRegisterForm.vue'
import { axiosWrapper } from '@/plugin/axiosWrapper';
import { API_PATH } from '@/router/apiPath';

export default {
  data() {
    return {
      positions: null
    }
  },
  components: {
    PositionRegisterForm,
    PositionsViewTable
  }
  ,
  methods: {
    searchData(data) {
      console.log(data)
      this.positions = data;
    },
    updateDataTable(positionId) {
      this.positions = this.positions.filter(item => item.id != positionId);
    },
    async getPositionData() {
      this.positions = await axiosWrapper.get(API_PATH.POSITION.LIST_MASTER);
    }
  },
  mounted() {
    this.getPositionData()
  }
}
</script>