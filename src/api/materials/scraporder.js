import fetch from  '../fetch';
import Qs from 'qs';


//ScrapOrder
 export const requestGetScrapOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/scrapOrder/GetScrapOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetScrapOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/scrapOrder/GetScrapOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateScrapOrder=params=>{
        return fetch({ 
            url: '/api/services/app/scrapOrder/CreateOrUpdateScrapOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteScrapOrder=params=>{
    return fetch({ 
        url: '/api/services/app/scrapOrder/DeleteScrapOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteScrapOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/scrapOrder/DeleteScrapOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetScrapOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/scrapOrder/GetScrapOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditScrapOrder=params=>{
        return fetch({ 
                url: '/api/services/app/scrapOrder/AuditScrapOrder?id='+params,
               method: 'post',
               
               
        })
   };
   
   
  export const requestUnAuditScrapOrder=params=>{
        return fetch({ 
                url: '/api/services/app/scrapOrder/UnAuditScrapOrder?id='+params,
               method: 'post',
             
             
        })
   };
     export const requestGetCurrentStoreForEdit=params=>{
    return fetch({ 
        url: '/api/services/app/currentStore/GetCurrentStoreForEdit?id='+params,
        method: 'post',
    })
   };
  
  
  
  
  
  
  