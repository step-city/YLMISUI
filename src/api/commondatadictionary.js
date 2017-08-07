import fetch from  './fetch';
import Qs from 'qs';


//CommonDataDictionary
   export const requestGetCommonDataDictionaryTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/commonLibrary/GetDataCommonDictionaryTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetCommonDataDictionaryPageList=params=>{
        return fetch({ 
            url: '/api/services/app/commonDataDictionary/GetCommonDataDictionaryPageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateCommonDataDictionary=params=>{
    return fetch({ 
            url: '/api/services/app/commonDataDictionary/CreateOrUpdateCommonDataDictionary',
            method: 'post',
            data: params
    })
   };
  export const requestDeleteCommonDataDictionary=params=>{
    return fetch({ 
            url: '/api/services/app/commonDataDictionary/DeleteCommonDataDictionary',
            method: 'post',
            data: params
    })
   };
