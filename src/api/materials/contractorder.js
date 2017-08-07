import fetch from  '../fetch';
import Qs from 'qs';


//ContractOrder
 export const requestGetContractOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/contractOrder/GetContractOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestContractOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/contractOrder/GetContractOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateContractOrder=params=>{
        return fetch({ 
            url: '/api/services/app/contractOrder/CreateOrUpdateContractOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteContractOrder=params=>{
    return fetch({ 
        url: '/api/services/app/contractOrder/DeleteContractOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteContractOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/contractOrder/DeleteContractOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetContractOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/contractOrder/GetContractOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditContractOrder=params=>{
        return fetch({ 
                url: '/api/services/app/contractOrder/AuditContractOrder',
                method: 'post',
                data: params
        })
   };
   
   
  export const requestUnAuditContractOrder=params=>{
        return fetch({ 
                url: '/api/services/app/contractOrder/UnAuditContractOrder',
                method: 'post',
                data: params
        })
   };
  
  
  
  
  
  