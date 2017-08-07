<template>
    <yl-panelpage :titleName="'榜单数据'">
        <div slot="content">
            <yl-layout>
                <div slot="fristbox">
                    <yl-toolbar>
                        <el-form :inline="true">
                            <el-form-item class="form-content-vertical">
                                <el-input placeholder="材料名称" size="small" style="width:200px" v-model="searchModel.infoName"></el-input>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-button type="primary" icon="search" size="small" @click="_reload">查 询</el-button>
                            </el-form-item>
                        </el-form>
                    </yl-toolbar>
                    <!--<yl-toolbar>
                <el-button-group>
                        <el-button type="primary" v-permissionSetting="'Materials.Analyze.Concrete.WeightItem.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                        <el-button type="primary" v-permissionSetting="'Materials.Analyze.Concrete.WeightItem.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                        <el-button type="danger"  v-permissionSetting="'Materials.Analyze.Concrete.WeightItem.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                    </el-button-group>
            </yl-toolbar>-->
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
            <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small" top="10%" :modal-append-to-body="false" :close-on-click-modal="false">
                <Edit :selectRow="currentRows" @close="_close" v-if="addFormVisible"></Edit>
            </el-dialog>
        </div>
    </yl-panelpage>
</template>

<script type="text/babel">
import Edit from './WeightItemEdit';
import { inputModel } from 'api/inputmodel';
import {
    requestGetWeightItemPageList,
    requestDeleteWeightItem
} from 'api/materials/weightitem';

export default {
    data() {
        return {
            tableData: {},
            mainTableLoading: false,
            selectRows: [],
            currentRows: {},
            searchModel: {
                infoName: '',
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
                        { attr: { type: 'index', label: '序号', width: 80, align: 'center' } },
                        //{attr: { prop: 'itemId', label: '', width:120,  } },   
                        //{attr: { prop: 'bdNum', label: '', width:120,  } },   
                        //{attr: { prop: 'orgId', label: '', width:120,  } },   
                        //{attr: { prop: 'orgName', label: '', width:120,  } },   
                        { attr: { prop: 'batchNo', label: '磅单号', width: 120, } },
                        { attr: { prop: 'wagAbbProvince', label: '车牌', width: 120, } },
                        { attr: { prop: 'wagonNumber', label: '车牌号', width: 120, } },
                        { attr: { prop: 'infoName', label: '材料名称', width: 120, } },
                        { attr: { prop: 'infoModel', label: '规格型号', width: 120, } },
                        { attr: { prop: 'infoUnit', label: '单位', width: 120, } },
                        { attr: { prop: 'netQuantity', label: '净重', width: 120, } },
                        { attr: { prop: 'grossWeight', label: '皮重', width: 120, } },
                        { attr: { prop: 'tareWeight', label: '毛重', width: 120, } },
                        { attr: { prop: 'discountRate', label: '扣率', width: 120, } },
                        { attr: { prop: 'discount', label: '扣吨', width: 120, } },
                        { attr: { prop: 'infoSecUnit', label: '辅单位', width: 120, } },
                        { attr: { prop: 'priSecConvRate', label: '扣水率', width: 120, } },
                        //{attr: { prop: 'infoClassNodebh', label: '材料类别编号', width:120,  } },   
                        // {attr: { prop: 'infoClassName', label: '', width:120,  } },   
                        // {attr: { prop: 'secondClassName', label: '', width:120,  } },   
                        // {attr: { prop: 'firstClassName', label: '', width:120,  } },   
                        { attr: { prop: 'storeroom', label: '库别', width: 120, } },
                        { attr: { prop: 'materialStore', label: '材料类型', width: 120, } },
                        { attr: { prop: 'infoCode', label: '材料编码', width: 120, } },
                        // {attr: { prop: 'supplierNM', label: '', width:120,  } },   
                        { attr: { prop: 'supplierName', label: '供应商', width: 120, } },

                        // {attr: { prop: 'netWeight', label: '', width:120,  } },   
                        { attr: { prop: 'weighMan', label: '过磅员', width: 120, } },
                        { attr: { prop: 'transformSupplier', label: '运输公司', width: 120, } },
                        { attr: { prop: 'inTime', label: '进场时间', width: 120, } },
                        { attr: { prop: 'isOut', label: '是否出厂', width: 120, } },
                        { attr: { prop: 'outTime', label: '出厂时间', width: 120, } },
                        { attr: { prop: 'isUpload', label: '上传', width: 120, } },
                        // {attr: { prop: 'uploadTime', label: '上传时间', width:120,  } },   
                        // {attr: { prop: 'isCh', label: '', width:120,  } },   
                        // {attr: { prop: 'isBd', label: '', width:120,  } },   
                        // {attr: { prop: 'isAudit', label: '', width:120,  } },   
                        { attr: { prop: 'maker', label: '制单人', width: 120, } },
                        { attr: { prop: 'makerDate', label: '制单时间', width: 120, } },
                        { attr: { prop: 'remark', label: '备注', width: 120, } },
                        // {attr: { prop: 'pch', label: '', width:120,  } },   
                        { attr: { prop: 'barCode', label: '条码', width: 120, } },
                        { attr: { prop: 'sortCode', label: '排序' } },
                    ]
                }
            }
        }
    },
    methods: {
        _getWeightItemPageList() {
            var _this = this;
            this.selectRows = [];
            this.mainTableLoading = true; //开启加载
            var inputArr = [
                { key: "InfoName", op: "LIKE", value: this.searchModel.infoName },
            ];
            this.mainInput.addqueryConditionItem(inputArr);
            requestGetWeightItemPageList(this.mainInput.inputModel).then(data => {
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
            this._getWeightItemPageList();
        },
        _add() {
            this.addFormVisible = true;
            this.currentRows = {};
        },
        _edit() {
            this.addFormVisible = true;
            this.currentRows = this.selectRows[0];
        },
        _delete() {
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
                var obj = {};
                obj.id = this.selectRows[0].id;
                requestDeleteWeightItem(obj).then(data => {
                    if (data.success) {
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
                            message: '删除数据失败！' + data.error.message,
                        });
                    }
                });
            });
        },
        _close() {
            this.addFormVisible = false;
            this._reload();
        },

    },
    components: {
        Edit,
    },
    mounted() {
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

