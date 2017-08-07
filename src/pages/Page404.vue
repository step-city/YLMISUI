<template>
  <div style="background:#f0f2f5;height:100%">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="../common/image/404.png" alt="404">
        <img class="pic-404__child left" src="../common/image/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="../common/image/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="../common/image/404_cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info"><a class='link-type' href='https://yearrow.com' target='_blank'>西安易龙软件</a></div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <div @click="_goHome" class="bullshit__return-home">返回首页</div>

      </div>
    </div>
  </div>
</template>

<script type="text/babel">

export default {
       data(){
           return{
               dialogVisible:false,
           }
       },
       computed: {
        message() {
            return '很抱歉，页面君离家出走了......'
            }
        },
        methods:{
            _goHome(){
                console.log('sdsdsd');
              this.$router.push({ path:'/home'});
            } ,
            handleClose(){
                
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wscn-http404
    width: 100%;
    height:100%;
    overflow: hidden;
    .pic-404
        float: left;
        width: 600px;
        height:100%;
        padding-top:150px;
        overflow: hidden;
        .pic-404__parent
            width:100%
        .pic-404__child.left
            width: 80px;
            top: 17px;
            left: 220px;
            opacity: 0;
            animation-name: cloudLeft;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1s; 
        .pic-404__child&.mid
            width: 46px;
            top: 10px;
            left: 420px;
            opacity: 0;
            animation-name: cloudMid;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1.2s;
        .pic-404__child&.right
            width: 62px;
            top: 100px;
            left: 500px;
            opacity: 0;
            animation-name: cloudRight;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            animation-delay: 1s;
    .bullshit
        position: relative;
        float: left;
        width: 300px;
        height:100%;
        padding-top:150px;
        overflow: hidden;
        .bullshit__oops
            font-size: 32px;
            font-weight: 700;
            line-height: 40px;
            color:#1482f0;
            opacity: 1;
            margin-bottom: 20px;
            animation-name: slideUp;
            animation-duration: .5s;
            animation-fill-mode: forwards;
        .bullshit__info
            font-size: 13px;
            line-height: 21px;
            color: grey;
            opacity: 1;
            margin-bottom: 30px;
            animation-name: slideUp;
            animation-duration: .5s;
            animation-delay: .2s;
            animation-fill-mode: forwards;
        .bullshit__headline
            font-size: 20px;
            line-height: 24px;
            color: #1482f0;
            opacity: 1;
            margin-bottom: 10px;
            animation-name: slideUp;
            animation-duration: .5s;
            animation-delay: .1s;
            animation-fill-mode: forwards;
        .bullshit__return-home
            display: block;
            float: left;
            width: 110px;
            height: 36px;
            background: #1482f0;
            border-radius: 100px;
            text-align: center;
            color: #fff;
            opacity: 1;
            font-size: 14px;
            line-height: 36px;
            cursor: pointer;
            animation-name: slideUp;
            animation-duration: .5s;
            animation-delay: .3s;
            animation-fill-mode: forwards;
</style>
