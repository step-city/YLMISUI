import * as types from '../types'

 /* 
选材框的选中值
SEL_SELECTROWS
 */
const state = {
    sel_selectrows:[],
    sel_type:{}
}

const actions = {
    setSelectRows({ commit }, status) {
        commit(types.SEL_SELECTROWS, status)
    },
    setType({ commit }, status) {
        commit(types.SEL_TYPE, status)
    }
}

const getters = {
    getSelectRows: status =>status.sel_selectrows,
    getType: status =>status.sel_type,
}

const mutations = {
    [types.SEL_SELECTROWS](state, status) {
        state.sel_selectrows = status
    },
    [types.SEL_TYPE](state, status) {
        state.sel_type = status
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}