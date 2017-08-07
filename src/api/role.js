import fetch from  './fetch';
import Qs from 'qs';


//Role
 export const requestGetRolePageList=params=>{
        return fetch({ 
            url: '/api/services/app/role/GetRolePageList',
            method: 'post',
            data: params
        })
    };
     export const requestCreateOrUpdateRole=params=>{
        return fetch({ 
            url: '/api/services/app/role/CreateOrUpdateRole',
            method: 'post',
            data: params
        })
    };
     export const requestDeleteRole=params=>{
        return fetch({ 
            url: '/api/services/app/role/DeleteRole',
            method: 'post',
            data: params
        })
    };
     export const requestGetRoleForEdit=params=>{
        return fetch({ 
            url: '/api/services/app/role/GetRoleForEdit',
            method: 'post',
            data: params
        })
    };
     export const requestGetRoleTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/role/GetRoleTreeList',
            method: 'post',
            data: params
        })
    };









