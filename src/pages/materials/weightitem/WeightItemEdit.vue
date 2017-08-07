
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="" prop="itemId">
             <el-input v-model="formModel.itemId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="bdNum">
             <el-input v-model="formModel.bdNum" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="orgId">
             <el-input v-model="formModel.orgId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="orgName">
             <el-input v-model="formModel.orgName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="batchNo">
             <el-input v-model="formModel.batchNo" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="wagAbbProvince">
             <el-input v-model="formModel.wagAbbProvince" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="wagonNumber">
             <el-input v-model="formModel.wagonNumber" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="materialStore">
             <el-input v-model="formModel.materialStore" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="transformSupplier">
             <el-input v-model="formModel.transformSupplier" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="infoCode">
             <el-input v-model="formModel.infoCode" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="infoName">
             <el-input v-model="formModel.infoName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="infoModel">
             <el-input v-model="formModel.infoModel" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="infoUnit">
             <el-input v-model="formModel.infoUnit" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="infoSecUnit">
             <el-input v-model="formModel.infoSecUnit" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="priSecConvRate">
             <el-input v-model="formModel.priSecConvRate" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="infoClassNodebh">
             <el-input v-model="formModel.infoClassNodebh" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="infoClassName">
             <el-input v-model="formModel.infoClassName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="secondClassName">
             <el-input v-model="formModel.secondClassName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="firstClassName">
             <el-input v-model="formModel.firstClassName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="storeroom">
             <el-input v-model="formModel.storeroom" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="supplierNM">
             <el-input v-model="formModel.supplierNM" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="supplierName">
             <el-input v-model="formModel.supplierName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="grossWeight">
             <el-input v-model="formModel.grossWeight" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="tareWeight">
             <el-input v-model="formModel.tareWeight" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="discountRate">
             <el-input v-model="formModel.discountRate" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="discount">
             <el-input v-model="formModel.discount" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="netQuantity">
             <el-input v-model="formModel.netQuantity" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="netWeight">
             <el-input v-model="formModel.netWeight" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="weighMan">
             <el-input v-model="formModel.weighMan" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="inTime">
             <el-input v-model="formModel.inTime" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="isOut">
             <el-input v-model="formModel.isOut" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="outTime">
             <el-input v-model="formModel.outTime" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="isUpload">
             <el-input v-model="formModel.isUpload" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="uploadTime">
             <el-input v-model="formModel.uploadTime" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="isCh">
             <el-input v-model="formModel.isCh" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="isBd">
             <el-input v-model="formModel.isBd" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="isAudit">
             <el-input v-model="formModel.isAudit" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="maker">
             <el-input v-model="formModel.maker" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="makerDate">
             <el-input v-model="formModel.makerDate" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="remark">
             <el-input v-model="formModel.remark" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="pch">
             <el-input v-model="formModel.pch" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="barCode">
             <el-input v-model="formModel.barCode" ></el-input>
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
    requestCreateOrUpdateWeightItem
}from 'api/materials/weightitem';
export default {
    data(){
    return{
        formModel:{
                 itemId:'',
                 bdNum:'',
                 orgId:'',
                 orgName:'',
                 batchNo:'',
                 wagAbbProvince:'',
                 wagonNumber:'',
                 materialStore:'',
                 transformSupplier:'',
                 infoCode:'',
                 infoName:'',
                 infoModel:'',
                 infoUnit:'',
                 infoSecUnit:'',
                 priSecConvRate:'',
                 infoClassNodebh:'',
                 infoClassName:'',
                 secondClassName:'',
                 firstClassName:'',
                 storeroom:'',
                 supplierNM:'',
                 supplierName:'',
                 grossWeight:'',
                 tareWeight:'',
                 discountRate:'',
                 discount:'',
                 netQuantity:'',
                 netWeight:'',
                 weighMan:'',
                 inTime:'',
                 isOut:'',
                 outTime:'',
                 isUpload:'',
                 uploadTime:'',
                 isCh:'',
                 isBd:'',
                 isAudit:'',
                 maker:'',
                 makerDate:'',
                 remark:'',
                 pch:'',
                 barCode:'',
               sortCode: 1,
        },
         rules: {
                    itemId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    bdNum: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    orgId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    orgName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    batchNo: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    wagAbbProvince: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    wagonNumber: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    materialStore: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    transformSupplier: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoCode: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoModel: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoUnit: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoSecUnit: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    priSecConvRate: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoClassNodebh: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoClassName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    secondClassName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    firstClassName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    storeroom: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    supplierNM: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    supplierName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    grossWeight: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    tareWeight: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    discountRate: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    discount: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    netQuantity: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    netWeight: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    weighMan: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    inTime: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    isOut: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    outTime: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    isUpload: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    uploadTime: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    isCh: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    isBd: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    isAudit: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    maker: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    makerDate: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    remark: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    pch: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    barCode: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
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
                    params.weightItem=this.formModel;
                    requestCreateOrUpdateWeightItem(params).then(data=>{
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
