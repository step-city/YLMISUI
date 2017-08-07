import fetch from  './fetch';
import Qs from 'qs';

//TableColConfig
 export const requestGetTableColConfigTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/tableColConfig/GetTableColConfigTreeList',
            method: 'post',
            data: params
        })
    };
export const requestGetTableColConfigPageList=params=>{
        return fetch({ 
            url: '/api/services/app/tableColConfig/GetTableColConfigPageList',
            method: 'post',
            data: params
        })
    };
export const requestCreateOrUpdateTableColConfig=params=>{
        return fetch({ 
            url: '/api/services/app/tableColConfig/CreateOrUpdateTableColConfig',
            method: 'post',
            data: params
        })
    };
export const requestDeleteTableColConfig=params=>{
        return fetch({ 
            url: '/api/services/app/tableColConfig/DeleteTableColConfig',
            method: 'post',
            data: params
        })
    };
export const requestGetTableColumnInfo=params=>{
        return fetch({ 
            url: '/api/services/app/tableConstruct/GetTableColumnInfo?'+Qs.stringify(params),
            method: 'post'
        })
    };
export const requestGetTableColConfigForEdit=params=>{
        return fetch({ 
            url: '/api/services/app/tableColConfig/GetTableColConfigForEdit?tableIdOrName='+params,
            method: 'post',
        })
    };
