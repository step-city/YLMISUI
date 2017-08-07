<template>
<yl-panelpage :titleName="'常用供应商'" >
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                           <el-input  placeholder="常用供应商名称" size="small" style="width:200px" v-model="searchModel.supplierName"></el-input>
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        <yl-toolbar>
            <el-button-group>
                    <el-button type="primary"  v-permissionSetting="'Pages.Basic.Data.CommonSuppliers.DownLoad'"   class="icon-download3" size="small"   @click="_downLoad" >下载供应商</el-button>
                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.CommonSuppliers.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.CommonSuppliers.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
                    :modal-append-to-body="false" :close-on-click-modal="false">
                    <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
         <el-dialog ref="downloadmainDialog" title="下载" v-model="downLoadFormVisible" size="large"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false">
                    <Edits  @close="_downloadClose"  v-if="downLoadFormVisible"></Edits>
         </el-dialog>
 </div>
</yl-panelpage>
</template>
<script type="text/babel">
import Edit from './CommonSupplierEdit';
import Edits from './CommonSupplierEdits';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetCommonSupplierPageList,
            requestDeleteCommonSupplier
        }from 'api/commonsupplier';
export default {
    data(){
       return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                     supplierName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
                downLoadFormVisible:false,
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
                                {attr: { prop: 'supplierName', label: '名称', width:160,  } },   
                                {attr: { prop: 'supplierAbbName', label: '简称', width:140,  } },   
                                //{attr: { prop: 'orgId', label: '组织机构id', width:120,  } },   
                                {attr: { prop: 'supplierContact', label: '联系人', width:120,  } },   
                                {attr: { prop: 'supplierPhone', label: '联系电话', width:140,  } },   
                                {attr: { prop: 'isBlackList', label: '是否黑名单', width:100, scopedSlot:'isBlackList', } },   
                                {attr: { prop: 'remark', label: '备注',  } },   
                            ]
                        }
                    }
                }
        },
    methods:{
        _getCommonSupplierPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                              {key:"SupplierName",op:"LIKE",value:this.searchModel.supplierName},
                               {key:"OrgId",op:"EQ",value:this.getUserInfo().user.manageOrgId}
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetCommonSupplierPageList(this.mainInput.inputModel).then(data =>{
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
            this._getCommonSupplierPageList();
        },
        _edit(){
                this.addFormVisible=true;
                this.currentRows=this.selectRows[0];
        },
         _downLoad(){
            this.downLoadFormVisible=true;
            this.currentRows={};
        },
         _downloadClose(){
                this.downLoadFormVisible=false;
                this._reload();
        },
          _delete(){
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
                var obj={}; 
                obj.id=this.selectRows[0].id;
                requestDeleteCommonSupplier(obj).then(data =>{
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
         Edits
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

