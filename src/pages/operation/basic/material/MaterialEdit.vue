
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-tabs v-model="activeName" >
            <el-tab-pane label="基本信息" name="first">
                <el-form-item label="类别" prop="cId"> 
                        <yl-materialClassTree v-model="formModel.cId"  
                            :placeholder="'请选择'" 
                            :defaultText="formModel.className" 
                            :isexpand="false"  
                            :readonly="true"
                            @getCurrentNode="_getCurrentNode"
                            style="width:100%">
                            </yl-materialClassTree>
                </el-form-item>
                <!--<el-form-item label="材料编码" prop="infoCode">
                    <el-input v-model="formModel.infoCode" ></el-input>
                </el-form-item>-->
                <el-form-item label="材料名称" prop="infoName">
                    <el-input v-model="formModel.infoName" ></el-input>
                </el-form-item>
                <el-form-item label="规格型号" prop="infoModel">
                    <el-input v-model="formModel.infoModel" ></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="infoUnit">
                    <el-input v-model="formModel.infoUnit"  :readonly="true"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="其他信息" name="second">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="转换率1" prop="infoSecUnitPreci">
                            <el-input v-model="formModel.infoSecUnitPreci" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="辅单位1" prop="infoSecUnit">
                             <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.infoSecUnit"  :placeholder="'请选择'"  >
                            </yl-dataDictionaryForSel>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="转换率2" prop="infoThrUnitPreci">
                            <el-input v-model="formModel.infoThrUnitPreci" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="辅单位2" prop="infoThrUnit">
                            <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.infoThrUnit"  :placeholder="'请选择'"  >
                            </yl-dataDictionaryForSel>
                        </el-form-item>
                    </el-col>
                </el-row>
               
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="formModel.remark" ></el-input>
                </el-form-item>
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
    requestCreateOrUpdateMaterial
}from 'api/material';
import {
    requestGetMaterialClassTreeList
}from 'api/materialclass';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
import materialClassTree from 'ocomponents/materialclass/materialClassTree'

export default {
    data(){
    return{
        formModel:{
                 infoCode:'',
                 infoName:'',
                 infoModel:'',
                 infoUnit:'',
                 infoSecUnitPreci:0,
                 infoSecUnit:'',
                 infoThrUnitPreci:0,
                 infoThrUnit:'',
                 cId:'',
                 classNodeBh:'',
                 orgId:'',
                 orgName:'',
                 isAudit:'',
                 auditName:'',
                 auditTime:'',
                 remark:'',
                 expandColumn1:'',
                 expandColumn2:'',
                 expandColumn3:'',
                 sortCode: 1,
                 className:'',
        },
         rules: {
                    // infoCode: [
                    //   { required: true, message: '材料编码不能为空！', trigger: 'blur' }
                    // ],
                    infoName: [
                       { required: true, message: '名称不能为空！', trigger: 'blur' },
                    ],
                    infoModel: [
                      { required: true, message: '规格型号不能为空！', trigger: 'blur' }
                    ],
                    // infoUnit: [
                    //   { required: true, message: '单位不能为空！', trigger: 'blur' }
                    // ],
                    cId: [
                      { required: true, message: '类别不能为空！', trigger: 'change' }
                    ],
                    infoSecUnitPreci: [
                       { required: false, validator: this.checkdecimal, trigger: 'blur' }
                    ],
                    infoThrUnitPreci: [
                      {required: false, validator: this.checkdecimal, trigger: 'blur' }
                    ],
         },
        loading:false,
        activeName:'first',
        treedata:[],
        selectNode:{text:'',id:''},
        isClose:true,
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    methods:{
       
         _getCurrentNode(selectNode){
             if(selectNode.isLeaf==true){
                    this.formModel.cId=selectNode.id;
                    this.formModel.classNodeBh=selectNode.funcCode;
                    this.formModel.className=selectNode.text;
                    this.formModel.infoUnit=selectNode.commonDataOne;
             }
             else{
                 this.formModel.cId='';
                 this.$message.warning('请选择子节点~');
             }
        },
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.material=this.formModel;
                    requestCreateOrUpdateMaterial(params).then(data=>{
                    if(data.success){
                            this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                                });
                            //关闭面板
                            console.log(this.isClose);
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
         _complete(bool){
                this.$emit('close',bool);
            }
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
    },
     watch:{
    },
    components:{
        'yl-dataDictionaryForSel':dataDictionaryForSel,
         'yl-materialClassTree':materialClassTree,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
