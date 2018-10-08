<template>
    <div class="sales">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 入库出库管理</el-breadcrumb-item>
                <el-breadcrumb-item>药品入库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
                <el-form-item label="入库单号">
                    <el-input class='query' disabled v-model="stockIn.orderNum"></el-input>
                    <span class='tips'>*</span>
                </el-form-item>
                <el-form-item label="入库日期">
                    <el-date-picker
                      v-model="stockIn.storageDate"
                      type="date"
                      placeholder="入库日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="入库类型">
                  <el-select size='small'
                           v-model="stockIn.storageType"
                           placeholder="请选择">
                    <el-option v-for='item in stockTypes'
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="药品名称">
                  <el-input class='query' @change='checkName' v-model="form.name"></el-input>
                </el-form-item>
              <el-form-item label="商品ID">
                  <el-input class='query' v-model="form.id"></el-input>
                  <span class='tips'>{{tips}}</span>
                </el-form-item>
                <el-form-item label="拼音码">
                    <el-input class='query' v-model="form.rename"></el-input>
                </el-form-item>
                <el-form-item label="剂型">
                    <el-input class='query' v-model="form.size"></el-input>
                </el-form-item>
                <el-form-item label="批准文号">
                  <el-input class='query' v-model="form.approvalNumber"></el-input>
                </el-form-item>
                <el-form-item label="批号">
                  <el-input class='query' v-model="form.batchNumber"></el-input>
                </el-form-item>
                <el-form-item label="货位">
                    <el-input class='query' v-model="form.position"></el-input>
                </el-form-item>
                <el-form-item label="入库数量">
                    <el-input class='query' v-model="stockIn.stockNum"></el-input>
                </el-form-item>
                <el-form-item label="进价">
                  <el-input class='query' v-model="form.unitPrice"></el-input>
                  <span>元</span>
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-input class='query' v-model="form.bornDate"></el-input>
                </el-form-item>
                <el-form-item label="有效日期">
                  <el-input class='query' v-model="form.validPeriod"></el-input>
                </el-form-item>
                <el-form-item label="供货单位">
                    <el-input v-model="form.deliveryUnit"></el-input>
                </el-form-item>
                <el-form-item label="厂家">
                    <el-input v-model="form.factory"></el-input>
                </el-form-item>
                <el-form-item label="商品种类">
                  <el-input class='query' v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="药品类别">
                  <el-input class='query' v-model="form.drugType"></el-input>
                </el-form-item>
                 <el-form-item label="自定义类">
                  <el-input class='query' v-model="form.custom"></el-input>
                </el-form-item>
                <el-form-item label="合格证">
                    <el-select size='small'
                              v-model="stockIn.certificate"
                              placeholder="请选择">
                        <el-option label="有"
                                   value='有'></el-option>
                                   <el-option label="没有"
                                   value='没有'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外观质量">
                    <el-select size='small'
                              v-model="stockIn.quality"
                              placeholder="请选择">
                        <el-option label="合格"
                                   value='合格'></el-option>
                        <el-option label="不合格"
                                    value='不合格'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="验收结论">
                    <el-select size='small'
                              v-model="stockIn.conclusion"
                              placeholder="请选择">
                        <el-option label="合格"
                                   value='合格'></el-option>
                        <el-option label="不合格"
                                    value='不合格'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="验收人">
                  <el-input class='query' v-model="stockIn.checkPerson"></el-input>
                  <span class='tips'>*</span>
                </el-form-item>
                <el-form-item label="采购员">
                    <el-input class='query' v-model="stockIn.buyPerson"></el-input>
                </el-form-item>
        <el-button size='middle' type="primary" @click="addToTable">加入入库单</el-button>
        </el-form>

        </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      form: {
        name: '',
        id: '',
        rename: '',
        size: '',
        approvalNumber: '',
        batchNumber: '',
        position: '',
        unitPrice: '',
        bornDate: '',
        validPeriod: '',
        deliveryUnit: '',
        factory: '',
        type: '',
        drugType: '',
        custom: ''
      },
      stockIn: {
        orderNum: '',
        storageDate: '',
        storageType: '',
        stockNum: '',
        certificate: '',
        quality: '',
        conclusion: '',
        checkPerson: '',
        buyPerson: ''
      },
      tips: '',
      drugs: [],
      stockTypes: [{
        value: '采购',
        label: '采购'
      }, {
        value: '下架',
        label: '下架'
      }],
      status: false
    }
  },
  created() {
    this.getOrder()
  },
  computed: {
    getDateTime: function() {
      const date = new Date()
      var seperator = '-'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentime = '' + date.getFullYear() + seperator + month + seperator + strDate
      return currentime
    }
  },
  methods: {
    checkName(value) {
      this.$http.get('/api/drug').then((res) => {
        for (var i in res.data) {
          if (res.data[i].name == value) {
            this.form = res.data[i]
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
      this.form.id = paymentID.substring(paymentID.length - 6, paymentID.length)
      this.stockIn.orderNum = paymentID
    },
    addToTable() {
      for (var i in this.form) {
        if (this.form[i] == undefined) {
          this.form[i] = ''
        }
      }
      if (this.stockIn.checkPerson == '' || this.stockIn.orderNum == '' ||
              this.stockIn.checkPerson == undefined || this.stockIn.orderNum == undefined) {
        return
      }
      if (this.form.id == '' || isNaN(Number(this.form.id))) {
        this.tips = '*必填且必须为数字'
        return
      }
      const id = this.form._id
      const number = parseInt(this.form.number) + parseInt(this.stockIn.stockNum)
      if (isNaN(number)) {
        return
      }
      if (this.status) {
        this.$http.put(`/api/drug/${id}`, {
          id: this.form.id,
          name: this.form.name,
          rename: this.form.rename,
          size: this.form.size,
          approvalNumber: this.form.approvalNumber,
          batchNumber: this.form.batchNumber,
          position: this.form.position,
          number: number,
          unitPrice: this.form.unitPrice,
          salePrice: this.form.salePrice,
          promotion: this.form.promotion,
          bornDate: this.form.bornDate,
          validPeriod: this.form.validPeriod,
          deliveryUnit: this.form.deliveryUnit,
          factory: this.form.factory,
          type: this.form.type,
          drugsType: this.form.drugsType,
          custom: this.form.custom
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$http.post('/api/drug', {
          id: this.form.id,
          name: this.form.name,
          rename: this.form.rename,
          size: this.form.size,
          approvalNumber: this.form.approvalNumber,
          batchNumber: this.form.batchNumber,
          position: this.form.position,
          number: parseInt(this.form.number) + parseInt(this.stockIn.stockNum),
          unitPrice: this.form.unitPrice,
          salePrice: this.form.salePrice,
          promotion: this.form.promotion,
          bornDate: this.form.bornDate,
          validPeriod: this.form.validPeriod,
          deliveryUnit: this.form.deliveryUnit,
          factory: this.form.factory,
          type: this.form.type,
          drugsType: this.form.drugsType,
          custom: this.form.custom
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
      this.$http.post('/api/stockin', {
        orderNum: this.stockIn.orderNum,
        storageDate: this.stockIn.storageDate,
        storageType: this.stockIn.storageType,
        name: this.form.name,
        id: this.form.id,
        rename: this.form.rename,
        size: this.form.size,
        approvalNumber: this.form.approvalNumber,
        batchNumber: this.form.batchNumber,
        position: this.form.position,
        stockNum: this.stockIn.stockNum,
        unitPrice: this.form.unitPrice,
        bornDate: this.form.bornDate,
        validPeriod: this.form.validPeriod,
        deliveryUnit: this.form.deliveryUnit,
        factory: this.form.factory,
        type: this.form.type,
        drugType: this.form.drugType,
        custom: this.form.custom,
        certificate: this.stockIn.certificate,
        quality: this.stockIn.quality,
        conclusion: this.stockIn.conclusion,
        checkPerson: this.stockIn.checkPerson,
        buyPerson: this.stockIn.buyPerson
      }).then(suc => {
        console.log(suc)
      }).catch(rereqq => {
        console.log(rereqq)
      })
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

  .sales .form-condition {
    display: flex;
    flex-direction: row;
    flex-wrap:wrap
  }
  .sales .el-input__inner {
    height: 30px
  }
  .sales .el-input {
    width:90%
  }
  .sales .result {
    display:flex;
    flex-direction:row;
    margin-top:15px
  }
   .sales .result .total {
     width:100px
   }
   .sales .el-form-item {
     float:left;
     width:310px
   }
   .sales button {
      float:right;
      height: 34px;
      margin-left: 187px
   }
   .sales .tips {
     color:red;
     float:left
   }
</style>
