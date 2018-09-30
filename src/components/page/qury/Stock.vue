<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计查询</el-breadcrumb-item>
                <el-breadcrumb-item>查询库存</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form class='form-condition'
                 ref="form"
                 :model="form"
                 label-width="100px">
            <el-form-item label="按ID">
                <el-input class='query'
                          size='small'
                          v-model="form.id"
                          placeholder="请输入药品ID"></el-input>
            </el-form-item>
            <el-form-item label="按货位">
                <el-select size='small'
                           v-model="form.position"
                           placeholder="请选择">
                    <el-option label="G1"
                               value="bbk"></el-option>
                    <el-option label="G2"
                               value="xtc"></el-option>
                    <el-option label="G3"
                               value="imoo"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="按类别">
                <el-select size='small'
                           v-model="form.type"
                           placeholder="请选择">
                    <el-option label="日用"
                               value="ry"></el-option>
                    <el-option label="重要"
                               value="zy"></el-option>
                    <el-option label="医疗器械"
                               value="ylqx"></el-option>
                </el-select>
            </el-form-item>
            <el-button size="small"
                       type="primary"
                       @click="searchMenu"
                       style="height:28px;margin:5px 0 0 15px">查询</el-button>
        </el-form>
        <el-table :data="drugs"
                  border
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  @current-change="handleCurrentChange">
    
            <el-table-column prop="id"
                             label="商品ID"
                             width='auto'></el-table-column>
            <el-table-column prop="name"
                             fixed
                             label="药品名"
                             width='140px'></el-table-column>
            <el-table-column prop="renumber"
                             label="拼音码"
                             width='90px'></el-table-column>
            <el-table-column prop="size"
                             label="规格"
                             width='115px'></el-table-column>
            <el-table-column prop="factory"
                             label="厂家"
                             width='180px'></el-table-column>
            <el-table-column prop="approvalNumber"
                             label="批准文号"
                             width='115px'></el-table-column>
            <el-table-column prop="batchNumber"
                             label="批号"
                             width='115px'></el-table-column>
            <el-table-column prop="validPeriod"
                             label="有效期"
                             width='110px'></el-table-column>
            <el-table-column prop="position"
                             label="货位"
                             width='auto'></el-table-column>
            <el-table-column prop="number"
                             label="数量"
                             width='auto'></el-table-column>
            <el-table-column prop="storagePeriod"
                             label="入库日期"
                             width='110px'></el-table-column>
            <el-table-column prop="promotion"
                             label="促销提成"
                             width='110px'></el-table-column>
            <el-table-column prop="deliveryUnit"
                             label="供货单位"
                             width='180px'></el-table-column>
            <el-table-column prop="type"
                             label="商品分类"
                             width='100px'></el-table-column>
            <el-table-column prop="drugsType"
                             label="药品种类"
                             width='100px'></el-table-column>
            <el-table-column prop="custom"
                             label="自定义类"
                             width='100px'></el-table-column>
            <el-table-column prop="unitPrice"
                             label="销售单价"
                             width='100px'></el-table-column>
            <el-table-column prop="positionSaid"
                             label="货位说明"
                             width='100px'></el-table-column>
            <el-table-column prop="numberMe"
                             label="自编码"
                             width='110px'></el-table-column>
        </el-table>
        <el-dialog title="查看药品信息"
                   v-model="dialogVisible"
                   size="large">
            <el-form class='dialog-form'
                     ref="form"
                     :model="form"
                     label-width="80px">
                <el-form-item label="药品ID"
                              width='100px'>
                    <el-input v-model="currentSelection.id"></el-input>
                </el-form-item>
                <el-form-item label="条形码">
                    <el-input v-model="currentSelection.renumber"></el-input>
                </el-form-item>
                <el-form-item label="通用名">
                    <el-input v-model="currentSelection.rename"></el-input>
                </el-form-item>
                <el-form-item label="商品名">
                    <el-input v-model="currentSelection.name"></el-input>
                </el-form-item>
                <el-form-item label="厂家名称">
                    <el-input v-model="currentSelection.factory"></el-input>
                </el-form-item>
                <el-form-item label="厂家简称">
                    <el-input v-model="currentSelection.fac"></el-input>
                </el-form-item>
            </el-form>
            <el-form class='dialog-form'
                     ref="form"
                     :model="form"
                     label-width="80px">
                <el-form-item label="自编码">
                    <el-input v-model="currentSelection.numberMe"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input v-model="currentSelection.type"></el-input>
                </el-form-item>
                <el-form-item label="剂型">
                    <el-input v-model="currentSelection.type"></el-input>
                </el-form-item>
                <el-form-item label="规格">
                    <el-input v-model="currentSelection.size"></el-input>
                </el-form-item>
                <el-form-item label="批号">
                    <el-input v-model="currentSelection.batchNumber"></el-input>
                </el-form-item>
                <el-form-item label="货位">
                    <el-input v-model="currentSelection.position"></el-input>
                </el-form-item>
            </el-form>
            <el-form class='dialog-form'
                     ref="form"
                     :model="form"
                     label-width="80px">
                <el-form-item label="商品种类"
                              width='100px'>
                    <el-input v-model="currentSelection.type"></el-input>
                </el-form-item>
                <el-form-item label="药品分类">
                    <el-input v-model="currentSelection.drugsType"></el-input>
                </el-form-item>
                <el-form-item label="自定义分类">
                    <el-input v-model="currentSelection.custom"></el-input>
                </el-form-item>
    
                <el-form-item label="有效期">
                    <el-input v-model="currentSelection.validPeriod"></el-input>
                </el-form-item>
                <el-form-item label="生产日期"
                              width='100px'>
                    <el-input v-model="currentSelection.order"></el-input>
                </el-form-item>
                <el-form-item label="采购日期">
                    <el-input v-model="currentSelection.storagePeriod"></el-input>
                </el-form-item>
            </el-form>
            <el-form class='dialog-form'
                     ref="form"
                     :model="form"
                     label-width="80px">
                <el-form-item label="采购单价">
                    <el-input v-model="currentSelection.name"></el-input>
                </el-form-item>
                <el-form-item label="销售单价">
                    <el-input v-model="currentSelection.unitPrice"></el-input>
                </el-form-item>
                <el-form-item label="会员价">
                    <el-input v-model="currentSelection.type"></el-input>
                </el-form-item>
                <el-form-item label="提成价"
                              width='100px'>
                    <el-input v-model="currentSelection.promotion"></el-input>
                </el-form-item>
                <el-form-item label="数量"
                              width='100px'>
                    <el-input v-model="currentSelection.number"></el-input>
                </el-form-item>
    
                <el-form-item label="供货单位"
                              width='100px'>
                    <el-input v-model="currentSelection.deliveryUnit"></el-input>
                </el-form-item>
            </el-form>
            <el-form class='dialog-form'
                     ref="form"
                     :model="form"
                     label-width="80px">
                <el-form-item label="批准文号"
                              width='100px'>
                    <el-input v-model="currentSelection.approvalNumber"></el-input>
                </el-form-item>
                <el-form-item label="库存下限"
                              width='100px'>
                    <el-input v-model="currentSelection.order"></el-input>
                </el-form-item>
                <el-form-item label="柜台下限">
                    <el-input v-model="currentSelection.name"></el-input>
                </el-form-item>
                <el-form-item label="柜台上限">
                    <el-input v-model="currentSelection.type"></el-input>
                </el-form-item>
                <el-form-item label="处理情况">
                    <el-input v-model="currentSelection.type"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="currentSelection.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer"
                  class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleChange">确 定</el-button>
                  </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                id: '',
                position: '',
                type: ''
            },
            drugs: [
            ],
            currentSelection: {}
        }
    },
    mounted() {
        this.getAllDrugs
    },
    computed: {
        getAllDrugs() {
            this.$http.get('/api/drug').then((res) => {
                this.drugs = res.data
            })
            return this.drugs
        }
    },
    methods: {
        deepCopy(p, c) {
            var c = c || {};
            for (var i in p) {
                if (typeof p[i] === 'object') {
                    c[i] = (p[i].constructor === Array) ? [] : {};
                    deepCopy(p[i], c[i]);
                } else {
                    c[i] = p[i];
                }
            }
            return c;
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
        searchMenu() {
            var arr = []
            if(this.form.id != '') {
                this.$http.get('/api/drug').then((res) => {
                    for(var i in res.data) {
                        if(res.data[i].id == this.form.id) {
                            arr.push(res.data[i])
                        }
                    }
                    this.drugs = arr
                })
                return
            }
            var position = ''
            switch (this.form.position) {
                case 'bbk':
                    position = 'G1'
                    break
                case 'xtc':
                    position = 'G2'
                    break
                case 'imoo':
                    position = 'G3'
                    break
                default:
                    position = ''
            }
            if(position) {
                this.$http.get('/api/drug').then((res) => {
                    for(var i in res.data) {
                        if(res.data[i].position == position) {
                            arr.push(res.data[i])
                        }
                    }
                    this.drugs = arr
                })
                return
            }
            var type = ''
            switch (this.form.type) {
                case 'ry':
                    type = '日用'
                    break
                case 'zy':
                    type = '重要'
                    break
                case 'ylqx':
                    type = '医疗器械'
                    break
                default:
                    type = ''
            }

            if(type) {
                this.$http.get('/api/drug').then((res) => {
                    for(var i in res.data) {
                        if(res.data[i].drugsType == type) {
                            arr.push(res.data[i])
                        }
                    }
                    this.drugs = arr
                })
            }
            if(this.form.id == '' && this.form.type == '' && this.form.position == '') {
                this.getAllDrugs
            }
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

.el-table__fixed,
.el-table__fixed-right {
    box-shadow: none
}
</style>
