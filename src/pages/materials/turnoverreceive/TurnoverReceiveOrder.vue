<template>
 <yl-panelpage :titleName="'收料单'" :fullscreenisShow="true" :icon="'icon-library'">
	<div slot="content">
    <yl-layout>
        <div slot="fristbox">
             <yl-toolbar>
                    <el-form :inline="true"  >
                             <el-form-item class="form-content-vertical">
                                <yl-organizeTree  
                                v-model="searchModel.orgId"  
                                :placeholder="'记账单位'" 
                                size="small"  
                                :isexpand="true" 
                                style="width:180px">
                                </yl-organizeTree>
                              </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-input  placeholder="单据编号" size="small" style="width:180px" v-model="searchModel.orderCode"></el-input> 
                            </el-form-item>
                             <el-form-item class="form-content-vertical">
                                 <el-date-picker  
                                    v-model="searchModel.orderDate" 
                                    type="month" 
                                    :editable="false"
                                    size="small"
                                    placeholder="选择年月">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                             <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                            </el-form-item>
                    </el-form>
            </yl-toolbar>
            <yl-toolbar>
                    <el-button-group ref="funtoolbar">
                            <el-button v-for="(item,index) in funBtnConf" 
                                :type="item.type" 
                                :name="item.name" 
                                :size="item.size" 
                                v-permissionSetting="item.permissionSetting"
                                v-show="item.isShow"
                                :disabled="item.disabled"  
                                @click="item.clickEvent" >
                                <i :class="item.icon"></i>{{item.text}}</el-button>
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
                    <template slot="id" scope="scope"> 
                        <div class="yl-table-icon">  
                           <i class="icon-search2 yl-text-color"  @click="_printPage(scope.row.id)"></i>
                        </div>
                    </template>
                    <template slot="view" scope="scope"> 
                        <div class="yl-table-icon">  
                                <i class="icon-eye3 yl-text-color"  @click="_viewItem(scope.row.id)" ></i>
                        </div>
                    </template>
                    <template slot="isAudit" scope="scope">
                        <el-tag type="success" v-if="scope.row.isAudit">已审核</el-tag>
                        <el-tag type="danger" v-else>未审核</el-tag>
                    </template>

                     

            </yl-table>
        </div>
    </yl-layout>
<!--编辑界面-->
        <el-dialog ref="mainDialog" title="编辑" 
                 v-model="addFormVisible" size="large"  
                 top="8%" 
                 :lock-scroll="true"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false" 
                 :close-on-click-modal="false"  >
                 <Edit :selectRow="currentRows" 
                    @close="_close"  
                    v-if="addFormVisible"></Edit>
        </el-dialog>


 <!--预览打印界面-->
        <el-dialog ref="printDialog" title="预览打印"  
                 v-model="printDialogVisible" size="full"  
                 top="8%" 
                 :lock-scroll="true"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false" 
                 :close-on-click-modal="false"  >
                 <iframe :src="reportUrl" width="100%" height="600px" >
                 </iframe>
        </el-dialog>
    </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './Edit';
import {inputModel} from 'api/inputmodel';
import {
            requestGetTurnoverReceiveOrderPageList,
            requestDeleteTurnoverReceiveOrder,
            requestGetTurnoverReceiveOrderItemPageList,
            requestAuditTurnoverReceiveOrder,
            requestUnAuditTurnoverReceiveOrder
       }   from 'api/materials/turnoverreceiveorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import config from 'static/js/config';
import { mapActions } from 'vuex';
export default {
    data(){
        return{
             selectNode:{},
             searchModel:{
                       orderCode:'',  
                       orderDate:new Date(),  
                       orgId:this.getUserInfo().user.manageOrgId,
                    },
             selectRows:[],
             addFormVisible:false,
             printDialogVisible:false,
             mainInput:new inputModel(),
             mainTableLoading:false,
             tableData:{},
             itemId:'',
             reportUrl:'',
             funBtnConf: {
                            add:{
                                name:'add',
                                icon:'icon-plus',
                                type:'primary',
                                size:'small',
                                text:'添加',
                                disabled:false,
                                isShow:true,
                                clickEvent:this._add,
                                permissionSetting:"Materials.Turnover.Amortization.TurnoverReceiveOrders.Create"
                            },
                            edit:{
                                name:'edit',
                                icon:'icon-pencil',
                                type:'primary',
                                size:'small',
                                text:'修改',
                                disabled:true,
                                isShow:true,
                                clickEvent:this._edit,
                                permissionSetting:"Materials.Turnover.Amortization.TurnoverReceiveOrders.Edit"
                            },
                            delete:{ 
                                name:'delete',
                                icon:'icon-trashcan',
                                type:'danger',
                                size:'small',
                                text:'删除',
                                disabled:true,
                                isShow:true,
                                clickEvent:this._delete,
                                permissionSetting:"Materials.Turnover.Amortization.TurnoverReceiveOrders.Delete"
                            },
                             audit:{
                                name:'audit',
                                icon:'icon-user-plus',
                                type:'primary',
                                size:'small',
                                text:'审核',
                                disabled:true,
                                isShow:true,
                                clickEvent:this._audit,
                                permissionSetting:"Materials.Turnover.Amortization.TurnoverReceiveOrders.Audit"
                            },
                             unAudit:{
                                name:'unAudit',
                                icon:'icon-user-minus',
                                type:'primary',
                                size:'small',
                                text:'撤销审核',
                                disabled:true,
                                isShow:true,
                                clickEvent:this._unAudit,
                                permissionSetting:"Materials.Turnover.Amortization.TurnoverReceiveOrders.UnAudit"
                            },
                       },    
        }
    },
    computed: { 
        tableConfig:{
                get () {
                    return {
                        table: {
                            attr: {
                                data: this.tableData,
                                highlightCurrent:true,
                            }
                        },
                        columns: [
                            {attr: { type: 'index',label: '序号', width:65,align: 'center',showOverflowTooltip:false }},
                         //需要时开启预览和明细
                           {attr: { prop: 'orderId', label: '明细', width:65, align: 'center',scopedSlot: 'id',showOverflowTooltip:false } },   
                           {attr: { prop: 'orderId', label: '预览', width:65, align: 'center',scopedSlot: 'view',showOverflowTooltip:false } },   
                                {attr: { prop: 'isAudit', label: '审核状态', width:100, scopedSlot:'isAudit' } },   
                                {attr: { prop: 'orderCode', label: '单据编号', width:120,  } }, 
                                {attr: { prop: 'orderDate', label: '账期', width:100,  } },   
                                {attr: { prop: 'supplierName', label: '供应单位', width:130,  } },   
                                {attr: { prop: 'invoiceNO', label: '发票号', width:120,  } },   
                                //{attr: { prop: 'storeRoom', label: '库别', width:100,  } },   
                                //{attr: { prop: 'storePosition', label: '存放地', width:100,  } },   
                                {attr: { prop: 'auditor', label: '审核人', width:100,  } },   
                                {attr: { prop: 'auditDate', label: '审核日期', width:100,  } },   
                                //{attr: { prop: 'isSate', label: '审批状态', width:100,  } },   
                                {attr: { prop: 'maker', label: '制单人', width:100,  } },   
                                {attr: { prop: 'makerDate', label: '制单日期', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注', } },   

                           //注意：最后一列如果不设置列宽将会自动宽度补全
                        ]
                    }
                }
              },
           tableItemConfig:{
                get () {
                    return {
                        table: {
                            attr: {
                                data: {},
                                highlightCurrent:true,      
                                style:{width:'100%',height:'300px'},
                            }
                        },
                        columns: [
                             {attr: { type: 'index',label: '序号', width:65,align: 'center' }}, 
                                {attr: { prop: 'infoCode', label: '材料编码', width:130,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:100,  } },   
                               // {attr: { prop: 'barCode', label: '条码', width:100,  } },   
                                //{attr: { prop: 'storeRoom', label: '库别', width:100,  } },   
                                //{attr: { prop: 'storePosition', label: '存放地', width:100,  } },   
                                {attr: { prop: 'quantity', label: '数量', width:100,  } },   
                                {attr: { prop: 'bookPrice', label: '单价', width:100,  } },   
                                {attr: { prop: 'bookSum', label: '原值', width:100,  } },   
                                {attr: { prop: 'unitPrice', label: '税前单价', width:100,  } },   
                                {attr: { prop: 'unitSum', label: '税卡金额', width:100,  } },   
                                {attr: { prop: 'taxRate', label: '税率', width:100,  } },   
                                {attr: { prop: 'taxSum', label: '税额', width:100,  } },  
                                {attr: { prop: 'purchasedPrice', label: '税后单价', width:100,  } },   
                                {attr: { prop: 'purchasedSum', label: '税后金额', width:100,  } },   
                                {attr: { prop: 'amortizeType', label: '摊销方式', width:100,  } },   
                                //{attr: { prop: 'isRule', label: '', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注', width:100,  } },   
                                    
                             //注意：最后一列如果不设置列宽将会自动宽度补全
                        ]
                    }
                }
              },
           tableItemfilter:{
             get () {
                  return {
                          formConfig:[
                            {val: '', type:'input',name:'InfoName',op:"LIKE",
                                elmentConfig:{
                                    maxlength:1000000, 
                                    minlength:0,
                                    size:"small",
                                    disabled:false,
                                    type:"text",
                                    placeholder:"请输入材料名称",
                                    icon:"",
                                    readonly:false,
                                }, 
                            },
                             {val: '', type:'input',name:'InfoModel',op:"LIKE",
                                elmentConfig:{
                                    maxlength:1000000, 
                                    minlength:0,
                                    size:"small",
                                    disabled:false,
                                    type:"text",
                                    placeholder:"请输入规格型号",
                                    icon:"",
                                    readonly:false,
                                }, 
                            },
                            ],
                            _inputArr:[
                                 {key:"OrderId",op:"EQ",value:this.itemId},
                            ]
                    }
               }
             },
           tableItemfunconfig:{
                    get(){
                        return {
                            funItem:{
                                loadData:{  
                                    apiconf:{
                                       url: '/api/services/app/turnoverReceiveOrder/GetTurnoverReceiveOrderItemPageList',
                                        method: 'post',
                                        data: {}
                                    }, 
                                },
                            }
                        }
                    }
                },
            },    
    methods:{
        ...mapActions(['setItem_tableConfig','setItem_selectFilter','setItem_funConfig','setItem_isvisible']),
         _viewItem(id){
                    this.itemId=id;
                    this.setItem_selectFilter(this.tableItemfilter);
                    this.setItem_isvisible(true);
        },
        //预览单据接口
        _printPage(id){
            this.reportUrl=config.reportUrl+"/TurnoverReceiveOrder.html?id="+id;
            this.printDialogVisible=true;
        },
        _funcState(){
            //状态判断逻辑
        if(this.selectRows.length>0){
               this.funBtnConf['add'].disabled=false;
               this.funBtnConf['edit'].disabled=false;
               this.funBtnConf['delete'].disabled=false;
               this.funBtnConf['audit'].disabled=false;
               this.funBtnConf['unAudit'].disabled=false;
               if(this.selectRows[0].isAudit){
                   this.funBtnConf['edit'].disabled=true;
                   this.funBtnConf['delete'].disabled=true;
                   this.funBtnConf['audit'].disabled=true;
                   this.funBtnConf['unAudit'].disabled=false;
               }else{
                   this.funBtnConf['audit'].disabled=false;
                   this.funBtnConf['unAudit'].disabled=true;
               }
         }else{
              this.funBtnConf['add'].disabled=false;
               this.funBtnConf['edit'].disabled=true;
               this.funBtnConf['delete'].disabled=true;
               this.funBtnConf['audit'].disabled=true;
               this.funBtnConf['unAudit'].disabled=true;
         }
        },
        _currentChange(val){
                //单选时的方法
                if(val!=null){
                     this.selectRows=[];
                     this.selectRows.push(val);
                }
                this._funcState();
            },
         _getTurnoverReceiveOrderPageList(){
                this.selectRows=[];
                this.mainTableLoading=true; 
                var inputArr=[ 
                                {key:"OrderCode",op:"LIKE",value:this.searchModel.orderCode},
                                {key:"OrgId",op:"EQ",value:this.searchModel.orgId},
                                {key:"OrderDate",op:"EQ",value:this.formatDate(this.searchModel.orderDate,"YYYY-MM")},
                             ];
                //排序
                this.mainInput.inputModel.sorting="orderCode desc";
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetTurnoverReceiveOrderPageList(this.mainInput.inputModel).then(data =>{
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
        // _selectionChange(val){
        //     //多选时的方法
        //     if(val!=null){
        //         this.selectRows=[];
        //         this.selectRows=this.selectRows.concat(val);
        //     }
        // },
        toggleRowSelection (row) {
            this.$refs.table.toggleRowSelection(row)
        },
        _reload(){
            this._getTurnoverReceiveOrderPageList();
            this._funcState();
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
                requestDeleteTurnoverReceiveOrder(obj).then(data =>{
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
            }).catch(()=>{});
        },
        _audit(){
             //初始化表单
            requestAuditTurnoverReceiveOrder(this.selectRows[0].id).then(data=>{
                if(data.success){
                    if(data.result.result>0){
                        this.$notify({
                                    title: '成功',
                                    message: '审核单据成功！',
                                    type: 'success'
                                    });
                    }else{
                         this.$notify.error({
                                    title: '错误',
                                      message: data.result.errorResult,
                                    });
                    }
                    this._reload();
                }else{
                    this.$notify.error({
                                    title: '错误',
                                      message: '审核单据失败！',
                                    });
                }
            });
        },
        _unAudit(){
             requestUnAuditTurnoverReceiveOrder(this.selectRows[0].id).then(data=>{
               if(data.success){
                    if(data.result.result>0){
                         this.$notify({
                                    title: '成功',
                                    message: '撤销审核单据成功！',
                                    type: 'success'
                                    });
                    }else{
                        this.$notify.error({
                                    title: '错误',
                                      message: data.result.errorResult,
                                    });
                    }
                    this._reload();
                }else{
                      this.$notify({
                                    title: '警告',
                                    message: '该材料以摊销，不能撤销！',
                                    type: 'warning'
                                    });
                }
             });
        },
        _close(){
                this.addFormVisible=false;
                this._reload();
        },
    },
     components:{
       Edit,
       'yl-organizeTree':organizeTree,
    },
    mounted(){
        this._reload();
        this.setItem_tableConfig(this.tableItemConfig);
        this.setItem_funConfig(this.tableItemfunconfig);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

