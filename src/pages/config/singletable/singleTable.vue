<template>
<yl-panelpage :titleName="tableInfo.tableTitle" :reloadIsShow="true" @reload="_reloadPage">
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
        <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                        <el-input  placeholder="按照名称查询" size="small" style="width:200px" v-model="searchModel.shortName"></el-input>  
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        <yl-toolbar>
                <el-button-group>
                    <el-button type="primary"  v-permissionSetting="'Materials.Basic.Set.BasicTable1s.Create'" icon="plus" size="small"  @click="_add" >添加</el-button>
                    <el-button type="primary"  v-permissionSetting="'Materials.Basic.Set.BasicTable1s.Edit'" icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                    <el-button type="danger"   v-permissionSetting="'Materials.Basic.Set.BasicTable1s.Delete'" icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                </el-button-group>
        </yl-toolbar>
        </div>
         <div slot="secondbox" class="flexbox">
                <yl-table ref="table"
                        @reload="_reload"
                        @current-change="_currentChange"
                        :configs="tableConfig"    
                        :input="mainInput.inputModel"
                        :tableloading="mainTableLoading" >
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
         <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <yl-dynamicForm   @close="_close"  v-if="addFormVisible"></yl-dynamicForm>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
//import Edit from './singleTableEdit';
//import Edit from './test';
import  {inputModel} from 'api/inputmodel';
import axios from 'axios';
import {
            requestGetSingleTablePageList,
            requestDeleteSingleTable
       }    from 'api/singletable';
import {requestGetTableColConfigForEdit } from 'api/tablecolconfig';
import {requestGetTableConfigForEdit } from 'api/tableconfig';
export default {
    data(){
        return {
                tableName:'',
                tableInfo:{
                            colConfig:[],
                            formModel:{},
                            rule:{},
                            colList:[]
                          },
                tableColList:[],
                tableData: {},
                mainTableLoading: false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                    appName:'',  
                },
                addFormVisible:false,
                mainInput:new inputModel(),
          }
    },
     computed: {
                tableConfig: function(){
                          return {
                                table: {
                                    attr: {
                                        data: this.tableData,
                                        highlightCurrent:true,
                                    }
                                },
                                columns:this.tableInfo.colConfig,
                            }   
                    },
                tableNameArrt:function(){
                    let arr=this.tableName.split("_");
                    if(arr.length>1){return arr[1];} 
                    else{return  "";}
                    },
        },
    methods:{
        _reloadPage(){
         //   this.$router.push({ path:'/materials/singletable/'+this.tableName});
        },
        _getSingleTableConfig(){
            let _this=this;
            axios.all([requestGetTableColConfigForEdit(this.tableName),
                       requestGetTableConfigForEdit(this.tableName)])
                .then(axios.spread(function (collist,table) {
                    // 两个请求现在都执行完成
                   if(table.success){
                       let tableConfig=table.result.tableConfig;
                          _this.tableInfo.colConfig=JSON.parse(tableConfig.remark);
                          _this.tableInfo.formModel=JSON.parse(tableConfig.col1);
                          _this.tableInfo.rule=JSON.parse(tableConfig.col2);
                          _this.tableInfo.colList=JSON.parse(tableConfig.col3);
                          _this.tableInfo.tableName=_this.tableNameArrt;
                   }
                   if(collist.success){
                      // _this.colList=collist.result.data;
                   }
                }));
        },
        _getSingleTablePageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                              // {key:"AppName",op:"LIKE",value:this.searchModel.appName},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                 requestGetSingleTablePageList(this.mainInput.inputModel,this.tableNameArrt).then(data =>{
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
            this._getSingleTablePageList();
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
                requestDeleteSingleTable(obj,this.tableNameArrt).then(data =>{
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
                this._reload();
        },

    },
    components:{
        },
    mounted(){
        this.tableName=this.$route.params.tableName;
        this._getSingleTableConfig();
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

