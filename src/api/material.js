import fetch from  './fetch';
import Qs from 'qs';


//Material
   export const requestGetMaterialTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/material/GetMaterialTreeList',
            method: 'post',
            data: params
        })
    };
  export const requestGetMaterialPageList=params=>{
        return fetch({ 
            url: '/api/services/app/material/GetMaterialPageList',
            method: 'post',
            data: params
        })
    };
  export const requestCreateOrUpdateMaterial=params=>{
    return fetch({ 
            url: '/api/services/app/material/CreateOrUpdateMaterial',
            method: 'post',
            data: params
    })
   };
  export const requestDeleteMaterial=params=>{
    return fetch({ 
            url: '/api/services/app/material/DeleteMaterial',
            method: 'post',
            data: params
    })
   };
  export const requestAuditMaterialAsync=params=>{
    return fetch({ 
            url: '/api/services/app/material/AuditMaterialAsync',
            method: 'post',
            data: params
    })
   };
export const requestUnAuditMaterialAsync=params=>{
    return fetch({ 
            url: '/api/services/app/material/UnAuditMaterialAsync',
            method: 'post',
            data: params
    })
};