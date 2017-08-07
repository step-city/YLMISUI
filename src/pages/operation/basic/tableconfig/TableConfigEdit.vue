
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
    <el-row>
            <el-col :span="12">
                    <el-form-item label="表名" prop="tableName">
                            <el-select v-model="formModel.tableName" style="width:100%;" placeholder="请选择">
                                    <el-option
                                    v-for="item in treedata"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                    </el-option>
                            </el-select>
                    </el-form-item>
            </el-col>
            <el-col :span="12">
                    <el-form-item label="表显示名称" prop="tableTitle">
                            <el-input v-model="formModel.tableTitle" ></el-input>
                    </el-form-item>
            </el-col>
    </el-row>
    <el-row>
            <el-col :span="12">
                    <el-form-item label="布局列数" prop="formColNum">
                            <el-input v-model.number="formModel.formColNum" ></el-input>
                    </el-form-item>
            </el-col>
            <el-col :span="12">
                    <el-form-item label="表编码" prop="tableCode">
                        <el-input v-model="formModel.tableCode" ></el-input>
                    </el-form-item>
            </el-col>
    </el-row>
    <el-form-item label="说明" prop="remark">
            <el-input v-model="formModel.remark" ></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sortCode" >
            <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
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
    requestCreateOrUpdateTableConfig,
    requestGetTableInfos
}from 'api/tableconfig';
export default {
    data(){
    return{
        formModel:{
                    tableName: '',
                    tableTitle: '',
                    formColNum:0,
                    tableCode: '',
                    remark: '',
                    sortCode: 1,
               },
         rules: {
                    tableName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
                    ],
                    tableTitle: [
                      { required: true, message: '表显示名称不能为空！', trigger: 'blur' }
                    ],
                    formColNum: [
                      {  validator: this.checkInt,  trigger: 'blur' }
                    ],
                    tableCode: [
                      { required: true, message: '表编码不能为空！', trigger: 'blur' }
                    ],
         },
        loading:false,
        defaultProps: {
                    children: 'children',
                    label: 'name',
                    id: 'name'
                },
        treedata:[],
        selectNode:{text:'',id:''},
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    computed: {
    },
    methods:{
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.loading=true;
                    let params={};
                    params.tableConfig=this.formModel;
                    requestCreateOrUpdateTableConfig(params).then(data=>{
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
                    this.$message.error('网络异常！'+error);
                    this.loading=false;
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
          _getGetTableConfigTreeList(){
            requestGetTableInfos().then(data => {
                    if(data.success){
                        this.treedata=data.result;
                    }
                    else {
                            this.$message.error('获取数据失败！'+data.error.message);
                    }
                }).catch(function (error) {
                        this.$message.error('网络异常！'+error);
                });
        },
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
       this._getGetTableConfigTreeList();
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
