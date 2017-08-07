<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="存放地名称" prop="storePostionName">
             <el-input v-model="formModel.storePostionName" ></el-input>
         </el-form-item>
         <el-form-item label="地址" prop="storePostionAdd">
             <el-input v-model="formModel.storePostionAdd" ></el-input>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
             <el-input v-model="formModel.remark" type="textarea" row="5" style="100%" ></el-input>
         </el-form-item>
   <el-form-item >
        <div style="text-align:right;">   
            <el-checkbox v-model="isClose">保存后关闭</el-checkbox> &nbsp&nbsp&nbsp&nbsp&nbsp
            <el-button @click="_resetForm">重置</el-button>
            <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
        </div>
    </el-form-item>
  
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateStorePostion
}from 'api/storepostion';
export default {
    data(){
    return{
        formModel:{
                 orgId:this.getUserInfo().user.manageOrgId,
                 storePostionName:'',
                 storePostionAdd:'',
                 remark:'',
        },
         rules: {
                    storePostionName: [
                      { required: true, message: '存放地名称不能为空！', trigger: 'blur' }
                    ],
         },
        loading:false,
        isClose:true

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
                    params.storePostion=this.formModel;
                    requestCreateOrUpdateStorePostion(params).then(data=>{
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
