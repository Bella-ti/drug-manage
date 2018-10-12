var dataTreeInfo = {}
export default function dataTree(type) {
  if (type === 1) {
    dataTreeInfo.user = {
      icon: 'd-icon-user-mage',
      title: '用户管理',
      children: [
        {
          pathUrl: 'loginAlert',
          title: '用户信息'
        },
        {
          pathUrl: 'password',
          title: '修改密码'
        },
        {
          pathUrl: 'seller',
          title: '人员管理'
        }
        // {
        // 	pathUrl: 'operator',
        // 	title: '人员权限管理'
        // }
      ]
    }
    dataTreeInfo.search = {
      icon: 'd-icon-collect-search',
      title: '统计查询',
      children: [
        {
          pathUrl: 'stock',
          title: '库存商品'
        },
        {
          pathUrl: 'warehousing',
          title: '入库记录'
        },
        {
          pathUrl: 'profit',
          title: '出库记录'
        },
        {
          pathUrl: 'attendance',
          title: '员工考勤记录'
        },
        {
          pathUrl: 'saleCharts',
          title: '销售额查询'
        },
        {
          pathUrl: 'sales',
          title: '查询销售记录'
        }
      ]
    }
    dataTreeInfo.sale = {
      icon: 'd-icon-sale-mage',
      title: '销售管理',
      children: [
        {
          pathUrl: 'drugSales',
          title: '商品销售'
        },
        {
          pathUrl: 'cashierHand',
          title: '收银员交班'
        },
        {
          pathUrl: 'drugRegist',
          title: '处方商含麻商登记'
        },
        {
          pathUrl: 'settlement',
          title: '商品销售应收结算'
        }
      ]
    }
    dataTreeInfo.storage = {
      icon: 'd-icon-stock',
      title: '仓库管理',
      children: [
        // {
        //   pathUrl: 'storageQuery',
        //   title: '库存盘点单'
        // },
        // {
        //   pathUrl: 'resultTable',
        //   title: '损益单'
        // },
        {
          pathUrl: 'storage',
          title: '商品入库'
        },
        {
          pathUrl: 'drugsOut',
          title: '商品出库'
        }
      ]
    }
    dataTreeInfo.base = {
      icon: 'd-icon-base-info',
      title: '基本信息',
      children: [
        {
          pathUrl: 'manuFactore',
          title: '供货单位管理'
        }
      ]
    }
  } else if (type === 2) {
    dataTreeInfo.user = {
      icon: 'el-icon-setting',
      title: '用户管理',
      children: [
        {
          pathUrl: 'loginAlert',
          title: '用户信息'
        },
        {
          pathUrl: 'password',
          title: '修改密码'
        }
      ]
    }
    dataTreeInfo.sale = {
      icon: 'el-icon-setting',
      title: '销售管理',
      children: [
        {
          pathUrl: 'drugSales',
          title: '商品销售'
        },
        {
          pathUrl: 'cashierHand',
          title: '收银员交班'
        },
        {
          pathUrl: 'drugRegist',
          title: '处方商含麻商登记'
        },
        {
          pathUrl: 'settlement',
          title: '商品销售应收结算'
        },
        {
          pathUrl: 'saleCharts',
          title: '销售营业额'
        }
      ]
    }
  } else if (type === 3) {
    dataTreeInfo.user = {
      icon: 'el-icon-setting',
      title: '用户管理',
      children: [
        {
          pathUrl: 'loginAlert',
          title: '用户信息'
        },
        {
          pathUrl: 'password',
          title: '修改密码'
        }
      ]
    }
    dataTreeInfo.stock = {
      icon: 'el-icon-setting',
      title: '出入库管理',
      children: [
        {
          pathUrl: 'storage',
          title: '商品入库'
        },
        {
          pathUrl: 'drugsOut',
          title: '商品出库'
        }
      ]
    }
    dataTreeInfo.storage = {
      title: '仓库管理',
      children: [
        {
          pathUrl: 'storageQuery',
          title: '库存盘点单'
        },
        {
          pathUrl: 'resultTable',
          title: '损益单'
        }
      ]
    }
    dataTreeInfo.base = {
      title: '基本信息',
      children: [
        {
          pathUrl: 'manuFactore',
          title: '供货单位管理'
        }
      ]
    }
  }
  return dataTreeInfo
}
