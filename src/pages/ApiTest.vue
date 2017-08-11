<template>
<div class="main">
<el-form :model="formModel"  :rules="rules"  ref="formModel"  label-width="100px" style="padding-top:20px">
         <el-form-item label="请求地址" prop="url">
             <el-input v-model="formModel.url" style="width:95%"></el-input>
         </el-form-item>
         <el-form-item label="请求方式" prop="method">
             <el-input v-model="formModel.method" style="width:100px"></el-input>
         </el-form-item>
         <el-form-item label="参数" prop="data" >
             <el-input v-model="data" type="textarea" :rows="5" style="width:95%"></el-input>
         </el-form-item>
		  <el-col :span="6">
			<el-form-item  >
				 <el-button type="primary" @click="_gettoken" :loading="loading">切换token</el-button>
			</el-form-item>
		 </el-col>
		 <el-col :span="18">
			<el-form-item  label="是否带参数">
				  <el-switch v-model="isParams" :on-value="true"  :off-value="false" on-text="是" off-text="否" @change="_change"> </el-switch>
			</el-form-item>
		 </el-col>
		 <el-col :span="24">
			<el-form-item label="token" >
				<el-input v-model="token" type="textarea" :rows="3"  :readonly="true" style="width:95%"></el-input>
			</el-form-item>
		 </el-col>
		
		 <el-col :span="24">
		  <el-form-item label="结果" >
			  <el-input v-model="result" type="textarea" :rows="10" style="width:95%" :readonly="true"></el-input>
         </el-form-item>
		 </el-col>
		 <el-col :span="24">
			<el-form-item style="text-align:left;" >
				<el-button @click="_resetForm">重置</el-button>
				<el-button type="primary" @click="_onSubmit" :loading="loading">执行请求</el-button>
			</el-form-item>
 		 </el-col>
</el-form>
</div>
</template>

<script type="text/babel">
import store from '../vuex/store'
import util from 'common/js/util'
import axios from 'axios';
import config from 'static/js/config';
import utils from '../common/js/workerFormatter'

export default {
		data() {
		      return {
		        formModel: {
					url: 'api/services/app/function/GetFunctionPageList',
					method: 'post',
		        },
		        rules:{
						url: [
							{ required: true, message: '请输入请求地址', trigger: 'blur' }
						],
						method: [
		            		{ required: true, message: '请输入请求方式', trigger: 'blur' },
		          		],
	          		},
				loading:false,
				token:'',
				flag:true,
				result:'暂无结果',
				data:'{"maxResultCount":10,"draw":1,"sorting":"","skipCount":0,"queryConditionItem":[{"dataField":"FuncName","op":"LIKE","dataValue":""},{"dataField":"ParentId","op":"EQ","dataValue":"00000000-0000-0000-0000-000000000000"}]}',
				isParams:true
		      };
		     },
		     methods:{
				 _gettoken(){
					if(this.flag){
						this.flag=false;
						this.token=util.getDefaultToken();
					}else{
						this.flag=true;
						this.token=store.getters.getToken;
					}
				 },
				 _change(val){
					console.log(this.isParams);
				 },
			     _onSubmit(){
					 let _this=this;
					axios.defaults.baseURL =config.baseURL;
					axios.defaults.timeout=config.timeout;
					let params=this.formModel;
					params.headers={'Authorization':store.getters.getToken};
					if(this.isParams){
						params.data=JSON.parse(this.data);
					}else{
						params.data={};
					}
				 	axios(params).then(function(res){
						console.log(res);
						_this.result=JSON.stringify(res);
					})
					.catch(function(err){
						console.log(err);
						_this.result=JSON.stringify(err);
					})
			     },
			     _resetForm(){
					 this.$refs.formModel.resetFields();
				}
		     },
			 mounted(){
				 this.token=store.getters.getToken;
				 let result=this.data;
				 this.data=utils.jsonToHTML(result,'测试');
			 }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.main
		background-color:#fff
		height:100%
		width:100%
		color:#fff
</style>
