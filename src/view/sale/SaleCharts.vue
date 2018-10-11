<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 销售管理</el-breadcrumb-item>
                <el-breadcrumb-item>销售额查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <p style='margin-bottom:15px'>选择查询类别：</p>
         <el-radio-group style='float:left' v-model="singleSelect">
            <el-radio size='small' :label="3">年</el-radio>
            <el-radio size='small' :label="2">月</el-radio>
        </el-radio-group>
        <div v-show='singleSelect === 3' class="block">
            <el-date-picker
                v-model="year"
                align="right"
                type="year"
                placeholder="选择年"
                size='small'>
            </el-date-picker>
        </div>
        <div v-show='singleSelect === 2' class="block">
            <el-date-picker
                v-model="month"
                type="month"
                placeholder="选择月"
                size='small'>
            </el-date-picker>
        </div>
         <div v-show='singleSelect === 1' class="block">
            <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            size='small'>
            </el-date-picker>
        </div>
        <el-button size="small"
                       type="primary"
                       @click="select"
                       style="height:28px;margin:5px 0 0 15px">查询</el-button>
        <div class="mix-echarts" v-if='singleSelect === 3'>
            <IEcharts :option="mixYear" ></IEcharts>
        </div>
        <div class="mix-echarts" v-if='singleSelect === 2'>
            <IEcharts :option="mixMonth" ></IEcharts>
        </div>
        <div class="mix-echarts" v-if='singleSelect === 1'>
            <IEcharts :option="mixDate" ></IEcharts>
        </div>
    </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3'
export default {
  data: function() {
    return {
      singleSelect: 3,
      year: '',
      month: '',
      date: '',
      dateRange: '',
      mixDate: {
        color: ['#20a0ff', '#F7BA2A', '#F7BA2A', '#FF4949', '#61a0a8'],
        legend: {
          data: ['销售额']
        },
        xAxis: {
          data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
        },
        yAxis: {},
        series: [
          {
            name: '销售额',
            type: 'line', // bar
            data: [6, 15, 20, 46, 28, 20, 4]
          }
        ]
      },
      mixYear: {
        color: ['#F7BA2A', '#F7BA2A', '#FF4949', '#61a0a8', '#20a0ff'],
        legend: {
          data: ['销售额']
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {},
        series: [
          {
            name: '销售额',
            type: 'line', // bar
            data: [6, 15, 20, 46, 28, 20, 4, 54, 6, 7, 8, 9]
          }
        ]
      },
      mixMonth: {
        color: ['#F7BA2A', '#FF4949', '#61a0a8', '#20a0ff', '#F7BA2A'],
        legend: {
          data: ['销售额']
        },
        xAxis: {
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        },
        yAxis: {},
        series: [
          {
            name: '销售额',
            type: 'line', // bar
            data: [6, 15, 20, 46, 28, 20, 4, 54, 6, 7, 8]
          }
        ]
      }
    }
  },
  created() {
    this.getSales()
  },
  computed: {
  },
  methods: {
    getSales() {
      this.$http.get(`/api/drugsale`).then(res => {
        this.record = res.data
      })
    },
    select() {
      if (this.singleSelect === 3) {
        this.selectYear()
      }
      if (this.singleSelect === 2) {
        this.selectMonth()
      }
      if (this.singleSelect === 1) {
        this.selectDay()
      }
    },
    selectYear() {
      var monthArr = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': []
      }
      this.$http.get(`/api/drugsale`).then(res => {
        for (var i in res.data) {
          var saleTime = res.data[i].saleTime.slice(0, 4)
          var year = this.getDateTime(this.year).year
          if (saleTime === year) {
            var month = res.data[i].saleTime.slice(5, 7)
            for (var k in monthArr) {
              if (parseInt(month) === k) {
                monthArr[k].push(res.data[i])
              }
            }
          }
        }
        var arr1 = []
        for (var m in monthArr) {
          if (!monthArr[m].length) {
            arr1.push(0)
          } else {
            for (var s in monthArr[m]) {
              var total = 0
              for (var j in monthArr[m][s].saleInfo) {
                total += Number(monthArr[m][s].saleInfo[j].number) * Number(monthArr[m][s].saleInfo[j].unitPrice)
              }
            }
            arr1.push(total)
          }
        }
        this.mixYear.series[0].data = arr1
      }).catch(err => {
        console.log(err)
      })
    },
    selectMonth() {
      var monthArr = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': [],
        '13': [],
        '14': [],
        '15': [],
        '16': [],
        '17': [],
        '18': [],
        '19': [],
        '20': [],
        '21': [],
        '22': [],
        '23': [],
        '24': [],
        '25': [],
        '26': [],
        '27': [],
        '28': [],
        '29': [],
        '30': [],
        '31': []
      }
      this.$http.get(`/api/drugsale`).then(res => {
        for (var i in res.data) {
          var saleTime = res.data[i].saleTime.slice(0, 7)
          var yearMon = this.getDateTime(this.month).year + '-' + this.getDateTime(this.month).month
          console.log(saleTime === yearMon)
          if (saleTime === yearMon) {
            var month = res.data[i].saleTime.slice(8)
            for (var k in monthArr) {
              if (parseInt(month) === k) {
                monthArr[k].push(res.data[i])
              }
            }
          }
        }
        var arr2 = []
        for (var m in monthArr) {
          if (!monthArr[m].length) {
            arr2.push(0)
          } else {
            for (var s in monthArr[m]) {
              var total = 0
              for (var j in monthArr[m][s].saleInfo) {
                total += Number(monthArr[m][s].saleInfo[j].number) * Number(monthArr[m][s].saleInfo[j].unitPrice)
              }
            }
            arr2.push(total)
          }
        }
        this.mixMonth.series[0].data = arr2
        console.log(arr2)
      }).catch(err => {
        console.log(err)
      })
    },
    getDateTime(curDate) {
      const date = curDate
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return {
        year: date.getFullYear(),
        month: month,
        day: strDate
      }
    }
  },
  components: {
    IEcharts
  }
}
</script>

<style scoped>
.mix-echarts {
  width: 600px;
  height: 400px;
}
.block {
  float: left;
  margin-left: 20px;
  margin-top: -6px;
}
</style>
