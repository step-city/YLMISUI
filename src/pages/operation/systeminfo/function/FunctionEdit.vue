
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
        <el-form-item label="父节点" prop="parentId">
            <yl-treeselect ref="treeselect" v-model="formModel.parentId"  :readonly="true" :treedata="treedata" :defaultProps="defaultProps"  @getCurrentNode="_getCurrentNode">
            </yl-treeselect>
        </el-form-item>
         <el-form-item label="系统编码" prop="appCode">
             <el-input v-model="formModel.appCode" ></el-input>
         </el-form-item>
         <el-form-item label="功能编码" prop="funcCode">
             <el-input v-model="formModel.funcCode" ></el-input>
         </el-form-item>
         <el-form-item label="功能名称" prop="funcName">
             <el-input v-model="formModel.funcName" ></el-input>
         </el-form-item>
         <el-form-item label="方法名称" prop="methodName">
             <el-input v-model="formModel.methodName" ></el-input>
         </el-form-item>
         <el-form-item label="描述" prop="description">
             <el-input v-model="formModel.description" ></el-input>
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
    requestGetFunctionTreeList,
    requestCreateOrUpdateFunction
}from 'api/function';
import util from 'common/js/util';
export default {
    data(){
    return{
        formModel:{
                 parentId:'',
                 appCode:'',
                 funcCode:'',
                 funcName:'',
                 methodName:'',
                 description:''
        },
         rules: {
                    parentId: [
                      { required: true, message: '父节点编号不能为空！', trigger: 'change' }
                    ],
                    appCode: [
                      { required: true, message: '系统编码不能为空！', trigger: 'blur' }
                    ],
                    funcCode: [
                      { required: true, message: '功能编码不能为空！', trigger: 'blur' }
                    ],
                    funcName: [
                      { required: true, message: '功能名称不能为空！', trigger: 'blur' }
                    ],
                    methodName: [
                      { required: true, message: '方法名称不能为空！', trigger: 'blur' }
                    ],
         },
         treedata: [],
         defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
          },
          selectNode:{text:'',id:''},
          loading:false
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    methods:{
         //一次加载树
          _getFunctionTreeList(){
                requestGetFunctionTreeList().then(data => {
                        if(data.success){
                            this.treedata=util.returnDatabyTree(data.result,'00000000-0000-0000-0000-000000000000');
                        }
                        else {
                           this.$message.error('失败！'+data.error.message);
                        }
                    })
            },
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.loading=true;
                    let params={};
                    params.functionInfo=this.formModel;
                    requestCreateOrUpdateFunction(params).then(data=>{
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
                    this.loading=false;
                    })
                } else {
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
         _getCurrentNode(selectNode){
                this.formModel.appCode=selectNode.code;
            }
    },
     mounted(){
       this._getFunctionTreeList();
       Object.assign(this.formModel,this.selectRow); 
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
