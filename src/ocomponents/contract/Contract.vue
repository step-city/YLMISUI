<template>
   <el-autocomplete
    popper-class="my-autocomplete"
    v-model="resultVal"
    :fetch-suggestions="querySearchAsync"
    :placeholder="placeholder"
    custom-item="my-item-contract"
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
 requestGetContractOrderPageList
} from 'api/materials/contractorder';
import  {inputModel} from 'api/inputmodel';
vue.component('my-item-contract', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'name' } }, [item.contractCode]),
        h('div', { attrs: { class: 'addr' } }, [item.supplierName]),
        h('div', { attrs: { class: 'addr' } }, [item.awardDate])
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
          value: 'ContractCode',
          label: 'ContractCode'
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
        supplierId:{
                    type:String,
                    default:''
        },
        value:{
                  type:String,
                  default:''
                }, 
        
    },
    methods: {
      loadAll(supid) {
            var inputArr=[ 
                            {key:"ContractCode",op:"LIKE",value:this.value},
                            {key:"OrgId",op:"EQ",value:this.manageOrgId},
                         ];
            if(supid!=""){
                inputArr.push({key:"SupplierId",op:"EQ",value:supid},
                            {key:"IsAudit",op:"EQ",value:1},);
            }
            //排序
            this.mainInput.inputModel.sorting="OrderCode asc";
            this.mainInput.inputModel.maxResultCount=10000;
            this.mainInput.addqueryConditionItem(inputArr);
            requestGetContractOrderPageList(this.mainInput.inputModel).then(data =>{
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
                 return (state.contractCode.indexOf(queryString.toLowerCase()) === 0);
          };
      },
      _select(item) {
        //选择事件
        this.$emit('selectNode',item);
        this.$emit('input',item.contractCode);
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
       this.loadAll(this.supplierId);
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

