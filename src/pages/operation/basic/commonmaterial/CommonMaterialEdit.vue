
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-row>
            <el-col :span="12">
                 <el-form-item label="材料名称" prop="infoName">
                    <el-input v-model="formModel.infoName"   :readonly="true" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                 <el-form-item label="规格型号"  prop="infoModel">
                    <el-input v-model="formModel.infoModel"  :readonly="true"  ></el-input>
                </el-form-item>
            </el-col>
         </el-row>
          <el-row>
            <el-col :span="12">
                 <el-form-item label="单位"  prop="infoUnit">
                    <el-input v-model="formModel.infoUnit"   :readonly="true" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                 <el-form-item label="采购价" prop="purchasePrice">
                        <el-input v-model="formModel.purchasePrice" ></el-input>
                    </el-form-item>
            </el-col>
         </el-row>
         
         <el-row>
            <el-col :span="12">
                <el-form-item label="投标价" prop="bidPrice">
                    <el-input v-model="formModel.bidPrice" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                 <el-form-item label="责任成本价" prop="responsiPrice">
                    <el-input v-model="formModel.responsiPrice" ></el-input>
                </el-form-item>
            </el-col>
         </el-row>

         <el-row>
            <el-col :span="12">
                <el-form-item label="辅助单位1" prop="infoSecUnit">
                    <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.infoSecUnit"  :placeholder="'请选择'"  >
                            </yl-dataDictionaryForSel>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="转换率1" prop="infoSecUnitPreci">
                        <el-input v-model="formModel.infoSecUnitPreci" ></el-input>
                </el-form-item>
            </el-col>
         </el-row>
         <el-row>
            <el-col :span="12">
                 <el-form-item label="辅助单位2" prop="infoThrUnit">
                       <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.infoThrUnit"  :placeholder="'请选择'"  >
                        </yl-dataDictionaryForSel>
                </el-form-item>
            </el-col>
            <el-col :span="12"> 
                <el-form-item label="转换率2" prop="infoThrUnitPreci">
                    <el-input v-model="formModel.infoThrUnitPreci" ></el-input>
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
    requestCreateOrUpdateCommonMaterial
}from 'api/commonmaterial';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'

export default {
    data(){
    return{
        formModel:{
                 infoCode:'',
                 infoName:'',
                 infoModel:'',
                 infoUnit:'',
                 infoSecUnitPreci:'',
                 infoSecUnit:'',
                 infoThrUnitPreci:'',
                 infoThrUnit:'',
                 cId:'',
                 classNodeBh:'',
                 orgId:'',
                 bidPrice:'',
                 responsiPrice:'',
                 purchasePrice:'',
                 remark:'',
                 expandColumn1:'',
                 expandColumn2:'',
                 expandColumn3:'',
                 sortCode: 1,
        },
         rules: {
                    infoThrUnitPreci: [
                      { validator: this.checkdecimal, trigger: 'blur' }
                    ],
                     infoSecUnitPreci: [
                      { validator: this.checkdecimal, trigger: 'blur' }
                    ],
                     responsiPrice: [
                      { validator: this.checkdecimal, trigger: 'blur' }
                    ],
                     purchasePrice: [
                      { validator: this.checkdecimal, trigger: 'blur' }
                    ],
                    bidPrice: [
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
                    params.commonMaterial=this.formModel;
                    requestCreateOrUpdateCommonMaterial(params).then(data=>{
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
    },
    components:{
         'yl-dataDictionaryForSel':dataDictionaryForSel,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
