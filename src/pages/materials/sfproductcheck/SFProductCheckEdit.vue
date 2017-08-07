
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <!-- <el-form-item label="" prop="orgId">
             <el-input v-model="formModel.orgId" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="orgName">
             <el-input v-model="formModel.orgName" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="sInfoNM">
             <el-input v-model="formModel.sInfoNM" ></el-input>
         </el-form-item> -->
         <el-form-item label="材料编码" prop="sInfoCode">
             <el-input v-model="formModel.sInfoCode" :disabled="true" ></el-input>
         </el-form-item>
         <el-form-item label="材料名称" prop="sInfoName">
             <el-input v-model="formModel.sInfoName" :disabled="true" ></el-input>
         </el-form-item>
         <el-form-item label="规格型号" prop="sInfoModel">
             <el-input v-model="formModel.sInfoModel"  :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="单位" prop="sInfoUnit">
             <el-input v-model="formModel.sInfoUnit"  :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="数量" prop="quantity">
             <el-input v-model="formModel.quantity" ></el-input>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
             <el-input v-model="formModel.remark" ></el-input>
         </el-form-item>
         <!-- <el-form-item label="" prop="extendColumn1">
             <el-input v-model="formModel.extendColumn1" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="extendColumn2">
             <el-input v-model="formModel.extendColumn2" ></el-input>
         </el-form-item>
         <el-form-item label="" prop="extendColumn3">
             <el-input v-model="formModel.extendColumn3" ></el-input>
         </el-form-item> -->
                
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
    requestCreateOrUpdateSFProductCheck
}from 'api/materials/sfproductcheck';
export default {
    data(){
    return{
        formModel:{
                 orgId:'',
                 orgName:'',
                 sInfoNM:'',
                 sInfoCode:'',
                 sInfoName:'',
                 sInfoModel:'',
                 sInfoUnit:'',
                 quantity:'',
                 remark:'',
                 extendColumn1:'',
                 extendColumn2:'',
                 extendColumn3:'',
                 sortCode: 1,
        },
         rules: {
                    // orgId: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    // orgName: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    // sInfoNM: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    // sInfoCode: [
                    //   { required: true, message: '材料编码不能为空！', trigger: 'blur' }
                    // ],
                    // sInfoName: [
                    //   { required: true, message: '材料名称不能为空！', trigger: 'blur' }
                    // ],
                    // sInfoModel: [
                    //   { required: true, message: '规格型号不能为空！', trigger: 'blur' }
                    // ],
                    // sInfoUnit: [
                    //   { required: true, message: '单位不能为空！', trigger: 'blur' }
                    // ],
                    quantity: [
                      { validator: this.checkdecimal, trigger: 'blur' }
                    ],
                    // remark: [
                    //   { required: true, message: '备注不能为空！', trigger: 'blur' }
                    // ],
                    // extendColumn1: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    // extendColumn2: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    // extendColumn3: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
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
                    params.sFProductCheck=this.formModel;
                    requestCreateOrUpdateSFProductCheck(params).then(data=>{
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
