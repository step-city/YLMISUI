<template>
    <yl-panelpage :titleName="types==0?'发料单':'原材料发料单'" :fullscreenisShow="true" :icon="'icon-library'">
        <div slot="content">
            <yl-layout>
                <div slot="fristbox">
                    <yl-toolbar>
                        <el-form :inline="true">
                            <el-form-item class="form-content-vertical">
                                <yl-organizeTree v-model="searchModel.orgId" :placeholder="'请选择单位'" size="small" :isexpand="true" style="width:180px">
                                </yl-organizeTree>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-input placeholder="单据编号" size="small" style="width:180px" v-model="searchModel.orderCode"></el-input>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-date-picker v-model="searchModel.orderDate" type="month" size="small" :editable="false" placeholder="选择年月">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-button type="primary" icon="search" size="small" @click="_reload">查 询</el-button>
                            </el-form-item>
                        </el-form>
                    </yl-toolbar>
                    <yl-toolbar>
                        <el-button-group ref="funtoolbar">
                            <el-button v-for="(item,index) in funBtnConf" :key="index" :type="item.type" :name="item.name" :size="item.size" v-permissionSetting="item.permissionSetting" v-show="item.isShow" :disabled="item.disabled" @click="item.clickEvent">
                                <i :class="item.icon"></i>{{item.text}}</el-button>
                        </el-button-group>
                    </yl-toolbar>
                </div>
                <div slot="secondbox" class="flexbox">
                    <yl-table ref="table" @reload="_reload" @current-change="_currentChange" :configs="tableConfig" :input="mainInput.inputModel" :tableloading="mainTableLoading">
                        <template slot="id" scope="scope">
                            <div class="yl-table-icon">
                                <i class="icon-search2 yl-text-color" @click="_printPage(scope.row.id)"></i>
                            </div>
                        </template>
                        <template slot="view" scope="scope">
                            <el-tooltip placement="right" :visible-arrow="false" :open-delay="500" :effect="'light'">
                                <div slot="content" style="height:350px;max-width:800px">
                                    <yl-table ref="tableItem" @reload="_itemReload(scope.row.id)" :configs="tableItemConfig" :input="itemInput.inputModel" :tableloading="itemTableLoading">
                                    </yl-table>
                                </div>
                                <div class="yl-table-icon">
                                    <i class="icon-eye3 yl-text-color" @mouseover="_viewItem(scope.row.id)"></i>
                                </div>
                            </el-tooltip>
                        </template>
                        <template slot="isAudit" scope="scope">
                            <el-tag type="success" v-if="scope.row.isAudit">已审核</el-tag>
                            <el-tag type="danger" v-else>未审核</el-tag>
                        </template>
                    </yl-table>
                </div>
            </yl-layout>
            <!--编辑界面-->
            <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="large" top="8%" :lock-scroll="true" :close-on-press-escape="false" :modal-append-to-body="false" :close-on-click-modal="false">
                <Edit :selectRow="currentRows" @close="_close" :types="types" v-if="addFormVisible"></Edit>
            </el-dialog>
    
            <!--预览打印界面-->
            <el-dialog ref="printDialog" title="预览打印" v-model="printDialogVisible" size="full" top="8%" :lock-scroll="true" :close-on-press-escape="false" :modal-append-to-body="false" :close-on-click-modal="false">
                <iframe :src="reportUrl" width="100%" height="600px">
                </iframe>
            </el-dialog>
        </div>
    </yl-panelpage>
</template>

<script type="text/babel">
import Edit from './Edit';
import { inputModel } from 'api/inputmodel';
import {
    requestGetDeliveryOrderPageList,
    requestDeleteDeliveryOrder,
    requestGetDeliveryOrderItemPageList,
    requestAuditDeliveryOrder,
    requestUnAuditDeliveryOrder

} from 'api/materials/deliveryorder';
import organizeTree from 'ocomponents/organize/organizeTree';
import config from 'static/js/config';
export default {
    data() {
        return {
            selectNode: {},
            searchModel: {
                orderCode: '',
                orderDate: new Date(),
                orgId: this.getUserInfo().user.manageOrgId,
            },
            selectRows: [],
            addFormVisible: false,
            printDialogVisible: false,
            mainInput: new inputModel(),
            itemInput: new inputModel(),
            mainTableLoading: false,
            itemTableLoading: false,
            tableData: {},
            tableItemData: {},
            reportUrl: '',
             types: 0,
            funBtnConf: {
                add: {
                    name: 'add',
                    icon: 'icon-plus',
                    type: 'primary',
                    size: 'small',
                    text: '添加',
                    disabled: false,
                    isShow: true,
                    clickEvent: this._add,
                    permissionSetting: "Materials.Consume.Delivery.DeliveryOrders.Create"
                },
                edit: {
                    name: 'edit',
                    icon: 'icon-pencil',
                    type: 'primary',
                    size: 'small',
                    text: '修改',
                    disabled: true,
                    isShow: true,
                    clickEvent: this._edit,
                    permissionSetting: "Materials.Consume.Delivery.DeliveryOrders.Edit"
                },
                delete: {
                    name: 'delete',
                    icon: 'icon-trashcan',
                    type: 'danger',
                    size: 'small',
                    text: '删除',
                    disabled: true,
                    isShow: true,
                    clickEvent: this._delete,
                    permissionSetting: "Materials.Consume.Delivery.DeliveryOrders.Delete"
                },
                audit: {
                    name: 'audit',
                    icon: 'icon-user-plus',
                    type: 'primary',
                    size: 'small',
                    text: '审核',
                    disabled: true,
                    isShow: true,
                    clickEvent: this._audit,
                    permissionSetting: "Materials.Consume.Delivery.DeliveryOrders.Audit"
                },
                unAudit: {
                    name: 'unAudit',
                    icon: 'icon-user-minus',
                    type: 'primary',
                    size: 'small',
                    text: '撤销审核',
                    disabled: true,
                    isShow: true,
                    clickEvent: this._unAudit,
                    permissionSetting: "Materials.Consume.Delivery.DeliveryOrders.UnAudit"
                },
            },

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
                        { attr: { type: 'index', label: '序号', width: 65, align: 'center', showOverflowTooltip: false } },
                        //需要时开启预览和明细
                        { attr: { prop: 'orderId', label: '明细', width: 65, align: 'center', scopedSlot: 'id', showOverflowTooltip: false } },
                        { attr: { prop: 'orderId', label: '预览', width: 65, align: 'center', scopedSlot: 'view', showOverflowTooltip: false } },
                        { attr: { prop: 'isAudit', label: '审核状态', width: 100, scopedSlot: 'isAudit' } },
                        // {attr: { prop: 'orgName', label: '组织名称', width:170,  } },   
                        { attr: { prop: 'orderCode', label: '单据编号', width: 150, } },
                        { attr: { prop: 'orderDate', label: '账期', width: 100, } },
                        //{attr: { prop: 'dataType', label: '类别', width:100,  } },   
                        { attr: { prop: 'labourName', label: '用料单位', width: 130, } },
                        { attr: { prop: 'ghName', label: '工号全称', width: 130, } },
                        { attr: { prop: 'storeRoom', label: '库别', width: 130, } },
                        // {attr: { prop: 'transportNum', label: '运输单号', width:130,  } },   
                        { attr: { prop: 'auditor', label: '审核人', width: 100, } },
                        { attr: { prop: 'auditDate', label: '审核时间', width: 120, } },
                        { attr: { prop: 'maker', label: '制单人', width: 100, } },
                        { attr: { prop: 'makerDate', label: '制单时间', width: 120, } },
                        //{attr: { prop: 'isState', label: '审批状态', width:100,  } },     
                        { attr: { prop: 'remark', label: '备注', width: 150, } },
                        //注意：最后一列如果不设置列宽将会自动宽度补全
                    ]
                }
            }
        },
        tableItemConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            data: this.tableItemData,
                            highlightCurrent: true,
                        }
                    },
                    columns: [
                        { attr: { type: 'index', label: '序号', width: 65, align: 'center' } },
                         {attr: { prop: 'infoCode', label: '材料编码', width:150,  } },  
                        { attr: { prop: 'infoName', label: '材料名称', width: 120, } },
                        { attr: { prop: 'infoModel', label: '规格型号', width: 100, } },
                        { attr: { prop: 'infoUnit', label: '单位', width: 130, } },
                        { attr: { prop: 'quantity', label: '发料数量', width: 100, } },
                        { attr: { prop: 'sendPrice', label: '发料价格', width: 100, } },
                        { attr: { prop: 'sendSum', label: '发料金额', width: 100, } },
                        { attr: { prop: 'bookPrice', label: '账面价格', width: 100, } },
                        { attr: { prop: 'bookSum', label: '账面金额', width: 100, } },
                        { attr: { prop: 'barCode', label: '条码', width: 100, } },
                        { attr: { prop: 'storeRoom', label: '库别', width: 100, } },
                        { attr: { prop: 'storePosition', label: '存放地', width: 130, } },
                        //{attr: { prop: 'cId', label: '工号id', width:100,  } },   
                        {attr: { prop: 'classNodebh', label: '类别编码', width:100,  } },   
                        { attr: { prop: 'manufacturer', label: '生产厂商', width: 120, } },
                        { attr: { prop: 'batchNo', label: '炉批号', width: 120, } },
                        // {attr: { prop: 'infoRemark', label: '', width:100,  } },   
                        //{attr: { prop: 'dateType', label: '来源类型', width:100,  } },   
                        // {attr: { prop: 'dataId', label: '来源id', width:100,  } },   
                        { attr: { prop: 'remark', label: '备注', width: 130, } },

                        //注意：最后一列如果不设置列宽将会自动宽度补全
                    ]
                }
            }
        },
    },
    methods: {
        
        _viewItem(id) {
            setTimeout(() => {
                this._getDeliveryOrderItemPageList(id);
            }, 300)
        },
        //预览单据接口
        _printPage(id) {
            this.reportUrl = config.reportUrl + "/DeliveryOrder.html?id=" + id;
            this.printDialogVisible = true;
        },
        _funcState() {
            //状态判断逻辑
            if (this.selectRows.length > 0) {
                this.funBtnConf['add'].disabled = false;
                this.funBtnConf['edit'].disabled = false;
                this.funBtnConf['delete'].disabled = false;
                this.funBtnConf['audit'].disabled = false;
                this.funBtnConf['unAudit'].disabled = false;
                if (this.selectRows[0].isAudit) {
                    this.funBtnConf['edit'].disabled = true;
                    this.funBtnConf['delete'].disabled = true;
                    this.funBtnConf['audit'].disabled = true;
                    this.funBtnConf['unAudit'].disabled = false;
                } else {
                    this.funBtnConf['audit'].disabled = false;
                    this.funBtnConf['unAudit'].disabled = true;
                }
            } else {
                this.funBtnConf['add'].disabled = false;
                this.funBtnConf['edit'].disabled = true;
                this.funBtnConf['delete'].disabled = true;
                this.funBtnConf['audit'].disabled = true;
                this.funBtnConf['unAudit'].disabled = true;
            }
        },
        _currentChange(val) {
            //单选时的方法
            if (val != null) {
                this.selectRows = [];
                this.selectRows.push(val);
            }
            this._funcState();
        },
        _getDeliveryOrderPageList() {
            this.selectRows = [];
            this.mainTableLoading = true;
            var inputArr = [
                { key: "OrderCode", op: "LIKE", value: this.searchModel.orderCode },
                { key: "OrgId", op: "EQ", value: this.searchModel.orgId },
                { key: "DataType", op: "EQ", value: this.types },
                { key: "OrderDate", op: "EQ", value: this.formatDate(this.searchModel.orderDate, "YYYY-MM") },
            ];
            //排序
            this.mainInput.inputModel.sorting = "orderCode desc";
            this.mainInput.addqueryConditionItem(inputArr);
            requestGetDeliveryOrderPageList(this.mainInput.inputModel).then(data => {
                if (data.success) {
                    this.tableData = data.result;
                }
                else {
                    this.$message.error('失败！' + data.error.message);
                }
                this.mainTableLoading = false;
            }).catch(function (error) {
                this.mainTableLoading = false;
                this.$message.error('获取数据失败！');
            });
        },
        _getDeliveryOrderItemPageList(id) {
            this.itemTableLoading = true;
            var inputArr = [
                { key: "OrderId", op: "EQ", value: id },
            ];
            //排序
            this.itemInput.inputModel.sorting = "sortCode asc";
            this.itemInput.addqueryConditionItem(inputArr);
            requestGetDeliveryOrderItemPageList(this.itemInput.inputModel).then(data => {
                if (data.success) {
                    this.tableItemData = data.result;
                }
                else {
                    this.$message.error('失败！' + data.error.message);
                }
                this.itemTableLoading = false;
            })
        },
        // _selectionChange(val){
        //     //多选时的方法
        //     if(val!=null){
        //         this.selectRows=[];
        //         this.selectRows=this.selectRows.concat(val);
        //     }
        // },
        toggleRowSelection(row) {
            this.$refs.table.toggleRowSelection(row)
        },
        _reload() {
            this._getDeliveryOrderPageList();
            this._funcState();
        },
        _itemReload(id) {
            this._getDeliveryOrderItemPageList(id);
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
                requestDeleteDeliveryOrder(obj).then(data => {
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
            }).catch(() => { });
        },
        _audit() {
            //初始化表单
            let obj = {};
            obj.id = this.selectRows[0].id;
            obj.orgId = this.selectRows[0].orgId;
            requestAuditDeliveryOrder(obj).then(data => {
                if (data.success) {
                    if (data.result.result > 0) {
                        this.$notify({
                            title: '成功',
                            message: '审核单据成功！',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: data.result.errorResult,
                        });
                    }
                    this._reload();
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '审核单据失败！',
                    });
                }
            });
        },
        _unAudit() {
            let obj = {};
            obj.id = this.selectRows[0].id;
            obj.orgId = this.selectRows[0].orgId;
            requestUnAuditDeliveryOrder(obj).then(data => {
                if (data.success) {
                    if (data.result.result > 0) {
                        this.$notify({
                            title: '成功',
                            message: '撤销审核单据成功！',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: data.result.errorResult,
                        });
                    }
                    this._reload();
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '撤销审核单据失败！',
                    });
                }
            });
        },
        _close() {
            this.addFormVisible = false;
            this._reload();
        },
          initail() {
            this.types = this.$route.params.type;
            this._reload();
        }
    },
    components: {
        Edit,
        'yl-organizeTree': organizeTree,
    },
     mounted() {
        this.initail();
    },
    watch: {
        "$route": "initail"
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

