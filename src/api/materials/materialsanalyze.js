import fetch from  '../fetch';
import Qs from 'qs';


//物资系统的数据报表

//混凝土节超分析
export const requestGetConcreteAnalyzeList=params=>{
        return fetch({ 
            url: '/api/services/app/sqlExecute/ConcreteAnalyze',
            method: 'post',
            data: params
        })
    };
//原材料节超分析 
export const requestGetMaterialAnalyzeList=params=>{
        return fetch({ 
            url: '/api/services/app/sqlExecute/MaterialAnalyze',
            method: 'post',
            data: params
        })
    };