<template>
    <div class="cloumnlay" >
        <div class="left-wrapper" v-show="!hiddenLeft" :class="{'left-wrapper-close':isClose}" :style="{ 'width': leftWidth}">
            <slot name="left" >
            </slot>
        </div>
        <div class="shrinkage"  v-show="!hiddenLeft" @click="_showleft"></div>
        <div class="right-wrapper">
            <slot name="right">
            </slot>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    data(){
		return {
            isClose:false
		}
	},
	props:{
		leftWidth:{
            required: false,
            type: String,
            default:'auto'
        },
        hiddenLeft:{
            required: false,
            type: Boolean,
            default:false
        }
	},
    methods:{
        _showleft(){
                this.isClose=!this.isClose;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.cloumnlay
    width:100%
    height:100%
    display:flex
    flex:1
    flex-direction: row
    flex-wrap: nowrap
    align-items:center
    .left-wrapper
        width: auto 
        height:100%
        overflow:auto
        overflow-x:hidden
        &>div
           height:inherit 
    .left-wrapper-close
        width:1px !important
        &>div
            visibility:hidden !important
    .right-wrapper
        height:100%
        flex:1
        overflow:auto
        &>div
           height:inherit 
    .shrinkage
        height:100%
        display:block
        border-left: 1px #ddd solid
        border-right:1px #ddd solid
        flex:0 0 7px
        cursor:pointer
        background:  url(../../common/image/point.png) no-repeat center
        &:hover
            background: #ddd url(../../common/image/point.png) no-repeat center
</style>
