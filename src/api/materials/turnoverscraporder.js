import fetch from  '../fetch';
import Qs from 'qs';


//TurnoverScrapOrder
 export const requestGetTurnoverScrapOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverScrapOrder/GetTurnoverScrapOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestTurnoverScrapOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverScrapOrder/GetTurnoverScrapOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateTurnoverScrapOrder=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverScrapOrder/CreateOrUpdateTurnoverScrapOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteTurnoverScrapOrder=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverScrapOrder/DeleteTurnoverScrapOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteTurnoverScrapOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverScrapOrder/DeleteTurnoverScrapOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetTurnoverScrapOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverScrapOrder/GetTurnoverScrapOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditTurnoverScrapOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverScrapOrder/AuditTurnoverScrapOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditTurnoverScrapOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverScrapOrder/UnAuditTurnoverScrapOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  