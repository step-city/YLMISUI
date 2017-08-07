
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
        <el-row>
            <el-col :span="12">
                <el-form-item label="父节点" prop="parentId">
                    <yl-standardGHTree v-model="formModel.parentId"  :readonly="true" :placeholder="'请选择'"  @getCurrentNode="_getCurrentNode" :defaultText="formModel.parentName" :isexpand="false"  style="width:100%"></yl-standardGHTree>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="编号" prop="sCode">
                    <el-input v-model="formModel.sCode" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="名称" prop="sName">
                    <el-input v-model="formModel.sName" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="全称" prop="sFullName">
                     <span>  {{formModel.sFullName}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="计量单位" prop="mUnit">
                     <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.mUnit"  :placeholder="'请选择'" >
                        </yl-dataDictionaryForSel>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="工程量" prop="unitConsume">
                    <el-input v-model="formModel.unitConsume" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
       
         <el-form-item label="描述" prop="description">
             <el-input v-model="formModel.description" ></el-input>
         </el-form-item>
         <el-row>
            <el-col :span="12">
                <el-form-item label="排序" prop="sortCode" >
                    <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
                </el-form-item>
            </el-col>
             <el-col :span="12">
                 <el-form-item label="是否子节点" prop="isLeaf">
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
    requestCreateOrUpdateStandardGH,
    requestGetStandardGHTreeList
}from 'api/standardgh';
import util from 'common/js/util';
import standardGHTree from 'ocomponents/standardgh/standardGHTree';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'

export default {
    data(){
        let ghNameJudgeRepeat = (rule, value, callback) => {
         let str=`MB_StandardGH|SName||${this.formModel.parentId}|${this.formModel.oghName}`;
         this.IsJudgeRepeat(str,value, callback);
      };
    return{
        formModel:{
                 parentId:'',
                 parentName:'',
                 sCode:'',
                 sName:'',
                 sFullName:'',
                 mUnit:'',
                 unitConsume:0,
                 isLeaf:false,
                 description:'',
                 remark:'',
                 sortCode: 1,
                 parentName:'',
                 oghName:''
        },
         rules: {
                    parentId: [
                      { required: true, message: '父节点不能为空！', trigger: 'change' }
                    ],
                    sCode: [
                      { required: true, message: '编号不能为空！', trigger: 'blur' }
                    ],
                    sName: [
                        { required: true, message: '名称不能为空！', trigger: 'blur' },
                        { validator:ghNameJudgeRepeat, trigger: 'blur' }
                    ],
                    // sFullName: [
                    //   { required: true, message: '全称不能为空！', trigger: 'blur' }
                    // ], 
                     unitConsume: [
                      { validator: this.checkdecimal, trigger: 'blur' }
                    ],
                    // mUnit: [
                    // { required: true, message: '计量单位不能为空！', trigger: 'blur' }
                    // ],
                    // unitConsume: [
                    // { required: true, message: '单位消耗量不能为空！', trigger: 'blur' }
                    // ],
                    // isLeaf: [
                    // { required: true, message: '是否子节点不能为空！', trigger: 'blur' }
                    // ]
         },
        loading:false,
        selectNode:{text:'',id:''},
        isClose:true,
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
                    params.standardGH=this.formModel;
                    requestCreateOrUpdateStandardGH(params).then(data=>{
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
                
            }).catch(()=>{});
            },
         _resetForm() {
                this.$refs.formModel.resetFields();
         },
         _complete(bool){
                this.$emit('close',bool);
            },
        _getCurrentNode(selectNode){
            this.formModel.parentName=selectNode.text;
        }
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
       this.formModel.oghName=this.formModel.sName;
    },
    components:{
        'yl-standardGHTree':standardGHTree,
        'yl-dataDictionaryForSel':dataDictionaryForSel,
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
