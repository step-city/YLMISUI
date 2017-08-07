<template>
    <yl-querycontainer    
        :tableConfig="this.getItem_tableConfig"
        :filter="this.getItem_selectFilter"
        :funconfig="this.getItem_funConfig"
        >
    </yl-querycontainer>
</template>

<script type="text/babel">
import { mapGetters } from 'vuex';
export default {
    computed: { 
         ...mapGetters([ 'getItem_tableConfig','getItem_selectFilter','getItem_funConfig' ]),
    },
    methods:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
