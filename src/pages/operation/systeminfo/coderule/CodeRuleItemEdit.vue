<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
  <el-row>
     <el-col :span="12">
         <el-form-item label="类型" prop="itemType">
               <dataDictionaryForSel :code="'itemTypeStatus'" v-model="formModel.itemType"  :placeholder="'请选择类型'" ></dataDictionaryForSel>
         </el-form-item>
     </el-col>
     <el-col :span="12">
         <el-form-item label="编码规则" prop="itemCode">
             <el-input v-model="formModel.itemCode" ></el-input>
         </el-form-item>
      </el-col>
  </el-row>
  <el-row>
     <el-col :span="12">
         <el-form-item label="扩展1" prop="expendCol1">
             <el-input v-model="formModel.expendCol1" ></el-input>
         </el-form-item>
        </el-col>
     <el-col :span="12">
         <el-form-item label="扩展2" prop="expendCol2">
             <el-input v-model="formModel.expendCol2" ></el-input>
         </el-form-item>
         </el-col>
  </el-row>
  <el-row>
     <el-col :span="12">
         <el-form-item label="扩展3" prop="expendCol3">
             <el-input v-model="formModel.expendCol3" ></el-input>
         </el-form-item>
      </el-col>
     <el-col :span="12">
         <el-form-item label="排序" prop="sortCode" >
            <el-input-number v-model="formModel.sortCode" :min="-5" ></el-input-number>
          </el-form-item>
         
      </el-col>
    </el-row>           
        <el-form-item label="备注" prop="remark">
             <el-input v-model="formModel.remark" ></el-input>
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
    requestCreateOrUpdateCodeRuleItem
}from 'api/coderule';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
export default {
    data(){
    return{
        formModel:{
                 itemId:'',
                 rId:'',
                 itemType:'',
                 itemCode:'',
                 expendCol1:'',
                 expendCol2:'',
                 expendCol3:'',
                 remark:'',
               sortCode: 1,
        },
         rules: {
                    itemType: [
                      { required: true, message: '类型不能为空！', trigger: 'blur' }
                    ],
         },
           loading:false,
          defaultProps: {
                    children: 'children',
                    label: 'itemCode',
                    id: 'id'
                },
       }       
    },
    props:{
        selectRow:{},
        rid:'',
        isVisible:false
    },
    computed: {
    },
    methods:{
         _onSubmit() {
                 this.formModel.rId=this.rid;
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.codeRuleItem=this.formModel;
                    requestCreateOrUpdateCodeRuleItem(params).then(data=>{
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
    components:{
         dataDictionaryForSel,
        },
     mounted(){
      Object.assign(this.formModel,this.selectRow);
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
