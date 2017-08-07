import fetch from  '../fetch';
import Qs from 'qs';


//TurnoverInventory
 export const requestGetTurnoverInventoryPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverInventory/GetTurnoverInventoryPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateTurnoverInventory=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverInventory/CreateOrUpdateTurnoverInventory',
            method: 'post',
            data: params
        })
    };
export const requestDeleteTurnoverInventory=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverInventory/DeleteTurnoverInventory',
        method: 'post',
        data: params
    })
   };
export const requestGetTurnoverInventoryForEdit=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverInventory/GetTurnoverInventoryForEdit?id='+params,
            method: 'post',
    })
  };
