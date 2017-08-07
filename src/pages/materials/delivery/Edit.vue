<template>
    <div>
        <el-row class="yl-order-header">
            <el-col :span="2">
                <img src="../../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
            </el-col>
            <el-col :span="18">
                <div class="yl-order-title">
                    <span class="yl-order-small-title">{{title}}&nbsp;&nbsp;&nbsp;</span>{{types==0?'发料单':'原材料发料单'}}</div>
            </el-col>
            <el-col :span="4">
                <div class="yl-order-code">
                    <span style="color: red;">NO.</span>{{formModel.order.orderCode}}</div>
            </el-col>
        </el-row>
        <el-form :model="formModel.order" :rules="rules" ref="formModel" label-width="100px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="记帐单位" prop="orgId">
                        <yl-organizeTree v-model="formModel.order.orgId" :placeholder="'请选择记帐单位'" :isexpand="true" @getCurrentNode="_getCurrentNodeOrg" style="width:80%">
                        </yl-organizeTree>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="账期" prop="orderDate">
                        <el-date-picker v-model="formModel.order.orderDate" @change="_dateSel" type="month" :editable="false" placeholder="请选择账期" style="width:80%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用料单位" prop="labourName">
                        <yl-ComLabour v-model="formModel.order.labourName" :placeholder="'请选择用料单位'" @selectNode="selectNodeLabour" :isexpand="true" style="width:80%"></yl-ComLabour>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="工号" prop="gId">
                        <yl-GHTree :placeholder="'请选择工号'" v-model="formModel.order.gId" :defaultText="formModel.order.ghName" @getCurrentNode="_getCurrentNode" style="width:80%">
                        </yl-GHTree>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="库别" prop="storeRoom">
                        <yl-dataDictionaryForTree :code="'StoreRoom'" :placeholder="'请选择库别'" v-model="formModel.order.storeRoom" :isexpand="true" @getCurrentNode="_getCurrentStroreRoom" style="width:80%">
                        </yl-dataDictionaryForTree>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="收料方" prop="allotOrgId"  v-if="this.types==1">
                        <yl-organizeTree v-model="formModel.order.allotOrgId"
                         :placeholder="'请选择记帐单位'"
                         :isexpand="true"   
                         @getCurrentNode="_getCurrentAllot" style="width:80%">
                        </yl-organizeTree>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="yl-row-TableEditor">
                <el-col :span="24">
                    <yl-tableedit ref="tableedit" 
                    :tableConfig="tableEditConfig" 
                    :tableData="formModel.items" 
                    :sumRowConf="sumRowConf" 
                    :mapConfig="tableEditMapConfig" 
                    @delItem="_delItem"></yl-tableedit>
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
                <el-button type="primary" @click="_onSelect"><i class="icon-plus"></i>选材</el-button>
                <el-button type="primary" @click="_onSubmit" :loading="loading">
                    <i class="icon-floppy-disk"></i>保存</el-button>
            </el-form-item>
    
        </el-form>
        <el-dialog ref="selectDialog2" title="选择"
                    v-model="addFormVisible" 
                    size="large"
                    top="8%"
                    :modal="false" 
                    :lock-scroll="true"
                    :close-on-press-escape="false"
                    :modal-append-to-body="false" 
                    :close-on-click-modal="false">
               <yl-selectFromCurStore 
                    :isSelectClose="true"
                    @close="_close" 
                    v-if="addFormVisible">
               </yl-selectFromCurStore>
        </el-dialog>
    </div>
</template>
<script type="text/babel">
import selectFromCurStore from 'ocomponents/selectmodule/selectFromCurStore'
import organizeTree from 'ocomponents/organize/organizeTree';
import config from 'static/js/config';
import GHTree from 'ocomponents/gh/GHTree';
import ComLabour from 'ocomponents/comlabour/ComLabour'
import dataDictionaryForTree from 'ocomponents/datadictionary/dataDictionaryForTree';
import {
    requestCreateOrUpdateDeliveryOrder,
    requestGetDeliveryOrderForEdit,
    requestDeleteDeliveryOrderItem,
    requestGetCurrentStoreForEdit,
} from 'api/materials/deliveryorder';
export default {
    data() {
        return {
            editResult: {
                storeQtt: 0,
                storeBsum: 0
            },
            formModel: {
                order: {
                    orderId: '',
                    orgId: this.getUserInfo().user.manageOrgId,
                    orgName: this.getUserInfo().user.manageOrgName,
                    orderCode: '',
                    orderDate: new Date(),
                    dataType: this.types,
                    dataId: '',
                    sId: this.getUserInfo().user.id,
                    labourId: '',
                    labourName: '',
                    gId: '',
                    ghCode: '',
                    ghAbbName: '',
                    ghName: '',
                    transportNum: '',
                    isAudit: '',
                    auditor: '',
                    auditDate: '',
                    maker: '',
                    makerDate: '',
                    isState: '',
                    personOne: '',
                    personTwo: '',
                    personThree: '',
                    storeRoom: '',
                    personFour: '',
                    personFive: '',
                    remark: '',
                    allotOrgId:'',
                    allotOrgName:'',
                    allotOrderId:'',
                },
                items: [],
                config: { isGenerateCode: true },
            },
            rules: {
                orgId: [
                    { required: true, message: '记帐单位名称不能为空！', trigger: 'blur' }
                ],
                orderDate: [
                    { type: 'date', required: true, message: '账期不能为空！', trigger: 'blur' }
                ],
                labourName: [
                    { required: true, message: '用料单位不能为空！', trigger: 'change' }
                ],
                gId: [
                    { required: true, message: '用料单位不能为空！', trigger: 'change' }
                ],
                storeRoom: [
                    { required: true, message: '库别不能为空！', trigger: 'change' }
                ],
            },
            sumRowConf: {
                disable: false, //是否显示
                sumText: '合计:', //合计文本
                items: {
                    //合计项配置
                    //quantity: { text: '数量合计', sumval: 0.00, capitalCol: false },
                    //sendPrice: { text: '发料价格', sumval: 0.00, capitalCol: false },
                    sendSum: { text: '发料金额', sumval: 0.00, capitalCol: false },
                    //bookPrice: { text: '账面价', sunval: 0.00, capitalCol: false },
                    bookSum: { text: '账面金额', sunval: 0.00, capitalCol: true }
                }
            },
            loading: false,
            addFormVisible: false,
            addFormVisibleMaterials:false,
            orderDateInital: '',
            title: config.Order.title

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
        },
         types: {
            type: String,
            default: "0",
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
                        { attr: { prop: 'infoUnit', label: '单位', width: 65, } },
                        { attr: { prop: 'quantity', label: '数量', width: 100, scopedSlot: 'quantity', } },
                        { attr: { prop: 'bookPrice', label: '账面价格', width: 100, scopedSlot: 'bookPrice', } },
                        { attr: { prop: 'bookSum', label: '账面金额', width: 100, scopedSlot: 'bookSum', } },
                        { attr: { prop: 'sendPrice', label: '发料价格', width: 100, scopedSlot: 'sendPrice', } },
                        { attr: { prop: 'sendSum', label: '发料金额', width: 100, scopedSlot: 'sendSum', } },
                        { attr: { prop: 'remark', label: '备注', width: 100, scopedSlot: 'remark', } },
                        { attr: { prop: 'barCode', label: '条码', width: 100, } },
                        //{attr: { prop: 'storeRoom', label: '库别', width:100,  } },
                        { attr: { prop: 'storePosition', label: '存放地', width: 100, } },
                        //{attr: { prop: 'cId', label: '', width:100,  } },
                        //{attr: { prop: 'classNodeBh', label: '类别编码', width:100,  } },
                        { attr: { prop: 'manufacturer', label: '生产厂商', width: 100, } },
                        { attr: { prop: 'batchNo', label: '炉批号', width: 100, } },
                        // {attr: { prop: 'infoRemark', label: '', width:100,  } },
                        //{attr: { prop: 'dateType', label: '来源类型', width:100,  } },
                        // {attr: { prop: 'dataId', label: '', width:100,  } },

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
                                    //console.log(row);
                                    requestGetCurrentStoreForEdit(row.sId).then(data => {
                                        if (data.success) {
                                            this.editResult.storeQtt = data.result.currentStore.storeQuantity;
                                            this.editResult.storeBsum = data.result.currentStore.storeBookSum;
                                        }
                                        else {
                                            this.$message.error('失败！' + data.error.message);
                                        }
                                        if (row.quantity > this.editResult.storeQtt) {
                                            row.quantity = this.editResult.storeQtt;
                                            this.$message.error('提示：发料数量已超过当前库存量，不能发料！');
                                        } else {
                                            row.sendSum = parseFloat(row.quantity) * row.sendPrice;
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
                        type: 'input', name: 'sendPrice',
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
                                if (this.checkdecimalfn(row.sendPrice)) {
                                    row.sendSum = parseFloat(row.sendPrice) * row.quantity
                                } else {
                                    row.sendPrice = 0.00;
                                    this.$message.error('输入类型有误！');
                                }
                                this._sumCount();
                            },
                        }
                    },
                    {
                        type: 'input', name: 'sendSum',
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
                                if (this.checkdecimalfn(row.sendSum)) {
                                    row.sendPrice = row.quantity == 0 ? 0 : parseFloat(row.sendSum) / row.quantity;
                                } else {
                                    row.sendSum = 0.00;
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
        tableEditMapConfig: {
            get() {
                return {
                    mapconf: [
                        //明细编辑列和选材控件列映射配置
                        { prop: 'id', isplace: false, defaultval: '0', selprop: '' },    //主键列
                        { prop: 'dataId', isplace: true, defaultval: '', selprop: 'id' }, //来源ID
                        { prop: 'dateType', isplace: false, defaultval: '6', selprop: '' },  //来源类型  // 0 常用材料库 1 进料登记选材 2 从总需用计划选材  3 进料登记（30进料登记PDA选材 31发料登记选材 32内部调拨登记选材 33外部调拨登记选材 ）4从磅单选材 5 合同选材 6从库存选材
                        { prop: 'guid', isplace: false, defaultval:this.newGuid(),selprop: '' },  //临时ID唯一键
                        // { prop: 'itemId', isplace: true,defaultval:'', selprop:'itemId',  },
                        { prop: 'orderId', isplace: false,defaultval:'', selprop:'orderId',  },
                        { prop: 'orgId', isplace: true,defaultval:'', selprop:'orgId',  },
                        { prop: 'sId', isplace: true, defaultval: '', selprop: 'id', }, //库存选材id
                        { prop: 'infoNM', isplace: true, defaultval: '', selprop: 'infoNM', },
                        { prop: 'infoCode', isplace: true, defaultval: '', selprop: 'infoCode', },
                        { prop: 'infoName', isplace: true, defaultval: '', selprop: 'infoName', },
                        { prop: 'infoModel', isplace: true, defaultval: '', selprop: 'infoModel', },
                        { prop: 'infoUnit', isplace: true, defaultval: '', selprop: 'infoUnit', },
                        { prop: 'barCode', isplace: false, defaultval: '', selprop: '', },
                        { prop: 'storeRoom', isplace: true, defaultval: '', selprop: 'storeRoom', },
                        { prop: 'storePosition', isplace: true, defaultval: '', selprop: 'storePosition', },
                        { prop: 'cId', isplace: true, defaultval: '', selprop: 'cId', },
                        { prop: 'classNodeBh', isplace: true, defaultval: '', selprop: 'classNodebh', },
                        { prop: 'manufacturer', isplace: true, defaultval: '', selprop: 'manufacturer', },
                        { prop: 'batchNo', isplace: true, defaultval: '', selprop: 'batchNo', },
                        { prop: 'infoRemark', isplace: false, defaultval: '', selprop: '', },
                        { prop: 'quantity', isplace: true, defaultval: '', selprop: 'storeQuantity', },
                        { prop: 'sendPrice', isplace: true, defaultval: '', selprop: 'bookPrice', },
                        { prop: 'sendSum', isplace: true, defaultval: '', selprop: 'bookSum', },
                        { prop: 'bookPrice', isplace: true, defaultval: '', selprop: 'bookPrice', },
                        { prop: 'bookSum', isplace: true, defaultval: '', selprop: 'storeSum', },
                        { prop: 'remark', isplace: false, defaultval: '', selprop: 'infoRemark', },
                    ]
                }
            }
        },
    },
    methods: {
        _sumCount(colName) {
            //计算列的合计值  合计方法计算逻辑
            let  sendSum = 0.00, bookSum = 0.00;
            this.formModel.items.map((item) => {
                sendSum = sendSum + parseFloat(item.sendSum);
                bookSum = bookSum + parseFloat(item.bookSum);
            })    
            this.sumRowConf.items.sendSum.sumval = sendSum.toFixed(2);
            this.sumRowConf.items.bookSum.sumval = bookSum.toFixed(2);
        },
        _formInitial() {
            //初始化表单
            requestGetDeliveryOrderForEdit(this.selectRow.id).then(data => {
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
                    requestDeleteDeliveryOrderItem(obj).then(data => {
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
                    requestCreateOrUpdateDeliveryOrder(this.formModel).then((data) => {
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
        _getCurrentStroreRoom(selectNode) {
            this.storeRoom = selectNode.text;
        },
        _getCurrentStoreForEdit(sId) {

        },
        _getCurrentAllot(data){
            this.formModel.order.allotOrgName=data.text;
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
             this.addFormVisible=true;
        },
        selectNodeLabour(node) {
            this.formModel.order.labourId = node.id;
            this.formModel.order.labourName = node.labourName;
        },
        _getCode(val) {
            this.generateOrderCode('M_DeliveryOrder', this.formModel.order.orgId, val, (val) => {
                this.formModel.order.orderCode = val;
            }, this.types);
        },
        _getCurrentNodeOrg(data) {
            this.formModel.order.orgName = data.text;
            let val = this.formatDate(this.formModel.order.orderDate, "YYYY-MM");
            this._getCode(val);
        },
        _getCurrentNode(data) {
            this.formModel.order.ghCode = data.code;
            this.formModel.order.ghName = data.text;
            this.formModel.order.ghAbbName = data.text;
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
        'yl-GHTree': GHTree,
        'yl-ComLabour': ComLabour,
        'yl-dataDictionaryForTree': dataDictionaryForTree,
    },
    watch: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
