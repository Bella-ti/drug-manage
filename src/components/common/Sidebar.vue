<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <el-menu-item index="systemSet">
                <i class="el-icon-setting"> 系统设置</i>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
                <el-menu-item index="loginAlert">用户信息</el-menu-item>
                <el-menu-item index="password">修改密码</el-menu-item>
                <el-menu-item v-show='curUser.type == 1' index="seller">销售员管理</el-menu-item>
                <el-menu-item v-show='curUser.type == 1' index="operator">操作员权限管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>统计查询</template>
                <el-menu-item index="stock">查询库存药品</el-menu-item>
                <el-menu-item index="warehousing">查询入库记录</el-menu-item>
                <el-menu-item index="profit">查询出库记录</el-menu-item>
                <el-menu-item index="sales">查询销售记录</el-menu-item>
                <el-menu-item style='display:none' index="attendance">查询员工考勤</el-menu-item>
            </el-submenu>
            <el-submenu v-show='curUser.type != 2' index="3">
                <template slot="title"><i class="el-icon-date"></i>销售管理</template>
                <el-menu-item index="drugSales">药品销售</el-menu-item>
                <el-menu-item style='display:none' index="cashierHand">收银员交班</el-menu-item>
                <el-menu-item style='display:none' index="drugRegist">处方药含麻药登记</el-menu-item>
                <el-menu-item index="settlement">药品销售应收结算</el-menu-item>
                <el-menu-item index="saleCharts">销售营业额</el-menu-item>
            </el-submenu>
            <el-submenu v-show='curUser.type != 3' index="4">
                <template slot="title"><i class="el-icon-date"></i>入库出库管理</template>
                <el-menu-item index="storage">药品入库</el-menu-item>
                <el-menu-item index="drugsOut">药品出库</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-date"></i>仓库管理</template>
                <el-menu-item index="storageQuery">库存盘点单</el-menu-item>
                <el-menu-item index="resultTable">损益单</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-date"></i>基本信息</template>
                <el-menu-item index="manuFactore">供货单位管理</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                curUser:{}
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created() {
            this.curUser = JSON.parse(localStorage.getItem('curLogin'))
        },
    }
</script>

<style>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 50px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu-item,
    .el-submenu__title {
        height:45px;
        line-height: 45px
    }
</style>
