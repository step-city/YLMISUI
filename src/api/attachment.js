import fetch from  './fetch';
import Qs from 'qs';


//AttachMent
 export const requestGetAttachMentPageList=params=>{
        return fetch({ 
            url: '/api/services/app/attachMent/GetAttachMentPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateAttachMent=params=>{
        return fetch({ 
            url: '/api/services/app/attachMent/CreateOrUpdateAttachMent',
            method: 'post',
            data: params
        })
    };
export const requestDeleteAttachMent=params=>{
    return fetch({ 
        url: '/api/services/app/attachMent/DeleteAttachMent',
        method: 'post',
        data: params
    })
   };
