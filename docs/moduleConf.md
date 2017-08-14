# 模块配置

##  基本信息配置  

> 说明 基本信息配置主要针对一个容器的全局信息配置 如：容器的名称，图标，帮助文档,页面布局配置等。
#### 用法示例
```json
   {
        "baseInfo": {  //所有的配置项均在根节点下
                    "moduleType":0,  //模块类型  分为 0单表结构，1为 单表多条新增类型，2为典型的主从表类型，3为主从表，主从分开编辑类型。 
                    "panelpage": {      //模块嵌套面板配置
                        "titleName": "模块名称", //模块显示名称
                        "icon": "icon-pencil2", //模块显示图标
                        "reloadIsShow": false,  //模块页面刷新按钮
                        "fullScreenIsShow": true,//模块页面全屏功能按钮
                        "helpIsShow": true       //模块帮助功能按钮
                    },
                    "layout": {         //布局配置
                        "columnlay": {   
                            "hiddenLeft": false,   //左侧筛选块是否显示
                            "upToolFilter": {      //上部筛选器工具条配置
                                "visiable": true   //是否显示
                            },
                            "downToolFilter": {       //下部筛选器工具条配置
                                "visiable": true      //是否显示
                            },
                            "toolFunction": {    //功能按钮工具条配置
                            "visiable": true     //是否显示
                            }
                }
            }
        }
    }

```
---

##  Api配置  


> 说明 API实现配置模块中所有和后台交互数据结构的配置。

#### 用法示例
```json
    
    {
            "apiConf": {   //一个表中的api配置包含3个基本参数
                "getMainPageList": {   //api方法名
                    "url": "/api/services/app/gh/getMainPageList",  //请求路径
                    "method": "post",  //请求方式 默认为post
                    "data": {}          //请求参数
                },
                "deleteData": {
                    "url": "/api/services/app/gh/DeleteGH",
                    "method": "post",
                    "data": {}
                }
            }
    }

```

> 注意：在不同模块中对应的api名称根据具体功能应该是相同的。因此，在配置不容模块时，方法名称不应该改变。文档中列举了常用的方法名称。


#### api常规方法

| 方法名称        | 请求方式     | 参数  |作用说明  |返回值|
| ------------- |:-------------:| -----:|-----:|-----:|
| getMainAllList |post  |lambda筛选数组,sorting排序字符串 | 根据筛选条件获取主表列表数据 ||
| getMainPageList |post  |lambda筛选数组,sorting排序字符串,draw,skipCount,maxResultCount | 按条件分页获取主表列表数据 ||
| getItemAllList |post  | 只适用于主从结构lambda筛选数组,sorting排序字符串 | 根据筛选条件获取明细表列表数据 ||
| getItemPageList |post  |lambda筛选数组,sorting排序字符串,draw,skipCount,maxResultCount | 按条件分页获取明细表列表数据 ||
| getAllList |post  | 只适用于主从结构lambda筛选数组,sorting排序字符串 | 根据筛选条件获取主从表列表数据 ||
| getAllPageList |post  | 只适用于主从结构lambda筛选数组,sorting排序字符串,draw,skipCount,maxResultCount | 按条件分页获取主从表列表数据 ||
| createOrUpdateMainObject |post  | 如果是单表，参数为包裹的model对象，如果是主从结构主表，主要参数为时候主表model对象以及从表列表数组对象 | 添加或者修改表信息 ||
| createOrUpdateItemObject |post  | 只适用于主从结构，参数为包裹的model对象， | 添加或者修改从表信息 ||
| deleteMainObject |post  | 参数为主表ID与lamad表达式数组 | 如果是单表，按条件删除条目，如果是主从结构，参数主表和对应从表 ||
| deleteItemObject |post  | 只适用于主从结构，参数为主表ID与lamad表达式数组 | 按条件删除从表条目 ||
| getMainObjectForEdit |post  | 只适用于主从结构，参数为lamad表达式数组 | 根据主表条件获取主表和对应从表列表信息 ||
| auditObject |post  | 参数为主表id，orgid | 审核单据信息 ||
| unAuditObject |post  | 参数为主表id，orgid | 撤销审核单据信息 ||
| approveMainObject |post  |  | 审批单据信息 ||
| getApproveStateObject |post  |  | 获取审批状态 ||
| ExecuteSqlOne |post  |  | 扩展api方法一 ||
| ExecuteSqlTwo |post  |  | 扩展api方法二 ||
| ExecuteSqlThree |post  |  | 扩展api方法三 ||

--- 

##  表信息配置  

> 表格是一个模块在pc端一般都会用到的控件，表格配置包含以下内容：

### `table`节点配置

#### 用法示例 配置方式

```json
   {
        "tableInfoConf": {
                    "table": {
                                "attr": {
                                    "data": {}, //显示的数据对象,内部包含分页参数。
                                    "highlightCurrent": true,//是否高亮选中行
                                    "height":"",//Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string类型，则 Table 的高度受控于外部样式。
                                    "maxHeight":"",//Table 的最大高度
                                    "stripe":false, //是否为斑马纹 table
                                    "border":false, //是否带有纵向边框
                                    "fit":true, //列的宽度是否自撑开
                                    "showHeader":true,//是否显示表头
                                    "currentRowKey":"",  //当前行的 key，只写属性 String,Number
                                    "rowClassName":"",  //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
                                    "rowStyle":"",  //行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
                                    "rowKey":"", //行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的
                                    "emptyText":"",//空数据时显示的文本内容，也可以通过 slot="empty" 设置
                                    "defaultExpandAll":false,//是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效
                                    "expandRowKeys":"",//可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
                                    "defaultSort":{},//默认的排序列的prop和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
                                    "tooltipEffect":"dark",//tooltip effect 属性
                                }
                             },
                    
           }
   }

```
### `columns`节点配置

> `columns`节点主要针对表列的配置，其配置参照element官网table的相关配置。

 配置方式
```json
   {
        "tableInfoConf": {
                  "columns": [
                                {   //单选时配置方式
                                    "attr": { 
                                    "type": "index",  
                                    "label": "序号",
                                    "width": 80,
                                    "align": "center"
                                    }
                                },
                                 {  //多选时配置方式
                                    "attr": {  
                                    "type": "selection",  
                                    "label": "选择",
                                    "width": 80,
                                    "align": "center"
                                    }
                                },
                                 {  //常规列配置说明   
                                    "attr": { 
                                        "columnKey":"", //column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
                                        "prop": "ghName",//对应列内容的字段名，也可以使用 property 属性
                                        "label": "名称", //显示的标题
                                        "width": 120,  //对应列的宽度
                                        "minWidth":120, //对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
                                        "fixed":"",  //列是否固定在左侧或者右侧，true 表示固定在左侧  true, left, right
                                        "renderHeader":"Function(h, { column, $index })", //列标题 Label 区域渲染使用的 Function
                                        "sortable":false, //对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
                                        "sortMethod":"Function(a, b)",  //对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个布尔值
                                        "resizable":true,//对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
                                        "formatter": "Function(row, column)", //用来格式化内容
                                        "showOverflowTooltip":true,//当内容过长被隐藏时显示 tooltip
                                        "align": "left", //left/center/right
                                        "headerAlign":"left",//表头对齐方式，若不设置该项，则使用表格的对齐方式  left/center/right
                                        "className": "className",  //列的 className
                                        "labelClassName":"",  //当前列标题的自定义类名
                                        "selectable":"",  //仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
                                        "reserveSelection":"",//仅对 type=selection 的列有效，类型为 Boolean，为 true 则代表会保留之前数据的选项，需要配合 Table 的 clearSelection 方法使用。
                                        "filters":"Array[{ text, value }]",//数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。
                                        "filterMultiple":true,//数据过滤的选项是否多选
                                        "filterMethod":"Function(value, row)",//数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
                                        "filterValue":"Array",//选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。
                                        "scopedSlot":"slotName"  //具名关联名称
                                    }
                                 },
                           ]
           }
}

```
### `solSlotConf`节点配置

> `solSlotConf`节点配置主要是对表格列具名渲染配置。

 整体配置方式
```json
"solSlotConf": [
      {  //文本渲染
        "type": "tag",  
        "name": "isLeaf",  //具名关联名称
        "elmentConfig": [  //标签配置数组
          {
            "type": "primary",  //主题
            "value": true,   //值
            "text": "是"   //显示文本
          },
          {
            "type": "danger",  
            "value": false,
            "text": "否"
          }
        ],
      },
      {  //按钮组渲染
        "type": "button",  
        "name": "buttonSlot",  //具名关联名称
        "elmentConfig": [  //元素配置数组
          {
           "name": "add",  //按钮名称
            "icon": "icon-plus", //图标
            "type": "primary", //主题
            "size": "small", //大小
            "text": "添加", //文本
            "disabled": false, //是否可用
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "ison": true,  //是否开启回调函数
                            "click": "function(row,name,_this){}",  //change 配置回调函数类型和函数函数体
                         }
          },   
          {
           "name": "edit",
            "icon": "icon-pencil",
            "type": "primary",
            "size": "small",
            "text": "修改",
            "disabled": true,
            "isShow": true,
            "eventConf": {   //控件回调函数配置
                            "ison": true,  //是否开启回调函数
                            "click": "function(row,name,_this){}",  //change 配置回调函数类型和函数函数体
                         }
          },    
        ],
      },
       {  //预览，打印，审批列渲染
        "type": "view",  
        "name": "viewSlot",  //具名关联名称
        "elmentConfig": [  
          { 
            "name":"viewItem", //快速预览
            "icon": "icon-eye3", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._viewItem(row.id);}",
                         }
          },   
          {
            "name":"approve", //审批
            "icon": "icon-sitemap", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._state(row.id);}",
                         }
          },   
          {
            "name":"print", //打印
            "icon": "icon-printer", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._printPage(row.id);}",
                         }
          },    
        ],
      },
      {  //文本格式化
        "type": "format",  
        "name": "isLeaf",  //具名关联名称
        "eventConf": {
          "isOn": false,
          "format": "function(row,option,_this){}"  //当前行，当前前元素配置，当前vue实例
        },
      },
    ]
```

### `itemConf`节点配置
> `itemConf`节点配置明细查看器。

配置节点包含：`baseInfo`、`apiConf`、`filterConf`、`tableInfoConf`、

配置节点各个属性和模块配置各个属性相对应。参考主从表示例。


### `printConf`节点配置
> `printConf`节点配置打印预览dialog弹出框配置。

```json
"printConf": {
      "dialogConf": {
        "size": "large",
        "top": "10%",
        "title": "单据明细"
      },
      "iframeConf": {
        "src": "/GHInitialPlanOrder.html"
      }
    },
```

### `approveConf`节点配置
> `approveConf`节点配置审批状态dialog弹出框配置。

```json
"approveConf":{  
      "dialogConf": {
        "size": "small",
        "top": "10%",
        "title": "审批状态查看"
      }
      
    }
```
---


##  过滤器配置 

> 过滤器配置主要包括数据过滤条件配置、查询功能配置、数据排序配置。

### 过滤条件配置

#### 模块过滤器

> 模块的过滤器主要是针对`getMainPageList`方法的参数和sorting做配置，最终会生成lambda数组和sorting配置。

一般来说模块的筛选器会有三种形式：

1. 绑定方式筛选

   这种方式一般在模块初始化时筛选器的值就已经绑定定，在界面操作中值也不会发生变化。

   配置方式

```json
    {
        "filterConf": {
            "inputArr": [  //绑定的值参照过滤器下方的lambda表达式构造说明配置
                            {
                                "key": "SupplierId",
                                "op": "EQ",
                                "value": "f21da119-b97d-4537-a522-a7ac0121334c"
                            },
                            {
                                "key": "ContractID",
                                "op": "EQ",
                                "value": "f21da119-b97d-4537-a522-a7ac0121334c",
                                "eventConf": {
                                            "isOn": true,
                                            "init": "function(option,_this){option.value=_this.globalFunObject.getUserInfo().user.manageOrgId;}"
                                            }
                            },
                 ],
        }
   }

```

注意 `inputArr`中定义的初始值有三种方式赋予：
    1. 直接在value中传入默认值，这种方式适用与一直常量,如：`"value": "f21da119-b97d-4537-a522-a7ac0121334c"`。
    2. 定义一个工厂函数返回默认值，如配置第二条所示。参数 option为配置当前对象，_this为vue实例。
   



2. 操作控件事件进行筛选

> 这种方式一般筛选器的值是随着控件的事件改变的。改变后一般会重新触发数据请求。
  `这种筛选方式规定只有包含panel的tree组件采用这种方式配置`

    配置方式
   
```json
    {
        "filterConf": {
            "selfFilterConf": [  //筛选器内部配置采用控件渲染器渲染，其配置说明参照控件渲染器配置进行配置
                    {
                        "val": "426559c4-4fea-4f73-89a5-a79b00c43116",  
                        "type": "ghTreeWithPanel", 
                        "name": "ParentId", 
                        "op": "EQ",
                        "elmentConfig": {
                            "nodeStateConf": []
                        },
                        "eventConf": {
                            "isOn": true,
                            "change": "function(node,_this){ }"
                        }
                   },
               ]
          }
     }

```

3. 通过查询事件进行筛选

>  这种方式筛选器的值通过控件操作改变后不会立即触发数据请求，统一由查询功能来触发
   `有时候因为筛选器控件过多，因此需要多个工具条来布局，在模块容器中我们预留了两个工具条来布局筛选控件`
    
    配置方式
   
```json
    {
        "filterConf": {
            "searchFilterConf":{
                "up": [  //筛选器内部配置采用控件渲染器渲染，其配置说明参照控件渲染器配置进行配置
                            {
                                "val": "",
                                "title": "父节点",
                                "name": "parentId",
                                "type": "ghtree",
                                "op":   "EQ",
                                "position": {
                                    "spanNum": 12,
                                    "alone": false,
                                    "style": ""
                                },
                                "elmentConfig": {
                                    "placeholder": "选择上级工号",
                                    "readonly": true
                                },
                            },
                         ],
                "down": [  
                            {
                                "val": "",
                                "title": "计量单位",
                                "name": "mUnit",
                                "type": "input",
                                "op":   "EQ",
                                "position": {
                                    "spanNum": 12,
                                    "alone": true,
                                    "style": ""
                                },
                                "elmentConfig": {
                                    "type": "text"
                                },
                             }
                         ]
               }
                        
         }
     }

```

### 过滤模型配置

 searchModel是过滤对象模型，`searchFilterConf`的过滤器控件直接绑定至该数据模型；

 模型配置如下：

 ```json
     {
        "searchModel":{
            "OrgId":"",
            "OrderDate":"",
            "OrderCode":"",
            }
    }
 ```

 注意: 模型的初始值不建议写在对象结构中，同过控件的init函数初始化初始值。

### 排序配置

 排序配置针对sorting配置

    配置说明：
```json
   {
    "filterConf":{
        "sorting":  "GHName asc,GHState desc"
        }
   }
```


### lambda表达式构造说明

>    在前端构造lambda表达式时只需要构造成`[{ "key": "SupplierId","op": "EQ", "value": ""}]`的对象数组,其中op的类型有以下几种：

    | op   | 说明   | 
    | ---- |------:| 
    | EQ | 等于 |      
    | NEQ |不等于  |      
    | GT | 大于 |        
    | GTE | 大于等于 |         
    | LT | 小于 |         
    | LTE | 小于等于 |       
    | LIKE | 模糊匹配 |        
    | LIKEL | 头部匹配 |         
    | LIKER | 尾部匹配 |        
    | TreeLeft | 以某种关键字截取 |    

---

##  功能配置

>  一个模块由多个功能组成。如，数据查询、添加对象、编辑对象、删除对象，审核对象等等。
不同的功能触发事件不同。像数据查询、翻页功能属于过滤器范畴，已在过滤器中配置。
功能配置主要针对模块的 添加、修改、删除、审核、撤销审核、审批、扩展功能（预留三个）等功能进行配置，主要针对按钮的渲染样式配置，和api的调用配置在回调函数中体现。

### 编辑功能配置

> 一般来说，编辑功能配置主要包含： 添加、修改、删除、审核、审批、等功能。

  配置说明：模块中的编辑功能按钮在布局上一般都放在工具条上，因此配置时配置为数组形式
    
```json
  {
  "functionConf": {
    "funBtn":[  
         {  //按钮配置项
            "name": "add",  //属性名称
            "icon": "icon-plus", //图标
            "type": "primary", //主题
            "size": "small", //大小
            "text": "添加", //文本
            "disabled": false,  //是否可用
            "isShow": true, //是否可见
            "eventConf": {
                            "isOn": true,
                            "click": "function(name,_this){ _this._add();}"  //功能事件 参数为当前功能名称，模块主界面的vue示例
                        },
            "permissionSetting": "Materials.Consume.Plan.GHInitialPlanOrders.Create" //权限控制标识  如果功能按钮不受权限控制 配置为 isShow
        },
     
    ]
  }
}
```

### 查询功能配置

> 查询功能配置查询功能按钮。

    配置说明：
```json
   {
    "functionConf":{
            "searchBtn": {  //按钮配置项
                "name": "query",  //属性名称
                "icon": "icon-plus", //图标
                "type": "primary", //主题
                "size": "small", //大小
                "text": "查询", //文本
                "disabled": false,  //是否可用
                "isShow": true, //是否可见
                "eventConf": {
                                "isOn": true,
                                "click": "function(name,_this){ _this._reload();}"  //功能事件 参数为当前功能名称，模块主界面的vue示例
                            },
                "permissionSetting": "isShow" //权限控制标识  如果功能按钮不受权限控制 配置为 isShow
            },
        }
   }

```

### Form表单按钮配置

> Form表单按钮配置主要包含：保存、重置、选材等，以数组方式配置

```json
  {
  "functionConf": {
  "formBtn":[  
         {  //按钮配置项
            "name": "reset",  //属性名称
            "icon": "icon-plus", //图标
            "type": "", //主题
            "size": "small", //大小
            "text": "重置", //文本
            "disabled": false,  //是否可用
            "isShow": true, //是否可见
            "eventConf": {
                            "isOn": true,
                            "click": "function(name,_this){ _this._resetForm();}"  //功能事件 参数为当前功能名称，模块编辑界面的vue实例
                        },
            "permissionSetting": "isShow" //权限控制标识  如果功能按钮不受权限控制 配置为 isShow
        },
        {  //按钮配置项
            "name": "save",  //属性名称
            "icon": "icon-plus", //图标
            "type": "primary", //主题
            "size": "small", //大小
            "text": "提交", //文本
            "disabled": false,  //是否可用
            "isShow": true, //是否可见
            "eventConf": {
                            "isOn": true,
                            "click": "function(name,_this){ _this._submitForm();}"  //功能事件 参数为当前功能名称，模块编辑界面的vue实例
                        },
            "permissionSetting": "isShow" //权限控制标识  如果功能按钮不受权限控制 配置为 isShow
        },
         {  //选材配置项
            "name": "save",  //属性名称
            "icon": "icon-plus", //图标
            "type": "primary", //主题
            "size": "small", //大小
            "text": "提交", //文本
            "disabled": false,  //是否可用
            "isShow": true, //是否可见
            "eventConf": {
                            "isOn": true,
                            "click": "function(name,_this){ _this._onSelect('常用材料选材框');}"  //功能事件 参数为当前功能名称，模块编辑界面的vue实例
                        },
            "permissionSetting": "isShow" //权限控制标识  如果功能按钮不受权限控制 配置为 isShow
        },
    ]
  }
}
```
注意： `只有在选材按钮中配置flag属性，该属性为选材框渲染的标识`

### 功能状态

> 功能配置中我们预留了一个funState对象，通过内部的回调函数来编辑按钮行选中的状态控制。

  配置说明：模块中的功能按钮在布局上一般都放在工具条上
    
```json
  {
     "functionConf": {
            "funState": {  
                "eventConf": {
                    "isOn": true,
                    "click": "function(selectRows，_this){}"  //参数 选中行对象数组、主模块vue实例
                    }
                }
  }
}
```

##  Form表单配置

Form表单一般在dialog中呈现，其配置如下：

###  Form表单的dialog配置

配置说明：

```json
 {
  "formConf": {
    "dialogConf": {  
      "size": "small", //大小
      "top": "10%",  //距离顶部位置
      "title": "工号信息编辑",  //标题
      "modalAppendToBody": false,  //是否附加至body标签
      "closeOnClickModal": false, //是否点击遮罩层关闭
      "afterAddClose":false  //是否显示添加后关闭选择框。
    }
  }
}
```

###  Form表单的头部信息配置

配置说明：一般来书 头部信息主要用于主从结构单据，其结构如下：

```json
 {
  "formConf": {
    "formHeader": {  //表头结构
      "isShow": true,  //是否显示
      "litteTitle": "一局电务公司", //副标题
      "title": "工号总需用计划"  //主标题
    },
  }
}
```

### 表单部分配置

form表单分两种类型：

#### 带tabPanel的Form表单框

```json
{
  "formConf": {
    "formConfigs": {  
        "tabpanelconf": { //总体配置
            "disabled": false, //是否为tabpanel类表单， 默认是
            "type": "", //tabpanel的类型
            "style": "height:300px" //form高度，默认为auto
        },
        "tabConfigs": [
            {
            "tabpanel": { //各个分页的tabpanel配置
                "title": "基本信息", //标题
                "disabled":false,  //是否可用
            },
            "formConfig": [  //元素配置  参照控件渲染器配置
                {
                "val": "",
                "title": "父节点",
                "name": "parentId",
                "type": "ghtree",
                "position": {
                    "spanNum": 12,
                    "alone": false,
                    "style": ""
                },
                "elmentConfig": {
                    "placeholder": "选择上级工号",
                    "readonly": true
                },
                "eventConf": {
                    "isOn": true,
                    "change": "function(node,_this){_this.formModel.fullName=node.fullName;}",
                },
                "rules": [
                    {
                    "required": true,
                    "message": "上级工号不能为空",
                    "trigger": "change"
                    }
                ]
                },
                {
                    "val": "",
                    "title": "标准工号",
                    "name": "sId",
                    "type": "treeselect",
                    "position": {
                        "spanNum": 12,
                        "alone": false,
                        "style": ""
                },
                "elmentConfig": {
                    "placeholder": "选择标准工号",
                    "readonly": true,
                    "defaultProps": {
                    "children": "children",
                    "label": "text",
                    "id": "id",
                    "funcCode": "funcCode"
                    },
                    "treedata": []
                },
                "rules": [
                    {
                    "required": true,
                    "message": "标准工号不能为空",
                    "trigger": "change"
                    }
                 ]
                }
            ]
            },
            {
            "tabpanel": {
                "title": "其他信息"
            },
            "formConfig": [
                {
                "val": "",
                "title": "计量单位",
                "name": "mUnit",
                "type": "input",
                "position": {
                    "spanNum": 12,
                    "alone": true,
                    "style": ""
                },
                "elmentConfig": {
                    "type": "text"
                },
                "rules": [
                    {
                    "required": true,
                    "message": "计量单位",
                    "trigger": "blur"
                    }
                ]
                }
            ]
            }
        ]
       }
 }
}
```

#### 经典Form表单框

```json
{
  "formConf":{
      "formConfigs": {
      "tabpanelconf": {
        "disabled": true,  //disabled属性为true表示不带tabpanel
        "type": "",
        "style":"height:300px"  //form表单高度
      },
      "formConfig": [  //formConfig内部配置参照控件渲染器
            {
              "val": "",
              "title": "用料单位名称",
              "name": "labourName",
              "type": "input",
              "position": {
            "spanNum": 12,
                "alone": true,
                "style": ""
              },
       "elmentConfig": {
                "type": "text"
              },
              "rules": [{
                  "required": true,
                  "message": "用料单位不能为空！",
                  "trigger": "blur"
                }
              ]
            },
            {
              "val": "",
          "title": "联系人",
              "name": "labourContact",
              "type": "input",
              "position": {
                "spanNum": 12,
                "alone": true,
                "style": ""
           },
              "elmentConfig": {
                "type": "text"
              },
              "rules": [
                {
                  "required": true,
                  "message": "联系人不能为空！",
                  "trigger": "blur"
                }
              ]
            }
        ]
    },
  }
}
```

注意：  `form表单中的元素的双向绑定对象为FormModel对象。`

###  FormModel对象

> formModel对象是和后台数据交互的载体，一般不同模型结构数据，formModel的结构也不一样

注意： 不要在formModel中初始化值，应该在控件的init方法中初始化。

#### 单表的formModel结构

```json
    "formModel": {
               "order":{ 
                    "labourName":"",
                    "orgId":"",
                    "orgName":"",
                    "labourContact":"",
                    "labourPhone":"",
                    "labourFax":"",
                    "labourTypeName":"",
                    "labourOrgCode":"",
                    "remark":""
                 }
    }
```
#### 主从表的formModel结构

```json
    "formModel": {
               "order":{ 
                    "labourName":"",
                    "orgId":"",
                    "orgName":"",
                    "labourContact":"",
                    "labourPhone":"",
                    "labourFax":"",
                    "labourTypeName":"",
                    "labourOrgCode":"",
                    "remark":""
                 },
                 "items":[
                    { "labourName":"", "orgId":"", "orgName":"", "labourContact":"", "labourPhone":"",},
                    { "labourName":"", "orgId":"", "orgName":"", "labourContact":"", "labourPhone":"",},
                    { "labourName":"", "orgId":"", "orgName":"", "labourContact":"", "labourPhone":"",}
                   ],
                  "config":{
                        "isGenerateCode": true
                  } 
    }
```

###  InterceptEvent对象

> 该对象中配置拦截方法，注意：拦截方法提供了form表单的vue实例。

1. mounted

form表单的mounted事件,vue实例的mounted阶段执行

2. beforeSubmit

在`beforeSubmit`中执行submit之前业务逻辑。
---

## 业务模块内部预留变量

### 预留属性

##### `selfFilterItem`
   
`selfFilterItem`主要用于存放筛选器中的`selfFilterConf`的默认值和选中值。

##### `funBtnConf`

`funBtnConf`对象为模块的功能按钮对象数组。

##### `fetchObject`

`fetchObject`类似于fetch，用于异步数据请求。

##### `utilObject`

`utilObject` 包含众多工具方法，供编写逻辑使用。

### 预留方法

1. _add()

说明：添加按钮调用方法

2. _edit()

说明： 修改按钮调用方法

3. _delete()

说明： 删除按钮调用方法

4. _audit()

说明： 审核内置方法


5. _unAudit()

说明： 撤销审核内置方法


6. _approve()

说明： 审批内置方法


7. _viewItem(id)

说明： 查看明细内置方法


8. _printPage(id)

说明： 打印预览内置方法

9. _state(id)

说明： 查看审批状态内置方法

---
# 数据选择框配置

> 数据选择框主要提供数据过滤和向制定模块插入数据功能，配置主要包含：基本信息配置、api配置、过滤器配置、表信息配置
  数据选择框配置和模块配置再各项配置上结构相似，一次在文档中不会详细说明，只列出具体的配置结构和说明。

## 基本信息配置

配置说明：包含弹出层的Dialog配置和布局配置

```json
 {
  "baseInfo": {  //基本信息
     "dialogConf": { //弹出层配置
      "size": "small", //弹框大小
      "top": "10%",   //距上部位置
      "title": "常用材料选材框",  //选材框名称
      "modalAppendToBody": false,  
      "closeOnClickModal": false, 
      "afterAddClose": true,//是否每次选择数据后关闭dialog
      "style":"height:450px",
      "dataType":0  //选材框类型 
    },
    "layout": {   //布局参考模块配置
     "columnlay": {  
        "hiddenLeft": false, 
        "upToolFilter": {
          "visiable": true
        },
        "downToolFilter": {
          "visiable": false
        },
        "toolFunction": {
          "visiable": true
        }
      }
    }
  }
}
```
选材框类型说明：
   
  消耗材料：0 常用材料库  1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选            材 6从库存选材 
  周转材料：80：收料选材  81：调入选材  82：库存选材 83：报废选材   
  钢筋加工中心：90：半成品材料库选材  91：半成品登记选材


## API配置

配置说明：数据选择框所用到的API

```json
{
  "apiConf": {
    "getMainPageList": {
      "url": "/api/services/app/gHConfig/getMainPageList",
      "method": "post",
      "data": {}
    },
  }
}
```

注意： 所有的选材框内部调用方法名统一为`getMainPageList`,如果与俱来的方法名称不符合，配置时请采用`getMainPageList`更换配置中的路径和参数。

## 过滤器配置

配置说明：过滤器配置和模块配置相同，参照模块配置

## 表信息配置

配置说明：表信息配置和模块配置相同，参照模块配置

# 报表配置