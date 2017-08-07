<template>
<div>
  <el-row class="yl-order-header">
    <el-col :span="2">
      <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
      </el-col>
    <el-col :span="18" > 
     <div class="yl-order-title"><span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>半成品材料库</div>
    </el-col>
      <el-col :span="4">
      <div class="yl-order-code"><span style="color: red;">NO:</span>{{formModel.order.sInfoCode}}</div>
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
         <el-form-item label="材料编码" prop="sInfoCode">
             <el-input v-model="formModel.order.sInfoCode" style="width:80%" ></el-input>
         </el-form-item>
       </el-col>
        <el-col :span="8"> 
         <el-form-item label="材料名称" prop="sInfoName">
             <el-input v-model="formModel.order.sInfoName" style="width:80%" ></el-input>
         </el-form-item>
       </el-col>
        <el-col :span="8"> 
         <el-form-item label="规格型号" prop="sInfoModel">
             <el-input v-model="formModel.order.sInfoModel" style="width:80%" ></el-input>
         </el-form-item>
       </el-col>
        <el-col :span="8"> 
         <el-form-item label="单位" prop="sInfoUnit">
              <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.order.sInfoUnit"  :placeholder="'请选择'"  style="width:80%">
                  </yl-dataDictionaryForSel>
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
            requestCreateOrUpdateSFProductMaterialsOrder,
            requestGetSFProductMaterialsOrderForEdit,
            requestDeleteSFProductMaterialsOrderItem,
        }   from 'api/materials/sfproductmaterialsorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'

export default {
    data(){
        return{
            formModel:{
                    order:{
                        // orderDate:new Date(),   orderDate 需要初始化 
                        orgId:this.getUserInfo().user.manageOrgId,
                             orgName:this.getUserInfo().user.manageOrgName,
                             orderId:'',
                             sInfoCode:'',
                             sInfoName:'',
                             sInfoModel:'',
                             sInfoUnit:'',
                             isAudit:'',
                             auditor:'',
                             auditDate:'',
                             isSate:'',
                             maker:'',
                             makerDate:'',
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
                              { required: true, message: '记账单位不能为空！', trigger: 'blur' }
                            ],
                            sInfoCode: [
                              { required: true, message: '材料编码不能为空！', trigger: 'blur' }
                            ],
                            sInfoName: [
                              { required: true, message: '材料名称不能为空！', trigger: 'blur' }
                            ],
                            sInfoModel: [
                              { required: true, message: '规格型号不能为空！', trigger: 'blur' }
                            ],
                            sInfoUnit: [
                              { required: true, message: '单位不能为空！', trigger: 'blur' }
                            ],
                        
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
                        { attr: { prop: 'id', label: '操作', width: 65, scopedSlot: 'id', } },
                            //列配合
                                // {attr: { prop: 'orgId', label: '', width:100,  } },   
                                // {attr: { prop: 'itemId', label: '', width:100,  } },   
                                // {attr: { prop: 'orderId', label: '', width:100,  } },   
                                // {attr: { prop: 'infoNM', label: '', width:100,  } },   
                                // {attr: { prop: 'infoCode', label: '材料编码', width:100,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '主单位', width:100,  } },   
                                // {attr: { prop: 'cId', label: '', width:100,  } },   
                                // {attr: { prop: 'classNodebh', label: '', width:100,  } },   
                                {attr: { prop: 'quantity', label: '数量(根)', width:100, scopedSlot:"quantity" } },   
                                {attr: { prop: 'conversionRate', label: '转换率(根/米)', width:120, scopedSlot:"conversionRate" } },   
                                {attr: { prop: 'quantityScd', label: '数量(米)', width:100,  } },   
                                {attr: { prop: 'conversionRateScd', label: '转换率(米/千克)', width:120,  } },   
                                {attr: { prop: 'quantityTrd', label: '数量(千克)', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注', } },   
                                // {attr: { prop: 'extendColumn1', label: '', width:100,  } },   
                                // {attr: { prop: 'extendColumn2', label: '', width:100,  } },   
                                // {attr: { prop: 'extendColumn3', label: '', width:100,  } },   
                                    
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
                                                        //  row.responseSum=parseFloat(row.planQuantity)*row.responsePrice;
                                                        //  row.lossQuantity=parseFloat(row.planQuantity)*row.loassRate/100;
                                                    }else{
                                                         row.quantity=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                         {  type:'input',   // 类型  目前 支持 input switch datepick
                                         name:'conversionRate',  //字段名称
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
                                                    if(this.checkdecimalfn(row.conversionRate)){
                                                         row.quantityScd=parseFloat(row.conversionRate)*row.quantity;
                                                         row.quantityTrd=parseFloat(row.conversionRateScd)*row.quantityScd;
                                                    }else{
                                                         row.conversionRate=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
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
                                { prop: 'orgId', isplace: true,defaultval:'', selprop:'orgId',  },   
                                { prop: 'itemId', isplace: true,defaultval:'', selprop:'itemId',  },   
                                { prop: 'orderId', isplace: true,defaultval:'', selprop:'orderId',  },   
                                { prop: 'infoNM', isplace: true,defaultval:'', selprop:'id',  },   
                                { prop: 'infoCode', isplace: true,defaultval:'', selprop:'infoCode',  },   
                                { prop: 'infoName', isplace: true,defaultval:'', selprop:'infoName',  },   
                                { prop: 'infoModel', isplace: true,defaultval:'', selprop:'infoModel',  },   
                                { prop: 'infoUnit', isplace: true,defaultval:'', selprop:'infoUnit',  },   
                                { prop: 'cId', isplace: true,defaultval:'', selprop:'cId',  },   
                                { prop: 'classNodebh', isplace: true,defaultval:'', selprop:'classNodeBh',  },   
                                { prop: 'quantity', isplace: true,defaultval:'', selprop:'quantity',  },   
                                { prop: 'conversionRate', isplace: true,defaultval:'', selprop:'conversionRate',  },   
                                { prop: 'quantityScd', isplace: true,defaultval:'', selprop:'quantityScd',  },   
                                { prop: 'conversionRateScd', isplace: true,defaultval:'', selprop:'infoThrUnitPreci',  },   
                                { prop: 'quantityTrd', isplace: true,defaultval:'', selprop:'quantityTrd',  },   
                                { prop: 'remark', isplace: true,defaultval:'', selprop:'remark',  },   
                                { prop: 'extendColumn1', isplace: true,defaultval:'', selprop:'extendColumn1',  },   
                                { prop: 'extendColumn2', isplace: true,defaultval:'', selprop:'extendColumn2',  },   
                                { prop: 'extendColumn3', isplace: true,defaultval:'', selprop:'extendColumn3',  },   
                                    
                               
                               
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
            requestGetSFProductMaterialsOrderForEdit(this.selectRow.id).then(data=>{
                if(data.success){
                     Object.assign(this.formModel,data.result); 
                     this.orderDateInital=this.formModel.order.orderDate;
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
                            requestDeleteSFProductMaterialsOrderItem(obj).then(data=>{
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
                        this.formModel.order.orderDate=this.formatDate(this.formModel.order.orderDate,"YYYY-MM-DD");
                        this.formModel.order.isAudit=false;
                        if(this.formModel.order.orderId!==""){
                            //修改
                             if(this.orderDateInital==this.formModel.order.orderDate){
                                 this.formModel.config.isGenerateCode=false;
                             }
                        }
                        this.loading=true;
                        requestCreateOrUpdateSFProductMaterialsOrder(this.formModel).then((data)=>{
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
             this.addFormVisible=true;
          },
        // _getCode(val){
        //      this.generateOrderCode('tableName',this.formModel.order.orgId,val,(val)=>{
        //              this.formModel.order.orderCode=val;
        //      });
        //  },
        _getCurrentNodeOrg(data){
             //组织机构选择事件
            this.formModel.order.OrgName=data.text;
          },
        //_dateSel(val){
       //     this._getCode(val);
        // }
    },
    mounted(){
        if(this.selectRow.id!=undefined){
             //修改
             this._formInitial();
         } 
    },    
    components:{
       'yl-selectFromComMat':selectFromComMat,
       'yl-organizeTree':organizeTree,
       'yl-dataDictionaryForSel':dataDictionaryForSel,
    },
    watch:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
