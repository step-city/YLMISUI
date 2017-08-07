import fetch from  './fetch';
import Qs from 'qs';


//TableConfig
 export const requestGetTableConfigPageList=params=>{
        return fetch({ 
            url: '/api/services/app/tableConfig/GetTableConfigPageList',
            method: 'post',
            data: params
        })
    };
     export const requestCreateOrUpdateTableConfig=params=>{
        return fetch({ 
            url: '/api/services/app/tableConfig/CreateOrUpdateTableConfig',
            method: 'post',
            data: params
        })
    };
 export const requestDeleteTableConfig=params=>{
        return fetch({ 
            url: '/api/services/app/tableConfig/DeleteTableConfig',
            method: 'post',
            data: params
        })
    }; 
 export const requestGetTableInfos=params=>{
        return fetch({ 
            url: '/api/services/app/tableConstruct/GetTableInfos',
            method: 'post',
            data: params
        })
    };
 export const requestGetTableConfigs=params=>{
        return fetch({ 
            url: '/api/services/app/tableConfig/GetTableConfigs',
            method: 'post',
            data: params
        })
    };
  export const requestGetTableConfigForEdit=params=>{
        return fetch({ 
            url: '/api/services/app/tableConfig/GetTableConfigForEdit?tableCodeOrName='+params,
            method: 'post',
        })
    };
 


