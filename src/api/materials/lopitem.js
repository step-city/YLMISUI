import fetch from  '../fetch';
import Qs from 'qs';


//LopItem
 export const requestGetLopItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/lopItem/GetLopItemPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateLopItem=params=>{
        return fetch({ 
            url: '/api/services/app/lopItem/CreateOrUpdateLopItem',
            method: 'post',
            data: params
        })
    };
export const requestDeleteLopItem=params=>{
    return fetch({ 
        url: '/api/services/app/lopItem/DeleteLopItem',
        method: 'post',
        data: params
    })
   };
