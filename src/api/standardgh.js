import fetch from  './fetch';
import Qs from 'qs';


//StandardGH
   export const requestGetStandardGHTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/standardGH/GetStandardGHTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetStandardGHPageList=params=>{
        return fetch({ 
            url: '/api/services/app/standardGH/GetStandardGHPageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateStandardGH=params=>{
    return fetch({ 
            url: '/api/services/app/standardGH/CreateOrUpdateStandardGH',
            method: 'post',
            data: params
    })
   };
  export const requestDeleteStandardGH=params=>{
    return fetch({ 
            url: '/api/services/app/standardGH/DeleteStandardGH',
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