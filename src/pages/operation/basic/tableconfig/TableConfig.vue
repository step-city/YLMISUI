<template>
<div>
    <yl-layout :border="true">
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                                <el-input  placeholder="表名" size="small" style="width:200px" v-model="searchModel.tableName"></el-input> 
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        <yl-toolbar>
            <el-button-group>
                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Set.TableConfigs.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Set.TableConfigs.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Set.TableConfigs.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
             </el-button-group>
        </yl-toolbar>
        </div>
        <div slot="secondbox" class="flexbox" style="height:450px" >
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
    <!--编辑界面-->
        <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible"   size="small"  top="10%" 
            :modal="false"    :modal-append-to-body="false" :close-on-click-modal="false"  >
                <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
        </el-dialog>
 </div>
</template>

<script type="text/babel">
import Edit from './TableConfigEdit';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetTableConfigPageList,
            requestDeleteTableConfig,
        }   from 'api/tableconfig';

export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                       tableName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
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
                                {attr: { type: 'index',label: '序号', width:60,align: 'center' }},
                                {attr: { prop: 'tableName', label: '名称', width:180,  } },   
                                {attr: { prop: 'tableTitle', label: '表显示名称', width:120,  } },   
                                {attr: { prop: 'formColNum', label: '布局列数', width:120,  } },   
                                {attr: { prop: 'tableCode', label: '表编码', width:120,  } },  
                                {attr: { prop: 'sortCode', label: '排序',width:80, } },
                                {attr: { prop: 'remark', label: '说明',  } },   
                            ]
                        }
                    }
                }
        },
    methods:{
        _getTableConfigPageList(){
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"TableName",op:"LIKE",value:this.searchModel.tableName},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetTableConfigPageList(this.mainInput.inputModel).then(data =>{
                            if(data.success){
                                this.tableData=data.result;
                                }
                            else {
                                 this.$message.error('失败！'+data.error.message);
                            }
                          this.mainTableLoading=false;
                }).catch(function(error){
                       this.mainTableLoading=false;
                       this.$message.error('获取数据失败！');
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
            this._getTableConfigPageList();
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
                requestDeleteTableConfig(obj).then(data =>{
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
            }).catch(function(error){
                    this.$message.error('网络异常！'+error);  
            });
        },
        _close(){
                this.addFormVisible=false;
                this.isModal=false;
                this._reload();
        },

    },
    components:{
         Edit,
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

