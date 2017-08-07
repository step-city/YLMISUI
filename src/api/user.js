import fetch from  './fetch';
import Qs from 'qs';


//User
export const requestGetUserPageList=params=>{
        return fetch({ 
            url: '/api/services/app/user/GetUserPageList',
            method: 'post',
            data: params
        })
    };
    export const requestCreateOrUpdateUser=params=>{
        return fetch({ 
            url: '/api/services/app/user/CreateOrUpdateUser',
            method: 'post',
            data: params
        })
    };
    export const requestDeleteUser=params=>{
        return fetch({ 
            url: '/api/services/app/user/DeleteUser',
            method: 'post',
            data: params
        })
    };
    export const requestGetOrganizeTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/commonLibrary/GetOrganizeTreeList',
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
    export const requestGetUserForEdit=params=>{
        return fetch({ 
            url: '/api/services/app/user/GetUserForEdit',
            method: 'post',
            data: params
        })
    };







