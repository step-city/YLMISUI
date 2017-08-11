<template>
<div class="toolbar"> 
    <slot>
    </slot>
</div>
</template>

<script type="text/babel">
export default {
    name:'yl-toolbar',
    data(){
		return {
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .toolbar
        background: url(../../common/image/search_bg.png);
        padding-left: 10px
        height: 34px
        display: flex
        align-items: center
</style>
