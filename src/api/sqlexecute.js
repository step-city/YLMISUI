import fetch from  './fetch';
import Qs from 'qs';

//通用SQL执行API
//执行存储过程
export const requestExecuteSqlAndProcCommand=params=>{
    return fetch({ 
            url: 'api/services/app/sqlExecute/ExecuteSqlAndProcCommand',
            method: 'post',
            data: params
    })
   };