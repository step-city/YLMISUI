import fetch from  './fetch';
import Qs from 'qs';

//Labour
 export const requestGetLabourPageList=params=>{
        return fetch({ 
            url: '/api/services/app/labour/GetLabourPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateLabour=params=>{
        return fetch({ 
            url: '/api/services/app/labour/CreateOrUpdateLabour',
            method: 'post',
            data: params
        })
    };
export const requestDeleteLabour=params=>{
    return fetch({ 
        url: '/api/services/app/labour/DeleteLabour',
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