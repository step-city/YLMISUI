<template>
<yl-panelpage :titleName="'半成品盘点'" >
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                     <!--定义过滤条件    <el-input  placeholder="提示名称" size="small" style="width:200px" v-model="searchModel.appName"></el-input>  -->
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        <yl-toolbar>
            <el-button-group>
                    <el-button type="primary" v-permissionSetting="'Materials.Analyze.Rebar.SFProductChecks.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                    <el-button type="primary" v-permissionSetting="'Materials.Analyze.Rebar.SFProductChecks.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                    <el-button type="danger"  v-permissionSetting="'Materials.Analyze.Rebar.SFProductChecks.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
    <!--编辑界面-->
         <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
         <el-dialog ref="mainDialog" title="添加" 
                 v-model="addFormVisible1" size="large"  
                 top="8%" 
                 :lock-scroll="true"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false" 
                 :close-on-click-modal="false"  >
                 <Add :selectRow="currentRows" 
                    @close="_close"  
                    v-if="addFormVisible1"></Add>
        </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './SFProductCheckEdit';
import Add from './Add';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetSFProductCheckPageList,
            requestDeleteSFProductCheck
        }   from 'api/materials/sfproductcheck';

export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                     //  appName:'',  
                    orgId:this.getUserInfo().user.manageOrgId, 
                    },
                addFormVisible:false,
                addFormVisible1:false,
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
                                {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                                // {attr: { prop: 'orgId', label: '', width:120,  } },   
                                // {attr: { prop: 'orgName', label: '', width:120,  } },   
                                // {attr: { prop: 'sInfoNM', label: '', width:120,  } },   
                                {attr: { prop: 'sInfoCode', label: '材料编码', width:120,  } },   
                                {attr: { prop: 'sInfoName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'sInfoModel', label: '规格型号', width:120,  } },   
                                {attr: { prop: 'sInfoUnit', label: '单位', width:120,  } },   
                                {attr: { prop: 'quantity', label: '数量', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', width:120,  } },   
                                // {attr: { prop: 'extendColumn1', label: '', width:120,  } },   
                                // {attr: { prop: 'extendColumn2', label: '', width:120,  } },   
                                // {attr: { prop: 'extendColumn3', label: '', width:120,  } },   
                                {attr: { prop: 'sortCode', label: '排序'} },
                            ]
                        }
                    }
                }
        },
    methods:{
        _getSFProductCheckPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                             //  {key:"AppName",op:"LIKE",value:this.searchModel.appName},
                              {key:"OrgId",op:"EQ",value:this.searchModel.orgId},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetSFProductCheckPageList(this.mainInput.inputModel).then(data =>{
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
            this._getSFProductCheckPageList();
        },
        _add(){
            this.addFormVisible1=true;
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
                requestDeleteSFProductCheck(obj).then(data =>{
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
                this.addFormVisible1=false;
                this._reload();
        },

    },
    components:{
         Edit,
         Add
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

