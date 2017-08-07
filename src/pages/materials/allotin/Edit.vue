<template>
<div>
  <el-row class="yl-order-header">
    <el-col :span="2">
      <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
      </el-col>
    <el-col :span="18" > 
     <div class="yl-order-title"><span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>调入单</div>
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
        <el-col :span="8"> 
         <el-form-item label="调入单位" prop="allotInOrgId">
              <yl-organizeTree  
                v-model="formModel.order.allotInOrgId"  
                :placeholder="'请选择单位'"   
                :isexpand="true"
                @getCurrentNode="_getCurrentAllotInNodeOrg"  
                style="width:80%">
            </yl-organizeTree>
         </el-form-item>
       </el-col>
        <el-col :span="8"> 
         <el-form-item label="发票号" prop="invoiceNO">
             <el-input v-model="formModel.order.invoiceNO" placeholder="请输入" style="width:80%" ></el-input>
         </el-form-item>
       </el-col>
        <el-col :span="8"> 
         <el-form-item label="运单号" prop="wagonNumber">
             <el-input v-model="formModel.order.wagonNumber" placeholder="请输入" style="width:80%" ></el-input>
         </el-form-item>
       </el-col>
        <el-col :span="8"> 
         <el-form-item label="存放地" prop="storePostion">
             <yl-comDataDictionary :code="'StorePostion'" 
                            v-model="formModel.order.storePostion" 
                            :placeholder="'请选择'"
                            style="width:80%"></yl-comDataDictionary>              
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
            :mapConfig="tableEditMapConfig"
            @delItem="_delItem"
        ></yl-tableedit>
       </el-col>
       
     </el-row>

   <el-row>
         <el-form-item label="备注" prop="remark">
             <el-input v-model="formModel.order.remark" type="textarea" style="width:90%" ></el-input>
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
            requestCreateOrUpdateAllotInOrder,
            requestGetAllotInOrderForEdit,
            requestDeleteAllotInOrderItemItem,
        }   from 'api/materials/allotinorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import dataDictionaryForTree from 'ocomponents/datadictionary/dataDictionaryForTree';
import comDataDictionary from 'ocomponents/comdatadictionary/ComDataDictionary';

export default {
    data(){
        return{
            formModel:{
                    order:{
                             orderDate:new Date(),   //orderDate 需要初始化 
                             orgId:this.getUserInfo().user.manageOrgId,
                             orgName:this.getUserInfo().user.manageOrgName,
                             orderCode:'',
                             dataType:'',
                             dataId:'',
                             contractId:'',
                             contractCode:'',
                             allotInOrgId:'',
                             allotInOrgName:'',
                             invoiceNO:'',
                             wagonNumber:'',
                             storePostion:'',
                             storeRoomName:'',
                             storeRoomFullName:'',
                             isAudit:'',
                             auditor:'',
                             auditDate:'',
                             maker:'',
                             makerDate:'',
                             isState:'',
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
                              { required: true, message: '记账单位不能为空！', trigger: 'change' }
                            ],
                            orderDate: [
                              { required: true,type:'date', message: '账期不能为空！', trigger: 'change' }
                            ],
                            contractId: [
                              { required: true, message: '合同ID不能为空！', trigger: 'blur' }
                            ],
                            contractCode: [
                              { required: true, message: '合同编号不能为空！', trigger: 'blur' }
                            ],
                            allotInOrgId: [
                              { required: true, message: '调入单位不能为空！', trigger: 'change' }
                            ],
                            // allotInOrgName: [
                            //   { required: true, message: '调入单位不能为空！', trigger: 'blur' }
                            // ],
                            // invoiceNO: [
                            //   { required: true, message: '发票号不能为空！', trigger: 'blur' }
                            // ],
                            // wagonNumber: [
                            //   { required: true, message: '运单号不能为空！', trigger: 'blur' }
                            // ],
                            // storePostion: [
                            //   { required: true, message: '存放地不能为空！', trigger: 'blur' }
                            // ],
                            storeRoomName: [
                              { required: true, message: '库别不能为空！', trigger: 'change' }
                            ],
                            
                            // remark: [
                            //   { required: true, message: '备注不能为空！', trigger: 'blur' }
                            // ],
                        
            },
            sumRowConf:{
                            disable:false, //是否显示
                            sumText:'合计', //合计文本
                            items:{
                              //合计项配置
                              //  planQuantity:{text:'数量合计',sumval:0.00,capitalCol:false},
                              //  lossQuantity:{text:'损耗量合计',sumval:0.00,capitalCol:false},
                              //  responseSum:{text:'金额合计',sumval:0.00,capitalCol:true}
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
                                // {attr: { prop: 'itemId', label: '明细ID', width:100,  } },   
                                // {attr: { prop: 'orgId', label: '项目部ID', width:100,  } },   
                                // {attr: { prop: 'orderId', label: '单据ID', width:100,  } },   
                                // {attr: { prop: 'dataType', label: '', width:100,  } },   
                                // {attr: { prop: 'dataId', label: '', width:100,  } },   
                                // {attr: { prop: 'infoNM', label: '材料ID', width:100,  } },   
                                // {attr: { prop: 'infoCode', label: '材料编码', width:100,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:100,  } },   
                                {attr: { prop: 'quantity', label: '数量', width:100, scopedSlot: 'quantity' } },   
                                {attr: { prop: 'taxRate', label: '税率', width:100,scopedSlot: 'taxRate' } },   
                                {attr: { prop: 'unitPrice', label: '税前价', width:100, scopedSlot: 'unitPrice' } },   
                                {attr: { prop: 'unitSum', label: '税前金额', width:100, scopedSlot: 'unitSum' } },   
                                {attr: { prop: 'taxSum', label: '税额', width:100,  scopedSlot: 'taxSum'} },   
                                {attr: { prop: 'pruchasedPrice', label: '税后价', width:100, scopedSlot: 'pruchasedPrice' } },   
                                {attr: { prop: 'purchasedSum', label: '税后金额', width:100,scopedSlot: 'purchasedSum'  } },   
                                {attr: { prop: 'bookPrice', label: '账面价', width:100,  scopedSlot: 'bookPrice'} },   
                                {attr: { prop: 'bookSum', label: '账面金额', width:100, scopedSlot: 'bookSum' } },   
                                // {attr: { prop: 'cId', label: '类别ID', width:100,  } },   
                                // {attr: { prop: 'classNodebh', label: '类别编码', width:100,  } },   
                                // {attr: { prop: 'barCode', label: '条码', width:100,  } },   
                                // {attr: { prop: 'storeRoom', label: '库别', width:100,  } },   
                                // {attr: { prop: 'storePosition', label: '存放地', width:100,  } },   
                                {attr: { prop: 'manufacturer', label: '生产厂商', width:100, scopedSlot: 'manufacturer' } },   
                                {attr: { prop: 'batchNo', label: '炉批号', width:100,scopedSlot: 'batchNo'  } },   
                                {attr: { prop: 'remark', label: '备注', width:100, scopedSlot: 'remark' } },   
                                    
                            //注意：最后一列如果不设置列宽将会自动宽度补全
                        ],
                        
                        
                        //编辑列具名配置
                        solSlotConf:[{  type:'input',   // 类型  目前 支持 input switch datepick
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
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'manufacturer',  //字段名称
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
                                         name:'batchNo',  //字段名称
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
                                { prop: 'itemId', isplace: true,defaultval:'', selprop:'itemId',  },   
                                { prop: 'orgId', isplace: true,defaultval:'', selprop:'orgId',  },   
                                { prop: 'orderId', isplace: true,defaultval:'', selprop:'orderId',  },   
                                { prop: 'dataType', isplace: true,defaultval:'', selprop:'dataType',  },   
                                { prop: 'dataId', isplace: true,defaultval:'', selprop:'dataId',  },   
                                { prop: 'infoNM', isplace: true,defaultval:'', selprop:'id',  },   
                                { prop: 'infoCode', isplace: true,defaultval:'', selprop:'infoCode',  },   
                                { prop: 'infoName', isplace: true,defaultval:'', selprop:'infoName',  },   
                                { prop: 'infoModel', isplace: true,defaultval:'', selprop:'infoModel',  },   
                                { prop: 'infoUnit', isplace: true,defaultval:'', selprop:'infoUnit',  },   
                                { prop: 'quantity', isplace: false,defaultval:0, selprop:'quantity',  },   
                                { prop: 'taxRate', isplace: false,defaultval:0, selprop:'taxRate',  },   
                                { prop: 'unitPrice', isplace: false,defaultval:0, selprop:'unitPrice',  },   
                                { prop: 'unitSum', isplace: false,defaultval:0, selprop:'unitSum',  },   
                                { prop: 'taxSum', isplace: false,defaultval:0, selprop:'taxSum',  },   
                                { prop: 'pruchasedPrice', isplace: false,defaultval:0, selprop:'pruchasedPrice',  },   
                                { prop: 'purchasedSum', isplace: false,defaultval:0, selprop:'purchasedSum',  },   
                                { prop: 'bookPrice', isplace: false,defaultval:0, selprop:'bookPrice',  },   
                                { prop: 'bookSum', isplace: false,defaultval:0, selprop:'bookSum',  },   
                                { prop: 'cId', isplace: true,defaultval:'', selprop:'cId',  },   
                                { prop: 'classNodebh', isplace: true,defaultval:'', selprop:'classNodebh',  },   
                                { prop: 'barCode', isplace: true,defaultval:'', selprop:'barCode',  },   
                                { prop: 'storeRoom', isplace: true,defaultval:'', selprop:'storeRoom',  },   
                                { prop: 'storePosition', isplace: true,defaultval:'', selprop:'storePosition',  },   
                                { prop: 'manufacturer', isplace: true,defaultval:'', selprop:'manufacturer',  },   
                                { prop: 'batchNo', isplace: true,defaultval:'', selprop:'batchNo',  },   
                                { prop: 'remark', isplace: true,defaultval:'', selprop:'remark',  },   
                                    
                               
                               
                            ] 
                 }
             }
         },
    }, 
    methods:{
         _sumCount(colName){
             //计算列的合计值  合计方法计算逻辑
          //  let planQuantityTotal=0.00,lossQuantityTotal=0.00,responseSumTotal=0.00;
          //  this.formModel.items.map((item)=>{
                //凡是手动输入后的input都会转化为str  因此计算时要转化一下。
              //  planQuantityTotal=planQuantityTotal+parseFloat(item.planQuantity);
              //  lossQuantityTotal=lossQuantityTotal+parseFloat(item.lossQuantity);
              //  responseSumTotal=responseSumTotal+item.responseSum;
        //    })
           // this.sumRowConf.items.planQuantity.sumval=planQuantityTotal.toFixed(2);
           // this.sumRowConf.items.lossQuantity.sumval=lossQuantityTotal.toFixed(2);
          //  this.sumRowConf.items.responseSum.sumval=responseSumTotal.toFixed(2);
         },
         _formInitial(){
            //初始化表单
            requestGetAllotInOrderForEdit(this.selectRow.id).then(data=>{
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
                            requestDeleteAllotInOrderItem(obj).then(data=>{
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
                        requestCreateOrUpdateAllotInOrder(this.formModel).then((data)=>{
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
             this.tableEditMapConfig=this.MapConfig;
             this.addFormVisible=true;
          },
        _getCode(val){
             this.generateOrderCode('M_AllotInOrder',this.formModel.order.orgId,val,(val)=>{
                     this.formModel.order.orderCode=val;
             });
         },
        _getCurrentNodeOrg(data){
            this.formModel.order.orgName=data.text;//模板问题O大写
            let val=this.formatDate(this.formModel.order.orderDate,"YYYY-MM");
            this._getCode(val);
        },
        _getCurrentAllotInNodeOrg(data){
            this.formModel.order.allotInOrgName=data.text;//模板问题O大写
        },
        _dateSel(val){
           this._getCode(val);
        },
        _getCurrentStroreRoom(selectNode){
           //this.storeRoomName=selectNode.text;
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
       'yl-dataDictionaryForTree':dataDictionaryForTree,
       'yl-comDataDictionary':comDataDictionary
    },
    watch:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
