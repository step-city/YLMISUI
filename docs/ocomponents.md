# 业务组件
##  角色树  

#### roleTree

> ###### 引用方式  

**局部引入** ```<yl-roleTree> </yl-roleTree>```

#### 用法示例


```html
    <yl-roleTree v-model="value"></yl-roleTree>
```

```javascript
import roleTree from 'ocomponents/role/roleTree'
   export default {
    data() {
      return {
        value:''
      }
     },
    methods:{
    },
    components:{
        'yl-roleTree':roleTree,
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| isexpand      | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |
	

#### 方法

暂无
#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|
---
##  字典树  

#### dataDictionaryForSel

> ###### 引用方式  

**局部引入** ```<yl-dataDictionaryForSel> </yl-dataDictionaryForSel>```

#### 用法示例


```html
   <h6>list调用字典示例：</h6>
    <yl-dataDictionaryForSel 
    :code="'Unit'" 
    v-model="value"  
    :placeholder="'请选择'">
    </yl-dataDictionaryForSel>
   <p>字典数据:{{value}}</p>
```

```javascript
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
   export default {
    data() {
      return {
        value:''
      }
     },
    methods:{
    },
    components:{
        'yl-dataDictionaryForSel':dataDictionaryForSel,
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| code      | 字典加载时对应第一级的编码 | String |'' |
| placeholder      | 提示文本 | String |'' |
	

#### 方法

暂无

#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentvalue      | 节点选择时触发 |为当前选择的文本值|

---
#### dataDictionaryForTree

> ###### 引用方式  

**局部引入** ```<yl-dataDictionaryForTree> </yl-dataDictionaryForTree>```

#### 用法示例


```html
   <h6>树调用字典示例：</h6>
    <yl-dataDictionaryForTree 
    :code="'ceshi'" 
    v-model="value"  
    :isexpand="true" 
    @getCurrentNode="_getCurrentNode"  >
    </yl-dataDictionaryForTree>
<p>字典数据:{{dataDictionaryText}}</p>
```

```javascript
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
   export default {
    data() {
      return {
        value:''
      }
     },
    methods:{
    },
    components:{
        'yl-dataDictionaryForSel':dataDictionaryForSel,
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| code      | 字典加载时对应第一级的编码 | String |'' |
| isexpand   | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |

#### 方法

暂无

#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|


---


## 组织机构树

#### organizeTree

> ###### 引用方式  

**局部引入** ```<yl-organizeTree> </yl-organizeTree>```

#### 用法示例


```html
    <yl-organizeTree   v-model="value"></yl-organizeTree>
```

```javascript
import organizeTree from 'ocomponents/organizeTree/organizeTree'
   export default {
    data() {
      return {
        value:''
      }
     },
    methods:{
    },
    components:{
        'yl-organizeTree':organizeTree,
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| isexpand      | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |
	

#### 方法

暂无
#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|

---

#### organizeTreeWithPanel

> ###### 引用方式  

**局部引入** ```<yl-organizeTreeWithPanel> </yl-organizeTreeWithPanel>```

#### 用法示例


```html
     <yl-organizeTreeWithPanel  
        v-model="value"  
        :isexpand="true" >
    </yl-organizeTreeWithPanel>
```

```javascript
import organizeTreeWithPanel from 'ocomponents/organizeTree/organizeTreeWithPanel'
   export default {
    data() {
      return {
        value:''
      }
     },
    methods:{
    },
    components:{
        'yl-organizeTreeWithPanel':organizeTreeWithPanel,
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| isexpand      | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |
	

#### 方法

暂无
#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|

---


## 区域树

#### provincecity

> ###### 引用方式  

**局部引入** ```<yl-provincecity> </yl-provincecity>```

#### 用法示例


```html
    <yl-provincecity   v-model="value"></yl-provincecity>
```

```javascript
import provincecity from 'ocomponents/provincecity/provincecity'
   export default {
    data() {
      return {
        value:''
      }
     },
    methods:{
    },
    components:{
        'yl-provincecity':provincecity,
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| isexpand      | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |
	

#### 方法

暂无
#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|

---


## 工号树

#### GHTree

> ###### 引用方式  

**局部引入** ```<yl-ghtree> </yl-ghtree>```

#### 用法示例


```html
    <yl-ghtree v-model="value" 
               :defaultText="defaultText" ></yl-ghtree>
```

```javascript
import ghtree from 'ocomponents/gh/GHTree'
   export default {
    data() {
      return {
        value:''
        defaultText:''
      }
     },
    methods:{

    },
    components:{
        'yl-ghtree':ghtree,
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| isexpand      | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |
| defaultText      | 文本默认值（如果为逐步加载时，给控件给一个默认值） | String |'' |

	

#### 方法

暂无
#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|

---
