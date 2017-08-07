<template>
    <yl-selectcontainer    
        :tableConfig="tableSelectConfig"
        :filter="tableSelectfilter"
        :funconfig="tableSelectfunconfig"
        :isSelectClose="isSelectClose"
        :dataType="1"
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
        },
        filterInfo:{
            type:Object,
            default:{}
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
                                {attr: { prop: 'infoName', label: '名称', width:120,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:120,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:120,  } },   
                                {attr: { prop: 'bookPrice', label: '价格', width:100,  } },   
                                {attr: { prop: 'storeNum', label: '数量', width:100,  } },
                                {attr: { prop: 'cardNumber', label: '记证号', width:130,  } },   
                                {attr: { prop: 'reportNumber', label: '试验报告号', width:130,  } },   
                                {attr: { prop: 'qualifyFile', label: '质量证明文件', width:150,  } },   
                                {attr: { prop: 'delegateNo', label: '试验委托号', width:130,  } },
                                {attr: { prop: 'ySResult', label: '结果', width:130,  } },      
                                {attr: { prop: 'remark', label: '备注', width:120,  } }, 
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
                                 {key:"OrgId",op:"EQ",value:this.getUserInfo().user.manageOrgId},
                                 {key:"IsAudit",op:"EQ",value:1},
                                 {key:"SupplierId",op:"EQ",value:this.filterInfo.supplierId},
                                 {key:"ContractId",op:"EQ",value:this.filterInfo.contractId},
                                 {key:"StoreNum",op:"GT",value:0}
                            ],
                            sorting:"ItemId"

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
                                url: '/api/services/app/requistionInOrder/GetRequistionInOrdersAndItemsPageList',
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
