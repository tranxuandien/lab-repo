<template>
    <div>
      <div style="margin-bottom: 10px;">
        <b>
          <h2>Danh sách người dùng</h2>
        </b>
      </div>
      <div>
        <div class="col-md-12 d-flex justify-content-center">
          <SearchUserForm @getData="searchData" />
        </div>
      </div>
      <div>
        <UsersViewTable :users="users" @updateData="updateDataTable" />
      </div>
    </div>
  </template>
  
  <script>
  import UsersViewTable from '@/components/user/UsersViewTable.vue'
  import SearchUserForm from '@/components/user/SearchUserForm.vue'
  
  export default {
    data() {
      return {
        users: null
      }
    },
    components: {
      SearchUserForm,
      UsersViewTable
    }
    ,
    methods: {
      searchData(data) {
        console.log(data)
        this.users = data;
      },
      updateDataTable(userId) {
        this.users = this.users.filter(item => item.id != userId);
      }
    }
  }
  </script>