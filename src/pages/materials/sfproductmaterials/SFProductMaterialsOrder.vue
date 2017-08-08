<template>
 <yl-panelpage :titleName="'半成品材料库'" :fullscreenisShow="true" :icon="'icon-library'">
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
                                <el-input  placeholder="材料名称" size="small" style="width:180px" v-model="searchModel.sInfoName"></el-input> 
                            </el-form-item>
                            
                            <el-form-item class="form-content-vertical">
                             <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                            </el-form-item>
                    </el-form>
            </yl-toolbar>
            <yl-toolbar>
                    <el-button-group ref="funtoolbar">
                            <el-button v-for="(item,index) in funBtnConf" 
                                :key="index"
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
            requestGetSFProductMaterialsOrderPageList,
            requestDeleteSFProductMaterialsOrder,
            requestGetSFProductMaterialsOrderItemPageList,
            requestAuditSFProductMaterialsOrder,
            requestUnAuditSFProductMaterialsOrder
       }   from 'api/materials/sfproductmaterialsorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import config from 'static/js/config';
import { mapActions } from 'vuex';
export default {
    data(){
        return{
             selectNode:{},
             searchModel:{
                       sInfoName:'',  
                    //    orderDate:new Date(),  
                       orgId:this.getUserInfo().user.manageOrgId,
                    },
             selectRows:[],
             addFormVisible:false,
             printDialogVisible:false,
             mainInput:new inputModel(),
             mainTableLoading:false,
             tableData:{},
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
                                permissionSetting:"Materials.Analyze.Rebar.SFProductMaterialsOrders.Create"
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
                                permissionSetting:"Materials.Analyze.Rebar.SFProductMaterialsOrders.Edit"
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
                                permissionSetting:"Materials.Analyze.Rebar.SFProductMaterialsOrders.Delete"
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
                                permissionSetting:"Materials.Analyze.Rebar.SFProductMaterialsOrders.Audit"
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
                                permissionSetting:"Materials.Analyze.Rebar.SFProductMaterialsOrders.UnAudit"
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
                         //   {attr: { prop: 'orderId', label: '明细', width:65, align: 'center',scopedSlot: 'id',showOverflowTooltip:false } },   
                           {attr: { prop: 'orderId', label: '预览', width:65, align: 'center',scopedSlot: 'view',showOverflowTooltip:false } },   
                            
                                // {attr: { prop: 'orgId', label: '记账单位', width:100,  } },  
                                {attr: { prop: 'isAudit', label: '审核状态', width:100,scopedSlot: 'isAudit'  } },  
                                // {attr: { prop: 'orderId', label: '记账单位', width:100,  } },   
                                // {attr: { prop: 'sInfoCode', label: '材料编码', width:100,  } },   
                                {attr: { prop: 'sInfoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'sInfoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'sInfoUnit', label: '单位', width:100,  } },     
                                {attr: { prop: 'orgName', label: '添加单位', width:150,  } },   
                                {attr: { prop: 'auditor', label: '审核人', width:100,  } }  ,
                                {attr: { prop: 'auditDate',label: '审核日期', width:100, } }, 
                                // {attr: { prop: 'isSate', label: '', width:100,  } },   
                                {attr: { prop: 'maker', label: '添加人', width:100,  } },   
                                {attr: { prop: 'makerDate', label: '添加日期', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注', width:100,  } },   
                                // {attr: { prop: 'extendColumn1', label: '', width:100,  } },   
                                // {attr: { prop: 'extendColumn2', label: '', width:100,  } },   
                                // {attr: { prop: 'extendColumn3', label: '', width:100,  } },   
                                    
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
                            
                                // {attr: { prop: 'orgId', label: '', width:100,  } },   
                                // {attr: { prop: 'itemId', label: '', width:100,  } },   
                                // {attr: { prop: 'orderId', label: '', width:100,  } },   
                                // {attr: { prop: 'infoNM', label: '', width:100,  } },   
                                {attr: { prop: 'infoCode', label: '材料编码', width:100,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:100,  } },   
                                // {attr: { prop: 'cId', label: '', width:100,  } },   
                                // {attr: { prop: 'classNodebh', label: '', width:100,  } },   
                                {attr: { prop: 'quantity', label: '数量', width:100,  } },   
                                {attr: { prop: 'conversionRate', label: '转换率', width:100,  } },   
                                {attr: { prop: 'quantityScd', label: '数量2', width:100,  } },   
                                {attr: { prop: 'conversionRateScd', label: '转换率2', width:100,  } },   
                                {attr: { prop: 'quantityTrd', label: '数量3', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注', width:100,  } },   
                                // {attr: { prop: 'extendColumn1', label: '', width:100,  } },   
                                // {attr: { prop: 'extendColumn2', label: '', width:100,  } },   
                                // {attr: { prop: 'extendColumn3', label: '', width:100,  } },   
                                    
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
                                       url: '/api/services/app/sFProductMaterialsOrder/GetSFProductMaterialsOrderItemPageList',
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
            this.reportUrl=config.reportUrl+"/SFProductMaterialsOrder.html?id="+id;
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
         _getSFProductMaterialsOrderPageList(){
                this.selectRows=[];
                this.mainTableLoading=true; 
                let _this=this;
                var inputArr=[ 
                                {key:"SInfoName",op:"LIKE",value:this.searchModel.sInfoName},
                                {key:"OrgId",op:"EQ",value:this.searchModel.orgId},
                                // {key:"OrderDate",op:"EQ",value:this.formatDate(this.searchModel.orderDate,"YYYY-MM")},
                             ];
                //排序
                this.mainInput.inputModel.sorting="SInfoName desc";
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetSFProductMaterialsOrderPageList(this.mainInput.inputModel).then(data =>{
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
            this._getSFProductMaterialsOrderPageList();
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
                requestDeleteSFProductMaterialsOrder(obj).then(data =>{
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
            requestAuditSFProductMaterialsOrder(this.selectRows[0].id).then(data=>{
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
             requestUnAuditSFProductMaterialsOrder(this.selectRows[0].id).then(data=>{
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
       //传入明细表结构
        this.setItem_tableConfig(this.tableItemConfig);
        this.setItem_funConfig(this.tableItemfunconfig);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

