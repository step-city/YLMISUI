<template>
    <yl-treeselect 
    :value="value" 
    :treedata="treedata" 
    :loaddata="loaddata" 
    :stepByOne="stepByOne" 
    :defaultProps="defaultProps" 
    :isexpand="isexpand" 
    :textOnly="textOnly"
    :defaultText="defaultText"
    :size="size"
    :readonly="readonly"
    :disabled="disabled"
    :maxlength="maxlength"
    :minlength="minlength"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :filterTextVisibe="filterVisibe"
    @getCurrentNode="_getCurrentNode" 
    @nodeExpend="_nodeExpend"
    >
    </yl-treeselect>
</template>

<script type="text/babel">
import {requestGetStandardGHByParent} from 'api/standardgh'
export default {
    data(){
        return{
            treedata:[],
            loaddata:[],
            defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
            },
            stepByOne:true,
            textOnly:false,
        }
    },
    props:{
        isexpand:{type: Boolean,default: false },
        value:[String,Number],
        defaultText:{
                    type:String,
                    default:''
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
       filterVisibe:{
                    type: Boolean,
                    default: false,
       },    
    },
    methods:{
        _getCurrentNode(selectNode){
              if(this.textOnly){ 
                this.$emit('input',selectNode.text);
                }
            else{ 
                this.$emit('input',selectNode.id);
                }
             this.$emit('getCurrentNode',selectNode);
        },
        _nodeExpend(result){
             if(this.stepByOne){
                 //逐步加载
               let params=result.data.id; 
               this._getGHTreeList(params);
             }
        },
        _getGHTreeList(val){
            requestGetStandardGHByParent(val).then(data=>{
                    if(data.success){
                        if(val!=this.guidOfNull()){
                           this.loaddata=data.result;
                        }else{
                            this.treedata=data.result;
                         }  
                    }
                    else {
                        this.$message.error('获取数据失败！');
                    }
            })
        }
    },
    mounted(){  
        let params=this.guidOfNull();
        this._getGHTreeList(params);
    },
    components:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>