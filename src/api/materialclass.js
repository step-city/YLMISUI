import fetch from  './fetch';
import Qs from 'qs';


//MaterialClass
   export const requestGetMaterialClassTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/materialClass/GetMaterialClassTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetMaterialClassPageList=params=>{
        return fetch({ 
            url: '/api/services/app/materialClass/GetMaterialClassPageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateMaterialClass=params=>{
    return fetch({ 
            url: '/api/services/app/materialClass/CreateOrUpdateMaterialClass',
            method: 'post',
            data: params
    })
   };
  export const requestDeleteMaterialClass=params=>{
    return fetch({ 
            url: '/api/services/app/materialClass/DeleteMaterialClass',
            method: 'post',
            data: params
    })
   };

   export const requestGetMaterialClassByParent=params=>{
        return fetch({ 
            url: '/api/services/app/materialClass/GetMaterialClassByParent?node='+params,
            method: 'post',
        })
    };