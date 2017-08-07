import fetch from  '../fetch';
import Qs from 'qs';


//WeightItem
 export const requestGetWeightItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/weightItem/GetWeightItemPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateWeightItem=params=>{
        return fetch({ 
            url: '/api/services/app/weightItem/CreateOrUpdateWeightItem',
            method: 'post',
            data: params
        })
    };
export const requestDeleteWeightItem=params=>{
    return fetch({ 
        url: '/api/services/app/weightItem/DeleteWeightItem',
        method: 'post',
        data: params
    })
   };
