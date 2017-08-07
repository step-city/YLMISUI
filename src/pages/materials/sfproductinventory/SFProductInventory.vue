<template>
<yl-panelpage :titleName="'半成品库存'" >
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                            <el-input  placeholder="材料名称" size="small" style="width:200px" v-model="searchModel.sInfoName"></el-input>
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
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
</yl-panelpage>
</template>

<script type="text/babel">
import  {inputModel} from 'api/inputmodel';
import {
            requestGetSFProductInventoryPageList,
            requestDeleteSFProductInventory
        }   from 'api/materials/sfproductinventory';

export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                       sInfoName:'',  
                       orgId:this.getUserInfo().user.manageOrgId, 
                    },
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
                                {attr: { prop: 'sInfoName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'sInfoModel', label: '规格型号', width:120,  } },   
                                {attr: { prop: 'sInfoUnit', label: '单位', width:120,  } },  
                                {attr: { prop: 'storeNum', label: '数量', width:120,  } },     
                                {attr: { prop: 'productDate', label: '生产时间', width:120,  } },   
                                {attr: { prop: 'productTeam', label: '生产班组', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', width:120,  } },    
                                {attr: { prop: 'barCode', label: '条码', width:120,  } },   
                                // {attr: { prop: 'extendColumn1', label: '', width:120,  } },   
                                // {attr: { prop: 'extendColumn2', label: '', width:120,  } },   
                                // {attr: { prop: 'extendColumn3', label: '', width:120,  } },   
                                // {attr: { prop: 'sortCode', label: '排序'} },
                            ]
                        }
                    }
                }
        },
    methods:{
        _getSFProductInventoryPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"SInfoName",op:"LIKE",value:this.searchModel.sInfoName},
                               {key:"OrgId",op:"EQ",value:this.searchModel.orgId},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetSFProductInventoryPageList(this.mainInput.inputModel).then(data =>{
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
            this._getSFProductInventoryPageList();
        },

    },
    components:{
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

