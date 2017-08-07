import fetch from  '../fetch';
import Qs from 'qs';


//TurnoverSellOrder
 export const requestGetTurnoverSellOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverSellOrder/GetTurnoverSellOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestTurnoverSellOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverSellOrder/GetTurnoverSellOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateTurnoverSellOrder=params=>{
        return fetch({ 
            url: '/api/services/app/turnoverSellOrder/CreateOrUpdateTurnoverSellOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteTurnoverSellOrder=params=>{
    return fetch({ 
        url: '/api/services/app/turnoverSellOrder/DeleteTurnoverSellOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteTurnoverSellOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverSellOrder/DeleteTurnoverSellOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetTurnoverSellOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/turnoverSellOrder/GetTurnoverSellOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditTurnoverSellOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverSellOrder/AuditTurnoverSellOrder?id='+params,
            method: 'post',
    })
  };
  
   
   
  export const requestUnAuditTurnoverSellOrder=params=>{
        return fetch({ 
                url: '/api/services/app/turnoverSellOrder/UnAuditTurnoverSellOrder?id='+params,
            method: 'post',
    })
  };
  
  
  
  
  
  