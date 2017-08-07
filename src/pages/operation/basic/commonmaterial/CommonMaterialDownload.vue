<template>
<yl-columnlay>
       <div slot="left"  >
            <yl-panelzone  :treeLoading="treeLoading" :reloadIsShow="true"  @reload="_treeReload" :titleName="'材料类别树'" :icon="'icon-tree'" :widthNum="'210px'" >
                 <div slot="content">
                    <el-tree :data="materialClassTreeData"   :expand-on-click-node="false" :props="defaultProps" @node-click="_handleNodeClick" style="height:400px"></el-tree>
                 </div>
            </yl-panelzone>
        </div>
        <div slot="right" >
            <yl-layout>
                 <div slot="fristbox" >
                       <yl-toolbar>
                            <el-form  :inline="true"  >
                                    <el-form-item class="form-content-vertical">
                                        <el-button type="primary"  size="small"  class="icon-download3" @click="_download" >下载</el-button>
                                    </el-form-item>
                                    <el-form-item class="form-content-vertical">
                                        <el-input  placeholder="材料名称" size="small" style="width:200px" v-model="searchModel.infoName"></el-input>
                                    </el-form-item>
                                    <el-form-item class="form-content-vertical">
                                        <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                    </el-form-item>
                            </el-form>
                        </yl-toolbar>
                 </div>
                 <div slot="secondbox" >
                     <yl-table ref="table"
                            @reload="_reload"
                            :configs="tableConfig" 
                            :input="mainInput.inputModel"
                            :tableloading="mainTableLoading" 
                            @row-click="toggleRowSelection"
                            @selection-change="_handleSelectionChange"
                            style="height:400px"
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


                       
</template>

<script type="text/babel">
import  {inputModel} from 'api/inputmodel';
import  {requestGetMaterialPageList}   from 'api/material';
import  {requestGetMaterialClassTreeList}   from 'api/materialclass';
import　{requestCreateCommonMaterialListAsync}   from 'api/commonmaterial';

export default {
    data(){
        return{
            searchModel:{
                infoName:'',
            },
            tableData: {},
            selectRows:[],
            mainInput:new inputModel(),
            treeLoading:false,
            selectNode:{id:""},
            defaultProps: {
                    children: 'children',
                    label: 'text',
                    id: 'id',
                    funcCode: 'funcCode'
                },
            mainTableLoading:false,
            materialClassTreeData:[],
        }
    },
    methods:{
        _reload(){
             this._getMaterialPageList();
        },
       _getMateriaClasslTreeList(){
            var _this=this;
            this.treeLoading=true;
            requestGetMaterialClassTreeList().then(data => {
                            if(data.success){
                                this.materialClassTreeData=data.result;
                            }
                            else {
                                 this.$message.error('失败！'+data.error.message);
                            }
                             _this.treeLoading=false;
                        }).catch(function (error) {
                                 _this.treeLoading=false;
                        });
        },
        _handleNodeClick(result, resolve){
                  this.selectNode=result;
                  this._reload();
        },
        _getMaterialPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                             {key:"InfoName",op:"LIKE",value:this.searchModel.infoName},
                             {key:"IsAudit",op:"EQ",value:1},
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
        _treeReload(){
                this._getMateriaClasslTreeList();
            },
        toggleRowSelection (row) {
              this.$refs.table.toggleRowSelection(row);
        },
       _handleSelectionChange(val) {
        this.selectRows = val;
      },
       _download(){
            let params={};
            console.log(this.selectRows);
            params.commonMaterials=this.selectRows;
            requestCreateCommonMaterialListAsync(params).then(data=>{
            if(data.success){
                    this.$notify({
                        title: '成功',
                        message: '保存数据成功！',
                        type: 'success'
                        });
                   this._complete();
                }
                else {
                    this.$message.error('失败！'+data.error.message);
                }
            })
        },
        _complete(){
                      this.$emit('close');
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
                                {attr: { type: 'selection',label: '选择', width:80 }},   
                                // {attr: { prop: 'isAudit', label: '是否审核', width:120, scopedSlot: 'isAudit',align: 'center' } }, 
                                {attr: { prop: 'infoName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:120,  } },   
                                {attr: { prop: 'infoUnit', label: '单位', width:120,  } },   
                                {attr: { prop: 'infoSecUnitPreci', label: '转换率1', width:120,  } },   
                                {attr: { prop: 'infoSecUnit', label: '辅单位1', width:120,  } },   
                                {attr: { prop: 'infoThrUnitPreci', label: '转换率2', width:120,  } },   
                                {attr: { prop: 'infoThrUnit', label: '辅单位2', width:120,  } }, 
                                {attr: { prop: 'classNodeBh', label: '类别编码', width:120,  } },
                                {attr: { prop: 'orgName', label: '添加机构名称', width:120,  } },  
                                {attr: { prop: 'auditName', label: '审核人', width:120,  } },   
                                {attr: { prop: 'auditTime', label: ' 审核时间', width:120,  } }, 
                                 {attr: { prop: 'infoCode', label: '材料编码', width:120,  } },   
                                {attr: { prop: 'remark', label: '备注', width:120,  } },
                            ]
                        }
                    }
                }
        },
        mounted(){
        this._getMateriaClasslTreeList();
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
