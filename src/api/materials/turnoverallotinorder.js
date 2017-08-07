import fetch from  '../fetch';
import Qs from 'qs';


//TurnoverAllotInOrder
 export const requestGetTurnoverAllotInOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAllotInOrder/GetTurnoverAllotInOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetTurnoverAllotInOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAllotInOrder/GetTurnoverAllotInOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateTurnoverAllotInOrder=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAllotInOrder/CreateOrUpdateTurnoverAllotInOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteTurnoverAllotInOrder=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverAllotInOrder/DeleteTurnoverAllotInOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteTurnoverAllotInOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverAllotInOrder/DeleteTurnoverAllotInOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetTurnoverAllotInOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverAllotInOrder/GetTurnoverAllotInOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditTurnoverAllotInOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverAllotInOrder/AuditTurnoverAllotInOrder?id='+params,
            method: 'post',
    })
  };
   
   
  export const requestUnAuditTurnoverAllotInOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverAllotInOrder/UnAuditTurnoverAllotInOrder?id='+params,
            method: 'post',
    })
  };
  
  
  
  
  
  