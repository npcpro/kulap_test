export const state = {
  sw_drawer:(window.outerWidth >= 600)? true : false,
  login:false,
  user:{},
}
export const mutations = {
  LOGIN(state,val){
    state.login = val
  },
  USER (state, value) {
    state.user = value
  },	
}
export const actions = {
  sw_drawer  : ({ commit }, value) => commit('SW_DRAWER', value),
  login		 : ({ commit }, value) => commit('LOGIN', value),
  user     : ({ commit }, value) => commit('USER', value),
}
export const getters = {
  sw_drawer  : state => state.sw_drawer,
  login   : state => state.login,
  user    : state => state.user,
}
