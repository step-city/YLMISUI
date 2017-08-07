import fetch from  './fetch';
import Qs from 'qs';

//Function
export const requestCreateAllFunction=params=>{
        return fetch({ 
            url: '/api/services/app/function/CreateAllFunction',
            method: 'post',
            data: params
        })
    };
export const requestGetFunctionTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/function/GetFunctionTreeList',
            method: 'post',
            data: params
        })
    };
export const requestGetFunctionPageList=params=>{
    return fetch({ 
        url: '/api/services/app/function/GetFunctionPageList',
        method: 'post',
        data: params
    })
};
export const requestCreateOrUpdateFunction=params=>{
    return fetch({ 
        url: '/api/services/app/function/CreateOrUpdateFunction',
        method: 'post',
        data: params
    })
};
export const requestDeleteFunction=params=>{
    return fetch({ 
        url: '/api/services/app/function/DeleteFunction',
        method: 'post',
        data: params
    })
};








