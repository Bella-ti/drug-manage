<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="curLogin" label-width="80px">
                <el-form-item label="编号">
                    <el-input disabled v-model="curLogin.order"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="curLogin.username"></el-input>
                </el-form-item>
                <el-form-item label="职务">
                    <el-input disabled v-model="curLogin.type"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="curLogin.info.phone"></el-input>
                </el-form-item>
                <el-form-item label="详细住址">
                    <el-input v-model="curLogin.info.address"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input type="textarea" v-model="curLogin.info.sayAs"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    
    </div>
</template>

<script>
export default {
    computed: {
        curLogin() {
            let curUser = localStorage.getItem('curLogin')
            curUser = JSON.parse(curUser)
            switch (curUser.type) {
                case 1:
                    curUser.type = '管理员'
                    break
                case 2:
                    curUser.type = '仓库管理员'
                    break
                case 3:
                    curUser.type = '操作员'
                    break
                default:
                    curUser.type = '非工作人员'
            }
            return curUser
        }
    },
    methods: {
        onSubmit() {
            let id = this.curLogin._id
            switch (this.curLogin.type) {
                case '管理员':
                    this.curLogin.type = 1
                    break
                case '仓库管理员':
                    this.curLogin.type = 2
                    break
                case '操作员':
                    this.curLogin.type = 3
                    break
                default:
                    this.curLogin.type = ''
            }
            if (this.curLogin.type === '') {
                return
            }
            this.$http.put(`/api/user/${id}`, {
                order: this.curLogin.order,
                username: this.curLogin.username,
                password: this.curLogin.password,
                type: this.curLogin.type,
                info: {
                    address: this.curLogin.info.address,
                    phone: this.curLogin.info.phone,
                    sayAs: this.curLogin.info.sayAs
                }
            }).then(() => {
                localStorage.setItem('curLogin', JSON.stringify(this.curLogin))
                this.$message.success('修改成功！')
            }).catch(() => {
                this.$message.error('修改出错！')
            })
        }
    }
}
</script>