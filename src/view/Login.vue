<template>
    <div class="login-wrap">
        <div class="ms-title">XX平台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username"
                              placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"
                              placeholder="密码"
                              v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop='type'>
                  <el-select v-model="value" placeholder="职务">
                        <el-option v-for="item in options"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary"
                               @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;text-align:right;color:#999;"
                   @click='toRegister'>
                    注册
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        type: 1
      },
      options: [
        {
          value: '1',
          label: '管理员'
        },
        {
          value: '2',
          label: '销售员'
        },
        {
          value: '3',
          label: '仓库管理员'
        }
      ],
      value: ''
    }
  },
  mounted() {
    this.getAllUser()
  },
  computed: {
      ...mapState({
          userList: ({ auth }) => auth.userList
      })
  },
  methods: {
      ...mapMutations(['SET_USERLIST', 'SET_CUR_USER']),
    getAllUser() {
      this.$http.get('/api/user').then((res) => {
        this.SET_USERLIST(res.data)
      })
    },
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        for (var i = 0; i < self.userList.length; i++) {
          if (self.ruleForm.username === self.userList[i].username && self.ruleForm.password === self.userList[i].password) {
            if (valid) {
              if (self.value == self.userList[i].type) {
                  this.SET_CUR_USER(self.userList[i])
                localStorage.setItem('curLogin', JSON.stringify(self.userList[i]))
                // self.userList[i].password = self.ruleForm.password
                // self.userList[i].type = self.value
                self.$router.push('/systemSet')
              }
            } else {
              console.log('error submit!!')
              this.$message.error('登录失败！')
              return false
            }
          }
        }
      })
    },
    toRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -200px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 215px;
  margin: -100px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
