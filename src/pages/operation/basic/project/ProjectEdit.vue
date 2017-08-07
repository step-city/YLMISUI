
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="主键" prop="orgId">
             <el-input v-model="formModel.orgId" ></el-input>
         </el-form-item>
         <el-form-item label="名称" prop="shortName">
             <el-input v-model="formModel.shortName" ></el-input>
         </el-form-item>
         <el-form-item label="简称" prop="abbbName">
             <el-input v-model="formModel.abbbName" ></el-input>
         </el-form-item>
         <el-form-item label="地址" prop="pAddress">
             <el-input v-model="formModel.pAddress" ></el-input>
         </el-form-item>
         <el-form-item label="负责人" prop="pResponsiblePerson">
             <el-input v-model="formModel.pResponsiblePerson" ></el-input>
         </el-form-item>
         <el-form-item label="电话" prop="pPhone">
             <el-input v-model="formModel.pPhone" ></el-input>
         </el-form-item>
         <el-form-item label="开工时间" prop="pStartDate">
             <el-input v-model="formModel.pStartDate" ></el-input>
         </el-form-item>
         <el-form-item label="完工时间" prop="pEndDate">
             <el-input v-model="formModel.pEndDate" ></el-input>
         </el-form-item>
         <el-form-item label="合同开工时间" prop="pContractStartDate">
             <el-input v-model="formModel.pContractStartDate" ></el-input>
         </el-form-item>
         <el-form-item label="合同完工时间" prop="pContractEndDate">
             <el-input v-model="formModel.pContractEndDate" ></el-input>
         </el-form-item>
         <el-form-item label="项目状态" prop="pStatus">
             <el-input v-model="formModel.pStatus" ></el-input>
         </el-form-item>
         <el-form-item label="区域id" prop="pZoneId">
             <el-input v-model="formModel.pZoneId" ></el-input>
         </el-form-item>
         <el-form-item label="区域名称" prop="pZoneName">
             <el-input v-model="formModel.pZoneName" ></el-input>
         </el-form-item>
         <el-form-item label="工程类型" prop="pTypeName">
             <el-input v-model="formModel.pTypeName" ></el-input>
         </el-form-item>
         <el-form-item label="设计单位" prop="pDesigner">
             <el-input v-model="formModel.pDesigner" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="pSupervision">
             <el-input v-model="formModel.pSupervision" ></el-input>
         </el-form-item>
         <el-form-item label="主管单位" prop="pManager">
             <el-input v-model="formModel.pManager" ></el-input>
         </el-form-item>
         <el-form-item label="业主单位" prop="pOwner">
             <el-input v-model="formModel.pOwner" ></el-input>
         </el-form-item>
         <el-form-item label="项目概况" prop="pDescriptions">
             <el-input v-model="formModel.pDescriptions" ></el-input>
         </el-form-item>
         <el-form-item label="投标日期" prop="pBidDate">
             <el-input v-model="formModel.pBidDate" ></el-input>
         </el-form-item>
         <el-form-item label="签订日期" prop="pSiginDate">
             <el-input v-model="formModel.pSiginDate" ></el-input>
         </el-form-item>
         <el-form-item label="合同标价" prop="pContractPrice">
             <el-input v-model="formModel.pContractPrice" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="remark">
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
    requestCreateOrUpdateProject
}from 'api/project';
export default {
    data(){
    return{
        formModel:{
                 orgId:'',
                 shortName:'',
                 abbbName:'',
                 pAddress:'',
                 pResponsiblePerson:'',
                 pPhone:'',
                 pStartDate:'',
                 pEndDate:'',
                 pContractStartDate:'',
                 pContractEndDate:'',
                 pStatus:'',
                 pZoneId:'',
                 pZoneName:'',
                 pTypeName:'',
                 pDesigner:'',
                 pSupervision:'',
                 pManager:'',
                 pOwner:'',
                 pDescriptions:'',
                 pBidDate:'',
                 pSiginDate:'',
                 pContractPrice:'',
                 remark:'',
               sortCode: 1,
        },
         rules: {
                   
                    shortName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
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
                    params.project=this.formModel;
                    requestCreateOrUpdateProject(params).then(data=>{
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
