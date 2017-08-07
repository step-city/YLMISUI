import * as types from '../types'
import util from 'common/js/util';

 /* 
 系统通用配置
 */
const state = {
    com_userinfo:{
       user:{
                emailAddress:'',
                realName:'',
                userName:'',
                gender:'',
                id:'',
                lastLoginTime:'',
                manageOrgId:'',
                manageOrgName:'',
                roleId:'',
                roleName:'',
            },
        userDataRanges:[],
        userRoles:[],
    },
    com_loginStatus:false,
    com_Token:''
}

const actions = {
    getUserInfo({ commit }, status) {
        commit(types.COM_USERINFO, status)
    },
    getLoginSatus({ commit }, status) {
        commit(types.COM_LOGINSTATUS, status)
    },
    getToken({ commit }, status) {
        commit(types.COM_Token, status)
    }
}

const getters = {
    getUserInfo: status =>status.com_userinfo,
    getLoginSatus: status => {
        if(!status.com_loginStatus){
            let loginStatus=util.getCookie('loginStatus');
            if(loginStatus=="on"){
                return true;  
            }else{
                return false;  
            }
        }
      return status.com_loginStatus;
    },
    getToken: status => {
        if(status.com_Token==""){
            //先判断cookie
            let token=util.getCookie('Authorization');
            if(token!=""){
              //取本地cooike    
              return  token;
            }else{
              //返回未登录状态
              return  util.getDefaultToken();
            }
        }
        return status.com_Token;
    }
}

const mutations = {
    [types.COM_USERINFO](state, status) {
        state.com_userinfo = status
    },
    [types.COM_LOGINSTATUS](state, status) {
        state.com_loginStatus = status
    },
    [types.COM_Token](state, status) {
        state.com_Token = status
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}