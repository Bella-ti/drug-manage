<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>操作员权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table ref='multipleTable' :data="userInfo" border style="width: 100%">
      <el-table-column prop='order' label="编号" width="150">
      </el-table-column>
      <el-table-column prop='name' label="姓名">
      </el-table-column>
      <el-table-column label="是否管理员" width="180">
        <template scope="scope">
          <el-checkbox v-model='scope.row.isAdmin' @change='isNotAdmin(scope.row)' ></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: [{
        id: '',
        order: '',
        name: '',
        type: '',
        checked: false
      }],
      editOrder: 0,
      putUser: []
    }
  },
  watch: {
    sliderPos: (val, oldVal) => {
      this.userInfo = val
    }
  },
  created() {
    this.getAllUser
  },
  computed: {
    getAllUser() {
      this.$http.get('/api/user').then((res) => {
        this.putUser = res.data
        var userList = []
        for (var i = 0; i < res.data.length; i++) {
          var user = {}
          user = {
            id: res.data[i]._id,
            order: res.data[i].order,
            name: res.data[i].username,
            type: res.data[i].type,
            isAdmin: res.data[i].isAdmin
          }
          userList.push(user)
        }
        this.userInfo = userList
      })
      return this.userInfo
    }
  },
  methods: {
    isNotAdmin(selection) {
      const status = selection.isAdmin
      var type = selection.type
      if (status == true) {
        type = 1
      }
      const id = selection.id
      for (var i in this.putUser) {
        if (this.putUser[i]._id == id) {
          var user = this.putUser[i]
        }
      }
      this.$http.put(`/api/user/${id}`, {
        order: user.order,
        username: user.username,
        password: user.password,
        type: type,
        isAdmin: status
      }).then((res) => {
        console.log(res)
        this.getAllUser
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.el-table-column {
  text-align: center
}

.addList {
  margin: 20px;
  padding: 10px
}
</style>
