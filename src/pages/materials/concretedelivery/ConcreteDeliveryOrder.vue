<template>
 <yl-panelpage :titleName="'混凝土出料'" :fullscreenisShow="true" :icon="'icon-library'">
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
                                    size="small"
                                    :editable="false"
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
            requestGetConcreteDeliveryOrderPageList,
            requestDeleteConcreteDeliveryOrder,
            requestGetConcreteDeliveryOrderItemPageList,
            requestAuditConcreteDeliveryOrder,
            requestUnAuditConcreteDeliveryOrder
       }   from 'api/materials/concretedeliveryorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import config from 'static/js/config';
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
                                permissionSetting:"Materials.Analyze.Concrete.ConcreteDeliveryOrders.Create"
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
                                permissionSetting:"Materials.Analyze.Concrete.ConcreteDeliveryOrders.Edit"
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
                                permissionSetting:"Materials.Analyze.Concrete.ConcreteDeliveryOrders.Delete"
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
                                permissionSetting:"Materials.Analyze.Concrete.ConcreteDeliveryOrders.Audit"
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
                                permissionSetting:"Materials.Analyze.Concrete.ConcreteDeliveryOrders.UnAudit"
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
                              {attr: { prop: 'isAudit', label: '审核状态', width:100, scopedSlot:'isAudit',   } }, 
                              {attr: { prop: 'labourName', label: '用料单位', width:140,  } }, 
                                //{attr: { prop: 'orderId', label: '主键', width:100,  } },   
                                //{attr: { prop: 'orgId', label: '组织id', width:100,  } },   
                                //{attr: { prop: 'orgName', label: '记账单位', width:100,  } },   
                                {attr: { prop: 'orderCode', label: '单据编号', width:130,  } },   
                                {attr: { prop: 'orderDate', label: '账期', width:100,  } },   
                                //{attr: { prop: 'dataType', label: '', width:100,  } },   
                                //{attr: { prop: 'dataId', label: '', width:100,  } },   
                                //{attr: { prop: 'labourId', label: '用料单位id', width:100,  } },                                    
                               // {attr: { prop: 'gId', label: '工号id', width:100,  } },   
                               // {attr: { prop: 'ghCode', label: '工号编码', width:100,  } },   
                                //{attr: { prop: 'gHAbbName', label: '工号简称', width:100,  } },   
                                {attr: { prop: 'ghName', label: '工号全称', width:100,  } },   
                                {attr: { prop: 'transportNum', label: '运输单号', width:100,  } },   
                                {attr: { prop: 'auditor', label: '审核人', width:100,  } },   
                                {attr: { prop: 'auditDate', label: '审核日期', width:100,  } },   
                                {attr: { prop: 'maker', label: '制单人', width:100,  } },   
                                {attr: { prop: 'makerDate', label: '制单日期', width:100,  } },   
                                //{attr: { prop: 'isState', label: '审批状态', width:100,  } },   
                                //{attr: { prop: 'personOne', label: '', width:100,  } },   
                                // {attr: { prop: 'personTwo', label: '', width:100,  } },   
                                // {attr: { prop: 'personThree', label: '', width:100,  } },   
                                // {attr: { prop: 'personFour', label: '', width:100,  } },   
                                // {attr: { prop: 'personFive', label: '', width:100,  } },   
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
                            
                                //{attr: { prop: 'itemId', label: '主键', width:100,  } },   
                                //{attr: { prop: 'orderId', label: '单据id', width:100,  } },   
                                //{attr: { prop: 'orgId', label: '组织id', width:100,  } },   
                                //{attr: { prop: 'infoNM', label: '材料id', width:100,  } },   
                                {attr: { prop: 'infoCode', label: '材料编码', width:100,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:100,  } },   
                                {attr: { prop: 'barCode', label: '条码', width:100,  } },   
                                {attr: { prop: 'storeRoom', label: '库别', width:100,  } },   
                                {attr: { prop: 'storePosition', label: '存放地', width:100,  } },   
                                //{attr: { prop: 'cId', label: '', width:100,  } },   
                                {attr: { prop: 'classNodebh', label: '类别编码', width:100,  } },   
                                {attr: { prop: 'quantity', label: '出料数量', width:100,  } },   
                                {attr: { prop: 'dateType', label: '来源类型', width:100,  } },   
                                //{attr: { prop: 'dataId', label: '', width:100,  } },   
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
                     this._getConcreteDeliveryOrderItemPageList(id);
            },300)
        },
        //预览单据接口
        _printPage(id){
            this.reportUrl=config.reportUrl+"/ConcreteDeliveryOrder.html?id="+id;
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
         _getConcreteDeliveryOrderPageList(){
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
                requestGetConcreteDeliveryOrderPageList(this.mainInput.inputModel).then(data =>{
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
         _getConcreteDeliveryOrderItemPageList(id){
                this.itemTableLoading=true; 
                var inputArr=[ 
                                {key:"OrderId",op:"EQ",value:id},
                                ];
                //排序
                this.itemInput.inputModel.sorting="sortCode asc";
                this.itemInput.addqueryConditionItem(inputArr);
                requestGetConcreteDeliveryOrderItemPageList(this.itemInput.inputModel).then(data =>{
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
            this._getConcreteDeliveryOrderPageList();
            this._funcState();
        },
        _itemReload(id){
             this._getConcreteDeliveryOrderItemPageList(id);
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
                requestDeleteConcreteDeliveryOrder(obj).then(data =>{
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
            requestAuditConcreteDeliveryOrder(this.selectRows[0].id).then(data=>{
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
             requestUnAuditConcreteDeliveryOrder(this.selectRows[0].id).then(data=>{
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
    },
     components:{
       Edit,
       'yl-organizeTree':organizeTree,
    },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

