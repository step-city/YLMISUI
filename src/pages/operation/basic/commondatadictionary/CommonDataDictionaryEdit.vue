
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-row>
            <el-col :span="12">
                <el-form-item label="组织机构" prop="orgId">
                     <yl-organizeTree  v-model="formModel.orgId"  :placeholder="'请选择'"  :isexpand="true">
                     </yl-organizeTree>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                 <el-form-item label="上级节点" prop="parentName">
                    <el-input v-model="formModel.parentName" :disabled="true" ></el-input>
                </el-form-item>
            </el-col>
         </el-row>
         <el-row>
            <el-col :span="12">
                <el-form-item label="编码" prop="code">
                    <el-input v-model="formModel.code" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="全称" prop="fullName">
                    <el-input v-model="formModel.fullName" ></el-input>
                </el-form-item>
            </el-col>
         </el-row>
         <el-row>
            <el-col :span="10">
                <el-form-item label="排序" prop="sortCode" >
                    <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                 <el-form-item label="是否树" prop="isTree">
                    <el-switch
                        v-model="formModel.isTree"
                        on-text="是"
                        off-text="否">
                    </el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="是否子节点" prop="isLeaf">
                    <el-switch
                        v-model="formModel.isLeaf"
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
    requestCreateOrUpdateCommonDataDictionary
}from 'api/commondatadictionary';
import organizeTree from 'ocomponents/organize/organizeTree'
export default {
    data(){
        let ghNameJudgeRepeat = (rule, value, callback) => {
         let str=`Base_CommonDataDictionary|FullName|${this.getUserInfo().user.manageOrgId}|${this.formModel.parentId}|${this.formModel.oghName}`;
         this.IsJudgeRepeat(str,value, callback);
      };
    return{
        formModel:{
                 orgId:this.getUserInfo().user.manageOrgId,
                 parentId:'',
                 parentName:'',
                 isTree:'',
                 isLeaf:'',
                 code:'',
                 fullName:'',
                 remark:'',
                sortCode: 1,
                oghName:'',
        },
         rules: {
                    orgId: [
                      { required: true, message: '不能为空！', trigger: 'change' }
                    ],
                    parentId: [
                      { required: true, message: '不能为空！', trigger: 'change' }
                    ],
                    // isTree: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    // isLeaf: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    code: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    fullName: [
                       { required: true, message: '名称不能为空！', trigger: 'blur' },
                      { validator:ghNameJudgeRepeat, trigger: 'blur' }
                    ],
                    // remark: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
         },
        loading:false,
        isClose:true,
       }       
    },
    props:{
        selectRow:{},
        isVisible:false,
        parentNode:{}
    },
    methods:{
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.commonDataDictionary=this.formModel;
                    requestCreateOrUpdateCommonDataDictionary(params).then(data=>{
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
       this.formModel.parentId=this.parentNode.id; 
       this.formModel.parentName=this.parentNode.text;
       this.formModel.oghName=this.formModel.FullName;
    },
    components:{
        'yl-organizeTree':organizeTree,
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
