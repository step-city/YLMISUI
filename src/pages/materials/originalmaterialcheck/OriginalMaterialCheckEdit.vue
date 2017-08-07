
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
    <el-row>
        <el-col :span="12">
         <el-form-item label="材料编码" prop="infoCode">
             <el-input v-model="formModel.infoCode" ></el-input>
         </el-form-item>
        </el-col>
         <el-col :span="12">
         <el-form-item label="材料名称" prop="infoName">
             <el-input v-model="formModel.infoName" ></el-input>
         </el-form-item>
         </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
         <el-form-item label="规格型号" prop="infoModel">
             <el-input v-model="formModel.infoModel" ></el-input>
         </el-form-item>
        </el-col>
         <el-col :span="12">
         <el-form-item label="单位" prop="infoUnit">
             <el-input v-model="formModel.infoUnit" ></el-input>
         </el-form-item>
         </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
         <el-form-item label="数量" prop="quantity">
             <el-input v-model="formModel.quantity" ></el-input>
         </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="排序" prop="sortCode" >
          <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
  </el-form-item>
  </el-col>
    </el-row> 
    <el-form-item label="备注" prop="remark">
             <el-input v-model="formModel.remark"  type="textarea" row="5" ></el-input>
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
    requestCreateOrUpdateOriginalMaterialCheck
} from 'api/materials/originalmaterialcheck';
export default {
    data(){
    return{
        formModel:{
                 orgId:'',
                 orgName:'',
                 infoNM:'',
                 orderDate:'',
                 infoCode:'',
                 infoName:'',
                 infoModel:'',
                 infoUnit:'',
                 cId:'',
                 classNodebh:'',
                 quantity:'',
                 remark:'',
                 extendColumn1:'',
                 extendColumn2:'',
                 extendColumn3:'',
               sortCode: 1,
        },
         rules: {
                    orgName: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoNM: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    infoCode: [
                      { required: true, message: '材料编码不能为空！', trigger: 'blur' }
                    ],
                    infoName: [
                      { required: true, message: '材料名称不能为空！', trigger: 'blur' }
                    ],
                    infoModel: [
                      { required: true, message: '规格型号不能为空！', trigger: 'blur' }
                    ],
                    infoUnit: [
                      { required: true, message: '单位不能为空！', trigger: 'blur' }
                    ],
                    quantity: [
                      { required: true, message: '数量不能为空！', trigger: 'blur' }
                    ],
                    remark: [
                      { required: true, message: '备注不能为空！', trigger: 'blur' }
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
                    params.originalMaterialCheck=this.formModel;
                    requestCreateOrUpdateOriginalMaterialCheck(params).then(data=>{
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
