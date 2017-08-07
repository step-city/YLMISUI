<template>
	<div class="login">
		<div class="header">
			<div class="logo"></div>
		</div>
		<div class="main">
			<div class="title"></div>
			<div class="loginform">
				<el-form class="loginlay" :model="LoginForm" :rules="rules" ref="LoginForm" label-width="0px" label-position="left">
						<el-form-item  prop="appCode" >
							<el-select v-model="LoginForm.appCode" placeholder="请选择系统" size="large" style="width:270px" @change="_selectMneuApp">
								<el-option
									v-for="item in menuAppList"
									:label="item.appName"
									:value="item.appCode">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item  prop="userName" >
							<el-input v-model="LoginForm.userName" size="large"  placeholder="请输入用户名" style="width:270px">
								<template slot="prepend"><i class="icon-user-tie"></i></template>
							</el-input>
						</el-form-item>
						<el-form-item  prop="passWord">
							<el-input v-model="LoginForm.passWord" size="large" placeholder="请输入密码"  type="password" style="width:270px">
								<template slot="prepend"><i class="el-icon-more"></i></template>
							</el-input>
						</el-form-item>
						<el-form-item >
						<el-checkbox v-model="LoginForm.rememberpwd"></el-checkbox> <span>记住密码</span>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="large" @click="_handleSubmit" :loading="loading" >登录</el-button>
							<el-button @click="_handleReset" size="large" >重置</el-button>
						</el-form-item>
					</el-form>
			</div>
		</div>
		<div class="foot">
			<div class="about-warpper">
				<a class="about-item" href="http://www.yearrow.com">关于易龙</a>
				<a class="about-item" href="#">法律声明</a>
				<a class="about-item">客服电话:029-88227793</a>
				<p class="bottom">© 2017 易龙软件 版权所有 ICP证：陕B2-20080101</p>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
import { 
		requestToken,
		requestGetMenuAppList,
		requestGetCurrentLoginInformations 
	   } from 'api/login';
import util from 'common/js/util';
import fetch from 'api/fetch';
import { mapActions } from 'vuex';
export default {
		data() {
		      return {
		        LoginForm: {
					userName: 'admin',
					passWord: 'ddd88227793',
					grant_type:'password',
					rememberPwd:false,
					appCode:'',
		        },
		        rules:{
						userName: [
							{ required: true, message: '请输入用户名', trigger: 'blur' }
						],
						passWord: [
		            		{ required: true, message: '请输入密码', trigger: 'blur' },
		            		{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
		          		],
						appCode: [
							{ required: true, message: '请选择要登入的系统！', trigger: 'change' }
						],
	          		},
				loading:false,
				menuAppList:[],
		      };
		     },
		     methods:{
			     _handleSubmit(ev){
					//系统登录
					this.$refs.LoginForm.validate((valid) => {
							if (valid) {
								let _this=this;
								this.loading=true;
								requestToken(this.LoginForm).then(data => {
									let result=data.data;
									if(result.error!==undefined){
										if(result.error==="InvalidUserName"){
											this.$message.warning('用户名输入有误！');
										}else if(result.error==="InvalidPassword"){
											this.$message.warning('密码输入有误！');
										}else{
											this.$message.error('登录有误:'+result.error);
										}
									}else{
										if(result.access_token!==""){
											util.setLogin(result.access_token);
											requestGetCurrentLoginInformations().then(
													data=>{
														if(data.success){
															// this.getUserInfo(data.result);
															util.setCookie('userInfo',JSON.stringify(data.result),1);
															this.$message({message: '登录成功，欢迎您使用本系统...',type: 'success'});
															this.$router.push({ path:'/home'});
														}
											})
										} else {
											this.$message.error('登录失败！');
										}
									}
									this.loading = false;
								}).catch(function(err){
									_this.loading = false;
								})
							} else {
								return false;
							}
				       });
			     },
			     _handleReset(){
					//表单重置
					 this.$refs.LoginForm.resetFields();
			    },
				_requestGetMenuAppList(){
					requestGetMenuAppList().then(data => {
								this.menuAppList=data.result;
								console.log(data.result)
					})
				},
				_selectMneuApp(val){
					util.setCookie('appCode',val,1);
				},
				...mapActions(['getLoginSatus','getToken']),
		     },
			 mounted(){
				 this._requestGetMenuAppList();
			 }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.login
	background:#fff url(../common/image/login_bgpic.png) repeat
	height:100%
	width:100%
	color:#ddd
	display:flex
	flex-direction:column
	.header
		height:100px
		display:flex
		align-items:center
		.logo
			width:100%
			height:65px
			background: url(../common/image/logo.png) no-repeat 
			margin-left:100px
	.main
		position:relative
		height:616px
		border-top:2px #eee solid
		border-bottom:2px #eee solid
		background url(../common/image/ad_bg.png) no-repeat 
		background-size:100%
		flex:1
		.title
			position:absolute
			top:100px
			left:100px
			height:150px
			width:364px
			z-index:1000
			background: url(../common/image/ad_word.png) no-repeat
		.loginform
			position:absolute
			top:10px
			right:100px
			height:407px
			width:480px
			z-index:1001
			background: url(../common/image/login_bg.png) no-repeat
			.loginlay
				padding-top:100px
				padding-left:90px
	.foot
		height:65px
		text-align:center
		padding-top:10px
		.about-warpper>.about-item
				font-size:14px
				margin:0px  5px 
				&:hover
					color:#475669
			.bottom
				margin-top:5px
				font-size:12px
</style>
