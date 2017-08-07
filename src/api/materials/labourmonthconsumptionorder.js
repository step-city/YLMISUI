import fetch from  '../fetch';
import Qs from 'qs';


//LabourMonthConsumptionOrder
 export const requestGetLabourMonthConsumptionOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/labourMonthConsumptionOrder/GetLabourMonthConsumptionOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetLabourMonthConsumptionOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/labourMonthConsumptionOrder/GetLabourMonthConsumptionOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateLabourMonthConsumptionOrder=params=>{
        return fetch({ 
            url: '/api/services/app/labourMonthConsumptionOrder/CreateOrUpdateLabourMonthConsumptionOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteLabourMonthConsumptionOrder=params=>{
    return fetch({ 
        url: '/api/services/app/labourMonthConsumptionOrder/DeleteLabourMonthConsumptionOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteLabourMonthConsumptionOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/labourMonthConsumptionOrder/DeleteLabourMonthConsumptionOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetLabourMonthConsumptionOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/labourMonthConsumptionOrder/GetLabourMonthConsumptionOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditLabourMonthConsumptionOrder=params=>{
        return fetch({ 
                url: '/api/services/app/labourMonthConsumptionOrder/AuditLabourMonthConsumptionOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditLabourMonthConsumptionOrder=params=>{
        return fetch({ 
                url: '/api/services/app/labourMonthConsumptionOrder/UnAuditLabourMonthConsumptionOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  