import fetch from  './fetch';
import Qs from 'qs';


//TableInfoConfig
 export const requestGetTableInfoConfigPageList=params=>{
        return fetch({ 
            url: '/api/services/app/tableInfoConfig/GetTableInfoConfigPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateTableInfoConfig=params=>{
        return fetch({ 
            url: '/api/services/app/tableInfoConfig/CreateOrUpdateTableInfoConfig',
            method: 'post',
            data: params
        })
    };
export const requestDeleteTableInfoConfig=params=>{
    return fetch({ 
        url: '/api/services/app/tableInfoConfig/DeleteTableInfoConfig',
        method: 'post',
        data: params
    })
   };
