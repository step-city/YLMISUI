<template>
    <div>
        <el-row class="yl-order-header">
            <el-col :span="2">
                <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
            </el-col>
            <el-col :span="18">
                <div class="yl-order-title">
                    <span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>报废单</div>
            </el-col>
            <el-col :span="4">
                <div class="yl-order-code">
                    <span style="color: red;">NO.</span>{{formModel.order.orderCode}}</div>
            </el-col>
        </el-row>
        <el-form :model="formModel.order" :rules="rules" ref="formModel" label-width="100px">
            <el-row>
    
                <el-col :span="8">
                    <el-form-item label="记账单位" prop="orgId">
                        <yl-organizeTree v-model="formModel.order.orgId" :placeholder="'请选择记账单位'" :isexpand="true" @getCurrentNode="_getCurrentNodeOrg" style="width:80%">
                        </yl-organizeTree>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="账期" prop="orderDate">
                        <el-date-picker v-model="formModel.order.orderDate" @change="_dateSel" type="month" :editable="false" placeholder="请选账期" style="width:80%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="报废原因" prop="scrapReason">
                        <yl-dataDictionaryForSel :code="'ScrapReason'" v-model="formModel.order.scrapReason" :placeholder="'请选择报废原因'" style="width:80%"></yl-dataDictionaryForSel>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="yl-row-TableEditor">
                <el-col :span="24">
                    <yl-tableedit ref="tableedit" :tableConfig="tableEditConfig" :tableData="formModel.items" :sumRowConf="sumRowConf" :mapConfig="tableEditMapConfig" @delItem="_delItem"></yl-tableedit>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formModel.order.remark" type="textarea" row="5" style="width:95%"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="签字人一：" prop="personOne">
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="签字人二：" prop="personTwo">
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="制单人：" prop="maker">
                        <span>{{formModel.order.maker}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item style="text-align:right;">
                <el-button type="primary" @click="_onSelect">
                    <i class="icon-plus"></i>选材</el-button>
                <el-button type="primary" @click="_onSubmit" :loading="loading">
                    <i class="icon-floppy-disk"></i>保存</el-button>
               
            </el-form-item>
    
        </el-form>
    
        <el-dialog ref="selectDialog2" title="选择" v-model="addFormVisible" size="large" top="8%" :modal="false" :lock-scroll="true" :close-on-press-escape="false" :modal-append-to-body="false" :close-on-click-modal="false">
            <yl-selectFromCurStore :isSelectClose="true" @close="_close" v-if="addFormVisible">
            </yl-selectFromCurStore>
        </el-dialog>
    
    </div>
</template>
<script type="text/babel">
import selectFromCurStore from 'ocomponents/selectmodule/selectFromCurStore'
import config from 'static/js/config';
import organizeTree from 'ocomponents/organize/organizeTree';
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
import {
    requestCreateOrUpdateScrapOrder,
    requestGetScrapOrderForEdit,
    requestDeleteScrapOrderItem,
    requestGetCurrentStoreForEdit,
} from 'api/materials/scraporder';
export default {
    data() {
        return {
            editResult: {
                storeQtt: 0,
                storeBsum: 0
            },
            formModel: {
                order: {
                    orderDate: new Date(),
                    orderId: '',
                    orgId: this.getUserInfo().user.manageOrgId,
                    orgName: this.getUserInfo().user.manageOrgName,
                    orderCode: '',
                    scrapReason: '',
                    isAudit: '',
                    auditor: '',
                    auditDate: '',
                    maker: '',
                    makerDate: '',
                    isState: '',
                    personOne: '',
                    personTwo: '',
                    personThree: '',
                    personFour: '',
                    personFive: '',
                    remark: '',
                },
                items: [],
                config: { isGenerateCode: true },
            },
            rules: {

                orgId: [
                    { required: true, message: '记账单位不能为空！', trigger: 'change' }
                ],
                orderDate: [
                    { type: 'date', required: true, message: '账期不能为空！', trigger: 'blur' }
                ],
                scrapReason: [
                    { required: true, message: '报废原因不能为空！', trigger: 'blur' }
                ],

            },
            sumRowConf: {
                disable: false, //是否显示
                sumText: '合计', //合计文本
                items: {
                    bookSum: { text: '账面金额', sumval: 0.00, capitalCol: true },
                    purchasedSum: { text: '调拨金额', sumval: 0.00, capitalCol: false }
                }
            },
            loading: false,
            addFormVisible: false,
            orderDateInital: '',
            title: config.Order.title,
            tableEditMapConfig: {}
        }
    },
    props: {
        selectRow: {
            type: Object,
            default: {},
        },
        isVisible: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        tableEditConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            highlightCurrent: true,
                            style: { width: '100%', height: '300px' },
                        }
                    },
                    columns: [
                        { attr: { type: 'index', label: '序号', width: 65, align: 'center' } },
                        { attr: { prop: 'id', label: '操作', width: 65, scopedSlot: 'id', } },
                        //列配合
                        { attr: { prop: 'infoName', label: '材料名称', width: 100, } },
                        { attr: { prop: 'infoModel', label: '规格型号', width: 100, } },
                        { attr: { prop: 'infoUnit', label: '单位', width: 100, } },
                        { attr: { prop: 'quantity', label: '数量', width: 100, scopedSlot: 'quantity', } },
                        { attr: { prop: 'bookPrice', label: '账面价', width: 100, scopedSlot: 'bookPrice', } },
                        { attr: { prop: 'bookSum', label: '账面金额', width: 100, scopedSlot: 'bookSum', } },
                        { attr: { prop: 'scrapPrice', label: '报废价', width: 100, scopedSlot: 'scrapPrice', } },
                        { attr: { prop: 'purchasedSum', label: '报废金额', width: 100, scopedSlot: 'purchasedSum', } },
                        { attr: { prop: 'remark', label: '备注', width: 100, scopedSlot: 'remark', } },
                        { attr: { prop: 'barCode', label: '条码', width: 100, } },
                        { attr: { prop: 'storeRoom', label: '库别', width: 100, } },
                        { attr: { prop: 'storePositin', label: '存放地', width: 100, } },
                        //{attr: { prop: 'classNodeBh', label: '类别编号', width:100,  } },   
                        { attr: { prop: 'manufacturer', label: '生产厂商', width: 100, } },
                        { attr: { prop: 'batchNo', label: '炉批号', width: 100, } },
                        //{attr: { prop: 'infoRemark', label: '材料备注', width:100,  } },   


                        //注意：最后一列如果不设置列宽将会自动宽度补全
                    ],


                    //编辑列具名配置
                    solSlotConf: [{
                        type: 'input',   // 类型  目前 支持 input switch datepick
                        name: 'quantity',  //字段名称
                        elmentConfig: {  //控件配置   参照elementui配置参数
                            maxlength: 1000000,
                            minlength: 0,
                            size: "small",
                            disabled: false,
                            type: "text",
                            placeholder: "",
                            icon: "",
                            readonly: false,
                        },
                        eventconf: {     //事件配置  目前只支持input的 blur事件
                            ison: true,  //开启事件
                            event: (row, name) => {  //事件逻辑
                                if (this.checkdecimalfn(row.quantity)) {
                                    requestGetCurrentStoreForEdit(row.sId).then(data => {
                                        if (data.success) {
                                            this.editResult.storeQtt = data.result.currentStore.storeQuantity;
                                        } else {
                                            this.$message.error('失败！' + data.error.message);
                                        } if (row.quantity > this.editResult.storeQtt) {
                                              row.quantity = this.editResult.storeQtt;
                                            this.$message.error('提示：废料数量已超过当前库存量，不能发料！');
                                        } else {
                                            row.purchasedSum = parseFloat(row.quantity) * row.scrapPrice;
                                            row.bookSum = parseFloat(row.quantity) * row.bookPrice;
                                        }
                                        this._sumCount();
                                    });
                                } else {
                                    row.quantity = 0.00;
                                    this.$message.error('输入类型有误！');
                                }

                            },
                        },
                    },
                     {
                        type: 'input', name: 'scrapPrice',
                        elmentConfig: {
                            maxlength: 1000000,
                            minlength: 0,
                            size: "small",
                            disabled: false,
                            type: "text",
                            placeholder: "",
                            icon: "",
                            readonly: false,
                        },
                        eventconf: {
                            ison: true,
                            event: (row, name) => {
                                if (this.checkdecimalfn(row.scrapPrice)) {
                                    row.purchasedSum = parseFloat(row.scrapPrice) * row.quantity
                                } else {
                                    row.scrapPrice = 0.00;
                                    this.$message.error('输入类型有误！');
                                }
                                this._sumCount();
                            },
                        }
                    },
                    {
                        type: 'input', name: 'purchasedSum',
                        elmentConfig: {
                            maxlength: 1000000,
                            minlength: 0,
                            size: "small",
                            disabled: false,
                            type: "text",
                            placeholder: "",
                            icon: "",
                            readonly: false,
                        },
                        eventconf: {
                            ison: true,
                            event: (row, name) => {
                                if (this.checkdecimalfn(row.purchasedSum)) {
                                    row.scrapPrice = row.quantity == 0 ? 0 : parseFloat(row.purchasedSum) / row.quantity;
                                } else {
                                    row.purchasedSum = 0.00;
                                    this.$message.error('输入类型有误！');
                                }
                                this._sumCount();
                            },
                        }
                    },
                    {

                        type: 'input', name: 'remark',
                        elmentConfig: {
                            maxlength: 1000000,
                            minlength: 0,
                            size: "small",
                            disabled: false,
                            type: "text",
                            placeholder: "",
                            icon: "",
                            readonly: false,

                        },
                        eventconf: {
                            ison: true,
                            event: (row) => {
                            },
                        }
                    },

                    ],

                }
            }
        },
        MapConfig1: {
            get() {
                return {
                    mapconf: [
                        //明细编辑列和选材控件列映射配置
                        { prop: 'id', isplace: false, defaultval: '0', selprop: '' },    //主键列
                        { prop: 'dataId', isplace: true, defaultval: '', selprop: 'id' }, //来源ID
                        { prop: 'dataType', isplace: false, defaultval: '0', selprop: '' },  //来源类型  // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材     
                        { prop: 'guid', isplace: false, defaultval: this.newGuid(), selprop: '' },  //临时ID唯一键
                        { prop: 'itemId', isplace: true, defaultval: '', selprop: 'itemId', },
                        { prop: 'orderId', isplace: true, defaultval: '', selprop: 'orderId', },
                        { prop: 'orgId', isplace: true, defaultval: '', selprop: 'orgId', },
                        { prop: 'sId', isplace: true, defaultval: '', selprop: 'id', },
                        { prop: 'infoNM', isplace: true, defaultval: '', selprop: 'infoNM', },
                        { prop: 'infoCode', isplace: true, defaultval: '', selprop: 'infoCode', },
                        { prop: 'infoName', isplace: true, defaultval: '', selprop: 'infoName', },
                        { prop: 'infoModel', isplace: true, defaultval: '', selprop: 'infoModel', },
                        { prop: 'infoUnit', isplace: true, defaultval: '', selprop: 'infoUnit', },
                        { prop: 'barCode', isplace: true, defaultval: '', selprop: 'barCode', },
                        { prop: 'storeRoom', isplace: true, defaultval: '', selprop: 'storeRoom', },
                        { prop: 'storePositin', isplace: true, defaultval: '', selprop: 'storePositin', },
                        { prop: 'cId', isplace: true, defaultval: '', selprop: 'cId', },
                        { prop: 'classNodeBh', isplace: true, defaultval: '', selprop: 'classNodeBh', },
                        { prop: 'manufacturer', isplace: true, defaultval: '', selprop: 'manufacturer', },
                        { prop: 'batchNo', isplace: true, defaultval: '', selprop: 'batchNo', },
                        { prop: 'infoRemark', isplace: true, defaultval: '', selprop: 'infoRemark', },
                        { prop: 'quantity', isplace: true, defaultval: '', selprop: 'storeQuantity', },
                        { prop: 'bookPrice', isplace: true, defaultval: '', selprop: 'bookPrice', },
                        { prop: 'bookSum', isplace: true, defaultval: '', selprop: 'bookSum', },
                        { prop: 'scrapPrice', isplace: true, defaultval: '', selprop: 'bookPrice', },
                        { prop: 'purchasedSum', isplace: true, defaultval: '', selprop: 'bookSum', },
                        { prop: 'dataId', isplace: true, defaultval: '', selprop: 'id', },
                        //{ prop: 'dataType', isplace: true,defaultval:'', selprop:'dataType',  },   
                        { prop: 'remark', isplace: false, defaultval: '', selprop: '', },



                    ]
                }
            }
        },
    },
    methods: {
        _sumCount(colName) {
            //计算列的合计值  合计方法计算逻辑
            let purchasedSum = 0.00, bookSum = 0.00;
            this.formModel.items.map((item) => {
                purchasedSum = purchasedSum + parseFloat(item.purchasedSum);
                bookSum = bookSum + parseFloat(item.bookSum);
            })
            this.sumRowConf.items.purchasedSum.sumval = purchasedSum.toFixed(2);
            this.sumRowConf.items.bookSum.sumval = bookSum.toFixed(2);
        },
        _formInitial() {
            //初始化表单
            requestGetScrapOrderForEdit(this.selectRow.id).then(data => {
                if (data.success) {
                    Object.assign(this.formModel, data.result);
                    this.orderDateInital = this.formModel.order.orderDate;
                    this.formModel.order.orderDate = new Date(this.formModel.order.orderDate);
                    this._sumCount();
                } else {
                    this.$message.error('获取编辑表信息失败！');
                }
            });
        },
        _delItem(row) {
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning',
                modal: false
            }).then(() => {
                if (row.id !== "0") {
                    //后台删除
                    let obj = {};
                    obj.id = row.id;
                    requestDeleteScrapOrderItem(obj).then(data => {
                        if (data.success) {
                            let index = this.formModel.items.indexOf(row);
                            this.formModel.items.splice(index, 1);
                            this._sumCount();
                            this.$notify({
                                title: '成功',
                                message: '删除数据成功！',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '删除数据失败！' + data.error.message,
                            });
                        }
                    })
                } else {
                    //前台删除
                    let index = this.formModel.items.indexOf(row);
                    this.formModel.items.splice(index, 1);
                    this._sumCount();
                    this.$notify({
                        title: '成功',
                        message: '删除数据成功！',
                        type: 'success'
                    });
                }

            }).catch(() => { });
        },
        _onSubmit() {
            let _this = this;
            this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.formModel.items = this.$refs.tableedit.getEditData();
                    if (this.formModel.items.length == 0) {
                        this.$message({ message: `请选择材料明细！`, type: 'warning' });
                        return;
                    }
                    this.formModel.order.orderDate = this.formatDate(this.formModel.order.orderDate, "YYYY-MM");
                    this.formModel.order.isAudit = false;
                    if (this.formModel.order.orderId !== "") {
                        //修改
                        if (this.orderDateInital == this.formModel.order.orderDate) {
                            this.formModel.config.isGenerateCode = false;
                        }
                    }
                    this.loading = true;
                    requestCreateOrUpdateScrapOrder(this.formModel).then((data) => {
                        if (data.success) {
                            this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                            });
                            //关闭面板
                            this._complete();
                        }
                        else {
                            this.$message.error('保存数据失败！' + data.error.message);
                        }
                        this.loading = false;
                    }).catch(function (error) {
                        _this.loading = false;
                    });
                } else {
                    this.$message({ message: `请按照条件填写表单！`, type: 'warning' });
                }
            });
        },
        _getCurrentNodeOrg(data) {
            this.formModel.order.orgName = data.text;
            let val = this.formatDate(this.formModel.order.orderDate, "YYYY-MM");
            this._getCode(val);
        },
       _getCurrentStoreForEdit(sId) {

        },
        _resetForm() {
            this.$refs.formModel.resetFields();
        },
        _complete() {
            this.$emit('close');
        },
        _close() {
            //关闭选材框
            this.addFormVisible = false;
            this._sumCount();
        },
        _onSelect() {
            //打开选材框的权限判断
            this.tableEditMapConfig = this.MapConfig1;
            this.addFormVisible = true;
        },
        _getCode(val) {
            this.generateOrderCode('M_ScrapOrder', this.formModel.order.orgId, val, (val) => {
                this.formModel.order.orderCode = val;
            });
        },
        _dateSel(val) {
            this._getCode(val);
        }
    },
    mounted() {
        if (this.selectRow.id != undefined) {
            //修改
            this._formInitial();
        } else {
            let val = this.formatDate(this.formModel.order.orderDate, "YYYY-MM");
            this._getCode(val);
        }
    },
    components: {
        'yl-selectFromCurStore': selectFromCurStore,
        'yl-organizeTree': organizeTree,
        'yl-dataDictionaryForSel': dataDictionaryForSel,

    },
    watch: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
