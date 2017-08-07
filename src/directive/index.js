import Vue from 'vue'
import fetch from '../api/fetch'
import Qs from 'qs';
//功能权限
 Vue.directive('permissionSetting', {
                bind: (el, binding, vnode)=> {
                    //获取值
                    let obj={};
                    obj.permissionName=binding.value;
                    if(obj.permissionName!=="show"){
                        fetch({
                            url:'api/services/app/userMenu/GetPermissionShow?'+Qs.stringify(obj),
                            method: 'post'
                            }).then(data=>{
                            if(data.success){
                                if(!data.result){
                                    //删除本身
                                    el.remove();
                                }
                            }
                            else{
                                    el.remove();
                            }
                        })
                    }
          
            }
    });