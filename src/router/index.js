import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/systemSet',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/systemSet',
          component: resolve => require(['../view/system/SystemSet.vue'], resolve)
        },
        // 用户管理
        {
          path: '/loginAlert',
          component: resolve => require(['../view/auth/LoginAlert.vue'], resolve)
        },
        {
          path: '/operator',
          component: resolve => require(['../view/auth/Operator.vue'], resolve)
        },
        {
          path: '/password',
          component: resolve => require(['../view/auth/Password.vue'], resolve)
        },
        {
          path: '/seller',
          component: resolve => require(['../view/auth/Seller.vue'], resolve)
        },
        // 统计查询
        {
          path: '/attendance',
          component: resolve => require(['../view/qury/Attendance.vue'], resolve)
        },
        {
          path: '/profit',
          component: resolve => require(['../view/qury/Profit.vue'], resolve)
        },
        {
          path: '/sales',
          component: resolve => require(['../view/qury/Sales.vue'], resolve)
        },
        {
          path: '/stock',
          component: resolve => require(['../view/qury/Stock.vue'], resolve)
        },
        {
          path: '/warehousing',
          component: resolve => require(['../view/qury/Warehousing.vue'], resolve)
        },
        // 销售管理
        {
          path: '/cashierHand',
          component: resolve => require(['../view/sale/CashierHand.vue'], resolve)
        },
        {
          path: '/drugRegist',
          component: resolve => require(['../view/sale/DrugRegist.vue'], resolve)
        },
        {
          path: '/drugSales',
          component: resolve => require(['../view/sale/DrugSales.vue'], resolve)
        },
        {
          path: '/settlement',
          component: resolve => require(['../view/sale/Settlement.vue'], resolve)
        },
        {
          path: '/saleCharts',
          component: resolve => require(['../view/sale/SaleCharts.vue'], resolve)
        },
        // 入库出库管理
        {
          path: '/drugsOut',
          component: resolve => require(['../view/warehouse/DrugsOut.vue'], resolve)
        },
        {
          path: '/storage',
          component: resolve => require(['../view/warehouse/Storage.vue'], resolve)
        },
        // 仓库管理
        {
          path: '/storageQuery',
          component: resolve => require(['../view/storage/StorageQuery.vue'], resolve)
        },
        {
          path: '/resultTable',
          component: resolve => require(['../view/storage/ResultTable.vue'], resolve)
        },
        // 基本信息
        {
          path: '/manuFactore',
          component: resolve => require(['../view/baseinfo/ManuFactore.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../view/Login.vue'], resolve)
    },

    {
      path: '/register',
      component: resolve => require(['../view/Register.vue'], resolve)
    }
  ]
})
