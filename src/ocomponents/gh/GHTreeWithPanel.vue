<template>
    <yl-panelzone  
        :treeLoading="treeLoading" 
        :reloadIsShow="false" 
        @reload="_treeReload"  
        :titleName="'工号树'" 
        :icon="'icon-tree'" 
        :widthNum="'200px'" >
        <div slot="content">
            <el-tree 
                :highlight-current="true"
                :data="treeData" 
                :expand-on-click-node="false"  
                :props="defaultProps" 
                :load="loadNode"
                :render-content="renderContent"
                lazy
                @node-click="_handleNodeClick" 
                style="height:100%">
            </el-tree>
        </div>
    </yl-panelzone>
</template>

<script type="text/babel">
import treeMixn from '@/mixns/tree.js';
import {requestGetGHByParent} from 'api/gh'
export default {
    mixins: [treeMixn],
    data(){
        return{
            treeData:[],
            loaddata:[],
            selectNode:{id:""},
            defaultProps: {
                    children: 'children',
                    label: 'text',
                    id: 'id'
                },
            treeLoading:false,
            filterText:'',
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
            // requestGetGHByParent(this.selectNode.id).then(data=>{
            //         if(data.success){
            //                  this.resolvefn(data.result)
            //             }
            //             else {
            //                 this.$message.error('获取数据失败！');
            //             }
            //         this.treeLoading=false;
            //     })
            //实现加载第一级
            
        },
        loadNode(node, resolve){
            let on=true;
            if (node.level === 0) {
              resolve([{
                        id: this.guidOfNull(),
                        text:this.getUserInfo().user.manageOrgName,
                        isCheck:false,
                        isDelivery:false,
                    }]);
            }
            else{
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
                    requestGetGHByParent(node.data.id).then(data=>{
                        if(data.success){
                                resolve(data.result)
                            }
                            else{
                                this.$message.error('获取数据失败！');
                            }
                        this.treeLoading=false;
                    })
                  }
                
            }
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
