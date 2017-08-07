import fetch from  './fetch';
import Qs from 'qs';

   //menuItem  
        export const requestGetMenuItemTreeList=params=>{
            return fetch({ 
                url: '/api/services/app/menuItem/GetMenuItemTreeList',
                method: 'post',
                data: params
            })
        };
       export const requestGetMenuItemTreeListByNode=params=>{
            return fetch({ 
                url: '/api/services/app/menuItem/GetMenuItemTreeListByNode?'+Qs.stringify(params),
                method: 'post'
            })
        };
        export const requestGetMenuItemPageList=params=>{
                return fetch({ 
                    url: '/api/services/app/menuItem/GetMenuItemPageList',
                    method: 'post',
                    data: params
                })
            };
         export const requestDeleteMenuItem=params=>{
            return fetch({ 
                url: '/api/services/app/menuItem/DeleteMenuItem',
                method: 'post',
                data: params
            })
        };
        export const requestCreateOrUpdateMenuItem=params=>{
                return fetch({ 
                    url: '/api/services/app/menuItem/CreateOrUpdateMenuItem',
                    method: 'post',
                    data: params
                })
            };









