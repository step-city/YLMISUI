<template>
<yl-panelpage :titleName="'材料类别'" >
<div slot="content">
  <yl-columnlay>
              <div slot="left"  >
                             <yl-materialClassTreeWithPanel   
                                @getCurrentNode="_getCrureentNode"  
                                :placeholder="'请选择'"  
                                style="height:100%">
                                </yl-materialClassTreeWithPanel>
                </div>
                <div slot="right" >
                    <yl-layout>
                        <div slot="fristbox" >
                          <yl-toolbar>
                                <el-form  :inline="true"  >
                                        <el-form-item class="form-content-vertical">
                                            <el-input  placeholder="类别名称" size="small" style="width:200px" v-model="searchModel.name"></el-input>  
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.MaterialClasss.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.MaterialClasss.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.MaterialClasss.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
                                  
                                        <template slot="isCheck" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isCheck">是</el-tag>
                                            <el-tag type="danger" v-else>否</el-tag>
                                        </template>
                                         <template slot="isPlan" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isPlan">是</el-tag>
                                            <el-tag type="danger" v-else>否</el-tag>
                                        </template>
                                        <template slot="isLeaf" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isLeaf">是</el-tag>
                                            <el-tag type="danger" v-else>否</el-tag>
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
import Edit from './MaterialClassEdit';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetMaterialClassPageList,
            requestDeleteMaterialClass,
        }   from 'api/materialclass';
import materialClassTreeWithPanel from 'ocomponents/materialclass/materialClassTreeWithPanel'

export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                treeLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                       name:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
                materialClassTreeData:[],
                selectNode:{id:""},
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
                                {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                                //{attr: { prop: 'parentId', label: '父节点', width:120,  } },   
                               //{attr: { prop: 'classNodeBh', label: '自动生成编码', width:120,  } },   
                                {attr: { prop: 'classCode', label: '类别编码', width:120,  } },   
                                {attr: { prop: 'name', label: '类别名称', width:120,  } },   
                                {attr: { prop: 'isCheck', label: '是否核算', width:120,scopedSlot: 'isCheck',align: 'center'  } }, 
                                {attr: { prop: 'isLeaf', label: '是否子节点', width:120,scopedSlot: 'isLeaf',align: 'center'  } },   
                                {attr: { prop: 'isPlan', label: '是否计划', width:120,  scopedSlot: 'isPlan',align: 'center'} },     
                                {attr: { prop: 'remark', label: '备注', width:120,  } },   
                                {attr: { prop: 'sortCode', label: '排序'} },
                            ]
                        }
                    }
                }
        },
    methods:{
        _getCrureentNode(val){
           this.selectNode=val;
           this._reload();
        },
        _getMaterialClassPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"Name",op:"LIKE",value:this.searchModel.name},
                                {key:"ParentId",op:"EQ",value:this.selectNode.id},
                                {key:"IsStatic",op:"EQ",value:false},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetMaterialClassPageList(this.mainInput.inputModel).then(data =>{
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
            this._getMaterialClassPageList();
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
                requestDeleteMaterialClass(obj).then(data =>{
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
            })
        },
        _close(bool){
            if(bool){
                this.addFormVisible=false;
            }
            this._reload();
        }
    },
    components:{
         Edit,
         'yl-materialClassTreeWithPanel':materialClassTreeWithPanel,
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

