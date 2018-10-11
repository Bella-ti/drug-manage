const state = {
  userList: [],
  curUser: {
    username: '',
    password: '',
    type: '',
    information: {}
  }
}

const mutations = {
  SET_USERLIST(state, arr) {
    state.userList = arr
  },
  SET_CUR_USER(state, value) {
    state.curUser = value
  }
}

export default {
  state,
  mutations
}
