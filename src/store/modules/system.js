
const state = {
  system: {
    order: '',
    dateTime: '',
    cardLength: '1',
    limitDay: '2',
    copyPath: '',
    copyDay: '3',
    saveGrade: '',
    checkedInt: true,
    allowTab: true,
    wordAlarm: true,
    limitYellow: true,
    limitDayDone: true,
    asTime: true,
    calculateAgain: true,
    allMoney: true,
    changeWho: true,
    salesPar: true,
    changeTime: true
  }
}

const mutations = {
  SYSTEM_SET(state, val) {
    state.system = val
  },
  SET_SYSTEM_DATETIME(state, val) {
    state.system.dateTime = val
  },
  SET_SYSTEM_CARDLENGTH(state, val) {
    state.system.cardLength = val
  },
  SET_SYSTEM_LIMITDAY(state, val) {
    state.system.limitDay = val
  },
  SET_SYSTEM_COPYPATH(state, val) {
    state.system.copyPath = val
  },
  SET_SYSTEM_COPYDAY(state, val) {
    state.system.copyDay = val
  },
  SET_SYSTEM_SAVECRADE(state, val) {
    state.system.saveGrade = val
  },
  SET_SYSTEM_CHECKEDINT(state, status) {
    state.system.checkedInt = status
  },
  SET_SYSTEM_ALLOWTAB(state, status) {
    state.system.allowTab = status
  },
  SET_SYSTEM_WORDALARM(state, status) {
    state.system.wordAlarm = status
  },
  SET_SYSTEM_LIMITYELLOW(state, status) {
    state.system.limitYellow = status
  },
  SET_SYSTEM_LIMITDAYDONE(state, status) {
    state.system.limitDayDone = status
  },
  SET_SYSTEM_ASTIME(state, status) {
    state.system.asTime = status
  },
  SET_SYSTEM_CALCULATEAGAIN(state, status) {
    state.system.calculateAgain = status
  },
  SET_SYSTEM_ALLMONEY(state, status) {
    state.system.allMoney = status
  },
  SET_SYSTEM_CHANGEWHO(state, status) {
    state.system.changeWho = status
  },
  SET_SYSTEM_SALESPAR(state, status) {
    state.system.salesPar = status
  },
  SET_SYSTEM_CHANGETIME(state, status) {
    state.system.changeTime = status
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
