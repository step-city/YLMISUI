<template>
    <yl-loading1 v-if="type=='l1'" :loadingText="loadingText" ></yl-loading1>
    <yl-loading2 v-else-if="type=='l2'" :loadingText="loadingText" ></yl-loading2>
    <yl-loading3 v-else-if="type=='l3'" :loadingText="loadingText" ></yl-loading3>
    <yl-loading4 v-else-if="type=='l4'" :loadingText="loadingText" ></yl-loading4>
    <yl-loading5 v-else-if="type=='l5'" :loadingText="loadingText" ></yl-loading5>
    <yl-loading6 v-else-if="type=='l6'" :loadingText="loadingText" ></yl-loading6>
    <yl-loading7 v-else-if="type=='l7'" :loadingText="loadingText"></yl-loading7>
    <yl-loading8 v-else-if="type=='l8'" :loadingText="loadingText"></yl-loading8>
</template>
<script type="text/babel">
import loading1 from './loading1';
import loading2 from './loading2';
import loading3 from './loading3';
import loading4 from './loading4';
import loading5 from './loading5';
import loading6 from './loading6';
import loading7 from './loading7';
import loading8 from './loading8';
export default {
  props:{
    loadingText:{
      type:String,
      default:'加载中...'
    },
    type:{
      type:String,
      default:'l1'
    }
  },
  components:{
    'yl-loading1':loading1,
    'yl-loading2':loading2,
    'yl-loading3':loading3,
    'yl-loading4':loading4,
    'yl-loading5':loading5,
    'yl-loading6':loading6,
    'yl-loading7':loading7,
    'yl-loading8':loading8,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/css" scoped>
</style>
