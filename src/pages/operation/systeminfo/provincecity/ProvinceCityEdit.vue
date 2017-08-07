<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="父节点" prop="parentId">
             <yl-provinceCitySelTree  v-model="formModel.parentId" :placeholder="'请选择父节点'" :isexpand="false">
             </yl-provinceCitySelTree>
         </el-form-item>  
         <el-form-item label="区域类别" prop="category">
               <dataDictionaryForSel :code="'zone'" v-model="formModel.category"   @getCurrentvalue="_getCurrentvalue" :placeholder="'请选择属性'"  >
               </dataDictionaryForSel>
         </el-form-item>
         <el-form-item label="名称" prop="fullName">
           <el-input v-model="formModel.fullName" ></el-input>
         </el-form-item>   
        <el-form-item label="排序" prop="sortCode"  >
        <el-input-number v-model="formModel.sortCode" :min="1"  style="width:100%"></el-input-number>
        </el-form-item>
          <el-form-item label="备注" prop="remark">
                    <el-input v-model="formModel.remark" type="textarea" row="5" style="width:100%"></el-input>
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
    requestCreateOrUpdateProvinceCity,
    requestGetProvinceCityTreeList
}from 'api/provincecity';
import util from 'common/js/util';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
import provinceCitySelTree from 'ocomponents/provincecity/provinceCitySelTree'

export default {
    data(){
    return{
        formModel:{
                 parentId:'',
                 category:'',
                 nodeCode:'',
                 fullName:'',
                 acronym:'',
                 remark:'',
               sortCode: 1,
        },
         rules: {
                    parentId: [
                      { required: true, message: '父节点不能为空！', trigger: 'change' }
                    ],
                    category: [
                      { required: true, message: '区域类别不能为空！', trigger: 'change' }
                    ],
                    fullName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
                    ],                  
         },
            treedata: [],
         defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
          },
          selectNode:{id:'00000000-0000-0000-0000-000000000000'},
          loading:false,
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    methods:{
        //ProvinceCityTreeList加载
           _getProvinceCityTreeList(){
                requestGetProvinceCityTreeList().then(data => {
                        if(data.success){
                            this.treedata=data.result;
                        }
                        else {
                            this.$message.error('获取数据失败！'+data.error.message);
                        }
                    });
            },
               
         _onSubmit() {
             console.log(this.formModel);
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.loading=true;
                    let params={};
                    params.provinceCity=this.formModel;
                    requestCreateOrUpdateProvinceCity(params).then(data=>{
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
                    this.$message.warning('请按照条件填充表单！');
                    return false;
                }
                
            });
            },
         _getCurrentvalue(node){
              this.formModel.category=node;
              // console.log(formModel.category);
            },
         _resetForm() {
                this.$refs.formModel.resetFields();
         },
         _complete(){
                this.$emit('close');
            }
    },
     mounted(){
       this._getProvinceCityTreeList();
       Object.assign(this.formModel,this.selectRow); 
    },
     components:{
       dataDictionaryForSel,
       'yl-provinceCitySelTree':provinceCitySelTree,
    },
     watch:{
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
