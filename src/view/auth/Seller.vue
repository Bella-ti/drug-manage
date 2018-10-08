<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>销售员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="userList" border style="width: 100%">
            <el-table-column prop='order' label="编号" width="150">
            </el-table-column>
            <el-table-column prop='username' label="用户名">
            </el-table-column>
            <el-table-column prop='type' label="职务" width="180">
            </el-table-column>
            <el-table-column prop='info.phone' label="联系方式" width="180">
            </el-table-column>
            <el-table-column prop='info.sayAs' label="说明" width="180">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleDelete($event, scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button class='addList' type='primary' size="small" @click="[isAdd = true,dialogVisible = true]">添加</el-button>
        <el-dialog title="修改用户信息" v-model="dialogVisible" size="tiny">
            <el-form ref="form" :model="handleInfo" label-width="80px">
                <el-form-item label="编号" width='100px'>
                    <el-input v-model="handleInfo.order"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="handleInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="职务">
                    <el-input v-if='!isAdd' v-model="handleInfo.type"></el-input>
                    <el-select v-else v-model="value" placeholder="职务">
                        <el-option v-for="item in options" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="handleInfo.info.phone"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="handleInfo.info.sayAs"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelChange">取 消</el-button>
                <el-button type="primary" v-if='isAdd' @click="addUser">确 定</el-button>
                <el-button type="primary" v-if='!isAdd' @click="handleChange">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      userList: [
      ],
      handleInfo: {
        info: {}
      },
      editOrder: 0,
      cancleInfo: {},
      isAdd: false,
      value: '',
      options: [
        {
          value: '1',
          label: '管理员'
        },
        {
          value: '2',
          label: '销售员'
        },
        {
          value: '3',
          label: '仓库管理员'
        }
      ]
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
        this.userList = res.data
        for (var i in this.userList) {
          this.userList[i].type = this.switchType(this.userList[i])
        }
      })
      return this.userList
    }
  },
  methods: {
    switchType(info) {
      switch (info.type) {
        case 1:
          info.type = '管理员'
          break
        case 2:
          info.type = '仓库管理员'
          break
        case 3:
          info.type = '操作员'
          break
        default:
          info.type = ''
      }
      return info.type
    },
    // 删除
    handleDelete(e, index, row) {
      const id = row._id
      this.$http.delete(`/api/user/${id}`).then(() => {
        this.getAllUser
      })
    },
    // 确定修改
    handleChange() {
      let id = this.handleInfo._id
      switch (this.handleInfo.type) {
        case '管理员':
          this.handleInfo.type = 1
          break
        case '仓库管理员':
          this.handleInfo.type = 2
          break
        case '操作员':
          this.handleInfo.type = 3
          break
        default:
          this.handleInfo.type = ''
      }
      this.dialogVisible = false
      this.$http.put(`/api/user/${id}`, {
        order: this.handleInfo.order,
        username: this.handleInfo.username,
        password: this.handleInfo.password,
        type: this.handleInfo.type,
        info: {
          address: this.handleInfo.info.address,
          phone: this.handleInfo.info.phone,
          sayAs: this.handleInfo.info.sayAs
        },
        isAdmin: false
      }).then((res) => {
        console.log(res)
        this.getAllUser
      }).catch((err) => {
        console.log(err)
      })
    },
    cancelChange() {
      this.dialogVisible = false
      this.getAllUser
    },
    addUser() {
      this.$http.post('/api/user', {
        order: this.handleInfo.order,
        username: this.handleInfo.username,
        password: 123456,
        type: this.value,
        info: {
          address: '',
          phone: this.handleInfo.info.phone,
          sayAs: this.handleInfo.info.sayAs
        }
      }).then((res) => {
        console.log(res)
        this.isAdd = false
        this.dialogVisible = false
        this.getAllUser()
      }).catch((err) => {
        console.log(err)
        this.handleInfo = {
          info: {}
        }
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
