<template>
<div class="loginlock">
	<div class="main">
		<div class="content">
		    <div class="swipe">
			    <v-swipe class="my-swipe" :speed="swipe.speed" :showIndicators="swipe.showIndicators">
			      <v-swipe-item class="slide">
			        <img src="../common/image/login_bg1.jpg" alt="" class="image">  
			      </v-swipe-item>
			      <v-swipe-item class="slide">
			        <img src="../common/image/login_bg2.jpg" alt="" class="image">  
			      </v-swipe-item>
			      <v-swipe-item class="slide">
			        <img src="../common/image/login_bg3.jpg" alt="" class="image">  
			      </v-swipe-item>
			      <v-swipe-item class="slide">
			        <img src="../common/image/login_bg4.jpg" alt="" class="image">  
			      </v-swipe-item>
			    </v-swipe>
		 	 </div>
			<div class="login-wapper">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="left">
					<el-form-item label="用    户:"  >
						<el-input v-model="ruleForm.name"  placeholder="请输入用户名" :disabled="true">
							<template slot="append"><i class="icon-user-tie"></i></template>
						</el-input>
					</el-form-item>
					<el-form-item label="密    码:" prop="password">
						<el-input v-model="ruleForm.password" placeholder="请输入密码" type="password">
						<template slot="append"><i class="el-icon-more"></i></template>
					</el-input>
					</el-form-item>
						<el-form-item>
						<el-button type="primary" @click="handleSubmit">登录</el-button>
						<el-button @click="handleReset">重新登录</el-button>
					</el-form-item>
				</el-form>
			</div>
	 	</div>
	</div>
	<div class="foot">
		<p class="bottom">© 2017 易龙软件 版权所有 ICP证：陕B2-20080101</p>
</div>
</div>

</template>

<script type="text/babel">
import Swipe from 'components/tool/swipe/swipe.vue';
import SwipeItem from 'components/tool/swipe/swipe-item.vue';
export default {
	data() {
	      return {
	        ruleForm: {
				name: '马龙昌',
				password: '123'
	        },
	        rules:{
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
					
				],
				password: [
            		{ required: true, message: '请输入密码', trigger: 'blur' },
            		{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          		]
	        },
	        swipe:{
	        	speed:300,
				showIndicators:false
	        }	
	      };
	     },
	     methods:{
		     handleSubmit(ev){
				//系统登录
				var _this=this;
				_this.$refs.ruleForm.validate((valid) => {
			          if (valid) {
			           _this.$router.replace('/home');
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
		     },
		     handleReset(){
				//表单重置
				var _this=this;
				 _this.$router.replace('/Login');
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
.loginlock
	height:100%
	.main
		height:100%
		.content
			height:100%
			width:100%
			position:relative
			.swipe
				width:100%
				height:100%
				.slide>.image
					width:100%
					height:100%
			.login-wapper
				position:fixed
				top:0
				right:0
				left:0
				bottom:0
				z-index:100
				margin:auto
				width:320px
				height:200px
				background-color:rgba(255,255,255,0.7)
				padding:15px
				padding-top:50px
				border:1px solid #ddd;
	.foot
		position:fixed
		z-index:101
		bottom:30px
		display:block
		width:100%
		height:20px
		.bottom
			font-size:12px
			text-align:center
			color:#fff
		
</style>
