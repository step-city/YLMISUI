<template>
<yl-panelpage :titleName="'组织机构管理'" >
<div slot="content">
  <yl-columnlay>
               <div slot="left" >        
                   <yl-organizeTreeWithPanel  :treeLoading="treeLoading" :reloadIsShow="true" v-model="origanizeWithPanel" @getCurrentNode="_getCrureentNode"  :placeholder="'请选择'"   style="width:200px"> </yl-organizeTreeWithPanel>
                </div>
                <div slot="right" >
                    <yl-layout>
                        <div slot="fristbox">
                          <yl-toolbar>
                                <el-form  :inline="true"  >
                                        <el-form-item class="form-content-vertical">
                                       <el-input  placeholder="部门简称" size="small" style="width:200px" v-model="searchModel.shortName"></el-input>  
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical">
                                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                        </el-form-item>
                                </el-form>
                          </yl-toolbar>
                        <yl-toolbar>
                            <el-button-group>
                                    <el-button type="primary" icon="plus" size="small" v-permissionSetting="'Pages.Basic.Set.Organizes.Create'" @click="_add" >添加</el-button>
                                    <el-button type="primary" icon="edit"  size="small" v-permissionSetting="'Pages.Basic.Set.Organizes.Edit'" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                                    <el-button type="danger"  icon="delete" size="small"  v-permissionSetting="'Pages.Basic.Set.Organizes.Delete'" :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
import Edit from './OrganizeEdit';
import util from 'common/js/util';
import  {inputModel} from 'api/inputmodel';
import organizeTreeWithPanel from 'ocomponents/organize/organizeTreeWithPanel'
import {
         requestGetOrganizePageList,
         requestDeleteOrganize
        }from 'api/organize';
export default {
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},              
                origanizeWithPanel:[],
                searchModel:{
                shortName:'',  
                    },  
                addFormVisible:false,
                mainInput:new inputModel(),
                selectNode:{id:""},
                defaultProps: {
                        children: 'children',
                        label: 'text',
                        id: 'id'
                    },
                treeLoading:false,
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
                                    {attr: {prop:"nodeCode",label:"树结构编码",width:"120",  } },
                                    {attr: {prop:"category",label:"部门类别",width:"120",  } },
                                    {attr: { prop:"shortName", label:"部门简称", width:"140",  } },
                                    {attr: {prop:"abbName",label:"部门全称",width:"200",  } },
                                    {attr: {prop:"outerPhone",label:"电话",width:"160",  } },
                                    {attr: {prop:"fax",label:"传真",width:"160",  } },
                                    {attr: {prop:"web",label:"网址",width:"160",  } },
                                    {attr: {prop:"manager",label:"主负责人",width:"120",  } },
                                    {attr: {prop:"address",label:"详细地址",width:"180",  } },
                                    {attr: {prop:"orgDescription",label:"描述信息",width:"200",  } },
                                    {attr: { prop: 'sortCode', label: '排序'} },
                            ]
                        }
                    }
                }
        },
    methods:{
        _getOrganizePageList(){    
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                             {key:"ShortName",op:"LIKE",value:this.searchModel.shortName},
                             {key:"ParentId",op:"EQ",value:this.selectNode.id},
                             {key:"IsStatic",op:"EQ",value:false},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
         requestGetOrganizePageList(this.mainInput.inputModel).then(data =>{
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
                 //点击加载 
     
   _getCrureentNode(node){
            this.origanizeWithPanel=node.text;
            this.selectNode.id=node.id;
            this._reload(); 
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
            this._getOrganizePageList();
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
                requestDeleteOrganize(obj).then(data =>{
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
    },
    components:{
         Edit,
        'yl-organizeTreeWithPanel':organizeTreeWithPanel,
        },
    mounted(){
        this._reload();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

