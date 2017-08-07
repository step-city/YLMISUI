# 全局函数说明

#### 自定义表单验证


### 自定义表单验证

>目前element中直提供了不能为空的表单验证，输入类型的表单验证需要自行定义。框架中提供了常用的表单验证
0. 校验是否为空  `this.checkIsNull`
1. 校验整数  `this.checkInt`
2. 校验浮点数  `this.checkdecimal`
3. 校验邮箱格式  `this.checkemail`
4. 校验电话号码  `this.checkphoneNum`
5. 校验Url  `this.checkurl`



###### 单独校验是否输入类型用法示例

```javascript

export default {
    data(){
    return{
            rules: {    
                        userName: [
                            {  validator: this.checkInt, trigger: 'blur' }
                        ], 
                },
           }
    }
}
```

###### 校验是否输入类型和是否为空用法示例

```javascript

export default {
    data(){
    return{
            rules: {    
                        userName: [
                             { required: true, validator: this.checkIsNull,message: '状态文本值不能为空！', trigger: 'blur' },
                            {  validator: this.checkInt, trigger: 'blur' }
                        ], 
                },
           }
    }
}
```

>另外提供了验证的方法用于在表单编辑过程中类型校验使用
0.校验空值  `this.checkIsNullfn`
1.校验整数  `this.checkIntfn`
2.校验浮点数  `this.checkdecimalfn`


###### 用法示例

```javascript

function fn(){
   if(this.checkdecimalfn(val)){
        this.$message.error('输入类型有误！');
   }
}

```


---

### 判断字段重复

>字段判断重复方式为单字段校验重复，目前不支持多字段联合判断重复


###### 用法示例

```javascript

export default {
    data(){
      let ghNameJudgeRepeat = (rule, value, callback) => {
         let str=`MB_GH|GHName|${this.getUserInfo().user.manageOrgId}|${this.formModel.parentId}|${this.formModel.oghName}`;
         this.IsJudgeRepeat(str,value, callback);
      };
    return{
            rules: {
                        userName: [
                            {validator: ghNameJudgeRepeat, trigger: 'blur' }
                        ], 
                },
           }
    }
}
```

###### 说明

字端重复判断封装至全局函数中，调用`this.IsJudgeRepeat`来实现重复验证；   
参数通过rule传入，一共四个参数，以`|`分割。  
参数分别是：数据库表名称，校验字段名称、组织机构代码（不需要传空即可）、父节点编号（不需要传空即可）、当前编辑值的原始值（在编辑时做重复判断），过滤标识。

---


### 获取单号

>获取单号的方法为全局方法 调用时记着要在编码管理模块配置




###### 用法示例


```javascript

export default {
    this.generateOrderCode('PL_GHInitialPlanOrder',this.formModel.order.orgId,val,(val)=>{
                     this.formModel.order.orderCode=val;
             });
}


```

>参数说明：fn(tableName,orderDate,callback,orderType=0,value='',sortCode='')

1. tableName 对应模块表名称
2. orgId     生成单号的组织机构编号
3. orderDate 对应的单据日期（格式 YYYY/YYYY-MM）
4. callback  回调函数
5. orderType 单据类型，和模块配置中orderType要对应
6. value     扩展列的值
7. sortCode  扩展列的排序值
 
---



### 获取当前模块数据表名称

> 获取单据表名称依据当前模块的`路由路径`获取


###### 用法示例


```javascript

export default {
    this.generateOrderCode('PL_GHInitialPlanOrder',this.formModel.order.orgId,val,(val)=>{
                     this.formModel.order.orderCode=val;
             });
}


```

>参数说明：fn(tableName,orderDate,callback,orderType=0,value='',sortCode='')

1. tableName 对应模块表名称
2. orgId     生成单号的组织机构编号
3. orderDate 对应的单据日期（格式 YYYY/YYYY-MM）
4. callback  回调函数
5. orderType 单据类型，和模块配置中orderType要对应
6. value     扩展列的值
7. sortCode  扩展列的排序值
 
---


### 日期格式化

>全局函数中引入了`monment.js` 提供对日期进行格式化操作。


###### 用法示例

```javascript

export default {
       this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
}


```


>参数说明：formatDate(val,dateformat)

1. val  格式话对应的值
2. dateformat  格式化参数（参照monment.js官网）

---


### 获取用户信息

>全局函数中提供`this.getUserInfo()`函数来全局调用当前用户信息。


###### 对象说明

```json

{
    "user": {
        "realName": "超级管理员",
        "gender": "男",
        "userName": "admin",
        "emailAddress": "853458083@qq.com",
        "manageOrgId": "ec0d0d88-be0e-4de2-b767-a75b011747d7",
        "manageOrgName": "中国中铁集团有限公司",
        "roleId": "8136d43a-3d32-4c8b-9da4-a75b011747e5",
        "roleName": "超级管理员",
        "lastLoginTime": "2017-04-27T13:50:58.927+08:00",
        "id": "5d6c9789-806f-403d-aaed-a75b01174814"
    },
    "userDataRanges": [
        {
            "id": "ec0d0d88-be0e-4de2-b767-a75b011747d7",
            "text": "中国中铁集团公司"
        }
    ],
    "userRoles": [
        {
            "id": "8136d43a-3d32-4c8b-9da4-a75b011747e5",
            "text": "Admin"
        }
    ]
}

```



---


### 生成guid字符串

* 全局函数中提供`this.newGuid()`生成guid唯一字符串
* 全局函数中提供`this.guidOfNull()`生成空的guid字符串