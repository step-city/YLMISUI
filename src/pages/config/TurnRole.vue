
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="80px" >
    <el-form-item label="角色名称" prop="roleId">
        <el-select  v-model="formModel.roleId"  placeholder="请选择角色" style="width:80%">
            <el-option
                v-for="item in getUserInfo.userRoles"
                :key="item.id"
                :label="item.text"
                :value="item.id">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="权限范围" prop="orgId">
             <el-select  v-model="formModel.orgId"  placeholder="请选择权限范围" style="width:80%">
             <el-option
                v-for="item in getUserInfo.userDataRanges"
                :key="item.id"
                :label="item.text"
                :value="item.id">
            </el-option>
        </el-select>
    </el-form-item>
   <el-form-item style="text-align:right;" >
      <el-button @click="_complete">取消</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading">确定</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestUpdateCurrentUserInfo,
    requestGetCurrentLoginInformations
}from 'api/login';
import { mapActions } from 'vuex';
import util from 'common/js/util';
export default {
    data(){
    return{
        formModel:{
                 roleId:'',
                 orgId:'',
        },
         rules: {
                    roleId: [
                      { required: true, message: '角色不能为空！', trigger: 'change' }
                    ],
                    orgId: [
                      { required: true, message: '权限范围不能为空！', trigger: 'change' }
                    ],
                   
         },
         loading:false,
         getUserInfo:this.getUserInfo(),
       }       
    },
    props:{
        isVisible:false
    },
    methods:{
         _onSubmit() {
                let _this=this;
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.loading=true;
                    let params={};
                    params=this.formModel;
                    requestUpdateCurrentUserInfo(params).then(data=>{
                         if(data.success){
                            requestGetCurrentLoginInformations().then( 
                                        data=>{
                                            if(data.success){
                                                // this.getUserInfo(data.result);
                                                util.setCookie('userInfo',JSON.stringify(data.result),1);
                                                 if(this.$router.name!=="首页"){
                                                      this.$router.push({ path:'/home'});
                                                 }
                                                window.location.reload();
                                                 this.$notify({
                                                    title: '成功',
                                                    message: '转化角色成功',
                                                    type: 'success'
                                                    });
                                                //关闭面板
                                                this._complete();
                                            }
                                })
                         }
                         else {
                             this.$message.error('失败！'+data.error.message);
                         }
                         this.loading=false;
                    }).catch(function(error){
                         _this.loading=false;
                    })
                } else {
                    _this.$message.warning('请按照条件填充表单！');
                    return false;
                }
                
            });
            },
         _complete(){
                this.$emit('close');
            },
    },
    components:{
    },
     mounted(){
    },
     watch:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
