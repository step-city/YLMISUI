<template>
<div>
    <yl-onlytable 
        @current-change="_currentChange"
        :configs="tableConfig" 
        :tableloading="mainTableLoading"
        :tableData="tableData" 
        >
        <template :slot="item.name" scope="scope" v-for="(item,index) in tableConfig.solSlotConf"> 
                <rowComs :option="item" :row="scope.row" :name="item.name"></rowComs>
        </template>
        <template slot="id" scope="scope"> 
            <div class="yl-table-icon">  
                <i class="icon-cancel3"  @click="_delItem(scope.row)"></i>
            </div>
        </template>
    </yl-onlytable>
        <div v-if="!sumRowConf.disable" class="sum-text">
            <span class="heji-title" ><i class="icon-sigma " ></i>{{sumRowConf.sumText}}</span>
            <span class="heji-title" style="padding-left:10px;" v-for="item in sumRowConf.items" :key="item.id"  v-if="item.capitalCol">大写金额：<span class="heji-text" v-text="getdataDX(item.sumval)"></span></span>
            <span style="padding-left:10px;" v-for="item in sumRowConf.items" :key="item.id" class="heji-title">{{item.text}}：<span class="heji-text">{{item.sumval}}</span></span>
        </div>
     </div>
</template>
<script type="text/babel">
import { mapGetters } from 'vuex';
import rowComs from './rowComs';
import util from 'common/js/util'
import config from 'static/js/config';
export default {
    name:'yl-tableedit',
    data(){
        return{
             mainTableLoading:false,
        }
    },
    props:{
        tableConfig:{
            type:Object,
            require:true
        },
        mapConfig:{
            type:Object,
            require:true
        },
        tableData:{
            required: false,
                type: Array,
            default: function () {
                return []
            }
        },
        sumRowConf:{
            type:Object,
            require:false
        },
        
    },
    computed:{
			 ...mapGetters([ 'getSelectRows','getType' ])
		},
    methods:{
           _currentChange(val){
                //单选时的方法
                if(val!=null){
                }
            },
            _delItem(row){
                 this.$emit("delItem",row);
            },
            _getTableData(rows){
                if(rows.length>0){
                    rows.map((item,index)=>{
                        let row={};
                        this.mapConfig.mapconf.map((model,index)=>{  
                            if(model.isplace){
                                row[model.prop]=item[model.selprop];
                            }else{
                                row[model.prop]=model.defaultval;
                            }
                        });
                        //附加dataType
                        row.dataType=this.getType;
                        if(config.tableConf.limitCount>this.tableData.length){
                            this.tableData.push(row);
                        }else{
                             this.$message({ message: `选材数目不能大于${config.tableConf.limitCount}条!`, type: 'warning'});
                        }
                    });
                }
            },
           getEditData(){
                return this.tableData;
          },
          getdataDX(data){
             return util.turnDX(data);
          }
    },
    components:{
        rowComs,
    },
    mounted(){
    },
    watch:{
        getSelectRows:function(val, oldVal){
          if(val.length>0){
            //处理
            this._getTableData(val);
          }
        }
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sum-text
    height:28px
    line-height:25px
    font-size:12px
    border:2px solid #ddd
    padding:2px
    padding-left:10px
    display:flex
    flex-direction:row
    flex-wrap:nowrap
    justify-content: flex-end
    align-items: center
    .heji-title
        color:#324057
        font-weight:600
        .heji-text
            color:#324057
            font-weight:600
</style>
