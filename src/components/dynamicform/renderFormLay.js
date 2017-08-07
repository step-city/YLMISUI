
export default{
    data(){
        return {
        }
    },
    props: {
        dynamicValidateForm:{},
    },
    methods:{
            //返回动态表单
            renderItem(formConfigs,indexs){
            return formConfigs.map((formData,index)=>{
                      return  <el-col span={formData.position.spanNum}>
                                <el-form-item
                                    label={formData.title}
                                    key={index}
                                    prop={'formConfigs.' + indexs + '.formConfig'+'.' + index + '.val'}
                                    rules={formData.rules}
                                >
                                <yl-renderComs option={formData}></yl-renderComs>
                             </el-form-item>
                            </el-col>
            }) 
         }
    },
    components:{
     },
     mounted(){
     },
    render: function(h){
        let tabpanelconf=this.dynamicValidateForm.tabpanelconf;
        let formConfigs=this.dynamicValidateForm.formConfigs;
        if(!tabpanelconf.isdisable){
            //tabpanel形式
                return  <el-tabs type={tabpanelconf.type}>
                        {
                            formConfigs.map((item,indexs)=>{
                            return <el-tab-pane label={item.tabpanel.title}  >
                                 { 
                                     //循环开始
                                        this.renderItem(item.formConfig,indexs)
                                 } 
                            </el-tab-pane>
                        })} 
                       </el-tabs>
        }

      
    }
}