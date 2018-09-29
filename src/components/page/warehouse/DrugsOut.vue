<template>
    <div class="sales">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 入库出库管理</el-breadcrumb-item>
                <el-breadcrumb-item>药品出库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
             <div style='width: 20%'>
                <el-form-item label="出库单号">
                    <el-input class='query' v-model="form.who"></el-input>
                </el-form-item>
              </div>
              <div style='width: 35%'>
                <el-form-item label="出库日期">
                    <el-date-picker
                      v-model="value"
                      type="date"
                      placeholder="value"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
              </div>
              <div style='width: 30%;margin-right:20px'>
              <el-form-item label="出库类型">
                  <el-input v-model="form.price"></el-input>
              </el-form-item>
              </div>
              <el-form-item label="药品名称">
                <el-input class='query' v-model="form.price"></el-input>
              </el-form-item>
              <el-form-item label="药品信息">
                <el-input class='query' v-model="form.salePrice"></el-input>
              </el-form-item>
              <el-form-item label="合计数量">
                  <el-input class='query' v-model="form.salePrice"></el-input>
              </el-form-item>
              <div style='width: 10%;margin-top:3px;margin-left:20px;float:right'>
                <el-button size='small' type="primary" @click="addToTable">生成出库单</el-button>
              </div>
        </el-form>
          <el-table :data="drugs" border style="width: 100%">
            <el-table-column prop="id" label="商品ID" width='auto'></el-table-column>
            <el-table-column prop="name" label="商用名" width='140px'></el-table-column>
            <el-table-column prop="size" label="规格" width='115px'></el-table-column>
            <el-table-column prop="factory" label="厂家" width='120px'></el-table-column>
            <el-table-column prop="batchNumber" label="批号" width='115px'></el-table-column>
            <el-table-column prop="validPeriod" label="有效期" width='110px'></el-table-column>
            <el-table-column prop="number" label="数量" width='auto'></el-table-column>
            <el-table-column prop="number" label="库存量" width='auto'></el-table-column>
            <el-table-column prop="outPrice" label="出库单价" width='100px'></el-table-column>
            <el-table-column prop="toastPrice" label="出库金额" width='95px'></el-table-column>
            <el-table-column prop="unitPrice" label="销售单价" width='100px'></el-table-column>
          </el-table>
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
      dialogVisible: false,
      form: {
        id: 'CH-1',
        price: 12,
        number: 2,
        info: '',
        salePrice: 12,
        who: '',
        total: 0,
        from: 0,
        to: 0
      },
      drugs: [
        {
          id: 6754, // 商品ID
          name: '阿莫西林分散片', // 商用名
          rename: '阿莫西林分散片', // 通用名
          size: '0.25G*24片', // 规格
          factory: '太极集团', // 厂家
          batchNumber: '20120501', // 批号
          validPeriod: '2014-1-28', // 有效期
          number: 100, // 数量
          outPrice: 5,
          toastPrice: 3245,
          unitPrice: 6.87 // 销售单价
        },
        {
          id: 6754,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          number: 100,
          outPrice: 5,
          toastPrice: 3245,
          unitPrice: 6.87
        },
        {
          id: 6754,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          number: 100,
          outPrice: 5,
          toastPrice: 3245,
          unitPrice: 6.87
        },
        {
          id: 6754,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          number: 100,
          outPrice: 5,
          toastPrice: 3245,
          unitPrice: 6.87
        },
        {
          id: 6754,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          number: 100,
          outPrice: 5,
          toastPrice: 3245,
          unitPrice: 6.87
        }
      ],
      currentSelection: {}
    }
  },
  computed: {
    ...mapState({
      saleInfo: ({ fetch }) => fetch.saleInfo
      // drugs: ({storage}) => storage.drugs
    }),
    initDate() {
      this.value = this.getDateTime()
      return this.value
    }
  },
  watch: {
    allPrice(val, oldValue) {
      this.saleInfo.total = val
    },
    allTo(val, oldValue) {
      this.saleInfo.to = val
    }
  },
  methods: {
    addToTable() {
      this.outList.push(this.drugs)
    },
    findAll() {
      for (var i = 0; i < this.drugs.length; i++) {
        if (this.drugs[i].name === this.outList.name) {
          this.outList.push(this.drugs[i])
        }
      }
    },
    // 处理当前时间的函数（yyyy-MM-dd）
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
    width: 60px
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
</style>
