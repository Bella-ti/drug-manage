<template>
  <div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 销售管理</el-breadcrumb-item>
                <el-breadcrumb-item>收银员交接班</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item class="half" label="柜台总金额" style="width:50%" >
                <el-input type='text' v-model="form.id"></el-input>
            </el-form-item>
            <el-button type='primary' @click="dialoggStatus">交换班</el-button>
        </el-form>
        <el-dialog title="交班信息" v-model="dialogVisible" size="tiny">
          <el-form ref="form" :model="handleInfo" label-width="80px">
                <el-form-item label="当前员工" width='100px'>
                    <el-input v-model="handleInfo.order"></el-input>
                </el-form-item>
                <el-form-item label="交班人">
                    <el-input v-model="handleInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="柜台总额">
                    <el-input v-model="handleInfo.type"></el-input>
                </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleChange">确 定 交 班</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
export default{
  data() {
    return {
      form: {},
      handleInfo: {
        order: '',
        name: '',
        type: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    dialoggStatus() {
      this.dialogVisible = true
    },
    handleChange() {
      this.dialogVisible = false
    }
  }
}
</script>
