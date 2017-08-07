import fetch from  './fetch';
import Qs from 'qs';


//GH
  export const requestGetGHByParent=params=>{
        return fetch({ 
            url: '/api/services/app/gH/GetGHByParent?node='+params,
            method: 'post',
        })
    };  
     export const requestGetGHTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/gh/GetGHTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetGHPageList=params=>{
        return fetch({ 
            url: '/api/services/app/gh/GetGHPageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateGH=params=>{
    return fetch({ 
            url: '/api/services/app/gh/CreateOrUpdateGH',
            method: 'post',
            data: params
    })
   };
  export const requestDeleteGH=params=>{
    return fetch({ 
            url: '/api/services/app/gh/DeleteGH',
            method: 'post',
            data: params
    })
   };
   //导入工号模版
 export const requestImportGHTemplate=params=>{
    return fetch({ 
            url: 'api/services/app/sqlExecute/ImportGHTemplate?'+Qs.stringify(params),
            method: 'post',
    })
   };
 //判断是否有子节点
 export const requestIsHasChildrens=params=>{
    return fetch({ 
            url: 'api/services/app/gH/IsHasChildrens?'+Qs.stringify(params),
            method: 'post',
    })
   };