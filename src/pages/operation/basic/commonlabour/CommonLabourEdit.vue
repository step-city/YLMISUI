<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
    <el-row>
        <el-col :span="12">
            <el-form-item label="名称" prop="labourName">
                <el-input v-model="formModel.labourName" ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
             <el-form-item label="类型" prop="labourTypeName">
                <el-input v-model="formModel.labourTypeName" ></el-input>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <el-form-item label="信用代码" prop="labourOrgCode">
                <el-input v-model="formModel.labourOrgCode" ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="联系人" prop="labourContact">
                <el-input v-model="formModel.labourContact" ></el-input>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <el-form-item label="联系电话" prop="labourPhone">
                <el-input v-model="formModel.labourPhone" ></el-input>
            </el-form-item> 
        </el-col>
        <el-col :span="12">
            <el-form-item label="传真" prop="labourFax">
                <el-input v-model="formModel.labourFax" ></el-input>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
            <el-form-item label="是否黑名单" prop="isBlackList">
                <el-switch  v-model="formModel.isBlackList" on-text="是" off-text="否"></el-switch>  
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="formModel.remark" type="textarea" row="5" style="100%"></el-input>
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
    requestCreateOrUpdateCommonLabour
}from 'api/commonlabour';
export default {
    data(){
    return{
        formModel:{
                 labourName:'',
                 orgId:'',
                 labourContact:'',
                 labourPhone:'',
                 labourTypeName:'',
                 labourFax:'',
                 labourOrgCode:'',
                 isBlackList: false,
                 remark:''
        },
         rules: {
                    labourName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
                    ],
                    orgId: [
                      { required: true, message: '组织机构id不能为空！', trigger: 'blur' }
                    ],
                    labourTypeName: [
                      { required: true, message: '类型不能为空！', trigger: 'blur' }
                    ],
                    labourOrgCode: [
                      { required: true, message: '信用代码不能为空！', trigger: 'blur' }
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
                    params.commonLabour=this.formModel;
                    requestCreateOrUpdateCommonLabour(params).then(data=>{
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
