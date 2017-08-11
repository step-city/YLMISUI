<template>
 
   <!--输入框-->
   <el-input 
   v-if="option.type==='input'" 
   v-model="option.val" 
   :maxlength="option.elmentConfig.maxlength"
   :minlength="option.elmentConfig.minlength"
   :size="option.elmentConfig.size"
   :disabled="option.elmentConfig.disabled"
   :type="option.elmentConfig.type"
   :placeholder="option.elmentConfig.placeholder"
   :icon="option.elmentConfig.icon"
   :rows="option.elmentConfig.rows"
   :readonly="option.elmentConfig.readonly"
   >
   </el-input>
    
    <!--状态组件-->
     <el-switch
      v-else-if="option.type==='switch'"
      v-model="option.val"
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

 

    <!--计数器-->
    <el-input-number 
    v-else-if="option.type==='inputNumber'" 
    v-model="option.val"
    :min="option.elmentConfig.min" 
    :max="option.elmentConfig.max"
    :step="option.elmentConfig.step"
    :disabled="option.elmentConfig.disabled"
    :size="option.elmentConfig.size"
    >
    </el-input-number>


    <!--日期>-->
     <el-date-picker
        v-else-if="option.type==='datePicker'" 
        v-model="option.val"
        :type="option.elmentConfig.type"
        :size="option.elmentConfig.size"
        :placeholder="option.elmentConfig.placeholder"
        :format="option.elmentConfig.format"
        :align="option.elmentConfig.align"
        :defaultValue="option.elmentConfig.defaultValue"
        :disabled="option.elmentConfig.disabled"
        :editable="option.elmentConfig.editable"
        :clearable="option.elmentConfig.clearable"
      >
    </el-date-picker>

 </template>

<script type="text/babel">
export default {
    name:'yl-renderComs',
    data(){
        return{
            DatePickerParams:{
                   dateValue:'',
            },
            InputParams:{
                Value:'',
            }
        }
    },
    props:{
        option:{
            type:Object,
            require:true
        },
        
    },
    methods:{
    },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
