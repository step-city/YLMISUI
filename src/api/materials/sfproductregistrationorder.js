import fetch from  '../fetch';
import Qs from 'qs';


//SFProductRegistrationOrder
 export const requestGetSFProductRegistrationOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductRegistrationOrder/GetSFProductRegistrationOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestSFProductRegistrationOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductRegistrationOrder/GetSFProductRegistrationOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateSFProductRegistrationOrder=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductRegistrationOrder/CreateOrUpdateSFProductRegistrationOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteSFProductRegistrationOrder=params=>{
    return fetch({ 
        url: '/api/services/app/sFProductRegistrationOrder/DeleteSFProductRegistrationOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteSFProductRegistrationOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/sFProductRegistrationOrder/DeleteSFProductRegistrationOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetSFProductRegistrationOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/sFProductRegistrationOrder/GetSFProductRegistrationOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditSFProductRegistrationOrder=params=>{
        return fetch({ 
                url: '/api/services/app/sFProductRegistrationOrder/AuditSFProductRegistrationOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditSFProductRegistrationOrder=params=>{
        return fetch({ 
                url: '/api/services/app/sFProductRegistrationOrder/UnAuditSFProductRegistrationOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  