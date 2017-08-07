import fetch from  '../fetch';
import Qs from 'qs';



//SFProductInventory
 export const requestGetSFProductInventoryPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductInventory/GetSFProductInventoryPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateSFProductInventory=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductInventory/CreateOrUpdateSFProductInventory',
            method: 'post',
            data: params
        })
    };
export const requestDeleteSFProductInventory=params=>{
    return fetch({ 
        url: '/api/services/app/sFProductInventory/DeleteSFProductInventory',
        method: 'post',
        data: params
    })
   };
