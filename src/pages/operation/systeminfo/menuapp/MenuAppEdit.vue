<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
 <el-form-item label="应用代码" prop="appCode">
      <el-input v-model="formModel.appCode" ></el-input>
  </el-form-item>
<el-form-item label="应用名称" prop="appName">
      <el-input v-model="formModel.appName" ></el-input>
  </el-form-item>
<el-form-item label="配置路径" prop="appUrl">
      <el-input v-model="formModel.appUrl" ></el-input>
  </el-form-item>
  <el-form-item label="功能编码" prop="pessionCode">
      <el-input v-model="formModel.pessionCode" ></el-input>
  </el-form-item>
  <el-form-item label="图标" prop="appIcon">
      <el-input v-model="formModel.appIcon" ></el-input>
  </el-form-item>
  <el-row>
    <el-col :span="12">
        <el-form-item label="状态" prop="isDisable">
            <el-switch  v-model="formModel.isDisable"
                            on-text="启用"
                            off-text="禁用"
                            on-color="#13ce66"
                            off-color="#ff4949">
                </el-switch>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="排序" prop="sortCode" >
            <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
        </el-form-item>
    </el-col>
  </el-row>
  <el-form-item label="描述" prop="appDescription">
      <el-input v-model="formModel.appDescription" ></el-input>
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
    requestCreateOrUpdateMenuApp
}from 'api/menuapp';
export default {
    data(){
    return{
        formModel:{
            appCode:'',
            appName:'',
            appDescription:'',
            appUrl:'',
            pessionCode:'',
            appIcon:'',
            sortCode: 1,
            isDisable: true,
        },
         rules: {
            appCode: [
              { required: true, message: '应用代码不能为空！', trigger: 'blur' }
            ],
            appName: [
              { required: true, message: '应用名称不能为空！', trigger: 'blur' }
            ],
            // appUrl: [
            //   { required: true, message: '配置路径不能为空！', trigger: 'blur' }
            // ],
            pessionCode: [
              { required: true, message: '功能编码不能为空！', trigger: 'blur' }
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
                    this.loading=true;
                    var params={};
                    params.menuApp=this.formModel;
                    requestCreateOrUpdateMenuApp(params).then(data=>{
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
                    this.loading=false;
                    })
                } else {
                    console.log('error submit!!');
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
