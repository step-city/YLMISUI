<template>
    <yl-selectcontainer    
        :tableConfig="tableSelectConfig"
        :filter="tableSelectfilter"
        :funconfig="tableSelectfunconfig"
        :isSelectClose="isSelectClose"
        :dataType="90"
        @close="_close"
        >
    </yl-selectcontainer>
</template>

<script type="text/babel">
export default {
    props:{
        isSelectClose:{
            type:Boolean,
            default:false,
        }
    },
    computed: { 
        //表格配置
        tableSelectConfig:{
                get () {
                    return {
                        table: {
                            attr: {
                                data:{},
                                highlightCurrent:false,
                                style:{width:'100%',height:'300px'},
                            }
                        },
                        columns: [
                                   {attr: { type: 'selection',width:55, }},  
                                {attr: { prop: 'infoName', label: '材料名称', width:100,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:100,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:100,  } },   
                               // {attr: { prop: 'cId', label: '', width:100,  } },   
                                {attr: { prop: 'classNodebh', label: '类别编码', width:100,  } },   
                                {attr: { prop: 'quantity', label: '数量', width:100,  } },   
                                {attr: { prop: 'conversionRate', label: '转换率', width:100,  } },   
                                {attr: { prop: 'quantityScd', label: '数量2', width:100,  } },   
                                {attr: { prop: 'conversionRateScd', label: '转换率2', width:100,  } },   
                                {attr: { prop: 'quantityTrd', label: '数量3', width:100,  } },   
                                {attr: { prop: 'remark', label: '备注',   } },   
                        ]
                    }
                }
            },
        //过滤器配置
        tableSelectfilter:{
             get () {
                  return {
                          formConfig:[
                            {val: '', type:'input',name:'InfoName',op:"LIKE",
                                elmentConfig:{
                                    maxlength:1000000, 
                                    minlength:0,
                                    size:"small",
                                    disabled:false,
                                    type:"text",
                                    placeholder:"请输入材料名称",
                                    icon:"",
                                    readonly:false,
                                }, 
                            },
                             {val: '', type:'input',name:'InfoModel',op:"LIKE",
                                elmentConfig:{
                                    maxlength:1000000, 
                                    minlength:0,
                                    size:"small",
                                    disabled:false,
                                    type:"text",
                                    placeholder:"请输入规格型号",
                                    icon:"",
                                    readonly:false,
                                }, 
                            },
                            ],
                            _inputArr:[
                                {key:"OrgId",op:"EQ",value:this.getUserInfo().user.manageOrgId}
                            ],
                  }
             }
         },
        //功能配置
        tableSelectfunconfig:{
            get(){
                return {
                    funItem:{
                         loadData:{  
                            apiconf:{
                                url: '/api/services/app/turnoverReceiveOrder/GetTurnoverReceiveOrderItemPageList',
                                method: 'post',
                                data: {}
                            }, 
                         },
                    }
                }
            }
        }
    },
    methods:{
         _close(){
            this.$emit('close');
       },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
