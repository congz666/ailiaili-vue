<template>
  <div>
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
    <div>
      <el-table
        :data="notices"
        style="width: 50%">
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="介绍"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.Info }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="open(scope.row)"
              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="dele(scope.row.id,scope.$index)"
              >删除</el-button>
              <div>
								<el-dialog title="修改文章"  :visible.sync="dialogFormVisible" :before-close="handleClose">
									<el-form :model="form">
										<el-form-item label="标题" :label-width="formLabelWidth">
											<el-input v-model="form.title" ></el-input>
										</el-form-item>
										<el-form-item label="描述" :label-width="formLabelWidth">
											<el-input v-model="form.info" type="textarea" ></el-input>
										</el-form-item>
									</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button type="primary" @click=update(scope.row.id) icon="el-icon-edit" circle></el-button>
								</div>
								</el-dialog>
							</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
	import * as API from '@/api/notice';
	import * as AdminAPI from '@/api/admin';
  export default {
    name: "AdminNotice",
    components: {},
		data() {
			return {
        isLogin:'',
        notices:[],
        form: {
          title: '',
          info: '',
        },
			};
    },
    methods: {
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
				API.ListNotices().then((res) =>{
					this.notices = res.data;
				});
      },
      open(notice){
				this.dialogFormVisible = true;
				this.form.title = notice.title;
				this.form.info = notice.Info;
			},
      dele(val,index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					API.DeleteNotice(val).then((res) => {
						if (res.status == 0) {
							this.$notify({
                type: 'success',
                title:'删除成功',
								message: res.msg
							});
							this.notices.splice(index, 1);
						} else {
							this.$notify.error({
								title: '删除失败',
								message: res.msg,
							});
						}
					})
				}).catch(() => {
					this.$notify({
            type: 'info',
            title:'取消',
						message: '已取消删除'
					});
				});
      },
      update(val) {
				this.$confirm('此操作将修改该公告, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					API.UpdateNotice(val,this.form).then((res) => {
						if (res.status == 0) {
							this.$router.go(0);
							this.$notify({
                type: 'success',
                title:'修改成功',
								message: res.msg
							});
							this.reload();
						} else {
							this.$notify.error({
								title: '修改失败',
								message: res.msg,
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
      },
      handleClose(done) {
        this.$confirm('确认关闭？ 关闭后将不会保存你的修改')
          .then(_ => {
            this.$router.go(0);
          })
          .catch(_ => {});
      },
      	// 时间戳转换成时间
			timestampToTime(cjsj) {
				if (cjsj / 10000000000 <= 1) {
					cjsj = cjsj * 1000;
				}
				var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " ";
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + M + D + h + m + s;
				//return M+D;
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
    },
    beforeMount() {
      this.load();
    }
  }
</script>