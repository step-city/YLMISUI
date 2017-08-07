import fetch from  '../fetch';
import Qs from 'qs';


//PurchasePlanOrder
 export const requestGetPurchasePlanOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/purchasePlanOrder/GetPurchasePlanOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestPurchasePlanOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/purchasePlanOrder/GetPurchasePlanOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdatePurchasePlanOrder=params=>{
        return fetch({ 
            url: '/api/services/app/purchasePlanOrder/CreateOrUpdatePurchasePlanOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeletePurchasePlanOrder=params=>{
    return fetch({ 
        url: '/api/services/app/purchasePlanOrder/DeletePurchasePlanOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeletePurchasePlanOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/purchasePlanOrder/DeletePurchasePlanOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetPurchasePlanOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/purchasePlanOrder/GetPurchasePlanOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditPurchasePlanOrder=params=>{
        return fetch({ 
                url: '/api/services/app/purchasePlanOrder/AuditPurchasePlanOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditPurchasePlanOrder=params=>{
        return fetch({ 
                url: '/api/services/app/purchasePlanOrder/UnAuditPurchasePlanOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  