<template>
    <yl-panelzone  
        :treeLoading="treeLoading" 
        :reloadIsShow="false" 
        @reload="_treeReload"  
        :titleName="'材料类别树'" 
        :icon="'icon-tree'" 
        :widthNum="'200px'" >
        <div slot="content">
            <el-tree 
                    highlight-current
                    :data="treeData" 
                    :expand-on-click-node="false"  
                    :props="defaultProps" 
                    lazy
                    :load="loadNode"
                    :render-content="renderContent"  
                    @node-click="_handleNodeClick" 
                    style="height:100%">
            </el-tree>
        </div>
    </yl-panelzone>
</template>

<script type="text/babel">
import treeMixn from 'src/mixns/tree.js';
import {requestGetMaterialClassByParent} from 'api/materialclass'
export default {
    mixins: [treeMixn],
    data(){
        return{
            treeData:[],
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
    },
    computed:{
	},
    methods:{
        _handleNodeClick(result, resolve){
            this.selectNode=result;
            this.$emit('getCurrentNode',result);
        },
        _treeReload(){
            this._getMaterialClassList()
        },
        loadNode(node, resolve){
            if (node.level === 0) {
                 let params=this.guidOfNull();
                 this._getMaterialClassList(params);
            }
            else{
                requestGetMaterialClassByParent(node.data.id).then(data=>{
                    if(data.success){
                             resolve(data.result)
                        }
                        else {
                            this.$message.error('获取数据失败！');
                        }
                    this.treeLoading=false;
                })
            }
        },
        _getMaterialClassList(val){
            let _this=this;
            this.treeLoading=true;
            requestGetMaterialClassByParent(val).then(data=>{
                if(data.success){
                         this.treeData=data.result;
                    }
                    else {
                        this.$message.error('获取数据失败！');
                    }
                 this.treeLoading=false;
            }).catch(function(error){
                 _this.$message.error('获取数据失败！');
                 this.treeLoading=false;
            })
        },
       
    },
    mounted(){
        
    },
    components:{

    },
    watch:{
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
