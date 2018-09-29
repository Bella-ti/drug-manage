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
            <el-radio size='small' :label="1">日</el-radio>
            <el-radio size='small' :label="0">日期范围</el-radio>
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
        <div v-show='singleSelect === 0' class="block">
            <el-date-picker
            v-model="dateRange"
            type="daterange"
            placeholder="选择日期范围"
            size='small'>
            </el-date-picker>
        </div>
        <el-button style='float:left;margin-left:20px;margin-top:-6px' type="primary" size='small'>查询</el-button>
        <div class="mix-echarts">
            <IEcharts :option="mix" ></IEcharts>
        </div>
    </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3'
export default {
  data: function() {
    return {
      singleSelect: 1,
      year: '',
      month: '',
      date: '',
      dateRange: '',
      mix: {
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
      }
    }
  },
  components: {
    IEcharts
  }
}
</script>

<style scoped>
    .mix-echarts{
        width:500px;
        height:300px;
    }
    .block{
        float:left;
        margin-left:20px;
        margin-top:-6px
    }
</style>
