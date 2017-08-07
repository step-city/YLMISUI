<template>
    <yl-panelpage  :titleName="'菜单管理'"  :reloadisShow="false" :fullscreenisShow="true">
        <div slot="content">
            <yl-columnlay>
                <div slot="left"  >
                    <yl-panelzone  :treeLoading="treeLoading" :reloadIsShow="true" @reload="_treeReload" :titleName="'菜单树'" :icon="'icon-tree'" :widthNum="'210px'" >
                        <div slot="content">
                        <el-tree 
                        :data="menuTreeData" 
                        :expand-on-click-node="false" 
                        :render-content="renderContent" 
                        :props="defaultProps" 
                        @node-click="_handleNodeClick" 
                        style="height:100%"></el-tree>
                        </div>
                    </yl-panelzone>
                </div>
                <div slot="right" >
                        <yl-layout >
                        <div slot="fristbox" >
                            <yl-toolbar>
                                     <el-form  :inline="true"  >
                                            <el-form-item class="form-content-vertical">
                                            <el-input  placeholder="菜单功能" size="small" style="width:200px" v-model="searchModel.menuName"></el-input>
                                            </el-form-item>
                                            <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small" @click="_reload">查 询</el-button>
                                            </el-form-item>
                                        </el-form>
                                </yl-toolbar>
                                <yl-toolbar>
                                        <el-button-group>
                                            <el-button type="primary" icon="plus" size="small"    @click="_add">添加</el-button>
                                            <el-button type="primary" icon="edit"  size="small"   :disabled="selectRows.length===0"  @click="_edit">编辑</el-button>
                                            <el-button type="danger"  icon="delete" size="small"  :disabled="selectRows.length===0"  @click="_delete">删除</el-button>
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
                                    <template slot="showFlag" scope="scope">
                                        <el-tag type="primary" v-if="scope.row.showFlag">启用</el-tag>
                                        <el-tag type="danger" v-else>禁用</el-tag>
                                    </template>
                                    <template slot="menuIcon" scope="scope">
                                        <el-tooltip :content="scope.row.menuIcon" placement="top">
                                            <i :class="scope.row.menuIcon"></i>
                                        </el-tooltip>
                                    </template>
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
import Edit from './MenuItemEdit';
import util from 'common/js/util';
import treeMixn from '@/mixns/tree.js';
import {    
            requestGetMenuItemTreeList,
            requestGetMenuItemPageList,
            requestDeleteMenuItem
            
        }   from 'api/menuitem';
import {requestGetMenuAppList} from 'api/login';        
import {inputModel} from 'api/inputmodel';
export default {
       mixins: [treeMixn],
		data() {
			    return {
                tableData: {},
                mainTableLoading:false,
                treeLoading:false,
                selectRows:[],
                currentRows:{},
                menuTreeData:[],
                selectNode:{id:"00000000-0000-0000-0000-000000000000"},
                defaultProps: {
                        children: 'children',
                        label: 'text',
                        id: 'id'
                    },
                searchModel:{
                       menuName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
			};
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
                                {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                                {attr: { prop: 'menuCode', label: '菜单代码', width:120,  } },
                                {attr: { prop: 'menuName', label: '菜单功能', width:150, } },
                                {attr: { prop: 'funcCode', label: '功能代码', width:220} },
                                {attr: { prop: 'sortCode', label: '排序', width:80} },
                                {attr: { prop: 'showFlag', label: '状态',     width:80, scopedSlot: 'showFlag',} },
                                {attr: { prop: 'url',      label: '配置路径', width:220} },
                                {attr: { prop: 'menuIcon', label: '图标', scopedSlot: 'menuIcon',} },
                            ]
                        }
                    }
                }
        },
		methods: {
            _handleNodeClick(result, resolve) {  
                 //点击加载 
                  this.selectNode=result;
                  this._reload();
            },
            _treeReload(){
                this._getGetMenuItemTreeList();
            },
            //一次加载树
            _getGetMenuItemTreeList(){
                let _this=this;
                this.treeLoading=true;
                requestGetMenuItemTreeList().then(data => {
                        if(data.success){
                            this.menuTreeData=util.returnDatabyTree(data.result,'00000000-0000-0000-0000-000000000000');
                        }
                        else {
                            this.$message.error('获取数据失败！'+data.error.message);
                        }
                         this.treeLoading=false;
                    }).catch(function (error) {
                           _this.treeLoading=false;
                    });
            },
            _getMenuItemPageList(){
                let _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"MenuName",op:"LIKE",value:this.searchModel.menuName},
                               {key:"ParentId",op:"EQ",value:this.selectNode.id},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetMenuItemPageList(this.mainInput.inputModel).then(data =>{
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
                this._getMenuItemPageList();
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
                    requestDeleteMenuItem(obj).then(data =>{
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
		        }).catch(function(error){
                        this.$message.error('网络异常！'+error);  
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
        mounted() {
            this._getGetMenuItemTreeList();
            this._reload();
           
        },
        watch:{
        }
	};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

