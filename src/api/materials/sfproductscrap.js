import fetch from  '../fetch';
import Qs from 'qs';


//SFProductScrap
 export const requestGetSFProductScrapPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductScrap/GetSFProductScrapPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateSFProductScrap=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductScrap/CreateOrUpdateSFProductScrap',
            method: 'post',
            data: params
        })
    };
export const requestDeleteSFProductScrap=params=>{
    return fetch({ 
        url: '/api/services/app/sFProductScrap/DeleteSFProductScrap',
        method: 'post',
        data: params
    })
   };
