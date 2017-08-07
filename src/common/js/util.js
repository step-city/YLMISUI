
import store from '../../vuex/store'
import config from 'static/js/config';
export default {
     //数字转化为大写
     turnDX:function(n) {
            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
                return "数据非法";
            var unit = "千百拾亿千百拾万千百拾元角分", str = "";
                n += "00";
            var p = n.indexOf('.');
            if (p >= 0)
                n = n.substring(0, p) + n.substr(p+1, 2);
                unit = unit.substr(unit.length - n.length);
            for (var i=0; i < n.length; i++)
                str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
            return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
    },
    getDefaultToken:function (){
        return "Basic " +this.base64encode(config.client_id+":"+config.client_secret);
    },
    resetLogin:function(){
                  this.removeCookie('Authorization');
                  this.removeCookie('appCode');
                  this.removeCookie('userInfo');
				  this.setCookie('loginStatus','off',1);
				  store.commit('COM_Token', this.getDefaultToken());
                  store.commit('COM_LOGINSTATUS', false);
                //   store.commit('COM_USERINFO', {});
    },
    setLogin:function(token){
        this.setCookie('Authorization',"Bearer " +token,1);
        this.setCookie('loginStatus',"on",1);
        store.commit('COM_Token', "Bearer " +token);
        store.commit('COM_LOGINSTATUS', true);
    },
    //获取用户信息
   
    utf16to8: function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    },
    base64encode:function (str) {
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
            var input = this.utf16to8(str);
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            return output;

        },
        
        //操作cookie
            setCookie:function (name, value, iDay) 
            {
                var oDate=new Date();
                oDate.setDate(oDate.getDate()+iDay);
                document.cookie=name+'='+encodeURIComponent(value)+';expires='+oDate;
            },
            getCookie:function (name)
            {
                var arr=document.cookie.split('; ');
                var i=0;
                for(i=0;i<arr.length;i++)
                {
                    var arr2=arr[i].split('=');
                    if(arr2[0]==name)
                    {  
                        var getC = decodeURIComponent(arr2[1]);
                        return getC;
                    }
                }
                return '';
            },
            removeCookie:function (name)
            {
                this.setCookie(name, '1', -1);
            },
            //将平行数据根据子父节点处理为树形数据
            returnDatabyTree:function fn(data,pid){
                    let result = [] , temp;
                    for(let i in data){
                        if(data[i].parent==pid){
                            result.push(data[i]);
                            temp = fn(data,data[i].id);           
                            if(temp.length>0){
                                data[i].children=temp;
                            }           
                        }       
                    }
                    return result;
                },

        //根据ID在树形结构中返回名称
         node:{
            nodeName:'',
            getNameByID:function (data,id){
                    let temp;
                    for(let i in data){
                        if(data[i].id==id){
                            this.nodeName=data[i].text;
                            break;
                        }else{
                            if(data[i].children!=null){
                                temp = data[i].children;
                                this.getNameByID(temp,id); 
                            }
                        
                        }    
                    } 
            }
         },
        exportExecl:function(tHeader,filterVal,tableData,title) {
            //导出列名称，name,数据，导出表标题
             require.ensure([], () => {
                const { export_json_to_excel } = require('common/vendor/Export2Excel');
                const data = tableData.map(v => filterVal.map(j => v[j]));
                export_json_to_excel(tHeader, data, title);
                })
        }
      
}