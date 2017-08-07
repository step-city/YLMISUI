import fetch from  '../fetch';
import Qs from 'qs';


//SFProductMaterialsOrder
 export const requestGetSFProductMaterialsOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductMaterialsOrder/GetSFProductMaterialsOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestSFProductMaterialsOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductMaterialsOrder/GetSFProductMaterialsOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateSFProductMaterialsOrder=params=>{
        return fetch({ 
            url: '/api/services/app/sFProductMaterialsOrder/CreateOrUpdateSFProductMaterialsOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteSFProductMaterialsOrder=params=>{
    return fetch({ 
        url: '/api/services/app/sFProductMaterialsOrder/DeleteSFProductMaterialsOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteSFProductMaterialsOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/sFProductMaterialsOrder/DeleteSFProductMaterialsOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetSFProductMaterialsOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/sFProductMaterialsOrder/GetSFProductMaterialsOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditSFProductMaterialsOrder=params=>{
        return fetch({ 
                url: '/api/services/app/sFProductMaterialsOrder/AuditSFProductMaterialsOrder?id='+params,
                method: 'post',
        })
   };
   
   
  export const requestUnAuditSFProductMaterialsOrder=params=>{
        return fetch({ 
                url: '/api/services/app/sFProductMaterialsOrder/UnAuditSFProductMaterialsOrder?id='+params,
                method: 'post',
        })
   };
  
  
  
  
  
  