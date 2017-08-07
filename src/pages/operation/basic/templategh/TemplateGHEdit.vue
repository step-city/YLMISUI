
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
        <el-row>
            <el-col :span="12">
                <el-form-item label="父节点" prop="parentId">
                     <yl-treeselect v-model="formModel.parentId" 
                     :treedata="treedata" 
                     :defaultProps="defaultProps"  
                     :readonly="true"
                     :loaddata="loaddata"
                     :defaultText="formModel.parentName"
                     :stepByOne="true" 
                     @nodeExpend="_nodeExpend"
                     @getCurrentNode="_getCurrentNode">
                     </yl-treeselect>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="标准工号" prop="sId">
                        <!--<yl-treeselect v-model="formModel.sId" 
                                        :treedata="selectData" 
                                        :defaultProps="defaultProps" 
                                        :readonly="true"
                                        :stepByOne="true"
                                        :defaultText="formModel.sName"
                                        @getCurrentNode="_getCurrentsGHNode">
                        </yl-treeselect>-->
                        <el-select v-model="formModel.sId" placeholder="请选择" 
                            @change="_getCurrentsGHNode">
                            <el-option v-for="item in selectData"  
                            :label="item.text" 
                            :key="item.id"
                            :value="item.id" >
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-col>
            </el-row>
        <el-row>
                    <el-form-item label="名称" required>
                        <el-col :span="12">
                            <el-form-item prop="attName">
                                <el-input v-model="formModel.attName" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp--</el-col>
                        <el-col :span="10">
                                <span>  {{formModel.tName}}</span>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row>
                     <el-col :span="24">
                         <el-form-item label="全称" prop="tFullName">
                            <span>  {{formModel.tFullName}}</span>
                        </el-form-item>
                    </el-col>
        </el-row>
        <el-row>
            <el-col :span="12"> 
                <el-form-item label="计量单位" prop="mUnit">
                     <yl-dataDictionaryForSel :code="'Unit'" v-model="formModel.mUnit"  :placeholder="'请选择'" >
                        </yl-dataDictionaryForSel>
                </el-form-item>
            </el-col>
            
            <el-col :span="12">
                <el-form-item label="工程量" prop="unitConsume">
                    <el-input v-model="formModel.unitConsume" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        
        
         <el-form-item label="描述" prop="description">
             <el-input v-model="formModel.description" ></el-input>
         </el-form-item>

         <el-row>
            <el-col :span="12">
                <el-form-item label="排序" prop="sortCode" >
                    <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否子节点" prop="isLeaf">
                    <el-switch  v-model="formModel.isLeaf"
                                        on-text="是"
                                        off-text="否">
                            </el-switch>
                </el-form-item>
            </el-col>
        </el-row>

         <el-form-item label="备注" prop="remark">
             <el-input type="textarea" v-model="formModel.remark" ></el-input>
         </el-form-item>
        
  
  
   <el-form-item >
       <el-checkbox v-model="isClose">保存后关闭</el-checkbox>
      <div style="text-align:right;">   
      <el-button @click="_resetForm">重置</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
      </div>
  </el-form-item>
  
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateTemplateGH,
    requestGetTemplateGHTreeList,
    requestGetTemplateGHByParent
}from 'api/templategh';
import {
    requestGetStandardGHTreeList
}from 'api/standardgh';
import util from 'common/js/util';
import standardGHTree from 'ocomponents/standardgh/standardGHTree'
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
import {
    requestGetStandardGHByParent
}from 'api/standardgh';
export default {
    data(){
        let ghNameJudgeRepeat = (rule, value, callback) => {
         let str=`MB_TemplateGH|TName||${this.formModel.parentId}|${this.formModel.oghName}`;
         this.IsJudgeRepeat(str,value, callback);
      };
    return{
        formModel:{
                 parentId:'',
                 parentName:'',
                 tCode:'',
                 tName:'',
                 sId:'',
                 sCode:'',
                 sName:'',
                 tFullName:'',
                 mUnit:'',
                 unitConsume:0,
                 isLeaf:'',
                 description:'',
                 remark:'',
               sortCode: 1,
               oghName:'',
               attName:''
        },
         rules: {
                    parentId: [
                      { required: true, message: '父节点不能为空！', trigger: 'change' }
                    ],
                    tCode: [
                      { required: true, message: '编码不能为空！', trigger: 'blur' }
                    ],
                    tName: [
                        { required: true, message: '名称不能为空！', trigger: 'blur' },
                        { validator:ghNameJudgeRepeat, trigger: 'blur' }
                    ],
                    // sId: [
                    //   { required: true, message: '标准工号不能为空！', trigger: 'change' }
                    // ],
                    // sCode: [
                    //   { required: true, message: '编码不能为空！', trigger: 'blur' }
                    // ],
                    sName: [
                        { required: true, message: '名称不能为空！', trigger: 'blur' },
                    ],
                    // tFullName: [
                    //   { required: true, message: '全称不能为空！', trigger: 'blur' }
                    // ],
                    // mUnit: [
                    // { required: true, message: '计量单位不能为空！', trigger: 'blur' }
                    // ],
                    unitConsume: [
                    { validator: this.checkdecimal, trigger: 'blur' }
                    ],
                    // description: [
                    // { required: true, message: '描述不能为空！', trigger: 'blur' }
                    // ],
                    // remark: [
                    // { required: true, message: '备注不能为空！', trigger: 'blur' }
                    // ],
         },
        loading:false,
        treedata:[],
        selectData:[],
        loaddata:[],
        treesGHdata:[],
        isClose:true,
        defaultProps: {
            children: 'children',
            label: 'text',
            id: 'id',
            funcCode:'funcCode'
        },
       selectNode:{text:'',id:''},
       sSelectNode:{text:'',id:''},
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    methods:{
         _getTemplateGHTreeList(val){
            var _this=this;
            let params={};
            params.node=val;
            requestGetTemplateGHByParent(params).then(data => {
                            if(data.success){
                                if(params!=this.guidOfNull){
                                    this.loaddata=data.result;
                                }
                                else{
                                    this.treedata=data.result;
                                }
                                
                            }
                            else {
                                 this.$message.error('失败！'+data.error.message);
                            }
                        })
        },
        _nodeExpend(node){
            this._getTemplateGHTreeList(node.data.id);
        },
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.templateGH=this.formModel;
                    requestCreateOrUpdateTemplateGH(params).then(data=>{
                    if(data.success){
                            this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                                });
                            //关闭面板
                            this._complete(this.isClose);
                        }
                        else {
                            this.$message.error('失败！'+data.error.message);
                        }
                            this.loading=false;
                    }).catch(function(error){
                        _this.loading=false;
                    })
                } else {
                    this.$message.warning('请按照条件填充表单！');
                    return false;
                }
                
            });
            },
         _resetForm() {
                this.$refs.formModel.resetFields();
         },
         _complete(bool){
                this.$emit('close',bool);
            },
         _getCurrentNode(selectNode){
             this.formModel.parentId=selectNode.id;
             this.formModel.parentName=selectNode.text;
            if(selectNode.funcCode==null){
                this._getStantardGHList(this.guidOfNull());
            }
            else{
                this._getStantardGHList(selectNode.funcCode);
            }
        },
        _getCurrentsGHNode(selectNode){
            let obj=[];
            obj=this.selectData.filter((item,index)=>{
                        return item.id===selectNode;
            });
                this.formModel.sId=obj[0].id;
                this.formModel.sCode=obj[0].funcCode;
                this.formModel.tName=obj[0].text;
                this.formModel.sName=this.formModel.tName;
        },
        _getStantardGHList(val){
              requestGetStandardGHByParent(val).then(data=>{
                    if(data.success){
                            this.selectData=data.result;
                    }
                    else {
                        this.$message.error('获取数据失败！');
                    }
            })
        },
        
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
       this.formModel.oghName=this.formModel.tName;
       let params=this.guidOfNull();
       this._getTemplateGHTreeList(params);
       this.selectData.push({id:this.formModel.sId,text:this.formModel.sName});
    },
    components:{
        'yl-standardGHTree':standardGHTree,
        'yl-dataDictionaryForSel':dataDictionaryForSel,
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
