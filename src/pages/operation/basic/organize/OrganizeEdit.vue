<template>
    <div>
        <el-form :model="formModel" :rules="rules" ref="formModel" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="上级名称" prop="parentId">
                        <yl-organizeTree v-model="formModel.parentId" :placeholder="'请选择上级名称'" :isexpand="false"></yl-organizeTree>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门类别" prop="category">
                        <el-select v-model="formModel.category" placeholder="请选择部门类别" style="width:100%;" @change="_selChange">
                            <el-option v-for="item in parametersTreeData" :key="item.value" :label="item.text" :value="item.text">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="部门简称" prop="shortName">
                        <el-input v-model="formModel.shortName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门全称" prop="abbName">
                        <el-input v-model="formModel.abbName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="网址" prop="web">
                        <el-input v-model="formModel.web"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主负责人" prop="manager">
                        <el-input v-model="formModel.manager"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电话" prop="outerPhone">
                        <el-input v-model="formModel.outerPhone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="内线" prop="innerPhone">
                        <el-input v-model="formModel.innerPhone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="传真" prop="fax">
                        <el-input v-model="formModel.fax"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sortCode">
                        <el-input-number v-model="formModel.sortCode" :min="1"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="经度" prop="longitude">
                        <el-input v-model="formModel.longitude"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="纬度" prop="latitude">
                        <el-input v-model="formModel.latitude"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="formModel.address"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="orgDescription">
                    <el-input v-model="formModel.orgDescription" type="textarea" style="width:100%" row="5"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item v-if="isZhbVisible" label="指挥部" prop="zhbId" style="width:100%;">
                        <el-select v-model="formModel.zhbId" placeholder="请选择指挥部" style="width:100%;" @change="_change">
                            <el-option v-for="item in organizeZhb" :key="item.value" :label="item.text" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item >
        <el-checkbox v-model="isClose">保存后关闭</el-checkbox>
        <div style="text-align:right;">
            <el-button @click="_resetForm">重置</el-button>
            <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
        </div>
    </el-form-item>
        </el-form>
    </div>
</template>
<script type="text/babel">
import {
    requestCreateOrUpdateOrganize,
    requestGetParametersTreeList,
    requestGetOrganizeZHB
} from 'api/organize';
import util from 'common/js/util';
import organizeTree from 'ocomponents/organize/organizeTree'
export default {
    data() {
        return {
            formModel: {
                parentId: '',
                nodeCode: '',
                zhbId: '',
                category: '',
                orgCode: '',
                shortName: '',
                abbName: '',
                fullPathName: '',
                outerPhone: '',
                innerPhone: '',
                fax: '',
                address: '',
                web: '',
                manager: '',
                orgDescription: '',
                sortCode: 1,
                longitude:'',
                latitude:'',
                zhbId: ''
            },
            rules: {
                parentId: [
                    { required: true, message: '上级名称不能为空！', trigger: 'change' }
                ],
                category: [
                    { required: true, message: '部门类别不能为空！', trigger: 'change' }
                ],
                shortName: [
                    { required: true, message: '部门简称不能为空！', trigger: 'blur' }
                ],
                abbName: [
                    { required: true, message: '部门全称不能为空！', trigger: 'blur' }
                ],
                // zhbId: [
                //     { required: true, message: '请选择指挥部！', trigger: 'blur' }
                // ],
            },
            parametersTreeData: [],
            organizeZhb: [],
            defaultProps: {
                children: 'children',
                label: 'text',
                id: 'id'
            },
            selectNode: { id: '' },
            loading: false,
             isClose:true,
            isZhbVisible: false,
        }
    },
    props: {
        selectRow: {},
        isVisible: false
    },
    methods: {
        _change(val) {
            console.log(val);
        },
        _getParametersTreeList() {
            var _this = this;
            requestGetParametersTreeList().then(data => {
                if (data.success) {
                    this.parametersTreeData = data.result;
                }
                else {
                    this.$message.error('获取数据失败！' + data.error.message);
                }
            })
        },
        _getOrganizeZHB() {
            requestGetOrganizeZHB().then(data => {
                if (data.success) {
                    this.organizeZhb = data.result;
                }
                else {
                    this.$message.error('获取数据失败！' + data.error.message);
                }
            })
        },
        _selChange(val) {
            if (val == "项目经理部") {
                this.isZhbVisible = true;
                this._getOrganizeZHB();
            } else {
                this.isZhbVisible = false;
            }
        },
        _onSubmit() {
            this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let params = {};
                    params.organize = this.formModel;
                    requestCreateOrUpdateOrganize(params).then(data => {
                        if (data.success) {
                            this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                            });
                            //关闭面板
                            this._complete(this.isClose);
                        }
                        else {
                            this.$message.error('保存数据失败！' + data.error.message);
                        }
                        this.loading = false;
                    }).catch(function (error) {
                        this.loading = false;
                    })
                } else {
                    return false;
                }
            });
        },
        _resetForm() {
            this.$refs.formModel.resetFields();
        },
        _complete() {
            this.$emit('close');
        },
    },
    mounted() {
        this._getParametersTreeList();
        Object.assign(this.formModel, this.selectRow);
        console.log(this.formModel);
    },
    components: {
        'yl-organizeTree': organizeTree,
    },
    watch: {
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
