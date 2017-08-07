<template>
<yl-panelpage :titleName="'组件测试用例'" class="panelpage">
<div slot="content" >
    <yl-columnlay>
        <div slot="left" style="width:150px;text-align:center;">
                <p class="title"><a href="#字段树">字典树调用示例</a></p>
                <p class="title"><a href="#字段树">字典树调用示例</a></p>
                <p class="title"><a href="#字段树">字典树调用示例</a></p>
                <p class="title"><a href="#角色树">角色树调用示例</a></p>
                <p class="title"><a href="#供应商列表">供应商列表组件示例</a></p>
        </div>
        <div slot="right">
      
        <h6>树调用字典示例：</h6>
        <yl-dataDictionaryForTree :code="'ceshi'" v-model="dataDictionaryText"  :isexpand="true" @getCurrentNode="_getCurrentNode"  style="width:200px">
        </yl-dataDictionaryForTree>
        
       

    <p>字典数据:{{dataDictionaryText}}</p>
     
    <h6>list调用字典示例：</h6>
        <yl-dataDictionaryForSel :code="'Unit'" v-model="value"  :placeholder="'请选择'"  style="width:200px">
        </yl-dataDictionaryForSel>
    <p>字典数据:{{value}}</p>


    <h6>单位字典库示例：</h6>
        <yl-comdatadictionary :code="'RECMAN'" v-model="value1"  :placeholder="'请选择'"  style="width:200px">
        </yl-comdatadictionary>
    <p>单位字典库数据:{{value1}}</p>
    


    <h6>组织结构树调用示例：</h6>
        <yl-organizeTree  v-model="origanizevalue"  :placeholder="'请选择'"  :isexpand="true" style="width:200px">
        </yl-organizeTree>
    <p>组织结构数据:{{origanizevalue}}</p>


    <h6 id="角色树">角色树调用示例：</h6>
        <yl-roleTree  v-model="role"  :placeholder="'请选择'" :isexpand="true"  style="width:200px">
        </yl-roleTree>
    <p>角色树数据:{{role}}</p>

    <div>
    <h6>组织结构树调用示例：</h6>
        <yl-organizeTreeWithPanel  @getCurrentNode="_getCrureentNode"  :placeholder="'请选择'"  :isexpand="false" style="width:200px">
        </yl-organizeTreeWithPanel>
    <p>组织结构数据:{{origanizeWithPanel}}</p>
    </div>

    <h6>区域调用示例：</h6>
        <yl-provinceCitySelTree  v-model="zone"  :placeholder="'请选择'" :isexpand="true"  style="width:200px">
        </yl-provinceCitySelTree>
    <p>区域数据:{{zone}}</p>



    <yl-GHTree v-model="ghid"  :placeholder="'请选择'" :defaultText="ghid" :isexpand="false"  style="width:200px"></yl-GHTree>
    <p>工号数据:{{ghid}}</p>

    <div>
    <h6>工号树调用示例：</h6>
        <yl-ghtreewithpanel   
        @getCurrentNode="_getCrureentNode1"  
        :placeholder="'请选择'"  
        style="width:200px">
        </yl-ghtreewithpanel>
    <p>工号树数据:{{organizeTreeWithPanel}}</p>
    </div>

    <yl-standardGHTree v-model="bzghid"  :placeholder="'请选择'" :defaultText="ghid" :isexpand="false"  style="width:200px"></yl-standardGHTree>
    <p>标准工号数据:{{bzghid}}</p>

    <div>
    <h6>标准工号树调用示例：</h6>
        <yl-standardGHTreeWithPanel   
        @getCurrentNode="_getCrureentNode2"  
        :placeholder="'请选择'"  
        style="width:200px">
        </yl-standardGHTreeWithPanel>
    <p>标准工号树数据:{{bzorganizeTreeWithPanel}}</p>
    </div>

    <yl-materialClassTree v-model="materialClassid"  
                        :placeholder="'请选择'" 
                        :defaultText="materialClassid" 
                        :isexpand="false"  
                        style="width:200px">
                        </yl-materialClassTree>
    <p>材料类别树数据:{{materialClassid}}</p>

    <div>
    <h6>材料类别树调用示例：</h6>
        <yl-materialClassTreeWithPanel   
        @getCurrentNode="_getCrureentNode3"  
        :placeholder="'请选择'"  
        style="width:200px">
        </yl-materialClassTreeWithPanel>
    <p>材料类别树数据:{{materialClassWithPanel}}</p>
    </div>


  <div id="供应商列表">
    <p>供应商列表组件示例：</p>
        <yl-comsupplier v-model="comsupplierText" @selectNode="selectNodeSupplier"></yl-comsupplier>
        <p>供应商:{{comsupplierText}}</p>
    </div>

 <div id="用料单位列表">
    <p>用料单位列表组件示例：</p>
        <yl-ComLabour v-model="comlabourText" @selectNode="selectNodeLabour"></yl-ComLabour>
        <p>用料单位:{{comlabourText}}</p>
    </div>

<div id="合同列表">
    <p>合同列表组件示例：</p>
        <yl-Contract v-model="contractText" ></yl-Contract>
        <p>合同:{{contractText}}</p>
    </div>

   <div id="jsonEditor">
        <p>jsonEditor组件示例</p>
        <yl-jsoneditor v-model="jsonText" ></yl-jsoneditor>
        <p>jsonEditor:{{jsonText}}</p>
    </div>
  <div id="quilleditor">
        <p>quilleditor</p>
        <quill-editor v-model="quilleditorText"
                        ref="myQuillEditor">
        </quill-editor>
        <p v-html="quilleditorText"></p>
 </div>
    </div>
    </yl-columnlay>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import dataDictionaryForTree from 'ocomponents/datadictionary/dataDictionaryForTree'
import organizeTree from 'ocomponents/organize/organizeTree'
import organizeTreeWithPanel from 'ocomponents/organize/organizeTreeWithPanel'
import roleTree from 'ocomponents/role/roleTree'
import provinceCitySelTree from 'ocomponents/provincecity/provinceCitySelTree'
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
import comdatadictionary from 'ocomponents/comdatadictionary/ComDataDictionary'
import GHTree from 'ocomponents/gh/GHTree'
import GHTreeWithPanel from 'ocomponents/gh/GHTreeWithPanel'
import standardGHTree from 'ocomponents/standardgh/standardGHTree'
import standardGHTreeWithPanel from 'ocomponents/standardgh/standardGHTreeWithPanel'
import materialClassTree from 'ocomponents/materialclass/materialClassTree'
import materialClassTreeWithPanel from 'ocomponents/materialclass/materialClassTreeWithPanel'
import ComSupplier from 'ocomponents/comsupplier/ComSupplier'
import ComLabour from 'ocomponents/comlabour/ComLabour'
import Contract from 'ocomponents/contract/Contract'
export default {
    data(){
        return{
            selectnode:{},
            value:'米',
            value1:'',
            origanizevalue:'f8e59cc1-33ef-40e4-a354-a77700c9e8a1',
            dataDictionaryText:'1-1-1',
            role:'2269e8e5-c34c-43e7-a907-a76300c082f3',
            origanizeWithPanel:'',
            zone:'亚洲',
            value3:100,
            date:'',
            ghid:'',
            organizeTreeWithPanel:'',
            bzghid:'',
            bzorganizeTreeWithPanel:'',
            materialClassid:'',
            materialClassWithPanel:'',
            comsupplierText:'',
            comlabourText:'',
            contractText:'',
            jsonText:'',
            markedText:'',
            quilleditorText:'',
            dialogVisible:false
        }
    },
    computed:{
        cdate:{
            get:function(){
                if(this.date===""){this.date=new Date();}
                return this.formatDate(this.date,'llll');
            },
            set:function(value){
                 if(value!==""){
                    this.date = this.formatDate(this.date,'llll');
                }else{
                     this.date =this.formatDate(new Date(),'llll');
                }
            }
        }
    },
    methods:{
        _getCurrentNode(selectnode){
            this.selectnode=selectnode;
        },
        _getCurrentvalue(val){
        },
        _getCrureentNode1(val){
           this.organizeTreeWithPanel=val
        },
         _getCrureentNode2(val){
           this.bzorganizeTreeWithPanel=val
        },
         _getCrureentNode3(val){
           this.materialClassTreeWithPanel=val
        },
        _getCrureentNode(node){
            this.origanizeWithPanel=node.text;
        },
        selectNodeSupplier(node){
            console.log(node);
        },
        selectNodeLabour(node){
            console.log(node);
        },
    },
    components:{
       'yl-dataDictionaryForTree':dataDictionaryForTree,
       'yl-dataDictionaryForSel':dataDictionaryForSel,
        'yl-comdatadictionary':comdatadictionary,
       'yl-organizeTree':organizeTree,
       'yl-roleTree':roleTree,
       'yl-organizeTreeWithPanel':organizeTreeWithPanel,
       'yl-provinceCitySelTree':provinceCitySelTree,
       'yl-GHTree':GHTree,
       'yl-ghtreewithpanel':GHTreeWithPanel,
       'yl-standardGHTree':standardGHTree,
       'yl-standardGHTreeWithPanel':standardGHTreeWithPanel,
       'yl-materialClassTree':materialClassTree,
       'yl-materialClassTreeWithPanel':materialClassTreeWithPanel,
       'yl-comsupplier':ComSupplier,
       'yl-ComLabour':ComLabour,
       'yl-Contract':Contract,
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.panelpage
    .title
        font-size:14px
        padding:3px
        :hover
            color:#20A0FF
</style>