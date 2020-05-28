<template>
  <div v-if="isLogin==='true'">
    <el-col :span="2">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        router >
        <!--
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        -->
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
    <div class="AdminVideo">
      <div class="main-contianer">
        <div class="left">
          <div class="top" style="margin-bottom: 10px;">
            <el-row :gutter="20">
              <el-col :span="6" v-for="video in videos" :key="video.id">
                <el-card class="video-card">
								<div class="atomimg" @click="goVideo(video)">
									<img class="video-avatar" :src="video.avatar" width="100%">
								</div>
								<div class="videoInof" @click="goVideo(video)">
									<div class="video-title">{{video.title}}</div>
									<div class="bottom clearfix" style="margin-top: 4px;">
										<span class="video-info">{{video.Info.substring(0,35)}}</span>
									</div>
								</div>
								<!-- @click="handDelete(video.id)" -->
								<div class="video-more" @click="open(video.id,index)">
									<el-tooltip class="item" effect="dark" content="删除本视频" placement="right" :hide-after="1000">
										<img src="../../public/更多.png" width="14px">
									</el-tooltip>
								</div>
							</el-card>
              </el-col>
            </el-row>
          </div>
          <div class="fenye">
            <div class="blocks">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="12" :page-sizes="[6, 12]"
              layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="home-right">
          <div class="right-top">
            排行榜
          </div>
          <div class="right-show">
            <div class="right-show-card" v-for="video in rivideos" :key="video.id" @click="goVideo(video)">
              <div class="right-show-card-img">
                <img class="rivideo-avatar" :src="video.avatar" width="100%">
              </div>
              <p class="rivideo-title">{{video.title}}</p>
              <p class="rivideo-viev">播放量:{{video.view}}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
	import * as API from '@/api/video';
	import * as AdminAPI from '@/api/admin';
	
	export default {
		name: "AdminVideo",
		components: {},
		data() {
			return {
				videos: [],
				rivideos: [],
				start: 0,
				limit: 12,
				total: 0,
				isLogin:'',
			};
		},
		methods: {
			handleSizeChange(val) {
				this.limit = val;
				this.load();
			},
			handleCurrentChange(val) {
				this.start = this.limit * (val - 1); // val 页面
				this.load();
			},
			load() {
				API.getVideos(this.start, this.limit).then((res) => {
					this.videos = res.data.items;
					this.total = res.data.total;
				});
				API.getRiVideo().then((res) => {
					this.rivideos = res.data;
				});
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
			goVideo(video) {
				//$router.push 加上一层
				this.$router.push({
					name: 'ShowVideo',
					params: {
						videoID: video.id,
						userID: video.user,
					}
				});
      },
      open(val,index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					API.adminDeleteVideo(val).then((res) => {
						if (res.status == 0) {
							this.$message({
								type: 'success',
								message: '删除成功'
							});
							this.videos.splice(index, 1);
						} else {
							this.$notify.error({
								title: '删除失败',
								message: res.msg,
							});
						}
					}).catch((error) => {
						this.$notify.error({
							title: '网络中断或服务器宕机',
							message: error,
						});
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
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
		},
	};
</script>



<style>
	.home {
		min-height: 640px;
	}

	.left {
		float: left;
	}

	.top {

		width: 1000px;
		min-height: 600px;
	}

	.home-right {
		border: 1px solid #eee;
		border-radius: 4px;
		float: right;
		width: 288px;
		margin-top: 10px;
		margin-left: 10px;
		min-height: 600px;
		background: #fff;
	}

	.right-top {
		font-size: 18px;
		font-weight: 400;
		width: 290px;
		padding: 20px;
		height: 20px;
	}

	.videoInof {
		margin-top: 10px;
		width: 100%;
		height: 0;
		padding-bottom: 35%;
		overflow: hidden;
	}

	.atomimg {
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		overflow: hidden;
	}

	.right-show-card-img {

		width: 120px;
		height: 0;
		padding-bottom: 25%;
		overflow: hidden;
		border-radius: 4px;
	}

	.rivideo-avatar {
		/* width: 100%;
		height: 0;
		padding-bottom: 80%;
		overflow: hidden; */
	}

	.rivideo-title {
		position: absolute;
		left: 135px;
		top: 15px;
		height: 36px;
		line-height: 18px;
		margin-top: -3px;
		width: 140px;
		overflow: hidden;
	}

	.rivideo-viev {
		position: absolute;
		left: 135px;
		top: 55px;
		color: #99a2aa;
		height: 15px;
		line-height: 15px;
		font-size: 15px;
		margin-top: -3px;
		width: 150px;
		overflow: hidden;
	}

	.video-title {
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.video-info {
		color: #999;
		font-size: 13px;
	}

	.video-card {
		margin-top: 10px;
		cursor: pointer;
	}

	.right-show-card {
		position: relative;
		padding-left: 8px;
		padding-top: 8px;
		padding-bottom: 10px;
		cursor: pointer;
	}

	.fenye {
		max-width: 1300px;
		margin: 0 auto;
	}

	.blocks {}


	.video-more {
		width: 25px;
		height: 25px;
		display:inline;
		right: 10px;
		bottom: 10px;
	}
  .atomimg {
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		overflow: hidden;
	}


</style>
