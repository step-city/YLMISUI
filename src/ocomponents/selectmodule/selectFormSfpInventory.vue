<template>
    <yl-selectcontainer    
        :tableConfig="tableSelectConfig"
        :filter="tableSelectfilter"
        :funconfig="tableSelectfunconfig"
        :isSelectClose="isSelectClose"
        :dataType="91"
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
                                {attr: { prop: 'sInfoCode', label: '材料编码', width:120,  } },   
                                {attr: { prop: 'sInfoName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'sInfoModel', label: '规格型号', width:120,  } },   
                                {attr: { prop: 'sInfoUnit', label: '单位', width:120,  } },   
                                {attr: { prop: 'barCode', label: '条码', width:120,  } },   
                                {attr: { prop: 'storeNum', label: '数量', width:120,  } },     
                                {attr: { prop: 'productDate', label: '生产时间', width:120,  } },   
                                {attr: { prop: 'productTeam', label: '生产班组', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注',  } },   
                        ]
                    }
                }
            },
        //过滤器配置
        tableSelectfilter:{
             get () {
                  return {
                          formConfig:[
                            {val: '', type:'input',name:'SInfoName',op:"LIKE",
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
                             {val: '', type:'input',name:'SInfoModel',op:"LIKE",
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
                                url: '/api/services/app/sFProductInventory/GetSFProductInventoryPageList',
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
