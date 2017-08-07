
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="父节点" prop="parentId">
                <yl-materialClassTree v-model="formModel.parentId"  
                            :placeholder="'请选择'" 
                            :readonly="true"
                            :defaultText="formModel.parentName" 
                            :isexpand="false"  
                            @getCurrentNode="_getCurrentNode"
                            style="width:100%">
                            </yl-materialClassTree>
         </el-form-item>
         <el-form-item label="类别编码" prop="classCode">
             <el-input v-model="formModel.classCode" ></el-input>
         </el-form-item>
         <el-form-item label="类别名称" prop="name">
             <el-input v-model="formModel.name" ></el-input>
         </el-form-item>
        
         <el-row>
             <el-col :span="12">
                    <el-form-item label="排序" prop="sortCode" >
                        <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
                    </el-form-item>
             </el-col>
             <el-col :span="12">
                    <el-form-item label="单位" prop="infoUnit" >
                        <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.infoUnit"  :placeholder="'请选择'" >
                        </yl-dataDictionaryForSel>       
                    </el-form-item>
             </el-col>
         </el-row>
         <el-row>
            <el-col :span="8">
                <el-form-item label="是否核算" prop="isCheck">
                    <el-switch  v-model="formModel.isCheck"
                                on-text="是"
                                off-text="否">
                    </el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                 <el-form-item label="是否计划" prop="isPlan">
                    <el-switch  v-model="formModel.isPlan"
                                on-text="是"
                                off-text="否">
                    </el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                 <el-form-item label="子节点" prop="isLeaf">
                    <el-switch  v-model="formModel.isLeaf"
                                on-text="是"
                                off-text="否">
                    </el-switch>
                </el-form-item>
            </el-col>
         </el-row>
          <el-form-item label="备注" prop="remark">
             <el-input type="textarea" v-model="formModel.remark" ></el-input>
         </el-form-item>
        
  
   <el-form-item >
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
    requestCreateOrUpdateMaterialClass,
    requestGetMaterialClassTreeList
}from 'api/materialclass';
import materialClassTree from 'ocomponents/materialclass/materialClassTree'
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'

export default {
    data(){
        let ghNameJudgeRepeat = (rule, value, callback) => {
         let str=`MB_MaterialClass|Name||${this.formModel.parentId}|${this.formModel.oghName}`;
         this.IsJudgeRepeat(str,value, callback);
      };
    return{
        formModel:{
                 parentId:'',
                 parentName:'',
                 classNodeBh:'',
                 classCode:'',
                 name:'',
                 isCheck:'',
                 isPlan:'',
                 isStatic:'',
                 remark:'',
               sortCode: 1,
               isLeaf:false,
               infoUnit:'',
               oghName:''
        },
         rules: {
                    parentId: [
                      { required: true, message: '父节点不能为空！', trigger: 'change' }
                    ],
                    classCode: [
                      { required: true, message: '类别编码不能为空！', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '名称不能为空！', trigger: 'blur' },
                        { validator:ghNameJudgeRepeat, trigger: 'blur' }
                    ],
                    infoUnit: [
                      { required: true, message: '单位不能为空！', trigger: 'change' }
                    ],
         },
        loading:false,
        treedata:[],
        defaultProps: {
            children: 'children',
            label: 'text',
            id: 'id'
        },
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
             this.formModel.parentId=selectNode.id;
             this.formModel.parentName=selectNode.text;
        },
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.materialClass=this.formModel;
                    requestCreateOrUpdateMaterialClass(params).then(data=>{
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
         _complete(bool){
                this.$emit('close',bool);
            }
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
       this.formModel.oghName=this.formModel.name;
    },
     watch:{
    },
    components:{
       'yl-materialClassTree':materialClassTree,
       'yl-dataDictionaryForSel':dataDictionaryForSel,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
