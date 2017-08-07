<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
    <el-row>
         <el-form-item label="属性" prop="paraKind">
             <el-input v-model="formModel.paraKind" ></el-input>
         </el-form-item>
         <el-form-item label="属性名称" prop="paraName">
             <el-input v-model="formModel.paraName" ></el-input>
         </el-form-item>
          <el-form-item label="排序" prop="sortCode" >
         <el-input-number v-model="formModel.sortCode" :min="1" style="width:100%"  ></el-input-number>
         </el-form-item>
         <el-form-item label="备注" prop="paraRemark">
             <el-input v-model="formModel.paraRemark" type="textarea" style="width:100%" ></el-input>
         </el-form-item>
    </el-row>
 <el-form-item>
      <el-checkbox v-model="isClose">保存后关闭</el-checkbox>
       <div style="text-align:right;">   
            <el-button @click="_resetForm">重置</el-button>
            <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
     </div>
  </el-form-item>
  
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateParameters
}from 'api/parameters';
export default {
    data(){
    return{
        formModel:{
                 paraID:'',
                 paraKind:'',
                 paraName:'',
                 paraValue:'',
                 paraRemark:'',
               sortCode: 1,
        },
         rules: {
                    paraID: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    paraKind: [
                      { required: true, message: '属性不能为空！', trigger: 'blur' }
                    ],
                    paraName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
                    ],
                
         },
        loading:false,
         isClose:true,

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
                    let params={};
                    params.parameters=this.formModel;
                    requestCreateOrUpdateParameters(params).then(data=>{
                    if(data.success){
                            this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                                });
                            //关闭面板
                             this._complete(this.isClose);
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
