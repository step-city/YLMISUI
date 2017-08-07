<template>
	<div class="portlet"
	 v-loading="treeLoading"
	 element-loading-text="加载中..."
	 ref="portlet"  
	 :class="{'fullscreen':fullScreen}" 
	 :style="{ 'width': widthNum, 'height': heightNum }"
	 > 
			<div class="portlet-title">
				<div class="tool">
					<!-- effect属性来改变主题，默认为dark -->
				<el-tooltip class="item"  content="帮助" placement="top">
    				 <a class="help" v-if="helpIsShow" ><i class="icon-info" style="font-size:14px"></i></a>
    			</el-tooltip>
				<el-tooltip class="item" effect="dark" content="刷新" placement="top">
					<a class="reload" v-if="reloadIsShow" @click="_reload"><i class="icon-spinner11"></i></a>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="全屏" placement="top">
					<a class="fullscreen" v-if="fullScreenIsShow" @click="_openByFullScreen"><i :class="fullScreenIcon"></i></a>
				</el-tooltip>
				</div>
				<h2><i :class="icon" ></i>{{titleName}}</h2>
			</div>
			<div class="portlet-body" >
				<slot name="content">
				</slot>
			</div>
	</div>
</template>
<script type="text/babel">
export default {
	data(){
		return {
			fullScreen:false,
			fullScreenIcon:'icon-enlarge',
		}
	},
	computed:{
	},
	props:{
		reloadIsShow:{
			required: false,
            type: Boolean,
            default:false
			},
		fullScreenIsShow:{
			required: false,
            type: Boolean,
            default:true
			},
		helpIsShow:{
			required: false,
            type: Boolean,
            default:true
			},
		titleName:{
			required: false,
            type: String,
            default:''
			},
		heightNum:{
			required: false,
            type: String,
            default:'100%'
			},
		widthNum:{
			required: false,
            type: String,
			default:'auto'
			},
		icon:{
			required: false,
            type: String,
			default:'icon-pencil2'
			},
		treeLoading:{
			required: false,
            type: Boolean,
			default:false
			},
	},
	methods:{
		_openByFullScreen() {
			this.fullScreen=!this.fullScreen;
			if(this.fullScreen)
			{
				this.fullScreenIcon='icon-shrink';
			}
			else{
				this.fullScreenIcon='icon-enlarge';
			}
		},
		_reload(){
			 this.$emit('reload');
		}
	},
	mounted() {
	},
	watch:{
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.portlet
		background: url(../../common/image/bg2.png)
		border-radius: 2px
		display:flex
		flex-direction:column;
		.portlet-title
			height:32px
			min-height:32px
			padding-left:10px
			background: url(../../common/image/tab_title_bg.png)
			border-top-left-radius: 2px
			border-top-right-radius: 2px
			h2
				padding-left:8px
				color:#4e4e4e
				font-size:14px
				line-height:32px
				i
					padding-right:8px
			.tool
				height:32px
				line-height:32px
				padding-right:10px
				float:right
				a
					color:#b7b7b7
					font-size:14px
					&:hover
						color:#716c6c
		.portlet-body
			flex:1
			width:100%
			overflow:auto
			overflow-x:hidden
			&>div
				height:100%
		&.fullscreen
			z-index:10000
			position:fixed
			top:0
			left:0
			bottom:0
			right:0
			width:100%
			height:100%
			margin:0px
</style>
