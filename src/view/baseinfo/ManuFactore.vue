<template>
  <div class="factory">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 基本信息</el-breadcrumb-item>
        <el-breadcrumb-item>供货单位管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form class='form-condition' ref="form" :model="form" label-width="60px">
      <div style='margin-right:20px'>
        <el-form-item label="查询">
          <el-input v-model="form.buisNum" placeholder="请输入供应商编号"></el-input>
        </el-form-item>
      </div>
      <div style='height:33px;'>
        <el-button size='small' type="primary" @click="addToTable">查询</el-button>
        <el-button size='small' type="primary" @click="addCompany">添加</el-button>
      </div>
    </el-form>
    <el-table :data="company" border style="width: 100%">
      <el-table-column prop="id" label="编码" width='70px'></el-table-column>
      <el-table-column prop="name" label="供货单位" width='140px'></el-table-column>
      <el-table-column prop="pinyin" label="拼音" width='100px'></el-table-column>
      <el-table-column prop="concatName" label="联系人" width='80px'></el-table-column>
      <el-table-column prop="concatTel" label="电话" width='125px'></el-table-column>
      <el-table-column prop="license" label="营业执照" width='100px'></el-table-column>
      <el-table-column prop="isAllow" label="经营许可证" width='100px'></el-table-column>
      <el-table-column prop="quality" label="质量协议书" width='100px'></el-table-column>
      <el-table-column prop="legalPower" label="法人委托书" width='100px'></el-table-column>
      <el-table-column label="操作" width="auto">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete($event, scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" size="small">
      <p slot="title" class="dialog-title"><span v-if='!isChange'>添加供应商信息</span><span v-else>修改供应商信息</span></p>
      <el-form class='dialog-form' ref="form" :model="form" label-width="80px">
        <el-form-item label="单位全称" width='100px'>
          <el-input type='text' v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简写">
          <el-input type='text' v-model="form.rename"></el-input>
        </el-form-item>
        <el-form-item label="唯一编号">
          <el-input type='text' v-model="form.id"></el-input>
          <span>{{tips}}</span>
        </el-form-item>
        <el-form-item label="拼音码">
          <el-input type='text' v-model="form.pinyin"></el-input>
        </el-form-item>
        <el-form-item label="单位地址">
          <el-input type='text' v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <el-form class='dialog-form' ref="form" :model="form" label-width="90px">
        <el-form-item label="联系人">
          <el-input type='text' v-model="form.concatName"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input type='text' v-model="form.concatTel"></el-input>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-input type='text' v-model="form.license"></el-input>
        </el-form-item>
        <el-form-item label="经营许可证">
          <el-input type='text' v-model="form.isAllow"></el-input>
        </el-form-item>
        <el-form-item label="质量协议书">
          <el-input type='text' v-model="form.quality"></el-input>
        </el-form-item>
        <el-form-item label="法书委托人">
          <el-input type='text' v-model="form.legalPower"></el-input>
        </el-form-item>
      </el-form>
      <el-form class='infomation' ref="form" :model="form" label-width="80px">
        <el-form-item label="说明">
          <el-input type='textarea' v-model="form.info"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if='isChange' @click="changeCompanyTrue">确 定</el-button>
        <el-button type="primary" v-if='!isChange' @click="addCompanyTrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        pinyin: '',
        concatName: '',
        concatTel: '',
        license: '',
        isAllow: '',
        quality: '',
        legalPower: '',
        address: '',
        info: '',
        buisNum: ''
      },
      dialogVisible: false,
      company: [],
      isChange: false,
      tips: ''
    }
  },
  created() {
    this.getBusiness
  },
  computed: {
    getBusiness() {
      this.$http.get('/api/manufacturer').then((res) => {
        this.company = res.data
      })
      return this.company
    }
  },
  watch: {
    getCompany(val, oldVal) {
      this.company = val
    }
  },
  methods: {
    // 查询
    addToTable() {
      const arr = []
      this.$http.get('/api/manufacturer').then((res) => {
        if (this.form.buisNum == '') {
          this.company = res.data
          return
        }
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].id == this.form.buisNum) {
            arr.push(res.data[i])
          }
        }
        this.company = arr
      }).catch((error) => {
        console.log(error)
      })
    },
    changeCompanyTrue() {
      if (!this.form.id) {
        this.tips = '*必填'
        return
      }
      const id = this.form._id
      this.$http.put(`/api/user/${id}`, {
        id: this.form.id,
        name: this.form.name,
        pinyin: this.form.pinyin,
        concatName: this.form.concatName,
        concatTel: this.form.concatTel,
        license: this.form.license,
        isAllow: this.form.isAllow,
        quality: this.form.quality,
        legalPower: this.form.legalPower,
        rename: this.form.rename,
        address: this.form.address
      }).then((res) => {
        console.log(res)
        this.getAllUser
      }).catch((err) => {
        console.log(err)
      })
    },
    // 添加
    addCompany() {
      this.dialogVisible = true
      this.isChange = false
    },
    addCompanyTrue() {
      if (!this.form.id) {
        this.tips = '*必填'
        return
      }
      this.$http.post('/api/manufacturer', {
        id: this.form.id,
        name: this.form.name,
        pinyin: this.form.pinyin,
        concatName: this.form.concatName,
        concatTel: this.form.concatTel,
        license: this.form.license,
        isAllow: this.form.isAllow,
        quality: this.form.quality,
        legalPower: this.form.legalPower
      }).then((res) => {
        console.log(res)
        this.dialogVisible = false
        this.getBusiness
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogVisible = true
      this.isChange = true
      this.tips = ''
      const obj = JSON.parse(JSON.stringify(row))
      for (var i in obj) {
        if (obj[i] == undefined) {
          obj[i] = ''
        }
      }
      this.form = obj
    },
    // 删除
    handleDelete(e, index, row) {
      const id = this.company[index]._id
      this.$http.delete(`/api/manufacturer/${id}`).then(() => {
        this.getBusiness
      })
    }
  }
}
</script>
<style>
.factory .el-table .cell {
  white-space: nowrap;
  word-break: normal
}

.factory .el-table .cell,
.factory .el-table th>div {
  padding: 0
}

.factory .query {
  width: 60px
}
.factory .el-table td, .factory .el-table th{
  padding:5px;
  text-align:center
}
.factory .form-condition {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
}

.factory .el-input__inner {
  height: 30px;
  width: 200px
}

.factory .result {
  display: flex;
  flex-direction: row;
  margin-top: 15px
}

.factory .result .total {
  width: 100px
}

.factory .el-button--small {
  margin-top: 3px
}

.factory .dialog-form {
  float: left;
  width: 50%
}

.factory .infomation {
  width: 100%;
  float: left
}

.factory .infomation .el-form-item {
  padding-right: 20px;
}

.factory .el-dialog__body {
  padding-bottom: 0
}

.factory .el-form-item__content>span {
  color: red;
  font-size: 12px;
  margin-bottom: 22px;
  display: block;
  height: 36px
}
</style>
