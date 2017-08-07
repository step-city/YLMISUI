<template>
<yl-panelpage :titleName="'表信息配置'" >
<div slot="content">
  <yl-columnlay>
              <div slot="left"  >
                    <yl-panelzone  :treeLoading="treeLoading"  :titleName="'表结构树'" @reload="_treeReload" :reloadIsShow="true" :icon="'icon-tree'" :widthNum="'210px'" >
                        <div slot="content">
                            <el-tree :data="tableColConfigTreeData"  :highlight-current="true"  :props="defaultProps" @node-click="_handleNodeClick" style="height:100%"></el-tree>
                        </div>
                    </yl-panelzone>
                </div>
                <div slot="right" >
                    <yl-layout>
                        <div slot="fristbox" >
                          <yl-toolbar>
                                <el-form  :inline="true"  >
                                        <el-form-item class="form-content-vertical">
                                                <el-input  placeholder="列名" size="small" style="width:200px" v-model="searchModel.colName"></el-input> 
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Set.TableColConfigs.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Set.TableColConfigs.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Set.TableColConfigs.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                                    <el-button type="primary"   icon="plus"  size="small"  @click="_addTable" >添加表</el-button>
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
                                     <template slot="isDisable" scope="scope" >
                                        <el-tag type="primary" v-if="scope.row.isDisable">启用</el-tag>
                                        <el-tag type="danger" v-else>禁用</el-tag>
                                    </template>
                                     <template slot="isFormShow" scope="scope">
                                        <el-tag type="primary" v-if="scope.row.isFormShow">是</el-tag>
                                        <el-tag type="danger" v-else>否</el-tag>
                                    </template>
                                    <template slot="isPrintShow" scope="scope">
                                        <el-tag type="primary" v-if="scope.row.isPrintShow">是</el-tag>
                                        <el-tag type="danger" v-else>否</el-tag>
                                    </template>
                                    <template slot="isNull" scope="scope">
                                        <el-tag type="primary" v-if="scope.row.isNull">是</el-tag>
                                        <el-tag type="danger" v-else>否</el-tag>
                                    </template>
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
                    <Edit :selectRow="currentRows" :selectNode="selectNode" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
     <!--添加表界面-->
         <el-dialog ref="tableConfigDialog" title="增加表" v-model="addTableFormVisible" size="large"  top="3%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <TableConfig @close="_closeTable"></TableConfig>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './TableColConfigEdit';
import TableConfig from './TableConfig'
import  {inputModel} from 'api/inputmodel';
import {
            requestGetTableColConfigPageList,
            requestDeleteTableColConfig
        }   from 'api/tablecolconfig';
import {
            requestGetTableConfigs
        } from 'api/tableconfig';
export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                       colName:''
                    },
                addFormVisible:false,
                addTableFormVisible:false,
                mainInput:new inputModel(),
                tableColConfigTreeData:[],
                selectNode:{},
                defaultProps: {
                        children: 'children',
                        label: 'tableName',
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
                                //{attr: { prop: 'tableId', label: '表主键', width:120,  } },   
                                {attr: { prop: 'tableName', label: '表名称', width:150,  } },   
                                {attr: { prop: 'colName', label: '列名称', width:150,  } },   
                                {attr: { prop: 'colTitle', label: '列显示名称', width:120,  } },   
                                {attr: { prop: 'colType', label: '列类型', width:120,  } },   
                                {attr: { prop: 'isDisable', label: '启用状态', width:100, align: 'center',scopedSlot: 'isDisable', } },   
                                {attr: { prop: 'isFormShow', label: '表单状态', width:100, align: 'center', scopedSlot: 'isFormShow', } },   
                                {attr: { prop: 'isPrintShow', label: '打印状态', width:100, align: 'center', scopedSlot: 'isPrintShow', } },   
                                {attr: { prop: 'colWidth', label: '列宽', width:100,  } },   
                                {attr: { prop: 'colPrecision', label: '精度', width:100,  } },   
                                {attr: { prop: 'maxLenth', label: '最大值', width:100,  } },   
                                {attr: { prop: 'minLength', label: '最小值', width:80,  } },   
                                {attr: { prop: 'errorMessage', label: '错误信息', width:180,  } },   
                                {attr: { prop: 'isNull', label: '不能为空', width:110, align: 'center',scopedSlot: 'isNull',  } },   
                                {attr: { prop: 'remark', label: '说明', width:120,  } },   
                                {attr: { prop: 'sortCode', label: '排序'} },
                            ]
                        }
                    }
                }
        },
    methods:{
         _getTableColConfigTreeList(){
                this.treeLoading=true;
            requestGetTableConfigs().then(data => {
                            if(data.success){
                                this.tableColConfigTreeData=data.result.data;
                            }
                            else {
                                 this.$message.error('失败！'+data.error.message);
                            }
                this.treeLoading=false;
                        });
        },
        _handleNodeClick(result){
                this.selectNode=result;
                this._reload();
        },
        _getTableColConfigPageList(){
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[];
                inputArr.push({key:"TableName",op:"EQ",value:this.selectNode.tableName}),
                inputArr.push({key:"ColName",op:"LIKE",value:this.searchModel.colName})
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetTableColConfigPageList(this.mainInput.inputModel).then(data =>{
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
            this._getTableColConfigPageList();
        },
        _add(){
            if(this.selectNode.tableName===undefined){
                this.$message.warning('请选择要添加的表！');
                return false;
            }
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
                requestDeleteTableColConfig(obj).then(data =>{
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
            });
        },
        _close(){
                this.addFormVisible=false;
                this._reload();
        },
        _addTable(){
            this.addTableFormVisible=true;
        },
        _closeTable(){
            this.addTableFormVisible=false;
            this._reload();
        },
        _treeReload(){
                this._getTableColConfigTreeList();
            }, 

    },
    components:{
         Edit,
         TableConfig
        },
    mounted(){
        this._getTableColConfigTreeList();
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

