
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="名称" prop="attachName">
             <el-input v-model="formModel.attachName" ></el-input>
         </el-form-item>
         <el-form-item label="模块" prop="attachModule">
             <el-input v-model="formModel.attachModule" ></el-input>
         </el-form-item>
         <!--action 上传文件路径-->
           <el-form-item label="链接" prop="attachUrl">
                <el-upload  action="http://192.168.20.32/api/services/app/attachMent/GetAttachMentPageList" style="width:100%;">
                <el-input v-model="formModel.attachUrl" placeholder="请点击上传附件" ></el-input>
                </el-upload>
         </el-form-item>
         <el-form-item label="上传大小" prop="attachSize">
             <el-input v-model="formModel.attachSize" ></el-input>
         </el-form-item>
         <el-form-item label="上传类型" prop="attachType">
             <el-input v-model="formModel.attachType" ></el-input>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
             <el-input v-model="formModel.remark"  type="textarea" style="width:100%" row="5"></el-input>
         </el-form-item>    
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
    requestCreateOrUpdateAttachMent
}from 'api/attachment';
export default {
    data(){
    return{
        formModel:{
                 id:'',
                 projectId:'',
                 userId:'',
                 attachName:'',
                 attachModule:'',
                 attachUrl:'',
                 attachSize:'',
                 attachType:'',
                 remark:'',
        },
         rules: {
                    // attachUrl: [
                    //   { required: true, message: '网址不能为空！', trigger: 'blur' }
                    // ],
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
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.attachMent=this.formModel;
                    requestCreateOrUpdateAttachMent(params).then(data=>{
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
