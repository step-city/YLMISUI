import fetch from  '../fetch';
import Qs from 'qs';


//SFProductCheck
 export const requestGetSFProductCheckPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductCheck/GetSFProductCheckPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateSFProductCheck=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductCheck/CreateOrUpdateSFProductCheck',
            method: 'post',
            data: params
        })
    };
export const requestDeleteSFProductCheck=params=>{
    return fetch({ 
        url: '/api/services/app/sFProductCheck/DeleteSFProductCheck',
        method: 'post',
        data: params
    })
   };
