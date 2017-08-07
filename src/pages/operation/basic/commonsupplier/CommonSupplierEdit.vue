<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
   <el-row>
         <el-form-item label="名称" prop="supplierName">
             <el-input v-model="formModel.supplierName" ></el-input>
          </el-form-item>   
         <el-form-item label="简称" prop="supplierAbbName">
             <el-input v-model="formModel.supplierAbbName" ></el-input>
         </el-form-item>
         <el-form-item label="联系人" prop="supplierContact">
             <el-input v-model="formModel.supplierContact" ></el-input>
         </el-form-item>
         <el-form-item label="联系电话" prop="supplierPhone">
             <el-input v-model="formModel.supplierPhone" ></el-input>
         </el-form-item>
          <el-form-item label="是否黑名单" prop="isBlackList">
            <el-switch  v-model="formModel.isBlackList" on-text="是" off-text="否"></el-switch>  
         </el-form-item>
        <el-form-item label="备注" prop="remark">
                <el-input v-model="formModel.remark" row="5" type="textarea" style="100%"></el-input>
        </el-form-item> 
   <el-form-item >
        <el-checkbox v-model="isClose">保存后关闭</el-checkbox>
        <div style="text-align:right;">   
            <el-button @click="_resetForm">重置</el-button>
            <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
        </div>
    </el-form-item>
  </el-row>
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateCommonSupplier
}from 'api/commonsupplier';
export default {
    data(){
    return{
        formModel:{
                 supplierName:'',
                 supplierAbbName:'',
                 orgId:'',
                 supplierContact:'',
                 supplierPhone:'',
                 isBlackList: false,
                 remark:''
        },
         rules: {
                    supplierName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
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
                    params.commonSupplier=this.formModel;
                    requestCreateOrUpdateCommonSupplier(params).then(data=>{
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
