import fetch from  '../fetch';
import Qs from 'qs';


//CurrentStore
 export const requestGetCurrentStorePageList=params=>{
        return fetch({ 
            url: '/api/services/app/currentStore/GetCurrentStorePageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateCurrentStore=params=>{
        return fetch({ 
            url: '/api/services/app/currentStore/CreateOrUpdateCurrentStore',
            method: 'post',
            data: params
        })
    };
export const requestDeleteCurrentStore=params=>{
    return fetch({ 
        url: '/api/services/app/currentStore/DeleteCurrentStore',
        method: 'post',
        data: params
    })
   };
