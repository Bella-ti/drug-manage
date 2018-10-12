<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 仓库管理</el-breadcrumb-item>
                <el-breadcrumb-item>库存盘点单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="drugs" border style="width: 100%" >
            <el-table-column prop="id" label="商品ID" width='100px'></el-table-column>
            <el-table-column label="账面" width="auto">
                <el-table-column prop="province" label="单价"></el-table-column>
                <el-table-column prop="city" label="数量"></el-table-column>
                 <el-table-column prop="city" label="金额"></el-table-column>
              </el-table-column>
            <el-table-column prop="rename" label="进价" width='140px'></el-table-column>
            <el-table-column prop="size" label="可用数量" width='115px'></el-table-column>
            <el-table-column prop="factory" label="金额" width='130px'></el-table-column>
            <el-table-column prop="batchNumber" label="销售数量" width='115px'></el-table-column>
            <el-table-column prop="validPeriod" label="销售金额" width='110px'></el-table-column>
          </el-table>
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
          // return time.getTime() >= Date.now() - 8.64e7;
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
        value: '',
        position: '',
        type: ''
      },
      drugs: [
        {
          id: 6823, // 商品ID
          name: '阿莫西林分散片', // 商用名
          rename: '阿莫西林分散片', // 通用名
          size: '0.25G*24片', // 规格
          factory: '太极集团', // 厂家
          approvalNumber: '国商准字H', // 批准文号
          batchNumber: '20120501', // 批号
          validPeriod: '2014-1-28', // 有效期
          position: 'G1', // 货位
          number: 100, // 数量
          storagePeriod: '2013-1-10', // 入库日期
          promotion: 0.2, // 促销提成
          deliveryUnit: '初期库存', // 供货单位
          type: '商品', // 商品分类
          renumber: 682302, // 助记码
          drugsType: '抗菌素', // 商品种类
          custom: '', // 自定义类
          unitPrice: 6.87, // 销售单价
          positionSaid: '', // 货位说明
          numberMe: 784738473 // 自编码
        },
        {
          id: 6823,
          name: '阿莫西林分散片',
          rename: '阿莫西林分散片',
          size: '0.25G*24片',
          factory: '太极集团',
          approvalNumber: '国商准字H',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          position: 'G1',
          number: 100,
          storagePeriod: '2013-1-10',
          promotion: 0.2,
          deliveryUnit: '初期库存',
          type: '商品',
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
          approvalNumber: '国商准字H',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          position: 'G1',
          number: 100,
          storagePeriod: '2013-1-10',
          promotion: 0.2,
          deliveryUnit: '初期库存',
          type: '商品',
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
          approvalNumber: '国商准字H',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          position: 'G1',
          number: 100,
          storagePeriod: '2013-1-10',
          promotion: 0.2,
          deliveryUnit: '初期库存',
          type: '商品',
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
          approvalNumber: '国商准字H',
          batchNumber: '20120501',
          validPeriod: '2014-1-28',
          position: 'G1',
          number: 100,
          storagePeriod: '2013-1-10',
          promotion: 0.2,
          deliveryUnit: '初期库存',
          type: '商品',
          renumber: 682302,
          drugsType: '抗菌素',
          custom: '',
          unitPrice: 6.87,
          positionSaid: '',
          numberMe: 784738473
        }
      ],
      index: '',
      currentSelection: {}
    }
  },
  computed: {
    ...mapState({
      state: ({ fetch }) => fetch.state
    })
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

    },
    // 编辑
    handleEdit(index, row) {
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
      this.index = index
    },
    // 删除
    handleDelete(e, index, row) {
      this.record.splice(index, 1)
    },
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
  display: flex;
  flex-direction: row;
}
.table .query {
  width: 260px;
}
.table .el-table .cell {
  white-space: nowrap;
  word-break: normal;
}
.table .el-table .cell,
.el-table th > div {
  padding: 0;
}
.table .dialog-form {
  font-size: 12px;
  float: left;
  padding: 0 10px;
}
.table .dialog-form .el-form-item__label {
  padding: 6px 12px 6px 0;
  font-size: 12px;
  width: auto;
}
.table .dialog-form .el-input__inner {
  height: 24px;
  line-height: 24px;
  width: 120px;
  font-size: 12px;
}
.table .dialog-form .el-form-item__content {
  line-height: 24px;
}
.table .el-dialog__body {
  overflow: hidden;
}
.table .el-dialog__footer {
  padding-right: 100px;
  padding-top: 0;
}
.half {
  width: 50%;
  float: left;
}
</style>
