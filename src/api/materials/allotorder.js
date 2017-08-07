import fetch from  '../fetch';
import Qs from 'qs';


//AllotOrder
 export const requestGetAllotOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/allotOrder/GetAllotOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetAllotOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/allotOrder/GetAllotOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateAllotOrder=params=>{
        return fetch({ 
            url: '/api/services/app/allotOrder/CreateOrUpdateAllotOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteAllotOrder=params=>{
    return fetch({ 
        url: '/api/services/app/allotOrder/DeleteAllotOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteAllotOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/allotOrder/DeleteAllotOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetAllotOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/allotOrder/GetAllotOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditAllotOrder=params=>{
        return fetch({ 
                url: '/api/services/app/allotOrder/AuditAllotOrder',
                method: 'post',
                data: params
        })
   };
   
   
  export const requestUnAuditAllotOrder=params=>{
        return fetch({ 
                url: '/api/services/app/allotOrder/UnAuditAllotOrder',
                method: 'post',
                data: params
        })
   };
   export const requestGetCurrentStoreForEdit=params=>{
    return fetch({ 
        url: '/api/services/app/currentStore/GetCurrentStoreForEdit?id='+params,
        method: 'post',
    })
   };
  
  
  
  
  