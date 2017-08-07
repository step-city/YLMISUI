import fetch from  './fetch';
import Qs from 'qs';

//Function
export const requestGetSingleTablePageList=(params,tableName)=>{
        return fetch({ 
            url: 'api/services/app/'+tableName+'/Get'+tableName+'PageList',
            method: 'post',
            data: params
        })
    };
export const requestCreateOrUpdateSingleTable=(params,tableName)=>{
        return fetch({ 
            url: 'api/services/app/'+tableName+'/CreateOrUpdate'+tableName,
            method: 'post',
            data: params
        })
    };
export const requestDeleteSingleTable=(params,tableName)=>{
    return fetch({ 
        url: 'api/services/app/'+tableName+'/Delete'+tableName,
        method: 'post',
        data: params
    })
};