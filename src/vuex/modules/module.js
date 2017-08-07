import * as types from '../types'

 /* 
选材框的选中值
SEL_SELECTROWS
 */
const state = {
    module_conf:{}
}

const actions = {
    setModuleConf({ commit }, status) {
        commit(types.MODULE_CONF, status)
    }
}

const getters = {
    getModuleConf: status =>status.module_conf,
}

const mutations = {
    [types.MODULE_CONF](state, status) {
        state.module_conf = status
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}