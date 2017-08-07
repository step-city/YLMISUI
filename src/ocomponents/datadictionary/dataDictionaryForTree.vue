<template>
    <yl-treeselect 
    :value='value' 
    :treedata="treedata" 
    :textOnly="textOnly"
    :defaultProps="defaultProps" 
    :isexpand="isexpand"
    :size="size"
    :readonly="readonly"
    :disabled="disabled"
    :maxlength="maxlength"
    :minlength="minlength"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :filterTextVisibe="filterVisibe"
    @getCurrentNode="_getCurrentNode" >
    </yl-treeselect>
</template>

<script type="text/babel">
import util from 'common/js/util';
import fetch from 'api/fetch';
export default {
    data(){
        return{
            treedata:[],
            defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
            },
            textOnly:true,
        }
    },
    props:{
       code:{
			required: true,
            type: String,
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
        isexpand:{type: Boolean,default: false },
        value:[String,Number],
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
        _getOrganizeTreeList(){
                fetch({
                    url:'api/services/app/commonLibrary/GetDataDictionaryByCode?code='+this.code,
                    method:'post'
                    }).then(data => {
                        if(data.success){
                            if(data.result.isTree){
                                this.treedata=data.result.selectModelDtos;
                            }
                        }
                        else {
                            this.$message.error('获取数据失败！');
                        }
                    })
            },
    },
    mounted(){
        this._getOrganizeTreeList();
    },
    components:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
