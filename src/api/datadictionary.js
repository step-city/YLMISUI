import fetch from  './fetch';
import Qs from 'qs';


//DataDictionary
    export const requestGetDataDictionaryPageList=params=>{
        return fetch({ 
            url: '/api/services/app/dataDictionary/GetDataDictionaryPageList',
            method: 'post',
            data: params
        })
    };
    export const requestCreateOrUpdateDataDictionary=params=>{
        return fetch({ 
            url: '/api/services/app/dataDictionary/CreateOrUpdateDataDictionary',
            method: 'post',
            data: params
        })
    };
    export const requestDeleteDataDictionary=params=>{
        return fetch({ 
            url: '/api/services/app/dataDictionary/DeleteDataDictionary',
            method: 'post',
            data: params
        })
    };
 export const requestGetDataDictionaryTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/commonLibrary/GetDataDictionaryTreeList',
            method: 'post',
            data: params
        })
    };









    
    