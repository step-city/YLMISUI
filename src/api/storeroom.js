import fetch from  './fetch';
import Qs from 'qs';


//StoreRoom
 export const requestGetStoreRoomPageList=params=>{
        return fetch({ 
            url: '/api/services/app/storeRoom/GetStoreRoomPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateStoreRoom=params=>{
        return fetch({ 
            url: '/api/services/app/storeRoom/CreateOrUpdateStoreRoom',
            method: 'post',
            data: params
        })
    };
export const requestDeleteStoreRoom=params=>{
    return fetch({ 
        url: '/api/services/app/storeRoom/DeleteStoreRoom',
        method: 'post',
        data: params
    })
   };
