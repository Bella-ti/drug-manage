var goodsInfos = []
export default function goodsInfo(type) {
  if (type === 2) {
    goodsInfos = [
      {
        prop: 'goodsName',
        label: '商品名称',
        fixed: true
      },
      {
        prop: 'goodsId',
        label: '商品ID'
      },
      {
        prop: 'pinyinMa',
        label: '拼音码'
      },
      {
        prop: 'dosageForms',
        label: '剂型'
      },
      {
        prop: 'approvalNumber',
        label: '批准文号'
      },
      {
        prop: 'batchNumber',
        label: '批号'
      },
      {
        prop: 'location货位',
        label: '货位'
      },
      {
        prop: 'inventory',
        label: '库存量'
      },
      {
        prop: 'unitPrice',
        label: '进价'
      },
      {
        prop: 'salePrice',
        label: '销价'
      },
      {
        prop: 'promotion',
        label: '促销折扣'
      },
      {
        prop: 'producteDate',
        label: '生产日期'
      },
      {
        prop: 'validPeriod',
        label: '有效日期'
      },
      {
        prop: 'supplyUnit',
        label: '供货单位'
      },
      {
        prop: 'manufacturer',
        label: '厂家'
      },
      {
        prop: 'goodsType',
        label: '商品分类'
      },
      {
        prop: 'drugCategory',
        label: '商品种类'
      },
      {
        prop: 'customClass',
        label: '自定义类'
      }
    ]
  } else if (type === 0) {
    goodsInfos = [
      {
        prop: 'goodsName',
        label: '商品名称',
        fixed: true
      },
      {
        prop: 'inventory',
        label: '库存量'
      },
      {
        prop: 'drugCategory',
        label: '商品种类'
      },
      {
        prop: 'producteDate',
        label: '生产日期'
      },
      {
        prop: 'validPeriod',
        label: '有效日期'
      },
      {
        prop: 'supplyUnit',
        label: '供货单位'
      },
      {
        prop: 'unitPrice',
        label: '进价'
      },
      {
        prop: 'salePrice',
        label: '销价'
      }
    ]
  } else if (type === 1) {
    goodsInfos = [
      {
        prop: 'goodsName',
        label: '商品名称',
        fixed: true
      },
      {
        prop: 'goodsId',
        label: '商品ID'
      },
      {
        prop: 'dosageForms',
        label: '剂型'
      },
      {
        prop: 'inventory',
        label: '库存量'
      },
      {
        prop: 'unitPrice',
        label: '进价'
      },
      {
        prop: 'salePrice',
        label: '销价'
      },
      {
        prop: 'promotion',
        label: '促销折扣'
      },
      {
        prop: 'producteDate',
        label: '生产日期'
      },
      {
        prop: 'validPeriod',
        label: '有效日期'
      },
      {
        prop: 'supplyUnit',
        label: '供货单位'
      },
      {
        prop: 'manufacturer',
        label: '厂家'
      },
      {
        prop: 'drugCategory',
        label: '商品种类'
      }
    ]
  }
  return goodsInfos
}
