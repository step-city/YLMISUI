import fetch from  './fetch';
import Qs from 'qs';


//Parameters
export const requestGetParametersPageList=params=>{
        return fetch({ 
            url: '/api/services/app/parameters/GetParametersPageList',
            method: 'post',
            data: params
        })
    };
    export const requestCreateOrUpdateParameters=params=>{
        return fetch({ 
            url: '/api/services/app/parameters/CreateOrUpdateParameters',
            method: 'post',
            data: params
        })
    };
    export const requestDeleteParameters=params=>{
        return fetch({ 
            url: '/api/services/app/parameters/DeleteParameters',
            method: 'post',
            data: params
        })
    };




