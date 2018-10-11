<template>
  <div class="sales">
    <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-menu"></i> 入库出库管理</el-breadcrumb-item>
          <el-breadcrumb-item>药品入库</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form class='form-condition' ref="form" :model="goodsStockInfo" label-width="100px">
      <el-form-item v-for="(item, k) in stockInfo" :label="item.label" :key="k">

        <el-date-picker v-if="item.date" v-model="goodsStockInfo[item.value]" type="datetime" :placeholder="item.label" :picker-options="pickerOptions"></el-date-picker>

        <el-select v-if="item.option" size='small' v-model="goodsStockInfo[item.value]" placeholder="请选择">
          <el-option v-for='(io, j) in item.option' :label="io" :value="io" :key="j"></el-option>
        </el-select>

        <el-input v-if="(!item.date) && (!item.option)" class='query' :disabled="item.disabled" v-model="goodsStockInfo[item.value]"></el-input>

        <span v-if="item.require" class='tips'>*</span>
        <span v-else class='tips'></span>
        <!-- <span v-if="item.unit">元</span> -->
      </el-form-item>
    </el-form>
    <el-button size='middle' type="primary" @click="addToTable">加入库存</el-button>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { stockIn } from '../../assest/static/js/stockInfo.js'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      goodsStockInfo: {
        orderNum: '',
        storageDate: '',
        storageType: '',
        goodsName: '',
        goodsId: '',
        pinyinMa: '',
        dosageForms: '',
        approvalNumber: '',
        batchNumber: '',
        location: '',
        warehouseNum: '',
        unitPrice: '',
        producteDate: '',
        validPeriod: '',
        supplyUnit: '',
        manufacturer: '',
        goodsType: '',
        drugCategory: '',
        customClass: '',
        certificate: '',
        quality: '',
        conclusion: '',
        acceptPerson: '',
        purchaser: ''
      },
      tips: '',
      status: false
    }
  },
  created() {
    this.getOrder()
    this.stockInfo = stockIn()
  },
  methods: {
    checkName(value) {
      this.$http.get('/api/drug').then((res) => {
        for (var i in res.data) {
          if (res.data[i].name === value) {
            this.goodsStockInfo = res.data[i]
            this.status = true
          }
        }
      })
    },
    getOrder() {
      const r1 = parseInt(Math.random() * (10))
      const r2 = parseInt(Math.random() * (10))
      const now = (new Date()).valueOf()
      const paymentID = String(r1) + String(r2) + String(now)
      this.goodsStockInfo.orderNum = paymentID
    },
    addToTable() {
      let v = 0
      for (var i in this.goodsStockInfo) {
        let tag = 0
        if (!this.goodsStockInfo[i]) {
          for (let j = 0; j < this.stockInfo.length; j++) {
            if (this.stockInfo[j].require && this.stockInfo[j].value === i) {
              this.$message.warning('请输入' + this.stockInfo[j].label)
              tag++
              v++
              break
            }
          }
          if (tag) { v++; break }
        }
      }
      if (v) { return }
      let pros = null
      if (this.status) {
        const n = this.goodsStockInfo.orderNum
        this.goodsStockInfo.goodsId = n.substring(n - 6, n)
        pros = this.$http.put(`/api/drug/${id}`, this.goodsStockInfo)
      } else {
        pros = this.$http.post('/api/drug', this.goodsStockInfo)
      }
      pros.then(res => {
        return this.$http.post('/api/stockin', this.goodsStockInfo)
      }).then(suc => {
        this.getOrder()
        this.$message.success('添加成功！')
      }).catch(err => {
        console.log(err)
        this.$message.error('添加失败！')
      })
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

.sales .form-condition {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1000px;
  padding: 30px 0;
}
.sales .el-input__inner {
  height: 30px;
}
.sales .el-input {
  width: 90%;
}
.sales .result {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.sales .result .total {
  width: 100px;
}
.sales .el-form-item {
  float: left;
  width: 310px;
}
.sales button {
  float: left;
  height: 34px;
  margin-left: 100px;
}
.sales .tips {
  color: red;
  float: left;
  width: 6px;
  height: 30px;
}
</style>
