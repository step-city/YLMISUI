<template>
<yl-panelpage :titleName="'功能管理'" >
<div slot="content">
     <yl-columnlay>
                <div slot="left"  >
                    <yl-panelzone   :titleName="'功能树'"  :treeLoading="treeLoading"   @reload="_treeReload" :reloadIsShow="true" :icon="'icon-tree'" :widthNum="'200px'" >
                        <div slot="content">
                            <el-tree 
                            :data="functionTreeData" 
                            :expand-on-click-node="false"  
                            :props="defaultProps" 
                            :render-content="renderContent"
                            @node-click="_handleNodeClick" 
                            style="height:100%"></el-tree>
                        </div>
                    </yl-panelzone>
                </div>
                <div slot="right" >
                    <yl-layout>
                        <div slot="fristbox" >
                        <yl-toolbar>
                                <el-form  :inline="true"  >
                                        <el-form-item class="form-content-vertical">
                                            <el-input  placeholder="功能名称" size="small" style="width:200px" v-model="searchModel.funcName"></el-input>  
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                            </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary"  size="small"   @click="_add" ><i class="icon-plus"></i>添加</el-button>
                                    <el-button type="primary"  size="small"  :disabled="selectRows.length===0"   @click="_edit"><i class="icon-pencil"></i>编辑</el-button>
                                    <el-button type="primary"  size="small"  :disabled="selectRows.length===0"   @click="_createAllFunction"><i class="icon-magic-wand"></i>引入系统</el-button>
                                    <el-button type="danger"   size="small"  :disabled="selectRows.length===0"  @click="_delete" ><i class="icon-trashcan"></i>删除</el-button>
                                </el-button-group>
                            </yl-toolbar>
                        </div>
                        <div slot="secondbox" class="flexbox">
                                <yl-table ref="table"
                                    @reload="_reload"
                                    @current-change="_currentChange"
                                    :configs="tableConfig" 
                                    :input="mainInput.inputModel"
                                    :tableloading="mainTableLoading" 
                                    >
                                <!--自定义列模板
                                        <template slot="isDisable" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.showFlag">启用</el-tag>
                                            <el-tag type="danger" v-else>禁用</el-tag>
                                        </template>
                                        -->
                                </yl-table>
                        </div>
                    </yl-layout>
               </div>
     </yl-columnlay>
    <!--编辑界面-->
         <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './FunctionEdit';
import util from 'common/js/util';
import treeMixn from '@/mixns/tree.js';
import  {inputModel,requestGetPermissionShow} from 'api/inputmodel';
import {
            requestGetFunctionPageList,
            requestDeleteFunction,
            requestGetFunctionTreeList,
            requestCreateAllFunction
        }   from 'api/function';

export default {
    mixins: [treeMixn],
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                       funcName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
                functionTreeData:[],
                selectNode:{id:"00000000-0000-0000-0000-000000000000"},
                defaultProps: {
                        children: 'children',
                        label: 'text',
                        id: 'id'
                    },
                treeLoading:false,
            }
    },
     computed: {
            tableConfig: {
                    get () {
                        return {
                            table: {
                                attr: {
                                    data: this.tableData,
                                    highlightCurrent:true,
                                }
                            },
                            columns: [
                                {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                           //     {attr: { prop: 'parentId', label: '父节点编号', width:120,  } },   
                                {attr: { prop: 'appCode', label: '系统编码', width:120,  } },   
                                {attr: { prop: 'funcCode', label: '功能编码', width:210,  } },   
                                {attr: { prop: 'funcName', label: '功能名称', width:120,  } },   
                                {attr: { prop: 'methodName', label: '方法名称', width:210,  } },  
                                {attr: { prop: 'description', label: '描述'  } }, 
                            ]
                        }
                    }
                }
        },
    methods:{
        _getFunctionTreeList(){
                this.treeLoading=true;
                let _this=this;
            requestGetFunctionTreeList().then(data => {
                            if(data.success){
                                this.functionTreeData=util.returnDatabyTree(data.result,'00000000-0000-0000-0000-000000000000');
                            }
                            else {
                                 _this.$message.error('失败！'+data.error.message);
                            }
                            this.treeLoading=false;
                        })
        },
        _createAllFunction(){
             let prams={functionInfo:this.selectRows[0]}; 
                let _this=this;
             requestCreateAllFunction(prams).then(data => {
                            if(data.success){
                                this._getFunctionTreeList();
                                this._reload();
                                this.$message.success('引入成功..');
                                
                            }
                            else {
                                  _this.$message.error('失败！'+data.error.message);
                            }
                        })
        },
        _handleNodeClick(result, resolve) {  
                 //点击加载 
                  this.selectNode=result;
                  this._reload();
            },
        _getFunctionPageList(){
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"FuncName",op:"LIKE",value:this.searchModel.funcName},
                               {key:"ParentId",op:"EQ",value:this.selectNode.id},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetFunctionPageList(this.mainInput.inputModel).then(data =>{
                            if(data.success){
                                this.tableData=data.result;
                                }
                            else {
                               this.$message.error('失败！'+data.error.message);
                            }
                          this.mainTableLoading=false;
                }).catch(function(error){
                       this.mainTableLoading=false;
                });
        },
        _currentChange(val){
                //单选时的方法
                if(val!=null){
                     this.selectRows=[];
                     this.selectRows.push(val);
                }
               
            },
        _selectionChange(val){
            //多选时的方法
            if(val!=null){
                this.selectRows=[];
                this.selectRows=this.selectRows.concat(val);
            }
        },
        toggleRowSelection (row) {
            this.$refs.table.toggleRowSelection(row)
        },
        _reload(){
            this._getFunctionPageList();
        },
        _add(){
            this.addFormVisible=true;
            this.currentRows={};
        },
        _edit(){
                this.addFormVisible=true;    
                this.currentRows=this.selectRows[0];
        },
        _delete(){
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
                var obj={}; 
                obj.id=this.selectRows[0].id;
                requestDeleteFunction(obj).then(data =>{
                        if(data.success){
                                this._reload();
                                this.$notify({
                                    title: '成功',
                                    message: '删除数据成功！',
                                    type: 'success'
                                    });
                            }
                            else {
                                this.$notify.error({
                                    title: '错误',
                                    message: '删除数据失败！'+data.error.message,
                                    });
                            }
                });
            })
        },
        _close(){
                this.addFormVisible=false;
                this._reload();
        },
        _treeReload(){
                this._getFunctionTreeList();
            }, 
    },
    components:{
         Edit,
        },
    mounted(){
        this._getFunctionTreeList();
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

