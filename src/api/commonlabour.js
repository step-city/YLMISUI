import fetch from  './fetch';
import Qs from 'qs';

//CommonLabour
 export const requestGetCommonLabourPageList=params=>{
        return fetch({ 
            url: '/api/services/app/commonLabour/GetCommonLabourPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateCommonLabour=params=>{
        return fetch({ 
            url: '/api/services/app/commonLabour/CreateOrUpdateCommonLabour',
            method: 'post',
            data: params
        })
    };
export const requestDeleteCommonLabour=params=>{
    return fetch({ 
        url: '/api/services/app/commonLabour/DeleteCommonLabour',
        method: 'post',
        data: params
    })
   };
export const requestGetLabourPageList=params=>{
        return fetch({ 
            url: '/api/services/app/labour/GetLabourPageList',
            method: 'post',
            data: params
        })
    };
export const requestCreateCommonLabourListAsync=params=>{
        return fetch({ 
            url: '/api/services/app/commonLabour/CreateCommonLabourListAsync',
            method: 'post',
            data: params
        })
    };