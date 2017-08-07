
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >

         <el-tabs v-model="activeName" >
            <el-tab-pane label="基本信息" name="first" style="height:300px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="父节点" prop="parentId">
                            <yl-GHTree   v-model="formModel.parentId" 
                                        :placeholder="'请选择'" 
                                        :isexpand="false" 
                                        :readonly="true"
                                        :defaultText="formModel.parentName"
                                        :nodeStateConf="nodeStateConf"
                                        @getCurrentNode="_getCurrentsNode" 
                                        style="width:100%">
                                </yl-GHTree>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="标准工号" prop="sId" >
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
                                <el-input v-model="formModel.attName"  @blur="_setFullName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp--</el-col>
                        <el-col :span="10">
                                <span>  {{formModel.ghName}}</span>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row>
                     <el-col :span="24">
                         <el-form-item label="全称" prop="ghFullName">
                            <span>  {{formModel.ghFullName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始时间" prop="beginDate" >
                            <el-date-picker v-model="formModel.beginDate"  style="width:100%" align="right" type="date" placeholder="选择日期">
                                </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束时间" prop="endDate">
                            <el-date-picker v-model="formModel.endDate" align="right" style="width:100%" type="date" placeholder="选择日期">
                                </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="排序" prop="sortCode" >
                            <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工号状态" prop="ghState">
                            <yl-dataDictionaryForSel :code="'GongHaoState'" v-model="formModel.ghState"  :placeholder="'请选择'" style="width:100%">
                            </yl-dataDictionaryForSel>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col :span="8">
                        <el-form-item label="子节点" prop="isLeaf">
                                <el-switch  v-model="formModel.isLeaf"
                                            on-text="是"
                                            off-text="否">
                                </el-switch>
                            </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否发料工号" prop="isDelivery">
                            <el-switch  v-model="formModel.isDelivery"
                                        on-text="是"
                                        off-text="否">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否核算工号" prop="isCheck">
                            <el-switch  v-model="formModel.isCheck"
                                        on-text="是"
                                        off-text="否">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-tab-pane>
            <el-tab-pane label="其他信息" name="second">
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
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同号" prop="contractCode">
                            <el-input v-model="formModel.contractCode" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同工程量" prop="contractQuantity">
                            <el-input v-model="formModel.contractQuantity" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="设计工程量" prop="designQuantity">
                            <el-input v-model="formModel.designQuantity" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="设计图纸号" prop="designDrawNum">
                            <el-input v-model="formModel.designDrawNum" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="工作内容" prop="jobContent">
                    <el-input v-model="formModel.jobContent" ></el-input>
                </el-form-item>

               <el-form-item label="描述" prop="description">
                    <el-input v-model="formModel.description" ></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="formModel.remark" ></el-input>
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
    <el-form-item >
      <div style="text-align:right;">   
       <el-checkbox v-model="isClose">保存后关闭</el-checkbox> &nbsp&nbsp&nbsp&nbsp&nbsp
      <el-button @click="_resetForm">重置</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
      </div>
  </el-form-item>
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateGH,
    requestGetGHTreeList
}from 'api/gh';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel';
import {
    requestGetStandardGHByParent
}from 'api/standardgh';
import standardGHTree from 'ocomponents/standardgh/standardGHTree'
import GHTree from 'ocomponents/gh/GHTree'

export default {
    data(){
        let ghNameJudgeRepeat = (rule, value, callback) => {
         let str=`MB_GH|GHName|${this.getUserInfo().user.manageOrgId}|${this.formModel.parentId}|${this.formModel.oghName}`;
         this.IsJudgeRepeat(str,value, callback);
      };
    return{
        formModel:{
                 parentId:'',
                 parentName:'',
                 gHCode:'',
                 ghName:'',
                 oghName:'',
                 sId:'',
                 sCode:'',
                 sName:'',
                 orgId:this.getUserInfo().user.manageOrgId,
                 orgName:'',
                 ghFullName:'',
                 mUnit:'',
                 unitConsume:0,
                 isLeaf:'',
                 ghState:'',
                 contractCode:'',
                 contractQuantity:'',
                 designQuantity:'',
                 designDrawNum:'',
                 beginDate:new Date(),
                 endDate:new Date(),
                 jobContent:'',
                 isDelivery:'',
                 isCheck:'',
                 description:'',
                 remark:'',
                 sortCode: 1,
                 pSId:'',
                 sItem:'',
                 attName:''
        },
         rules: {
                    parentId: [
                      { required: true, message: '父节点不能为空！', trigger: 'change' }
                    ],
                    ghName: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' },
                      { validator:ghNameJudgeRepeat, trigger: 'blur' }
                    ],
                    sId: [
                      { required: true, message: '标准工号名称不能为空！', trigger: 'change' }
                    ],
                    unitConsume: [
                       { validator: this.checkdecimal, trigger: 'blur' }
                    ],
                    beginDate: [
                      {type: 'date', required: true, message: '开始时间不能为空！', trigger: 'change' }
                    ],
                     endDate: [
                      {type: 'date', required: true, message: '开始时间不能为空！', trigger: 'change' }
                    ],
                    ghState: [
                      { required: true, message: '状态不能为空！', trigger: 'change' }
                    ],
         },
        selectNode:{},
        loading:false,
        activeName: 'first',
        selectData:[],
        defaultProps:{
              children: 'children',
              label: 'text',
              id: 'id',
              funcCode:'funcCode'
        },
        isClose:true,
        nodeStateConf:[
            //配置说明
            // name为标签对应属性 data中必须有值，为布尔类型
            // text为tag显示值
            // style为标签显示样式有五中样式 success/danger/primary/waring
            // leafflag为遇到配置属性是否继续加载
            {name:'isCheck',text:"核",tagflag:true,style:'success',leafflag:false},
            {name:'isDelivery',text:"发",tagflag:true,style:'primary',leafflag:false},
        ],
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    computed:{
    },
    methods:{
         _onSubmit() {
                this.formModel.endDate=new Date(this.formModel.endDate);
                this.formModel.beginDate=new Date(this.formModel.beginDate);
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    this.formModel.endDate=this.formatDate(this.formModel.endDate,"YYYY-MM-DD");
                    this.formModel.beginDate=this.formatDate(this.formModel.beginDate,"YYYY-MM-DD");
                    params.order=this.formModel;
                    requestCreateOrUpdateGH(params).then(data=>{
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
        _getCurrentsGHNode(selectNode){
            if(this.formModel.sCode==''){
                 let obj=[];
                obj=this.selectData.filter((item,index)=>{
                            return item.id===selectNode;
                });
                this.formModel.sId=obj[0].id;
                this.formModel.sCode=obj[0].funcCode;
                this.formModel.sName=obj[0].text;
                this.formModel.ghName=obj[0].text;
                this._setFullName();
            }
        },
        //父节点加载标准工号库
        _getCurrentsNode(selectNode){
            this.formModel.parentId=selectNode.id;
            this.formModel.parentName=selectNode.text;
            this.selectNode=selectNode;
            this._setFullName();
            this.formModel.pSId=selectNode.funcCode;
            if(selectNode.funcCode==undefined){
                this._getStantardGHList(this.guidOfNull());
            }
            else{
                this._getStantardGHList(selectNode.funcCode);
            }
        },
        _setFullName(){
            if(this.selectNode.fullName==undefined){
                this.formModel.ghFullName=this.getUserInfo().user.manageOrgName+'/'+this.formModel.attName+this.formModel.ghName;
            }else{
                this.formModel.ghFullName=this.selectNode.fullName+'/'+this.formModel.attName+this.formModel.ghName;
            }
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
        }
        
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow);
       if(this.selectRow.id!=undefined){
       this.formModel.beginDate=new Date(this.formModel.beginDate);
       this.formModel.endDate=new Date(this.formModel.endDate);
       this.formModel.oghName=this.formModel.ghName;
       this.selectData.push({id:this.formModel.sId,text:this.formModel.sName});
       }
    },
    components:{
       'yl-dataDictionaryForSel':dataDictionaryForSel,
       'yl-standardGHTree':standardGHTree,
       'yl-GHTree':GHTree,
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
