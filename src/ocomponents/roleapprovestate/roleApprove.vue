
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="80px" >
    <el-form-item label="审批状态" prop="stateDesc">
        <el-select  
            v-model="formModel.stateDesc" 
            @change="_selChange" 
            placeholder="请选择" 
            style="width:35%">
            <el-option
                v-for="item in stateList"
                :key="item.id"
                :label="item.stateText"
                :value="item.stateText"
                >
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="审批意见" prop="dealOptions">
        <el-input type="textarea" :rows="5" v-model="formModel.dealOptions"></el-input>
    </el-form-item>
   <el-form-item style="text-align:right;" >
      <el-button type="primary" @click="_onSubmit" :loading="loading">执行</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script type="text/babel">
import fetch from  'api/fetch';
export default {
    data(){
        return{
            formModel:{
                    tableName:'',
                    orgId:this.getUserInfo().user.manageOrgId,
                    orderId:this.propsOrderId,
                    isState:0,
                    stateDesc:'',
                    dealOptions:'',
            },
            rules: {
                        stateDesc: [
                        { required: true, message: '不能为空！', trigger: 'change' }
                        ],
            },
            loading:false,
            stateList:[],
        }       
    },
    props:{
         apiUrl:{
            type:String,
            default:'',
        },
        propsOrderId:{  
            type:String,
            default:'',
        }
    },
    methods:{
        _getState(){
            fetch({ 
                url: '/api/services/app/roleApproveState/GetRoleApproveStatesByRole?tableName='+this.formModel.tableName,
                method: 'post',
            }).then((data)=>{
                if(data.success){
                   this.stateList=data.result.data;
                }
            })
        },
        _selChange(val){
            let selObj=this.stateList.filter((item,index)=>{
                return item.stateText===val;
            });
            this.formModel.isState=selObj[0].stateValue;
           
        },
         _onSubmit() {
               let _this=this;
               this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.loading=true;
                    let params={};
                    params=this.formModel;
                    fetch({ 
                            url:this.apiUrl,
                            method: 'post',
                            data: params,
                        }).then(data=>{
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
                                return false;
                            }
                
            });
         },
        _complete(){
            this.$emit('close');
        },
        async _getTableName(){
            let url=this.$route.path;
            let moduleObj=await this.getTableName(url);
            this.formModel.tableName=moduleObj.tableName;
            this._getState();
        }
    },
    components:{
    },
     mounted(){
         this._getTableName();
    },
     watch:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
