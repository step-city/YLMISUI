import fetch from  '../fetch';
import Qs from 'qs';


//ReceiveOrder
 export const requestGetReceiveOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/receiveOrder/GetReceiveOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestReceiveOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/receiveOrder/GetReceiveOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateReceiveOrder=params=>{
        return fetch({ 
            url: '/api/services/app/receiveOrder/CreateOrUpdateReceiveOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteReceiveOrder=params=>{
    return fetch({ 
        url: '/api/services/app/receiveOrder/DeleteReceiveOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteReceiveOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/receiveOrder/DeleteReceiveOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetReceiveOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/receiveOrder/GetReceiveOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditReceiveOrder=params=>{
        return fetch({ 
                url: '/api/services/app/receiveOrder/AuditReceiveOrder',
                method: 'post',
                data:params
        })
   };
   
   
  export const requestUnAuditReceiveOrder=params=>{
        return fetch({ 
                url: '/api/services/app/receiveOrder/UnAuditReceiveOrder',
                method: 'post',
                data:params
        })
   };
  
  
  
  
  
  