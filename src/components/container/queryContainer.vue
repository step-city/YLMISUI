<template>
    <yl-layout :border="true">
            <div slot="fristbox">
                <yl-toolbar>
                        <el-form :inline="true"  >
                                <el-form-item class="form-content-vertical" v-for="item in filter.formConfig" :key="item.id">
                                         <yl-renderComs :option="item"></yl-renderComs>
                                </el-form-item>
                                <el-form-item class="form-content-vertical">
                                      <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                </el-form-item>
                        </el-form>
                </yl-toolbar>
            </div>
            <div slot="secondbox" class="flexbox">  
                <yl-table ref="querytable" 
                        @reload="_reload"
                        @current-change="_currentChange"
                        @row-click="toggleRowSelection"
                        :configs="tableConfig" 
                        :input="mainInput.inputModel"
                        :tableloading="mainTableLoading"  
                        >
                </yl-table>
            </div>
        </yl-layout>
</template>

<script type="text/babel">
import {inputModel} from 'api/inputmodel';
import fetch from  'api/fetch';
export default {
    name:'yl-querycontainer',
    data(){
        return {
             selectRows:[],
             mainInput:new inputModel(),
             mainTableLoading:false,
        }
    },
    props:{
        //表格配置
        tableConfig:{
            require:true,
            type:Object
        },
        //筛选器配置
        filter:{
            required: false,
            type: Object,
            default: {}
        },
        //功能配置
        funconfig:{
            required: false,
            type: Object,
            default: {}
        },
    },
    methods:{
         _currentChange(val){
                //单选时的方法
                if(val!=null){
                     this.selectRows=[];
                     this.selectRows.push(val);
                }
            },
       _selectionChange(val){
           //多选方法
            if(val!=null){
                this.selectRows=[];
                this.selectRows=this.selectRows.concat(val);
            }
       },
       toggleRowSelection (row) {
            this.$refs.querytable.toggleRowSelection(row)
        },
       _reload(){
           this._loadData();
       },
       _loadData(){
            let _this=this;
            this.mainTableLoading=true;
            let inputArr=[];
            this.filter.formConfig.map((item,index)=>{
                let obj={};
                obj.key=item.name;
                obj.op=item.op;
                obj.value=item.val;
                inputArr.push(obj)
            });
            inputArr.push(...this.filter._inputArr);
            this.mainInput.addqueryConditionItem(inputArr);
            let apiconf=this.funconfig.funItem.loadData.apiconf;
            apiconf.data=this.mainInput.inputModel;
            fetch(apiconf).then(data=>{
                            if(data.success){
                                    this.tableConfig.table.attr.data=data.result;
                                }
                            else {
                                    this.$message.error('失败！'+data.error.message);
                            }
                            this.mainTableLoading=false;
                    }).catch(function(error){
                        _this.mainTableLoading=false;
                        _this.$message.error('获取数据失败！');
                    });
       },
    },
    components:{
     },
    mounted(){
        this._reload();
    }
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
