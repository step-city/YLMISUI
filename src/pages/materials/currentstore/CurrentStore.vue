<template>
    <yl-panelpage :titleName="'库存管理'">
        <div slot="content">
            <yl-layout>
                <div slot="fristbox">
                    <el-form :inline="true">
                        <yl-toolbar>
                            <el-form-item class="form-content-vertical">
                                <el-input placeholder="材料名称" size="small" style="width:160px" v-model="searchModel.infoName"></el-input>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-input placeholder="规格型号" size="small" style="width:160px" v-model="searchModel.infoModel"></el-input>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-input placeholder="单位" size="small" style="width:160px" v-model="searchModel.infoUnit"></el-input>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <yl-comsupplier placeholder="供应商" size="small" style="width:160px;" v-model="searchModel.supplierid" @selectNode="selectNodeSupplier"></yl-comsupplier>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <yl-organizeTree v-model="searchModel.orgId" :placeholder="'请选择单位'" size="small" :isexpand="true" @getCurrentNode="_getCurrentNode" style="width:180px">
                                </yl-organizeTree>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-button type="primary" icon="search" size="small" @click="_reload">查 询</el-button>
                            </el-form-item>
                        </yl-toolbar>
                    </el-form>
                </div>
                <div slot="secondbox" class="flexbox">
                    <yl-table ref="table" @reload="_reload" @current-change="_currentChange" :configs="tableConfig" :input="mainInput.inputModel" :tableloading="mainTableLoading">
                        <!--自定义列模板
                            <template slot="isDisable" scope="scope">
                                <el-tag type="primary" v-if="scope.row.showFlag">启用</el-tag>
                                <el-tag type="danger" v-else>禁用</el-tag>
                            </template>
                            -->
                    </yl-table>
                </div>
            </yl-layout>
            <!--编辑界面-->
        </div>
    </yl-panelpage>
</template>

<script type="text/babel">
import { inputModel } from 'api/inputmodel';
import {
    requestGetCurrentStorePageList,
    requestDeleteCurrentStore
} from 'api/materials/currentstore';
import ComSupplier from 'ocomponents/comsupplier/ComSupplier'
import organizeTree from 'ocomponents/organize/organizeTree';

export default {
    data() {
        return {
            tableData: {},
            mainTableLoading: false,
            selectRows: [],
            currentRows: {},
            searchModel: {
                infoName: '',
                infoModel: '',
                infoUnit: '',
                supplierId: '',
                orgId: this.getUserInfo().user.manageOrgId
            },
            addFormVisible: false,
            mainInput: new inputModel(),
        }
    },
    computed: {
        tableConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            data: this.tableData,
                            highlightCurrent: true,
                        }
                    },
                    columns: [
                        // {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                        // {attr: { prop: 'sId', label: '主键', width:120,  } },      
                        // {attr: { prop: 'dataType', label: '0点收1预点4调入', width:120,  } },   
                        // {attr: { prop: 'infoNM', label: '材料id', width:120,  } },  
                        { attr: { prop: 'infoName', label: '名称', width: 120, } },
                        { attr: { prop: 'infoModel', label: '规格', width: 120, } },
                        { attr: { prop: 'infoUnit', label: '单位', width: 120, } },
                        { attr: { prop: 'storeQuantity', label: '库存数量', width: 120, } },
                        { attr: { prop: 'storeSum', label: '库存金额', width: 120, } },
                        // {attr: { prop: 'cId', label: '类别id', width:120,  } },   
                        // {attr: { prop: 'classNodebh', label: '类别编号', width:120,  } },  
                        // {attr: { prop: 'quantity', label: '进料数量', width:120,  } },   
                        { attr: { prop: 'taxRate', label: '税率', width: 120, } },
                        { attr: { prop: 'bookPrice', label: '单价', width: 120, } },
                        // {attr: { prop: 'bookSum', label: '进料金额', width:120,  } },   
                        // {attr: { prop: 'outQuantity', label: '已发数量', width:120,  } },   
                        // {attr: { prop: 'outSum', label: '已发金额', width:120,  } },    
                        // {attr: { prop: 'supplierId', label: '供应商id或者调入单位id', width:120,  } },   
                        { attr: { prop: 'supplierName', label: '供应单位', width: 120, } },
                        { attr: { prop: 'storeRoom', label: '库别', width: 120, } },
                        { attr: { prop: 'storePosition', label: '存放地', width: 120, } },
                        { attr: { prop: 'manufacturer', label: '生产厂商', width: 120, } },
                        { attr: { prop: 'batchNo', label: '炉批号', width: 120, } },
                        { attr: { prop: 'infoRemark', label: '材料备注', width: 120, } },
                        { attr: { prop: 'barCode', label: '条码', width: 120, } },
                        { attr: { prop: 'createTime', label: '进料时间', width: 120, } },
                        { attr: { prop: 'infoCode', label: '材料编码', width: 120, } },
                        // {attr: { prop: 'sortCode', label: '排序'} },
                    ]
                }
            }
        }
    },
    methods: {
        _getCurrentStorePageList() {
            var _this = this;
            this.selectRows = [];
            this.mainTableLoading = true; //开启加载
            var inputArr = [
                { key: "InfoName", op: "LIKE", value: this.searchModel.infoName },
                { key: "InfoModel", op: "LIKE", value: this.searchModel.infoModel },
                { key: "InfoUnit", op: "LIKE", value: this.searchModel.infoUnit },
                { key: "OrgId", op: "EQ", value: this.searchModel.orgId }
            ];
            if (this.searchModel.supplierId != '') {
                inputArr.push(
                    { key: "SupplierId", op: "EQ", value: this.searchModel.supplierId }
                )
            }
            this.mainInput.addqueryConditionItem(inputArr);
            requestGetCurrentStorePageList(this.mainInput.inputModel).then(data => {
                if (data.success) {
                    this.tableData = data.result;
                }
                else {
                    this.$message.error('失败！' + data.error.message);
                }
                this.mainTableLoading = false;
            }).catch(function (error) {
                _this.mainTableLoading = false;
            });
        },
        _currentChange(val) {
            //单选时的方法
            if (val != null) {
                this.selectRows = [];
                this.selectRows.push(val);
            }

        },
        _selectionChange(val) {
            //多选时的方法
            if (val != null) {
                this.selectRows = [];
                this.selectRows = this.selectRows.concat(val);
            }
        },
        toggleRowSelection(row) {
            this.$refs.table.toggleRowSelection(row)
        },
        _reload() {
            this._getCurrentStorePageList();
        },
        selectNodeSupplier(node) {
            this.searchModel.supplierId = node.id;
        },
        _getCurrentNode(val) {
            this.searchModel.orgId = val.id;
        },
    },
    components: {
        'yl-comsupplier': ComSupplier,
        'yl-organizeTree': organizeTree,
    },
    mounted() {
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

