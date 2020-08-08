export const state = {
  sw_drawer:(window.outerWidth >= 600)? true : false,
  login:false,
  user:{},
	stores:[],
	storeSelected:'',
	ordersoldStatus:{}
}
export const mutations = {

  LOGIN(state,val){
    state.login = val
  },
  USER (state, value) {
    state.user = value
  },
	SW_DRAWER (state, value) {
    state.sw_drawer = !value
  },
	STORES (state, value) {
    state.stores = value
  },
  STORE_SELECTED (state, val) {
    state.storeSelected = val
  },
	 ORDER_SOLDSTATUS (state, val) {
    state.ordersoldStatus = val
  },
}
export const actions = {
  sw_drawer  : ({ commit }, value) => commit('SW_DRAWER', value),
  login		 : ({ commit }, value) => commit('LOGIN', value),
  user     : ({ commit }, value) => commit('USER', value),
  stores   : ({ commit }, value) => commit('STORES', value),
  storeSelected    : ({ commit }, value) => commit('STORE_SELECTED', value),
  ordersoldStatus : ({ commit }, value)  => commit('ORDER_SOLDSTATUS', value),
}
export const getters = {
  sw_drawer  : state => state.sw_drawer,
  login   : state => state.login,
  user    : state => state.user,
  stores  : state => state.stores,
  storeSelected     : state => state.storeSelected,
  ordersoldStatus  : state => state.ordersoldStatus,
}
