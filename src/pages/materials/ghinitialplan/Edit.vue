<template>
<div>
  <el-row class="yl-order-header">
    <el-col :span="2">
      <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
      </el-col>
    <el-col :span="18" > 
     <div class="yl-order-title"><span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>物资总控计划</div>
    </el-col>
      <el-col :span="4">
      <div class="yl-order-code"><span style="color: red;">NO.</span>{{formModel.order.orderCode}}</div>
      </el-col>
 </el-row>
  <el-form  :model="formModel.order"  :rules="rules" ref="formModel" label-width="100px" >
     <el-row>
           <el-col :span="8"> 
                    <el-form-item label="计划单位" prop="orgId">
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
                    <el-form-item label="计划类型" prop="planType">
                        <yl-dataDictionaryForSel :code="'PlanType'" v-model="formModel.order.planType"  :placeholder="'请选择'"  style="width:80%">
                        </yl-dataDictionaryForSel>
                    </el-form-item>
          </el-col>
          <el-col :span="8"> 
                  <el-form-item label="工号" prop="ghId">
                      <yl-GHTree   
                            :placeholder="'请选择工号'" 
                            v-model="formModel.order.ghId" 
                            :defaultText="formModel.order.ghName" 
                            @getCurrentNode="_getCurrentNode" 
                            style="width:80%">
                      </yl-GHTree>
                  </el-form-item>
          </el-col>
        </el-row>
          <el-row>
           <el-col :span="8"> 
                    <el-form-item label="计划年份" prop="orderDate">
                         <el-date-picker  
                            v-model="formModel.order.orderDate" 
                            @change="_dateSel" 
                            type="year" 
                            :editable="false"
                            placeholder="选择年份" 
                            style="width:80%">
                         </el-date-picker>
                   </el-form-item>
           </el-col>
           <el-col :span="8">
                <el-form-item label="编制依据" prop="drawUpText">
                    <el-input v-model="formModel.order.drawUpText" style="width:80%" ></el-input>
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


</div>
</template>
<script type="text/babel">
import selectFromComMat from 'ocomponents/selectmodule/selectFromComMat'
import organizeTree from 'ocomponents/organize/organizeTree';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
import GHTree from 'ocomponents/gh/GHTree'
import {
            requestCreateOrUpdateGHInitialPlanOrder,
            requestGetGHInitialPlanOrderForEdit,
            requestDeleteGHInitialPlanOrderItem,
        }   from 'api/materials/ghinitialplan';
import config from 'static/js/config';
export default {
    data(){
        return{
            formModel:{
                    order:{
                            orderId:'',
                            orgId:this.getUserInfo().user.manageOrgId,
                            OrgName:this.getUserInfo().user.manageOrgName,
                            orderDate:new Date(),
                            orderCode:'',
                            planType:'',
                            ghId:'',
                            ghCode:'',
                            ghName:'',
                            ghFullName:'',
                            remark:'',
                            drawUpText:''
                        },
                        items:[],
                        config:{isGenerateCode:true},
            },
            rules: {
                        orderDate: [
                             { type: 'date', required: true, message: '计划年份不能为空！', trigger: 'change' }
                         ],
                        planType: [
                            { required: true, message: '请选择计划类型', trigger: 'change' },
                        ],
                        ghId: [                                //change提交后提示，blur焦点离开及时提示
                            { required: true, message: '请选择工号', trigger: 'change' }
                        ],
                        orgId: [
                            { required: true, message: '请选择所在单位！', trigger: 'change' }
                        ]
                        
            },
            sumRowConf:{
                            disable:false,
                            sumText:'合计',
                            items:{
                                planQuantity:{text:'数量合计',sumval:0.00,capitalCol:false},
                                lossQuantity:{text:'损耗量合计',sumval:0.00,capitalCol:false},
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
                            {attr: { prop: 'id', label: '操作', width:65,scopedSlot: 'id',} },      
                            {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                            {attr: { prop: 'infoModel', label: '规格型号',  width:100, } },   
                            {attr: { prop: 'infoUnit', label: '单位', width:65,  } },   
                            {attr: { prop: 'planQuantity', label: '数量', width:100,  scopedSlot: 'planQuantity',} },   
                            {attr: { prop: 'loassRate', label: '损耗率', width:100,  scopedSlot: 'loassRate',} },   
                            {attr: { prop: 'lossQuantity', label: '损耗数量',  width:100, } },   
                            {attr: { prop: 'responsePrice', label: '计划价',  width:100, },},   
                            {attr: { prop: 'responseSum', label: '金额',   width:100,} }, 
                            {attr: { prop: 'remark', label: '备注',scopedSlot: 'remark',  } }, 
                        ],
                        solSlotConf:[ { type:'input',name:'planQuantity', 
                                        elmentConfig:{  //控件配置
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, }, 
                                         eventconf:{
                                                ison:true,  //开启事件
                                                event:(row,name)=>{
                                                    if(this.checkdecimalfn(row.planQuantity)){
                                                         row.responseSum=parseFloat(row.planQuantity)*row.responsePrice;
                                                         row.lossQuantity=parseFloat(row.planQuantity)*row.loassRate/100;
                                                    }else{
                                                         row.planQuantity=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                    this._sumCount();
                                                },
                                             }
                                         },
                                      { type:'input',name:'loassRate', 
                                        elmentConfig:{
                                                maxlength:1000000, 
                                                minlength:0,
                                                size:"small",
                                                disabled:false,
                                                type:"text",
                                                placeholder:"",
                                                icon:"",
                                                readonly:false, }, 
                                         eventconf:{
                                                ison:true,
                                                event:(row)=>{
                                                    if(this.checkdecimalfn(row.loassRate)){
                                                         row.lossQuantity=row.planQuantity*parseFloat(row.loassRate)/100
                                                    }else{
                                                         row.loassRate=0.00;
                                                         this.$message.error('输入类型有误！');
                                                    }
                                                     this._sumCount();
                                                },

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
        tableEditMapConfig:{
             get () {
                 return {
                     mapconf: [
                                { prop: 'id', isplace: false, defaultval:'0',selprop: '' },  
                                { prop: 'dataId', isplace: true, defaultval:'',selprop: 'id' },
                                { prop: 'dataType', isplace: false, defaultval:'0',selprop: '' },   // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材     
                                { prop: 'guid', isplace: false, defaultval:this.newGuid(),selprop: '' },
                                { prop: 'sortCode', isplace: false, defaultval:'',selprop: '' },
                                { prop: 'infoNM', isplace: true, defaultval:'',selprop: 'id' },  
                                { prop: 'cId', isplace: true, defaultval:'',selprop: 'cId' },  
                                { prop: 'classNodeBh', isplace: true, defaultval:'',selprop: 'classNodeBh' },  
                                { prop: 'infoCode', isplace: true, defaultval:'',selprop: 'infoCode' },   
                                { prop: 'infoName', isplace: true, defaultval:'',selprop: 'infoName' }, 
                                { prop: 'infoModel', isplace: true,defaultval:'',selprop: 'infoModel' }, 
                                { prop: 'infoUnit', isplace: true, defaultval:'',selprop: 'infoUnit' }, 
                                { prop: 'planQuantity', isplace: false, defaultval:0.00,selprop: '' }, 
                                { prop: 'loassRate', isplace: false, defaultval:0.00,selprop: '' },
                                { prop: 'lossQuantity', isplace: false, defaultval:0.00,selprop: '' },
                                { prop: 'responsePrice', isplace: true, defaultval:0.00,selprop: 'responsiPrice' },
                                { prop: 'responseSum', isplace: false, defaultval:0.00,selprop: '' }, 
                                { prop: 'remark', isplace: false, defaultval:'',selprop: '' },   
                            ] 
                 }
             }
         },
    }, 
    methods:{
         _sumCount(colName){
             //计算列的合计值
            let planQuantityTotal=0.00,lossQuantityTotal=0.00,responseSumTotal=0.00;
            this.formModel.items.map((item)=>{
                //凡是手动输入后的input都会转化为str  因此计算时要转化一下。
                planQuantityTotal=planQuantityTotal+parseFloat(item.planQuantity);
                lossQuantityTotal=lossQuantityTotal+parseFloat(item.lossQuantity);
                responseSumTotal=responseSumTotal+item.responseSum;
            })
            this.sumRowConf.items.planQuantity.sumval=planQuantityTotal.toFixed(2);
            this.sumRowConf.items.lossQuantity.sumval=lossQuantityTotal.toFixed(2);
            this.sumRowConf.items.responseSum.sumval=responseSumTotal.toFixed(2);
         },
         _formInitial(){
            //初始化表单
            requestGetGHInitialPlanOrderForEdit(this.selectRow.id).then(data=>{
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
                            requestDeleteGHInitialPlanOrderItem(obj).then(data=>{
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
                        this.formModel.order.orderDate=this.formatDate(this.formModel.order.orderDate,"YYYY");
                        this.formModel.order.isAudit=false;
                        if(this.formModel.order.orderId!==""){
                            //修改
                             if(this.orderDateInital==this.formModel.order.orderDate){
                                 this.formModel.config.isGenerateCode=false;
                             }
                        }
                        this.loading=true;
                        requestCreateOrUpdateGHInitialPlanOrder(this.formModel).then((data)=>{
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
             this.addFormVisible=true
          },
         _getCurrentNodeOrg(data){
             //组织机构选择事件
            this.formModel.order.OrgName=data.text;
            let val=this.formatDate(this.formModel.order.orderDate,"YYYY");
            this._getCode(val);
          },
         _getCurrentNode(data){
            this.formModel.order.ghCode=data.code;
            this.formModel.order.ghName=data.text;
            this.formModel.order.ghFullName=data.text;
         },
         _getCode(val){
             this.generateOrderCode('PL_GHInitialPlanOrder',this.formModel.order.orgId,val,(val)=>{
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
             let val=this.formatDate(this.formModel.order.orderDate,"YYYY");
             this._getCode(val);
         }

    },    
    components:{
       'yl-organizeTree':organizeTree,
       'yl-dataDictionaryForSel':dataDictionaryForSel,
       'yl-GHTree':GHTree,
       'yl-selectFromComMat':selectFromComMat,
    },
    watch:{
        formModel:function(val, oldVal){
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
