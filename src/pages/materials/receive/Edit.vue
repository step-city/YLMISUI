<template>
<div>
  <el-row class="yl-order-header">
    <el-col :span="2">
      <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
      </el-col>
    <el-col :span="18" > 
     <div class="yl-order-title"><span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>{{orderName}}</div>
    </el-col>
      <el-col :span="4">
        <div class="yl-order-code"><span style="color: red;">NO.</span>{{formModel.order.orderCode}}</div><br><br>
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
       <el-col :span="5"> 
            <el-form-item label="发票" prop="isPt" >
                 <el-switch
                    v-model="formModel.order.isPt"
                    on-text="普"
                    off-text="专">
                  </el-switch>
            </el-form-item>
       </el-col>
    </el-row>
    <el-row>
        <el-col :span="8"> 
            <el-form-item label="供应商" prop="supplierName">
                <yl-comsupplier v-model="formModel.order.supplierName" 
                                @selectNode="selectNodeSupplier" 
                                @clearBack="_siconClick"
                                placeholder="请选择供应商"
                                style="width:80%">
                </yl-comsupplier>
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="合同" prop="contractCode">
                 <yl-Contract v-model="formModel.order.contractCode" 
                 ref="contractref" 
                 :supplierId="formModel.order.supplierId" 
                 :disabled="contractDisable"  
                 placeholder="请选择合同"
                 @selectNode="selectNodeContract" 
                 @clearBack="_clearContract"
                 style="width:80%"></yl-Contract>
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="供应方式" prop="supplyMode">
                <yl-dataDictionaryForSel :code="'SupplyMode'" v-model="formModel.order.supplyMode"  :placeholder="'请选择供应方式'"  style="width:80%">
                </yl-dataDictionaryForSel>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="8"> 
            <el-form-item label="结算方式" prop="payment">
                <yl-dataDictionaryForSel :code="'Payment'" v-model="formModel.order.payment"  :placeholder="'请选择供应方式'"  style="width:80%">
                </yl-dataDictionaryForSel>
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="发票号" prop="invoiceNo">
                <el-input v-model="formModel.order.invoiceNo"  placeholder="请输入" style="width:80%" ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8"> 
            <el-form-item label="库别" prop="storeRoomName">
                <yl-dataDictionaryForTree :code="'StoreRoom'" placeholder="请选择库别" v-model="formModel.order.storeRoomName"  :isexpand="true" @getCurrentNode="_getCurrentStroreRoom"  style="width:80%">
                </yl-dataDictionaryForTree>
            </el-form-item>
        </el-col>
    </el-row>
       
        

     <el-row class="yl-row-TableEditor">
      <el-col :span="24"> 
        <yl-tableedit ref="tableedit"
            :tableConfig="tableEditConfig"
            :tableData="formModel.items"
            :sumRowConf="sumRowConf"
            :mapConfig="map"
            @delItem="_delItem"
        ></yl-tableedit>
       </el-col>
       
     </el-row>

   <el-row>
        <el-col :span="24"> 
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
      <el-button type="primary" @click="_onSelect1"><i class="icon-plus"></i>进料选材</el-button>
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
   <el-dialog ref="selectDialog2" title="选择"  
                 v-model="addFormVisible1" size="large"  
                 top="8%" 
                 :modal="false"
                 :lock-scroll="true"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false" 
                 :close-on-click-modal="false"  >
                 <yl-selectFromRequestionIn    
                    :isSelectClose="true"
                    @close="_close"
                    :filterInfo="fltInfo"
                    v-if="addFormVisible1">
                </yl-selectFromRequestionIn>
  </el-dialog>


</div>
</template>
<script type="text/babel">
import selectFromComMat from 'ocomponents/selectmodule/selectFromComMat'
import  {inputModel} from 'api/inputmodel';
import config from 'static/js/config';
import {
            requestCreateOrUpdateReceiveOrder,
            requestGetReceiveOrderForEdit,
            requestDeleteReceiveOrderItem,
        }   from 'api/materials/receiveorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel';
import dataDictionaryForTree from 'ocomponents/datadictionary/dataDictionaryForTree';
import {requestGetStorePostionPageList} from 'api/storepostion';
import ComSupplier from 'ocomponents/comsupplier/ComSupplier';
import Contract from 'ocomponents/contract/Contract'
import selectFromRequestionIn from 'ocomponents/selectmodule/selectFromRequestionIn'

export default {
    data(){
        return{
            formModel:{
                    order:{
                            orderDate:new Date(),   //orderDate 需要初始化 
                            orgId:this.getUserInfo().user.manageOrgId,
                             orderId:'',
                             orgName:this.getUserInfo().user.manageOrgName,
                             orderCode:'',
                             contractId:'',
                             contractCode:'',
                             supplierId:'',
                             supplierName:'',
                             invoiceNo:'',
                             checkMode:'',
                             supplyMode:'',
                             payment:'',
                             storeRoomName:'',
                             storeRoomFullName:'',
                             storePosition:'',
                             wagonNumber:'',
                             importFlag:'',
                             rejectionFlag:'',
                             isPt:false,
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
                        },
                        items:[],
                        config:{isGenerateCode:true},
            },
            rules: {
                   
                            orgId: [
                              { required: true, message: '组织机构不能为空！', trigger: 'change' }
                            ],
                            orderDate: [
                              { type:'date' ,required: true, message: '日期不能为空！', trigger: 'change' }
                            ],
                            // contractId: [
                            //   { required: true, message: '合同不能为空！', trigger: 'blur' }
                            // ],
                            supplierName: [
                              { required: true, message: '供应商不能为空！', trigger: 'change' }
                            ],
                            storeRoomName: [
                              { required: true, message: '库别不能为空！', trigger: 'change' }
                            ],
                        
            },
            sumRowConf:{
                            disable:false, //是否显示
                            sumText:'合计', //合计文本
                            items:{
                              //合计项配置
                               unitSum:{text:'税前金额',sumval:0.00,capitalCol:true},
                               purchasedSum:{text:'税后金额',sumval:0.00,capitalCol:false},
                               taxSum:{text:'税额',sumval:0.00,capitalCol:false},
                               bookSum:{text:'账面金额',sumval:0.00,capitalCol:false},
                            }
                        },
            loading:false,
            addFormVisible:false,
            addFormVisible1:false,
            orderDateInital:'',
            title:config.Order.title,
            mainInput:new inputModel(),
            orderName:'',
            contractDisable:true,
            fltInfo:{},
            map:{}
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
        },
        dataType:{
             type:String,
             default:0,
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
                            //列配合
                                // {attr: { prop: 'itemId', label: '', width:100,  } },   
                                // {attr: { prop: 'orgId', label: '', width:100,  } },   
                                // {attr: { prop: 'orderId', label: '', width:100,  } },   
                                // {attr: { prop: 'infoNM', label: '', width:100,  } },   
                                // {attr: { prop: 'infoCode', label: '', width:100,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:65,  } }, 
                                 {attr: { prop: 'quantity', label: '数量', width:100,  scopedSlot: 'quantity',} },   
                                {attr: { prop: 'taxRate', label: '税率', width:70, scopedSlot: 'taxRate', } },   
                                {attr: { prop: 'unitPrice', label: '税前单价', width:100, scopedSlot: 'unitPrice', } },   
                                {attr: { prop: 'unitSum', label: '税前金额', width:100, scopedSlot: 'unitSum', } },  
                                {attr: { prop: 'pruchasedPrice', label: '税后单价', width:100, scopedSlot: 'pruchasedPrice', } },   
                                {attr: { prop: 'purchasedSum', label: '税后金额', width:100, scopedSlot: 'purchasedSum', } },  
                                {attr: { prop: 'taxSum', label: '税额', width:100,  scopedSlot: 'taxSum',} },     
                                {attr: { prop: 'bookPrice', label: '账面价', width:100, scopedSlot: 'bookPrice', } },   
                                {attr: { prop: 'bookSum', label: '账面金额', width:100, scopedSlot: 'bookSum', } },     
                                {attr: { prop: 'infoRemark', label: '备注', width:100,  scopedSlot: 'infoRemark',} },   
                                // {attr: { prop: 'cId', label: '', width:100,  } },   
                                // {attr: { prop: 'classNodebh', label: '', width:100,  } },   
                                {attr: { prop: 'barCode', label: '条码', width:100,  scopedSlot: 'barCode',} },   
                                //{attr: { prop: 'storeRoom', label: '库别', width:100, scopedSlot: 'storeRoom', } },   
                               // {attr: { prop: 'storePosition', label: '存放地', width:100, scopedSlot: 'quantity', } },   
                                {attr: { prop: 'manufacturer', label: '生产厂商', width:100,scopedSlot: 'manufacturer',  } },   
                                {attr: { prop: 'batchNo', label: '炉批号', width:100, scopedSlot: 'batchNo', } },   
                                // {attr: { prop: 'dataType', label: '', width:100,  } },   
                                // {attr: { prop: 'dataId', label: '', width:100,  } },   
                                // {attr: { prop: 'remark', label: '', width:100,  } },   
                                    
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
                                                         row.unitSum=(parseFloat(row.quantity)*(row.unitPrice==null?0:row.unitPrice)).toFixed(2);
                                                         row.bookSum=(parseFloat(row.quantity)*(row.bookPrice==null?0:row.bookPrice)).toFixed(2);
                                                         row.purchasedSum=row.bookSum;
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
                                                },
                                             }
                                         },
                                          {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'unitSum',  //字段名称
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
                                                         row.unitPrice=(row.quantity==0?0:(parseFloat(row.unitSum)/row.quantity)).toFixed(4);
                                                         row.bookPrice=row.unitPrice;
                                                         row.bookSum=row.unitSum;
                                                    }else{
                                                         row.unitSum=0.00;
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
                                                      row.purchasedSum=(parseFloat(row.taxSum)+parseFloat(row.unitSum)).toFixed(2);
                                                      if(this.checkdecimalfn(row.taxSum)){
                                                         if(row.quantity!=0){
                                                         row.pruchasedPrice=(row.purchasedSum/row.quantity).toFixed(4);
                                                         //row.bookPrice=(parseFloat(row.unitPrice)).toFixed(4);
                                                         }else{
                                                            row.pruchasedPrice=0;
                                                            row.bookPrice=0;
                                                         }
                                                         //row.bookSum=(parseFloat(row.unitSum)).toFixed(2);
                                                    }else{
                                                         row.taxSum=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'pruchasedPrice',  //字段名称
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
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'purchasedSum',  //字段名称
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
                                                 if(this.checkdecimalfn(row.purchasedSum)){
                                                         row.pruchasedPrice=(row.quantity==0?0:parseFloat(row.purchasedSum)/row.quantity).toFixed(4);
                                                         row.unitPrice=(row.pruchasedPrice/(1+row.taxRate/100)).toFixed(4);
                                                         row.bookPrice=row.unitPrice;
                                                         row.unitSum=(row.quantity*row.unitPrice).toFixed(2);
                                                         row.bookSum=row.unitSum;
                                                         row.taxSum=(parseFloat(row.purchasedSum)-row.unitSum).toFixed(2);
                                                    }else{
                                                         row.purchasedSum=0.00;
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
                                                      if(this.checkdecimalfn(row.bookPrice)){
                                                         row.bookSum=(row.bookPrice*row.quantity).toFixed(2);
                                                    }else{
                                                         row.bookPrice=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
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
                                                         row.bookPrice=(row.quantity==0?0:row.bookSum/row.quantity).toFixed(4);
                                                    }else{
                                                         row.bookSum=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'infoRemark',  //字段名称
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
        tableEditMapConfig:{
             get () {
                 return {
                     mapconf: [   
                                     //明细编辑列和选材控件列映射配置
                                { prop: 'id', isplace: false, defaultval:'0',selprop: '' },    //主键列
                                { prop: 'dataId', isplace: true, defaultval:'',selprop: 'id' }, //来源ID
                                { prop: 'dataType', isplace: false, defaultval:'0',selprop: '' },  //来源类型  // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材     
                                { prop: 'guid', isplace: false, defaultval:this.newGuid(),selprop: '' },  //临时ID唯一键
                                // { prop: 'itemId', isplace: true,defaultval:'', selprop:'itemId',  },   
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
                                { prop: 'manufacturer', isplace: true,defaultval:'', selprop:'manufacturer',  },   
                                { prop: 'batchNo', isplace: true,defaultval:'', selprop:'batchNo',  },   
                                { prop: 'infoRemark', isplace: true,defaultval:'', selprop:'infoRemark',  },   
                                { prop: 'dataType', isplace: true,defaultval:'', selprop:'dataType',  },   
                                { prop: 'dataId', isplace: true,defaultval:'', selprop:'id',  },   
                                { prop: 'quantity', isplace: true,defaultval:0, selprop:'quantity',  },   
                                { prop: 'taxRate', isplace: true,defaultval:0, selprop:'',  },   
                                { prop: 'unitPrice', isplace: true,defaultval:0, selprop:'',  },   
                                { prop: 'unitSum', isplace: true,defaultval:0, selprop:'',  },   
                                { prop: 'taxSum', isplace: true,defaultval:0, selprop:'',  },   
                                { prop: 'pruchasedPrice', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'purchasedSum', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'bookPrice', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'bookSum', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'remark', isplace: true,defaultval:'', selprop:'remark',  },   
                                    
                               
                               
                            ] 
                 }
             }
         },
         tableEditMapConfig1:{
             get () {
                 return {
                     mapconf: [   
                                     //明细编辑列和选材控件列映射配置
                                { prop: 'id', isplace: false, defaultval:'0',selprop: '' },    //主键列
                                { prop: 'dataId', isplace: true, defaultval:'',selprop: 'itemId' }, //来源ID
                                { prop: 'dataType', isplace: false, defaultval:'0',selprop: '' },  //来源类型  // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材     
                                { prop: 'guid', isplace: false, defaultval:this.newGuid(),selprop: '' },  //临时ID唯一键
                                // { prop: 'itemId', isplace: true,defaultval:'', selprop:'itemId',  },   
                                { prop: 'orgId', isplace: true,defaultval:'', selprop:'orgId',  },   
                                { prop: 'orderId', isplace: true,defaultval:'', selprop:'orderId',  },   
                                { prop: 'infoNM', isplace: true,defaultval:'', selprop:'infoNM',  },   
                                { prop: 'infoCode', isplace: true,defaultval:'', selprop:'infoCode',  },   
                                { prop: 'infoName', isplace: true,defaultval:'', selprop:'infoName',  },   
                                { prop: 'infoModel', isplace: true,defaultval:'', selprop:'infoModel',  },   
                                { prop: 'infoUnit', isplace: true,defaultval:'', selprop:'infoUnit',  },   
                                { prop: 'cId', isplace: true,defaultval:'', selprop:'cId',  },   
                                { prop: 'classNodebh', isplace: true,defaultval:'', selprop:'classNodeBh',  },   
                                { prop: 'barCode', isplace: true,defaultval:'', selprop:'barCode',  },   
                                { prop: 'storeRoom', isplace: true,defaultval:'', selprop:'storeRoom',  },   
                                { prop: 'storePosition', isplace: true,defaultval:'', selprop:'storePosition',  },   
                                { prop: 'manufacturer', isplace: true,defaultval:'', selprop:'manufacturer',  },   
                                { prop: 'batchNo', isplace: true,defaultval:'', selprop:'batchNo',  },   
                                { prop: 'infoRemark', isplace: true,defaultval:'', selprop:'infoRemark',  },
                                { prop: 'quantity', isplace: true,defaultval:0, selprop:'storeNum',  },   
                                { prop: 'taxRate', isplace: true,defaultval:0, selprop:'taxRate',  },   
                                { prop: 'unitPrice', isplace: true,defaultval:0, selprop:'bookPrice',  },   
                                { prop: 'unitSum', isplace: true,defaultval:0, selprop:'',  },   
                                { prop: 'taxSum', isplace: true,defaultval:0, selprop:'',  },   
                                { prop: 'pruchasedPrice', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'purchasedSum', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'bookPrice', isplace: true,defaultval:0, selprop:'bookPrice',  },   
                                { prop: 'bookSum', isplace: false,defaultval:0, selprop:'',  },   
                                { prop: 'remark', isplace: true,defaultval:'', selprop:'remark',  },   
                                    
                               
                               
                            ] 
                 }
             }
         },
    }, 
    methods:{
         _sumCount(colName){
             //计算列的合计值  合计方法计算逻辑
           let unitSum=0.00,purchasedSum=0.00,taxSum=0.00,bookSum=0.00;
           this.formModel.items.map((item)=>{
                //凡是手动输入后的input都会转化为str  因此计算时要转化一下。
               unitSum=unitSum+parseFloat(item.unitSum);
               purchasedSum=purchasedSum+parseFloat(item.purchasedSum);
               taxSum=taxSum+parseFloat(item.taxSum);
               bookSum=bookSum+parseFloat(item.bookSum);

           })
           this.sumRowConf.items.unitSum.sumval=unitSum.toFixed(2);
           this.sumRowConf.items.purchasedSum.sumval=purchasedSum.toFixed(2);
           this.sumRowConf.items.taxSum.sumval=taxSum.toFixed(2);
           this.sumRowConf.items.bookSum.sumval=bookSum.toFixed(2);
         },
         _formInitial(){
            //初始化表单
            requestGetReceiveOrderForEdit(this.selectRow.id).then(data=>{
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
        selectNodeSupplier(node){
            this.formModel.order.supplierId=node.id;
            this.formModel.order.supplierName=node.supplierName;
            this.$refs.contractref.loadAll(node.id);
            this.contractDisable=false;

         },
        selectNodeContract(node){
            this.formModel.order.contractCode=node.contractCode;
            this.formModel.order.contractId=node.id;
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
                            requestDeleteReceiveOrderItem(obj).then(data=>{
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
                if(this.formModel.order.supplierId!=''){
                this.$refs.formModel.validate((valid) => {
                    if (valid) {
                        this.formModel.items=this.$refs.tableedit.getEditData();
                        if(this.formModel.items.length==0){
                              this.$message({ message: `请选择材料明细！`, type: 'warning'});
                              return;
                        }
                        this.formModel.order.orderDate=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
                        this.formModel.order.dataType=this.dataType;
                        this.formModel.order.isAudit=false;
                        if(this.formModel.order.orderId!==""){
                            //修改
                             if(this.orderDateInital==this.formModel.order.orderDate){
                                 this.formModel.config.isGenerateCode=false;
                             }
                        }
                        this.loading=true;
                        requestCreateOrUpdateReceiveOrder(this.formModel).then((data)=>{
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
                }else{
                     this.$message({ message: `请选择供应商！`, type: 'warning'});
                }
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
             this.map=this.tableEditMapConfig;
             this.addFormVisible=true
          },
          _onSelect1(){
             //打开选材框的权限判断
             this.fltInfo={
                supplierId:this.formModel.order.supplierId,
                contractId:this.formModel.order.contractId
             };
             this.map=this.tableEditMapConfig1;
             this.addFormVisible1=true
          },
        _getCode(val){
             let orderType=this.dataType;
             this.generateOrderCode('M_ReceiveOrder',this.formModel.order.orgId,val,(val)=>{
                     this.formModel.order.orderCode=val;
             },orderType);
         },
        _getCurrentNodeOrg(data){
            this.formModel.order.orgName=data.text;//模板问题O大写
            let val=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
            this._getCode(val);
            },
        _dateSel(val){
           this._getCode(val);
        },
        _getCurrentStroreRoom(selectNode){
           this.storeRoomName=selectNode.text;
        },
        _siconClick(){
            this.contractDisable=true;
            this.formModel.order.supplierId='';
            this.formModel.order.contractCode='';
            this.formModel.order.contractId='';
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
        _clearContract(){
            this.formModel.order.contractCode='';
            this.formModel.order.contractId='';
        }

    },
    mounted(){
        this._judgeType();
        if(this.selectRow.id!=undefined){
             //修改
             this._formInitial();
         } else{
             let val=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
             this._getCode(val);
         };
    },    
    components:{
       'yl-selectFromComMat':selectFromComMat,
       'yl-organizeTree':organizeTree,
       'yl-dataDictionaryForSel':dataDictionaryForSel,
       'yl-dataDictionaryForTree':dataDictionaryForTree,
       'yl-comsupplier':ComSupplier,
       'yl-Contract':Contract,
       'yl-selectFromRequestionIn':selectFromRequestionIn,
    },
    watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
