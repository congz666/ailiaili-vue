<template>
	<div class="space">
		<div class="main-contianer">
			<div class="h">
				<div class="h-info">
					<div class="h-avatar">
						<el-avatar :size="65" :src="circleUrl"></el-avatar>
					</div>
					<div class="h-basic">
						<div id="h-name">{{gname}}</div>
						<div id="h-uid">UID:{{guid}}</div>
						<!-- <div id="h-sign">{{gsign}}</div> -->
					</div>
				</div>
			</div>
      <div class="main-contianer">
          <div class="col-1">
            <div class="my-videos">我的视频</div>
            <div class="my-top" style="margin-bottom: 10px;">
              <el-row :gutter="20">
                <el-col :span="6" v-for="(video,index) in videos" :key="video.id">
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
                  </el-card>
                </el-col>
              </el-row>
            </div>
            <div class="blocks">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="12" :page-sizes="[6, 12]"
              layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="col-2">
            <div class="sections">
              <div class="sections-title">
                关于我
              </div>
              <div class="itext">{{itext}}</div>
            </div>
            <div class="sections">
              <div class="sections-day">
                <div class="s-sex">
                  <div class="s-sextxt"><img :src="gsex" width="32px" height="32px"></div>
                  <div class="s-sextxt" id="s-sextxt">{{gsextxt}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
		</div>
	</div>
</template>

<script>
	import * as API from '@/api/video';
	import * as APIs from '@/api/login';
	export default {
		name: "AboutUser",
		components: {},
		data() {
			return {
				circleUrl: "https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/nofaces.png",
				gname: "gay哩gay哩大爆炸",
				guid: 0,
        showtxt: "编辑",
        videos: [],
				start: 0,
				limit: 12,
				total: 0,
				itext: "",
				gsex: "",
				gsextxt:"",
			};
		},
		methods: {
			load() {
				API.getUserVideos(this.$route.params.userID,this.start, this.limit).then((res) => {
					this.videos = res.data.items;
					this.total = res.data.total;
				});
				APIs.getUser(this.$route.params.userID).then((res) => {
					if (res.data.avatar != "") {
						this.circleUrl = res.data.avatar;
					}
					this.gname = res.data.nickname;
					this.guid = res.data.id;
					this.itext = res.data.sign;
					if (res.data.sex == "" || res.data.sex == "保密") {
						this.gsex = "https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/%E5%A4%96%E6%98%9F%E4%BA%BA%20.png";
					} else if (res.data.sex == "男") {
						this.gsex = "https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/%E6%80%A7%E5%88%AB%E7%94%B7.png";
						this.gsextxt = "绅士";
					} else {
						this.gsex = "https://giligili-img-av.oss-cn-hangzhou.aliyuncs.com/img/%E6%80%A7%E5%88%AB%E5%A5%B3.png";
						this.gsextxt = "淑女";
					}
				});
			},
			goVideo(video) {
				//$router.push 加上一层
				this.$router.push({
					name: 'ShowVideo',
					params: {
						videoID: video.id
					}
				});
			},
      handleSizeChange(val) {
				this.limit = val;
				this.load();

			},
			handleCurrentChange(val) {
				this.start = this.limit * (val - 1); // val 页面
				this.load();
			},
		},
		beforeMount() {
			this.load();
		},
	}
</script>
<style>
	.h {
		position: relative;
		width: 100%;
		padding-top: 150px;
		height: 100px;
		background-image: url(https://ailiaili.oss-cn-hongkong.aliyuncs.com/upload/background/background_gaitubao_1500x440_gaitubao_1500x272.jpg);
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
	}


	.h-info {
		height: 69px;
		margin-left: 20px;
		padding-bottom: 31px;
	}

	.h-avatar {
		float: left;
		width: 65px;
		height: 65px;
		border: 2px solid hsla(0, 0%, 100%, .4);
		border-radius: 52px;
	}

	.h-basic {
		float: left;
		color: #FFFFFF;
		font-size: 0;
		margin: 10px 0 0 20px;
	}

	#h-name {
		display: inline-block;
		margin-right: 5px;
		font-weight: 700;
		line-height: 18px;
		font-size: 18px;
		vertical-align: middle;
	}

	#h-uid {
		margin-top: 8px;
		color: #CFDEE4;
		font-size: 14px;
		line-height: 26px;
		height: 20px;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	#h-sign {
		margin-top: 4px;
		color: #CFDEE4;
		font-size: 14px;
		line-height: 20px;
		height: 26px;
		width: 740px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.my-top {
		min-height: 600px;
	}

	.col-1 {
		margin-top: 10px;
		background: #fff;
		border: 1px solid #eee;
		border-radius: 4px;
		float: left;
		padding: 15px 20px;
		width: 918px;
	}

	.col-2 {

		width: 340px;
		float: right;
	}

	.sections {
		margin-top: 10px;
		background: #fff;
		border: 1px solid #eee;
		border-radius: 4px;
		float: left;
		padding: 15px 20px;
		margin-left: 8px;
		width: 290px;
	}

	.sections-title {
		border-bottom: 1px solid #e5e9ef;
		font-size: 14px;
		font-weight: 700;
		padding: 0;
		margin: -15px 0 10px;
		height: 45px;
		line-height: 45px;
	}

	#sections-exit {
		background: #F56C6C;
		color: #FFFFFF;
	}

	.sections-exit {
		text-align: center;
		cursor: pointer;
	}

	.s-sex {
		height: 32px;
		width: 140px;
		float: left;
	}

	.s-sextxt {
		float: left;
	}

	#s-sextxt {
		margin-top: 6px;
		color: #6D757A;
	}

	.s-birthday {
		float: right;
		height: 32px;
		width: 140px;
	}

	#s-birthday {
		margin-top: 6px;
		margin-left: 4px;
		color: #6D757A;
	}

	.itext {
		width: 100%;
		height: 172px;
		color: #6d757a;
		font-size: 13px;
		font-family: Microsoft Yahei;
		line-height: 20px;
		padding: 10px;
		margin: -10px 0 0 -11px;
	}

	.my-videos {
		font-size: 20px;
		font-weight: 400;
		line-height: 33px;
		padding: 0 0 15px;
	}


	.videoInof {
		margin-top: 10px;
		width: 150px;
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
		position: relative;
		margin-top: 10px;
		cursor: pointer;
	}

	.el-card__body {
		padding: 20px 20px 10px 20px;
	}

	.video-more {
		width: 25px;
		height: 25px;
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
</style>
