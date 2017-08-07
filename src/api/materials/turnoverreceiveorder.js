import fetch from  '../fetch';
import Qs from 'qs';


//TurnoverReceiveOrder
 export const requestGetTurnoverReceiveOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverReceiveOrder/GetTurnoverReceiveOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const  requestGetTurnoverReceiveOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverReceiveOrder/GetTurnoverReceiveOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateTurnoverReceiveOrder=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverReceiveOrder/CreateOrUpdateTurnoverReceiveOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteTurnoverReceiveOrder=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverReceiveOrder/DeleteTurnoverReceiveOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteTurnoverReceiveOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverReceiveOrder/DeleteTurnoverReceiveOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetTurnoverReceiveOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverReceiveOrder/GetTurnoverReceiveOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditTurnoverReceiveOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverReceiveOrder/AuditTurnoverReceiveOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditTurnoverReceiveOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverReceiveOrder/UnAuditTurnoverReceiveOrder?id='+params,
                method: 'post',
              
        })
   };
  
  
  
  
  
  