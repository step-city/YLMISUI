import fetch from  '../fetch';
import Qs from 'qs';


//TurnoverAmortizeOrder
 export const requestGetTurnoverAmortizeOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAmortizeOrder/GetTurnoverAmortizeOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestTurnoverAmortizeOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAmortizeOrder/GetTurnoverAmortizeOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateTurnoverAmortizeOrder=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAmortizeOrder/CreateOrUpdateTurnoverAmortizeOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteTurnoverAmortizeOrder=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverAmortizeOrder/DeleteTurnoverAmortizeOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteTurnoverAmortizeOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverAmortizeOrder/DeleteTurnoverAmortizeOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetTurnoverAmortizeOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverAmortizeOrder/GetTurnoverAmortizeOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditTurnoverAmortizeOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverAmortizeOrder/AuditTurnoverAmortizeOrder?id='+params,
            method: 'post',
    })
  };
  
   
   
  export const requestUnAuditTurnoverAmortizeOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverAmortizeOrder/UnAuditTurnoverAmortizeOrder?id='+params,
            method: 'post',
    })
  };
  
  
  
  
  
  
  