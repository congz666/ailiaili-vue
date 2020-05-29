<template>
	<div class="register">
		<div class="main-contianer">
			<div class="mycard">
				<div class="title">注册：</div>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="用户昵称" :rules="[{ required: true, message: '账号不能为空'},]">
						<el-input v-model="form.nickname"></el-input>
					</el-form-item>
					<el-form-item label="账号" :rules="[{ required: true, message: '账号不能为空'},]">
						<el-input v-model="form.user_name"></el-input>
					</el-form-item>

					<el-form-item label="密码" :rules="[{ required: true, message: '密码不能为空'},]">
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" :rules="[{ required: true, message: '密码不能为空'},]">
						<el-input type="password" v-model="form.password_confirm"></el-input>
					</el-form-item>
					<el-form-item label="头像" >
						<el-upload class="avatar-uploader" action="" label="描述" ref="upload" :before-upload="fnBeforeUpload" :http-request="fnUploadRequest"
						:show-file-list="false">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div class="el-upload__tip" slot="tip">只能上传png/jpg文件，且不超过2M</div>
						</el-upload>
					</el-form-item>
					<el-form-item>
						<GtPage @ok="ok"></GtPage>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">注册</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script src="http://static.geetest.com/static/tools/gt.js"></script>
<script>
	import * as API from '@/api/login';
	import * as uplpadAPI from '@/api/upload/';
	import GtPage from './GtPage.vue';
	export default {
		name: 'Register',
		data() {
			return {
				okk: 0,
				imageUrl: '',
				form: {
					nickname: '',
					user_name: '',
					password: '',
					password_confirm: '',
					avatar: '',
				},
			};
		},
		methods: {
			ok(val) {
				this.okk = val;
			},
			onSubmit() {
				if (this.okk == 1) {
					API.postRegister(this.form).then((res) => {
						if (res.status > 0) {
							this.$notify.error({
								title: '注册失败',
								message: res.msg,
							});
						} else {
							this.$notify({
								title: '注册成功',
								message: 'success',
								type: 'success',
							});
							this.$router.push({
								name: 'Login'
							});
						}

					}).catch((error) => {
						this.$notify.error({
							title: '注册失败惹',
							message: error,
						});
					});
				} else {
					this.$notify.error({
						title: '请验证',
						message: '',
					});
				}

			},
			fnBeforeUpload(file) {
				const isPNG = (file.type === 'image/png' || file.type === 'image/jpeg');
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isPNG) {
					this.$message.error('上传头像图片只能是 PNG/JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isPNG && isLt2M;
			},
			fnUploadRequest(option) {
				uplpadAPI.postUploadToken(option.file.name).then((res) => {
					const oReq = new XMLHttpRequest();
					oReq.open('PUT', res.data.put, true);
					oReq.send(option.file);
					oReq.onload = () => {
						this.imageUrl = res.data.get;
						this.form.avatar = res.data.key;
					};
				}).catch((error) => {
					this.$notify.error({
						title: '网路错误，或者服务器宕机',
						message: error,
					});
				});
			},
		},
		comments: {},
		components: {
			GtPage,
		},
	};
</script>

<style>
	.title {
		font-family: Microsoft Yahei;
		font-weight: 500;
		font-size: 30px;
		padding: 20px;
	}

  .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		max-width: 178px;
		max-height: 178px;
		display: block;
	}
</style>
