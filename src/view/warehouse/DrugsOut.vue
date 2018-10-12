<template>
    <div class="sales">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 入库出库管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品出库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

          <el-table :data="drugs" border style="width: 100%" @current-change="handleCurrentChange">
            <el-table-column prop="goodsId" label="商品ID" ></el-table-column>
            <el-table-column prop="goodsName" label="商品名称" ></el-table-column>
            <el-table-column prop="dosageForms" label="剂型" ></el-table-column>
            <el-table-column prop="manufacturer" label="厂家" ></el-table-column>
            <el-table-column prop="batchNumber" label="批号"></el-table-column>
            <el-table-column prop="validPeriod" label="有效期"></el-table-column>
            <el-table-column prop="salePrice" label="销售单价" ></el-table-column>
            <el-table-column prop="inventory" label="库存量"></el-table-column>
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
              <el-form-item label="商品名称">
                <el-input class='query' v-model="form.goodsName"></el-input>
              </el-form-item>
              <el-form-item label="商品ID">
                <el-input class='query' v-model="form.goodsId"></el-input>
              </el-form-item>
              <el-form-item label="出库类型">
                  <el-input v-model="newInfo.outType"></el-input>
              </el-form-item>
              <el-form-item label="批号">
                <el-input class='query' v-model="form.batchNumber"></el-input>
              </el-form-item>
              <el-form-item label="生产厂商">
                <el-input class='query' v-model="form.manufacturer"></el-input>
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
// import { mapState } from 'vuex'
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
        goodsName: '',
        outType: '',
        batchNumber: '',
        manufacturer: '',
        number: '',
        operator: ''
      },
      drugs: [],
      currentSelection: {}
    }
  },
  computed: {
  },
  created() {
    this.getAllDrugs()
  },
  methods: {
    getAllDrugs() {
      this.$http.get('/api/drug').then((res) => {
        this.drugs = res.data
      })
      return this.drugs
    },
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
        goodsId: form.goodsId,
        goodsName: form.goodsName,
        pinyinMa: form.pinyinMa,
        dosageForms: form.dosageForms,
        approvalNumber: form.approvalNumber,
        batchNumber: form.batchNumber,
        location: form.location,
        // inventory: inventory-number,
        unitPrice: form.unitPrice,
        salePrice: form.salePrice,
        promotion: form.promotion,
        producteDate: form.producteDate,
        validPeriod: form.validPeriod,
        supplyUnit: form.supplyUnit,
        manufacturer: form.manufacturer,
        goodsType: form.goodsType,
        drugCategory: form.drugCategory,
        customClass: form.customClass
      }).then(res => {
        console.log(res)
        this.getAllDrugs()
      }).catch(err => {
        console.log(err)
      })
      const time = this.getDateTime()
      console.log(form.name)
      this.$http.post(`/api/outstock`, {
        outNum: this.newInfo.outNum,
        goodsName: form.goodsName,
        goodsId: form.goodsId,
        outType: this.newInfo.outType,
        batchNumber: form.batchNumber,
        manufacturer: form.manufacturer,
        totalNum: Number(form.number),
        operator: this.newInfo.operator,
        dosageForms: form.dosageForms,
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
  word-break: normal;
}
.sales .el-table .cell,
.sales .el-table th > div {
  padding: 0;
}

.sales .el-input__inner {
  height: 30px;
}

.sales .el-form-item {
  width: 300px;
  float: left;
}
.sales .el-dialog__footer {
  padding: 5px 55px 15px;
  float: right;
}
</style>
