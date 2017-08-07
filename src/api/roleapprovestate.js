import fetch from  './fetch';
import Qs from 'qs';

//RoleApproveState
   export const requestGetRoleApproveStateTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/roleApproveState/GetRoleApproveStateTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetRoleApproveStatePageList=params=>{
        return fetch({ 
            url: '/api/services/app/roleApproveState/GetRoleApproveStatePageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateRoleApproveState=params=>{
    return fetch({ 
            url: '/api/services/app/roleApproveState/CreateOrUpdateRoleApproveState',
            method: 'post',
            data: params
    })
   };
  export const requestDeleteRoleApproveState=params=>{
    return fetch({ 
            url: '/api/services/app/roleApproveState/DeleteRoleApproveState',
            method: 'post',
            data: params
    })
   };