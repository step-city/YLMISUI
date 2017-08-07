<template>
    <div>
        <el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px">
            <el-tabs v-model="activeName" @tab-click="_handleClick"  >
                <el-tab-pane label="角色属性" name="first" >
                    <el-form-item label="上级角色" prop="parentId" >
                        <yl-roleTree v-model="formModel.parentId"></yl-roleTree>
                    </el-form-item>
                    <el-form-item label="角色代码" prop="name">
                        <el-input v-model="formModel.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="displayName">
                        <el-input v-model="formModel.displayName" ></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sortCode" >
                        <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second" >
                        <el-tree  style="height:250px;overflow:auto"
                        :data="functionTreeData"
                        show-checkbox
                        :default-expand-all="false"
                        :check-strictly="true"
                        node-key="funcCode"
                        ref="tree"
                        highlight-current
                        :render-content="renderContent"
                        @check-change="_checkchange"
                        :props="defaultProps">
                        </el-tree>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="text-align:right;" >
                <el-button @click="_resetForm">重置</el-button>
                <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/babel">
import treeMixn from '@/mixns/tree.js';
import {
      requestCreateOrUpdateRole,
      requestGetRoleForEdit,
      requestGetRoleTreeList
}from 'api/role';
import roleTree from 'ocomponents/role/roleTree'
import util from 'common/js/util';
export default {
    mixins: [treeMixn],
    data(){
    return{
        formModel:{
                 id:'',
                 appCode:'YLMMISV8.0',
                 parentId:'',
                 name:'',
                 displayName:'',
                 sortCode: 1
        },
        rules: {
                    parentId: [
                      { required: true, message: '父级角色不能为空！', trigger: 'change' }
                    ],
                    name: [
                      { required: true, message: '角色代码不能为空！', trigger: 'blur' }
                    ],
                    displayName: [
                      { required: true, message: '角色名称名称不能为空！', trigger: 'blur' }
                    ],
        },
        loading:false,
        activeName: 'first', 
        functionTreeData:[],
        functionTreeList:[],
        defaultProps: {
                children: 'children',
                label: 'text',
                id: 'funcCode'
            },
        checkeddata:[],
        roleTreeData:[],
        roleSelArr:[],
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    methods:{
         _onSubmit(){
                    let _this=this;
                    this.$refs.formModel.validate((valid) => {
                    if (valid) {
                        this.loading=true;
                        let params={};
                        params.role=this.formModel;
                        params.grantedPermissionNames=this.$refs.tree.getCheckedKeys();
                        requestCreateOrUpdateRole(params).then(data=>{
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
                                _this.$message.error('保存数据失败！'+data.error.message);
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
        _checkchange(data,check){
            let parentNode=[];
            parentNode=this.functionTreeList.filter((item)=>{ 
                    return item.id===data.parent;
                });
            if(parentNode.length>0){
                if(check){
                    
                    this.$refs.tree.setChecked(parentNode[0].funcCode,true);
                }else{  
                    //取消
                  //  this.$refs.tree.setChecked(parentNode[0].funcCode,false);
                }
            }
        },
         _resetForm() {
                this.$refs.formModel.resetFields();
                 this.$refs.tree.setCheckedKeys([]);
         },
         _complete(){
                this.$emit('close');
         },
         _handleClick(tab, event) {
         },
       
         _getFunctionTreeList(){
                let _this=this;
                requestGetRoleForEdit(this.formModel).then(data => {
                    if(data.success){
                        this.functionTreeList=data.result.permissions;
                        this.functionTreeData=util.returnDatabyTree(data.result.permissions,this.guidOfNull());
                        this.$refs.tree.setCheckedKeys(data.result.grantedPermissionNames);
                    }
                else {
                    _this.$message.error('获取数据失败！');
                }
                })
        }, 
         
    },
    components:{
        'yl-roleTree':roleTree,
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
       this._getFunctionTreeList();
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
