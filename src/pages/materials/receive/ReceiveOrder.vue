<template>
 <yl-panelpage :titleName="orderName" :fullscreenisShow="true" :icon="'icon-library'">
	<div slot="content">
    <yl-layout>
        <div slot="fristbox">
             <yl-toolbar>
                    <el-form :inline="true"  >
                             <el-form-item class="form-content-vertical">
                                <yl-organizeTree  
                                v-model="searchModel.orgId"  
                                :placeholder="'请选择单位'" 
                                size="small"  
                                :isexpand="true" 
                                 @getCurrentNode="_getCurrentNode"
                                style="width:180px">
                                </yl-organizeTree>
                              </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-input  placeholder="单号" size="small" style="width:180px" v-model="searchModel.orderCode"></el-input> 
                            </el-form-item>
                             <el-form-item class="form-content-vertical">
                                 <el-date-picker  
                                    v-model="searchModel.orderDate" 
                                    type="month" 
                                    :editable="false"
                                    size="small"  
                                    placeholder="选择月份">
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
                            <el-tooltip placement="right"  :visible-arrow="false" :open-delay="500" :effect="'light'">
                            <div slot="content" style="height:350px;max-width:800px">
                                    <yl-table ref="tableItem"
                                        @reload="_itemReload(scope.row.id)"
                                        :configs="tableItemConfig" 
                                        :input="itemInput.inputModel"
                                        :tableloading="itemTableLoading" 
                                        >
                                    </yl-table>
                            </div>
                            <div class="yl-table-icon">  
                                 <i class="icon-eye3 yl-text-color"  @mouseover="_viewItem(scope.row.id)" ></i>
                            </div>
                            </el-tooltip>
                    </template>
                    <template slot="isAudit" scope="scope">
                        <el-tag type="success" v-if="scope.row.isAudit">已审核</el-tag>
                        <el-tag type="danger" v-else>未审核</el-tag>
                    </template>
                    <template slot="isPt" scope="scope">
                        <el-tag type="success" v-if="scope.row.isPt">普票</el-tag>
                        <el-tag type="primary" v-else>专票</el-tag>
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
                    :dataType="dataType"
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
            requestGetReceiveOrderPageList,
            requestDeleteReceiveOrder,
            requestReceiveOrderItemPageList,
            requestAuditReceiveOrder,
            requestUnAuditReceiveOrder
       }   from 'api/materials/receiveorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import config from 'static/js/config';
export default {
    data(){
        return{
             selectNode:{},
             dataType:0,
             orderName:'',
             searchModel:{
                       orderCode:'',  
                       orderDate:new Date(),  
                       orgId:this.getUserInfo().user.manageOrgId,
                    },
             selectRows:[],
             addFormVisible:false,
             printDialogVisible:false,
             mainInput:new inputModel(),
             itemInput:new inputModel(),
             mainTableLoading:false,
             itemTableLoading:false,
             tableData:{},
             tableItemData:{},
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
                                permissionSetting:"Materials.Consume.Receive.ReceiveOrders.Create"
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
                                permissionSetting:"Materials.Consume.Receive.ReceiveOrders.Edit"
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
                                permissionSetting:"Materials.Consume.Receive.ReceiveOrders.Delete"
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
                                permissionSetting:"Materials.Consume.Receive.ReceiveOrders.Audit"
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
                                permissionSetting:"Materials.Consume.Receive.ReceiveOrders.UnAudit"
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
                            
                                // {attr: { prop: 'orderId', label: '主键', width:100,  } },   
                                // {attr: { prop: 'orgId', label: '组织id', width:100,  } }, 
                                {attr: { prop: 'isAudit', label: '审核状态',scopedSlot: 'isAudit', width:100,  } },     
                                // {attr: { prop: 'orgName', label: '组织名称', width:100,  } },   
                                {attr: { prop: 'orderCode', label: '单号', width:120,  } },   
                                {attr: { prop: 'supplierName', label: '供应商', width:100,  } },   
                                {attr: { prop: 'orderDate', label: '账期', width:100,  } },   
                                // {attr: { prop: 'contractId', label: '合同id', width:100,  } },   
                                {attr: { prop: 'contractCode', label: '合同编号', width:100,  } }, 
                                {attr: { prop: 'isPt', label: '税种', width:80, scopedSlot: 'isPt', } },   
                                // {attr: { prop: 'supplierId', label: '供应商id', width:100,  } },   
                                {attr: { prop: 'invoiceNo', label: '发票号', width:100,  } },   
                                // {attr: { prop: 'checkMode', label: '供应方式', width:100,  } },   
                                {attr: { prop: 'supplyMode', label: '供应方式', width:100,  } },   
                                {attr: { prop: 'payment', label: '结算方式', width:100,  } },   
                                {attr: { prop: 'storeRoomName', label: '库别', width:100,  } },   
                                // {attr: { prop: 'storeRoomFullName', label: '库别全称', width:100,  } },   
                                //{attr: { prop: 'storePosition', label: '存放地', width:100,  } },   
                                //{attr: { prop: 'wagonNumber', label: '运单号', width:100,  } },   
                                // {attr: { prop: 'importFlag', label: '', width:100,  } },   
                                // {attr: { prop: 'rejectionFlag', label: '', width:100,  } },     
                                // {attr: { prop: 'dataType', label: '0点收1预点2冲预点3退料', width:100,  } },   
                                // {attr: { prop: 'dataId', label: '来源id', width:100,  } },   
                                {attr: { prop: 'auditor', label: '审核人', width:100,  } },   
                                {attr: { prop: 'auditDate', label: '审核时间', width:100,  } },   
                                // {attr: { prop: 'isSate', label: '审批状态', width:100,  } },   
                                {attr: { prop: 'maker', label: '制单人', width:100,  } },   
                                // {attr: { prop: 'makerDate', label: '', width:100,  } },   
                                // {attr: { prop: 'personOne', label: '签字栏1', width:100,  } },   
                                // {attr: { prop: 'personTwo', label: '签字栏2', width:100,  } },   
                                // {attr: { prop: 'personThree', label: '签字栏3', width:100,  } },   
                                // {attr: { prop: 'personFour', label: '签字栏4', width:100,  } },   
                                // {attr: { prop: 'personFive', label: '签字栏5', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注', width:100,  } },   
                                    
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
                                data: this.tableItemData,
                                highlightCurrent:true,
                            }
                        },
                        columns: [
                            {attr: { type: 'index',label: '序号', width:65,align: 'center' }},
                            
                                // {attr: { prop: 'itemId', label: '', width:100,  } },   
                                // {attr: { prop: 'orgId', label: '', width:100,  } },   
                                // {attr: { prop: 'orderId', label: '', width:100,  } },   
                                // {attr: { prop: 'infoNM', label: '', width:100,  } },   
                               // {attr: { prop: 'infoCode', label: '材料编号', width:100,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:100,  } },  
                                {attr: { prop: 'quantity', label: '数量', width:100,  } },   
                                {attr: { prop: 'taxRate', label: '税率', width:100,  } },   
                                {attr: { prop: 'unitPrice', label: '税前单价', width:100,  } },   
                                {attr: { prop: 'unitSum', label: '税前金额', width:100,  } },   
                                {attr: { prop: 'taxSum', label: '税额', width:100,  } },   
                                {attr: { prop: 'pruchasedPrice', label: '采购价', width:100,  } },   
                                {attr: { prop: 'purchasedSum', label: '采购金额', width:100,  } },
                                {attr: { prop: 'bookPrice', label: '账面价', width:100,  } },   
                                {attr: { prop: 'bookSum', label: '账面金额', width:100,  } },       
                                // {attr: { prop: 'cId', label: '', width:100,  } },   
                                // {attr: { prop: 'classNodebh', label: '', width:100,  } },   
                                // {attr: { prop: 'barCode', label: '', width:100,  } },   
                                {attr: { prop: 'storeRoom', label: '库别', width:100,  } },   
                                {attr: { prop: 'storePosition', label: '存放地', width:100,  } },   
                                {attr: { prop: 'manufacturer', label: '生产厂商', width:100,  } },   
                                {attr: { prop: 'batchNo', label: '炉批号', width:100,  } },   
                                {attr: { prop: 'infoRemark', label: '备注', width:100,  } },   
                                // {attr: { prop: 'dataType', label: '', width:100,  } },   
                                // {attr: { prop: 'dataId', label: '', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注', width:100,  } },   
                                    
                             //注意：最后一列如果不设置列宽将会自动宽度补全
                        ]
                    }
                }
              },
            },    
    methods:{
        //
         _viewItem(id){
            setTimeout(()=>{
                     this._getReceiveOrderItemPageList(id);
            },300)
        },
        //预览单据接口
        _printPage(id){
            this.reportUrl=config.reportUrl+"/ReceiveOrder.html?id="+id;
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
         _getReceiveOrderPageList(){
                this.selectRows=[];
                this.mainTableLoading=true; 
                var inputArr=[ 
                                {key:"OrderCode",op:"LIKE",value:this.searchModel.orderCode},
                                {key:"OrgId",op:"EQ",value:this.searchModel.orgId},
                                {key:"DataType",op:"EQ",value:this.dataType},
                                {key:"OrderDate",op:"EQ",value:this.formatDate(this.searchModel.orderDate,"YYYY-MM")},
                             ];
                //排序
                this.mainInput.inputModel.sorting="orderCode desc";
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetReceiveOrderPageList(this.mainInput.inputModel).then(data =>{
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
         _getReceiveOrderItemPageList(id){
                this.itemTableLoading=true; 
                var inputArr=[ 
                                {key:"OrderId",op:"EQ",value:id},
                                ];
                //排序
                this.itemInput.inputModel.sorting="sortCode asc";
                this.itemInput.addqueryConditionItem(inputArr);
                requestReceiveOrderItemPageList(this.itemInput.inputModel).then(data =>{
                    if(data.success){
                                this.tableItemData=data.result;
                            }
                    else {
                                this.$message.error('失败！'+data.error.message);
                    }
                    this.itemTableLoading=false;
                })
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
            this._getReceiveOrderPageList();
            this._funcState();
        },
        _itemReload(id){
             this._getReceiveOrderItemPageList(id);
        },
        _add(){
            this.addFormVisible=true;
            //this.dataType
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
                requestDeleteReceiveOrder(obj).then(data =>{
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
             let params={};
             params.id=this.selectRows[0].id;
             params.orgId=this.selectRows[0].orgId;
            requestAuditReceiveOrder(params).then(data=>{
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
             let params={};
             params.id=this.selectRows[0].id;
             params.orgId=this.searchModel.orgId;
             requestUnAuditReceiveOrder(params).then(data=>{
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
                     this.$notify.error({
                                    title: '错误',
                                       message: '撤销审核单据失败！',
                                    });
                }
             });
        },
        _close(){
                this.addFormVisible=false;
                this._reload();
        },
         _getCurrentNode(val){
                this.searchModel.orgId=val.id;
        },
        _judgeType(){
            if(this.dataType==0){
                this.orderName='点收单'
            }
            else if(this.dataType==1){
                this.orderName='预点单'
            }
            else{
            }
        },
        _inital(){
            this.dataType=this.$route.params.type;
            this._judgeType();
            this._reload();
        }
    },
     components:{
       Edit,
       'yl-organizeTree':organizeTree,
    },
    mounted(){
        this._inital();
    },
    watch:{
       // 如果路由有变化，会再次执行该方法
          "$route": "_inital"
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

