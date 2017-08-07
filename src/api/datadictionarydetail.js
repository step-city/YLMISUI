import fetch from  './fetch';
import Qs from 'qs';

//DataDictionaryDetail
export const requestGetDataDictionaryDetailPageList=params=>{
        return fetch({ 
            url: '/api/services/app/dataDictionary/GetDataDictionaryDetailPageList',
            method: 'post',
            data: params
        })
    };
export const requestCreateOrUpdateDataDictionaryDetail=params=>{
        return fetch({ 
            url: '/api/services/app/dataDictionary/CreateOrUpdateDataDictionaryDetail',
            method: 'post',
            data: params
        })
    };
export const requestDeleteDataDictionaryDetail=params=>{
        return fetch({ 
            url: '/api/services/app/dataDictionary/DeleteDataDictionaryDetail',
            method: 'post',
            data: params
        })
    };









