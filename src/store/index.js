import Vue from 'vue'
import Vuex from 'vuex'
import qury from './modules/qury'
import auth from './modules/auth'
import baseinfo from './modules/baseinfo'
import sale from './modules/sale'
import globeCfg from './modules/globeCfg'
import storage from './modules/storage'
import system from './modules/system'
import tables from './modules/tables'
import warehouse from './modules/warehouse'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    qury,
    auth,
    baseinfo,
    sale,
    globeCfg,
    storage,
    system,
    tables,
    warehouse
  }
})

export default store
