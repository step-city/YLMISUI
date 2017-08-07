<template>
<div>
  <el-row class="yl-order-header">
    <el-col :span="2">
      <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
      </el-col>
    <el-col :span="18" > 
     <div class="yl-order-title"><span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>周转材料调入单</div>
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
                        :placeholder="'请选择记帐单位'"
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
                        :editable="false"
                        placeholder="请选择账期"
                        style="width:80%">
                </el-date-picker>
            </el-form-item>
        </el-col>   
        <el-col :span="8"> 
         <el-form-item label="调入单位" prop="allotInOrgId">
             <yl-organizeTree
                        v-model="formModel.order.allotInOrgId"
                        :placeholder="'请选择调入单位'"
                         :isexpand="true" 
                        @getCurrentNode="_getCurrentAllot"
                        style="width:80%">
                </yl-organizeTree>
            </el-form-item>
       </el-col>
     </el-row>
     <el-row>
         <el-col :span="8">
      <el-form-item label="发票号" prop="invoiceNO">
             <el-input v-model="formModel.order.invoiceNO" style="width:80%" ></el-input>
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
          <el-input v-model="formModel.order.remark" type="textarea" row="5" style="width:95%"></el-input>
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
            requestCreateOrUpdateTurnoverAllotInOrder,
            requestGetTurnoverAllotInOrderForEdit,
            requestDeleteTurnoverAllotInOrderItem,
        }   from 'api/materials/turnoverallotinorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import ComSupplier from 'ocomponents/comsupplier/ComSupplier'
export default {
    data(){
        return{
            formModel:{
                    order:{
                             orderDate:new Date(),
                             orderId:'',
                             orgId:this.getUserInfo().user.manageOrgId,
                             orgName:this.getUserInfo().user.manageOrgName,
                             orderCode:'',
                             allotInOrgId:'',
                             allotInOrgName:'',
                             storeRoom:'',
                             storePosition:'',
                             invoiceNO:'',
                             dataType:'',
                             dataId:'',
                             isAudit:'',
                             auditor:'',
                             auditDate:'',
                             isSate:'',
                             maker:'',
                             makerDate:'',
                             personOne:'',
                             personTwo:'',
                             personThree:'',
                             personFour:'',
                             personFive:'',
                             remark:'',
                             extendColumn1:'',
                             extendColumn2:'',
                             extendColumn3:'',
                        },
                        items:[],
                        config:{isGenerateCode:true},
            },
            rules: {
                   
                            
                            orgId: [
                              { required: true, message: '记账单位不能为空！', trigger: 'change' }
                            ],
                            orderDate: [
                              {type:'date', required: true, message: '账期不能为空！', trigger: 'blur' }
                            ],
                            allotInOrgId: [
                              { required: true, message: '调入单位不能为空！', trigger: 'change' }
                            ],
                         
            },
            sumRowConf:{
                            disable:false, //是否显示
                            sumText:'合计', //合计文本
                            items: {
                    bookOriginalValue: { text: '原值', sumval: 0.00, capitalCol: true },
                    allotInOriginalValue: { text: '调入原值', sumval: 0.00, capitalCol: false }
                }
                        },
            loading:false,
            addFormVisible:false,
            orderDateInital:'',
            title:config.Order.title,
            tableEditMapConfig:{},
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
                            {attr: { prop: 'id', label: '操作', width:65,scopedSlot: 'id',} },
                                //{attr: { prop: 'infoCode', label: '材料编码', width:100,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:100,  } },     
                                {attr: { prop: 'amortizeType', label: '摊销方式', width:150, scopedSlot: 'amortizeType',  } },   
                                //{attr: { prop: 'barCode', label: '条码', width:100,  } },   
                                {attr: { prop: 'quantity', label: '数量', width:100,  scopedSlot: 'quantity', } },   
                                {attr: { prop: 'bookPrice', label: '单价', width:100, scopedSlot: 'bookPrice',  } },   
                                {attr: { prop: 'bookOriginalValue', label: '原值', width:100,  scopedSlot: 'bookOriginalValue',} },   
                                {attr: { prop: 'allotInPrice', label: '调入价', width:100, scopedSlot: 'allotInPrice',  } },   
                                {attr: { prop: 'allotInOriginalValue', label: '调入原值', width:100,  scopedSlot: 'allotInOriginalValue',} }, 
                                {attr: { prop: 'remark', label: '备注', scopedSlot: 'remark', } },   
                                    
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
                                                         row.bookOriginalValue=parseFloat(row.quantity)*row.bookPrice;
                                                         row.allotInOriginalValue=parseFloat(row.quantity)*row.allotInPrice;
                                                    }else{
                                                         row.quantity=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                          { type:'input',name:'bookPrice', 
                                        elmentConfig:{
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, 
                                                }, 
                                          eventconf:{
                                                    ison: true,
                                                    event: (row, name) => {
                                                        if (this.checkdecimalfn(row.bookPrice)) {
                                                            row.bookOriginalValue = parseFloat(row.bookPrice) * row.quantity;
                                                            row.allotInPrice=parseFloat(row.bookPrice);
                                                            row.allotInOriginalValue=row.bookOriginalValue ;
                                                        } else {
                                                            row.bookPrice = 0.00;
                                                            this.$message.error('输入类型有误！');
                                                        }
                                                        this._sumCount();
                                                    },
                                                }
                                            },
                                             { type:'input',name:'bookOriginalValue', 
                                        elmentConfig:{
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, 
                                                }, 
                                          eventconf:{
                                                    ison: true,
                                                    event: (row, name) => {
                                                        if (this.checkdecimalfn(row.bookOriginalValue)) {
                                                            row.bookPrice=row.quantity==0?0 :parseFloat(row.bookOriginalValue)/ row.quantity;
                                                            row.allotInPrice=row.bookPrice;
                                                            row.allotInOriginalValue=parseFloat(row.bookOriginalValue);
                                                        } else {
                                                            row.bookOriginalValue = 0.00;
                                                            this.$message.error('输入类型有误！');
                                                        }
                                                        this._sumCount();
                                                    },
                                                }
                                            },
                                     { type:'input',name:'allotInPrice', 
                                        elmentConfig:{
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, 
                                                }, 
                                          eventconf:{
                                                     ison: true,
                                                    event: (row, name) => {
                                                        if (this.checkdecimalfn(row.allotInPrice)) {
                                                            row.allotInOriginalValue = parseFloat(row.allotInPrice) * row.quantity
                                                        } else {
                                                            row.allotInPrice = 0.00;
                                                            this.$message.error('输入类型有误！');
                                                        }
                                                        this._sumCount();
                                                    },
                                                }
                                            },
                                            { type:'input',name:'allotInOriginalValue', 
                                        elmentConfig:{
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, 
                                                }, 
                                          eventconf:{
                                                     ison: true,
                                                    event: (row, name) => {
                                                        if (this.checkdecimalfn(row.allotInOriginalValue)) {
                                                            row.allotInPrice = row.quantity ==0?0 :parseFloat(row.allotInOriginalValue) / row.quantity
                                                        } else {
                                                            row.allotInOriginalValue = 0.00;
                                                            this.$message.error('输入类型有误！');
                                                        }
                                                        this._sumCount();
                                                    },
                                                }
                                            },
                                     {  type:'datadictionaryforsel',
                                       name:'amortizeType', 
                                       elmentConfig:{
                                            code:"AmortizeType",
                                            placeholder:"请选择"
                                             }
                                    },
                                     { type:'input',name:'remark', 
                                        elmentConfig:{
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, 
                                                }, 
                                          eventconf:{
                                                    ison:false,
                                                    event:(row)=>{
                                                    },
                                             }
                                    },
                                    
                        ],
                        
                    }
                }
            },
        MapConfig1:{
             get () {
                 return {
                     mapconf: [   
                                     //明细编辑列和选材控件列映射配置
                                { prop: 'id', isplace: false, defaultval:'0',selprop: '' },    //主键列
                                { prop: 'dataId', isplace: true, defaultval:'',selprop: 'id' }, //来源ID
                                { prop: 'dataType', isplace: false, defaultval:'0',selprop: '' },  //来源类型  // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材     
                                { prop: 'guid', isplace: false, defaultval:this.newGuid(),selprop: '' },  //临时ID唯一键
                                { prop: 'itemId', isplace: true,defaultval:'', selprop:'itemId',  },   
                                { prop: 'orgId', isplace: true,defaultval:'', selprop:'orgId',  },   
                                { prop: 'orderId', isplace: true,defaultval:'', selprop:'orderId',  },   
                                { prop: 'infoNM', isplace: true,defaultval:'', selprop:'id',  },   
                                { prop: 'infoCode', isplace: true,defaultval:'', selprop:'infoCode',  },   
                                { prop: 'infoName', isplace: true,defaultval:'', selprop:'infoName',  },   
                                { prop: 'infoModel', isplace: true,defaultval:'', selprop:'infoModel',  },   
                                { prop: 'infoUnit', isplace: true,defaultval:'', selprop:'infoUnit',  },   
                                { prop: 'cId', isplace: true,defaultval:'', selprop:'cId',  },   
                                { prop: 'classNodebh', isplace: true,defaultval:'', selprop:'classNodeBh',  },   
                                { prop: 'barCode', isplace: true,defaultval:'', selprop:'barCode',  },   
                                { prop: 'storeRoom', isplace: true,defaultval:'', selprop:'storeRoom',  },   
                                { prop: 'storePosition', isplace: true,defaultval:'', selprop:'storePosition',  },   
                                { prop: 'quantity', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'bookPrice', isplace: true,defaultval:0, selprop:'responsiPrice',  },   
                                { prop: 'bookOriginalValue', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'allotInPrice', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'allotInOriginalValue', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'amortizeType', isplace: false,defaultval:'', selprop:'',  },   
                                { prop: 'isRule', isplace: true,defaultval:'', selprop:'isRule',  },   
                                { prop: 'dateType', isplace: false,defaultval:'', selprop:'',  },   
                                { prop: 'dataId', isplace: true,defaultval:'', selprop:'id',  },   
                                { prop: 'remark', isplace: false,defaultval:'', selprop:'',  },   

                            ] 
                 }
             }
         },
    }, 
    methods:{
        _sumCount(colName) {
            //计算列的合计值  合计方法计算逻辑
            let bookOriginalValue = 0.00, allotInOriginalValue = 0.00;
            this.formModel.items.map((item) => {
                //凡是手动输入后的input都会转化为str  因此计算时要转化一下。
                bookOriginalValue = bookOriginalValue + parseFloat(item.bookOriginalValue);
                allotInOriginalValue = allotInOriginalValue + parseFloat(item.allotInOriginalValue);
            })
            this.sumRowConf.items.allotInOriginalValue.sumval = allotInOriginalValue.toFixed(2);
            this.sumRowConf.items.bookOriginalValue.sumval = bookOriginalValue.toFixed(2);
        },
         _formInitial(){
            //初始化表单
            requestGetTurnoverAllotInOrderForEdit(this.selectRow.id).then(data=>{
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
                            requestDeleteTurnoverAllotInOrderItem(obj).then(data=>{
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
                //this.formModel.order.orderDate=new Date(this.formModel.order.orderDate);
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
                        requestCreateOrUpdateTurnoverAllotInOrder(this.formModel).then((data)=>{
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
       _getCurrentNodeOrg(data){
            this.formModel.order.orgName=data.text;
            let val=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
            this._getCode(val);
        },
        _getCurrentAllot(data){
            this.formModel.order.allotInOrgName=data.text;
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
             this.tableEditMapConfig=this.MapConfig1;
             this.addFormVisible=true;
          },
        _getCode(val){
             this.generateOrderCode('T_TurnoverAllotInOrder',this.formModel.order.orgId,val,(val)=>{
                     this.formModel.order.orderCode=val;
             });
         },
        _dateSel(val){
           this._getCode(val);
        }
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
