<template>
	<div class="about">
		<div class="main-contianer">
		<div class="title">(￣▽￣)"欢迎来到ailiaili</div>
		<div class="master-inof">下面是公告板</div>
		<div class="master-inof"></div>
		<div class="block">
			<el-timeline>
				<div v-for="notice in notices" :key="notice.id">
					<el-timeline-item :timestamp="timestampToTime(notice.created_at)" placement="top">
						<el-card>
							<h4>{{notice.title}}</h4>
							<p>{{notice.Info}}</p>
						</el-card>
					</el-timeline-item>
				</div>	
			</el-timeline>
		</div>
		</div>
		<el-backtop visibility-height=600></el-backtop>
	</div>
</template>

<script>
	import * as API from '@/api/notice';
	export default {
		name: 'About',
		data() {
			return {
				notices: [],	
			}
		},
		methods: {
			load() {
				API.ListNotices().then((res) =>{
					this.notices = res.data;
				});
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
		},
		beforeMount() {
			this.load();
		},
	}
</script>
<style>
	.title{
		font-family: Microsoft Yahei;
		font-weight: 500;
		font-size: 30px;
		padding: 20px;
	}
	.master-inof{
		margin-left: 55px;
		width: 1000px;
		font-family: Microsoft Yahei;
		font-weight: 500;
		font-size: 15px;
		padding-top: 20px;
	}
	.about {
	    background: #d2e9fb url(../../public/background.bc72515.png) top/contain no-repeat;
	    min-height: 55vw;
	}
</style>
