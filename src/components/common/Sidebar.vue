<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <el-menu-item index="systemSet">
                <i class="d-icon-setting"> <span class="setting-remote">系统设置</span></i>
            </el-menu-item>
            <el-submenu v-for="(item, j) in barTree" :key="j" :index="j">
                <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
                <el-menu-item v-for="(ido, k) in item.children" :key="k" :index="ido.pathUrl">{{ido.title}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import dataTree from '../../assest/static/js/dataTree.js'
export default {
  data() {
    return {
      curUser: {},
      barTree: {}
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    }
  },
  created() {
    this.curUser = JSON.parse(localStorage.getItem('curLogin'))
    this.barTree = dataTree(this.curUser.type)
  }
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
    .d-icon-setting .setting-remote{
        font-family: "Helvetica Neue",Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
        font-size: 14px;
        font-weight: 500;
        padding-left: 5px;
    }
</style>
