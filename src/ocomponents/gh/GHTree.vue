<template>
    <yl-treeselect 
        :value="value" 
        :treedata="treedata" 
        :loaddata="loaddata" 
        :stepByOne="stepByOne" 
        :defaultProps="defaultProps" 
        :isexpand="isexpand" 
        :textOnly="textOnly"
        :size="size"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :autofocus="autofocus"
        :placeholder="placeholder"
        :filterTextVisibe="filterVisibe"
        :defaultText="defaultText"
        :nodeStateConf="nodeStateConf"
        @getCurrentNode="_getCurrentNode" 
        @nodeExpend="_nodeExpend"
    >
    </yl-treeselect>
</template>

<script type="text/babel">
import {requestGetGHByParent} from 'api/gh'
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
       nodeStateConf:{
                        required: false,
                        type: Array,
                        default: function () {
                            return []
                        }
       }     
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
        _nodeExpend(node){
                   //加载到核算工号
                //    if(this.isCheck){
                //         if(node.data.isCheck){
                //             node.isLeaf=true;
                //             node.loaded=true;
                //             node.loading=false;
                //             return;
                //         }
                //    }
                   //加载到发料工号
                //     if(this.isDelivery){
                //         if(node.data.isDelivery){
                //             node.isLeaf=true;
                //             node.loaded=true;
                //             node.loading=false;
                //             return;
                //         }
                //    }
                let params=node.data.id; 
                this._getGHTreeList(params);
             
        },
        _getGHTreeList(val){
            requestGetGHByParent(val).then(data=>{
                    if(data.success){
                          this.loaddata=data.result; 
                    }
                    else {
                        this.$message.error('获取数据失败！');
                    }
            })
        }
    },
    mounted(){  
        this.treedata=[{
            id: this.guidOfNull(),
            text:this.getUserInfo().user.manageOrgName,
            fullName:this.getUserInfo().user.manageOrgName,
            isCheck:false,
            isDelivery:false,
          }]
    },
    components:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
