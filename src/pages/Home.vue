<template>
	<yl-panelpage :titleName="'系统门户'" :fullscreenisShow="true" :icon="'icon-library'">
		<div slot="content">
			<div class="home">
				<div class="userinfo">
					<div class="user">
						<img src="../common/image/personal.png" class="userimg">
						<div class="userwrapper">
							<div class="username">
								<span class="name"> {{getUserInfo.user.realName}},欢迎您！</span> ——
								<span class="rolename">
									<i class="icon-users"></i> {{getUserInfo.user.roleName}}</span>
							</div>
							<p class="department">
								<i class="icon-office"></i> {{getUserInfo.user.manageOrgName}}</p>
	
							<p class="lastlogintime">
								<i class="icon-clock"></i> 上次登录时间： {{getUserInfo.user.lastLoginTime |formatDate('llll')}}</p>
	
						</div>
					</div>
					<div class="menu">
						<div class="message">
							<i class="icon-bubbles"></i>消息通知</div>
						<div class="setting">
							<i class="icon-cog"></i>个人设置</div>
						<div class="agent">
							<i class="icon-mail3"></i>代办事项</div>
						<div class="tool">
							<i class="icon-books"></i>系统指南</div>
					</div>
				</div>
				<div class="datawrapper">
					<div class="report">
						<ul class="totalNum">
							<li class="totcount blue">
								<p class="total">
									<countTo :startVal='startVal' :endVal='endVal' :duration='2000'></countTo>万元
								</p>
								<p class="titleName">累计收料额</p>
								<div class="bottomtitle">
									<span class="hre">查看更多</span>
									<i class="icon-play2"></i>
								</div>
							</li>
							<li class="totcount green">
								<p class="total">
									<countTo :startVal='startVal' :endVal='endVal' :duration='2000'></countTo>万元</p>
								<p class="titleName">累计收料额</p>
								<div class="bottomtitle">
									<span class="hre">查看更多</span>
									<i class="icon-play2"></i>
								</div>
							</li>
							<li class="totcount yellow">
								<p class="total">
									<countTo :startVal='startVal' :endVal='endVal' :duration='2000'></countTo>万元</p>
								<p class="titleName">累计收料额</p>
								<div class="bottomtitle">
									<span class="hre">查看更多</span>
									<i class="icon-play2"></i>
								</div>
							</li>
							<li class="totcount red">
								<p class="total">
									<countTo :startVal='startVal' :endVal='endVal' :duration='2000'></countTo>万元</p>
								<p class="titleName">累计收料额</p>
								<div class="bottomtitle">
									<span class="hre">查看更多</span>
									<i class="icon-play2"></i>
								</div>
							</li>
						</ul>
						<yl-panelzone class="statistical" :titleName="'付欠款统计'" :icon="'icon-stats-dots'" :heightNum="'600px'" :theme="'primary'">
							<div slot="content">
								<yl-loading type="l1" loadingText="加载中，请稍后..."></yl-loading>
							</div>
						</yl-panelzone>
						<yl-panelzone class="statistical" :titleName="'付欠款统计'" :icon="'icon-stats-dots'" :heightNum="'300px'" :theme="'info'">
							<div slot="content">
								<yl-AsyncComp></yl-AsyncComp>
							</div>
						</yl-panelzone>
						<yl-panelzone class="statistical" :titleName="'付欠款统计'" :icon="'icon-stats-dots'" :heightNum="'300px'" :theme="'danger'">
							<div slot="content">
							</div>
						</yl-panelzone>
						<yl-panelzone class="statistical" :titleName="'付欠款统计'" :icon="'icon-stats-dots'" :heightNum="'300px'" :theme="'success'">
							<div slot="content">
							</div>
						</yl-panelzone>
						<yl-panelzone class="statistical" :titleName="'付欠款统计'" :icon="'icon-stats-dots'" :heightNum="'300px'" :theme="'warning'">
							<div slot="content">
							</div>
						</yl-panelzone>
						<yl-panelzone class="statistical" :titleName="'付欠款统计'" :icon="'icon-stats-dots'" :heightNum="'300px'" :theme="'warning'">
							<div slot="content">
							</div>
						</yl-panelzone>
						<yl-panelzone class="statistical" :titleName="'付欠款统计'" :icon="'icon-stats-dots'" :heightNum="'300px'" :theme="'warning'">
							<div slot="content">
							</div>
						</yl-panelzone>
						<yl-panelzone class="statistical" :titleName="'付欠款统计'" :icon="'icon-stats-dots'" :heightNum="'300px'" :theme="'warning'">
							<div slot="content">
							</div>
						</yl-panelzone>
	
					</div>
					<div class="news">
						<yl-panelzone class="notice" :titleName="'公告通知'" :icon="'icon-bullhorn'" :heightNum="'350px'">
							<div slot="content">
								<div class="miantxt">
									<p class="text">
										<i class="icon-play2"></i> 有钱任性沙特国王出访印尼带有钱任性沙特国王出访印尼带</p>
									<p class="text">
										<i class="icon-play2"></i> 韩总统候选人李在明若当选总统</p>
									<p class="text">
										<i class="icon-play2"></i> 高铁4月起涨价？这几条路线已确</p>
									<p class="text">
										<i class="icon-play2"></i> 人大代表王梦恕：高铁早晚要</p>
									<p class="text">
										<i class="icon-play2"></i> 留德女李洋洁遇害细节:惨叫</p>
									<p class="text">
										<i class="icon-play2"></i> 人大代表：建议调整双休日</p>
									<p class="text">
										<i class="icon-play2"></i> 维基解密再曝猛料 称CIA侵</p>
									<p class="text">
										<i class="icon-play2"></i> 一大堆补助费用来了，快看看你</p>
								</div>
							</div>
						</yl-panelzone>
						<yl-panelzone class="measuers" :titleName="'管理办法'" :icon="'icon-book'" :heightNum="'350px'">
							<div slot="content">
								<div class="miantxt">
									<p class="text">
										<i class="icon-play2"></i> 有钱任性沙特国王出访印尼带</p>
									<p class="text">
										<i class="icon-play2"></i> 韩总统候选人李在明:若当选总统</p>
									<p class="text">
										<i class="icon-play2"></i> 高铁4月起涨价？这几条路线已确</p>
									<p class="text">
										<i class="icon-play2"></i> 人大代表王梦恕：高铁早晚要</p>
									<p class="text">
										<i class="icon-play2"></i> 留德女李洋洁遇害细节:惨叫</p>
									<p class="text">
										<i class="icon-play2"></i> 人大代表：建议调整双休日</p>
									<p class="text">
										<i class="icon-play2"></i> 维基解密再曝猛料 称CIA侵</p>
									<p class="text">
										<i class="icon-play2"></i> 一大堆补助费用来了，快看看你</p>
									<p class="text">
										<i class="icon-play2"></i> 煤炭价格将持续下滑</p>
								</div>
							</div>
						</yl-panelzone>
					</div>
				</div>
			</div>
		</div>
		</slot>
	</yl-panelpage>
</template>

<script type="text/babel">
import countTo from 'components/countTo';
import template from './template';
import loading from 'components/loading/loading'
import error from 'components/error/Error'
//  import echarts from 'echarts';
//  import china from '../common/js/china'

// const AsyncComp=function (resolve) {
// 				require(['components/loading/loading'], resolve)
// 			};

// const AsyncComp =() => ({
// 		component: import('./template.vue'),
// 		loading: loading,
// 		error: error,
// 		delay: 200,
// 		timeout: 3000
// 	});
export default {
	data() {
		return {
			startVal: 0,
			endVal: 3210232,
			getUserInfo: this.getUserInfo()
		};
	},
	methods: {

	},
	mounted() {
	},
	components: {
		countTo,
		'yl-AsyncComp': function (resolve) {
			require(['components/loading/loading'], resolve)
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.home
		padding-right:8px
		.userinfo
			width:100%
			height:116px
			background-color:#20A0FF
			border-top: 2px #fff solid
			border-bottom: 2px #fff solid
			display:flex
			font-size:14px
			color:#fff
			text-shadow:1px 1px 1px #888
			overflow:hidden
			.user
				flex:3
				position:relative
				.userimg
					padding-top:20px
					padding-left:50px
				.userwrapper
					position:absolute
					left:160px
					top:20px
					.username
						height:30px
						line-height:30px
						.name
							font-size:18px
					.department
						height:30px
						line-height:25px
					.lastlogintime
						height:30px
						line-height:25px
			.menu
				width:200px
				padding-top:20px
				padding-right:20px
				flex:1
				&>div
					float:left
					width:80px
					padding:10px
					&:hover
						color:#eee 
						cursor:pointer
		.datawrapper
			display:flex
			height:auto
			width:100%
			margin-top:10px
			.report
				flex:1
				margin: 0px 10px
				.totalNum
					display:flex
					flex-direction:row
					flex-wrap:nowrap
					justify-content:space-around
					width:100%
					height:140px
					.totcount
						height:115px
						flex:1 1 200px
						border-radius:4px
						text-align:right
						margin: 0px 5px
						color:#fff
						font-size:14px
						position:relative
						.total
							font-size:22px
							padding-top:20px
							padding-right:20px
						.titleName
							font-size:16px
							height:25px
							line-height:20px
							padding-top:10px
							padding-right:20px
						.bottomtitle
							position:absolute
							text-align:left
							bottom:0
							left:0
							right:0
							height:30px
							background:#000
							opacity: 0.3
							line-height:30px
							padding:0px 5px
							cursor:pointer
							.icon-play2
								padding-left:110px
							&:hover
								background:#3e3e3e
					&>.blue
						background:#5e9ffc url(../common/image/block_bg1.png) no-repeat center left
					&>.green
						background:#75cd6c url(../common/image/block_bg2.png) no-repeat center left
					&>.yellow
						background:#e8ba3d url(../common/image/block_bg3.png) no-repeat center left
					&>.red
						background:#dd494a url(../common/image/block_bg4.png) no-repeat center left
				.statistical
					height:auto
					margin-top:10px
			.news
				width:228px
				.miantxt
					padding:5px
					color:#5a5a5a
					font-size:13px
					&>.text
						height:25px
						line-height:25px
						text-overflow:ellipsis
						white-space:nowrap
						overflow:hidden
						&:hover
							color:#F84C4C
							cursor:pointer


</style>
