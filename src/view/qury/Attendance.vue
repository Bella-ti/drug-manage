<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计查询</el-breadcrumb-item>
                <el-breadcrumb-item>查询员工考勤</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
            <el-form-item label="查询">
               <el-date-picker
                      v-model="currentime"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
            </el-form-item>
            <el-form-item>
             <el-button
                    size="small"
                    type="primary"
                    @click="handlerFetch(scope.$index, scope.row)">查询</el-button>
              </el-form-item>
              <el-button
                    size="small"
                    type="primary"
                    style="height:28px;margin-left:20px;margin-top:5px"
                    @click="handlerAdd">新增</el-button>
              </el-form-item>
        </el-form>
          <el-table :data="record" border style="width: 100%">
            <el-table-column prop="order" label="考勤日期" width='120px'></el-table-column>
            <el-table-column prop="id" label="姓名" width='90px'></el-table-column>
              <el-table-column label="考勤">
                <el-table-column prop="province" label="上班" width="110"></el-table-column>
                <el-table-column prop="city" label="下班" width="110"></el-table-column>
              </el-table-column>
             <el-table-column prop="id" label="当天异常出勤申请" width='160px'>
                <template scope="scope">
                  <el-select v-model="form.type" placeholder="请选择">
                      <el-option label="请假" value="1"></el-option>
                      <el-option label="加班" value="2"></el-option>
                      <el-option label="调休" value="3"></el-option>
                      <el-option label="迟到" value="4"></el-option>
                      <el-option label="早退" value="5"></el-option>
                      <el-option label="公务外出" value="6"></el-option>
                      <el-option label="旷工" value="7"></el-option>
                      <el-option label="其他" value="8"></el-option>
                  </el-select>
                </template>
             </el-table-column>
             <el-table-column prop="city" label="合计（小时）" width="125"></el-table-column>
             <el-table-column prop="size" label="是否核对" width='103px'>
               <template scope="scope">
                  <el-checkbox></el-checkbox>
                </template>
             </el-table-column>
              <el-table-column prop="size" label="备注" width='100px'></el-table-column>
            <el-table-column label="操作" width="140px">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete($event, scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          <el-dialog title="修改考勤信息" v-model="dialogVisible" size="small">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="考勤日期" width='100px'>
                    <el-input type='text' v-model="form.order"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input type='text' v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="上班时间">
                    <el-input type='text' v-model="form.time"></el-input>
                </el-form-item>
                <el-form-item label="下班时间">
                    <el-input type='text' v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="当天异常出勤申请" label-width="130px">
                    <el-select v-model="form.type" placeholder="请选择">
                      <el-option label="请假" value="1"></el-option>
                      <el-option label="加班" value="2"></el-option>
                      <el-option label="调休" value="3"></el-option>
                      <el-option label="迟到" value="4"></el-option>
                      <el-option label="早退" value="5"></el-option>
                      <el-option label="公务外出" value="6"></el-option>
                      <el-option label="旷工" value="7"></el-option>
                      <el-option label="其他" value="8"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合计">
                    <el-input type='text' style="width:90%" v-model="form.size"></el-input>
                    <span>小时</span>
                </el-form-item>
                <el-form-item label="是否核对">
                    <el-select v-model="form.type" placeholder="请选择">
                      <el-option label="是" value="yes"></el-option>
                      <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type='textarea' style="width:90%" v-model="form.size"></el-input>
                </el-form-item>
            </el-form>
           <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editCompanyTrue">确 定</el-button>
          </span>
        </el-dialog>
         <el-dialog title="新增考勤信息" v-model="addstatus" size="small" top="8%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="姓名" class="half">
                    <el-input type='text' v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="考勤日期" class="half">
                    <el-date-picker
                      v-model="value"
                      type="date"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上班时间" class="half">
                    <el-date-picker
                      v-model="value"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="下班时间" class="half">
                    <el-date-picker
                      v-model="value"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="异常出勤申请" label-width="130px" class="half">
                    <el-select v-model="form.type" placeholder="请选择">
                      <el-option label="请假" value="1"></el-option>
                      <el-option label="加班" value="2"></el-option>
                      <el-option label="调休" value="3"></el-option>
                      <el-option label="迟到" value="4"></el-option>
                      <el-option label="早退" value="5"></el-option>
                      <el-option label="公务外出" value="6"></el-option>
                      <el-option label="旷工" value="7"></el-option>
                      <el-option label="其他" value="8"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="异常出勤时长" class="half">
                    <el-input type='text' style="width:90%" v-model="form.size"></el-input>
                </el-form-item>
                <el-form-item label="合计"  style="float:left">
                    <el-input type='text' style="width:90%;" v-model="form.size"></el-input>
                </el-form-item>
                <el-form-item label="是否核对"  style="float:left">
                    <el-select v-model="form.type" placeholder="请选择">
                      <el-option label="是" value="yes"></el-option>
                      <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注"  style="float:left;width:100%">
                    <el-input type='textarea' v-model="form.size"></el-input>
                </el-form-item>
            </el-form>
           <span slot="footer" class="dialog-footer">
            <el-button @click="addstatus = false">取 消</el-button>
            <el-button type="primary" @click="addCompanyTrue">确 定</el-button>
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
      currentime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 8.64e7
        }
      },
      record: [{
        order: '2017/12/23',
        id: '',
        name: '',
        time: '',
        type: '',
        size: ''
      }],
      addstatus: false,
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
    editCompanyTrue() {
      this.dialogVisible = false
      this.record[this.index] = JSON.parse(JSON.stringify(this.form))
      return this.record
    },
    addCompanyTrue() {
      this.addstatus = false
    },
    handlerAdd() {
      this.addstatus = true
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
