import fetch from  '../fetch';
import Qs from 'qs';


//DeliveryOrder
 export const requestGetDeliveryOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/deliveryOrder/GetDeliveryOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetDeliveryOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/deliveryOrder/GetDeliveryOrderItemPageList',
            method: 'post',
            data: params
        })
    };    
 export const requestCreateOrUpdateDeliveryOrder=params=>{
        return fetch({ 
            url: '/api/services/app/deliveryOrder/CreateOrUpdateDeliveryOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteDeliveryOrder=params=>{
    return fetch({ 
        url: '/api/services/app/deliveryOrder/DeleteDeliveryOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteDeliveryOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/deliveryOrder/DeleteDeliveryOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetDeliveryOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/deliveryOrder/GetDeliveryOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditDeliveryOrder=params=>{
        return fetch({ 
                url: '/api/services/app/deliveryOrder/AuditDeliveryOrder',
                method: 'post',
                data: params
        })
   };
  export const requestUnAuditDeliveryOrder=params=>{
        return fetch({ 
                url: '/api/services/app/deliveryOrder/UnAuditDeliveryOrder',
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
  export const requestGetCurrentStoreForEdit=params=>{
    return fetch({ 
        url: '/api/services/app/currentStore/GetCurrentStoreForEdit?id='+params,
        method: 'post',
    })
   };
  
  
  
  