import fetch from  './fetch';
import Qs from 'qs';


//TemplateGH
   export const requestGetTemplateGHTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/templateGH/GetTemplateGHTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetTemplateGHPageList=params=>{
        return fetch({ 
            url: '/api/services/app/templateGH/GetTemplateGHPageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateTemplateGH=params=>{
    return fetch({ 
            url: '/api/services/app/templateGH/CreateOrUpdateTemplateGH',
            method: 'post',
            data: params
    })
   };
  export const requestDeleteTemplateGH=params=>{
    return fetch({ 
            url: '/api/services/app/templateGH/DeleteTemplateGH',
            method: 'post',
            data: params
    })
   };
   export const requestGetTemplateGHByParent=params=>{
    return fetch({ 
            url: '/api/services/app/templateGH/GetTemplateGHByParent?'+Qs.stringify(params),
            method: 'post',
    })
   };