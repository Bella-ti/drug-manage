<template>
    <div class="sales">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 入库出库管理</el-breadcrumb-item>
                <el-breadcrumb-item>药品入库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
                <el-form-item label="药品名称">
                  <el-input class='query' v-model="form.name"></el-input>
                </el-form-item>
              <el-form-item label="商品ID">
                  <el-input class='query' v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="入库单号">
                    <el-input class='query' v-model="form.orderNum"></el-input>
                </el-form-item>
                <el-form-item label="入库日期">
                    <el-date-picker
                      v-model="form.storagePeriod"
                      type="date"
                      placeholder="入库日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="拼音码">
                    <el-input class='query' v-model="form.renumber"></el-input>
                </el-form-item>
                <el-form-item label="规格">
                    <el-input class='query' v-model="form.size"></el-input>
                </el-form-item>
              <el-form-item label="供货单位">
                  <el-input v-model="form.deliveryUnit"></el-input>
              </el-form-item>
                <el-form-item label="药品信息">
                  <el-input class='query' v-model="form.drugInfo"></el-input>
                </el-form-item>
                <el-form-item label="合计数量">
                    <el-input class='query' v-model="form.totalNum"></el-input>
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
                <el-form-item label="入库单价">
                  <el-input class='query' v-model="form.comePrice"></el-input>
                  <span>元</span>
                </el-form-item>
                <el-form-item label="入库金额">
                  <el-input class='query' v-model="form.comTotalPrice"></el-input>
                  <span>元</span>
                </el-form-item>
                <el-form-item label="销售价">
                  <el-input class='query' v-model="form.unitPrice"></el-input>
                  <span>元</span>
                </el-form-item>
                <el-form-item label="有效日期">
                  <el-input class='query' v-model="form.validPeriod"></el-input>
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-input class='query' v-model="form.beginDate"></el-input>
                </el-form-item>
                <el-form-item label="促销提成">
                    <el-input class='query' v-model="form.promotion"></el-input>
                </el-form-item>
                <el-form-item label="商品种类">
                  <el-input class='query' v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="药品类别">
                  <el-input class='query' v-model="form.drugsType"></el-input>
                </el-form-item>
                 <el-form-item label="自定义类">
                  <el-input class='query' v-model="form.custom"></el-input>
                </el-form-item>
                <el-form-item label="验收结论">
                    <el-input class='query' v-model="form.conclusion"></el-input>
                </el-form-item>
                    <el-form-item label="合格证">
                    <el-input class='query' v-model="form.certificate"></el-input>
                </el-form-item>
                <el-form-item label="外观质量">
                    <el-input class='query' v-model="form.quality"></el-input>
                </el-form-item>
                <el-form-item label="验收人">
                  <el-input class='query' v-model="form.checkPerson"></el-input>
                </el-form-item>
                <el-form-item label="采购员">
                    <el-input class='query' v-model="form.buyPerson"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input class='query' :rows=1 type='textarea' v-model="form.extra"></el-input>
                </el-form-item>
                <el-form-item label="货位说明">
                    <el-input class='query' :rows=1 type='textarea' v-model="form.positionSaid"></el-input>
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
      value: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        orderNum: '',
        storagePeriod: '',
        renumber: '',
        size: '',
        deliveryUnit: '',
        drugInfo: '',
        totalNum: '',
        approvalNumber: '',
        batchNumber: '',
        position: '',
        comePrice: '',
        comTotalPrice: '',
        unitPrice: '',
        validPeriod: '',
        beginDate: '',
        promotion: '',
        type: '',
        drugsType: '',
        custom: '',
        conclusion: '',
        certificate: '',
        quality: '',
        checkPerson: '',
        buyPerson: '',
        positionSaid: '',
        extra: ''
      },
      drugs: [
        {
          id: 6754, // 商品ID
          name: '阿莫西林分散片', // 商用名
          rename: '阿莫西林分散片', // 通用名
          size: '0.25G*24片', // 规格
          factory: '太极集团', // 厂家
          approvalNumber: '国药准字H', // 批准文号
          batchNumber: '20120501', // 批号
          validPeriod: '2014-1-28', // 有效期
          position: 'G1', // 货位
          number: 100, // 数量
          storagePeriod: '2013-1-10', // 入库日期
          promotion: 0.2, // 促销提成
          deliveryUnit: '初期库存', // 供货单位
          type: '药品', // 商品分类
          renumber: 682302, // 助记码
          drugsType: '抗菌素', // 药品种类
          custom: '', // 自定义类
          unitPrice: 6.87, // 销售单价
          positionSaid: '', // 货位说明
          numberMe: 784738473 // 自编码
        },
        {
          id: 6798,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          approvalNumber: '国药准字H',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          position: 'G1',
          number: 100,
          storagePeriod: '2013-1-10',
          promotion: 0.2,
          deliveryUnit: '初期库存',
          type: '药品',
          renumber: 682302,
          drugsType: '抗菌素',
          custom: '',
          unitPrice: 6.87,
          positionSaid: '',
          numberMe: 784738473
        },
        {
          id: 5678,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          approvalNumber: '国药准字H',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          position: 'G1',
          number: 100,
          storagePeriod: '2013-1-10',
          promotion: 0.2,
          deliveryUnit: '初期库存',
          type: '药品',
          renumber: 682302,
          drugsType: '抗菌素',
          custom: '',
          unitPrice: 6.87,
          positionSaid: '',
          numberMe: 784738473
        },
        {
          id: 6823,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          approvalNumber: '国药准字H',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          position: 'G1',
          number: 100,
          storagePeriod: '2013-1-10',
          promotion: 0.2,
          deliveryUnit: '初期库存',
          type: '药品',
          renumber: 682302,
          drugsType: '抗菌素',
          custom: '',
          unitPrice: 6.87,
          positionSaid: '',
          numberMe: 784738473
        },
        {
          id: 6438,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          approvalNumber: '国药准字H',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          position: 'G1',
          number: 100,
          storagePeriod: '2013-1-10',
          promotion: 0.2,
          deliveryUnit: '初期库存',
          type: '药品',
          renumber: 682302,
          drugsType: '抗菌素',
          custom: '',
          unitPrice: 6.87,
          positionSaid: '',
          numberMe: 784738473
        }
      ],
      currentSelection: {}
    }
  },
  computed: {
    ...mapState({
      saleInfo: ({ fetch }) => fetch.saleInfo
    }),
    initDate() {
      this.value = this.getDateTime()
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
      this.$http.post('/api/drug', {
        id: this.form.id,
        name: this.form.name,
        numberMe: this.form.numberMe,
        storagePeriod: this.form.storagePeriod,
        renumber: this.form.renumber,
        size: this.form.size,
        deliveryUnit: this.form.deliveryUnit,
        drugInfo: this.form.drugInfo,
        number: this.form.orderNum,
        approvalNumber: this.form.approvalNumber,
        batchNumber: this.form.batchNumber,
        position: this.form.position,
        comePrice: this.form.comePrice,
        comTotalPrice: this.form.comTotalPrice,
        unitPrice: this.form.validPeriod,
        validPeriod: this.form.validPeriod,
        beginDate: this.form.beginDate,
        promotion: this.form.promotion,
        type: this.form.type,
        drugsType: this.form.drugsType,
        custom: this.form.custom,
        conclusion: this.form.conclusion,
        certificate: this.form.certificate,
        quality: this.form.quality,
        checkPerson: this.form.checkPerson,
        buyPerson: this.form.buyPerson,
        positionSaid: this.form.positionSaid,
        extra: this.form.extra
      }).then((res) => {
        console.log(res)
        this.dialogVisible = false
        return this.getBusiness
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      this.dialogVisible = true
      this.currentSelection = val
    },
    handleChange(index) {
      this.dialogVisible = false
      this.drugs[index] = this.deepCopy(this.currentSelection)
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
</style>
