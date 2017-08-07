<template>
<yl-panelpage :titleName="'用料单位管理'" >
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                      <el-input  placeholder="用料单位名称" size="small" style="width:200px" v-model="searchModel.labourName"></el-input> 
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        <yl-toolbar>
            <el-button-group>
                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.Labours.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.Labours.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.Labours.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.Labours.BlackList'"  class="icon-cog2"  size="small" :disabled="selectRows.length===0" @click="_blackList">黑名单</el-button>
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
                        <template slot="isBlackList" scope="scope">
                            <el-tag type="primary" v-if="scope.row.isBlackList">是</el-tag>
                            <el-tag type="danger" v-else>否</el-tag>
                        </template>          
                </yl-table>
         </div>
    </yl-layout>
    <!--编辑界面-->
         <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './LabourEdit';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetLabourPageList,
            requestDeleteLabour,
            requestUpdateSupplierBlackListAsync
        }   from 'api/labour';

export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                    labourName:'',  
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
                                {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                                {attr: { prop: 'isBlackList', label: '黑名单', width:80,scopedSlot:'isBlackList',  } },   
                                {attr: { prop: 'labourName', label: '名称', width:120,  } },   
                                {attr: { prop: 'orgName', label: '添加机构名称', width:190,  } },   
                                {attr: { prop: 'labourTypeName',label: '队伍类别',width:140,} }, 
                                {attr: { prop: 'labourContact', label: '联系人', width:100,  } },   
                                {attr: { prop: 'labourPhone', label: '联系电话', width:150,  } },   
                                {attr: { prop: 'labourFax', label: '传真', width:120,  } },   
                                {attr: { prop: 'labourOrgCode', label: '统一社会信用代码', width:160,  } },   
                                {attr: { prop: 'remark', label: '备注', } },   
                            ]
                        }
                    }
                }
        },
    methods:{
         _getLabourPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                              {key:"LabourName",op:"LIKE",value:this.searchModel.labourName},
                             // {key:"OrgId",op:"EQ",value:this.getUserInfo().user.manageOrgId}
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetLabourPageList(this.mainInput.inputModel).then(data =>{
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
      _blackList(){
             if(this.selectRows[0].isBlackList=="0"){
                  this.selectRows[0].isBlackList=1;
             }else{
                   this.selectRows[0].isBlackList=0; 
             }
              let params={};
              params.supplier=this.selectRows[0];  
              requestUpdateSupplierBlackListAsync(params).then(data =>{
                     if(data.success){
                                this.$notify({
                                        title: '成功',
                                        message: '操作成功！',
                                        type: 'success',
                                        });
                                this._reload();
                                }
                            else {
                                this.$message.error('失败！'+data.error.message);
                                this._reload();
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
            this._getLabourPageList();
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
                requestDeleteLabour(obj).then(data =>{
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

