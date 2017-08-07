import fetch from  '../fetch';
import Qs from 'qs';


//TurnoverAmortizeRuleOrder
 export const requestGetTurnoverAmortizeRuleOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAmortizeRuleOrder/GetTurnoverAmortizeRuleOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestTurnoverAmortizeRuleOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAmortizeRuleOrder/GetTurnoverAmortizeRuleOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateTurnoverAmortizeRuleOrder=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverAmortizeRuleOrder/CreateOrUpdateTurnoverAmortizeRuleOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteTurnoverAmortizeRuleOrder=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverAmortizeRuleOrder/DeleteTurnoverAmortizeRuleOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteTurnoverAmortizeRuleOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverAmortizeRuleOrder/DeleteTurnoverAmortizeRuleOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetTurnoverAmortizeRuleOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverAmortizeRuleOrder/GetTurnoverAmortizeRuleOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditTurnoverAmortizeRuleOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverAmortizeRuleOrder/AuditTurnoverAmortizeRuleOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditTurnoverAmortizeRuleOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverAmortizeRuleOrder/UnAuditTurnoverAmortizeRuleOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  