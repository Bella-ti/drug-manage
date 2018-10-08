
const state = {
  admin: [
    //       {
    //           order: 'CH-1',
    //           username: 'admin',
    //           password: 'admin',
    //           type: 1,
    //           phone: '13289765374',
    //           address: '渭南市临渭区',
    //           sayAs: '......'
    //       }
    //   ],
    //   storage: [
    //       {
    //           order: 'CH-2',
    //           username: 'store1',
    //           password: '123456',
    //           type: 2,
    //           phone: '13289765374',
    //           address: '渭南市临渭区',
    //           sayAs: '......'
    //       }
    //   ],
    //   seller: [
    //       {
    //           order: 'CH-3',
    //           username: 'seller1',
    //           password: '123456',
    //           type: 3,
    //           phone: '13289765374',
    //           address: '渭南市临渭区',
    //           sayAs: '......'
    //       }
  ],
  curUser: {
    username: '',
    password: '',
    type: '',
    info: {}
  }
}

const mutations = {
  CUR_USER(state, value) {
    state.curUser = value
  },
  CUR_USER_INFO(state, value) {
    state.curUser.info = value
  },
  CUR_USER_PASSWORD(state, value) {
    state.curUser.password = value
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
