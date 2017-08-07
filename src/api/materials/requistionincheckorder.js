import fetch from  '../fetch';
import Qs from 'qs';


//RequistionInCheckOrder
 export const requestGetRequistionInCheckOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInCheckOrder/GetRequistionInCheckOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetRequistionInCheckOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInCheckOrder/GetRequistionInCheckOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateRequistionInCheckOrder=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInCheckOrder/CreateOrUpdateRequistionInCheckOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteRequistionInCheckOrder=params=>{
    return fetch({ 
        url: '/api/services/app/requistionInCheckOrder/DeleteRequistionInCheckOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteRequistionInCheckOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/requistionInCheckOrder/DeleteRequistionInCheckOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetRequistionInCheckOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/requistionInCheckOrder/GetRequistionInCheckOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditRequistionInCheckOrder=params=>{
        return fetch({ 
                url: '/api/services/app/requistionInCheckOrder/AuditRequistionInCheckOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditRequistionInCheckOrder=params=>{
        return fetch({ 
                url: '/api/services/app/requistionInCheckOrder/UnAuditRequistionInCheckOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  