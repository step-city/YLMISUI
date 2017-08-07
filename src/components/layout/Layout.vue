<template>
    <div class="layout" :class="{'border':border}" :style="{ 'flex-direction': direction}">
        <slot name="fristbox">
        </slot>
        <slot name="secondbox" >
        </slot>
    </div>
</template>

<script type="text/babel">
export default {
    props:{
        direction:{
            required: false,
            type: String,
            default:'column'
        },
        border:false
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.layout
    display:flex
    height:100%
    width:100%
    &.border
        border: 1px dotted rgb(191, 203, 217)
        box-sizing: border-box
    .flexbox
        flex:1
</style>
