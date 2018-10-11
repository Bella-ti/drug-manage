const state = {}

const mutations = {}

const actions = {
  // deep copy
  deepCopy(p, c) {
    c = c || {}
    for (var i in p) {
      if (typeof p[i] === 'object') {
        c[i] = p[i].constructor === Array ? [] : {}
        // deepCopy(p[i], c[i])
      } else {
        c[i] = p[i]
      }
    }
    return c
  },
  // 处理当前时间的函数（yyyy-MM-dd）
  getDateTime: function() {
    const date = new Date()
    var seperator = '-'
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentime = '' + date.getFullYear() + seperator + month + seperator + strDate
    return currentime
  }
}

export default {
  state,
  mutations,
  actions
}
