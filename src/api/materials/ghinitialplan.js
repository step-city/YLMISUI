import fetch from  '../fetch';
import Qs from 'qs';


 export const requestGetGHInitialPlanOrderPageList=params=>{
        return fetch({ 
            url: '/api/services/app/gHInitialPlanOrder/GetGHInitialPlanOrderPageList',
            method: 'post',
            data: params
        })
    };


 export const requestGetGHInitialPlanOrderItemPageList=params=>{
        return fetch({ 
            url: '/api/services/app/gHInitialPlanOrder/GetGHInitialPlanOrderItemPageList',
            method: 'post',
            data: params
        })
    };

  export const requestCreateOrUpdateGHInitialPlanOrder=params=>{
    return fetch({ 
            url: '/api/services/app/gHInitialPlanOrder/CreateOrUpdateGHInitialPlanOrder',
            method: 'post',
            data: params
    })
   };
   
   export const requestDeleteGHInitialPlanOrder=params=>{
    return fetch({ 
            url: '/api/services/app/gHInitialPlanOrder/DeleteGHInitialPlanOrder',
            method: 'post',
            data: params
    })
  };
   export const requestDeleteGHInitialPlanOrderItem=params=>{
    return fetch({ 
            url: '/api/services/app/gHInitialPlanOrder/DeleteGHInitialPlanOrderItem',
            method: 'post',
            data: params
    })
  };
  export const requestGetGHInitialPlanOrderForEdit=params=>{
        return fetch({ 
                url: '/api/services/app/gHInitialPlanOrder/GetGHInitialPlanOrderForEdit?id='+params,
                method: 'post',
        })
   };
  export const requestAuditGHInitialPlanOrder=params=>{
        return fetch({ 
                url: '/api/services/app/gHInitialPlanOrder/AuditGHInitialPlanOrder',
                method: 'post',
                data:params
        })
   };
  export const requestUnAuditGHInitialPlanOrder=params=>{
        return fetch({ 
                url: '/api/services/app/gHInitialPlanOrder/UnAuditGHInitialPlanOrder',
                method: 'post',
                data:params
        })
   };
