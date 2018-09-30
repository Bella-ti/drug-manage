<template>
  <div class="wrapper">
    <div class="wrap">
      <div class="layout">
        <div>
          <div class="t_c">
            <h4 class="title_big30">注册管理账号</h4>
          </div>
          <div class="regbox">
            <el-form :model="ruleForm"
                     ref="ruleForm"
                     label-width="0px"
                     class="demo-ruleForm">
              <el-form-item prop="username">
                <el-input v-model="ruleForm.username"
                          placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password"
                          placeholder="请设置密码"
                          data-check="密码必须为数字、字母、特殊字符（_！~￥$%@#&+）组成的6-16位字符"
                          v-model="ruleForm.password"
                          @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
              <el-button type="primary"
                         class="btn332 submit-step"
                         @click="submitForm">立即注册</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {}
    }
  },
  methods: {
    getDate() {
      const date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currendate = '' + date.getFullYear() + month + strDate + date.getHours() + date.getMinutes() + date.getSeconds()
      return currendate
    },
    submitForm() {
      const dateTime = this.getDate()
      console.log(dateTime)
      this.$http.post('/api/user', {
        order: dateTime,
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        type: 1,
        information: null,
        array: []
      }).then((res) => {
        console.log(res)
        this.$router.push('/login')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}

</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100%;
  height: auto;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  background: rgb(191, 217, 216);
}

.wrap {
  padding-bottom: 80px;
}

.layout {
  width: 400px;
  margin: 0 auto;
  padding-bottom: 10px;
  background: #fff;
  border-radius: 4px;
}

.t_c {
  text-align: center;
  padding-top: 25px;
}

.title_big30 {
  font-size: 30px;
  font-weight: normal;
}

.regbox {
  margin: 0 auto;
  width: 332px;
  padding: 30px 0;
  line-height: 20px;
}

.btn332 {
  width: 330px;
}
</style>