<template>
<yl-panelpage :titleName="'混凝土节超分析'" >
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                            <el-date-picker  
                                v-model="orderDate" 
                                type="month" 
                                size="small"
                                :editable="false"
                                placeholder="选择月份">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                     <!--定义过滤条件    <el-input  placeholder="提示名称" size="small" style="width:200px" v-model="searchModel.appName"></el-input>  -->
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        <!--<yl-toolbar>
            <el-button-group>
                    <el-button type="primary" v-permissionSetting="'Materials.Analyze.Concrete.LopItem.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                    <el-button type="primary" v-permissionSetting="'Materials.Analyze.Concrete.LopItem.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                    <el-button type="danger"  v-permissionSetting="'Materials.Analyze.Concrete.LopItem.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                </el-button-group>
        </yl-toolbar>-->
        </div>
         <div slot="secondbox" class="flexbox">
                <yl-table ref="table"
                    @reload="_reload"
                    @current-change="_currentChange"
                    :configs="tableConfig" 
                    :input="mainInput.inputModel"
                    :tableloading="mainTableLoading" 
                    >
                   <!--自定义列模板
                        <template slot="isDisable" scope="scope">
                            <el-tag type="primary" v-if="scope.row.showFlag">启用</el-tag>
                            <el-tag type="danger" v-else>禁用</el-tag>
                        </template>
                        -->
                </yl-table>
         </div>
    </yl-layout>

 </div>
</yl-panelpage>
</template>

<script type="text/babel">

import  {inputModel} from 'api/inputmodel';
import {requestGetConcreteAnalyzeList}from 'api/materials/materialsanalyze'
export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                     //  appName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
                orderDate:new Date()
            }
    },
     computed: {
            tableConfig: {
                    get () {
                        return {
                            table: {
                                attr: {
                                    data: this.tableData,
                                    highlightCurrent:true,
                                }
                            },
                            columns: [
                                // {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                                // {attr: { prop: 'orgId', label: '', width:120,  } },   
                                {attr: { prop: 'infoName', label: '材料名称', width:150,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:150,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:120,  } },   
                                {attr: { prop: 'planQuantity', label: '计划数量', width:150,  } },  
                                {attr: { prop: 'accDeliveryQuantity', label: '开累发料数量', width:150,  } },   
                                {attr: { prop: 'currDeliveryQuantity', label: '当月发料数量', width:150,  } },   
                                {attr: { prop: 'jcQuantity', label: '节超数量', width:150,  } },   
                                {attr: { prop: 'jcRateStr', label: '节超率'  } },    
                                
                            ]
                        }
                    }
                }
        },
    methods:{
        _getLopItemPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                let params={};
                params.orgId=this.getUserInfo().user.manageOrgId;
                params.beginDate=this.formatDate(this.orderDate,"YYYY-MM") ;
                requestGetConcreteAnalyzeList(params).then(data =>{
                            if(data.success){
                                 let obj={};
                                obj.data=data.result;
                                obj.draw=1;
                                obj.recordsFiltered=obj.data.length;
                                obj.recordsTotal=obj.data.length;
                                this.tableData=obj;
                                }
                            else {
                                 this.$message.error('失败！'+data.error.message);
                            }
                          this.mainTableLoading=false;
                }).catch(function(error){
                       _this.mainTableLoading=false;
                });
        },
        _currentChange(val){
                //单选时的方法
                if(val!=null){
                     this.selectRows=[];
                     this.selectRows.push(val);
                }
               
            },
        _selectionChange(val){
            //多选时的方法
            if(val!=null){
                this.selectRows=[];
                this.selectRows=this.selectRows.concat(val);
            }
        },
        toggleRowSelection (row) {
            this.$refs.table.toggleRowSelection(row)
        },
        _reload(){
            this._getLopItemPageList();
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

