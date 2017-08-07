import fetch from  '../fetch';
import Qs from 'qs';


//StoreCheckOrder
 export const requestGetStoreCheckOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/storeCheckOrder/GetStoreCheckOrderPageList',
            method: 'post',
            data: params
        })
    };
  export const requestGetStoreCheckOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/storeCheckOrder/GetStoreCheckOrderItemPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateStoreCheckOrder=params=>{
        return fetch({ 
            url: '/api/services/app/storeCheckOrder/CreateOrUpdateStoreCheckOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteStoreCheckOrder=params=>{
    return fetch({ 
        url: '/api/services/app/storeCheckOrder/DeleteStoreCheckOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteStoreCheckOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/storeCheckOrder/DeleteStoreCheckOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetStoreCheckOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/storeCheckOrder/GetStoreCheckOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditStoreCheckOrder=params=>{
        return fetch({ 
                url: '/api/services/app/storeCheckOrder/AuditStoreCheckOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditStoreCheckOrder=params=>{
        return fetch({ 
                url: '/api/services/app/storeCheckOrder/UnAuditStoreCheckOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  