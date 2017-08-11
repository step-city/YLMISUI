
<template>
    <div>
        <el-form :model="formModel" :rules="rules" ref="formModel" label-width="80px">
            <el-form-item label="角色名称" prop="roleId">
                <yl-roleTree v-model="formModel.roleId" :placeholder="'请选择'" :isexpand="false">
                </yl-roleTree>
            </el-form-item>
            <el-form-item label="权限范围" prop="orgId">
                <yl-organizeTree v-model="formModel.orgId" :placeholder="'请选择'" :isexpand="false">
                </yl-organizeTree>
            </el-form-item>
            <el-form-item style="text-align:right;">
                <el-button @click="_complete">取消</el-button>
                <el-button @click="_onReturn" :loading="loading">返回</el-button>
                <el-button type="primary" @click="_onSubmit" :loading="loading">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/babel">
import organizeTree from 'ocomponents/organize/organizeTree'
import roleTree from 'ocomponents/role/roleTree'
import util from 'common/js/util';
import {
    requestSystemRoam,
    requestReturnSystemRoam,
    requestGetCurrentLoginInformations,
} from 'api/login';
export default {
    data() {
        return {
            formModel: {
                roleId: '',
                orgId: '',
            },
            rules: {
                roleId: [
                    { required: true, message: '角色不能为空！', trigger: 'change' }
                ],
                orgId: [
                    { required: true, message: '权限范围不能为空！', trigger: 'change' }
                ],

            },
            loading: false
        }
    },
    props: {
        isVisible: false
    },
    methods: {
        _onSubmit() {
            let _this = this;
            this.$refs.formModel.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let params = {};
                    params = this.formModel;
                    requestSystemRoam(params).then(data => {
                        if (data.success) {
                            requestGetCurrentLoginInformations().then(
                                data => {
                                    if (data.success) {
                                        util.setCookie('userInfo', JSON.stringify(data.result), 1);
                                        if (this.$router.name !== "首页") {
                                            this.$router.push({ path: '/home' });
                                        }
                                        this.$notify({
                                            title: '成功',
                                            message: '已返回原定角色',
                                            type: 'success'
                                        });
                                        window.location.reload();
                                        //关闭面板
                                        this._complete();
                                    }
                                })
                        }
                        else {
                            this.$message.error('失败！' + data.error.message);
                        }
                        this.loading = false;
                    }).catch(function (error) {
                        _this.loading = false;
                    })
                } else {
                    _this.$message.warning('请按照条件填充表单！');
                    return false;
                }

            });
        },
        _onReturn() {
            let _this = this;
            this.loading = true;
            let params = {};
            params = this.formModel;
            requestReturnSystemRoam(params).then(data => {
                if (data.success) {
                    requestGetCurrentLoginInformations().then(
                        data => {
                            if (data.success) {
                                util.setCookie('userInfo', JSON.stringify(data.result), 1);
                                if (this.$router.name !== "首页") {
                                    this.$router.push({ path: '/home' });
                                }
                                this.$notify({
                                    title: '成功',
                                    message: '已漫游至选定角色',
                                    type: 'success'
                                });
                                window.location.reload();
                                //关闭面板
                                this._complete();
                            }
                        })
                }
                else {
                    this.$message.error('失败！' + data.error.message);
                }
                this.loading = false;
            }).catch(function (error) {
                _this.loading = false;
            })
        },
        _complete() {
            this.$emit('close');
        }
    },
    components: {
        'yl-organizeTree': organizeTree,
        'yl-roleTree': roleTree,
    },
    mounted() {
        Object.assign(this.formModel, this.selectRow);
    },
    watch: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
