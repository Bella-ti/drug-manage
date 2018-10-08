var dataTree = {}
export default function dataTree (type) {
	if (type === 1) {
		dataTree.user = {
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
					title: '销售员管理'
				},
				{
					pathUrl: 'operator',
					title: '操作员权限管理'
				}
			]
		}
		dataTree.search = {
			icon: 'd-icon-collect-search',
			title: '统计查询',
			children: [
				{
					pathUrl: 'stock',
					title: '查询库存药品'
				},
				{
					pathUrl: 'warehousing',
					title: '查询入库记录'
				},
				{
					pathUrl: 'profit',
					title: '查询出库记录'
				},
				{
					pathUrl: 'sales',
					title: '查询销售记录'
				},
				{
					pathUrl: 'attendance',
					title: '查询员工考勤'
				} 
			]
		}
		dataTree.sale = {
			icon: 'd-icon-sale-mage',
			title: '销售管理',
			children: [
				{
					pathUrl: 'drugSales',
					title: '药品销售'
				},
				{
					pathUrl: 'cashierHand',
					title: '收银员交班'
				},
				{
					pathUrl: 'drugRegist',
					title: '处方药含麻药登记'
				},
				{
					pathUrl: 'settlement',
					title: '药品销售应收结算'
				},
				{
					pathUrl: 'saleCharts',
					title: '销售营业额'
				} 
			]
		}
		dataTree.stock = {
			icon: 'd-icon-churuku',
			title: '出入库管理',
			children: [
				{
					pathUrl: 'storage',
					title: '药品入库'
				},
				{
					pathUrl: 'drugsOut',
					title: '药品出库'
				} 
			]
		}
		dataTree.storage = {
			icon: 'd-icon-stock',
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
		dataTree.base = {
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
		dataTree.user = {
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
		dataTree.sale = {
			icon: 'el-icon-setting',
			title: '销售管理',
			children: [
				{
					pathUrl: 'drugSales',
					title: '药品销售'
				},
				{
					pathUrl: 'cashierHand',
					title: '收银员交班'
				},
				{
					pathUrl: 'drugRegist',
					title: '处方药含麻药登记'
				},
				{
					pathUrl: 'settlement',
					title: '药品销售应收结算'
				},
				{
					pathUrl: 'saleCharts',
					title: '销售营业额'
				} 
			]
		}
	} else if (type === 3) {
		dataTree.user = {
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
		dataTree.stock = {
			icon: 'el-icon-setting',
			title: '出入库管理',
			children: [
				{
					pathUrl: 'storage',
					title: '药品入库'
				},
				{
					pathUrl: 'drugsOut',
					title: '药品出库'
				} 
			]
		}
		dataTree.storage = {
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
		dataTree.base = {
			title: '基本信息',
			children: [
				{
					pathUrl: 'manuFactore',
					title: '供货单位管理'
				}
			]
		}
	}
	return dataTree
}