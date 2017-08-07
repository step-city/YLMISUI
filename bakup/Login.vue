<template>
<div class="login">
	<div class="content-wrapper clearfix">
		<div class="content-main">
		
			<el-row class="header" >
				  <el-col :span="1" :offset="3" class="logo-wrapper">
					  	<img class="logo" src="../common/image/yllogin.png" >
				  </el-col>
				  <el-col :span="12"  class="title-wrapper">
				  	 <span class="title">易龙物资管理系统V8.0</span>
				  </el-col>	
				  <el-col :span="5" :offset="3"  class="right-wrapper">
						<i class="icon-book"></i><a class="right-item"  href="#">帮助与文档</a>|
						<i class="el-icon-share"></i><a class="right-item"  href="#">论坛</a>
			  		</ul>
				  </el-col>	
			</el-row>
				
			<div class="main">
			    <div class="swipe">
				    <v-swipe class="my-swipe">
				      <v-swipe-item class="slide">
				        <img src="../common/image/1.jpg" alt="" class="image">  
				      </v-swipe-item>
				      <v-swipe-item class="slide">
				        <img src="../common/image/2.jpg" alt="" class="image">  
				      </v-swipe-item>
				      <v-swipe-item class="slide">
				        <img src="../common/image/1.jpg" alt="" class="image">  
				      </v-swipe-item>
				      <v-swipe-item class="slide">
				        <img src="../common/image/2.jpg" alt="" class="image">  
				      </v-swipe-item>
				    </v-swipe>
			 	 </div>
			 	 <div class="login-wapper">
			 	 	<el-form :model="LoginForm" :rules="rules" ref="LoginForm" label-width="90px" label-position="left">
						<el-form-item label="用户名:" prop="UsernameOrEmailAddress" >
							<el-input v-model="LoginForm.UsernameOrEmailAddress"  placeholder="请输入用户名" >
								<template slot="append"><i class="icon-user-tie"></i></template>
							</el-input>
						</el-form-item>
						<el-form-item label="密  码:" prop="Password">
							<el-input v-model="LoginForm.Password" placeholder="请输入密码" type="password">
								<template slot="append"><i class="el-icon-more"></i></template>
							</el-input>
						</el-form-item>
						<el-form-item label="记住密码:" >
						  <el-checkbox v-model="LoginForm.rememberpwd" ></el-checkbox>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleSubmit" :loading="loading">登录</el-button>
							<el-button @click="handleReset">重置</el-button>
						</el-form-item>
					</el-form>
			 	 </div>
			</div>

		</div>
	</div>

	<div class="foot">
		<div class="about-warpper">
			<a class="about-item" href="#">关于易龙</a>
			<a class="about-item" href="#">法律声明</a>
			<a class="about-item">客服电话:029-88227793</a>
		</div>
		<p class="bottom">© 2017 易龙软件 版权所有 ICP证：陕B2-20080101</p>
	</div>
</div>
</template>

<script type="text/babel">
	import Swipe from 'components/tool/swipe/swipe.vue';
	import SwipeItem from 'components/tool/swipe/swipe-item.vue';
	import axios from 'axios';
	export default {
		data() {
		      return {
		        LoginForm: {
					UsernameOrEmailAddress: '',
					Password: '',
					rememberpwd:false
		        },
		        rules:{
						UsernameOrEmailAddress: [
							{ required: true, message: '请输入用户名', trigger: 'blur' }
						],
						Password: [
		            		{ required: true, message: '请输入密码', trigger: 'blur' },
		            		{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
		          		],
	          		},
				loading:false
		      };
		     },
		     methods:{
			     handleSubmit(ev){
					//系统登录
					var _this=this;
					_this.$refs.LoginForm.validate((valid) => {
				          if (valid) {
				          	_this.loading=true;
							axios.get('/api/data',_this.LoginForm)
									  .then(function (response) {
								       			if(response.data.success){
												_this.$router.replace('/home');
											}
											else{
												_this.$message({
												      showClose: true,
												      message: '登陆失败！',
												      type: 'error'
											    });
											}
											_this.loading=false;
									  })
									  .catch(function (error) {
									    console.log(error);
									  }); 
				          } else {
				            console.log('error submit!!');
				            return false;
				          }
				        });
			     },
			     handleReset(){
					//表单重置
					 this.$refs.LoginForm.resetFields();
			     }
		     },
		components: {
			'v-swipe':Swipe,
			'v-swipe-item':SwipeItem
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../common/stylus/mixin";
.login
	background-color:#fff
	height:100%
	width:100%
	.content-wrapper
		min-height:100%
		width:100%
		.content-main
			padding-bottom:84px
			.header
				min-height:75px
				color:#324057
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					margin-bottom: 0
				.logo-wrapper
					padding-right:20px
					.logo
						height:65px
						padding-top:5px
				.title-wrapper
					height:75px
					line-height:75px
					.title
						font-size:24px
						font-weight:500
				.right-wrapper
					height:75px
					line-height:75px
					font-size:14px
					.right-item
						font-weight:400
						margin:0 5px
						&:hover
							color:#475669
			.main
				min-height:460px
				padding:15px
				position:relative
				.swipe
					width:100%
					height:400px
					.slide>.image
						height:400px
				.login-wapper
					position:absolute
					top:30px
					right:10%
					width:280px
					height:300px
					background-color:rgba(255,255,255,0.9)
					padding:15px
					padding-top:50px
					border:1px solid #ddd;
	.foot
		height:84px
		margin:-84px auto 0 auto
		clear:both
		color:#8492A6
		text-align:center
		.about-warpper>.about-item
				font-size:14px
				margin:0px  5px 
				&:hover
					color:#475669
		.bottom
			margin-top:10px
			color:#324057
			font-size:12px
</style>
