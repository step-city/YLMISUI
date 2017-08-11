<template>
	<div class="main" ref="main" :style="{'width': bodyStyle.width, 'height': bodyStyle.height }">
		<div class="header">
			<div class="left">
				<span class="logo-wrapper">
					<img class="logo" src="../common/image/logo.png">
				</span>
				<span class="title-wrapper">
				</span>
			</div>
			<div class="right">
				<ul>
					<li v-for="item in menuAppList" :key="item.id">
						<a class="right-item1" @click="_turnSystem(item.appCode)"></a>
						<span>{{item.appName}}</span>
					</li>
					<li>
						<a class="right-item2" @click="_goEveryWhere"></a>
						<span>系统漫游</span>
					</li>
					<li>
						<a class="right-item2" @click="_turnRole"></a>
						<span>角色转化</span>
					</li>
					<li>
						<a class="right-item3" @click="_lockScreen"></a>
						<span>锁屏</span>
					</li>
					<li>
						<a class="right-item4" @click="_loginout"></a>
						<span>注销</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="content">
			<div class="left-wrapper" :class="{  'left-wrapper-close':isClose}">
				<el-menu default-active="/home" class="el-menu-vertical" v-loading="menuLoading" element-loading-text="菜单加载中..." @open="_handleOpen" @close="_handleClose" unique-opened :router="true">
					<el-menu-item index="/home" class="single">
						<i class="icon-home"></i>系统门户</el-menu-item>
					<el-submenu :index="fristmenulist.name" class="el-submenu-main" v-for="(fristmenulist,index) in menuList" :key="index">
						<template slot="title">
							<i :class="fristmenulist.icon"></i>{{fristmenulist.displayName}}</template>
						<el-submenu :index="secondmenulist.name" class="el-submenu-item" v-for="(secondmenulist,index) in fristmenulist.items" :key="index">
							<template slot="title">
								<i :class="secondmenulist.icon"></i>{{secondmenulist.displayName}}</template>
							<el-menu-item :index="thirdmenulist.url" v-for="thirdmenulist in secondmenulist.items" :key="thirdmenulist.id">{{thirdmenulist.displayName}}</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="/pages/comdemo" class="single">
						<i class="icon-home"></i>业务组件用例</el-menu-item>
					<el-menu-item index="/pages/apitest" class="single">
						<i class="icon-home"></i>API测试界面</el-menu-item>
					<div class="shrinkage" @click="_showMenu"></div>
				</el-menu>
			</div>
			<div class="main-wrapper" :class="{'main-wrapper-expend':isClose}">
				<div class="dynamicmodel">
					<transition name="fade">
						<router-view ></router-view>
					</transition>
				</div>
			</div>
		</div>
	
		<div class="lock" v-if="isLock">
			<div class="lockmain">
				<div class="userimage">
				</div>
				<div class="locktexet">
					{{userInfo.realName}}
				</div>
				<div class="loginform">
					<el-form :inline="true">
						<el-form-item style="margin-right:0px">
							<el-input placeholder="请输入密码解锁" style="width:180px" type="password"></el-input>
						</el-form-item>
						<el-form-item>
							<img class="btnimg" src="../common/image/enter_icon.png" @click="_resetLogin" />
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	
		<el-dialog ref="mainDialog" title="转化角色" v-model="roleFormVisible" size="tiny" top="15%" :modal-append-to-body="false" :close-on-click-modal="false">
			<TurnRole @close="_close" v-if="roleFormVisible"></TurnRole>
		</el-dialog>
		<el-dialog ref="mainDialog" title="系统漫游" v-model="goEveryWhereFormVisible" size="tiny" top="15%" :modal-append-to-body="false" :close-on-click-modal="false">
			<GoEveryWhere @close="_closeM" v-if="goEveryWhereFormVisible"></GoEveryWhere>
		</el-dialog>
	
		<el-dialog ref="itemDialog" title="单据明细" v-model="ItemFormVisible" size="small" top="15%" @close="_itemClose">
			<orderItem v-if="ItemFormVisible"></orderItem>
		</el-dialog>
	
	</div>
</template>

<script type="text/babel">
import {
	requestGetUserMenu,
	requestGetCurrentLoginInformations,
	requestGetMenuAppList,
} from 'api/login';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import fetch from 'api/fetch';
import util from 'common/js/util';
import TurnRole from 'pages/config/TurnRole';
import GoEveryWhere from 'pages/config/GoEveryWhere';
import orderItem from 'ocomponents/orderitem/orderItem'
export default {
	data() {
		return {
			isClose: false,
			isLock: false,
			menuList: {},
			bodyStyle: {},
			menuLoading: false,
			userInfo: {},
			roleFormVisible: false,
			goEveryWhereFormVisible: false,
			ItemFormVisible: false,
			menuAppList: [],
		};
	},
	computed: {
		...mapGetters(['getItem_isvisible'])
	},
	methods: {
		_handleOpen(key, keyPath) {
			//展开菜单
		},
		_handleClose(key, keyPath) {
			//关闭菜单
		},
		//锁屏
		_lockScreen: function () {
			this.isLock = true;

		},
		//隐藏menu
		_showMenu() {
			this.isClose = !this.isClose;
		},
		_resetLogin() {
			this.isLock = !this.isLock;
		},
		//注销登录
		_loginout() {
			this.$confirm('确认退出系统吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.$router.replace('/login');
			}).catch(() => {
			});
		},
		//获取菜单列表
		_getMenu() {
			this.menuLoading = true;
			let params = {};
			params.appCode = util.getCookie('appCode');
			if (params.appCode === "") {
				this.$router.replace('/login');
			}
			var _this = this;
			requestGetUserMenu(params).then(
				data => {
					if (data.success) {
						this.menuList = data.result.userMenu.items;
					} else {
						this.$message.error('菜单加载失败...');
					}
					this.menuLoading = false;
				}).catch(function (error) {
					_this.menuLoading = false;
				});
		},
		_requestGetMenuAppList() {
			requestGetMenuAppList().then(data => {
				this.menuAppList = data.result;
			})
		},
		_turnSystem(code) {
			util.setCookie('appCode', code, 1);
			this.$router.push({ path: '/home' });
			window.location.reload();
		},
		_turnRole() {
			//角色转化
			this.roleFormVisible = true;
		},
		_goEveryWhere() {
			//系统漫游
			this.goEveryWhereFormVisible = true;
		},
		_close() {
			this.roleFormVisible = false;
		},
		_closeM() {
			this.goEveryWhereFormVisible = false;
		},
		_itemClose() {
			//明细关闭
			this.setItem_isvisible(false);
		},
		...mapActions(['setItem_isvisible']),

	},
	components: {
		TurnRole,
		GoEveryWhere,
		orderItem,
	},
	mounted() {
		this._getMenu();
		this._requestGetMenuAppList();
	},
	watch: {
		getItem_isvisible: function (val, oldVal) {
			if (val) {
				//处理
				this.ItemFormVisible = true;
			} else {
				this.ItemFormVisible = false;
			}
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
	background-color:#1F2D3D
	overflow:auto
	height:100%
	.header
		min-height:75px
		width:100%
		color:#ddd
		font-size:13px
		border-1px:rgba(0,0,0,0.1)
		.left
			float:left
			margin-left:26px
			.logo-wrapper>.logo
				height:50px
				margin-top:15px
		.right
			float:right
			margin-top:10px
			ul
				list-style:none
				li
					width:60px
					display: inline-block
					margin-top: 7px
					border-right: 1px solid #2d2d2d
					box-shadow: 1px 0px #474747
					color: #B2B2B2
					.right-item1
						background:url(../common/image/f1.png) center center no-repeat
						height: 25px
						width: 60px
						display: block
						&:hover
							background:url(../common/image/f1_hover.png)  center no-repeat
					.right-item2
						background:url(../common/image/f5.png) center  no-repeat
						height: 25px
						width: 60px
						display: block
						&:hover
							background:url(../common/image/f5_hover.png) center  no-repeat
					.right-item3
						background:url(../common/image/f8.png) center  no-repeat
						height: 25px
						width: 60px
						display: block
						&:hover
							background:url(../common/image/f8_hover.png) center  no-repeat
					.right-item4
						background:url(../common/image/f7.png) center  no-repeat
						height: 25px
						width: 60px
						display: block
						&:hover
							background:url(../common/image/f7_hover.png)  center no-repeat
					span
						display: inline-block
						width: 60px
						height: 20px
						padding-top:5px
						font-size:13px
						text-align: center
	.content
		height:auto
		.userinfo-wrapper
			position:absolute
			z-index:10
			top:75px
			right:0px
			background-color:#F9FAFC
			width:210px
			height:auto
			padding:15px
			border:1px solid #ddd;
			.user-list
				height:25px
				line-height:22px
				padding:5px
				color:#1F2D3D
				font-size:14px
				font-weight:400
			.user-list-hover
				&:hover
					background-color:#E5E9F2
		.left-wrapper
			position:absolute
			z-index:0
			top:75px
			left:0
			bottom:0
			width:218px
			overflow:auto
			overflow-x: hidden;
			margin:0px 0px 15px 8px
			background-color:#324057
			border:1px solid #525252
			border-radius:4px
			.el-menu-vertical
				height:100%
				.shrinkage
					display:block
					width:6px
					height:42px
					cursor:pointer
					background:  url(../common/image/point.png) no-repeat center
					position:absolute
					top:50%
					left:210px
					z-index:10
					&:hover
						background: #324080 url(../common/image/point.png) no-repeat center
		.left-wrapper-close
			left:-220px
		.main-wrapper
			position:absolute
			z-index:0
			top:75px
			left:236px
			bottom:15px	
			right:12px
			background-color:#324057
			border:1px solid #525252
			border-radius:4px
			padding:8px
			.dynamicmodel
				padding:0px
				margin:0px
				height:100%
				overflow:auto
				.fade-enter-active,.fade-leave-active
					transition: opacity .3s ease
				.fade-enter,.fade-leave-active
					opacity: 0
		.main-wrapper-expend
			left:16px
	.lock
		position:fixed
		left:0
		right:0
		top:0
		bottom:0
		width:100%
		height:100%
		z-index:1000
		background:#111
		opacity: 0.8
		.lockmain
			margin:auto
			margin-top:150px
			width:483px
			height:262px
			padding-top:150px
			background:url(../common/image/lock_bg.png) center center no-repeat
			.userimage
				margin:auto
				width:78px
				height:78px
				background:url(../common/image/lock_user.png) center center no-repeat
			.locktexet
				color:#fff
				font-size:18px
				text-align:center
				padding:8px
			.loginform
				text-align:center
				height:38px
				line-height:38px
				.btnimg
					width:36px
				
</style>
