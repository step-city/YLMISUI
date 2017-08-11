<template>
  <section class="finan">
    <!-- 上拉加载更多 -->
    <load-more
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    :bottomPullText='bottomText'
    :auto-fill="false"
    @bottom-status-change="handleBottomChange"
    ref="loadmore">
        <div>
	  <!-- 这里写你需要的另外的模块 -->
      
        </div>
        <div slot="bottom" class="loading" v-loading="loading">
        </div>
    </load-more>
  </section>
</template>

<script type="text/babel" >
 
export default {
        name: 'FinancialGroup',
        props:{
		
        },
        data () {
            return {
                //  上拉加载数据
                scrollHeight: 0,
                scrollTop: 0,
                containerHeight: 0,
                loading: false,
                allLoaded: false,
                bottomText: '上拉加载更多...',
                bottomStatus: '',
                pageNo: 1,
                totalCount: '',
            }
        },
        methods: {
        /* 下拉加载 */
        _scroll: function(ev) {
            ev = ev || event;
            this.scrollHeight = this.$refs.innerScroll.scrollHeight;
            this.scrollTop = this.$refs.innerScroll.scrollTop;
            this.containerHeight = this.$refs.innerScroll.offsetHeight;
        },
        loadBottom: function() {
            this.loading = true;
            this.pageNo += 1;   // 每次更迭加载的页数
            if (this.pageNo == this.totalGetCount) {
                // 当allLoaded = true时上拉加载停止
                this.loading = false;
                this.allLoaded = true;
            }
            api.commonApi(后台接口，请求参数) 
                    .then(res => {
                setTimeout(() => {

 	        //   要使用的后台返回的数据写在setTimeout里面
                  this.$nextTick(() => {
                    this.loading = false;
            	  })
            }, 1000)
         });
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
    }
}
</script>
