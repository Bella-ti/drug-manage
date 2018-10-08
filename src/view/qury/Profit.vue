<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计查询</el-breadcrumb-item>
                <el-breadcrumb-item>查询出库记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
            <el-form-item label="按药品ID">
                <el-input class='query' v-model="form.value" placeholder="请输入药品ID"></el-input>
            </el-form-item>
            <el-form-item label="按出库时间">
               <el-date-picker
                      v-model="currentime"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
            </el-form-item>
            <el-form-item>
             <el-button
                    size="small"
                    type="primary"
                    @click="handlerFetch">查询</el-button>
              </el-form-item>
        </el-form>
          <el-table :data="record" border style="width: 100%">
            <el-table-column prop="outNum" label="出库单号" width='100px'></el-table-column>
            <el-table-column prop="drugId" label="药品ID" width='90px'></el-table-column>
            <el-table-column prop="validDate" label="有效期" width='110px'></el-table-column>
            <el-table-column prop="totalNum" label="剩余库存量" width='110px'></el-table-column>
            <el-table-column prop="outTime" label="出库时间" width='115px'></el-table-column>
            <el-table-column prop="saleUnitPrice" label="出库单价" width='95px'></el-table-column>
            <el-table-column prop="outType" label="出库类型" width='110px'></el-table-column>
            <el-table-column prop="operator" label="经手人" width='90px'></el-table-column>
            <el-table-column prop="size" label="说明" width='98px'></el-table-column>
            <el-table-column label="操作" width="140px">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete($event, scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          <el-dialog title="添加供应商信息" v-model="dialogVisible" size="tiny">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="出库单号" width='100px'>
                    <el-input type='text' disabled v-model="form.outNum"></el-input>
                </el-form-item>
                <el-form-item label="商品ID">
                    <el-input type='text'disabled v-model="form.drugId"></el-input>
                </el-form-item>
                <el-form-item label="出库时间">
                    <el-input type='text'disabled v-model="form.outTime"></el-input>
                </el-form-item>
                <el-form-item label="出库类型">
                    <el-input type='text'disabled v-model="form.outType"></el-input>
                </el-form-item>
                <el-form-item label="经手人">
                    <el-input type='text'disabled v-model="form.operator"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input type='text'disabled v-model="form.size"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: '',
      currentime: '',
      record: [{
        order: '',
        id: '',
        name: '',
        time: '',
        type: '',
        size: ''
      }],
      dialogVisible: false,
      form: {
        value: '',
        position: '',
        type: ''
      },
      drugs: [],
      index: '',
      currentSelection: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    getOutRecord() {
      this.$http.get('/api/outstock').then((res) => {
        this.record = res.data
        for (var i in this.record) {
          this.record[i].outTime = this.record[i].outTime.slice(0, 10)
        }
      })
      return this.record
    }
  },
  created() {
    this.getOutRecord
  },
  methods: {
    handlerFetch() {
      var arr = []
      if (this.form.value !== '') {
        this.$http.get('/api/outstock').then((res) => {
          for (var i in res.data) {
            if (this.form.value == res.data[i].drugId) {
              arr.push(res.data[i])
            }
          }
          this.record = arr
        })
        return
      }
      if (this.currentime !== '') {
        this.$http.get('/api/outstock').then((res) => {
          const curDate = this.getDateTime(this.currentime)
          for (var i in res.data) {
            var outTime = res.data[i].outTime.slice(0, 10)
            if (curDate == outTime) {
              arr.push(res.data[i])
            }
          }
          this.record = arr
        })
      }
    },
    getDateTime(curdate) {
      const date = curdate
      var seperator = '-'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentime = '' + date.getFullYear() + seperator + month + seperator + strDate
      return currentime
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    // 删除
    handleDelete(e, index, row) {
      const id = row._id
      this.$http.delete(`/api/outstock/${id}`, {}).then(() => {
        this.getOutRecord
      })
    },
    // 确认修改
    addCompanyTrue() {
      this.dialogVisible = false
      this.record[this.index] = JSON.parse(JSON.stringify(this.form))
      return this.record
    }
  }
}
</script>
<style>
.table .form-condition {
  display:flex;
  flex-direction: row
}
.table .query {
  width: 260px
}
.table .el-table .cell {
    white-space: nowrap;
    word-break: normal
}
.table .el-table .cell, .el-table th>div {
    padding:0
}
.table .dialog-form {
    font-size:12px;
    float:left;
    padding: 0 10px
}
.table .dialog-form .el-form-item__label {
    padding:6px 12px 6px 0;
    font-size:12px;
    width:auto
}
.table .dialog-form .el-input__inner {
    height:24px;
    line-height:24px;
    width:120px;
    font-size: 12px
}
.table .dialog-form .el-form-item__content {
    line-height:24px
}
.table .el-dialog__body {
    overflow:hidden
}
.table .el-dialog__footer {
    padding-right: 100px;
    padding-top: 0;
}
</style>
