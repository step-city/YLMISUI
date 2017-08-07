
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="" prop="itemId">
             <el-input v-model="formModel.itemId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="orgId">
             <el-input v-model="formModel.orgId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="orderId">
             <el-input v-model="formModel.orderId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="receiveItemNM">
             <el-input v-model="formModel.receiveItemNM" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="receiveTypeId">
             <el-input v-model="formModel.receiveTypeId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="storeMonth">
             <el-input v-model="formModel.storeMonth" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="infoNM">
             <el-input v-model="formModel.infoNM" ></el-input>
         </el-form-item>
         <el-form-item label="材料编码" prop="infoCode">
             <el-input v-model="formModel.infoCode" ></el-input>
         </el-form-item>
         <el-form-item label="材料名称" prop="infoName">
             <el-input v-model="formModel.infoName" ></el-input>
         </el-form-item>
         <el-form-item label="规格型号" prop="infoModel">
             <el-input v-model="formModel.infoModel" ></el-input>
         </el-form-item>
         <el-form-item label="单位" prop="infoUnit">
             <el-input v-model="formModel.infoUnit" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="cId">
             <el-input v-model="formModel.cId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="classNodebh">
             <el-input v-model="formModel.classNodebh" ></el-input>
         </el-form-item>
         <el-form-item label="BarCode" prop="barCode">
             <el-input v-model="formModel.barCode" ></el-input>
         </el-form-item>
         <el-form-item label="库别" prop="storeRoom">
             <el-input v-model="formModel.storeRoom" ></el-input>
         </el-form-item>
         <el-form-item label="存放地" prop="storePosition">
             <el-input v-model="formModel.storePosition" ></el-input>
         </el-form-item>
         <el-form-item label="摊销方式" prop="amortizeType">
             <el-input v-model="formModel.amortizeType" ></el-input>
         </el-form-item>
         <el-form-item label="库存数量" prop="storeNum">
             <el-input v-model="formModel.storeNum" ></el-input>
         </el-form-item>
         <el-form-item label="单价" prop="bookPrice">
             <el-input v-model="formModel.bookPrice" ></el-input>
         </el-form-item>
         <el-form-item label="原值" prop="bookOriginalValue">
             <el-input v-model="formModel.bookOriginalValue" ></el-input>
         </el-form-item>
         <el-form-item label="残值率" prop="residualValueRate">
             <el-input v-model="formModel.residualValueRate" ></el-input>
         </el-form-item>
         <el-form-item label="残值" prop="residualValue">
             <el-input v-model="formModel.residualValue" ></el-input>
         </el-form-item>
         <el-form-item label="摊销额" prop="amortizeSum">
             <el-input v-model="formModel.amortizeSum" ></el-input>
         </el-form-item>
         <el-form-item label="预计摊销总工期或总工作量" prop="amortizeTime">
             <el-input v-model="formModel.amortizeTime" ></el-input>
         </el-form-item>
         <el-form-item label="已摊销工期" prop="outAmortizeTime">
             <el-input v-model="formModel.outAmortizeTime" ></el-input>
         </el-form-item>
         <el-form-item label="摊销单价" prop="amortizeUnitPrice">
             <el-input v-model="formModel.amortizeUnitPrice" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="amortizeNum">
             <el-input v-model="formModel.amortizeNum" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="allotNum">
             <el-input v-model="formModel.allotNum" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="scrapNum">
             <el-input v-model="formModel.scrapNum" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="dateType">
             <el-input v-model="formModel.dateType" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="dataId">
             <el-input v-model="formModel.dataId" ></el-input>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
             <el-input v-model="formModel.remark" ></el-input>
         </el-form-item>
                
  <el-form-item label="排序" prop="sortCode" >
      <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
  </el-form-item>
  
   <el-form-item style="text-align:right;" >
      <el-button @click="_resetForm">重置</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
  </el-form-item>
  
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateTurnoverInventory
}from 'api/turnoverinventory';
export default {
    data(){
    return{
        formModel:{
                 itemId:'',
                 orgId:'',
                 orderId:'',
                 receiveItemNM:'',
                 receiveTypeId:'',
                 storeMonth:'',
                 infoNM:'',
                 infoCode:'',
                 infoName:'',
                 infoModel:'',
                 infoUnit:'',
                 cId:'',
                 classNodebh:'',
                 barCode:'',
                 storeRoom:'',
                 storePosition:'',
                 amortizeType:'',
                 storeNum:'',
                 bookPrice:'',
                 bookOriginalValue:'',
                 residualValueRate:'',
                 residualValue:'',
                 amortizeSum:'',
                 amortizeTime:'',
                 outAmortizeTime:'',
                 amortizeUnitPrice:'',
                 amortizeNum:'',
                 allotNum:'',
                 scrapNum:'',
                 dateType:'',
                 dataId:'',
                 remark:'',
               sortCode: 1,
        },
         rules: {
                    itemId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    orgId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    orderId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    receiveItemNM: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    receiveTypeId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    storeMonth: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoNM: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoCode: [
                      { required: true, message: '材料编码不能为空！', trigger: 'blur' }
                    ],
                    infoName: [
                      { required: true, message: '材料名称不能为空！', trigger: 'blur' }
                    ],
                    infoModel: [
                      { required: true, message: '规格型号不能为空！', trigger: 'blur' }
                    ],
                    infoUnit: [
                      { required: true, message: '单位不能为空！', trigger: 'blur' }
                    ],
                    cId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    classNodebh: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    barCode: [
                      { required: true, message: 'BarCode不能为空！', trigger: 'blur' }
                    ],
                    storeRoom: [
                      { required: true, message: '库别不能为空！', trigger: 'blur' }
                    ],
                    storePosition: [
                      { required: true, message: '存放地不能为空！', trigger: 'blur' }
                    ],
                    amortizeType: [
                      { required: true, message: '摊销方式不能为空！', trigger: 'blur' }
                    ],
                    storeNum: [
                      { required: true, message: '库存数量不能为空！', trigger: 'blur' }
                    ],
                    bookPrice: [
                      { required: true, message: '单价不能为空！', trigger: 'blur' }
                    ],
                    bookOriginalValue: [
                      { required: true, message: '原值不能为空！', trigger: 'blur' }
                    ],
                    residualValueRate: [
                      { required: true, message: '残值率不能为空！', trigger: 'blur' }
                    ],
                    residualValue: [
                      { required: true, message: '残值不能为空！', trigger: 'blur' }
                    ],
                    amortizeSum: [
                      { required: true, message: '摊销额不能为空！', trigger: 'blur' }
                    ],
                    amortizeTime: [
                      { required: true, message: '预计摊销总工期或总工作量不能为空！', trigger: 'blur' }
                    ],
                    outAmortizeTime: [
                      { required: true, message: '已摊销工期不能为空！', trigger: 'blur' }
                    ],
                    amortizeUnitPrice: [
                      { required: true, message: '摊销单价不能为空！', trigger: 'blur' }
                    ],
                    amortizeNum: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    allotNum: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    scrapNum: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    dateType: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    dataId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    remark: [
                      { required: true, message: '备注不能为空！', trigger: 'blur' }
                    ],
         },
        loading:false
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    methods:{
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.turnoverInventory=this.formModel;
                    requestCreateOrUpdateTurnoverInventory(params).then(data=>{
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
                             this.$message.error('失败！'+data.error.message);
                        }
                            this.loading=false;
                    }).catch(function(error){
                        _this.loading=false;
                    })
                } else {
                    this.$message.warning('请按照条件填充表单！');
                    return false;
                }
                
            });
            },
         _resetForm() {
                this.$refs.formModel.resetFields();
         },
         _complete(){
                this.$emit('close');
            }
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
