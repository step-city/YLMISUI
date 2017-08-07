<template>
<yl-panelpage :titleName="'工号管理'" >
<div slot="content">
  <yl-columnlay>
              <div slot="left"  >
                    <yl-ghtreewithpanel   
                        @getCurrentNode="_getCrureentNode"  
                        :placeholder="'请选择'"
                        :nodeStateConf="nodeStateConf"
                        style="width:200px">
                        </yl-ghtreewithpanel>
                </div>
                <div slot="right" >   
                    <yl-layout>
                        <div slot="fristbox" >
                          <yl-toolbar>
                                <el-form  :inline="true"  >
                                        <el-form-item class="form-content-vertical">
                                            <el-input  placeholder="工号名称" size="small" style="width:200px" v-model="searchModel.gHName"></el-input>
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.GHs.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.GHs.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.GHs.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                                    <el-button type="primary"   icon="add" size="small"   @click="_loadTemplate" >导入</el-button>
                                    <el-button type="primary"  class="el-icon-document" size="small"  :disabled="disNode" @click="_copy" >同级复制</el-button>
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
                                        <template slot="isLeaf" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isLeaf">是</el-tag>
                                            <el-tag type="danger" v-else>否</el-tag>
                                        </template>
                                         <template slot="isDelivery" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isDelivery">是</el-tag>
                                            <el-tag type="danger" v-else>否</el-tag>
                                        </template>
                                         <template slot="isCheck" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isCheck">是</el-tag>
                                            <el-tag type="danger" v-else>否</el-tag>
                                        </template>
                                        <template slot="ghName" scope="scope">
                                            {{scope.row.attName+scope.row.ghName}}
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

           <el-dialog ref="tempDialog" title="导入" v-model="addTempFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <LoadGHtemplate @close="_loadClose" :selectNds="selectNode" v-if="addTempFormVisible"></LoadGHtemplate>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './GHEdit';
import LoadGHtemplate from './LoadGHtemplate';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetGHPageList,
            requestDeleteGH,
            requestGetGHTreeList,
            requestIsHasChildrens
        }   from 'api/gh';
import GHTreeWithPanel from 'ocomponents/gh/GHTreeWithPanel'
import {requestExecuteSqlAndProcCommand} from 'api/sqlexecute'
export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                treeLoading:false,
                selectRows:[],
                currentRows:{},
                currentNode:{},
                searchModel:{
                        gHName:'',  
                    },
                addFormVisible:false,
                addTempFormVisible:false,
                mainInput:new inputModel(),
                ghTreeData:[],
                selectNode:{id:""},
                defaultProps: {
                        children: 'children',
                        label: 'text',
                        id: 'id'
                    },
                disNode:true,
                nodeStateConf:[
                    //配置说明
                    // name为标签对应属性 data中必须有值，为布尔类型
                    // text为tag显示值
                    // style为标签显示样式有五中样式 success/danger/primary/waring
                    // leafflag为遇到配置属性是否继续加载(只在逐次加载方式中有效)
                    {name:'isCheck',text:"核",tagflag:true,style:'success',leafflag:false},
                    {name:'isDelivery',text:"发",tagflag:true,style:'primary',leafflag:false},
                ],
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
                               // {attr: { prop: 'parentId', label: '父节点', width:120,  } },   
                               // {attr: { prop: 'gHCode', label: '工号编码', width:120,  } },   
                                // {attr: { prop: 'attName', label: '定语', width:120} },
                                {attr: { prop: 'ghName', label: '名称', width:150,  scopedSlot: 'ghName' } },   
                                {attr: { prop: 'ghFullName', label: '全称', width:220,  } },  
                                {attr: { prop: 'sName', label: '标准工号名称', width:120,  } },   
                               // {attr: { prop: 'sId', label: '标准工号id', width:120,  } },   
                              //  {attr: { prop: 'sCode', label: '标准工号编码', width:120,  } }, 
                              //  {attr: { prop: 'orgId', label: '', width:120,  } },   
                              //  {attr: { prop: 'orgName', label: '', width:120,  } },   
                                {attr: { prop: 'mUnit', label: '计量单位', width:120,  } },   
                                {attr: { prop: 'unitConsume', label: '工程量', width:120,  } },   
                                {attr: { prop: 'isLeaf', label: '子节点', width:120,  scopedSlot: 'isLeaf',align: 'center'} },   
                                {attr: { prop: 'gHState', label: '工号状态', width:120,  } },   
                                {attr: { prop: 'contractCode', label: '合同号', width:120,  } },   
                                {attr: { prop: 'contractQuantity', label: '合同工程量', width:120,  } },   
                                {attr: { prop: 'designQuantity', label: '设计工程量', width:120,  } },   
                                {attr: { prop: 'designDrawNum', label: '设计图纸号', width:120,  } },   
                                {attr: { prop: 'beginDate', label: '开始时间', width:120,  } },   
                                {attr: { prop: 'endDate', label: '结束时间', width:120,  } },   
                                {attr: { prop: 'jobContent', label: '工作内容', width:120,  } },   
                                {attr: { prop: 'isDelivery', label: '是否发料工号', width:120,   scopedSlot: 'isDelivery',align: 'center'} },   
                                {attr: { prop: 'isCheck', label: '是否核算工号', width:120,  scopedSlot: 'isCheck',align: 'center' } },   
                                {attr: { prop: 'description', label: '描述', width:120,  } },   
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
            if(this.selectNode.id==this.guidOfNull()){
                 this.disNode=true;
            }else{
                 this.disNode=false;
            }
            this._reload();
        },
        _getGHPageList(){
            var _this=this;
            this.selectRows=[];
            this.mainTableLoading=true; //开启加载
            var inputArr=[ 
                            {key:"GHName",op:"LIKE",value:this.searchModel.gHName},
                            {key:"ParentId",op:"EQ",value:this.selectNode.id},
                             {key:"OrgId",op:"EQ",value:this.getUserInfo().user.manageOrgId}
                            ];
            this.mainInput.addqueryConditionItem(inputArr);
            requestGetGHPageList(this.mainInput.inputModel).then(data =>{
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
            this._getGHPageList();
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
            var _this=this;
            this.$confirm('删除之前请检查是否存在下级节点，确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
            let params={};
            params.parentId=this.selectRows[0].id;
            requestIsHasChildrens(params).then(data=>{
                if(data.result===false){
                   var obj={}; 
                    obj.id=this.selectRows[0].id;
                    requestDeleteGH(obj).then(data =>{
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
                }
                else{
                    _this.$message.error('失败！还有未删除的子节点~');
                }

            })
            }).catch(()=>{});
        },
        _close(bool){
            if(bool){
                this.addFormVisible=false;
            }
            this._reload();
        },_close(bool){
            if(bool){
                this.addFormVisible=false;
            }
            this._reload();
        },
         _loadClose(){
                this.addTempFormVisible=false;
                this._reload();
        },
        _loadTemplate(){
            this.addTempFormVisible=true;
        },
        _copy(){
            console.log(this.selectNode.id);
            let params={};
            params.procType=1;
            params.firstKeys="Id";
            params.firstValues=this.selectNode.id;
            params.secondKeys="";
            params.secondOperates="";
            params.secondValues="";
            params.procName="C_CopyGH";
            requestExecuteSqlAndProcCommand(params).then(data=>{
                if(data.success){
                            this._reload();
                            this.$notify({
                                title: '成功',
                                message: '复制成功！',
                                type: 'success'
                                });
                        }
                        else {
                            this.$notify.error({
                                title: '错误',
                                message: '复制失败！'+data.error.message,
                                });
                        }
            })
        }

    },
    components:{
         Edit,
         LoadGHtemplate,
         'yl-ghtreewithpanel':GHTreeWithPanel,
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

