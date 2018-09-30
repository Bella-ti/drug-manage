<template>
    <div class="sales">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 销售管理</el-breadcrumb-item>
                <el-breadcrumb-item>药品销售</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition' ref="form" :model="form" label-width="100px">
              <el-form-item label="药品ID">
                  <el-input class='query' v-model="form.id"></el-input>
              </el-form-item>
              <el-form-item label="销售单价">
                  <el-input class='query' v-model="form.price"></el-input>
                  <span>元</span>
              </el-form-item>
              <el-form-item label="销售数量">
                  <el-input class='query' v-model="form.number"></el-input>
              </el-form-item>
              <el-form-item label="药品信息">
                  <el-input class='query' v-model="form.info"></el-input>
              </el-form-item>
              
              <el-form-item label="实际售价">
                  <el-input class='query' v-model="form.salePrice"></el-input>
                  <span>元</span>
              </el-form-item>
              
              <el-form-item label="销售员">
                  <el-input class='query' v-model="form.who"></el-input>
              </el-form-item>
        </el-form>
          <el-table :data="drugs" border style="width: 100%" @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
            <el-table-column prop="id" label="药品ID" width='100px'></el-table-column>
            <el-table-column prop="name" label="商品名" width='140px'></el-table-column>
            <el-table-column prop="rename" label="通用名" width='140px'></el-table-column>
            <el-table-column prop="size" label="规格" width='115px'></el-table-column>
            <el-table-column prop="factory" label="厂商" width='130px'></el-table-column>
            <el-table-column prop="batchNumber" label="批号" width='115px'></el-table-column>
            <el-table-column prop="unit" label="单位" width='110px'></el-table-column>
            <el-table-column prop="number" label="数量" width='auto'></el-table-column>
            <el-table-column prop="price" label="金额" width='110px'></el-table-column>
          </el-table>
          <el-form class='result'  ref="form" :model="form" label-width="80px">
            <el-form-item label="小计">
                <el-input class='total' v-model="form.total"></el-input>
                <span>元</span>
            </el-form-item>
            <el-form-item label="实收">
                <el-input class='total' v-model="form.from"></el-input>
                <span>元</span>
            </el-form-item>
            <el-form-item label="找零">
                <el-input class='total' v-model="form.to"></el-input>
                <span>元</span>
            </el-form-item>
          </el-form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        data() {
            return {
              dialogVisible:false,
              form: {
                id: 'CH-1',
                price: 12,
                number: 2,
                info: '该药品用与清热泻火',
                salePrice: 12,
                who: '张oo',
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
                  factory: '太极集团', // 厂商
                  batchNumber: '20120501', // 批号
                  number: 100, // 数量
                  unit: '克', // 促销提成
                  price: 6.87, // 销售单价
                },
                {
                  id: 6754,
                  name: '阿莫西林分散片',
                  rename: '阿莫西林分散片',
                  size: '0.25G*24片',
                  factory: '太极集团',
                  batchNumber: '20120501',
                  number: 100,
                  unit: '克',
                  price: 6.87,
                },
                {
                   id: 6754,
                  name: '阿莫西林分散片',
                  rename: '阿莫西林分散片',
                  size: '0.25G*24片',
                  factory: '太极集团',
                  batchNumber: '20120501',
                  number: 100,
                  unit: '克',
                  price: 6.87,
                },
                {
                   id: 6754,
                  name: '阿莫西林分散片',
                  rename: '阿莫西林分散片',
                  size: '0.25G*24片',
                  factory: '太极集团',
                  batchNumber: '20120501',
                  number: 100,
                  unit: '克',
                  price: 6.87,
                },
                {
                   id: 6754,
                  name: '阿莫西林分散片',
                  rename: '阿莫西林分散片',
                  size: '0.25G*24片',
                  factory: '太极集团',
                  batchNumber: '20120501',
                  number: 100,
                  unit: '克',
                  price: 6.87,
                }
              ],
              currentSelection: {}
            }
        },
        computed: {
            ...mapState({
                saleInfo: ({fetch}) => fetch.saleInfo
            }),
            totalPrice() {
                return this.saleInfo.total = parseInt(this.saleInfo.salePrice) * parseInt(this.saleInfo.number)
            },
            monTo() {
                return this.saleInfo.to = parseInt(this.saleInfo.from) - parseInt(this.saleInfo.total)
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
           handleSelectionChange (val){
               console.log(val)
           },
           handleCurrentChange(val){
               this.dialogVisible = true
               this.currentSelection = val
           },
           handleChange(index) {
               this.dialogVisible= false
               this.drugs[index] = this.deepCopy(this.currentSelection)
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
</style>
