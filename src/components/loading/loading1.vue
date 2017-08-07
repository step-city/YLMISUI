<template>
<div class="loading">
  <div class="spinner">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>   
    <div class="rect5"></div>
    <p class="text"> {{loadingText}}</p>
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
var json={
  name:'json',
  getName:function(){
     return this.name;   
  }
}
var s=JSON.stringify(json, function(key, val) {
  if (typeof val === 'function') {
    return val + '';
  }
  return val;
});
console.log(s);

var s={"name":"json","getName":"function (){\n     return this.name;   \n  }"};
JSON.parse(s,function(k,v){

  if(v.indexOf&&v.indexOf('function')>-1){

     return eval("(function(){return "+v+" })()")

  }

  return v;

});
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/css" scoped>
.loading{
  font-size: 10px;
  height:100%;
  width:100%;
}
.loading >.text
{
  color:#20A0FF;
  text-align:center;
}
.spinner {
  margin:auto;
  padding-top:15%;
  width: 50px;
  height:60px;
}
.spinner > div {
  background-color: #20A0FF;
  height: 100%;
  width: 6px;
  display: inline-block;
   
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>
