import fetch from  '../fetch';
import Qs from 'qs';


//AllotInOrder
 export const requestGetAllotInOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/allotInOrder/GetAllotInOrderPageList',
            method: 'post',
            data: params
        })
    };
    
    
  export const requestAllotInOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/allotInOrder/GetAllotInOrderItemPageList',
            method: 'post',
            data: params
        })
    };
    
    
 export const requestCreateOrUpdateAllotInOrder=params=>{
        return fetch({ 
            url: '/api/services/app/allotInOrder/CreateOrUpdateAllotInOrder',
            method: 'post',
            data: params
        })
    };
    
    
export const requestDeleteAllotInOrder=params=>{
    return fetch({ 
        url: '/api/services/app/allotInOrder/DeleteAllotInOrder',
        method: 'post',
        data: params
    })
   };
   
export const requestDeleteAllotInOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/allotInOrder/DeleteAllotInOrderItem',
            method: 'post',
            data: params
    })
  };
  
  
 export const requestGetAllotInOrderForEdit=params=>{
    return fetch({ 
            url: '/api/services/app/allotInOrder/GetAllotInOrderForEdit?id='+params,
            method: 'post',
    })
  };
  
  
   export const requestAuditAllotInOrder=params=>{
        return fetch({ 
                url: '/api/services/app/allotInOrder/AuditAllotInOrder?id='+params,
                method: 'post'
        })
   };
   
   
  export const requestUnAuditAllotInOrder=params=>{
        return fetch({ 
                url: '/api/services/app/allotInOrder/UnAuditAllotInOrder?id='+params,
                method: 'post'
        })
   };
  
  
  
  
  
  