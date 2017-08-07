<template>
    <yl-layout>
        <div slot="fristbox">
          <yl-toolbar>
                <el-form  :inline="true"  >
                    <el-button type="primary"  v-permissionSetting="'Pages.Basic.Data.CommonSuppliers.DownLoad'" size="small"  class="icon-download3" @click="_onSubmit">下载</el-button>
                        <el-form-item class="form-content-vertical">
                        <el-input  placeholder="用料单位名称" size="small" style="width:200px" v-model="searchModel.labourName"></el-input>   
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
                            <el-tag type="danger" v-if="scope.row.isBlackList">是</el-tag>
                            <el-tag type="primary" v-else>否</el-tag>
                        </template>   
                    </yl-table>               
         </div>
  </yl-layout>
</template>
<script type="text/babel">
import  {inputModel} from 'api/inputmodel';
import { requestGetLabourPageList}from 'api/labour';
 import{ requestCreateCommonLabourListAsync}from 'api/commonlabour';
export default {
    data(){
        return {
            tableData:{},
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
                                {attr: { type: 'selection',label: '选择', width:65, }},
                                {attr: { type: 'index',label: '序号', width:65,align: 'center' }},
                                {attr: { prop: 'labourName', label: '名称', width:120,  } },   
                                //{attr: { prop: 'orgId', label: '添加机构id', width:150,  } },  
                                {attr: { prop: 'orgName', label: '添加机构名称', width:190,  } },   
                                {attr: { prop: 'labourTypeName',label: '队伍类别',width:140,} }, 
                                {attr: { prop: 'labourContact', label: '联系人', width:100,  } },   
                                {attr: { prop: 'labourPhone', label: '联系电话', width:150,  } },   
                                {attr: { prop: 'labourFax', label: '传真', width:120,  } },   
                                {attr: { prop: 'labourOrgCode', label: '统一社会信用代码', width:160,  } },   
                                {attr: { prop: 'isBlackList', label: '黑名单', width:80,scopedSlot:'isBlackList',  } },   
                                {attr: { prop: 'remark', label: '备注', } },   
                            ]
                        }
                    }
                }
        },
    methods:{
          _onSubmit() {
            let params={};
            params.commonLabours=this.selectRows;
            //console.log(this.selectRows);
            requestCreateCommonLabourListAsync(params).then(data=>{
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
        _getLabourPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                              {key:"LabourName",op:"LIKE",value:this.searchModel.labourName},
                              {key:"IsBlackList",op:"EQ",value:0}
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

