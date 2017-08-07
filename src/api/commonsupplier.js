import fetch from  './fetch';
import Qs from 'qs';


//CommonSupplier
 export const requestGetCommonSupplierPageList=params=>{
        return fetch({ 
            url: '/api/services/app/commonSupplier/GetCommonSupplierPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateCommonSupplier=params=>{
        return fetch({ 
            url: '/api/services/app/commonSupplier/CreateOrUpdateCommonSupplier',
            method: 'post',
            data: params
        })
    };
export const requestDeleteCommonSupplier=params=>{
    return fetch({ 
        url: '/api/services/app/commonSupplier/DeleteCommonSupplier',
        method: 'post',
        data: params
    })
   };
export const requestCreateCommonSupplierList=params=>{
    return fetch({ 
        url: '/api/services/app/commonSupplier/CreateCommonSupplierList',
        method: 'post',
        data: params
    })
   };
export const requestGetSupplierPageList=params=>{
    return fetch({ 
        url: '/api/services/app/supplier/GetSupplierPageList',
        method: 'post',
        data: params
    })
};