<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>操作员权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  
    <el-table :data="userInfo" border style="width: 100%">
      <el-table-column prop='order' label="编号" width="150">
      </el-table-column>
      <el-table-column prop='username' label="姓名">
      </el-table-column>
      <el-table-column label="是否管理员" width="180">
        <template scope="scope">
          <el-checkbox :checked='userInfo.type === "1"'></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <el-button class='addList' type='primary' size="small" @click="addUser">添加</el-button>
    <el-dialog title="修改用户信息" v-model="dialogVisible" size="tiny">
      <el-form ref="form" :model="handleInfo" label-width="80px">
        <el-form-item label="编号" width='100px'>
          <el-input v-model="handleInfo.order"></el-input>
        </el-form-item>
        <el-form-item label="销售员">
          <el-input v-model="handleInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="handleInfo.type"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="handleInfo.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                                          <el-button @click="dialogVisible = false">取 消</el-button>
                                          <el-button type="primary" @click="handleChange">确 定</el-button>
                                        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      userInfo: [{
        order: '',
        name: '',
        type: '',
        checked: false
      }],
      handleInfo: {
        order: '',
        name: '',
        type: '',
        phone: ''
      },
      editOrder: 0
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
        console.log(res.data)
        // var userList = []
        // for (var i = 0; i < res.data; i++) {
        //   var user = {}
        //   var checked = false
        //   if (res.data[i].type == 1) {
        //     checked = true
        //   }
        //   console.log(res.data[i].order)
        //   user = {
        //     order: res.data[i].order,
        //     name: res.data[i].username,
        //     type: res.data[i].type,
        //     checked: check
        //   }
        //   userList.push(user)
        // }
        this.userInfo = res.data
      })
      return this.userInfo
    }
  },
  methods: {
    // deep copy
    deepCopy(p, c) {
      var c = c || {};
      for (var i in p) {
        if (typeof p[i] === 'object') {
          c[i] = (p[i].constructor === Array) ? [] : {};
          deepCopy(p[i], c[i]);
        } else {
          c[i] = p[i];
        }
      }
      return c;
    },
    // 编辑
    handleEdit(index, row) {
      this.editOrder = index
      this.dialogVisible = true
      this.handleInfo = row
    },
    // 删除
    handleDelete(e, index, row) {
      this.userInfo.splice(index, 1)
    },
    // 确定修改
    handleChange() {
      this.userInfo[this.editOrder] = this.deepCopy(this.handleInfo)
      this.dialogVisible = false
    },
    addUser() {
      this.dialogVisible = true
      // this.userInfo.push(this.handleInfo)
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
