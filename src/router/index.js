import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

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
                    component: resolve => require(['../components/page/system/SystemSet.vue'], resolve)
                },
                // 用户管理
                {
                    path: '/loginAlert',
                    component: resolve => require(['../components/page/auth/LoginAlert.vue'], resolve)
                },
                {
                    path: '/operator',
                    component: resolve => require(['../components/page/auth/Operator.vue'], resolve)
                },
                {
                    path: '/password',
                    component: resolve => require(['../components/page/auth/Password.vue'], resolve)
                },
                {
                    path: '/seller',
                    component: resolve => require(['../components/page/auth/Seller.vue'], resolve)
                },
                // 统计查询
                {
                    path: '/attendance',
                    component: resolve => require(['../components/page/qury/Attendance.vue'], resolve)
                },
                {
                    path: '/profit',
                    component: resolve => require(['../components/page/qury/Profit.vue'], resolve)
                },
                {
                    path: '/sales',
                    component: resolve => require(['../components/page/qury/Sales.vue'], resolve)
                },
                {
                    path: '/stock',
                    component: resolve => require(['../components/page/qury/Stock.vue'], resolve)
                },
                {
                    path: '/warehousing',
                    component: resolve => require(['../components/page/qury/Warehousing.vue'], resolve)
                },
                // 销售管理
                {
                    path: '/cashierHand',
                    component: resolve => require(['../components/page/sale/CashierHand.vue'], resolve)
                },
                {
                    path: '/drugRegist',
                    component: resolve => require(['../components/page/sale/DrugRegist.vue'], resolve)
                },
                {
                    path: '/drugSales',
                    component: resolve => require(['../components/page/sale/DrugSales.vue'], resolve)
                },
                {
                    path: '/saleCharts',
                    component: resolve => require(['../components/page/sale/SaleCharts.vue'], resolve)
                },
                // 入库出库管理
                {
                    path: '/drugsOut',
                    component: resolve => require(['../components/page/warehouse/DrugsOut.vue'], resolve)
                },
                {
                    path: '/storage',
                    component: resolve => require(['../components/page/warehouse/Storage.vue'], resolve)
                },
                // 基本信息
                {
                    path: '/manuFactore',
                    component: resolve => require(['../components/page/baseinfo/ManuFactore.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },

        {
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },
    ]
})
