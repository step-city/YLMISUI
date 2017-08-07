<template>
<yl-panelpage :titleName="'单位字典库'" >
<div slot="content">
  <yl-columnlay>
              <div slot="left"  >
                    <yl-panelzone  :treeLoading="treeLoading" @reload="_treeReload" :reloadIsShow="true" :titleName="'字典树'" :icon="'icon-tree'" :widthNum="'210px'" >
                        <div slot="content">
                            <el-tree :data="commonDataDictionaryTreeData"
                                      highlight-current 
                                      :props="defaultProps" 
                                      @node-click="_handleNodeClick"
                                      :render-content="renderContent"
                                      :expand-on-click-node="false"
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
                                            <el-input  placeholder="名称" size="small" style="width:200px" v-model="searchModel.decName"></el-input> 
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.CommonDataDictionarys.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.CommonDataDictionarys.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.CommonDataDictionarys.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
                    <Edit :selectRow="currentRows" :parentNode="parentNode" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './CommonDataDictionaryEdit';
import util from 'common/js/util';
import  {inputModel} from 'api/inputmodel';
import treeMixn from '@/mixns/tree.js';
import {
            requestGetCommonDataDictionaryPageList,
            requestDeleteCommonDataDictionary,
            requestGetCommonDataDictionaryTreeList
        }   from 'api/commondatadictionary';

export default {
    mixins: [treeMixn],
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                treeLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                       parentId:'',
                       decName:''  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
                commonDataDictionaryTreeData:[],
                parentNode:{},
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
                                {attr: { prop: 'fullName', label: '全称', width:120,  } },   
                                {attr: { prop: 'code', label: '编码', width:120,  } }, 
                                // {attr: { prop: 'orgId', label: '', width:120,  } },   
                                // {attr: { prop: 'parentId', label: '', width:120,  } },   
                                {attr: { prop: 'isTree', label: '树', width:120,  } },   
                                {attr: { prop: 'isLeaf', label: '子节点', width:120,  } },     
                                {attr: { prop: 'remark', label: '备注', width:120,  } },   
                                {attr: { prop: 'sortCode', label: '排序'} },
                            ]
                        }
                    }
                }
        },
    methods:{
         _getCommonDataDictionaryTreeList(){
            var _this=this;
            this.treeLoading=true;
            let params={};
            params.orgId=this.getUserInfo().user.manageOrgId;
            params.code='ORGDIC';
            requestGetCommonDataDictionaryTreeList(params).then(data => {
                            if(data.success){
                                this.commonDataDictionaryTreeData=data.result.children;
                            }
                            else {
                                 this.$message.error('失败！'+data.error.message);
                            }
                             _this.treeLoading=false;
                        }).catch(function (error) {
                                 _this.treeLoading=false;
                        });
        },
        _handleNodeClick(node){
            this.parentNode=node;
            this.searchModel.parentId=node.id;
            this._reload();
        },
         _treeReload(){
                this._getCommonDataDictionaryTreeList();
            },
        _getCommonDataDictionaryPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"ParentId",op:"EQ",value:this.searchModel.parentId},
                               {key:"FullName",op:"LIKE",value:this.searchModel.decName},
                                {key:"OrgId",op:"EQ",value:this.getUserInfo().user.manageOrgId}
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetCommonDataDictionaryPageList(this.mainInput.inputModel).then(data =>{
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
            this._getCommonDataDictionaryPageList();
        },
        _add(){
            if(this.parentNode.id!=undefined){
                this.addFormVisible=true;
                this.currentRows={};
            }else{
                this.$message.warning('请选择父节点');
            }
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
                requestDeleteCommonDataDictionary(obj).then(data =>{
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
        }

    },
    components:{
         Edit,
        },
    mounted(){
        this._getCommonDataDictionaryTreeList();
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

