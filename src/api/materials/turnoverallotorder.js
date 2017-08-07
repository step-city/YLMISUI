import fetch from  '../fetch';
import Qs from 'qs';


//TurnoverAllotOrder
 export const requestGetTurnoverAllotOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAllotOrder/GetTurnoverAllotOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetTurnoverAllotOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAllotOrder/GetTurnoverAllotOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateTurnoverAllotOrder=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAllotOrder/CreateOrUpdateTurnoverAllotOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteTurnoverAllotOrder=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverAllotOrder/DeleteTurnoverAllotOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteTurnoverAllotOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverAllotOrder/DeleteTurnoverAllotOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetTurnoverAllotOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverAllotOrder/GetTurnoverAllotOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditTurnoverAllotOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverAllotOrder/AuditTurnoverAllotOrder?id='+params,
            method: 'post',
    })
  };
   
   
  export const requestUnAuditTurnoverAllotOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverAllotOrder/UnAuditTurnoverAllotOrder?id='+params,
            method: 'post',
    })
  };
  export const requestGetTurnoverInventoryForEdit=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverInventory/GetTurnoverInventoryForEdit?id='+params,
         method: 'post',
    })
  };
 
  
  
  
  
  