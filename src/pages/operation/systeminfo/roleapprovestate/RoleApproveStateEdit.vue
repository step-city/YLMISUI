
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
        <el-form-item label="审批标题" prop="stateDesc">
             <el-input v-model="formModel.stateDesc" ></el-input>
         </el-form-item>
         <el-form-item label="角色名称" prop="roleId">
              <yl-roleTree  v-model="formModel.roleId"  
              :placeholder="'请选择角色'" 
              :isexpand="true"  
              @getCurrentNode="_getCurrentNode">
              </yl-roleTree>
         </el-form-item>
          <el-form-item label="模块名称" prop="muduleName">
                <yl-treeselect v-model="formModel.muduleName" 
                    :treedata="treedata" 
                    :textOnly="true"
                    :defaultProps="defaultProps"  
                    @getCurrentNode="_getMuduleNode">
                </yl-treeselect>
         </el-form-item>
         <el-row>
                <el-col :span="12">
                          <el-form-item label="表名" prop="tableName">
                                <el-input v-model="formModel.tableName" :readonly="true"></el-input>
                            </el-form-item>
                 </el-col>
                <el-col :span="12">
                          <el-form-item label="审批状态值" prop="stateValue">
                             <el-input v-model="formModel.stateValue" ></el-input>
                          </el-form-item>
                 </el-col>
        </el-row>
         <el-row>
                 <el-col :span="12">
                          <el-form-item label="状态文本值" prop="stateText">
                           <yl-dataDictionaryForSel 
                            :code="'SPZT'" 
                            v-model="formModel.stateText" 
                            @getCurrentvalue="_getDicNode" 
                            :placeholder="'请选择'">
                            </yl-dataDictionaryForSel>
                         </el-form-item>
                 </el-col>
                 <el-col :span="12">
                           <el-form-item label="是否为初始值" prop="isState">
                                     <el-input :value="formModel.isState?'是':'否'" :readonly="true"></el-input>
                            </el-form-item>
                 </el-col>
        </el-row>
         <el-form-item label="说明" prop="remark">
             <el-input v-model="formModel.remark" type="textarea" row="3"></el-input>
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
    requestCreateOrUpdateRoleApproveState
}from 'api/roleapprovestate';
import util from  'common/js/util';
import roleTree from 'ocomponents/role/roleTree';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel';
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
            isClose:true,
            formModel:{
                        roleId:'',
                        roleName:'',
                        tableName:'',
                        muduleName:'',
                        stateValue:'',
                        boolValue:'',
                        stateText:'',
                        isState:'',
                        stateDesc:'',
                        remark:'',
                        sortCode: 1,
        },
        rules: {
                    roleId: [
                      { required: true, message: ' 角色名称不能为空！', trigger: 'change' }
                    ],
                    muduleName: [
                      { required: true, message: '模块名称不能为空！', trigger: 'change' }
                    ],
                    // stateValue: [
                    // //   { required: true, message: '审批状态值不能为空！', trigger: 'blur' },
                    //   { validator: this.checkInt, trigger: 'blur' }
                    // ],
                    stateText: [
                      { required: true, message: '状态文本值不能为空！', trigger: 'blur' }
                    ],
                    stateDesc: [
                      { required: true, message: '审批标题不能为空！', trigger: 'blur' }
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
         //一次加载树
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
        _getCurrentNode(node){
              this.formModel.roleName=node.text;
        },
        _getMuduleNode(node){
             this.formModel.tableName=node.commonDataOne;
        },
        _getDicNode(val){
            if(val==="通过"){this.formModel.boolValue=true}else{this.formModel.boolValue=false;}
            if(val==="初始"){this.formModel.isState=true}else{this.formModel.isState=false;}
        },
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.roleApproveState=this.formModel;
                    requestCreateOrUpdateRoleApproveState(params).then(data=>{
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
     components:{
         'yl-roleTree':roleTree,
         'yl-dataDictionaryForSel':dataDictionaryForSel,
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
