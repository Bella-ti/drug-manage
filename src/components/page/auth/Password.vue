<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form"
                     :model="curLogin"
                     label-width="100px">
                <el-form-item label="用户名">
                    <el-input disabled
                              v-model="curLogin.username"></el-input>
                </el-form-item>
                <el-form-item label="原密码">
                    <el-input type="password"
                              v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password"
                              v-model="form.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码">
                    <el-input type="password"
                              v-model="form.rePassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <span style='color:red'>{{tips}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="onSubmit">保存</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                password: '',
                newPassword: '',
                rePassword: ''
            },
            tips: '',
            status: false
        }
    },
    computed: {
        curLogin() {
            let curUser = localStorage.getItem('curLogin')
            curUser = JSON.parse(curUser)
            return curUser
        }
    },
    methods: {
        onSubmit() {
            let id = this.curLogin._id
            console.log(this.curLogin)
            if (this.form.password != this.curLogin.password) {
                this.tips = '原密码输入错误!'
                this.status = false
                return
            } else {
                this.status = true
            }
            if (this.status) {
                if (this.form.newPassword.length < 6) {
                    this.tips = '重设密码至少为6位!'
                    return
                }
                if (this.form.newPassword != this.form.rePassword) {
                    this.tips = '两次输入密码不一致!'
                } else {
                    this.tips = ''
                    this.$http.put(`/api/user/${id}`, {
                        order: this.curLogin.order,
                        username: this.curLogin.username,
                        password: this.form.newPassword,
                        type: this.curLogin.type,
                        info: {
                            address: this.curLogin.info.address,
                            phone: this.curLogin.info.phone,
                            sayAs: this.curLogin.info.sayAs
                        }
                    }).then((res) => {
                        console.log(res)
                        this.$router.push('/login')
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }
        },
        onCancel() {
            this.tips = ''
            this.form = {
                password: '',
                newPassword: '',
                rePassword: ''
            }
        }
    }
}
</script>