import fetch from  '../fetch';
import Qs from 'qs';


//OriginalMaterialCheck
 export const requestGetOriginalMaterialCheckPageList=params=>{
        return fetch({ 
            url: '/api/services/app/originalMaterialCheck/GetOriginalMaterialCheckPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateOriginalMaterialCheck=params=>{
        return fetch({ 
            url: '/api/services/app/originalMaterialCheck/CreateOrUpdateOriginalMaterialCheck',
            method: 'post',
            data: params
        })
    };
export const requestDeleteOriginalMaterialCheck=params=>{
    return fetch({ 
        url: '/api/services/app/originalMaterialCheck/DeleteOriginalMaterialCheck',
        method: 'post',
        data: params
    })
   };
