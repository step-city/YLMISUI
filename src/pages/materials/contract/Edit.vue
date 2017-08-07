<template>
<div>
  <el-row class="yl-order-header">
    <el-col :span="2">
      <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
      </el-col>
    <el-col :span="18" > 
     <div class="yl-order-title"><span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>采购合同</div>
    </el-col>
      <el-col :span="4">
      <div class="yl-order-code"><span style="color: red;">NO.</span>{{formModel.order.orderCode}}</div>
      </el-col>
 </el-row>
  <el-form  :model="formModel.order"  :rules="rules" ref="formModel" label-width="100px" >
<el-row>
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
            <el-form-item label="供应商" prop="supplierName">
                <yl-comsupplier v-model="formModel.order.supplierName" @selectNode="selectNodeSupplier" style="width:80%"></yl-comsupplier>
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="合同类型" prop="contractType">
                <yl-dataDictionaryForSel :code="'ContractType'" v-model="formModel.order.contractType"  :placeholder="'请选择'"  style="width:80%">
                </yl-dataDictionaryForSel>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
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
        <el-col :span="8"> 
            <el-form-item label="合同编号" prop="contractCode">
                <el-input v-model="formModel.order.contractCode" style="width:80%" ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="合同名称" prop="contractName">
                <el-input v-model="formModel.order.contractName" style="width:80%" ></el-input>
            </el-form-item>
        </el-col>
        
    </el-row>
    <el-row>
        <el-col :span="8"> 
            <el-form-item label="签订日期" prop="awardDate">
                <el-date-picker
                    v-model="formModel.order.awardDate"
                    type="date"
                    :editable="false"
                    style="width:80%"
                    placeholder="选择月">
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="合同金额" prop="contractPrice">
                <el-input v-model="formModel.order.contractPrice" style="width:80%" ></el-input>
            </el-form-item>
        </el-col>
    </el-row>
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
             <el-col :span="12"> 
                <el-form-item label="备注" prop="remark">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        style="width:90%"
                        v-model="formModel.order.remark">
                    </el-input>
                </el-form-item>
            </el-col>
                <el-col :span="12"> 
                <el-form-item label="合同内容" prop="contractContent">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        style="width:90%"
                        v-model="formModel.order.contractContent">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6"> 
                <el-form-item label="物资主管：" prop="personOne">
                </el-form-item>
            </el-col>
            <el-col :span="6"> 
                <el-form-item label="物资部长：" prop="personTwo">
                </el-form-item>
            </el-col>
            <el-col :span="6"> 
                <el-form-item label="财务：" prop="personThree">
                </el-form-item>
            </el-col>
            <el-col :span="6"> 
                <el-form-item label="制单人：" prop="maker">
                    <span>{{formModel.order.maker}}</span>
                </el-form-item>
            </el-col>
        </el-row>
   
   <el-form-item style="text-align:right;" >
      <el-button type="primary" @click="_onSelect"><i class="icon-plus"></i>选材</el-button>
      <el-button type="primary" @click="_onSelectPlan"><i class="icon-plus"></i>计划选材</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading"><i class="icon-floppy-disk"></i>保存</el-button>
      <!--<el-button type="danger" @click="_complete" ><i class="icon-cancel-circle"></i>关闭</el-button>-->
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
<el-dialog ref="selectDialog3" title="计划"  
                 v-model="addFormVisiblePlan" size="small"  
                 top="8%" 
                 :modal="false"
                 :lock-scroll="true"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false" 
                 :close-on-click-modal="false"  >
                <yl-selectFromPlan    
                    :isSelectClose="true"
                    @close="_closePlan"
                    v-if="addFormVisiblePlan">
                </yl-selectFromPlan>
  </el-dialog>

</div>
</template>
<script type="text/babel">
import selectFromComMat from 'ocomponents/selectmodule/selectFromComMat'
import config from 'static/js/config';
import {
            requestCreateOrUpdateContractOrder,
            requestGetContractOrderForEdit,
            requestDeleteContractOrderItem,
        }   from 'api/materials/contractorder';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel';
import organizeTree from 'ocomponents/organize/organizeTree';
import ComSupplier from 'ocomponents/comsupplier/ComSupplier';
import selectFromPlan from 'ocomponents/selectmodule/selectFromPlan'

export default {
    data(){
        return{
            formModel:{
                    order:{
                        // orderDate:new Date(),   orderDate 需要初始化
                             orderId:'',
                             orgId:this.getUserInfo().user.manageOrgId,
                             orgName:'',
                             orderCode:'',
                             orderDate:new Date(),
                             contractCode:'',
                             contractName:'',
                             contractType:'',
                             supplierId:'',
                             supplierName:'',
                             awardDate:new Date(),
                             contractPrice:0,
                             contractContent:'',
                             isAudit:'',
                             auditor:'',
                             auditDate:'',
                             maker:'',
                             makerDate:'',
                             isSate:'',
                             personOne:'',
                             personTwo:'',
                             personThree:'',
                             personFour:'',
                             personFive:'',
                             remark:'',
                        },
                        items:[],
                        config:{isGenerateCode:true},
            },
            rules: {
                   
                            // orderId: [
                            //   { required: true, message: '主键不能为空！', trigger: 'blur' }
                            // ],
                            orgId: [
                              { required: true, message: '组织id不能为空！', trigger: 'change' }
                            ],
                            // orgName: [
                            //   { required: true, message: '组织名称不能为空！', trigger: 'blur' }
                            // ],
                            orderCode: [
                              { required: true, message: '合同号不能为空！', trigger: 'blur' }
                            ],
                            orderDate: [
                               { type: 'date', required: true, message: '合同日期不能为空！', trigger: 'change' }
                            ],
                            contractCode: [
                              { required: true, message: '合同编号不能为空！', trigger: 'blur' }
                            ],
                            contractName: [
                              { required: true, message: '合同名称不能为空！', trigger: 'blur' }
                            ],
                            contractType: [
                              { required: true, message: '标的类型不能为空！', trigger: 'change' }
                            ],
                            // supplierId: [
                            //   { required: true, message: '供应商id不能为空！', trigger: 'blur' }
                            // ],
                            supplierName: [
                              { required: true, message: '供应商名称不能为空！', trigger: 'change' }
                            ],
                            awardDate: [
                               { type: 'date', required: true, message: '签订日期不能为空！', trigger: 'change' }
                            ],
                            contractPrice: [
                              { validator: this.checkdecimal,  message: '合同金额请输入数字！', trigger: 'blur' }
                            ],
                            // contractContent: [
                            //   { required: true, message: '合同内容不能为空！', trigger: 'blur' }
                            // ],
                            // isAudit: [
                            //   { required: true, message: '审核状态不能为空！', trigger: 'blur' }
                            // ],
                            // auditor: [
                            //   { required: true, message: '审核人不能为空！', trigger: 'blur' }
                            // ],
                            // auditDate: [
                            //   { required: true, message: '审核日期不能为空！', trigger: 'blur' }
                            // ],
                            // makerDate: [
                            //   { required: true, message: '制单日期不能为空！', trigger: 'blur' }
                            // ],
                            // isSate: [
                            //   { required: true, message: '审批状态不能为空！', trigger: 'blur' }
                            // ],
                            // remark: [
                            //   { required: true, message: '备注不能为空！', trigger: 'blur' }
                            // ],
                        
            },
            sumRowConf:{
                            disable:false, //是否显示
                            sumText:'合计', //合计文本
                            items:{
                              //合计项配置
                               contractQuantity:{text:'数量：',sumval:0.00,capitalCol:false},
                               contractUnitSum:{text:'税前金额：',sumval:0.00,capitalCol:false},
                               contractBookSum:{text:'税后金额：',sumval:0.00,capitalCol:true},
                               contractTaxSum:{text:'税额：',sumval:0.00,capitalCol:false}
                            }
                        },
            loading:false,
            addFormVisible:false,
            orderDateInital:'',
            title:config.Order.title,
            addFormVisiblePlan:false,
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
                            //列配合
                            {attr: { prop: 'id', label: '操作', width:65,scopedSlot: 'id',} }, 
                                // {attr: { prop: 'itemId', label: '主键', width:100,  } },   
                                // {attr: { prop: 'orgId', label: '组织id', width:100,  } },   
                                // {attr: { prop: 'orderId', label: '单据id', width:100,  } },   
                                // {attr: { prop: 'bgOrderId', label: '变更id', width:100,  } },   
                                // {attr: { prop: 'infoNM', label: '材料主键', width:100,  } },   
                                //{attr: { prop: 'infoCode', label: '材料编码', width:100,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:65,  } },   
                                // {attr: { prop: 'cId', label: '类别id', width:100,  } },   
                                // {attr: { prop: 'classNodebh', label: '类别编号', width:100,  } },   
                                {attr: { prop: 'quantity', label: '数量', width:100, scopedSlot: 'quantity', } },   
                                {attr: { prop: 'taxRate', label: '税率', width:70, scopedSlot: 'taxRate',   } },   
                                {attr: { prop: 'unitPrice', label: '税前单价', width:100, scopedSlot: 'unitPrice',   } },  
                                {attr: { prop: 'bookPrice', label: '税后单价', width:100,  scopedSlot: 'bookPrice',  } },     
                                {attr: { prop: 'unitSum', label: '税前金额', width:100,  scopedSlot: 'unitSum',  } },  
                                {attr: { prop: 'bookSum', label: '税后金额', width:100,  scopedSlot: 'bookSum',  } }, 
                                {attr: { prop: 'taxSum', label: '税额', width:100,  scopedSlot: 'taxSum',  } },   
                                // {attr: { prop: 'dataType', label: '数据来源0 总计划1 材料库', width:100,  } },   
                                // {attr: { prop: 'dataId', label: '数据来源id', width:100,  } },   
                                // {attr: { prop: 'isAudit', label: '状态', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注', width:100,   scopedSlot: 'remark',} },   
                                    
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
                                                         row.unitSum=parseFloat(row.quantity)*(row.unitPrice==null?0:row.unitPrice);
                                                         row.bookSum=parseFloat(row.quantity)*(row.bookPrice==null?0:row.bookPrice);
                                                    }else{
                                                         row.quantity=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'taxRate',  //字段名称
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
                                         name:'unitPrice',  //字段名称
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
                                         name:'unitSum',  //税前金额
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
                                                    if(this.checkdecimalfn(row.unitSum)){
                                                         row.unitPrice=row.quantity==0?0:(parseFloat(row.unitSum)/row.quantity);
                                                    }else{
                                                         row.unitSum=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'bookPrice',  //字段名称
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
                                         name:'bookSum',  //字段名称
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
                                                    if(this.checkdecimalfn(row.bookSum)){
                                                         row.bookPrice=row.quantity==0?0:parseFloat(row.bookSum)/row.quantity;
                                                         row.unitPrice=row.bookPrice/(1+row.taxRate/100)
                                                         row.unitSum=row.quantity*row.unitPrice;
                                                         row.taxSum=parseFloat(row.bookSum)-row.unitSum;
                                                    }else{
                                                         row.bookSum=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'taxSum',  //字段名称
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
                                                    if(this.checkdecimalfn(row.taxSum)){
                                                         row.bookSum=parseFloat(row.taxSum)+parseFloat(row.unitSum);
                                                         row.bookPrice=row.quantity==0?0:parseFloat(row.bookSum)/row.quantity;
                                                    }else{
                                                         row.taxSum=0;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
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
                                                },
                                             }
                                         },
                                    
                        ],
                        
                    }
                }
            },
        mapConfig:{
             get () {
                 return {
                     mapconf: [   
                                     //明细编辑列和选材控件列映射配置
                                { prop: 'id', isplace: false, defaultval:'0',selprop: '' },    //主键列
                                { prop: 'dataId', isplace: true, defaultval:'',selprop: 'id' }, //来源ID
                                { prop: 'dataType', isplace: false, defaultval:'0',selprop: '' },  //来源类型  // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材     
                                { prop: 'guid', isplace: false, defaultval:this.newGuid(),selprop: '' },  //临时ID唯一键
                                { prop: 'itemId', isplace: false,defaultval:'', selprop:'itemId',  },   
                                { prop: 'orgId', isplace: false,defaultval:'', selprop:'orgId',  },   
                                { prop: 'orderId', isplace: false,defaultval:'', selprop:'orderId',  },   
                                { prop: 'bgOrderId', isplace: false,defaultval:'', selprop:'bgOrderId',  },   
                                { prop: 'infoNM', isplace: true,defaultval:'', selprop:'id',  },   
                                { prop: 'infoCode', isplace: true,defaultval:'', selprop:'infoCode',  },   
                                { prop: 'infoName', isplace: true,defaultval:'', selprop:'infoName',  },   
                                { prop: 'infoModel', isplace: true,defaultval:'', selprop:'infoModel',  },   
                                { prop: 'infoUnit', isplace: true,defaultval:'', selprop:'infoUnit',  },   
                                { prop: 'cId', isplace: true,defaultval:'', selprop:'cId',  },   
                                { prop: 'classNodeBh', isplace: true,defaultval:'', selprop:'classNodeBh',  },   
                                { prop: 'quantity', isplace: false,defaultval:0, selprop:'quantity',  },   
                                { prop: 'taxRate', isplace: false,defaultval:0, selprop:'taxRate',  },   
                                { prop: 'unitPrice', isplace: true,defaultval:0, selprop:'responsiPrice',  },   
                                { prop: 'unitSum', isplace: false,defaultval:0, selprop:'unitSum',  },   
                                { prop: 'bookPrice', isplace: false,defaultval:0, selprop:'bookPrice',  },   
                                { prop: 'bookSum', isplace: false,defaultval:0, selprop:'bookSum',  },
                                { prop: 'taxSum', isplace: false,defaultval:0, selprop:'taxSum',  },   
                                { prop: 'isAudit', isplace: false,defaultval:'', selprop:'isAudit',  },   
                                { prop: 'remark', isplace: false,defaultval:'', selprop:'remark',  },   
                                  ] 
                 }
             }
         },
          mapConfig1:{
              get () {
                 return {
                     mapconf: [   
                                     //明细编辑列和选材控件列映射配置
                                { prop: 'id', isplace: false, defaultval:'0',selprop: '' },    //主键列
                                { prop: 'dataId', isplace: true, defaultval:'',selprop: 'id' }, //来源ID
                                { prop: 'dataType', isplace: false, defaultval:'0',selprop: '' },  //来源类型  // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材     
                                { prop: 'guid', isplace: false, defaultval:this.newGuid(),selprop: '' },  //临时ID唯一键
                                { prop: 'itemId', isplace: false,defaultval:'', selprop:'itemId',  },   
                                { prop: 'orgId', isplace: false,defaultval:'', selprop:'orgId',  },   
                                { prop: 'orderId', isplace: false,defaultval:'', selprop:'orderId',  },   
                                { prop: 'bgOrderId', isplace: false,defaultval:'', selprop:'bgOrderId',  },   
                                { prop: 'infoNM', isplace: true,defaultval:'', selprop:'id',  },   
                                { prop: 'infoCode', isplace: true,defaultval:'', selprop:'infoCode',  },   
                                { prop: 'infoName', isplace: true,defaultval:'', selprop:'infoName',  },   
                                { prop: 'infoModel', isplace: true,defaultval:'', selprop:'infoModel',  },   
                                { prop: 'infoUnit', isplace: true,defaultval:'', selprop:'infoUnit',  },   
                                { prop: 'cId', isplace: true,defaultval:'', selprop:'cId',  },   
                                { prop: 'classNodeBh', isplace: true,defaultval:'', selprop:'classNodeBh',  },   
                                { prop: 'quantity', isplace: true,defaultval:0, selprop:'planQuantity',  },   
                                { prop: 'taxRate', isplace: false,defaultval:0, selprop:'taxRate',  },   
                                { prop: 'unitPrice', isplace: false,defaultval:0, selprop:'responsiPrice',  },   
                                { prop: 'unitSum', isplace: false,defaultval:0, selprop:'unitSum',  },   
                                { prop: 'bookPrice', isplace: false,defaultval:0, selprop:'bookPrice',  },   
                                { prop: 'bookSum', isplace: false,defaultval:0, selprop:'bookSum',  },
                                { prop: 'taxSum', isplace: false,defaultval:0, selprop:'taxSum',  },   
                                { prop: 'isAudit', isplace: false,defaultval:'', selprop:'isAudit',  },   
                                { prop: 'remark', isplace: false,defaultval:'', selprop:'remark',  },   
                                  ] 
                 }
             }
         },
    }, 
    methods:{
         _sumCount(colName){
             //计算列的合计值  合计方法计算逻辑
           let contractQuantity=0.00,contractUnitSum=0.00,contractBookSum=0.00,contractTaxSum=0.00;
           this.formModel.items.map((item)=>{
               // 凡是手动输入后的input都会转化为str  因此计算时要转化一下。
               contractQuantity=contractQuantity+parseFloat(item.quantity);
               contractUnitSum=contractUnitSum+parseFloat(item.unitSum);
               contractBookSum=contractBookSum+parseFloat(item.bookSum);
               contractTaxSum=contractTaxSum+parseFloat(item.taxSum);
           })
           this.sumRowConf.items.contractQuantity.sumval=contractQuantity.toFixed(2);
           this.sumRowConf.items.contractUnitSum.sumval=contractUnitSum.toFixed(2);
           this.sumRowConf.items.contractBookSum.sumval=contractBookSum.toFixed(2);
           this.sumRowConf.items.contractTaxSum.sumval=contractTaxSum.toFixed(2);
         },
         _formInitial(){
            //初始化表单
            requestGetContractOrderForEdit(this.selectRow.id).then(data=>{
                if(data.success){
                     Object.assign(this.formModel,data.result); 
                     this.orderDateInital=this.formModel.order.orderDate;
                     this.formModel.order.orderDate=new Date(this.formModel.order.orderDate);
                     this.formModel.order.awardDate=new Date(this.formModel.order.awardDate )
                     this._sumCount();
                }else{
                     this.$message.error('获取编辑表信息失败！');
                }
            });
          },
        selectNodeSupplier(node){
            this.formModel.order.supplierId=node.id;
            this.formModel.order.supplierName=node.supplierName;
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
                            requestDeleteContractOrderItem(obj).then(data=>{
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
                this.$refs.formModel.validate((valid) => {
                    if (valid) {
                        this.formModel.items=this.$refs.tableedit.getEditData();
                        if(this.formModel.items.length==0){
                              this.$message({ message: `请选择材料明细！`, type: 'warning'});
                              return;
                        }
                        this.formModel.order.orderDate=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
                        this.formModel.order.awardDate=this.formatDate(this.formModel.order.awardDate,"YYYY-MM-DD" )
                        this.formModel.order.isAudit=false;
                        if(this.formModel.order.orderId!==""){
                            //修改
                             if(this.orderDateInital==this.formModel.order.orderDate){
                                 this.formModel.config.isGenerateCode=false;
                             }
                        }
                        this.loading=true;
                        requestCreateOrUpdateContractOrder(this.formModel).then((data)=>{
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
          _closePlan(){
               //关闭计划选材框
                this.addFormVisiblePlan=false;
                this._sumCount();
          },
         _onSelect(){
             //打开选材框的权限判断
             this.tableEditMapConfig=this.mapConfig;
             this.addFormVisible=true;
          },
          _onSelectPlan(){
          this.tableEditMapConfig=this.mapConfig1;
            this.addFormVisiblePlan=true;
          },
        _getCode(val){
             this.generateOrderCode('C_ContractOrder',this.formModel.order.orgId,val,(val)=>{
                     this.formModel.order.orderCode=val;
             });
         },
        _dateSel(val){
           this._getCode(val);
        },
        _getCurrentNodeOrg(data){
            this.formModel.order.orgName=data.text;//模板问题O大写
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
       'yl-dataDictionaryForSel':dataDictionaryForSel,
       'yl-organizeTree':organizeTree,
       'yl-comsupplier':ComSupplier,
       'yl-selectFromPlan':selectFromPlan
    },
    watch:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
