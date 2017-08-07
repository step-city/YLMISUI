<template>
    <yl-panelzone  
    :treeLoading="treeLoading" 
    :reloadIsShow="true" 
    @reload="_treeReload"  
    :titleName="'组织机构树'" 
    :icon="'icon-tree'" 
    :widthNum="'210px'" >
        <div slot="content">
            <el-tree :data="organizeTreeData" 
                    :expand-on-click-node="false"  
                    :props="defaultProps" 
                    :default-expand-all="isexpand"
                    :render-content="renderContent"  
                    @node-click="_handleNodeClick" 
                    style="height:100%">
            </el-tree>
        </div>
    </yl-panelzone>
</template>

<script type="text/babel">
import treeMixn from '@/mixns/tree.js';
import {requestGetOrganizeTreeList} from 'api/organize'
export default {
    mixins: [treeMixn],
    data(){
        return{
            organizeTreeData:[],
            selectNode:{id:""},
            defaultProps: {
                    children: 'children',
                    label: 'text',
                    id: 'id'
                },
            treeLoading:false,
        }
    },
    props:{
        isexpand:{type: Boolean,default: false },
    },
    methods:{
        _handleNodeClick(result, resolve){
             this.selectNode=result;
             this.$emit('getCurrentNode',result);
        },
        _treeReload(){
            this._getOrganizeTreeList();
        },
        _getOrganizeTreeList(){
            let _this=this;
            this.treeLoading=true;
            requestGetOrganizeTreeList().then(data=>{
                if(data.success){
                        this.organizeTreeData=data.result;
                    }
                else {
                    this.$message.error('获取数据失败！');
                }
                 this.treeLoading=false;
            }).catch(function(error){
                 _this.$message.error('获取数据失败！');
                 _this.treeLoading=false;
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
