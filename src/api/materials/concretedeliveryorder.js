import fetch from  '../fetch';
import Qs from 'qs';


//ConcreteDeliveryOrder
 export const requestGetConcreteDeliveryOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/concreteDeliveryOrder/GetConcreteDeliveryOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetConcreteDeliveryOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/concreteDeliveryOrder/GetConcreteDeliveryOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateConcreteDeliveryOrder=params=>{
        return fetch({ 
            url: '/api/services/app/concreteDeliveryOrder/CreateOrUpdateConcreteDeliveryOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteConcreteDeliveryOrder=params=>{
    return fetch({ 
        url: '/api/services/app/concreteDeliveryOrder/DeleteConcreteDeliveryOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteConcreteDeliveryOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/concreteDeliveryOrder/DeleteConcreteDeliveryOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetConcreteDeliveryOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/concreteDeliveryOrder/GetConcreteDeliveryOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditConcreteDeliveryOrder=params=>{
        return fetch({ 
                url: '/api/services/app/concreteDeliveryOrder/AuditConcreteDeliveryOrder?id='+params,
                method: 'post',
               
        })
   };
   
   
  export const requestUnAuditConcreteDeliveryOrder=params=>{
        return fetch({ 
                url: '/api/services/app/concreteDeliveryOrder/UnAuditConcreteDeliveryOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  