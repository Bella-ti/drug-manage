<template>
    <div class="sales">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 销售管理</el-breadcrumb-item>
                <el-breadcrumb-item>药品销售</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <p class='sale-title'>销售单</p>
        <el-form class='form-condition' :model="sale" label-width="100px">
        <el-form-item label="销售单号">
                  <el-input class='query' disabled v-model="sale.orderNumber"></el-input>
              </el-form-item>
              <el-form-item label="销售员">
                  <el-input class='query' disabled v-model="curUser.username"></el-input>
              </el-form-item>
              <el-form-item label="会员折扣">
                  <el-input class='query' v-model="drugs.promotion"></el-input>
              </el-form-item>
              <el-form-item label="小计">
                  <el-input class='query' v-model="sale.saleMoney"></el-input>
              </el-form-item>
              <el-form-item label="实收">
                  <el-input class='query' @change='extra' v-model="sale.getPrice"></el-input>
              </el-form-item>
              <el-form-item label="找零">
                  <el-input class='query' v-model="sale.putPrice"></el-input>
              </el-form-item>
              <el-button size="small"
                       type="primary"
                       @click="addSales"
                       style="height:28px;margin:5px 0 0 15px">生成销售单</el-button>
        </el-form>
        <p class='sale-title'>添加药品</p>
        <el-form class='form-condition' ref="form" :model="drugs" label-width="100px">
              <el-form-item label="药品名称">
                  <el-select size='small'
                           v-model="drugValue"
                           placeholder="请选择"
                            @change='checkName'>
                    <el-option v-for='item in drugsname'
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="药品ID">
                  <el-input class='query' v-model="drugs.id"></el-input>
              </el-form-item>
              <el-form-item label="销售数量">
                  <el-input class='query'  @change='result' v-model="drugs.saleNumber"></el-input>
              </el-form-item>
              <el-button size="small"
                       type="primary"
                       @click="addMenu"
                       style="height:28px;margin:5px 0 0 15px">添加</el-button>

         <span style='color:red;padding:0 0 15px 32px'>{{tips}}</span>
        </el-form>
          <el-table :data="drugInfo" border style="width:950px;margin:0 auto" >
            <el-table-column prop="id" label="药品ID" width='100px'></el-table-column>
            <el-table-column prop="name" label="药品名" width='140px'></el-table-column>
            <el-table-column prop="factory" label="生产厂商" width='140px'></el-table-column>
            <el-table-column prop="batchNumber" label="批号" width='115px'></el-table-column>
            <el-table-column prop="comePrice" label="进价" width='130px'></el-table-column>
            <el-table-column prop="salePrice" label="销售单价" width='115px'></el-table-column>
            <el-table-column prop="saleNumber" label="销售数量" width='110px'></el-table-column>
            <el-table-column label="操作" width="auto">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete($event, scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      sale: {},
      /**
                orderNumber 销售单号,
                saleTime 销售时间，
                saleMoney 销售金额，
                seller 销售员，
                saleInfo 销售药品信息{
                    [药品id,药品name,生产厂家,批号，销售数量，进价,销售单价]
                }
              */
      drugValue: '',
      tips: '',
      drugs: {},
      drugInfo: [],
      stockDrug: [],
      currentSelection: {},
      drugsname: [],
      drugsId: [],
      curUser: {}
    }
  },
  created() {
    this.curLogin
    this.getAllDrugs
    this.getName
    this.getId
    this.getOrder()
  },
  computed: {
    curLogin() {
      let curUser = localStorage.getItem('curLogin')
      this.curUser = JSON.parse(curUser)
      return this.curUser
    },
    getAllDrugs() {
      this.$http.get('/api/drug').then((res) => {
        this.stockDrug = res.data
      })
      return this.stockDrug
    },
    getName() {
      const arr = []
      this.$http.get('/api/drug').then((res) => {
        for (var i in res.data) {
          arr.push({ value: res.data[i].name, label: res.data[i].name })
        }
        this.drugsname = arr
      })
      return this.drugsname
    },
    getId() {
      const arrId = []
      this.$http.get('/api/drug').then((res) => {
        for (var i in res.data) {
          arrId.push({ value: res.data[i].id, label: res.data[i].id })
        }
        this.drugsId = arrId
      })
      return this.drugsId
    },
    setsaleMoney() {
      this.sale.saleMoney = Number(this.drugs.salePrice) * Number(this.drugs.saleNumber)
      if (isNaN(this.sale.saleMoney)) {
        this.sale.saleMoney = 0
      }
      return this.sale.saleMoney
    }
  },
  watch: {
    totalMoney(val) {
      this.sale.saleMoney = val
    },
    extraMoney(val) {
      this.sale.putPrice = val
    }
  },
  methods: {
    result(val) {
      this.sale.saleNumber = val
      this.sale.saleMoney = Number(this.drugs.salePrice) * Number(val)
      this.setsaleMoney
    },
    extra(val) {
      this.sale.putPrice = Number(val) - Number(this.sale.saleMoney)
      if (isNaN(this.sale.putPrice)) {
        this.sale.putPrice = 0
      }
      if (this.sale.putPrice < 0) {
        this.$message.error('支付不足！')
      }
    },
    getOrder() {
      const r1 = parseInt(Math.random() * (10))
      const r2 = parseInt(Math.random() * (10))
      const now = (new Date()).valueOf()
      const paymentID = String(r1) + String(r2) + String(now)
      this.sale.orderNumber = paymentID
    },
    checkName(value) {
      this.$http.get('/api/drug').then((res) => {
        for (var i in res.data) {
          if (res.data[i].name == value) {
            this.drugs = res.data[i]
          }
        }
      })
    },
    addMenu() {
      if (this.drugs.saleNumber == undefined || this.drugs.id == undefined || this.sale.name) {
        this.tips = '输入药品ID、数量和药品名'
        return
      }
      this.tips = ''
      for (var i in this.stockDrug) {
        if (this.stockDrug[i].id == this.drugs.id) {
          this.stockDrug[i].saleNumber = this.drugs.saleNumber
          this.drugInfo.push(this.stockDrug[i])
        }
      }
    },
    handleDelete(e, index, row) {
      this.drugInfo.splice(index, 1)
    },
    addSales() {
      if (this.sale.putPrice < 0) {
        this.$message.error('支付不足！')
        return
      }
      if (this.drugInfo.length == 0) {
        this.$message.success('未添加药品')
        return
      }
      const curTime = this.getDateTime()
      this.$http.post(`/api/drugsale`, {
        orderNumber: this.sale.orderNumber,
        saleTime: curTime,
        saleMoney: this.sale.saleMoney,
        seller: this.curUser.username,
        saleInfo: this.drugInfo
      }).then(res => {
        console.log(res)
        var that = this
        this.$message.success('销售成功')
        setTimeout(function() {
          that.getOrder()
        }, 1000)
      })
    },
    getDateTime() {
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
  .sales .query {
    width: 180px
  }
  .sales .form-condition {
    display: flex;
    flex-direction: row;
    flex-wrap:wrap
  }
  .sales .el-input__inner {
    height: 30px
  }
  .sales .result {
    display:flex;
    flex-direction:row;
    margin-top:15px
  }
   .sales .result .total {
     width:100px
   }
   .sales .sale-title {
       padding:10px 20px;
       font-size:16px;
       font-weight:600;
       color:#00d1b2;
       border-bottom: 1px solid #00d1b2;
       margin-bottom:20px
   }
</style>
