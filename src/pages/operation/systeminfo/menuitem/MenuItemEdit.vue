<template>
<div>
<el-form  :model="formModel"  :rules="rules" ref="formModel" label-width="100px" >
  <el-form-item label="父节点" prop="parentId">
   <yl-treeselect v-model="formModel.parentId" 
                :treedata="treedata" 
                :readonly="true"
                :defaultProps="defaultProps"  
                @getCurrentNode="_getCurrentNode">
   </yl-treeselect>
  </el-form-item>
  <el-form-item label="菜单代码" prop="menuCode">
      <el-input v-model="formModel.menuCode" ></el-input>
  </el-form-item>
   <el-form-item label="功能代码" prop="funcCode">
      <yl-treeselect 
                v-model="formModel.funcCode" 
                :treedata="funtreedata" 
                :readonly="true"
                :defaultProps="defaultProps" 
                @getCurrentNode="_getCurrentNodeForFun">
      </yl-treeselect>
  </el-form-item>
    <el-form-item label="菜单名称" prop="menuName">
      <el-input v-model="formModel.menuName" ></el-input>
  </el-form-item>
  <el-form-item label="配置路径" prop="url">
      <el-input v-model="formModel.url" ></el-input>
  </el-form-item>
  <el-row>
        <el-col :span="12">
            <el-form-item  prop="showFlag"  label="是否启用">
                    <el-switch  v-model="formModel.showFlag"
                                on-text="启用"
                                off-text="禁用"
                                on-color="#13ce66"
                                off-color="#ff4949">
                    </el-switch>
            </el-form-item>
            </el-col>
        <el-col :span="12">
            <el-form-item label="排序"  prop="sortCode" >
                <el-input-number v-model="formModel.sortCode"></el-input-number>
            </el-form-item>
        </el-col>
  </el-row>
  <el-form-item label="菜单图标" prop="menuIcon">
      <el-input v-model="formModel.menuIcon" ></el-input>
  </el-form-item>
  <el-form-item label="对应表名称" prop="tableName">
      <el-input v-model="formModel.tableName" ></el-input>
  </el-form-item>
   <el-form-item label="菜单描述" prop="menuDesc">
      <el-input v-model="formModel.menuDesc"  type="textarea"></el-input>
  </el-form-item>
  <el-form-item style="text-align:right;" >
      <el-button @click="_resetForm">重置</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script type="text/babel">
import util from 'common/js/util';
import { 
    requestGetMenuItemTreeList,
    requestCreateOrUpdateMenuItem
    } from 'api/menuitem';
import {
    requestGetFunctionTreeList
}from 'api/function';
export default {
    data() {
      return {
         formModel:{
            parentId: '',
            appCode:'',
            menuCode: '',
            funcCode: '',
            menuName: '',
            url: '',
            showFlag: true,
            sortCode: 1,
            menuIcon: '',
            menuDesc: '',
            tableName: '',
        },
        rules: {
            parentId: [
              { required: true, message: '父节点不能为空！', trigger: 'change' }
            ],
            menuCode: [
              { required: true, message: '菜单代码不能为空！', trigger: 'blur' }
            ],
            funcCode: [
              {  required: true, message: '功能代码不能为空！', trigger: 'change' }
            ],
            menuName: [
              {  required: true, message: '菜单名称不能为空！', trigger: 'blur' }
            ],
            // tableName: [
            //      {  required: true, message: '表名称不能为空', trigger: 'blur' }
            // ]
         },
         treedata: [],
         funtreedata: [],
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
        selectRow:{}
    },
    methods:{
            //一次加载树
            _getGetMenuItemTreeList(){
                requestGetMenuItemTreeList().then(data => {
                        if(data.success){
                            this.treedata=util.returnDatabyTree(data.result,'00000000-0000-0000-0000-000000000000');
                        }
                        else {
                             this.$message.error('获取数据失败！'+data.error.message);
                        }
                    })
            },
              //一次加载功能树
            _getGetFunctionCodeTreeList(){
                requestGetFunctionTreeList().then(data => {
                        if(data.success){
                            this.funtreedata=util.returnDatabyTree(data.result,'00000000-0000-0000-0000-000000000000');
                        }
                        else {
                             this.$message.error('获取数据失败！'+data.error.message);
                        }
                    })
            },
            _getCurrentNodeForFun(selectNode){
                  this.formModel.funcCode=selectNode.funcCode;
            },
            _onSubmit() {
                    let _this=this;
                    this.$refs.formModel.validate((valid) => {
                    if (valid) {
                        this.loading=true;
                        var params={};
                        params.menuItem=this.formModel;
                        requestCreateOrUpdateMenuItem(params).then(data=>{
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
            },
            _getCurrentNode(selectNode){
                this.formModel.appCode=selectNode.code;
            }
    },
    mounted(){
        //初始化树控件
        this._getGetMenuItemTreeList();
        this._getGetFunctionCodeTreeList();
        Object.assign(this.formModel,this.selectRow); 
    },
    watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
