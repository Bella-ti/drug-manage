var stockInfo = []
export function stockIn (type) {
	/**
	 * disable 禁用
	 * date 时间选择器
	 * option 选择框
	 * unit 单位（元）
	 * require 是否必须
	 */
	stockInfo = [
		{
			label: '入库单号',
			value: 'orderNum',
			disabled: true,
			require: true
		},
		{
			label: '入库日期',
			value: 'storageDate',
			date: true
		},
		{
			label: '入库类型',
			value: 'storageType',
			option: [ '采购', '下架' ]
		},
		{
			label: '药品名称',
			value: 'goodsName',
			require: true
		},
		{
			label: '商品ID',
			value: 'goodsId',
			require: true
		},
		{
			label: '拼音码',
			value: 'pinyinMa'
		},
		{
			label: '剂型',
			value: 'dosageForms'
		},
		{
			label: '批准文号',
			value: 'approvalNumber'
		},
		{
			label: '批号',
			value: 'batchNumber'
		},
		{
			label: '货位',
			value: 'location'
		},
		{
			label: '入库数量',
			value: 'warehouseNum',
			require: true
		},
		{
			label: '进价',
			value: 'unitPrice',
			unit: true,
			require: true
		},
		{
			label: '生产日期',
			value: 'producteDate',
			require: true
		},
		{
			label: '有效期',
			value: 'validPeriod',
			require: true
		},
		{
			label: '供货单位',
			value: 'supplyUnit',
			require: true
		},
		{
			label: '厂家',
			value: 'manufacturer'
		},
		{
			label: '商品种类',
			value: 'goodsType'
		},
		{
			label: '药品类别',
			value: 'drugCategory'
		},
		{
			label: '自定义类',
			value: 'customClass'
		},
		{
			label: '外观质量',
			value: 'quality',
			option: [ '合格', '不合格' ],
			require: true
		},
		{
			label: '验收结论',
			value: 'conclusion',
			option: [ '合格', '不合格' ],
			require: true
		},
		{
			label: '验收人',
			value: 'acceptPerson',
			require: true
		},
		{
			label: '采购员',
			value: 'purchaser',
			require: true
		}
	]
	return stockInfo
}

export function stockOut() {

	return stockInfo
}