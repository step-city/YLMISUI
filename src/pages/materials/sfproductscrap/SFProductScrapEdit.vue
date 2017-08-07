
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
    <el-row>
        <el-col :span="12">
            <el-form-item label="记账单位" prop="orgId">
                <yl-organizeTree  
                      v-model="formModel.orgId"  
                      :placeholder="'请选择单位'"   
                      :isexpand="true"
                      @getCurrentNode="_getCurrentNodeOrg"  
                      >
                      </yl-organizeTree>
             </el-form-item>
        </el-col>
        <el-col :span="12">
             <el-form-item label="数量" prop="quantity">
                <el-input v-model="formModel.quantity" ></el-input>
             </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <el-form-item label="单位" prop="extendColumn1">
                 <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.extendColumn1"  :placeholder="'请选择'">
                  </yl-dataDictionaryForSel>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="排序" prop="sortCode" >
                <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-form-item label="备注" prop="remark">
                <el-input v-model="formModel.remark"  type="textarea"></el-input>
            </el-form-item>
        </el-col>
    </el-row>
   <el-form-item style="text-align:right;" >
      <el-button @click="_resetForm">重置</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
  </el-form-item>
  
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateSFProductScrap
}from 'api/materials/sfproductscrap';
import organizeTree from 'ocomponents/organize/organizeTree';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'

export default {
    data(){
    return{
        formModel:{
                 orgId:this.getUserInfo().user.manageOrgId,
                 orgName:this.getUserInfo().user.manageOrgName,
                 quantity:'',
                 remark:'',
                 extendColumn1:'',
                 extendColumn2:'',
                 extendColumn3:'',
                 sortCode: 1,
        },
         rules: {
                    orgId: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    quantity: [
                       { validator: this.checkdecimal, trigger: 'blur' }
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
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.sFProductScrap=this.formModel;
                    requestCreateOrUpdateSFProductScrap(params).then(data=>{
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
            },
         _getCurrentNodeOrg(data){
             //组织机构选择事件
            this.formModel.OrgName=data.text;
          },
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
    }, 
    components:{
       'yl-organizeTree':organizeTree,
       'yl-dataDictionaryForSel':dataDictionaryForSel,
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
