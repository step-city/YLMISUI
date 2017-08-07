<template>
<yl-panelpage :titleName="'工号模板'" >
<div slot="content">
  <yl-columnlay>
              <div slot="left"  >
                    <yl-panelzone  :treeLoading="treeLoading" :reloadIsShow="true" :titleName="'工号模板树'" :icon="'icon-tree'" @reload="_treeReload" :widthNum="'210px'" >
                        <div slot="content">
                            <el-tree :data="templateGHTreeData" 
                                    :highlight-current="true"  
                                    :expand-on-click-node="false"  
                                    :props="defaultProps" 
                                    :render-content="renderContent"
                                    lazy
                                    :load="_loadNode"
                                    @node-click="_handleNodeClick" style="height:100%"></el-tree>
                        </div>
                    </yl-panelzone>
                </div>
                <div slot="right" >
                    <yl-layout>
                        <div slot="fristbox" >
                          <yl-toolbar>
                                <el-form  :inline="true"  >
                                        <el-form-item class="form-content-vertical">
                                         <el-input  placeholder="请输入名称" size="small" style="width:200px" v-model="searchModel.tName"></el-input>
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.TemplateGHs.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.TemplateGHs.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.TemplateGHs.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
                                        <template slot="isLeaf" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isLeaf">是</el-tag>
                                            <el-tag type="danger" v-else>否</el-tag>
                                        </template>
                                         <template slot="tName" scope="scope">
                                             {{scope.row.attName+scope.row.tName}}
                                        </template>
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
import Edit from './TemplateGHEdit';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetTemplateGHPageList,
            requestDeleteTemplateGH,
            requestGetTemplateGHTreeList,
            requestGetTemplateGHByParent
        }   from 'api/templategh';
import treeMixn from '@/mixns/tree.js';

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
                       tName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
                templateGHTreeData:[],
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
                                //{attr: { prop: 'parentId', label: '父节点', width:120,  } },   
                                // {attr: { prop: 'tCode', label: '编码', width:120,  } },   
                                {attr: { prop: 'tName', label: '名称', width:180, scopedSlot:"tName" } },   
                                //{attr: { prop: 'sId', label: '标准工号主键', width:120,  } },   
                                // {attr: { prop: 'sCode', label: '标准工号编码', width:120,  } },   
                                {attr: { prop: 'tFullName', label: '全称', width:220,  } },     
                                {attr: { prop: 'sName', label: '标准工号名称', width:120,  } }, 
                                {attr: { prop: 'mUnit', label: '计量单位', width:120,  } },   
                                {attr: { prop: 'unitConsume', label: '工程量', width:120,  } },   
                                {attr: { prop: 'isLeaf', label: '是否子节点', width:120, scopedSlot: 'isLeaf',align: 'center'  } },   
                                {attr: { prop: 'description', label: '描述', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', width:120,  } },   
                                {attr: { prop: 'sortCode', label: '排序'} },
                            ]
                        }
                    }
                }
        },
    methods:{
         _loadNode(node, resolve){
            if (node.level === 0) {
                 let params=this.guidOfNull();
                 this._getTemplateGHTreeList(params);
            }
            else{
                let params={};
                params.node=node.data.id;
                requestGetTemplateGHByParent(params).then(data=>{
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
         _getTemplateGHTreeList(val){
            let _this=this;
            this.treeLoading=true;
            let params={};
            params.node=val;
            requestGetTemplateGHByParent(params).then(data=>{
                if(data.success){
                         this.templateGHTreeData=data.result;
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
        
        _handleNodeClick(result, resolve) {  
                 //点击加载 
                  this.selectNode=result;
                  this._reload();
            },
         _treeReload(){
                 this._getTemplateGHTreeList(this.guidOfNull());
            },
        _getTemplateGHPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"TName",op:"LIKE",value:this.searchModel.tName},
                               {key:"ParentId",op:"EQ",value:this.selectNode.id}
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetTemplateGHPageList(this.mainInput.inputModel).then(data =>{
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
            this._getTemplateGHPageList();
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
                if(this.selectRows[0].parentId!=this.guidOfNull()){
                var obj={}; 
                obj.id=this.selectRows[0].id;
                requestDeleteTemplateGH(obj).then(data =>{
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
                }else{
                    this.$message.error('这一级不能删除');
                }
                
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
        this._getTemplateGHTreeList(this.guidOfNull());
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

