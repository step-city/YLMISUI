<template>
<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" >
<yl-renderFormLay :dynamicValidateForm="dynamicValidateForm" ></yl-renderFormLay>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import renderFormLay from './renderFormLay.js'
  export default {
    data() {
      return {
        //带tabpanel类型的form表单配置
        dynamicValidateForm:{ 
            tabpanelconf:{
                isdisable:false,
                type:''
              },
            formConfigs:[
              { 
                tabpanel:{ 
                    title:'第一栏',
                 },
               formConfig:[
                  {val: '',title:'姓名',name:'name', type:'input',
                      position:{ 
                                spanNum:24,
                                alone:true, 
                                style:''
                            },   
                      elmentConfig:{
                          maxlength:1000000, 
                          minlength:0,
                          size:"",
                          disabled:false,
                          type:"text",
                          placeholder:"请输入内容",
                          icon:"",
                          rows:2,  //type=textarea时有效
                          readonly:false,
                      },
                    rules:[
                        { required: true, message: '姓名不能为空', trigger: 'blur'}
                    ] 
                   },
                  {val: '',title:'邮箱',name:'email',type:'input',
                      position:{ spanNum:12,
                                  alone:false, 
                                  style:''
                            },
                    event:{
                        change:(val)=>{
                              alert(val);
                        },
                    },
                    elmentConfig:{
                            maxlength:1000000, 
                            minlength:0,
                            size:"",
                            disabled:false,
                            type:"text",
                            placeholder:"请输入内容",
                            icon:"",
                            rows:2,  //type=textarea时有效
                            readonly:false,
                        },
                    rules:[
                          { required: true, message: '邮箱不能为空', trigger: 'blur'},
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                      ] 
                    },
                    {val: '0',title:'年龄',name:'age',type:'inputNumber',
                        position:{ spanNum:12,
                                    alone:false, 
                                    style:''
                              },
                    event:{
                        change:()=>{
                              alert("我被触发了");
                        },
                    },
                    elmentConfig:{
                            min:0, max:10,step:1,size:"",disabled:false,
                        },
                    },
                  {val: '',title:'出生日期',name:'brithDay',type:'datePicker',
                      position:{ spanNum:24,
                                  alone:true, 
                                  style:''
                            },
                    event:{
                        change:(val)=>{
                              alert(val);
                        },
                    },
                      elmentConfig:{
                          type:"date", 
                          size:"",
                          placeholder:"请选择日期",
                          format:"yyyy-MM-dd",
                          align:"left",
                          defaultValue:"",    
                          disabled:false,
                          editable:true,
                          clearable:true,
                      },
                      rules:[
                          { type: 'date',required: true, message: '出生日期不能为空', trigger: 'blur'},
                      ]  
                   },
                  {val: '',title:'性别',name:'sex',type:'switch',
                      position:{ spanNum:24,
                                  alone:true, 
                                  style:''
                            },
                      elmentConfig:{
                          onText:"男",
                          offText:"女",
                          onValue:"男",
                          offValue:"女",
                          onColor:"#13ce66",
                          offColor:"#ff4949",
                          disabled:false,
                          width:60
                      }
                   },
                  {val: '',title:'所在专业',name:'professional',type:'input',
                        position:{ spanNum:24,
                                  alone:true, 
                                  style:''
                            },
                    elmentConfig:{
                          maxlength:1000000, 
                          minlength:0,
                          size:"",
                          disabled:false,
                          type:"text",
                          placeholder:"请输入内容",
                          icon:"",
                          rows:2,  //type=textarea时有效
                          readonly:false,
                      },
                    rules:[
                      { required: true, message: '备注不能为空', trigger: 'blur'},
                    ] 
                   },
                  {val: '',title:'备注',name:'email',type:'input',
                      position:{ spanNum:24,
                                  alone:true, 
                                  style:''
                            },
                    elmentConfig:{
                          maxlength:1000000, 
                          minlength:0,
                          size:"",
                          disabled:false,
                          type:"textarea",
                          placeholder:"请输入内容",
                          icon:"",
                          rows:2,  //type=textarea时有效
                          readonly:false,
                      },
                    rules:[
                        { required: true, message: '备注不能为空', trigger: 'blur'},
                    ] 
                   },
                ], 
               },
              { 
                tabpanel:{ 
                    title:'第二栏',
                 },
                formConfig:[
                  {val: '',title:'哈哈哈',name:'haha', type:'input',
                      position:{ 
                                spanNum:24,
                                alone:true, 
                                style:''
                            },   
                      elmentConfig:{
                          maxlength:1000000, 
                          minlength:0,
                          size:"",
                          disabled:false,
                          type:"text",
                          placeholder:"请输入内容",
                          icon:"",
                          rows:2,  //type=textarea时有效
                          readonly:false,
                      },
                    rules:[
                        { required: true, message: '姓名不能为空', trigger: 'blur'}
                    ] 
                  },
                
                ],
               },
              { 
                tabpanel:{ 
                    title:'第三栏',
                 },
                formConfig:[
                  {val: '',title:'哈哈哈',name:'haha', type:'input',
                      position:{ 
                                spanNum:24,
                                alone:true, 
                                style:''
                            },   
                      elmentConfig:{
                          maxlength:1000000, 
                          minlength:0,
                          size:"",
                          disabled:false,
                          type:"text",
                          placeholder:"请输入内容",
                          icon:"",
                          rows:2,  //type=textarea时有效
                          readonly:false,
                      },
                    rules:[
                        { required: true, message: '哈哈哈不能为空', trigger: 'blur'}
                    ] 
                  },
                ]
               }
              ]
           },
        //不带tabpanel的表单配置
      };
    },
    methods: {
      submitForm(formName) {
          console.log(this.dynamicValidateForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
        
    },
     components:{
       'yl-renderFormLay':renderFormLay
     },
  }
</script>