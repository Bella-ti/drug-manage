<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>销售员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="userList" border style="width: 100%">
            <el-table-column prop='order' label="编号">
            </el-table-column>
            <el-table-column prop='username' label="用户名">
            </el-table-column>
            <el-table-column prop='type' label="职务" >
            </el-table-column>
            <el-table-column prop='isAdmin' label="是否管理员">
            </el-table-column>
            <el-table-column prop='information.phone' label="联系方式">
            </el-table-column>
            <el-table-column prop='information.sayAs' label="说明">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="default" @click="changeInfo($event, scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete($event, scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button class='addList' type='primary' size="small" @click="handlerAdd">添加</el-button>
        <div v-if="dialogVisible">
        <el-dialog title="修改用户信息" v-model="dialogVisible" @close="cancelChange" size="tiny">
          <el-form ref="form" :model="handleInfo" label-width="70px">
            <el-form-item label="编号" width='100px'>
                <el-input disabled v-model="handleInfo.order"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="handleInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="职务">
                <!-- <el-input v-if='!isAdd' v-model="handleInfo.type"></el-input> -->
                <el-select v-model="value" placeholder="职务">
                    <el-option v-for="(item,j) in options" :label="item.label" :key="j" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="handleInfo.information.phone"></el-input>
            </el-form-item>
            <el-form-item label="说明">
                <el-input v-model="handleInfo.information.sayAs"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-checkbox v-model="handleInfo.isAdmin">是否管理员</el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelChange">取 消</el-button>
            <el-button type="primary" v-if='isAdd' @click="addUser">确 定</el-button>
            <el-button type="primary" v-if='!isAdd' @click="handleChange">确 定</el-button>
          </div>
        </el-dialog>
      </div>
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
        information: {}
      },
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
    this.getAllUser()
  },
  computed: {
  },
  methods: {
    getAllUser() {
      this.$http.get('/api/user').then((res) => {
        this.userList = res.data
        for (var i in this.userList) {
          this.userList[i].type = this.switchType(this.userList[i])
          this.userList[i].isAdmin ? this.userList[i].isAdmin = '是' : this.userList[i].isAdmin = '否'
        }
      })
      return this.userList
    },
    switchType(information) {
      switch (information.type) {
        case 1:
          information.type = '管理员'
          break
        case 2:
          information.type = '销售员'
          break
        case 3:
          information.type = '仓库管理员'
          break
        default:
          information.type = ''
      }
      return information.type
    },
    // 删除
    handleDelete(e, index, row) {
      const id = row._id
      this.$http.delete(`/api/user/${id}`).then(() => {
        this.getAllUser()
      })
    },
    changeInfo(e, index, row) {
      this.handleInfo = this.$lodash.cloneDeep(row)
      row.isAdmin === '是' || row.isAdmin === true ? this.handleInfo.isAdmin = true : this.handleInfo.isAdmin = false
      this.value = this.handleInfo.type
      this.dialogVisible = true
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
        information: {
          address: this.handleInfo.information.address,
          phone: this.handleInfo.information.phone,
          sayAs: this.handleInfo.information.sayAs
        },
        isAdmin: false
      }).then((res) => {
        console.log(res)
        return this.getAllUser
      }).catch((err) => {
        console.log(err)
      })
      this.handleInfo = {
        information: {}
      }
    },
    cancelChange() {
      this.dialogVisible = false
      this.handleInfo = {
        information: {}
      }
    },
    getDate() {
      const date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currendate = '' + date.getFullYear() + month + strDate + date.getHours() + date.getMinutes() + date.getSeconds()
      return currendate
    },
    handlerAdd() {
      this.value = ''
      this.isAdd = true
      this.dialogVisible = true
      this.handleInfo.order = this.getDate()
    },
    addUser() {
      this.$http.post('/api/user', {
        order: this.handleInfo.order,
        username: this.handleInfo.username,
        password: 123456,
        type: this.value,
        information: {
          address: '',
          phone: this.handleInfo.information.phone,
          sayAs: this.handleInfo.information.sayAs
        }
      }).then((res) => {
        this.isAdd = false
        this.dialogVisible = false
        this.getAllUser()
      }).catch((err) => {
        console.log(err)
      })
      this.handleInfo = {
        information: {}
      }
    }
  },
  beforeDestroy() {
    this.handleInfo = null
  }
}
</script>
<style>
.el-table-column {
  text-align: center;
}

.addList {
  margin: 20px;
  padding: 10px;
}
</style>
