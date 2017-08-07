import fetch from  './fetch';
import Qs from 'qs';


//Project
   export const requestGetProjectTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/project/GetProjectTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetProjectPageList=params=>{
        return fetch({ 
            url: '/api/services/app/project/GetProjectPageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateProject=params=>{
    return fetch({ 
            url: '/api/services/app/project/CreateOrUpdateProject',
            method: 'post',
            data: params
    })
   };
   export const requestGetProjectForEdit=params=>{
    return fetch({ 
        url: '/api/services/app/project/GetProjectForEdit',
        method: 'post',
        data: params
    })
  };
    export const requestGetStandardGHByParent=params=>{
        return fetch({ 
            url: '/api/services/app/standardGH/GetStandardGHByParent?node='+params,
            method: 'post',
        })
    };
