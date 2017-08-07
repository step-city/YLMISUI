
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
 <el-tabs v-model="activeName" >
            <el-tab-pane label="基本信息" name="first">
   <el-row>
        <el-col :span="12">
            <el-form-item label="编码" prop="supplierCode">
                <el-input v-model="formModel.supplierCode" ></el-input>
            </el-form-item>
        </el-col>   
        <el-col :span="12">
            <el-form-item label="名称" prop="supplierName">
                <el-input v-model="formModel.supplierName" ></el-input>
            </el-form-item>
        </el-col>  
     </el-row> 
      <el-row>
        <el-col :span="12">   
            <el-form-item label="简称" prop="supplierAbbName">
                <el-input v-model="formModel.supplierAbbName" ></el-input>
            </el-form-item>
        </el-col>   
        <el-col :span="12">
               <el-form-item label="社会信用代码" prop="supplierOrgCode">
                <el-input v-model="formModel.supplierOrgCode" ></el-input>
              </el-form-item>
        </el-col>
     </el-row> 
      <el-row>
        <el-col :span="12">
              <el-form-item label="供应商类别" prop="supplierTypeName">
                <dataDictionaryForSel :code="'SupplierType'" v-model="formModel.supplierTypeName"  :placeholder="'请选泽类别'"></dataDictionaryForSel>
              </el-form-item>
        </el-col>   
        <el-col :span="12" style="color:#225842">
                 <el-form-item label="供应商状态" prop="supplierState">
                   <dataDictionaryForSel :code="'SupplierState'" v-model="formModel.supplierState"  :placeholder="'请选择状态'" >
                </dataDictionaryForSel>
                 </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
              <el-form-item label="联系人" prop="supplierContact">
                    <el-input v-model="formModel.supplierContact" ></el-input>
                </el-form-item>
        </el-col>   
        <el-col :span="12">
                <el-form-item label="电话" prop="supplierPhone">
                    <el-input v-model="formModel.supplierPhone" ></el-input>
                </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
               <el-form-item label="传真" prop="supplierFax">
                    <el-input v-model="formModel.supplierFax" ></el-input>
                </el-form-item>
        </el-col>   
        <el-col :span="12">
                    <el-form-item label="邮编" prop="supplierPostCode">
                    <el-input v-model="formModel.supplierPostCode" ></el-input>
                </el-form-item> 
        </el-col>
    </el-row>
    </el-tab-pane>
   <el-tab-pane label="其他信息" name="two">    
     <el-row>
        <el-col :span="12">
                <el-form-item label="法人代表" prop="supplierFRDB">
                <el-input v-model="formModel.supplierFRDB" ></el-input>
                </el-form-item>
        </el-col>   
        <el-col :span="12">
                <el-form-item label="委托代表" prop="supplierWTDB">
                    <el-input v-model="formModel.supplierWTDB" ></el-input>
                </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
                <el-form-item label="银行账号" prop="supplierBankAccount">
                        <el-input v-model="formModel.supplierBankAccount" ></el-input>
                </el-form-item>
        </el-col>   
        <el-col :span="12">
                <el-form-item label="注册资金" prop="supplierRegisterCapital">
                    <el-input v-model="formModel.supplierRegisterCapital" ></el-input>
                </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
                <el-form-item label="固定资本" prop="supplierFixCaptial">
                    <el-input v-model="formModel.supplierFixCaptial" ></el-input>
                </el-form-item>
        </el-col>   
        <el-col :span="12">
            <el-form-item label="开户银行" prop="supplierDepositBank">
                <el-input v-model="formModel.supplierDepositBank" ></el-input>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
           <el-form-item label="网址" prop="supplierWebSit">
                <el-input v-model="formModel.supplierWebSit" ></el-input>
            </el-form-item>
        </el-col>   
        <el-col :span="12">
         <el-form-item label="地址" prop="supplierAddress">
                    <el-input v-model="formModel.supplierAddress" ></el-input>
                </el-form-item>
        </el-col>
     </el-row>
      <el-row>
               <el-form-item label="备注" prop="remark">
                   <el-input v-model="formModel.remark"  row="5" type="textarea" style="100%"></el-input>
             </el-form-item> 
    </el-row>
     </el-tab-pane>
        </el-tabs>
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
    requestCreateOrUpdateSupplier
}from 'api/supplier';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
export default {
    data(){
    return{
        formModel:{
                 supplierCode:'',
                 supplierName:'',
                 supplierAbbName:'',
                 orgId:'',
                 orgName:'',
                 supplierFRDB:'',
                 supplierWTDB:'',
                 supplierContact:'',
                 supplierPhone:'',
                 supplierFax:'',
                 supplierAddress:'',
                 supplierPostCode:'',
                 supplierWebSit:'',
                 supplierRegisterCapital:'',
                 supplierFixCaptial:'',
                 supplierDepositBank:'',
                 supplierBankAccount:'',
                 supplierOrgCode:'',
                 supplierState:'',
                 remark:'',
                 supplierTypeName:'',
                 isBlackList: false,
        },
         rules: {
                    supplierCode: [
                      { required: true, message: '编码不能为空！', trigger: 'blur' }
                    ],
                    supplierName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
                    ],
                    supplierAbbName: [
                      { required: true, message: '简称不能为空！', trigger: 'blur' }
                    ],
                    supplierOrgCode: [
                      { required: true, message: '统一社会信用代码不能为空！', trigger: 'blur' }
                    ],
                    supplierTypeName: [
                      { required: true, message: '供应商类别不能为空！', trigger: 'change' }
                    ],
                   
         },
        activeName:'first',
        loading:false,
        isClose:true,
        selectNode:{id:""},
        defaultProps: {
                children: 'children',
                label: 'text',
                id: 'id'
            },
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
                    params.supplier=this.formModel;
                    requestCreateOrUpdateSupplier(params).then(data=>{
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
     components:{
         dataDictionaryForSel,
        },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
