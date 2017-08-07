
<template>
<div>
    <el-form  :model="colList"  ref="colList" label-width="100px" >
            <el-form-item v-for="item in colList.formData" 
                    :label="item.title" 
                    :prop="item.name"
                    :rules="item.rules">
             <el-input  v-model="item.val" ></el-input>
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
    requestCreateOrUpdateSingleTable
}from 'api/singletable';
export default {
    data(){
    return{
        formModel:this.tableInfo.formModel.formModel,
        rules:this.tableInfo.rule.rules,
        loading:false,
        colList:{formData:[
                {name:'tm_col5',title:'名称',val:'',
                rules:[
                    { required: true, message: '请输入名称', trigger: 'blur' },]
                },
                {name:'tm_col6',title:'邮箱',val:'',
                 rules:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
                },
            ]}
        }       
    },
    props:{
        selectRow:{},
        tableInfo:{},
        isVisible:false
    },
    methods:{
         _dataInit(){
               console.log(this.tableInfo);
               console.log(this.rules);
               console.log(this.formModel);
         },
         _onSubmit() {
              console.log(this.$refs);
               console.log(this.colList);
                this.$refs.colList.validate((valid) => {
                if (valid) {
                    console.log(this.colList);
                    this.loading=true;
                    let params={};
                    params[this.tableInfo.tableName]=this.formModel;
                    requestCreateOrUpdateSingleTable(params,this.tableInfo.tableName).then(data=>{
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
                    console.log('error submit!!');
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
       this._dataInit();
       Object.assign(this.formModel,this.selectRow); 
       
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
