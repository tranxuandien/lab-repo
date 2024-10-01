<template>
  <aside class="custom-sidenav">
    <ul>
      <li><router-link to="/">Trang chủ</router-link></li>
      <li v-if="isShowUser"><router-link to="/user/chemical">Hóa chất</router-link></li>
      <li v-if="isShow"><router-link to="/user/chemical/register">Đăng kí hóa chất</router-link></li>
      <li v-if="isShow"><router-link to="/user/chemical/barcode/print">In tem hóa
          chất</router-link></li>
      <li v-if="isShow"><router-link to="/user/chemical/import/register">Đăng kí nhập hóa chất</router-link></li>
      <li v-if="isShowUser"><router-link to="/user/chemical/using/register">Đăng ký sử dụng hóa
          chất</router-link></li>
      <li v-if="isShow"><router-link to="/user/chemical/manager">Kiểm tra tình trạng HC</router-link></li>
      <li><router-link to="/user/chemical/using/history">Lịch sử sử dụng HC</router-link></li>
      <li v-if="isShow"><router-link to="/user/brand/register">Đăng kí nơi sản xuất</router-link></li>
      <li v-if="isShow"><router-link to="/user/position/register">Đăng kí vị trí đặt HC</router-link></li>
      <li><router-link to="/about">Giới thiệu</router-link></li>
    </ul>
  </aside>
</template>
<script>
import { useAuthStore } from '@/stores/auth';


export default {
  data() {
    return {
      isShow: false,
      isShowUser: false
    }
  },
  methods: {
    checkIsShow() {
      const { hasRoleAdmin, isLogIn } = useAuthStore();
      this.isShow = hasRoleAdmin() && isLogIn();
      this.isShowUser = isLogIn();
    }
  },
  mounted() {
    // eslint-disable-next-line
    this.checkIsShow();
    // this.user = user;
  }
}
</script>
<style scoped>
.custom-sidenav {
  height: 100vh;
  background-color: #343a40;
  color: white;
  padding: 20px;
  /* position: fixed;
  top: 0;
  left: 0; */
  overflow-y: auto;
}

.custom-sidenav ul {
  list-style-type: none;
  padding: 0;
}

.custom-sidenav ul li {
  margin: 15px 0;
}

.custom-sidenav ul li a {
  color: white;
  text-decoration: none;
}

.custom-sidenav ul li a:hover {
  text-decoration: underline;
}
</style>
