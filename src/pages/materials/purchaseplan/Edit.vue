﻿<template>
<div>
  <el-row class="yl-order-header">
    <el-col :span="2">
      <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
      </el-col>
    <el-col :span="18" > 
     <div class="yl-order-title"><span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>采购计划</div>
    </el-col>
      <el-col :span="4">
      <div class="yl-order-code"><span style="color: red;">NO.</span>{{formModel.order.orderCode}}</div>
      </el-col>
 </el-row>
  <el-form  :model="formModel.order"  :rules="rules" ref="formModel" label-width="100px" >
<el-row>

        <el-col :span="8"> 
         <el-form-item label="记账单位" prop="orgId">
               <yl-organizeTree  
                v-model="formModel.order.orgId"  
                :placeholder="'请选择单位'"   
                :isexpand="true"
                @getCurrentNode="_getCurrentNodeOrg"  
                style="width:80%">
            </yl-organizeTree>
         </el-form-item>
       </el-col>
        <el-col :span="8"> 
         <el-form-item label="账期" prop="orderDate">
                <el-date-picker
                    v-model="formModel.order.orderDate"
                    @change="_dateSel" 
                    type="month"
                    style="width:80%"
                    placeholder="选择日期">
                </el-date-picker>
         </el-form-item>
       </el-col>
      
     </el-row>
         

     <el-row class="yl-row-TableEditor">
      <el-col :span="24"> 
        <yl-tableedit ref="tableedit"
            :tableConfig="tableEditConfig"
            :tableData="formModel.items"
            :sumRowConf="sumRowConf"
            :mapConfig="tableEditMapConfig"
            @delItem="_delItem"
        ></yl-tableedit>
       </el-col>
       
     </el-row>

   <el-row>
         <el-form-item label="备注" prop="remark">
             <el-input v-model="formModel.order.remark" type="textarea" row="5" style="width:90%" ></el-input>
         </el-form-item>
   </el-row>
    <el-row>
        <el-col :span="8"> 
            <el-form-item label="签字人一：" prop="personOne">
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="签字人二：" prop="personTwo">
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="制单人：" prop="maker">
                <span>{{formModel.order.maker}}</span>
            </el-form-item>
        </el-col>
    </el-row>
   <el-form-item style="text-align:right;" >
      <el-button type="primary" @click="_onSelect"><i class="icon-plus"></i>选材</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading"><i class="icon-floppy-disk"></i>保存</el-button>
  </el-form-item>
  
</el-form>


   <el-dialog ref="selectDialog2" title="选择"  
                 v-model="addFormVisible" size="large"  
                 top="8%" 
                 :modal="false"
                 :lock-scroll="true"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false" 
                 :close-on-click-modal="false"  >
                <yl-selectFromComMat    
                    :isSelectClose="true"
                    @close="_close"
                    v-if="addFormVisible">
                </yl-selectFromComMat>
  </el-dialog>


</div>
</template>
<script type="text/babel">
import selectFromComMat from 'ocomponents/selectmodule/selectFromComMat'
import config from 'static/js/config';
import {
            requestCreateOrUpdatePurchasePlanOrder,
            requestGetPurchasePlanOrderForEdit,
            requestDeletePurchasePlanOrderItemItem,
        }   from 'api/materials/purchaseplan';
import organizeTree from 'ocomponents/organize/organizeTree';

export default {
    data(){
        return{
            formModel:{
                    order:{
                             orderId:'',
                             orgId:this.getUserInfo().user.manageOrgId,
                             orgName:this.getUserInfo().user.manageOrgName,
                             orderDate:new Date(),
                             orderCode:'',
                             planType:'',
                             isAudit:false,
                             auditor:'',
                             auditDate:'',
                             isState:0,
                             maker:'',
                             makerDate:'',
                             personOne:'',
                             personTwo:'',
                             personThree:'',
                             personFour:'',
                             personFive:'',
                             sortCode:0,
                             remark:'',
                        },
                        items:[],
                        config:{isGenerateCode:true},
            },
            rules: {
                   
                            
                            orgId: [
                              { required: true, message: '组织机构不能为空！', trigger: 'change' }
                            ],
                            orderDate: [
                              {type:'date', required: true, message: '账期不能为空！', trigger: 'blur' }
                            ],
                        
            },
            sumRowConf:{
                            disable:false, //是否显示
                            sumText:'合计', //合计文本
                            items:{
                              //合计项配置
                            //    planQuantity:{text:'数量合计',sumval:0.00,capitalCol:false},
                            //    lossQuantity:{text:'损耗量合计',sumval:0.00,capitalCol:false},
                               responseSum:{text:'金额合计',sumval:0.00,capitalCol:true}
                            }
                        },
            loading:false,
            addFormVisible:false,
            orderDateInital:'',
            title:config.Order.title,
        }       
    },
    props:{
        selectRow:{
            type:Object,
            default:{},
        },
        isVisible:{
             type:Boolean,
             default:false,
        }
    },
    computed: { 
        tableEditConfig:{
                get () {
                    return {
                        table: {
                            attr: {
                                highlightCurrent:true,
                                style:{width:'100%',height:'300px'},
                            }
                        },
                        columns: [
                            {attr: { type: 'index',label: '序号', width:65,align: 'center' }},
                            //列配合
                                // {attr: { prop: 'itemId', label: '主键', width:100,  } },   
                                // {attr: { prop: 'orderId', label: '单据id', width:100,  } },   
                                // {attr: { prop: 'orgId', label: '组织机构id', width:100,  } },   
                                // {attr: { prop: 'infoNM', label: '材料id', width:100,  } },   
                                // {attr: { prop: 'infoCode', label: '编码', width:100,  } },   
                                {attr: { prop: 'infoName', label: '名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:100,  } },   
                                // {attr: { prop: 'cId', label: '类别id', width:100,  } },   
                                // {attr: { prop: 'classNodeBh', label: '类别编号', width:100,  } },   
                                {attr: { prop: 'quantity', label: '计划数量', width:120,  scopedSlot:'quantity'} },   
                                // {attr: { prop: 'sPQuantity', label: '', width:100,  } },   
                                {attr: { prop: 'responsePrice', label: '计划价格', width:120,scopedSlot:'responsePrice'  } },   
                                {attr: { prop: 'responseSum', label: '计划金额', width:120,scopedSlot:'responseSum'  } },   
                                {attr: { prop: 'qualityStandard', label: '质量标准', width:100, scopedSlot:'qualityStandard' } },   
                                {attr: { prop: 'inTime', label: '进场时间', width:100,  scopedSlot:'inTime' } },   
                                {attr: { prop: 'remark', label: '备注',  scopedSlot:'remark' } },   
                                    
                            //注意：最后一列如果不设置列宽将会自动宽度补全
                        ],
                        
                        
                        //编辑列具名配置
                        solSlotConf:[ {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'quantity',  //字段名称
                                        elmentConfig:{  //控件配置   参照elementui配置参数
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, }, 
                                         eventconf:{     //事件配置  目前只支持input的 blur事件
                                                ison:true,  //开启事件
                                                event:(row,name)=>{  //事件逻辑
                                                    if(this.checkdecimalfn(row.quantity)){
                                                         row.responseSum=parseFloat(row.quantity)*row.responsePrice;
                                                    }else{
                                                         row.quantity=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'inTime',  //字段名称
                                        elmentConfig:{  //控件配置   参照elementui配置参数
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, }, 
                                         eventconf:{     //事件配置  目前只支持input的 blur事件
                                                ison:true,  //开启事件
                                                event:(row,name)=>{  //事件逻辑
                                                   //  if(this.checkdecimalfn(row.planQuantity)){
                                                    //      row.responseSum=parseFloat(row.planQuantity)*row.responsePrice;
                                                    //      row.lossQuantity=parseFloat(row.planQuantity)*row.loassRate/100;
                                                    // }else{
                                                    //      row.planQuantity=0.00;
                                                    //      this.$message.error('输入类型有误！');
                                                    // }
                                                    // this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'responsePrice',  //字段名称
                                        elmentConfig:{  //控件配置   参照elementui配置参数
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, }, 
                                         eventconf:{     //事件配置  目前只支持input的 blur事件
                                                ison:true,  //开启事件
                                                event:(row,name)=>{  //事件逻辑
                                                    if(this.checkdecimalfn(row.responsePrice)){
                                                         row.responseSum=row.quantity*parseFloat(row.responsePrice);
                                                    }else{
                                                         row.responsePrice=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'responseSum',  //字段名称
                                        elmentConfig:{  //控件配置   参照elementui配置参数
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, }, 
                                         eventconf:{     //事件配置  目前只支持input的 blur事件
                                                ison:true,  //开启事件
                                                event:(row,name)=>{  //事件逻辑
                                                    if(this.checkdecimalfn(row.responseSum)){
                                                         row.responsePrice=row.quantity==0?0:parseFloat(row.responseSum)/row.quantity;
                                                    }else{
                                                         row.responseSum=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'qualityStandard',  //字段名称
                                        elmentConfig:{  //控件配置   参照elementui配置参数
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, }, 
                                         eventconf:{     //事件配置  目前只支持input的 blur事件
                                                ison:true,  //开启事件
                                                event:(row,name)=>{  //事件逻辑
                                                   //  if(this.checkdecimalfn(row.planQuantity)){
                                                    //      row.responseSum=parseFloat(row.planQuantity)*row.responsePrice;
                                                    //      row.lossQuantity=parseFloat(row.planQuantity)*row.loassRate/100;
                                                    // }else{
                                                    //      row.planQuantity=0.00;
                                                    //      this.$message.error('输入类型有误！');
                                                    // }
                                                    // this._sumCount();
                                                },
                                             }
                                         },
                                          {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'remark',  //字段名称
                                        elmentConfig:{  //控件配置   参照elementui配置参数
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, }, 
                                         eventconf:{     //事件配置  目前只支持input的 blur事件
                                                ison:true,  //开启事件
                                                event:(row,name)=>{  //事件逻辑
                                                   //  if(this.checkdecimalfn(row.planQuantity)){
                                                    //      row.responseSum=parseFloat(row.planQuantity)*row.responsePrice;
                                                    //      row.lossQuantity=parseFloat(row.planQuantity)*row.loassRate/100;
                                                    // }else{
                                                    //      row.planQuantity=0.00;
                                                    //      this.$message.error('输入类型有误！');
                                                    // }
                                                    // this._sumCount();
                                                },
                                             }
                                         },
                                         
                                    
                        ],
                        
                    }
                }
            },
        tableEditMapConfig:{
             get () {
                 return {
                     mapconf: [   
                                     //明细编辑列和选材控件列映射配置
                                { prop: 'id', isplace: false, defaultval:'0',selprop: '' },    //主键列
                                { prop: 'dataId', isplace: true, defaultval:'',selprop: 'id' }, //来源ID
                                { prop: 'dataType', isplace: false, defaultval:'0',selprop: '' },  //来源类型  // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材     
                                { prop: 'guid', isplace: false, defaultval:this.newGuid(),selprop: '' },  //临时ID唯一键
                                { prop: 'itemId', isplace: true,defaultval:'', selprop:'itemId',  },   
                                { prop: 'orderId', isplace: true,defaultval:'', selprop:'orderId',  },   
                                { prop: 'orgId', isplace: true,defaultval:'', selprop:'orgId',  },   
                                { prop: 'infoNM', isplace: true,defaultval:'', selprop:'id',  },   
                                { prop: 'infoCode', isplace: true,defaultval:'', selprop:'infoCode',  },   
                                { prop: 'infoName', isplace: true,defaultval:'', selprop:'infoName',  },   
                                { prop: 'infoModel', isplace: true,defaultval:'', selprop:'infoModel',  },   
                                { prop: 'infoUnit', isplace: true,defaultval:'', selprop:'infoUnit',  },   
                                { prop: 'cId', isplace: true,defaultval:'', selprop:'cId',  },   
                                { prop: 'classNodeBh', isplace: true,defaultval:'', selprop:'classNodeBh',  },   
                                { prop: 'quantity', isplace: false,defaultval:0, selprop:'quantity',  },   
                                { prop: 'sPQuantity', isplace: false,defaultval:0, selprop:'sPQuantity',  },   
                                { prop: 'responsePrice', isplace: false,defaultval:0, selprop:'responsePrice',  },   
                                { prop: 'responseSum', isplace: false,defaultval:0, selprop:'responseSum',  },   
                                { prop: 'qualityStandard', isplace: true,defaultval:'', selprop:'qualityStandard',  },   
                                { prop: 'inTime', isplace: true,defaultval:'', selprop:'inTime',  },   
                                { prop: 'remark', isplace: true,defaultval:'', selprop:'remark',  },   
                                { prop: 'sortCode', isplace: false,defaultval:0, selprop:'',  },     
                               
                               
                            ] 
                 }
             }
         },
    }, 
    methods:{
         _sumCount(colName){
             //计算列的合计值  合计方法计算逻辑
           let responseSumTotal=0.00;
           this.formModel.items.map((item)=>{
                //凡是手动输入后的input都会转化为str  因此计算时要转化一下。
            //    planQuantityTotal=planQuantityTotal+parseFloat(item.planQuantity);
            //    lossQuantityTotal=lossQuantityTotal+parseFloat(item.lossQuantity);
               responseSumTotal=responseSumTotal+parseFloat(item.responseSum);
           })
        //    this.sumRowConf.items.planQuantity.sumval=planQuantityTotal.toFixed(2);
        //    this.sumRowConf.items.lossQuantity.sumval=lossQuantityTotal.toFixed(2);
           this.sumRowConf.items.responseSum.sumval=responseSumTotal.toFixed(2);
         },
         _formInitial(){
            //初始化表单
            requestGetPurchasePlanOrderForEdit(this.selectRow.id).then(data=>{
                if(data.success){
                     Object.assign(this.formModel,data.result); 
                     this.orderDateInital=this.formModel.order.orderDate;
                     this.formModel.order.orderDate=new Date(this.formModel.order.orderDate);
                     this._sumCount();
                }else{
                     this.$message.error('获取编辑表信息失败！');
                }
            });
          },
         _delItem(row){
                this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning',
                modal:false
                }).then(() => {
                        if(row.id!=="0"){
                            //后台删除
                            let obj={};
                            obj.id=row.id;
                            requestDeletePurchasePlanOrderItem(obj).then(data=>{
                                if(data.success){
                                     let index=this.formModel.items.indexOf(row);
                                     this.formModel.items.splice(index,1);
                                      this._sumCount();
                                    this.$notify({
                                            title: '成功',
                                            message: '删除数据成功！',
                                            type: 'success'
                                            });
                            }else {
                                this.$notify.error({
                                    title: '错误',
                                      message: '删除数据失败！'+data.error.message,
                                    });
                             }
                            })
                        }else{
                         //前台删除
                            let index=this.formModel.items.indexOf(row);
                            this.formModel.items.splice(index,1);
                             this._sumCount();
                            this.$notify({
                                            title: '成功',
                                            message: '删除数据成功！',
                                            type: 'success'
                                            });
                        }
                       
                }).catch(()=>{});
            },
         _onSubmit() {
                let _this=this;
                this.formModel.order.orderDate=new Date(this.formModel.order.orderDate);
                this.$refs.formModel.validate((valid) => {
                    if (valid) {
                        this.formModel.items=this.$refs.tableedit.getEditData();
                        if(this.formModel.items.length==0){
                              this.$message({ message: `请选择材料明细！`, type: 'warning'});
                              return;
                        }
                        this.formModel.order.orderDate=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
                        this.formModel.order.isAudit=false;
                        if(this.formModel.order.orderId!==""){
                            //修改
                             if(this.orderDateInital==this.formModel.order.orderDate){
                                 this.formModel.config.isGenerateCode=false;
                             }
                        }
                        this.loading=true;
                        requestCreateOrUpdatePurchasePlanOrder(this.formModel).then((data)=>{
                            if(data.success){
                                this.$notify({
                                    title: '成功',
                                    message: '保存数据成功！',
                                    type: 'success'
                                    });
                                //关闭面板
                                this._complete();
                            } 
                            else {
                                 this.$message.error('保存数据失败！'+data.error.message);
                            }
                            this.loading=false;
                        }).catch(function(error){
                                _this.loading=false;
                        });
                    }else{
                         this.$message({ message: `请按照条件填写表单！`, type: 'warning'});
                    }
                });
            },
         _resetForm() {
                this.$refs.formModel.resetFields();
          },
         _complete(){
                this.$emit('close');
           },
         _close(){
                //关闭选材框
                this.addFormVisible=false;
                this._sumCount();
          },
         _onSelect(){
             //打开选材框的权限判断
            //  this.tableEditMapConfig=this.tableEditMapConfig;
             this.addFormVisible=true;
          },
        _getCode(val){
             this.generateOrderCode('PL_PurchasePlanOrder',this.formModel.order.orgId,val,(val)=>{
                     this.formModel.order.orderCode=val;
             });
         },
        _dateSel(val){
           this._getCode(val);
        },
         _getCurrentNodeOrg(data){
            this.formModel.order.orgName=data.text;//模板问题O大写
            let val=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
            this._getCode(val);
            },
    },
    mounted(){
        if(this.selectRow.id!=undefined){
             //修改
             this._formInitial();
         } else{
             let val=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
             this._getCode(val);
         }
    },    
    components:{
       'yl-selectFromComMat':selectFromComMat,
       'yl-organizeTree':organizeTree,
    },
    watch:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
