<template>
  <div v-if="isLogin==='true'">
    <el-col :span="2">
      <el-menu
        default-active="3"
        class="el-menu-vertical-demo"
        router >
        <el-menu-item index="/admin/video">
          <i class="el-icon-menu"></i>
          <span slot="title">视频</span>
        </el-menu-item>
        <el-menu-item index="/admin/notice" >
          <i class="el-icon-document"></i>
          <span slot="title">公告</span>
        </el-menu-item>
        <el-menu-item index="/admin/create/notice">
          <i class="el-icon-setting"></i>
          <span slot="title">新建公告</span>
        </el-menu-item>
        <el-menu-item @click="gexit()">
          <i class="el-icon-house"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-main>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>新建公告</span>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" prop="title">
            <el-input type="title" v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="Info">
            <el-input type="textarea" v-model="ruleForm.Info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>  
    </el-main> 
  </div>
</template>

<script>
  import * as API from '@/api/notice';
  import * as AdminAPI from '@/api/admin';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入标题'));
        } 
        callback();
      };
      var validateAdmin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入内容'));
        } 
        callback();
      };
      return {
        isLogin:'',
        ruleForm: {
          title:'',
          Info:'',
        },
        rules: {
          title: [
            { validator: validatePass, trigger: 'blur' }
          ],
          Info: [
            { validator: validateAdmin, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      onSubmit() {
					API.PostNotice(this.ruleForm).then((res) => {
						if (res.status > 0) {
							this.$notify.error({
								title: '创建失败',
								message: res.msg,
							});
						} else {
							this.$notify({
								title: '创建成功',
								message: 'success',
								type: 'success',
							});
							//跳转首页
							this.$router.push({
								name: 'AdminNotice'
							});							
						}
					}).catch((error) => {
						this.$notify.error({
							title: '网络中断或服务器宕机',
							message: error,
						});
					});
			},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      gexit() {
				AdminAPI.Exit().then((res) => {
					if (res.status > 0) {
						this.$notify.error({
							title: '登出失败',
							message: res.msg,
						});
					} else {
						this.$cookies.remove("gin-adminess");
						this.$notify({
							title: '登出成功',
							message: 'success',
							type: 'success',
						});
						//跳转首页
						this.$router.push({
							name: 'AdminLogin'
						});

					}
				}).catch((error) => {
					this.$notify.error({
						title: '登出失败',
						message: error,
					});
				});
      },
      load() {
				AdminAPI.getAdmin().then((res) => {
					if(res.status == 0){
						this.isLogin = 'true';
					} else {
						this.$notify.error({
								title: '未登录',
								message: res.msg,
							});
					}
				});
			},	
    },
    beforeMount() {
			this.load();
		},
  }
</script>
<style>
  .box-card {
    width: 500px;
    margin:0 auto;
    margin-top: 150px;
    border-radius: 10px;
    margin-bottom: 251px;
  }
</style>