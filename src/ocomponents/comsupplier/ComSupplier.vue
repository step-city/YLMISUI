<template>
   <el-autocomplete
    popper-class="my-autocomplete"
    v-model="resultVal"
    :fetch-suggestions="querySearchAsync"
    :placeholder="placeholder"
    custom-item="my-item-supplier"
    @select="_select"
    :props="defaultProps"
    :disabled="disabled"
    :size="size"
    :icon="icon"
    :on-icon-click="_clearInput"
    >
    </el-autocomplete>
</template>

<script type="text/babel">
import vue from 'vue'
import {
 requestGetCommonSupplierPageList
} from 'api/commonsupplier';
import  {inputModel} from 'api/inputmodel';

vue.component('my-item-supplier', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'name' } }, [item.supplierName]),
        h('div', { attrs: { class: 'addr' } }, [item.supplierContact]),
        h('div', { attrs: { class: 'addr' } }, [item.supplierPhone])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
});

export default {
  data() {
      return {
        restaurants: [],
        mainInput:new inputModel(),
        timeout:null,
        defaultProps: {
          value: 'supplierName',
          label: 'supplierName'
        },
        manageOrgId:this.getUserInfo().user.manageOrgId,
        resultVal:'',
        icon:'caret-bottom',
      };
    },
    props:{
         orgId:{
                    type:String,
                    default:''
                }, 
         placeholder:{
                    type:String,
                    default:''
                  }, 
         disabled:{
                    type:Boolean,
                    default:false
                  },
        size:{
                    type:String,
                    default:''
        },
         value:{
                    type:String,
                    default:''
                  }, 
    },
    methods: {
      loadAll() {
            var inputArr=[ 
                            {key:"SupplierName",op:"LIKE",value:this.value},
                            {key:"OrgId",op:"EQ",value:this.manageOrgId},
                         ];
            //排序
            this.mainInput.inputModel.sorting="SupplierName asc";
            this.mainInput.inputModel.maxResultCount=10000;
            this.mainInput.addqueryConditionItem(inputArr);
            requestGetCommonSupplierPageList(this.mainInput.inputModel).then(data =>{
                        if(data.success){
                                this.restaurants=data.result.data;
                         }
                        else{
                            this.restaurants=[];
                        }
            })
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          return (state) => {  
                 return (state.supplierName.indexOf(queryString.toLowerCase()) === 0);
          };
      },
      _select(item) {
        //选择事件
        this.$emit('selectNode',item);
        this.$emit('input',item.supplierName);
      },
      _clearInput(){
         this.$emit('input',"");
         this.$emit('clearBack');
         this.resultVal="";
      }
    },
    mounted() {
        if(this.orgId!=''){
            this.manageOrgId=this.orgId;
        }
       this.loadAll();
    },
   components:{
        },
    watch:{
      value:function (val, oldVal) {
           this.resultVal=this.value;
        },
      resultVal:function (val, oldVal) {
          if(val!=''){
             this.icon="close";
           }else{
             this.icon="caret-bottom";
           }
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" >
.my-autocomplete
    li
        line-height:20px
        padding:2px 5px 0px 5px
        .name
            font-size:12px
            text-overflow:ellipsis
            white-space:nowrap 
            overflow:hidden
        .addr
            text-overflow:ellipsis
            white-space:nowrap 
            overflow:hidden
            font-size:12px
            color: #8492A6
</style>

