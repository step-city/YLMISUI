<template>
    <div>
        <el-form  :model="formModel" ref="formModel" label-width="100px">

            <el-tree :data="templateGHTreeData" 
            class="filter-tree"
            :expand-on-click-node="false" 
            :props="defaultProps" 
            @node-click="_handleNodeClick" 
            :highlight-current="true"
            ref="tree2"
            style="height:250px;"></el-tree>

            <el-form-item style="text-align:right;" >
                <el-button type="primary" @click="_onSubmit" :loading="loading">导入</el-button>
            </el-form-item>

         </el-form>
    </div>
</template>

<script type="text/babel">
import {
            requestGetTemplateGHTreeList
        }   from 'api/templategh';
import {
            requestImportGHTemplate
        }   from 'api/gh'
import {requestExecuteSqlAndProcCommand} from 'api/sqlexecute'
export default {
    data(){
        return{
            templateGHTreeData:[],
            selectNode:{id:""},
            defaultProps: {
                        children: 'children',
                        label: 'text',
                        id: 'id'
                    },
            loading:false,
            formModel:{},
        }
    },
    props:{
        selectNds:{},
        isVisible:false
    },
    methods:{
        filterNode(value, data) {
             if (!value) return true;
             return data.id == value;
        },
         _getTemplateGHTreeList(){
            requestGetTemplateGHTreeList().then(data => {
                            if(data.success){
                                this.templateGHTreeData=data.result;
                            }else {
                                 this.$message.error('失败！'+data.error.message);
                            }
                        })
        },
         _handleNodeClick(result, resolve) {
                  this.selectNode=result; 
            },
        _onSubmit(){
            let params={};
            params.procType=1;
            params.firstKeys="Id,TId";
            params.firstValues=this.selectNds.id+","+this.selectNode.id;
            params.secondKeys="";
            params.secondOperates="";
            params.secondValues="";
            params.procName="C_ImportGHTemplate";
            requestExecuteSqlAndProcCommand(params).then(data=>{
            if(data.success){
                    this.$notify({
                        title: '成功',
                        message: '保存数据成功！',
                        type: 'success'
                        });
                    //关闭面板
                    this._complete();
                }
                else {
                    this.$message.error('失败！'+data.error.message);
                }
                    this.loading=false;
            })
        },
         _complete(){
                this.$emit('close');
            },
    },
    watch: {
    },
    mounted(){
        // console.log(this.selectNds);
        this._getTemplateGHTreeList();
        this.filterText=this.selectNds.id;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
