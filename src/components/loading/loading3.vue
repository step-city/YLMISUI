<template>
<div class="loading">
  <div class="spinner">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>
  <div class="text">
    {{loadingText}}
  </div>
</div>
</template>

<script type="text/babel">
export default {
  props:{
    loadingText:{
      type:String,
      default:'加载中...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/css" scoped>
.loading{
  font-size: 10px;
  height:100%;
  width:100%;
  background-color:#000;
  opacity:0.5;
}
.loading >.text
{
  color:#fff;
  text-align:center;
  color: #20A0FF;
}

 .spinner {
  width: 60px;
  height: 60px;
  position: relative;
  margin:auto;
  padding-top:15%;
}
 
.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #20A0FF;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
   
  -webkit-animation: bounce 2.0s infinite ease-in-out;
  animation: bounce 2.0s infinite ease-in-out;
}
 
.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
 
@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
