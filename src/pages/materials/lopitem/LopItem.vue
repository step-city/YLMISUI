<template>
<yl-panelpage :titleName="'机楼数据'" >
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
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
    <!--编辑界面-->
         <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './LopItemEdit';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetLopItemPageList,
            requestDeleteLopItem
        }   from 'api/materials/lopitem';

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
                                {attr: { prop: 'station', label: '站点', width:120,  } },   
                                {attr: { prop: 'proLine', label: 'proLine', width:120,  } },   
                                {attr: { prop: 'taskNo', label: '施工部位', width:120,  } },   
                                // {attr: { prop: 'reciepeNo', label: 'reciepeNo', width:120,  } },   
                                // {attr: { prop: 'morReciepe', label: 'morReciepe', width:120,  } },   
                                // {attr: { prop: 'scheduleID', label: 'scheduleID', width:120,  } },   
                                {attr: { prop: 'projName', label: '项目部名称', width:120,  } },   
                                {attr: { prop: 'consPos', label: '施工内容', width:120,  } },   
                                // {attr: { prop: 'pour', label: 'pour', width:120,  } },   
                                {attr: { prop: 'betLev', label: '规格', width:120,  } },   
                                // {attr: { prop: 'lands', label: 'lands', width:120,  } },   
                                // {attr: { prop: 'vehicle', label: 'vehicle', width:120,  } },   
                                // {attr: { prop: 'driver', label: 'driver', width:120,  } },   
                                {attr: { prop: 'planMete', label: '计划量', width:120,  } },   
                                {attr: { prop: 'prodMete', label: '生产量', width:120,  } },   
                                {attr: { prop: 'morMete', label: 'morMete', width:120,  } },   
                                {attr: { prop: 'pieCnt', label: 'pieCnt', width:120,  } },   
                                {attr: { prop: 'operator', label: 'operator', width:120,  } },   
                                // {attr: { prop: 'qualitor', label: 'qualitor', width:120,  } },   
                                // {attr: { prop: 'pieceID', label: 'pieceID', width:120,  } },   
                                // {attr: { prop: 'datTim', label: 'datTim', width:120,  } },   
                                // {attr: { prop: 'genTim', label: 'genTim', width:120,  } },   
                                // {attr: { prop: 'serial', label: 'serial', width:120,  } },   
                                {attr: { prop: 'bldTim', label: 'bldTim', width:120,  } },   
                                {attr: { prop: 'pieAmnt', label: 'pieAmnt', width:120,  } },   
                                // {attr: { prop: 'dosageID', label: 'dosageID', width:120,  } },   
                                // {attr: { prop: 'material', label: 'material', width:120,  } },   
                                {attr: { prop: 'mName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'mCode', label: '材料编码', width:120,  } },   
                                {attr: { prop: 'watFull', label: 'watFull', width:120,  } },   
                                {attr: { prop: 'planAmnt', label: '计划量', width:120,  } },   
                                {attr: { prop: 'factAmnt', label: '生产量', width:120,  } },   
                                // {attr: { prop: 'isAlert', label: 'isAlert', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', width:120,  } },   
                                {attr: { prop: 'createDate', label: '日期', width:120,  } },   
                                // {attr: { prop: 'sortCode', label: '排序'} },
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
                var inputArr=[ 
                             //  {key:"AppName",op:"LIKE",value:this.searchModel.appName},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetLopItemPageList(this.mainInput.inputModel).then(data =>{
                            if(data.success){
                                this.tableData=data.result;
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
        _add(){
            this.addFormVisible=true;
            this.currentRows={};
        },
        _edit(){
                this.addFormVisible=true;
                this.currentRows=this.selectRows[0];
        },
        _delete(){
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
                var obj={}; 
                obj.id=this.selectRows[0].id;
                requestDeleteLopItem(obj).then(data =>{
                        if(data.success){
                                this._reload();
                                this.$notify({
                                    title: '成功',
                                    message: '删除数据成功！',
                                    type: 'success'
                                    });
                            }
                            else {
                                this.$notify.error({
                                    title: '错误',
                                      message: '删除数据失败！'+data.error.message,
                                    });
                            }
                });
            });
        },
        _close(){
                this.addFormVisible=false;
                this._reload();
        },

    },
    components:{
         Edit,
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

