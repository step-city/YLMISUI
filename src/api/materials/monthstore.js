import axios from  './axiosconfig';
import Qs from 'qs';


//MonthStore
 export const requestGetMonthStorePageList=params=>{
        return fetch({ 
            url: '/api/services/app/monthStore/GetMonthStorePageList',
            method: 'post',
            data: params
        })
    };
 export const requestCreateOrUpdateMonthStore=params=>{
        return fetch({ 
            url: '/api/services/app/monthStore/CreateOrUpdateMonthStore',
            method: 'post',
            data: params
        })
    };
export const requestDeleteMonthStore=params=>{
    return fetch({ 
        url: '/api/services/app/monthStore/DeleteMonthStore',
        method: 'post',
        data: params
    })
   };
