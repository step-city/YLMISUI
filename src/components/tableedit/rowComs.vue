<template>
   <!--输入框-->
   <el-input 
   v-if="option.type==='input'" 
   v-model="row[option.name]" 
   :maxlength="option.elmentConfig.maxlength"
   :minlength="option.elmentConfig.minlength"
   :size="option.elmentConfig.size"
   :disabled="option.elmentConfig.disabled"
   :type="option.elmentConfig.type"
   :placeholder="option.elmentConfig.placeholder"
   :icon="option.elmentConfig.icon"
   :rows="option.elmentConfig.rows"
   :readonly="option.elmentConfig.readonly"
    @blur="input_blur"
   >
   </el-input>
    
    <!--状态组件-->
        <el-switch
        v-else-if="option.type==='switch'"
         v-model="row[option.name]" 
        :width="option.elmentConfig.width"
        :disabled="option.elmentConfig.disabled"
        :on-color="option.elmentConfig.onColor"
        :off-color="option.elmentConfig.offColor"
        :on-text="option.elmentConfig.onText"
        :off-text="option.elmentConfig.offText"
        :on-value="option.elmentConfig.onValue"
        :off-value="option.elmentConfig.offValue"
        >
    </el-switch>


    <!--日期>-->
     <el-date-picker
        v-else-if="option.type==='datePicker'" 
         v-model="row[option.name]"     
        :type="option.elmentConfig.type"
        :size="option.elmentConfig.size"
        :placeholder="option.elmentConfig.placeholder"
        :format="option.elmentConfig.format"
        :align="option.elmentConfig.align"
        :defaultValue="option.elmentConfig.defaultValue"
        :disabled="option.elmentConfig.disabled"
        :editable="option.elmentConfig.editable"
        :clearable="option.elmentConfig.clearable"
        style="width:100%"
      >
    </el-date-picker>
    <!--字典选择控件-->
     <yl-datadictionaryforsel
        v-else-if="option.type==='datadictionaryforsel'" 
        v-model="row[option.name]"
        :code="option.elmentConfig.code"
        :placeholder="option.elmentConfig.placeholder"
      >
    </yl-datadictionaryforsel>

 </template>
 <script type="text/babel">
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel';
export default {
    data(){
        return{
        }
    },
    props:{
        option:{
            type:Object,
            require:true
        },
        row:{
            type:Object,
            require:true
        },
        name:{
            type:String,
            value:''
        }
    },
    methods:{
        input_blur(){
            if(this.option.eventconf.ison){
                //逻辑计算  编辑列和当前控件名
                this.option.eventconf.event(this.row,this.name);
            }
        }
    },
    components:{
        'yl-datadictionaryforsel':dataDictionaryForSel
    },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
