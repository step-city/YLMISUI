<template>
<div   v-loading="treeLoading"  element-loading-text="加载中..."    class="portlet " ref="portlet"  :class="{'fullscreen':fullScreen}" :style="{'width': widthNum,'height': heightNum}"> 
		<div class="portlet-title" :style="{'background':_getBgColor(theme)}">
			<div class="tool">
				<a class="reload" v-if="reloadIsShow" @click="_reload"><i class="icon-spinner11"></i></a>
				<a class="fullscreen" v-if="fullScreenIsShow" @click="_openByfullScreen"><i :class="fullScreenIcon"></i></a>
			</div>
			<h2><i :class="icon" ></i>{{titleName}}</h2>
		</div>
		<div class="portlet-body"   :style="{ 'background-color':_getBgColor(theme)}">
			<slot name="content">
			</slot>
		</div>
</div>
</template>

<script type="text/babel">
export default {
	name:'yl-panelzone',
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
            default:false
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
			default:''
			},
		theme:{
			required: false,
            type: String,
			default:''
			},
		treeLoading:{
			required: false,
            type: Boolean,
			default:false
			},
	},
	methods:{
		_openByfullScreen() {
			this.fullScreen=!this.fullScreen;
			if(this.fullScreen)
			{
				this.fullScreenIcon='icon-shrink';
			}
			else{
				this.fullScreenIcon='icon-enlarge';
				
			}
		},
		_getBgColor(str){
			if(this.theme==="primary"){return "#F0FFF0";}
			else if(this.theme==="info"){return "#FDFFFF";}
			else if(this.theme==="success"){return "#EEE";}
			else if(this.theme==="warning"){return "#FFFFF4";}
			else if(this.theme==="danger"){return "#FFFAF4";}
			else{return "";}
			
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
		border-radius: 1px
		display:flex
		flex-direction:column;	
		border-left:1px #ddd solid
		border-right:1px #ddd solid
		.portlet-title
			height:26px
			min-height:26px
			padding-left:10px
			border-top:1px #ddd solid
			border-bottom:1px #ddd solid
			background: url(../../common/image/th_sec.png)
			h2
				padding-left:8px
				color:#4e4e4e
				font-size:13px
				line-height:26px
				i
					padding-right:8px
			.tool
				height:24px
				line-height:24px
				padding-right:10px
				float:right
				a
					color:#b7b7b7
					font-size:13px
					&:hover
						color:#716c6c
		.portlet-body
			flex:1
			background-color:#fff
			border-bottom:1px #ddd solid
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
