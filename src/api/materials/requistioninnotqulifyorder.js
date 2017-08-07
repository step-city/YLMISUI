import fetch from  '../fetch';
import Qs from 'qs';


//RequistionInNotQulifyOrder
 export const requestGetRequistionInNotQulifyOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInNotQulifyOrder/GetRequistionInNotQulifyOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetRequistionInNotQulifyOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInNotQulifyOrder/GetRequistionInNotQulifyOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateRequistionInNotQulifyOrder=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInNotQulifyOrder/CreateOrUpdateRequistionInNotQulifyOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteRequistionInNotQulifyOrder=params=>{
    return fetch({ 
        url: '/api/services/app/requistionInNotQulifyOrder/DeleteRequistionInNotQulifyOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteRequistionInNotQulifyOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/requistionInNotQulifyOrder/DeleteRequistionInNotQulifyOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetRequistionInNotQulifyOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/requistionInNotQulifyOrder/GetRequistionInNotQulifyOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditRequistionInNotQulifyOrder=params=>{
        return fetch({ 
                url: '/api/services/app/requistionInNotQulifyOrder/AuditRequistionInNotQulifyOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditRequistionInNotQulifyOrder=params=>{
        return fetch({ 
                url: '/api/services/app/requistionInNotQulifyOrder/UnAuditRequistionInNotQulifyOrder?id='+params,
                method: 'post',
              
        })
   };
  
  
  
  
  
  