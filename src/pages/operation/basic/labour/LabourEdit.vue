
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
       <el-form-item label="联系人" prop="labourContact">
             <el-input v-model="formModel.labourContact" ></el-input>
         </el-form-item>
       </el-col>  
   </el-row>
   <el-row>
     <el-col :span="12">
     <el-form-item label="社会信用代码" prop="labourOrgCode">
             <el-input v-model="formModel.labourOrgCode" ></el-input>
         </el-form-item>
          </el-col>
      <el-col :span="12">
       <el-form-item label="队伍类别" prop="labourTypeName">
               <dataDictionaryForSel :code="'Team'" v-model="formModel.labourTypeName"   :placeholder="'请选择属性'" >
                </dataDictionaryForSel>
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
            <el-form-item label="备注" prop="remark">
                <el-input v-model="formModel.remark" row="5" type="textarea" style="100%"></el-input>
            </el-form-item>
   </el-row>
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
    requestCreateOrUpdateLabour
}from 'api/labour';
import util from 'common/js/util';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
export default {
    data(){
    return{
        formModel:{
                 labourName:'',
                 orgId:'',
                 orgName:'',
                 labourContact:'',
                 labourPhone:'',
                 labourFax:'',
                 labourTypeName:'',
                 labourOrgCode:'',
                 remark:''
        },
         rules: {
                    labourName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
                    ],
                    orgId: [
                      { required: true, message: '添加机构id不能为空！', trigger: 'blur' }
                    ],
                     labourContact: [
                      { required: true, message: '联系人不能为空！', trigger: 'blur' }
                    ],
                     labourTypeName: [
                      { required: true, message: '队伍类型不能为空！', trigger: 'blur' }
                    ],
                    orgName: [
                      { required: true, message: '添加机构名称不能为空！', trigger: 'blur' }
                    ],
                    labourOrgCode: [
                      { required: true, message: '统一社会信用代码不能为空！', trigger: 'blur' }
                    ]     
         },
          defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
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
                    params.labour=this.formModel;
                    requestCreateOrUpdateLabour(params).then(data=>{
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
