import fetch from  './fetch';
import Qs from 'qs';


//Supplier
 export const requestGetSupplierPageList=params=>{
        return fetch({ 
            url: '/api/services/app/supplier/GetSupplierPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateSupplier=params=>{
        return fetch({ 
            url: '/api/services/app/supplier/CreateOrUpdateSupplier',
            method: 'post',
            data: params
        })
    };
export const requestDeleteSupplier=params=>{
    return fetch({ 
        url: '/api/services/app/supplier/DeleteSupplier',
        method: 'post',
        data: params
    })
   };
export const requestUpdateSupplierBlackListAsync=params=>{
    return fetch({ 
        url: '/api/services/app/supplier/UpdateSupplierBlackListAsync',
        method: 'post',
        data: params
    })
   };