<template>
<yl-panelpage :titleName="'常用材料'" >
<div slot="content">
  <yl-columnlay>
              <div slot="left"  >
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
                            <el-button-group>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.CommonMaterials.DownLoad'"  class="icon-download3"   size="small"  @click="_add" >&nbsp下载</el-button>
                                    <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.CommonMaterials.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.CommonMaterials.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
     </yl-columnlay>
    
    <!--编辑界面-->
         <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
          <el-dialog ref="downloadDialog" title="下载" v-model="addDownloadFormVisible" size="large"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <DownLoadMaterial  @close="_downloadClose"  v-if="addDownloadFormVisible"></DownLoadMaterial>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './CommonMaterialEdit';
import DownLoadMaterial from './CommonMaterialDownload';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetCommonMaterialPageList,
            requestDeleteCommonMaterial
        }   from 'api/commonmaterial';
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
                commonMaterialTreeData:[],
                selectNode:{id:""},
                materialClassTreeData:[], 
                addDownloadFormVisible:false,
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
                                {attr: { prop: 'infoName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:120,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:120,  } },   
                                {attr: { prop: 'infoSecUnitPreci', label: '转换率1', width:120,  } },   
                                {attr: { prop: 'infoSecUnit', label: '辅助单位1', width:120,  } },   
                                {attr: { prop: 'infoThrUnitPreci', label: '转换率2', width:120,  } },   
                                {attr: { prop: 'infoThrUnit', label: '辅助单位2', width:120,  } },   
                                {attr: { prop: 'bidPrice', label: '投标价', width:120,  } },   
                                {attr: { prop: 'responsiPrice', label: '责任成本价', width:120,  } },   
                                {attr: { prop: 'purchasePrice', label: '采购价', width:120,  } },  
                                {attr: { prop: 'infoCode', label: '材料编码', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', width:120,  } },
                            ]
                        }
                    }
                }
        },
    methods:{
      
         _handleNodeClick(val){
                  this.selectNode=val;
                  this._reload();
        },
        _getCommonMaterialPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"InfoName",op:"LIKE",value:this.searchModel.infoName},
                               {key:"OrgId",op:"EQ",value:this.getUserInfo().user.manageOrgId}
                             ];
                if(this.selectNode.funcCode!=undefined){
                    inputArr.push(
                             {key:"ClassNodeBh",op:"LIKEL",value:this.selectNode.funcCode})
                }
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetCommonMaterialPageList(this.mainInput.inputModel).then(data =>{
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
            this._getCommonMaterialPageList();
        },
        _add(){
            this.addDownloadFormVisible=true;
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
                requestDeleteCommonMaterial(obj).then(data =>{
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
        _close(){
                this.addFormVisible=false;
                this._reload();
        },
        _downloadClose(){
                this.addDownloadFormVisible=false;
                this._reload();
        },

    },
    components:{
         Edit,
         DownLoadMaterial,
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

