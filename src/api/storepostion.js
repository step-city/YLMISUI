import fetch from  './fetch';
import Qs from 'qs';


//StorePostion
 export const requestGetStorePostionPageList=params=>{
        return fetch({ 
            url: '/api/services/app/storePostion/GetStorePostionPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateStorePostion=params=>{
        return fetch({ 
            url: '/api/services/app/storePostion/CreateOrUpdateStorePostion',
            method: 'post',
            data: params
        })
    };
export const requestDeleteStorePostion=params=>{
    return fetch({ 
        url: '/api/services/app/storePostion/DeleteStorePostion',
        method: 'post',
        data: params
    })
   };
