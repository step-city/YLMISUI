import fetch from  './fetch';
import Qs from 'qs';

//Organize
  export const requestGetOrganizePageList=params=>{
        return fetch({ 
            url: '/api/services/app/organize/GetOrganizePageList',
            method: 'post',
            data: params
        })
    };  
      export const requestCreateOrUpdateOrganize=params=>{
        return fetch({ 
            url: '/api/services/app/organize/CreateOrUpdateOrganize',
            method: 'post',
            data: params
        })
    };  
      export const requestDeleteOrganize=params=>{
        return fetch({ 
            url: '/api/services/app/organize/DeleteOrganize',
            method: 'post',
            data: params
        })
    };  
      export const requestGetOrganizeTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/commonLibrary/GetOrganizeTreeList',
            method: 'post',
            data: params
        })
    };  
      export const requestGetParametersTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/parameters/GetParametersTreeList',
            method: 'post',
            data: params
        })
    };  
      export const requestGetOrganizeZHB=params=>{
        return fetch({ 
            url: '/api/services/app/commonLibrary/GetOrganizeZHB',
            method: 'post',
            data: params
        })
    };  










     
