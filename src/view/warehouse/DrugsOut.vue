<template>
    <div class="sales">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 入库出库管理</el-breadcrumb-item>
                <el-breadcrumb-item>药品出库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

          <el-table :data="drugs" border style="width: 100%" @current-change="handleCurrentChange">
            <el-table-column prop="id" label="药品ID" width='120px'></el-table-column>
            <el-table-column prop="name" label="药品名称" width='140px'></el-table-column>
            <el-table-column prop="size" label="剂型" width='115px'></el-table-column>
            <el-table-column prop="factory" label="厂家" width='120px'></el-table-column>
            <el-table-column prop="batchNumber" label="批号" width='115px'></el-table-column>
            <el-table-column prop="validPeriod" label="有效期" width='130px'></el-table-column>
            <el-table-column prop="salePrice" label="销售单价" width='100px'></el-table-column>
            <el-table-column prop="number" label="库存量" width='auto'></el-table-column>
          </el-table>
          <el-dialog title="生成出库单"
                   v-model="dialogVisible"
                   size="small">
            <el-form class='dialog-form'
                     ref="form"
                     :model="form"
                     label-width="80px">
                <el-form-item label="出库单号">
                    <el-input class='query' v-model="newInfo.outNum"></el-input>
                </el-form-item>
              <el-form-item label="药品名称">
                <el-input class='query' v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="药品ID">
                <el-input class='query' v-model="form.id"></el-input>
              </el-form-item>
              <el-form-item label="出库类型">
                  <el-input v-model="newInfo.outType"></el-input>
              </el-form-item>
              <el-form-item label="批号">
                <el-input class='query' v-model="form.batchNumber"></el-input>
              </el-form-item>
              <el-form-item label="生产厂商">
                <el-input class='query' v-model="form.factory"></el-input>
              </el-form-item>
              <el-form-item label="出库数量">
                  <el-input class='query' v-model="form.outNumber"></el-input>
              </el-form-item>
              <el-form-item label="操作人">
                <el-input class='query' v-model="newInfo.operator"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer"
                  class="dialog-footer">
                    <el-button size='small' @click="dialogVisible = false">取 消</el-button>
                    <el-button size='small' type="primary" @click="addToTable">确 定</el-button>
                  </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      operator: '',
      dialogVisible: false,
      newInfo: {},
      form: {
        outNum: '',
        name: '',
        outType: '',
        batchNumber: '',
        factory: '',
        number: '',
        operator: ''
      },
      drugs: [],
      currentSelection: {}
    }
  },
  computed: {
    getAllDrugs() {
      this.$http.get('/api/drug').then((res) => {
        this.drugs = res.data
      })
      return this.drugs
    }
  },
  created() {
    this.getAllDrugs
  },
  methods: {
    getOrder() {
      const r1 = parseInt(Math.random() * (10))
      const r2 = parseInt(Math.random() * (10))
      const now = (new Date()).valueOf()
      const paymentID = String(r1) + String(r2) + String(now)
      this.newInfo.outNum = paymentID
    },
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
    },
    addToTable() {
      const form = this.form
      const id = form._id
      console.log(Number(form.number), Number(form.outNumber))
      const number = Number(form.number) - Number(form.outNumber)
      if (isNaN(number)) {
        this.$message.success('非法数字')
        return
      }
      if (number < 0) {
        this.$message.success('库存不足')
        return
      }
      this.$http.put(`/api/drug/${id}`, {
        id: form.id,
        name: form.name,
        rename: form.rename,
        size: form.size,
        approvalNumber: form.approvalNumber,
        batchNumber: form.batchNumber,
        position: form.position,
        number: number,
        unitPrice: form.unitPrice,
        salePrice: form.salePrice,
        promotion: form.promotion,
        bornDate: form.bornDate,
        validPeriod: form.validPeriod,
        deliveryUnit: form.deliveryUnit,
        factory: form.factory,
        type: form.type,
        drugsType: form.drugsType,
        custom: form.custom
      }).then(res => {
        console.log(res)
        this.getAllDrugs
      }).catch(err => {
        console.log(err)
      })
      const time = this.getDateTime()
      console.log(form.name)
      this.$http.post(`/api/outstock`, {
        outNum: this.newInfo.outNum,
        name: form.name,
        drugId: form.id,
        outType: this.newInfo.outType,
        batchNumber: form.batchNumber,
        factory: form.factory,
        totalNum: Number(form.number),
        operator: this.newInfo.operator,
        guige: form.size,
        saleUnitPrice: form.unitPrice,
        validDate: form.validPeriod,
        outTime: time
      }).then(res => {
        this.dialogVisible = false
        console.log(form.name)
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurrentChange(val) {
      this.dialogVisible = true
      this.form = val
      this.getOrder()
    }
  }
}
</script>
<style>
  .sales .el-table .cell {
    white-space: nowrap;
    word-break: normal
  }
  .sales .el-table .cell,.sales .el-table th>div {
    padding:0
  }

  .sales .el-input__inner {
    height: 30px
  }

   .sales .el-form-item {
     width:300px;
     float:left
   }
   .sales .el-dialog__footer {
     padding:5px 55px 15px;
     float:right
   }
</style>
