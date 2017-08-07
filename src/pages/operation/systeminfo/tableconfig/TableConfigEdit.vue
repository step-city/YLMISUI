
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="表格名称" prop="tableName">
             <el-input v-model="formModel.tableName" ></el-input>
         </el-form-item>
         <el-form-item label="显示名称" prop="fullName">
             <el-input v-model="formModel.fullName" ></el-input>
         </el-form-item>
         <el-form-item label="模块名称" prop="moduleName">
             <el-input v-model="formModel.moduleName" ></el-input>
         </el-form-item>
         <el-form-item label="描述" prop="remark">
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
    requestCreateOrUpdateMenuApp
}from '../../../../api/menuapp';
export default {
    data(){
    return{
        formModel:{
                 tableName:'',
                 fullName:'',
                 moduleName:'',
                 remark:'',
               sortCode: 1,
        },
         rules: {
                    tableName: [
                      { required: true, message: '表格名称不能为空！', trigger: 'blur' }
                    ],
                    fullName: [
                      { required: true, message: '显示名称不能为空！', trigger: 'blur' }
                    ],
                    moduleName: [
                      { required: true, message: '模块名称不能为空！', trigger: 'blur' }
                    ],
                    remark: [
                      { required: true, message: '描述不能为空！', trigger: 'blur' }
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
                    params.tableConfig=this.formModel;
                    requestCreateOrUpdateTableConfig(params).then(data=>{
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
                            this.$message.error('保存数据失败！');
                        }
                            this.loading=false;
                    }).catch(function(error){
                    this.$message.error('网络异常！'+error);
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
