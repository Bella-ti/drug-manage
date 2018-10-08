<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计查询</el-breadcrumb-item>
                <el-breadcrumb-item>查询入库记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
            <el-form-item label="查询">
                <el-input class='query' v-model="form.orderNum" placeholder="请输入入库单号"></el-input>
            </el-form-item>
            <el-form-item label="按药品ID">
                <el-input class='query' v-model="form.id" placeholder="请输入药品ID"></el-input>
            </el-form-item>
            <el-form-item label="按入库时间">
               <el-date-picker
                      v-model="form.storageDate"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
            </el-form-item>
             <el-button
                    size="small"
                    type="primary"
                    style="height:26px,margin-left:10px"
                    @click="handlerFetch">查询</el-button>
        </el-form>
          <el-table :data="record" border style="width: 100%">
            <el-table-column prop="orderNum" label="入库单号" width='180px'></el-table-column>
            <el-table-column prop="id" label="商品ID" width='120px'></el-table-column>
            <el-table-column prop="storageDate" label="入库时间" width='140px'></el-table-column>
            <el-table-column prop="storageType" label="入库类型" width='160px'></el-table-column>
            <el-table-column prop="checkPerson" label="经手人" width='140px'></el-table-column>
            <el-table-column label="操作" width="auto">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          <el-dialog title="修改入库信息" v-model="dialogVisible" size="tiny">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="入库单号" width='100px'>
                    <el-input type='text' disabled v-model="form.orderNum"></el-input>
                </el-form-item>
                <el-form-item label="商品ID">
                    <el-input type='text' disabled v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="入库时间">
                    <el-input type='text' disabled v-model="form.storageDate"></el-input>
                </el-form-item>
                <el-form-item label="入库类型">
                    <el-input type='text' disabled v-model="form.storageType"></el-input>
                </el-form-item>
                <el-form-item label="经手人">
                    <el-input type='text' disabled v-model="form.checkPerson"></el-input>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 8.64e7
        }
      },
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
        orderNum: '',
        id: '',
        storageDate: ''
      },
      index: '',
      currentSelection: {}
    }
  },
  created() {
    this.getInStock
  },
  computed: {
    getInStock() {
      this.$http.get('/api/stockin').then(res => {
        this.record = res.data
      })
      return this.record
    }
  },
  create: {
    getDateTime() {
      const date = new Date()
      var seperator = '/'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.currentime = '' + date.getFullYear() + seperator + month + seperator + strDate
      return this.currentime
    }
  },
  methods: {
    handlerFetch() {
      const arr = []
      this.$http.get('/api/stockin').then(res => {
        for (var i in res.data) {
          if (this.form.orderNum) {
            if (this.form.orderNum == res.data[i].orderNum) {
              arr.push(res.data[i])
            }
          }
          if (this.form.id) {
            if (this.form.id == res.data[i].id) {
              arr.push(res.data[i])
            }
          }
          if (this.form.storageDate) {
            if (this.form.storageDate == res.data[i].storageDate) {
              arr.push(res.data[i])
            }
          }
        }
        this.record = arr
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    // 删除
    handleDelete(row) {
      const id = row._id
      this.$http.delete(`/api/stockin/${id}`, {}).then((res) => {
        this.getInStock
      })
    },
    addCompanyTrue() {
      const id = this.form._id
      this.$http.put(`/api/stockin/${id}`, {
        orderNum: this.form.orderNum,
        storageDate: this.form.storageDate,
        storageType: this.form.storageType,
        name: this.form.name,
        id: this.form.id,
        rename: this.form.rename,
        size: this.form.size,
        approvalNumber: this.form.approvalNumber,
        batchNumber: this.form.batchNumber,
        position: this.form.position,
        stockNum: this.form.stockNum,
        unitPrice: this.form.unitPrice,
        bornDate: this.form.bornDate,
        validPeriod: this.form.validPeriod,
        deliveryUnit: this.form.deliveryUnit,
        factory: this.form.factory,
        type: this.form.type,
        drugType: this.form.drugType,
        custom: this.form.custom,
        certificate: this.form.certificate,
        quality: this.form.quality,
        conclusion: this.form.conclusion,
        checkPerson: this.form.checkPerson,
        buyPerson: this.form.buyPerson
      }).then(suc => {
        console.log(suc)
        this.getInStock
        this.dialogVisible = false
      }).catch(rereqq => {
        console.log(rereqq)
      })
    }
  }
}
</script>
<style>
.el-button--primary {
    height:34px
}
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
