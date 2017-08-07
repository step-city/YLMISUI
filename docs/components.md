# 公共组件
##  布局类
### layout

```html
                <yl-layout>
                    <div slot="fristbox">
                    </div>
                    <div slot="secondbox" class="flexbox">
                     </div>
                </yl-layout>

```

##  表格

### 表格组件

> ###### 引用方式  

**全局引入** ``` <yl-table ></yl-table>```

#### 单选用法示例


```html
     <yl-table ref="table"
                    @reload="_reload"
                    @current-change="_currentChange"
                    :configs="tableConfig" 
                    :input="mainInput.inputModel"
                    :tableloading="mainTableLoading"  
                    >
                    <template slot="id" scope="scope"> 
                        <div class="yl-table-icon">  
                            <i class="icon-search2"  @click="_viewItem(scope.row.id)"></i>
                        </div>
                    </template>
                    <template slot="view" scope="scope"> 
                        <div class="yl-table-icon">  
                            <i class="icon-eye3"  @click="_viewItem(scope.row.id)"></i>
                        </div>
                    </template>
                    <template slot="isActive" scope="scope">
                        <el-tag type="primary" v-if="scope.row.isActive">启用</el-tag>
                        <el-tag type="danger" v-else>禁用</el-tag>
                    </template>
            </yl-table>
```
```javascript
data :{
    return {
     tableConfig: {
      get() {
        return {
            table: {
                attr: {
                            data: this.tableData,
                            highlightCurrent: true,
                        }
                    },
            columns: [
                        { attr: { type: 'index', label: '序号', width: 65, align: 'center', showOverflowTooltip: false } },
                    ]
        }
    }
 }
    }
},
 methods: {
     _reload() {
         this._getGHInitialPlanOrderPageList();
     },
      async _getGHInitialPlanOrderPageList() {//等待异步操作完成
            this.approveSateInfo = await this.getApproveInfo('PL_GHInitialPlanOrder');
             requestGetGHInitialPlanOrderPageList(this.mainInput.inputModel).then(data => {
                if (data.success) {
                    this.tableData = data.result;
                }
                else {
                    this.$message.error('失败！' + data.error.message);
                }
             })
      }
 }
```
#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| configs      |table、columns的数据集合 | Object| {} |
| input      | 查询参数集合(.inputModel.sorting,.addqueryConditionItem(inputArr)) |   Object| {}|
| tableloading  | 是否显示Loading |  Boolean | false

#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| current-change      | 当表格的当前行发生变化的时候会触发该事件|
| reload      | pageSize 改变时会触发，currentPage 改变时会触发 |



---
##  表单类

---

### treeSelect

> ###### 引用方式  

**全局引入** ``` <yl-roleTree ></yl-roleTree>```

#### 用法示例

##### 一般加载方式

```html
    <yl-treeselect 
        v-model="value" 
        :treedata="treedata" 
        :defaultProps="defaultProps" 
        @getCurrentNode="_getCurrentNode">
    </yl-treeselect>
```

```javascript
   export default {
    data() {
      return {
        value:''
        treedata: [],
        defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
          },
      }
     },
    methods:{
        //此方法获取点击当前点击node的data对象
    _getCurrentNode(selectNode){
                    console.log(selectNode)
            },
    //一次加载树
    _getdata(){
        requestGetMenuItemTreeList().then(data => {
                if(data.success){
                    //如果data.result是平行结构数据 
                    //需要调用util.returnDatabyTree()递归处理
                    this.treedata=util.returnDatabyTree(data.result,'');
                    
                }
            })
    },
    },
     mounted(){
        //初始化树控件
        this._getdata();
    },
   }
```

##### 逐级加载方式

```html
    <yl-treeselect 
    v-model="value" 
    :treedata="treedata" 
    :loaddata="loaddata" 
    :StepByOne="StepByOne" 
    :defaultProps="defaultProps" 
    :textOnly="textOnly"
    :defaultText="defaultText"
    @getCurrentNode="_getCurrentNode" 
    @nodeExpend="_nodeExpend"
    >
    </yl-treeselect>
```

```javascript
   export default {
    data() {
      return {
        id:''
        treedata:[],
        loaddata:[],
        defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
          },
        StepByOne:true,
        textOnly:false,
      }
     },
    methods:{
        //此方法获取点击当前点击node的data对象
    _getCurrentNode(selectNode){
              console.log(selectNode)
            },
    _nodeExpend(result){
        _getdata(val){
    },
    //加载树
    _getdata(val){
        requestGetMenuItemTreeList(val).then(data => {
                if(data.success){
                       //如果不是根节点
                        if(val!=this.guidOfNull()){
                           this.loaddata=data.result;
                        }else{
                            this.treedata=data.result;
                         }  
                 }  
            })
     },
    },
     mounted(){
        //初始化树控件
         let params=this.guidOfNull();
        this._getdata(params);
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| treedata      | 绑定树的数据集合，（在逐步加载时为根节点数据集合） | Array|[ ] |
| loaddata      | 在逐步加载的集合中使用，每次加载逐步加载时将获取值传至该对象 |  Array|[ ] |
| isexpand      | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |
| defaultProps      | 该属性为element tree控件集成属性 | obj |{} |
| textOnly      | 只使用文本值时使用 | Boolean |false |
| stepByOne      | 是否为逐步加载模式 | Boolean |false |
| defaultText      | 默认文本值（只针对逐步加载模式适用） | String |'' |
| size      |控件样式大小（nomarl/small） | String |'nomarl' |	
| placeholder |输入提示文本 | String |'' |	

#### 方法

暂无
#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|
| nodeExpend      | 节点展开时触发，（只在stepByOne为true时有效） | 为当前选中节点的node对象 |

### yl-organizeTree

**全局引入** ``` <yl-organizeTree ></yl-organizeTree>```

#### 用法示例

```html
        <yl-organizeTree  
        v-model="formModel.order.orgId"  
        :placeholder="'请选择单位'"   
        :isexpand="true"
        @getCurrentNode="_getCurrentNodeOrg"  
        style="width:80%">
        </yl-organizeTree>
```

```javascript
        _getCurrentNodeOrg(data){
             //组织机构选择事件
            this.formModel.order.OrgName=data.text;
          }
```
#### 事件


| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|


### queryContainer 预览明细查询


#### 用法示例

```html
    <template slot="view" scope="scope">
        <div class="yl-table-icon">
            <i class="icon-eye3 yl-text-color" @click="_viewItem(scope.row.id)"></i>
        </div>
    </template>
```

```javascript

import { inputModel } from 'api/inputmodel'; //导入此状态管理模式,通过状态管理弹窗的显示与明细
import { mapActions } from 'vuex';


methods: {
            ...mapActions(['setItem_tableConfig', 'setItem_selectFilter', 'setItem_funConfig', 'setItem_isvisible']),
            
            _viewItem(id) { //预览明细
            this.itemId = id;
            this.setItem_selectFilter(this.tableItemfilter);
            this.setItem_isvisible(true);
        }
},
 mounted() {
        this._reload();
        //传入明细表结构
        this.setItem_tableConfig(this.tableItemConfig);
        this.setItem_funConfig(this.tableItemfunconfig);
    }

```
### 事件

## 控件渲染器

### 表单控件渲染器

控件渲染器主要根据传入配置渲染控件相关配置，主要作用于表单生成渲染，过滤器生成渲染，tableedit控件行内渲染。

#### 用法示例

```json

    {
            "val": "", //默认值
            "title": "父节点", //显示标题 在表单渲染时有用
            "name": "parentId", //绑定对象属性 
            "type": "ghtree", //控件类型，在renderComs组件中是唯一的。
            "op": "", //主要用于过滤器。配置过滤条件
            "position": { //表单控件布局配置
                            "spanNum": 12, //24列布局，当前控件占据的列数
                            "alone": false,//是否独占一行
                        },
            "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                                "placeholder": "选择上级工号",
                                "readonly": true
                            },
            "eventConf": {   //控件回调函数配置
                            "ison": true,  //是否开启回调函数
                            "blur": "function(node,_this){_this.formModel.fullName=node.fullName;}",  //blur 配置回调函数类型和函数函数体
                            "init": "function(_this){console.log(_this)}"
                         },
              "rules": [    //表单验证规则配置
                        {
                            "required": true, 
                            "message": "上级工号不能为空",
                            "trigger": "change"
                        }
              ]
   }
```

#### 控件配置说明

##### input输入框配置

```json
      {
    "val": "", //默认值
    "name": "", //绑定对象属性 
    "type": "input", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                       "maxlength":10000,
                       "minlength":0,
                       "size":"small",//大小
                       "disabled":false, //是否可用
                       "type":"text", // text/textarea
                       "placeholder":"", //输入提示字符
                       "icon":"",  //图标
                       "rows":"",  //行数 textarea 有效 
                       "readonly":"", //是否可读
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "blur": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为undefind在input控件中无用，_this为模块表单的实例对象。
                    }
   }

```
##### switch开关配置
```json
    {
    "val": "", //默认值
    "name": "", //绑定对象属性 
    "type": "switch", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                       "width":120,   //switch 的宽度（像素）
                       "disabled":false,   //是否禁用
                       "onColor":"small",//switch 打开时的背景色
                       "offColor":false, //switch 关闭时的背景色
                       "onText":"text", // switch 打开时的文字
                       "offText":"", //switch 关闭时的文字
                       "offValue":"",  //switch 关闭时的值
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //配置回调函数类型和函数函数体
                                                       //参数说明：node为为change事件之后的参数，_this为模块表单的实例对象。
                    }
   }
```

##### inputNumber计数器配置

```json
      {
    "val": "", //默认值
    "name": "", //绑定对象属性 
    "type": "inputNumber", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                       "min":0,   //设置计数器允许的最小值
                       "max":100000, //设置计数器允许的最大值
                       "step":1,//计数器步长
                       "disabled":false, //是否禁用
                       "size":"small", //计数器尺寸
                       "controls":"true", //是否使用控制按钮
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为改变以后的值，_this为模块表单的实例对象。
                    }
   }
```

##### datePicker日期控件配置

```json
{
    "val": "", //默认值
    "name": "", //绑定对象属性 
    "type": "datePicker", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                       "type":"date",//显示类型  year/month/date/week/ datetime/datetimerange/daterange
                       "disabled":false, //是否禁用
                       "size":"small", //输入框尺寸
                       "placeholder":"", //占位内容
                       "format":"yyyy-MM-dd", //时间日期格式化
                       "align":"left", //对齐方式
                       "defaultValue":"", //可选，DatePicker打开时默认显示的时间
                       "editable":true, //文本框可输入
                       "clearable":true, //是否显示清除按钮
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为格式化后的值，_this为模块表单的实例对象。
                    }
   }
```
##### treeselect选择树配置

````json
      {
    "val": "", //默认值
    "name": "", //绑定对象属性 
    "type": "treeselect", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "size":"small", //控件尺寸
                        "defaultText":"", //是否有默认值  执针对逐步加载方式
                        "readonly":false, //选入框是否只读
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "autofocus":false, //是否聚焦
                        "nodeStateConf":[], //树渲染配置
                        "stepByOne":false, //是否逐步加载模式
                        "treedata":[], //绑定初始值
                        "loaddata":[], //二次加载数据， 只针对逐步加载时有效
                        "isexpand":true, //是否展开  只针对一次性加载时有效
                        "defaultProps":{},  //绑定的对象结构
                        "textOnly":false,  //文本模式
                        "filterTextVisibe":true //是否显示筛选框
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象，_this为模块表单的实例对象。
                    }
   }
```

##  工具类

### <yl-toolbar> 

**全局引入** ``` <yl-toolbar></yl-toolbar>```

#### 用法示例

```html
    <yl-toolbar>
        <el-button-group ref="funtoolbar">
            <el-button v-for="(item,index) in funBtnConf" :key="index" :type="item.type" :name="item.name" :size="item.size" v-permissionSetting="item.permissionSetting" v-show="item.isShow" :disabled="item.disabled" @click="item.clickEvent">
                <i :class="item.icon"></i>{{item.text}}</el-button>
        </el-button-group>
    </yl-toolbar>
```