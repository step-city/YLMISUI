<template>
<div class="loading">
  <div class="spinner">
    <div class="dot1"></div>
    <div class="dot2"></div>
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
  flex:1;
}
.loading >.text
{
  color:#fff;
  text-align:center;
  color: #20A0FF;
}
 .spinner {
  margin:auto;
  padding-top:15%;
  width: 90px;
  height: 90px;
  position: relative;
  text-align: center;
   
  -webkit-animation: rotate 2.0s infinite linear;
  animation: rotate 2.0s infinite linear;
}
 
.dot1, .dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color:#20A0FF;
  border-radius: 100%;
   
  -webkit-animation: bounce 2.0s infinite ease-in-out;
  animation: bounce 2.0s infinite ease-in-out;
}
 
.dot2 {
  top: auto;
  bottom: 0px;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
@-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg) }}
@keyframes rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
 
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
