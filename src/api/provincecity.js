import fetch from  './fetch';
import Qs from 'qs';

//ProvinceCity
  export const requestGetProvinceCityPageList=params=>{
        return fetch({ 
            url: '/api/services/app/provinceCity/GetProvinceCityPageList',
            method: 'post',
            data: params
        })
    };
      export const requestCreateOrUpdateProvinceCity=params=>{
        return fetch({ 
            url: '/api/services/app/provinceCity/CreateOrUpdateProvinceCity',
            method: 'post',
            data: params
        })
    };
      export const requestDeleteProvinceCity=params=>{
        return fetch({ 
            url: '/api/services/app/provinceCity/DeleteProvinceCity',
            method: 'post',
            data: params
        })
    };
      export const requestGetProvinceCityTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/commonLibrary/GetProvinceCityTreeList',
            method: 'post',
            data: params
        })
    };
      export const requestGetDataDictionaryTreeList=params=>{
        return fetch({ 
            url: '/api/services/app/commonLibrary/GetDataDictionaryTreeList',
            method: 'post',
            data: params
        })
    };











