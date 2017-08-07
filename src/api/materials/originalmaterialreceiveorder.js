import fetch from  '../fetch';
import Qs from 'qs';


//OriginalMaterialReceiveOrder
 export const requestGetOriginalMaterialReceiveOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/originalMaterialReceiveOrder/GetOriginalMaterialReceiveOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestGetOriginalMaterialReceiveOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/originalMaterialReceiveOrder/GetOriginalMaterialReceiveOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateOriginalMaterialReceiveOrder=params=>{
        return fetch({ 
            url: '/api/services/app/originalMaterialReceiveOrder/CreateOrUpdateOriginalMaterialReceiveOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteOriginalMaterialReceiveOrder=params=>{
    return fetch({ 
        url: '/api/services/app/originalMaterialReceiveOrder/DeleteOriginalMaterialReceiveOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteOriginalMaterialReceiveOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/originalMaterialReceiveOrder/DeleteOriginalMaterialReceiveOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetOriginalMaterialReceiveOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/originalMaterialReceiveOrder/GetOriginalMaterialReceiveOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditOriginalMaterialReceiveOrder=params=>{
        return fetch({ 
                url: '/api/services/app/originalMaterialReceiveOrder/AuditOriginalMaterialReceiveOrder?id='+params,
            method: 'post',
    })
  };
   
   
  export const requestUnAuditOriginalMaterialReceiveOrder=params=>{
        return fetch({ 
                url: '/api/services/app/originalMaterialReceiveOrder/UnAuditOriginalMaterialReceiveOrder?id='+params,
            method: 'post',
    })
  };
  
  
  
  
  