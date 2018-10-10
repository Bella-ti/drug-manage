<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计查询</el-breadcrumb-item>
                <el-breadcrumb-item>库存商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin: 10px auto;position: absolute; left: 40%;">
          <el-radio-group v-model="seaModal" @change="changeGoods" size="small">
            <el-radio :label="0">精简模式</el-radio>
            <el-radio :label="1">标准模式</el-radio>
            <el-radio :label="2">精细模式</el-radio>
          </el-radio-group>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
            <el-form-item label="按药品名">
                <el-input class='query' size='small' v-model="form.name" placeholder="请输入药品名"></el-input>
            </el-form-item>
            <el-form-item label="按ID">
                <el-input class='query' size='small' v-model="form.id" placeholder="请输入药品ID"></el-input>
            </el-form-item>
            <el-form-item label="按药品类别">
                <el-select size='small' v-model="form.type" placeholder="请选择">
                    <el-option v-for='(item,j) in drugTypes' :key="j" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-button size="small" type="primary" @click="searchMenu" style="height:28px;margin:5px 0 0 15px">查询</el-button>
        </el-form>
        <el-table :data="drugs" border style="width: 100%" @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
            <el-table-column v-for="(item,j) in goodsType" :key="j" :prop="item.prop" :fixed="item.fixed" :label="item.label"></el-table-column>
        </el-table>
        <el-dialog title="查看药品信息" v-model="dialogVisible" size="small">
            <el-form class='dialog-form' ref="form" :model="form" label-width="80px">
              
                <el-form-item v-for="(item,k) in detailGoods"  :key="k" :label="item.label">
                    <el-input v-model="currentSelection[item.prop]"></el-input>
                </el-form-item>
                
            </el-form>
            <span style='display:none' slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleChange">确 定</el-button>
                  </span>
        </el-dialog>
    </div>
</template>

<script>
import goodsInfo from '../../assest/static/js/goodsInfo.js'
export default {
  data() {
    return {
      goodsType: [],
      seaModal: 0,
      dialogVisible: true,
      form: {
        id: '',
        position: '',
        type: ''
      },
      drugs: [],
      drugTypes: [
          {
          value: '感冒清热解毒',
          label: '感冒清热解毒'
        }, {
          value: '心脑血管类',
          label: '心脑血管类'
        }, {
          value: '外用药类',
          label: '外用药类'
        }, {
          value: '呼吸系统类',
          label: '呼吸系统类'
        }, {
          value: '内分泌类',
          label: '内分泌类'
        }, {
          value: '胃肠系统类',
          label: '胃肠系统类'
        }, {
          value: '补益类',
          label: '补益类'
        }, {
          value: '维生素矿物质',
          label: '维生素矿物质'
        }, {
          value: '抗生素',
          label: '抗生素'
        }, {
          value: '抗风湿类',
          label: '抗风湿类'
        }, {
          value: '五官科类',
          label: '五官科类'
        }, {
          value: '妇科用药类',
          label: '妇科用药类'
        }, {
          value: '中药类',
          label: '中药类'
        }, {
          value: '计生用品',
          label: '计生用品'
        }, {
          value: '儿科',
          label: '儿科'
        }, {
          value: '清热镇痛类',
          label: '清热镇痛类'
        }, {
          value: '保健品',
          label: '保健品'
        }, {
          value: '非药品',
          label: '非药品'
        }, {
          value: '泌尿系统',
          label: '泌尿系统'
        }, {
          value: '其他处方类',
          label: '其他处方类'
        }, {
          value: '肝胆类',
          label: '肝胆类'
        }, {
          value: '注射液',
          label: '注射液'
        }, {
          value: '风湿类',
          label: '风湿类'
        }
      ],
      currentSelection: {}
    }
  },
  mounted() {
    return this.getAllDrugs
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
    this.changeGoods()
    this.detailGoods = this.$lodash.compact(goodsInfo(2))
  },
  beforeDestroy() {
    this.goodsType = null
  },
  methods: {
    changeGoods() {
      this.goodsType = this.$lodash.compact(goodsInfo(this.seaModal))
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
      this.drugs[index] = this.$lodash.cloneDeep(this.currentSelection)
    },
    searchMenu() {
      var arr = []
      if (this.form.id != '') {
        this.$http.get('/api/drug').then((res) => {
          for (var i in res.data) {
            if (res.data[i].id == this.form.id) {
              arr.push(res.data[i])
            }
          }
          this.drugs = arr
        })
        return
      }
      if (this.form.name) {
        this.$http.get('/api/drug').then((res) => {
          for (var i in res.data) {
            if (res.data[i].name == this.form.name) {
              arr.push(res.data[i])
            }
          }
          this.drugs = arr
        })
        return
      }
      if (this.form.type) {
        this.$http.get('/api/drug').then((res) => {
          for (var i in res.data) {
            if (res.data[i].drugsType == this.form.type) {
              arr.push(res.data[i])
            }
          }
          this.drugs = arr
        })
      }
      if (this.form.id == '' && this.form.type == '' && this.form.position == '') {
        this.getAllDrugs
      }
    }
  }
}
</script>
<style>
.table .form-condition {
    display: flex;
    flex-direction: row;
    margin-top: 75px;
}

.table .query {
    width: 200px
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
    padding: 0 54px;
    display: flex;
    flex-wrap: wrap;
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

.el-table__fixed,
.el-table__fixed-right {
    box-shadow: none
}
.el-dialog--small {
    width:40%
}
</style>
