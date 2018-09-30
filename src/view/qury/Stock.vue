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
            <el-form-item label="按药品名">
                <el-input class='query'
                          size='small'
                          v-model="form.name"
                          placeholder="请输入药品名"></el-input>
            </el-form-item>
            <el-form-item label="按ID">
                <el-input class='query'
                          size='small'
                          v-model="form.id"
                          placeholder="请输入药品ID"></el-input>
            </el-form-item>
            <el-form-item label="按药品类别">
                <el-select size='small'
                           v-model="form.type"
                           placeholder="请选择">
                    <el-option v-for='item in drugTypes'
                               :label="item.label"
                               :value="item.value"></el-option>
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
            <el-table-column prop="name"
                             fixed
                             label="药品名"
                             width='140px'></el-table-column>
            <el-table-column prop="id"
                             label="药品ID"
                             width='120px'></el-table-column>
            <el-table-column prop="rename"
                             label="拼音码"
                             width='120px'></el-table-column>
            <el-table-column prop="size"
                             label="剂型"
                             width='115px'></el-table-column>
            <el-table-column prop="approvalNumber"
                             label="批准文号"
                             width='115px'></el-table-column>
            <el-table-column prop="batchNumber"
                             label="批号"
                             width='115px'></el-table-column>
            <el-table-column prop="position"
                             label="货位"
                             width='auto'></el-table-column>
            <el-table-column prop="number"
                             label="库存量"
                             width='auto'></el-table-column>
            <el-table-column prop="unitPrice"
                             label="进价"
                             width='auto'></el-table-column>
            <el-table-column prop="salePrice"
                             label="销价"
                             width='100px'></el-table-column>
            <el-table-column prop="promotion"
                             label="促销折扣"
                             width='110px'></el-table-column>
            <el-table-column prop="bornDate"
                             label="生产日期"
                             width='110px'></el-table-column>
            <el-table-column prop="validPeriod"
                             label="有效日期"
                             width='110px'></el-table-column>
            <el-table-column prop="deliveryUnit"
                             label="供货单位"
                             width='180px'></el-table-column>
            <el-table-column prop="factory"
                             label="厂家"
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
        </el-table>
        <el-dialog title="查看药品信息"
                   v-model="dialogVisible"
                   size="small">
            <el-form class='dialog-form'
                     ref="form"
                     :model="form"
                     label-width="80px">
                <el-form-item label="药品ID"
                              width='100px'>
                    <el-input v-model="currentSelection.id"></el-input>
                </el-form-item>
                <el-form-item label="药品名">
                    <el-input v-model="currentSelection.name"></el-input>
                </el-form-item>
                <el-form-item label="拼音码">
                    <el-input v-model="currentSelection.rename"></el-input>
                </el-form-item>
                <el-form-item label="剂型">
                    <el-input v-model="currentSelection.size"></el-input>
                </el-form-item>
                <el-form-item label="库存量"
                              width='100px'>
                    <el-input v-model="currentSelection.number"></el-input>
                </el-form-item>
                <el-form-item label="采购单价">
                    <el-input v-model="currentSelection.name"></el-input>
                </el-form-item>
                <el-form-item label="销售单价">
                    <el-input v-model="currentSelection.unitPrice"></el-input>
                </el-form-item>
                <el-form-item label="提成价"
                              width='100px'>
                    <el-input v-model="currentSelection.promotion"></el-input>
                </el-form-item>
                <el-form-item label="货位">
                    <el-input v-model="currentSelection.position"></el-input>
                </el-form-item>
            </el-form>
            <el-form class='dialog-form'
                     ref="form"
                     :model="form"
                     label-width="80px">
                <el-form-item label="批准文号"
                              width='120px'>
                    <el-input v-model="currentSelection.approvalNumber"></el-input>
                </el-form-item>
                <el-form-item label="批号">
                    <el-input v-model="currentSelection.batchNumber"></el-input>
                </el-form-item>
                <el-form-item label="厂家">
                    <el-input v-model="currentSelection.factory"></el-input>
                </el-form-item>
                <el-form-item label="供货单位">
                    <el-input v-model="currentSelection.factory"></el-input>
                </el-form-item>
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
            </el-form>
            <span style='display:none' slot="footer"
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
            drugTypes:[{
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
            }],
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
            if(this.form.name) {
                this.$http.get('/api/drug').then((res) => {
                    for(var i in res.data) {
                        if(res.data[i].name == this.form.name) {
                            arr.push(res.data[i])
                        }
                    }
                    this.drugs = arr
                })
                return
            }
            if(this.form.type) {
                this.$http.get('/api/drug').then((res) => {
                    for(var i in res.data) {
                        if(res.data[i].drugsType == this.form.type) {
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
.el-dialog--small {
    width:40%
}
</style>
