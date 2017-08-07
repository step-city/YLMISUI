import fetch from  './fetch';
import Qs from 'qs';


//CommonMaterial
   export const requestGetCommonMaterialTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/commonMaterial/GetCommonMaterialTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetCommonMaterialPageList=params=>{
        return fetch({ 
            url: '/api/services/app/commonMaterial/GetCommonMaterialPageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateCommonMaterial=params=>{
    return fetch({ 
            url: '/api/services/app/commonMaterial/CreateOrUpdateCommonMaterial',
            method: 'post',
            data: params
    })
   };
  export const requestDeleteCommonMaterial=params=>{
    return fetch({ 
            url: '/api/services/app/commonMaterial/DeleteCommonMaterial',
            method: 'post',
            data: params
    })
   };
  export const requestCreateCommonMaterialListAsync=params=>{
    return fetch({ 
            url: '/api/services/app/commonMaterial/CreateCommonMaterialListAsync',
            method: 'post',
            data: params
    })
   };