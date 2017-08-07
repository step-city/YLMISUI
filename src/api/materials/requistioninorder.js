import fetch from  '../fetch';
import Qs from 'qs';


//RequistionInOrder
 export const requestGetRequistionInOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInOrder/GetRequistionInOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetRequistionInOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInOrder/GetRequistionInOrderItemPageList',
            method: 'post',
            data: params
        })
    };  
 export const requestCreateOrUpdateRequistionInOrder=params=>{
        return fetch({ 
            url: '/api/services/app/requistionInOrder/CreateOrUpdateRequistionInOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteRequistionInOrder=params=>{
    return fetch({ 
        url: '/api/services/app/requistionInOrder/DeleteRequistionInOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteRequistionInOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/requistionInOrder/DeleteRequistionInOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetRequistionInOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/requistionInOrder/GetRequistionInOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditRequistionInOrder=params=>{
        return fetch({ 
                url: '/api/services/app/requistionInOrder/AuditRequistionInOrder',
                method: 'post',
                data: params,
        })
   };
   
   
  export const requestUnAuditRequistionInOrder=params=>{
        return fetch({ 
                url: '/api/services/app/requistionInOrder/UnAuditRequistionInOrder',
                method: 'post',
                data: params,
        })
   };
  
  
  
  
  
  