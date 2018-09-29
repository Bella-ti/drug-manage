<template>
  <div class='system'>
    <div class='normal-set'>
      <p>常规设置</p>
      <div class='reboot'>
        <span>最近一次销售日期</span>
        <el-input class='dateInput'
                  v-model="param.dateTime"></el-input>
        <el-button type="primary"
                   @click="onChange">改为今天</el-button>
      </div>
      <div class='member-card'>
        <span>会员卡卡号长度</span>
        <el-input class='card-length'
                  v-model="param.cardLength"></el-input>
      </div>
      <div class='vaild'>
        <span>药品有效期小于</span>
        <el-input class='card-length'
                  v-model="param.limitDay"></el-input>
        <span>天禁止销售</span>
      </div>
      <div class='vaild'>
        <span>备份数据文件路径</span>
        <el-input class='date-length'
                  v-model="param.copyPath">
        </el-input>
      </div>
      <div class='copy'>
        <span>自动更新备份</span>
        <el-input class='card-length'
                  v-model="param.copyDay"></el-input>
        <span>天</span>
      </div>
    </div>
    <div class='sale-set'>
      <p>销售设置</p>
      <div class='saling'>
        <el-checkbox class='one'
                     :checked="param.allowTab"
                     @change='pAlTa'>销售时，只允许销售柜台上的药，不允许销售库房的药</el-checkbox>
        <el-checkbox :checked="param.wordAlarm">销售时，处方药文字提醒</el-checkbox>
        <el-checkbox :checked="param.limitYellow">销售时，查询药品数量小于下限，黄色显示</el-checkbox>
        <el-checkbox :checked="param.limitDayDone">销售时，查询药品已过保质期，红色显示</el-checkbox>
        <el-checkbox :checked="param.asTime">销售时，查询药品时显示顺序按入库时间排序</el-checkbox>
        <el-checkbox :checked="param.calculateAgain">销售时，实际销售价小于预售价，提醒重新计算</el-checkbox>
      </div>
    </div>
    <div class='integral'>
      <p>积分规则</p>
      <div class='param'>积分参数：
        <el-input class='param-length'
                  v-model="param.saveGrade"></el-input>
      </div>
      <div class='tips'>
        会员积分 = 消费金额 x 积分参数
      </div>
      <el-checkbox class='one'
                   :checked="param.checkedInt">积分只取整数，小于整数 1 时不计积分</el-checkbox>
    </div>
    <div class='next-shift'>
      <p>交班条内容</p>
      <div class='twing'>
        <el-checkbox class='one'
                     :checked="param.allMoney">当天总营业额</el-checkbox>
        <el-checkbox :checked="param.salesPar">当天促销药品及促销数量</el-checkbox>
        <el-checkbox :checked="param.changeTime">交班时间</el-checkbox>
        <el-checkbox :checked="param.changeWho">换班人员</el-checkbox>
      </div>
    </div>
    <div class='save'>
      <el-button class='save-btn'
                 type="primary"
                 @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {
        // order: 'zero',
        // dateTime: '2017/03/04 09:08:07',
        // cardLength: 11,
        // limitDay: '2',
        // copyPath: '',
        // copyDay: '3',
        // saveGrade: '',
        // checkedInt: true,
        // allowTab: false,
        // wordAlarm: true,
        // limitYellow: true,
        // limitDayDone: true,
        // asTime: true,
        // calculateAgain: true,
        // allMoney: true,
        // changeWho: true,
        // salesPar: true,
        // changeTime: true
      }
    }
  },
  created() {
    this.$http.get('/api/system').then((res) => {
      console.log(res, res.body[0])
      this.param = res.body[0]
    }).catch((err) => {
      console.log(err)
    })
    console.log(this.param)
  },
  methods: {
    onChange() {
      this.param.dateTime = this.getDateTime()
    },
    pAlTa() {
      // this.$set(this.param, 'allowTab', !this.param.allowTab)
      console.log(this.param.allowTab)
    },
    onSubmit(status) {
      let id = this.param._id
      const order = 'zero'
      this.$http.delete(`/api/system/${id}`, {}).then(() => {
        return this.$http.post(`/api/system`, {
          order: order,
          dateTime: this.param.dateTime,
          cardLength: this.param.cardLength,
          limitDay: this.param.limitDay,
          copyPath: this.param.copyPath,
          copyDay: this.param.copyDay,
          saveGrade: this.param.saveGrade,
          checkedInt: this.param.checkedInt,
          allowTab: this.param.allowTab,
          wordAlarm: this.param.wordAlarm,
          limitYellow: this.param.limitYellow,
          limitDayDone: this.param.limitDayDone,
          asTime: this.param.asTime,
          calculateAgain: this.param.calculateAgain,
          allMoney: this.param.allMoney,
          changeWho: this.param.changeWho,
          salesPar: this.param.salesPar,
          changeTime: this.param.changeTime
        })
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
      // this.$http.put(`/api/system/${id}`, {
      //   order: this.system.order,
      //   dateTime: this.system.dateTime,
      //   cardLength: this.system.cardLength,
      //   limitDay: this.system.limitDay,
      //   copyPath: this.system.copyPath,
      //   copyDay: this.system.copyDay,
      //   saveGrade: this.system.saveGrade,
      //   checkedInt: this.system.checkedInt,
      //   allowTab: this.system.allowTab,
      //   wordAlarm: this.system.wordAlarm,
      //   limitYellow: this.system.limitYellow,
      //   limitDayDone: this.system.limitDayDone,
      //   asTime: this.system.asTime,
      //   calculateAgain: this.system.calculateAgain,
      //   allMoney: this.system.allMoney,
      //   changeWho: this.system.changeWho,
      //   salesPar: this.system.salesPar,
      //   changeTime: this.system.changeTime
      // }).then((res) => {
      //   console.log(res)
      //   this.SYSTEM_SET(this.system)
      // }).catch((err) => {
      //   console.log(err)
      // })
    },
    // 处理当前时间的函数（yyyy-MM-dd）
    getDateTime: function() {
      const date = new Date()
      var seperator1 = '/'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentime = '' + date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
      return currentime
    }
  }
}
</script>

<style>
.system {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start
}

.system .normal-set,
.system .sale-set,
.system .integral,
.system .next-shift {
  width: 46%;
  padding: 0 20px 20px 20px
}

.system .normal-set:hover p,
.system .sale-set:hover p,
.system .integral:hover p,
.system .next-shift:hover p {
  color: #00d1b2
}

.system .normal-set p,
.system .sale-set p,
.system .integral p,
.system .next-shift p {
  padding-bottom: 10px;
  padding-left: 20px;
  border-bottom: 1px solid #ddd;
}

.system .reboot,
.system .member-card,
.system .vaild,
.copy {
  padding: 20px 20px 0 20px;
}

.system .dateInput {
  width: 152px;
  font-size: 12px
}

.system .card-length {
  width: 50px
}

.system .date-length {
  width: 150px
}

.system .saling,
.system .twing {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 0;
}

.system .saling .one,
.system .integral .one,
.system .twing .one {
  margin-left: 15px
}

.system .el-checkbox {
  margin-bottom: 15px
}

.system .param-length {
  width: 40px
}

.system .tips {
  font-size: 12px
}

.system .param {
  padding: 20px 20px 0 20px
}

.system .tips {
  padding: 15px 20px
}

.system .save {
  width: 100%;
  padding-left: 30px
}

.system .save .save-btn {
  padding: 10px 20px
}

/*表单*/

.system .el-input__inner {
  height: 26px
}

.system .el-button {
  padding: 5px 10px
}
</style>
