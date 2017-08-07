<template>
<yl-panelpage :titleName="'材料信息'" >
<div slot="content">
  <yl-columnlay>
                <div slot="left" >
                    <yl-materialClassTreeWithPanel   
                            @getCurrentNode="_handleNodeClick"  
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
                                             <el-input  placeholder="材料名称" size="small" style="width:200px" v-model="searchModel.infoName"></el-input>  
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group  ref="funtoolbar" >
                                <el-button v-for="(item,index) in funBtnConf" 
                                    :type="item.type" 
                                    :name="item.name" 
                                    :size="item.size" 
                                    v-permissionSetting="item.permissionSetting"
                                    v-show="item.isShow"
                                    :disabled="item.disabled"  
                                    @click="item.clickEvent" >
                                <i :class="item.icon"></i>{{item.text}}</el-button>
                                   <!-- <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.Materials.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.Materials.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.Materials.Audit'"   size="small" class="el-icon-circle-check" :disabled="selectRows.length===0" @click="_audit">&nbsp审核</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.Materials.UnAudit'"    size="small" class="el-icon-circle-cross"  :disabled="selectRows.length===0" @click="_unaudit">&nbsp撤销审核</el-button>
                                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.Materials.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>-->
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
                                        <template slot="isAudit" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.isAudit">已审核</el-tag>
                                            <el-tag type="danger" v-else>未审核</el-tag>
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
import Edit from './MaterialEdit';
import util from 'common/js/util';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetMaterialPageList,
            requestDeleteMaterial,
            requestAuditMaterialAsync,
            requestUnAuditMaterialAsync
        }   from 'api/material';
import {
            requestGetMaterialClassTreeList
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
                       infoName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
                materialClassTreeData:[],
                selectNode:{id:""},
                funBtnConf: {
                            add:{
                                name:'add',
                                icon:'icon-plus',
                                type:'primary',
                                size:'small',
                                text:'添加',
                                disabled:false,
                                isShow:true,
                                clickEvent:this._add,
                                permissionSetting:"Pages.Basic.Data.Materials.Create"
                            },
                            edit:{
                                name:'edit',
                                icon:'icon-pencil',
                                type:'primary',
                                size:'small',
                                text:'修改',
                                disabled:true,
                                isShow:true,
                                clickEvent:this._edit,
                                permissionSetting:"Pages.Basic.Data.Materials.Edit"
                            },
                            delete:{ 
                                name:'delete',
                                icon:'icon-trashcan',
                                type:'danger',
                                size:'small',
                                text:'删除',
                                disabled:true,
                                isShow:true,
                                clickEvent:this._delete,
                                permissionSetting:"Pages.Basic.Data.Materials.Delete"
                            },
                             audit:{
                                name:'audit',
                                icon:'icon-user-plus',
                                type:'primary',
                                size:'small',
                                text:'审核',
                                disabled:true,
                                isShow:true,
                                clickEvent:this._audit,
                                permissionSetting:"Pages.Basic.Data.Materials.Audit"
                            },
                             unAudit:{
                                name:'unAudit',
                                icon:'icon-user-minus',
                                type:'primary',
                                size:'small',
                                text:'撤销审核',
                                disabled:true,
                                isShow:true,
                                clickEvent:this._unAudit,
                                permissionSetting:"Pages.Basic.Data.Materials.UnAudit"
                            },
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
                                {attr: { prop: 'isAudit', label: '是否审核', width:120, scopedSlot: 'isAudit',align: 'center' } }, 
                                {attr: { prop: 'infoName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:120,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:120,  } },   
                                {attr: { prop: 'infoSecUnitPreci', label: '转换率1', width:120,  } },   
                                {attr: { prop: 'infoSecUnit', label: '辅单位1', width:120,  } },   
                                {attr: { prop: 'infoThrUnitPreci', label: '转换率2', width:120,  } },   
                                {attr: { prop: 'infoThrUnit', label: '辅单位2', width:120,  } }, 
                                // {attr: { prop: 'classNodeBh', label: '类别编码', width:120,  } },
                                {attr: { prop: 'infoCode', label: '材料编码', width:120,  } },   
                                {attr: { prop: 'orgName', label: '添加机构名称', width:120,  } },  
                                {attr: { prop: 'auditName', label: '审核人', width:120,  } },   
                                {attr: { prop: 'auditTime', label: ' 审核时间', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', width:120,  } },
                            ]
                        }
                    }
                }
        },
    methods:{
        _funcState(){
            //状态判断逻辑
        if(this.selectRows.length>0){
               this.funBtnConf['add'].disabled=false;
               this.funBtnConf['edit'].disabled=false;
               this.funBtnConf['delete'].disabled=false;
               this.funBtnConf['audit'].disabled=false;
               this.funBtnConf['unAudit'].disabled=false;
               if(this.selectRows[0].isAudit){
                   this.funBtnConf['edit'].disabled=true;
                   this.funBtnConf['delete'].disabled=true;
                   this.funBtnConf['audit'].disabled=true;
                   this.funBtnConf['unAudit'].disabled=false;
               }else{
                   this.funBtnConf['audit'].disabled=false;
                   this.funBtnConf['unAudit'].disabled=true;
               }
         }else{
              this.funBtnConf['add'].disabled=false;
               this.funBtnConf['edit'].disabled=true;
               this.funBtnConf['delete'].disabled=true;
               this.funBtnConf['audit'].disabled=true;
               this.funBtnConf['unAudit'].disabled=true;
         }
        },
        _handleNodeClick(val){
                  this.selectNode=val;
                  this._reload();
        },
        _getMaterialPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                             {key:"InfoName",op:"LIKE",value:this.searchModel.infoName},
                             ];
                if(this.selectNode.funcCode!=undefined){
                    inputArr.push(
                             {key:"ClassNodeBh",op:"LIKEL",value:this.selectNode.funcCode})
                }
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetMaterialPageList(this.mainInput.inputModel).then(data =>{
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
                this._funcState();
               
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
            this._getMaterialPageList();
            this._funcState();
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
                requestDeleteMaterial(obj).then(data =>{
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
        _audit(){
              var _this=this;
              let params={};
              params.material=this.selectRows[0];
              requestAuditMaterialAsync(params).then(data =>{
                            if(data.success){
                                this.$notify({
                                        title: '成功',
                                        message: '审核成功！',
                                        type: 'success'
                                        });
                                this._reload();
                                }
                            else {
                                this.$message.error('失败！'+data.error.message);
                                this._reload();
                            }
                          this.mainTableLoading=false;
                }).catch(function(error){
                       _this.mainTableLoading=false;
                });
        },
        _unAudit(){
              var _this=this;
              let params={};
              params.material=this.selectRows[0];
              requestUnAuditMaterialAsync(params).then(data =>{
                            if(data.success){
                                this.$notify({
                                        title: '成功',
                                        message: '撤销审核成功！',
                                        type: 'success'
                                        });
                                this._reload();
                                }
                            else {
                                this.$message.error('失败！'+data.error.message);
                                this._reload();
                            }
                          this.mainTableLoading=false;
                }).catch(function(error){
                       _this.mainTableLoading=false;
                });
        },
        _close(bool){
            if(bool){
                this.addFormVisible=false;
            }
            this._reload();
        },

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

