import fetch from  './fetch';
import Qs from 'qs';

//menuApp
  export const requestGetMenuAppPageList=params=>{
        return fetch({ 
            url: '/api/services/app/menuItem/GetMenuPageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateMenuApp=params=>{
        return fetch({ 
            url: '/api/services/app/menuItem/CreateOrUpdateMenuApp',
            method: 'post',
            data: params
        })
    };
 export const requestDeleteMenuApp=params=>{
        return fetch({ 
            url: '/api/services/app/menuItem/DeleteMenuApp',
            method: 'post',
            data: params
        })
    };






