<template>
  <div class="admin">
    <el-main>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>管理员登录</span>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="user_name">
            <el-input type="admin" v-model="ruleForm.user_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <GtPage @ok="ok"></GtPage>
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
  import * as API from '@/api/admin';
  import GtPage from './GtPage.vue';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        callback();
      };
      var validateAdmin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } 
        callback();
      };
      return {
        okk: 0,
        ruleForm: {
          user_name:'',
          password:'',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          user_name: [
            { validator: validateAdmin, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ok(val) {
				this.okk = val;
			},
      onSubmit() {	
        if (this.okk == 1) {
					API.AdminLogin(this.ruleForm).then((res) => {
						if (res.status > 0) {
							this.$notify.error({
								title: '登录失败',
								message: res.msg,
							});
						} else {
							this.$cookies.set("gin-adminess","6666",3600*24*6); 
							this.$notify({
								title: '登录成功',
								message: 'success',
								type: 'success',
							});
							//跳转首页
							this.$router.push({
								name: 'AdminVideo'
							});							
						}
					}).catch((error) => {
						this.$notify.error({
							title: '网络中断或服务器宕机',
							message: error,
						});
          });
        }else{
					this.$notify.error({
						title: '请验证',
						message: '',
					});
				}
			},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components: {
			GtPage,
		},
  }
</script>
<style>
  .box-card {
    width: 350px;
    margin:0 auto;
    margin-top: 150px;
    border-radius: 10px;
    margin-bottom: 251px;
  }
  .admin{
    background-image: url(https://ailiaili.oss-cn-hongkong.aliyuncs.com/img/background.png);
  }
</style>