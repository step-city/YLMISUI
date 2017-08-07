import fetch from  '../fetch';
import Qs from 'qs';


//GHMonthConsumptionOrder
 export const requestGetGHMonthConsumptionOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/gHMonthConsumptionOrder/GetGHMonthConsumptionOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetGHMonthConsumptionOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/gHMonthConsumptionOrder/GetGHMonthConsumptionOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateGHMonthConsumptionOrder=params=>{
        return fetch({ 
            url: '/api/services/app/gHMonthConsumptionOrder/CreateOrUpdateGHMonthConsumptionOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteGHMonthConsumptionOrder=params=>{
    return fetch({ 
        url: '/api/services/app/gHMonthConsumptionOrder/DeleteGHMonthConsumptionOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteGHMonthConsumptionOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/gHMonthConsumptionOrder/DeleteGHMonthConsumptionOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetGHMonthConsumptionOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/gHMonthConsumptionOrder/GetGHMonthConsumptionOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditGHMonthConsumptionOrder=params=>{
        return fetch({ 
                url: '/api/services/app/gHMonthConsumptionOrder/AuditGHMonthConsumptionOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditGHMonthConsumptionOrder=params=>{
        return fetch({ 
                url: '/api/services/app/gHMonthConsumptionOrder/UnAuditGHMonthConsumptionOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  