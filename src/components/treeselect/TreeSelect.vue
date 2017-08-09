<template>
<div class="treeSelect">
    <el-input 
        type="text" 
        :size="size"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :icon="icon"
        @focus="_focus" 
        :on-icon-click="_iconClick"
        :value="currentValue">
    </el-input>
    <div :class="{'visibility':inputTreeIsVisibe}"  class="inputTree" >
        <el-input
            v-if="filterVisibe"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            size="small"
            class="filter-style">
        </el-input>
        <el-tree 
            ref="treeSelect"
            :lazy="stepByOne"  
            :default-expand-all="isexpand"  
            :data="treedata" 
            :expand-on-click-node="false" 
            :props="defaultProps" 
            :load="loadNode"
            :filter-node-method="filterNode"
            :render-content="renderContent"
            @node-click.self="handleNodeClick"
        >
        </el-tree>
    </div>
</div>
</template>

<script type="text/babel">
import treeMixn from 'src/mixns/tree.js';
import util from 'common/js/util'
export default {
    name: 'YlTreeSelect',
    componentName: 'YlTreeSelect',
    mixins: [treeMixn],
     data() {
      return {
         inputTreeIsVisibe:true,
         selectNode:{},
         loadNodeParams:{},
         icon: "caret-bottom",
         filterText:'',
      };
    },
    props:{
		treedata:{
                    type: Array,
                    default:[] 
                 },
        loaddata:{
                    required: false,
                    type: Array,
                    default: function () {
                        return []
                    }
                  },
        isexpand:{
                    type: Boolean,
                    default: false,
                  },
        defaultProps:Object,
        value:[String,Number],//显示名称
        textOnly:{
                    //是否值使用文本值
                    type:Boolean,
                    default:false,
                  }, 
        stepByOne:{
                   //是否一次加载一级
                    type:Boolean,
                    default:false,
                   },
       defaultText:{
                    type:String,
                    default:'',
       },
       size:{
                    type: String,
                    default: "", 
       },
       readonly:{
                    type: Boolean,
                    default: false 
       }, 
       disabled:{
                    type: Boolean,
                    default: false 
       }, 
       maxlength:{
                    type: Number,
       }, 
       minlength:{
                    type: Number,
       }, 
       placeholder:{
                    type: String,
                    default: "" ,
       }, 
       autofocus:{
                    type: Boolean,
                    default: false,
       },
       filterTextVisibe:{
                    type: Boolean,
                    default:true,
       },
       validateEvent: {
                            type: Boolean,
                            default: true
                       },

	},
    computed:{
        filterVisibe:{
             get(){
                if(this.stepByOne) {
                    return false;
                }else{
                    return this.filterTextVisibe;
                }
            }
        },
        currentValue:{
            get(){
                    if(this.textOnly){
                        //只使用文本时显示文本信息
                        return this.value;
                    }  
                    if(this.stepByOne){
                        //异步赋值时，显示名称为传进来的值
                        if(this.selectNode.id==undefined){
                            return this.defaultText
                        }
                        else{
                            return this.selectNode.text;
                        }
                    } 
                    if(this.treedata.length!=0){
                        if(this.selectNode.id==undefined){
                            util.node.getNameByID(this.treedata,this.value);
                            let text=util.node.nodeName;
                            if(this.value!=''){
                                return text;
                            }else{
                                return "";
                            } 
                        }else{
                            return this.selectNode.text;
                        }
                    }
                    return "";
            }
        }
    },
    methods: {
        handleNodeClick(result) {  
                    //点击加载 
                    this.selectNode=result;  
                      if(this.textOnly){ 
                            this.$emit('input',this.selectNode.text);
                            }
                        else{ 
                            this.$emit('input',this.selectNode.id);
                            }
                    this.$emit('getCurrentNode',this.selectNode);
                    this.inputTreeIsVisibe=true;
                     //在此处通过递归处理node 获取全部加载情况的全称
        },
        loadNode(node, resolve){
            let on=true;
            this.loadNodeParams.node=node;
            this.loadNodeParams.resolve=resolve;
            if (node.level === 0) {
              resolve(this.treedata);
            }else
            {
              if(this.stepByOne){
                  this.nodeStateConf.map(item=>{
                    if(item.leafflag){
                        if(node.data[item.name]){
                            node.isLeaf=true;
                            node.loaded=true;
                            node.loading=false;
                            on=false;
                            return;
                        }
                   }
                  })
                  if(on){
                        this.$emit('nodeExpend',node);
                    }
              }
            }
            //在此处通过递归处理node 获取逐步情况的全称
        },
        _loadNode(data){
            this.loadNodeParams.resolve(data);
        },
        _focus(){
            this.inputTreeIsVisibe=false;
        },
        _iconClick(){
             this.inputTreeIsVisibe=true;
        },
            //触发表单验证
            // if (this.validateEvent) {
            //         this.dispatch('ElFormItem', 'el.form.change', [this.value]);
            //     }
        filterNode(value, data) {
            if (!value) return true;
            return data.text.indexOf(value) !== -1;
        },
    },
    mounted(){
    },
    watch:{
        loaddata:function (val, oldVal) {
            this._loadNode(val);
        },
        inputTreeIsVisibe:function (val, oldVal) {      
           if(val){
                this.icon="caret-bottom";
           }else{
                this.icon="caret-top";
           }
        },
        filterText(val) {
            this.$refs.treeSelect.filter(val);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" >
.treeSelect
    position: relative
    font-size: 12px
    display: inline-block
    width: 100%
    .inputTree
        position:absolute
        z-index:3000
        left:0
        top:32px
        width:100%
        height:auto
        max-height:250px
        overflow:auto
        box-sizing: border-box 
        border: 1px solid rgb(191, 203, 217)
        .filter-style.el-input__inner 
            border: 1px solid rgb(191, 203, 217)
    .visibility
        visibility:hidden

</style>
