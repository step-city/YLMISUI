<template>
    <yl-selectcontainer    
        :tableConfig="tableSelectConfig"
        :filter="tableSelectfilter"
        :funconfig="tableSelectfunconfig"
        :isSelectClose="isSelectClose"
        @close="_close"
         :dataType="31"
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
                                //{attr: { prop: 'infoCode', label: '材料编码', width:100,  } },   
                                { attr: { prop: 'infoName', label: '材料名称', width: 100, } },
                                { attr: { prop: 'infoModel', label: '规格型号', width: 100, } },
                                { attr: { prop: 'infoUnit', label: '单位', width: 65, } },
                                { attr: { prop: 'quantity', label: '数量', width: 100, scopedSlot: 'quantity', } },
                                { attr: { prop: 'bookPrice', label: '账面价格', width: 100, scopedSlot: 'bookPrice', } },
                                { attr: { prop: 'bookSum', label: '账面金额', width: 100, scopedSlot: 'bookSum', } },
                                { attr: { prop: 'sendPrice', label: '发料价格', width: 100, scopedSlot: 'sendPrice', } },
                                { attr: { prop: 'sendSum', label: '发料金额', width: 100, scopedSlot: 'sendSum', } },
                                { attr: { prop: 'remark', label: '备注', width: 100, scopedSlot: 'remark', } },
                                { attr: { prop: 'barCode', label: '条码', width: 100, } },
                                { attr: { prop: 'storePosition', label: '存放地', width: 100, } },
                                { attr: { prop: 'manufacturer', label: '生产厂商', width: 100, } },
                                { attr: { prop: 'batchNo', label: '炉批号', width: 100, } },
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
                                url: '/api/services/app/deliveryOrder/GetDeliveryOrderItemPageList',
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
