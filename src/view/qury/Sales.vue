<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计查询</el-breadcrumb-item>
                <el-breadcrumb-item>查询销售记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
            <el-form-item label="查询">
                <el-date-picker v-model="currentime" type="date" placeholder="选择日期查询" :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="handlerFetch">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="record" border style="width: q00%">
            <el-table-column prop="orderNumber" label="销售单号" width='160px'></el-table-column>
            <el-table-column prop="saleTime" label="销售时间" width='140px'></el-table-column>
            <el-table-column prop="saleMoney" label="销售金额" width='140px'></el-table-column>
            <el-table-column prop="saleDrug" show-overflow-tooltip label="销售药品" width='auto'></el-table-column>
            <el-table-column prop="seller" label="经手人" width='110px'></el-table-column>
            <el-table-column prop="size" label="说明" width='110px'></el-table-column>
            <el-table-column label="操作" width="160px">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
      currentime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now()
        }
      },
      record: [],
      form: {
        value: '',
        position: '',
        type: ''
      },
      drugs: [],
      index: ''
    }
  },
  computed: {
    getSales() {
      this.$http.get(`/api/drugsale`).then(res => {
        for (var i in res.data) {
          const arr = []
          res.data[i].saleTime = res.data[i].saleTime.slice(0, 10)
          for (var j in res.data[i].saleInfo) {
            arr.push(res.data[i].saleInfo[j].name)
          }
          res.data[i].saleDrug = arr.join(',')
        }
        this.record = res.data
        return this.record
      }).catch(err => {
        this.$message.error('获取信息失败！')
      })
    }
  },
  created() {
    this.getSales
  },
  methods: {
    handlerFetch() {
      if (this.currentime == '' || this.currentime == undefined) {
        this.getSales
        return
      }
      var arr = []
      const currentime = this.getDateTime(this.currentime)
      for (var i in this.record) {
        if (currentime == this.record[i].saleTime) {
          arr.push(this.record[i])
        }
      }
      this.record = arr
    },
    getDateTime(curDate) {
      const date = curDate
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
    },

    // 删除
    handleDelete(row) {
      const id = row._id
      this.$http.delete(`/api/drugsale/${id}`, {}).then(res => {
        this.getSales
        this.$message.success('删除成功！')
      }).catch(err => {
        this.$message.success('删除失败！')
      })
    }
  }
}
</script>
<style>
.table .form-condition {
    display: flex;
    flex-direction: row
}

.table .query {
    width: 260px
}

.table .el-table .cell {
    white-space: nowrap;
    word-break: normal
}

.table .el-table .cell,
.el-table th>div {
    padding: 0
}

.table .dialog-form {
    font-size: 12px;
    float: left;
    padding: 0 10px
}

.table .dialog-form .el-form-item__label {
    padding: 6px 12px 6px 0;
    font-size: 12px;
    width: auto
}

.table .dialog-form .el-input__inner {
    height: 24px;
    line-height: 24px;
    width: 120px;
    font-size: 12px
}

.table .dialog-form .el-form-item__content {
    line-height: 24px
}

.table .el-dialog__body {
    overflow: hidden
}

.table .el-dialog__footer {
    padding-right: 100px;
    padding-top: 0;
}
</style>
