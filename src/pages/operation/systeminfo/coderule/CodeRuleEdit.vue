<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
<el-row>
         <el-form-item label="模块名称" prop="remark">
                <yl-treeselect v-model="formModel.remark" 
                    :treedata="treedata" 
                    :textOnly="true"
                    :defaultProps="defaultProps"  
                    :placeholder="'请选择模块名称'"
                    @getCurrentNode="_getMuduleNode">
                </yl-treeselect>
         </el-form-item>  
         <el-form-item label="配置表" prop="tableName">
             <el-input v-model="formModel.tableName" placeholder="请输入配置表名称" :readonly="true" ></el-input>
         </el-form-item>  
          <el-form-item label="类型" prop="rType" >
             <el-input v-model="formModel.rType" placeholder="请输入数字类型数据"></el-input>
         </el-form-item>         
         <el-form-item label="配置编码列" prop="codeColName">
             <el-input v-model="formModel.codeColName" ></el-input>
         </el-form-item>        
        <el-form-item label="配置日期列" prop="dateColName">
            <el-input v-model="formModel.dateColName" ></el-input>
         </el-form-item>
        <el-form-item label="排序" prop="sortCode" >
            <el-input-number v-model="formModel.sortCode" :min="1"  style="width:100%;"></el-input-number>
        </el-form-item>
</el-row>
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
    requestCreateOrUpdateCodeRule,
    requestCreateOrUpdateCodeRuleItem
}from 'api/coderule';
import util from  'common/js/util';
import { 
    requestGetMenuItemTreeList,
    } from 'api/menuitem';
export default {
    data(){
    return{
            treedata:[],
             defaultProps: {
                    children: 'children',
                    label: 'text',
                    id: 'id'
                },
        formModel:{
                 tableName:'',
                 dateColName:'',
                 codeColName:'',
                 rType:'',
                 remark:'',
                 sortCode: 1,
        },
         rules: {
                    tableName: [
                      { required: true, message: '配置表不能为空！', trigger: 'blur' }
                    ],
                     rType: [
                      { pattern: /^\d+$/, required: true, message: '请输入数字类型数据！', trigger: 'blur' }
                    ],
                    remark:[
                        {required: true ,message: '标题不能为空！', trigger:'change'}
                    ],
         },
          loading:false,
           isClose:true,
       
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    computed: {
    },
    methods:{
          _getGetMenuItemTreeList(){
                requestGetMenuItemTreeList().then(data => {
                        if(data.success){
                            this.treedata=util.returnDatabyTree(data.result,this.guidOfNull());
                        }
                        else {
                             this.$message.error('获取数据失败！'+data.error.message);
                        }
                    })
            },
        _getMuduleNode(node){
             this.formModel.tableName=node.commonDataOne;
        },
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.codeRule=this.formModel;
                    requestCreateOrUpdateCodeRule(params).then(data=>{
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
         _complete(){
                this.$emit('close');
            }
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
        this._getGetMenuItemTreeList();
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
