import fetch from  '../fetch';
import Qs from 'qs';


//SFProductDeliveryOrder
 export const requestGetSFProductDeliveryOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductDeliveryOrder/GetSFProductDeliveryOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetSFProductDeliveryOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductDeliveryOrder/GetSFProductDeliveryOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateSFProductDeliveryOrder=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductDeliveryOrder/CreateOrUpdateSFProductDeliveryOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteSFProductDeliveryOrder=params=>{
    return fetch({ 
        url: '/api/services/app/sFProductDeliveryOrder/DeleteSFProductDeliveryOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteSFProductDeliveryOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/sFProductDeliveryOrder/DeleteSFProductDeliveryOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetSFProductDeliveryOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/sFProductDeliveryOrder/GetSFProductDeliveryOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditSFProductDeliveryOrder=params=>{
        return fetch({ 
                url: '/api/services/app/sFProductDeliveryOrder/AuditSFProductDeliveryOrder?id='+params,
            method: 'post',
    })
  };
   
   
  export const requestUnAuditSFProductDeliveryOrder=params=>{
        return fetch({ 
                url: '/api/services/app/sFProductDeliveryOrder/UnAuditSFProductDeliveryOrder?id='+params,
            method: 'post',
    })
  };
  
  
  
  
  
  