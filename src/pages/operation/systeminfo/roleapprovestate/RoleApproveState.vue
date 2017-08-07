<template>
<yl-panelpage :titleName="'审批管理'" >
<div slot="content">
  <yl-columnlay>
              <div slot="left"  >
                    <yl-panelzone  :treeLoading="treeLoading" :reloadIsShow="true" @reload="_treeReload" :titleName="'菜单树'" :icon="'icon-tree'" :widthNum="'210px'" >
                        <div slot="content">
                             <el-tree :data="menuTreeData" 
                             :render-content="renderContent" 
                             :expand-on-click-node="false"  
                             :props="defaultProps"  
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
                                     <!--定义过滤条件    -->
                                         <el-input  placeholder="审批名称" size="small" style="width:200px" v-model="searchModel.StateText"></el-input>
                                         </el-form-item>
                                         <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Set.RoleApproveStates.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Set.RoleApproveStates.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Set.RoleApproveStates.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
                                    <template slot="boolValue" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.boolValue">正向</el-tag>
                                            <el-tag type="danger" v-else>逆向</el-tag>
                                        </template>
                                     <template slot="isState" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isState">是</el-tag>
                                            <el-tag type="danger" v-else>否</el-tag>
                                        </template>
                                   <!--自定义列模板
                                       
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
import Edit from './RoleApproveStateEdit';
import util from 'common/js/util';
import treeMixn from '@/mixns/tree.js';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetRoleApproveStatePageList,
            requestDeleteRoleApproveState
        }   from 'api/roleapprovestate';
import {    
            requestGetMenuItemTreeList,
        }   from 'api/menuitem';
export default {
    mixins: [treeMixn],
    data(){
        return {
                tableData:{},
                menuTreeData: [],
                mainTableLoading:false,
                treeLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                       StateText:'',  
                       menuName:'',
                },
                addFormVisible:false,
                mainInput:new inputModel(),
                selectNode:{id:""},
                defaultProps: {
                        children: 'children',
                        label: 'text',
                        id: 'id'
                    },
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
                                // {attr: { prop: 'roleId', label: ' 角色id', width:120,  } }, 
                                 {attr: { prop: 'stateDesc', label: '审批标题', width:120,  } },    
                                {attr: { prop: 'roleName', label: '角色名称', width:120,  } },   
                                {attr: { prop: 'tableName', label: '表名', width:120,  } },   
                                {attr: { prop: 'muduleName', label: '模块名称', width:120,  } },   
                                {attr: { prop: 'stateValue', label: '审批状态值', width:120,scopedSlot: 'stateValue',  } },   
                                {attr: { prop: 'boolValue', label: '流程方向', width:120, scopedSlot: 'boolValue', } },   
                                {attr: { prop: 'stateText', label: '状态文本值', width:120,  } },   
                                {attr: { prop: 'isState', label: '是否为初始值', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', width:120,  } },   
                            ]
                        }
                    }
                }
        },
    methods:{
          _handleNodeClick(result, resolve) {  
                 //点击加载 
                  this.selectNode=result;
                  this.searchModel.menuName=result.text;
                  this._reload();
            },
        //一次加载树
        _getGetMenuItemTreeList(){
            let _this=this;
            this.treeLoading=true;
            requestGetMenuItemTreeList().then(data => {
                    if(data.success){
                        this.menuTreeData=util.returnDatabyTree(data.result,this.guidOfNull());
                    }
                    else {
                        this.$message.error('获取数据失败！'+data.error.message);
                    }
                        this.treeLoading=false;
                }).catch(function (error) {
                        _this.treeLoading=false;
                });
        },
         _treeReload(){
                this._getGetMenuItemTreeList();
            },
        _getRoleApproveStatePageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"StateText",op:"LIKE",value:this.searchModel.StateText},
                               {key:"MuduleName",op:"EQ",value:this.searchModel.menuName},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetRoleApproveStatePageList(this.mainInput.inputModel).then(data =>{
                            if(data.success){
                                this.tableData=data.result;
                                }
                            else {
                                this.$message.error('失败！'+data.error.message);
                            }
                          this.mainTableLoading=false;
                }).catch(function(error){
                       _this.mainTableLoading=false;
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
            this._getRoleApproveStatePageList();
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
                requestDeleteRoleApproveState(obj).then(data =>{
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
        _close(bool){
            if(bool){
                this.addFormVisible=false;
            }
            this._reload();
        },

    },
    components:{
         Edit,
        },
    mounted(){
        this._getGetMenuItemTreeList();
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

