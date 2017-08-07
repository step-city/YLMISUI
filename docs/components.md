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

###### 逐级加载方式


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
### queryContainer 预览明细查询

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





##  工具类

### <yl-toolbar> 

```html
    <yl-toolbar>
        <el-button-group ref="funtoolbar">
            <el-button v-for="(item,index) in funBtnConf" :key="index" :type="item.type" :name="item.name" :size="item.size" v-permissionSetting="item.permissionSetting" v-show="item.isShow" :disabled="item.disabled" @click="item.clickEvent">
                <i :class="item.icon"></i>{{item.text}}</el-button>
        </el-button-group>
    </yl-toolbar>
```