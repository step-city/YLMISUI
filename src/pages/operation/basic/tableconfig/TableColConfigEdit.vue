
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
 <el-tabs v-model="activeName"  >
    <el-tab-pane label="基本信息" name="first" >
        <el-row>
            <el-col :span="12">
                 <el-form-item label="表名称" prop="tableName">
                     <el-input v-model="formModel.tableName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="列名称" prop="colName">
                        <el-select v-model="formModel.colName" style="width:100%;" placeholder="请选择">
                                    <el-option
                                    v-for="item in coltreedata"
                                    :key="item.columN_NAME"
                                    :label="item.columN_NAME"
                                    :value="item.columN_NAME">
                                    </el-option>
                        </el-select>
                </el-form-item>
            </el-col>
        </el-row>
         <el-form-item label="列显示名称" prop="colTitle">
             <el-input v-model="formModel.colTitle" ></el-input>
         </el-form-item>
         <el-form-item label="列类型" prop="colType">
             <el-input v-model="formModel.colType" ></el-input>
         </el-form-item>
         <el-row>
             <el-col  :span="8">
                   <el-form-item label="启用状态" prop="isDisable">
                            <el-switch  v-model="formModel.isDisable"
                                        on-text="启用"
                                        off-text="禁用"
                                        on-color="#13ce66"
                                        off-color="#ff4949">
                            </el-switch>
                    </el-form-item>
             </el-col>
             <el-col  :span="8">
                    <el-form-item label="表单状态" prop="isFormShow">
                            <el-switch  v-model="formModel.isFormShow"
                                        on-text="是"
                                        off-text="否">
                            </el-switch>
                    </el-form-item>
             </el-col>
             <el-col :span="8">
                    <el-form-item label="打印状态" prop="isPrintShow">
                            <el-switch  v-model="formModel.isPrintShow"
                                        on-text="是"
                                        off-text="否">
                            </el-switch>
                    </el-form-item>
             </el-col>
         </el-row>
     </el-tab-pane >
      <el-tab-pane label="其他信息" name="second" >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="列宽" prop="colWidth">
                        <el-input v-model="formModel.colWidth" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="精度" prop="colPrecision">
                        <el-input v-model="formModel.colPrecision" ></el-input>
                    </el-form-item>
                </el-col>
           </el-row>
           <el-row>
                <el-col :span="12">
                    <el-form-item label="最大值" prop="maxLenth">
                        <el-input v-model="formModel.maxLenth" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="最小值" prop="minLength">
                        <el-input v-model="formModel.minLength" ></el-input>
                    </el-form-item>
                </el-col>
           </el-row>
            <el-form-item label="错误信息" prop="errorMessage">
                <el-input v-model="formModel.errorMessage" ></el-input>
            </el-form-item>
            <el-form-item label="说明" prop="remark">
                <el-input v-model="formModel.remark" ></el-input>
            </el-form-item> 
             <el-row>
                <el-col  :span="12">
                        <el-form-item label="不能为空" prop="isNull">
                                 <el-switch  v-model="formModel.isNull"
                                            on-text="是"
                                            off-text="否">
                                </el-switch>
                        </el-form-item>
                </el-col>
                <el-col  :span="12">
                        <el-form-item label="排序" prop="sortCode" >
                            <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
                        </el-form-item>
                </el-col>
            </el-row>
       </el-tab-pane >
    </el-tabs>
        <el-form-item style="text-align:right;" >
            <el-button @click="_resetForm">重置</el-button>
            <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
        </el-form-item>
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateTableColConfig,
    requestGetTableColumnInfo
}from 'api/tablecolconfig';
import {
            requestGetTableInfos,
            requestGetTableConfigs
        } from 'api/tableconfig';
export default {
    data(){
    return{
        formModel:{
                 tableId:'',
                 tableName:'',
                 colName:'',
                 colTitle:'',
                 colType:'',
                 isDisable:true,
                 isFormShow:true,
                 isPrintShow:true,
                 colWidth:'',
                 colPrecision:'',
                 maxLenth:'',
                 minLength:'',
                 errorMessage:'',
                 isNull:true,
                 remark:'',
                 sortCode: 1,
        },
         rules: {  
                    tableName: [
                      { required: true, message: '表名称不能为空！', trigger: 'blur' }
                    ],
                    colName: [
                      { required: true, message: '列名称不能为空！', trigger: 'blur' }
                    ],
                    colTitle: [
                      { required: true, message: '列显示名称不能为空！', trigger: 'blur' }
                    ],
                    colType: [
                      { required: true, message: '列类型不能为空！', trigger: 'blur' }
                    ],
                   
                    
                 
         },
        loading:false,
        defaultProps: {
            children: 'children',
            label: 'tableName',
            id: 'id'
        },
        treedata:[],
        coltreedata:[],
        activeName: 'first', 
       }       
    },
    props:{
        selectRow:{},
        selectNode:{},
        isVisible:false
    },
    methods:{
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    console.log(this.formMode);
                    this.loading=true;
                    let params={};
                    params.tableColConfig=this.formModel;
                    requestCreateOrUpdateTableColConfig(params).then(data=>{
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
            this.formModel.table='请选择';
        },
        _complete(){
            this.$emit('close');
        },
        _getGetTableColConfigTreeList(){
                let params={};
                if(this.formModel.tableName==undefined){
                        params.tableName=this.formModel.table;
                        this.formModel.tableName=this.formModel.table;
                        }
                else{
                        params.tableName=this.formModel.tableName;
                        }
                requestGetTableColumnInfo(params).then(data => {
                        if(data.success){
                            this.coltreedata=data.result;
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
       if(this.formModel.tableName==''){
           this.formModel.tableName=this.selectNode.tableName;
           this.formModel.tableId=this.selectNode.id;
       }
       this._getGetTableColConfigTreeList();
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
