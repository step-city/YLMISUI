
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="表名" prop="tableName">
             <el-input v-model="formModel.tableName" ></el-input>
         </el-form-item>
         <el-form-item label="功能" prop="functionName">
             <el-input v-model="formModel.functionName" ></el-input>
         </el-form-item>
         <el-form-item label="列名" prop="abbColName">
             <el-input v-model="formModel.abbColName" ></el-input>
         </el-form-item>
         <el-form-item label="列全称" prop="fullColName">
             <el-input v-model="formModel.fullColName" ></el-input>
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
    requestCreateOrUpdateTableInfoConfig
}from 'api/tableinfoconfig';
export default {
    data(){
    return{
        formModel:{
                 tableName:'',
                 functionName:'',
                 abbColName:'',
                 fullColName:'',
                 remark:'',
               sortCode: 1,
        },
         rules: {
                    tableName: [
                      { required: true, message: '表名不能为空！', trigger: 'blur' }
                    ],
                    functionName: [
                      { required: true, message: '功能不能为空！', trigger: 'blur' }
                    ],
                    abbColName: [
                      { required: true, message: '列名不能为空！', trigger: 'blur' }
                    ],
                    fullColName: [
                      { required: true, message: '全称不能为空！', trigger: 'blur' }
                    ],
                    // remark: [
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
                    params.tableInfoConfig=this.formModel;
                    requestCreateOrUpdateTableInfoConfig(params).then(data=>{
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
