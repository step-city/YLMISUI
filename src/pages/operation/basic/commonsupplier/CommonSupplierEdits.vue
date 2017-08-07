<template>
    <yl-layout>
        <div slot="fristbox">
          <yl-toolbar>
                <el-form  :inline="true"  >
                    <el-button type="primary"  v-permissionSetting="'Pages.Basic.Data.CommonSuppliers.DownLoad'" size="small"  @click="_onSubmit" class="icon-download3">下载</el-button>
                        <el-form-item class="form-content-vertical">
                        <el-input  placeholder="供应商名称" size="small" style="width:200px" v-model="searchModel.supplierName"></el-input>  
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        </div>
         <div slot="secondbox" class="flexbox" style="height:450px;">
                <yl-table ref="table"
                   @reload="_reload"
                    @selection-change="_selectionChange"
                    :configs="tableConfig" 
                    :input="mainInput.inputModel"
                    :tableloading="mainTableLoading" 
                    @row-click="toggleRowSelection"
                    >
                    <template slot="isBlackList" scope="scope">
                                <el-tag type="primary" v-if="scope.row.isBlackList">是</el-tag>
                                <el-tag type="danger" v-else>否</el-tag>
                    </template>
                    <template slot="supplierState" scope="scope">
                                <el-tag type="primary" v-if="scope.row.supplierState">合格</el-tag>
                                <el-tag type="danger" v-else>不合格</el-tag>
                    </template>
                    </yl-table>
         </div>
  </yl-layout>
</template>
<script type="text/babel">
import  {inputModel} from 'api/inputmodel';
import {
    requestGetSupplierPageList
        } from 'api/supplier';
import {
    requestCreateCommonSupplierList         
} from 'api/commonsupplier';
export default {
    data(){
        return {
             tableData:{},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                    supplierName:'',  
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
                                {attr: { type: 'selection',label: '选择', width:80, }},
                                {attr: { prop: 'isBlackList', label: '黑名单', width:80, scopedSlot: 'isBlackList',  } },
                                {attr: { prop: 'supplierState', label: '状态', width:80, } },  
                                {attr: { prop: 'supplierCode', label: '编码', width:80,  } },   
                                {attr: { prop: 'supplierName', label: '名称', width:160,  } },   
                                {attr: { prop: 'supplierAbbName', label: '简称', width:120,  } },   
                                {attr: { prop: 'supplierTypeName', label: '供应商类别', width:160,  } },  
                                //{attr: { prop: 'orgId', label: '添加机构id', width:120,  } },   
                                {attr: { prop: 'orgName', label: '添加机构名称', width:160,  } },   
                                {attr: { prop: 'supplierFRDB', label: '法人代表', width:120,  } },   
                                {attr: { prop: 'supplierWTDB', label: '委托代表', width:120,  } },   
                                {attr: { prop: 'supplierContact', label: '联系人', width:140,  } },   
                                {attr: { prop: 'supplierPhone', label: '电话', width:140,  } },   
                                {attr: { prop: 'supplierFax', label: '传真', width:140,  } },   
                                {attr: { prop: 'supplierAddress', label: '地址', width:180,  } },   
                                {attr: { prop: 'supplierPostCode', label: '邮编', width:120,  } },   
                                {attr: { prop: 'supplierWebSit', label: '网址', width:140,  } },   
                                {attr: { prop: 'supplierRegisterCapital', label: '注册资金', width:120,  } },   
                                {attr: { prop: 'supplierFixCaptial', label: '固定资本', width:120,  } },   
                                {attr: { prop: 'supplierDepositBank', label: '开户银行', width:120,  } },   
                                {attr: { prop: 'supplierBankAccount', label: '银行账号', width:200,  } },   
                                {attr: { prop: 'supplierOrgCode', label: '统一社会信用代码', width:150,  } }, 
                                {attr: { prop: 'remark', label: '备注', width:200,  } }, 
                
                            ]
                        }
                    }
                }
        },
    methods:{
      _onSubmit() {
            let params={};
            params.commonSuppliers=this.selectRows;
            //console.log(this.selectRows);
            requestCreateCommonSupplierList(params).then(data=>{
            if(data.success){
                    this.$notify({
                        title: '成功',
                        message: '保存数据成功！',
                        type: 'success'
                        });
                   this._complete();
                }
                else {
                    this.$message.error('失败！'+data.error.message);
                }
            })
        },
        _complete(){
                      this.$emit('close');
            },
        _getSupplierPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"SupplierName",op:"LIKE",value:this.searchModel.supplierName},
                              // {key:"OrgId",op:"EQ",value:this.getUserInfo().user.manageOrgId}
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetSupplierPageList(this.mainInput.inputModel).then(data =>{
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
            this._getSupplierPageList();
        },
        _close(){
                this.addFormVisible=false;
                this._reload();
        },
    },
   
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

