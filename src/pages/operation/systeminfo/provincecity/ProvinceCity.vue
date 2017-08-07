<template>
<yl-panelpage :titleName="'省市管理'" >
<div slot="content">
  <yl-columnlay>
              <div slot="left">
                    <yl-panelzone  :titleName="'区域树'" :icon="'icon-tree'"  @reload="_treeReload" :reloadIsShow="true" :widthNum="'210px'" >
                        <div slot="content">
                            <el-tree :data="provinceCityTreeData" 
                               :render-content="renderContent" 
                                 :expand-on-click-node="false" 
                                  :props="defaultProps"
                                   @node-click="_handleNodeClick"
                                    style="height:100%">
                              </el-tree>
                        </div>
                    </yl-panelzone>
                </div>
                <div slot="right" >
                    <yl-layout>
                        <div slot="fristbox" >
                          <yl-toolbar>
                                <el-form  :inline="true"  >
                                        <el-form-item class="form-content-vertical">
                                  <el-input  placeholder="名称查询" size="small" style="width:200px" v-model="searchModel.fullName"></el-input>  
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary"  v-permissionSetting="'Pages.System.Data.ProvinceCitys.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                                    <el-button type="primary"  v-permissionSetting="'Pages.System.Data.ProvinceCitys.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"   v-permissionSetting="'Pages.System.Data.ProvinceCitys.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                                </el-button-group>
                        </yl-toolbar>
                        </div>
                         <div slot="secondbox" class="flexbox">
                                <yl-table ref="table"
                                    @reload="_reload"
                                    @current-change="_currentChange"
                                    :configs="tableConfig" 
                                    :input="mainInput.inputModel"
                                    :tableloading="mainTableLoading" 
                                    >
                                </yl-table>
                         </div>
                          </yl-layout>
                     </div>
     </yl-columnlay>
   
    <!--编辑界面-->
         <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import treeMixn from '@/mixns/tree.js';
import Edit from './ProvinceCityEdit';
import util from 'common/js/util';
import  {inputModel} from 'api/inputmodel';
import {
           requestGetProvinceCityPageList,
           requestDeleteProvinceCity,
           requestGetProvinceCityTreeList
       }from 'api/provincecity';
export default {
     mixins: [treeMixn],
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                    fullName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
                provinceCityTreeData: [],
                selectNode:{id:"00000000-0000-0000-0000-000000000000"},
                defaultProps: {
                        children: 'children',
                        label: 'text',
                        id: 'id'
                    },
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
                                //{attr: { prop: 'nodeCode', label: '编码', width:240,  } },
                                {attr: { type: 'index',label: '序号', width:80, }},   
                                {attr: { prop: 'fullName', label: '名称', width:100,  } },   
                                {attr: { prop: 'category', label: '单位', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', } },    
                                {attr: { prop: 'sortCode', label: '排序', width:80,  } }, 
                            ]
                        }
                    }
                }
        },
    methods:{
        _handleNodeClick(result, resolve) {  
                 //点击加载 
                  this.selectNode=result;
                  this._reload();
            },
          _getProvinceCityTreeList(){
             let obj={}
            requestGetProvinceCityTreeList(obj).then(data => {
                           if(data.success){
                                 this.provinceCityTreeData=data.result;
                             }
                             else {
                                this.$message.error('获取数据失败！'+data.error.message);
                             }
                        });
        },
       _getProvinceCityPageList(){
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                              {key:"FullName",op:"LIKE",value:this.searchModel.fullName},
                              {key:"ParentId",op:"EQ",value:this.selectNode.id},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetProvinceCityPageList(this.mainInput.inputModel).then(data =>{
                            if(data.success){
                                this.tableData=data.result;
                                }
                            else {
                                this.$message.error('失败！'+data.error.message);
                            }
                          this.mainTableLoading=false;
                }).catch(function(error){
                       this.mainTableLoading=false;
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
            this._getProvinceCityPageList();
        },
        _add(){
            this.addFormVisible=true;
            this.currentRows={};
        },
        _edit(){
                this.addFormVisible=true;
                this.currentRows=this.selectRows[0];
        },
        _treeReload(){
            this._getProvinceCityTreeList();
        },
        _delete(){
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
                var obj={}; 
                obj.id=this.selectRows[0].id;
                requestDeleteProvinceCity(obj).then(data =>{
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
      this._getProvinceCityTreeList();
      this._reload();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

