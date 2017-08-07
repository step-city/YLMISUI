<template>
<yl-panelpage :titleName="'周转材料库存'" >
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                            <el-input  placeholder="材料名称" size="small" style="width:200px" v-model="searchModel.infoName"></el-input>  
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                                <el-input placeholder="规格型号" size="small" style="width:160px" v-model="searchModel.infoModel"></el-input>
                            </el-form-item>
                         <el-form-item class="form-content-vertical">
                                <yl-organizeTree v-model="searchModel.orgId" :placeholder="'请选择单位'" size="small" :isexpand="true" @getCurrentNode="_getCurrentNode" style="width:180px">
                                </yl-organizeTree>
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
            requestGetTurnoverInventoryPageList,
        }   from 'api/materials/turnoverinventory';
import organizeTree from 'ocomponents/organize/organizeTree';

export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                       infoName:'',  
                       orgId: this.getUserInfo().user.manageOrgId,
                       infoModel: '',
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
                                {attr: { prop: 'infoName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:120,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:120,  } },   
                                // {attr: { prop: 'storeRoom', label: '库别', width:120,  } },   
                                // {attr: { prop: 'storePosition', label: '存放地', width:120,  } },
                                {attr: { prop: 'bookPrice', label: '原始单价', width:120,  } },  
                                {attr: { prop: 'storeNum', label: '原始数量', width:120,  } },    
                                {attr: { prop: 'bookOriginalValue', label: '原值', width:120,  } },    
                                {attr: { prop: 'residualValueRate', label: '残值率', width:120,  } },   
                                {attr: { prop: 'residualValue', label: '残值', width:120,  } },   
                                {attr: { prop: 'amortizeType', label: '摊销方式', width:120,  } },
                                {attr: { prop: 'surQuantity', label: '库存数量', width:120,  } },   
                                {attr: { prop: 'surAmortizeTime', label: '剩余工期或总工作量', width:160,  } },
                                {attr: { prop: 'surAmortizeSum', label: '剩余金额', width:120,  } },  
                                {attr: { prop: 'surOriginalValue', label: '剩余原值', width:120,  } },
                                {attr: { prop: 'amortizeSum', label: '需摊销额', width:120,  } },     
                                {attr: { prop: 'amortizeUnitPrice', label: '摊销单价', width:120,  } },  
                                {attr: { prop: 'infoCode', label: '材料编码', width:120,  } },      
                                {attr: { prop: 'remark', label: '备注', width:120,  } },   
                            ]
                        }
                    }
                }
        },
    methods:{
        _getTurnoverInventoryPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"InfoName",op:"LIKE",value:this.searchModel.infoName},
                               { key: "InfoModel", op: "LIKE", value: this.searchModel.infoModel },
                               { key: "OrgId", op: "EQ", value: this.searchModel.orgId }
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetTurnoverInventoryPageList(this.mainInput.inputModel).then(data =>{
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
            this._getTurnoverInventoryPageList();
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
                requestDeleteTurnoverInventory(obj).then(data =>{
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
        _getCurrentNode(val) {
            this.searchModel.orgId = val.id;
        },
    },
    components:{
        'yl-organizeTree': organizeTree,
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

