
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="" prop="orgId">
             <el-input v-model="formModel.orgId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="station">
             <el-input v-model="formModel.station" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="proLine">
             <el-input v-model="formModel.proLine" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="taskNo">
             <el-input v-model="formModel.taskNo" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="reciepeNo">
             <el-input v-model="formModel.reciepeNo" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="morReciepe">
             <el-input v-model="formModel.morReciepe" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="scheduleID">
             <el-input v-model="formModel.scheduleID" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="projName">
             <el-input v-model="formModel.projName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="consPos">
             <el-input v-model="formModel.consPos" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="pour">
             <el-input v-model="formModel.pour" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="betLev">
             <el-input v-model="formModel.betLev" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="lands">
             <el-input v-model="formModel.lands" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="vehicle">
             <el-input v-model="formModel.vehicle" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="driver">
             <el-input v-model="formModel.driver" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="planMete">
             <el-input v-model="formModel.planMete" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="prodMete">
             <el-input v-model="formModel.prodMete" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="morMete">
             <el-input v-model="formModel.morMete" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="pieCnt">
             <el-input v-model="formModel.pieCnt" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="operator">
             <el-input v-model="formModel.operator" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="qualitor">
             <el-input v-model="formModel.qualitor" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="pieceID">
             <el-input v-model="formModel.pieceID" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="datTim">
             <el-input v-model="formModel.datTim" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="genTim">
             <el-input v-model="formModel.genTim" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="serial">
             <el-input v-model="formModel.serial" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="bldTim">
             <el-input v-model="formModel.bldTim" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="pieAmnt">
             <el-input v-model="formModel.pieAmnt" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="dosageID">
             <el-input v-model="formModel.dosageID" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="material">
             <el-input v-model="formModel.material" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="mName">
             <el-input v-model="formModel.mName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="mCode">
             <el-input v-model="formModel.mCode" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="watFull">
             <el-input v-model="formModel.watFull" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="planAmnt">
             <el-input v-model="formModel.planAmnt" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="factAmnt">
             <el-input v-model="formModel.factAmnt" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="isAlert">
             <el-input v-model="formModel.isAlert" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="remark">
             <el-input v-model="formModel.remark" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="createDate">
             <el-input v-model="formModel.createDate" ></el-input>
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
    requestCreateOrUpdateLopItem
}from 'api/materials/lopitem';
export default {
    data(){
    return{
        formModel:{
                 orgId:'',
                 station:'',
                 proLine:'',
                 taskNo:'',
                 reciepeNo:'',
                 morReciepe:'',
                 scheduleID:'',
                 projName:'',
                 consPos:'',
                 pour:'',
                 betLev:'',
                 lands:'',
                 vehicle:'',
                 driver:'',
                 planMete:'',
                 prodMete:'',
                 morMete:'',
                 pieCnt:'',
                 operator:'',
                 qualitor:'',
                 pieceID:'',
                 datTim:'',
                 genTim:'',
                 serial:'',
                 bldTim:'',
                 pieAmnt:'',
                 dosageID:'',
                 material:'',
                 mName:'',
                 mCode:'',
                 watFull:'',
                 planAmnt:'',
                 factAmnt:'',
                 isAlert:'',
                 remark:'',
                 createDate:'',
               sortCode: 1,
        },
         rules: {
                    orgId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    station: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    proLine: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    taskNo: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    reciepeNo: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    morReciepe: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    scheduleID: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    projName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    consPos: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    pour: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    betLev: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    lands: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    vehicle: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    driver: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    planMete: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    prodMete: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    morMete: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    pieCnt: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    operator: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    qualitor: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    pieceID: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    datTim: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    genTim: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    serial: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    bldTim: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    pieAmnt: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    dosageID: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    material: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    mName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    mCode: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    watFull: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    planAmnt: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    factAmnt: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    isAlert: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    remark: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    createDate: [
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
                    params.lopItem=this.formModel;
                    requestCreateOrUpdateLopItem(params).then(data=>{
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
