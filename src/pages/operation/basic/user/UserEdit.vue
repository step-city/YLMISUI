<template>
<div>
  <el-form  :model="formModel"  :rules="rules" ref="formModel" label-width="100px" >
   <el-tabs v-model="activeName" @tab-click="_handleNodeClick">
    <el-tab-pane label="用户管理" name="first" style="height:300px;">
       <el-row>
            <el-form-item label="所在单位" prop="orgId">
            <yl-organizeTree  v-model="formModel.orgId" :placeholder="'请选择所在单位'"  :isexpand="true"> </yl-organizeTree>
                </yl-treeselect>
            </el-form-item> 
        </el-row>
        <el-row>
          <el-col :span="12">    
            <el-form-item label="姓名" prop="realName">
                <el-input v-model="formModel.realName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName"><el-input v-model="formModel.userName" ></el-input></el-form-item>
           </el-col>
        </el-row>
    
         <el-row>   
                <el-form-item label="电话号码" prop="telephoneNo"> 
                        <el-input v-model="formModel.telephoneNo" ></el-input>
                </el-form-item>
        </el-row> 
         <el-row> 
                <el-form-item label="电子邮件" prop="emailAddress"> 
                  <el-input v-model="formModel.emailAddress" ></el-input>
                </el-form-item>
        </el-row>
        <el-row>
      <el-col :span="12">
        <el-form-item label="性别" prop="gender"> 
            <el-radio-group v-model="formModel.gender"  size="small">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-form-item>
                <el-form-item label="状态" prop="isActive">
                    <el-switch  v-model="formModel.isActive"
                                    on-text="启用"
                                    off-text="禁用"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                        </el-switch>
                 </el-form-item>
        </el-col>
        </el-row> 
    </el-tab-pane>
   <el-tab-pane label="用户角色权限" name="second" >
        <el-tree style="height:300px;"
        :data="roleTreeData"
        :check-strictly="true"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="roleTree"
        highlight-current
        :props="defaultProps">
        </el-tree>
   </el-tab-pane>
    <el-tab-pane label="用户数据权限" name="three">
       <el-tree style="height:300px;"
        :data="organizeTreeData"
        show-checkbox
        :check-strictly="true"
        default-expand-all
        node-key="id"
        ref="dataRangeTree"
        highlight-current
        :props="defaultProps">
        </el-tree>
    </el-tab-pane>  
    </el-tabs>  
    <el-form-item>
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
    requestCreateOrUpdateUser,
    requestGetOrganizeTreeList,
    requestGetRoleTreeList,
    requestGetUserForEdit
}from 'api/user';
import util from 'common/js/util';
import organizeTree from 'ocomponents/organize/organizeTree'
export default {
  data(){
      let userNameJudgeRepeat = (rule, value, callback) => {
         let str=`Authority_User|userName|${this.getUserInfo().user.manageOrgId}||${this.formModel.ouserName}`;
         this.IsJudgeRepeat(str,value, callback);
      };
    return{
        formModel:{
                 id:'',
                 orgId:'',
                 orgFullPathName:'',
                 realName:'',
                 spell:'',
                 userName:'',
                 ouserName:'',
                 password:'',
                 gender:'男',
                 telephoneNo:'',
                 emailAddress:'',
                 isEmailConfirmed:'',
                 emailConfirmationCode:'',
                 passwordResetCode:'',
                 lastLoginTime:'',
                 isActive: true,
                 sortCode: 1,
        },
         rules: {
                    realName: [
                      { required: true, message: '姓名不能为空！', trigger: 'blur' }
                    ],
                    userName: [
                      { required: true, message: '用户名不能为空！', trigger: 'blur'},
                        { validator:userNameJudgeRepeat, trigger: 'blur' }
                    ],
                    orgId: [
                      { required: true, message: '所在单位不能为空！', trigger: 'change' }
                    ], 
                     
       },
        loading:false,
         isClose:true,
        activeName: 'first', 
        organizeTreeData:[],
        roleTreeData:[],
        selectNode:{id:""},
        defaultProps: {
                children: 'children',
                label: 'text',
                id: 'id'
            },
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
                    this.loading=true;
                    let params={};
                    params.grantedRoles=this.$refs.roleTree.getCheckedKeys();
                    params.grantedDataRanges=this.$refs.dataRangeTree.getCheckedKeys();
                    params.user=this.formModel;
                    if(params.grantedRoles.length==0||params.grantedDataRanges.length==0){
                        this.$message.error('请给用户赋予角色和权限范围！');
                        this.loading=false;
                        return;
                    }
                    requestCreateOrUpdateUser(params).then(data=>{
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
                            this.$message.error('保存数据失败！');
                        }
                        this.loading=false;
                    }).catch(function(error){
                    this.loading=false;
                  })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            },
         _resetForm() {
                this.$refs.formModel.resetFields();
                this.$refs.roleTree.setCheckedKeys([]);
                this.$refs.dataRangeTree.setCheckedKeys([]);
         },
         _complete(){
                this.$emit('close');
            },
         _handleNodeClick(result, resolve) {  
                    //点击加载 
                    this.selectNode=result;
                }, 
        _getRoleTreeList(){
                var _this=this;
                requestGetRoleTreeList().then(data => {
                    if(data.success){
                       this.roleTreeData=data.result;
                    }
                else {
                    this.$message.error('获取数据失败！'+data.error.message);
                }
                })
            },     
         _getOrganizeTreeList(){
                var _this=this;
                requestGetOrganizeTreeList().then(data => {
                    if(data.success){
                       this.organizeTreeData=data.result;
                    }
                else {
                    this.$message.error('获取数据失败！'+data.error.message);
                }
                })
            },      
         _getUserForEdit(){
                var _this=this;
                let params={};
                params.id=this.formModel.id;
                requestGetUserForEdit(params).then(data => {
                    if(data.success){
                        this.$refs.roleTree.setCheckedKeys(data.result.grantedRoles);
                        this.$refs.dataRangeTree.setCheckedKeys(data.result.grantedDataRanges);
                    }
                else {
                    this.$message.error('获取数据失败！');
                }
                })
        },       
    },
  mounted(){
         Object.assign(this.formModel,this.selectRow); 
         this._getRoleTreeList();  
         this._getOrganizeTreeList(); 
         this._getUserForEdit();
         this.formModel.ouserName=this.formModel.userName;
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
