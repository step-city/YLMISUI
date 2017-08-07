import fetch from  './fetch';
import Qs from 'qs';


//CodeRule
 export const requestGetCodeRulePageList=params=>{
        return fetch({ 
            url: '/api/services/app/codeRule/GetCodeRulePageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateCodeRule=params=>{
        return fetch({ 
            url: '/api/services/app/codeRule/CreateOrUpdateCodeRule',
            method: 'post',
            data: params
        })
    };
export const requestDeleteCodeRule=params=>{
    return fetch({ 
        url: '/api/services/app/codeRule/DeleteCodeRule',
        method: 'post',
        data: params
    })
   };
export const requestDeleteCodeRuleItem=params=>{
    return fetch({ 
        url: '/api/services/app/codeRule/DeleteCodeRuleItem',
        method: 'post',
        data: params
    })
   };
export const requestCreateOrUpdateCodeRuleItem=params=>{
    return fetch({ 
        url: '/api/services/app/codeRule/CreateOrUpdateCodeRuleItem',
        method: 'post',
        data: params
    })
   };
export const requestGetCodeRuleItemPageList=params=>{
    return fetch({ 
        url: '/api/services/app/codeRule/GetCodeRuleItemPageList',
        method: 'post',
        data: params
    })
   };
