<template>
	<el-menu class="el-menu-demo" mode="horizontal" router>
		<el-menu-item class="el-menu-item" index="/"><img src="../assets/logo.png" alt="" width="25px" style="margin-bottom: 3px;">首页</el-menu-item>
		<!-- <el-submenu index="2">//多级导航演示 
			<template slot="title">我的工作台</template>
			<el-menu-item index="2-1">选项1</el-menu-item>
			<el-menu-item index="2-2">选项2</el-menu-item>
			<el-menu-item index="2-3">选项3</el-menu-item>
			<el-submenu index="2-4">
				<template slot="title">选项4</template>
				<el-menu-item index="2-4-1">选项1</el-menu-item>
				<el-menu-item index="2-4-2">选项2</el-menu-item>
				<el-menu-item index="2-4-3">选项3</el-menu-item>
			</el-submenu> -->
		<el-menu-item class="el-menu-item" index="/postvideo">投稿视频</el-menu-item>
		<el-menu-item class="el-menu-item" index="/login"  :style="{'display':disPlay1}">登录</el-menu-item>
		<el-menu-item class="el-menu-item" index="/space"  :style="{'display':disPlay2}">个人中心</el-menu-item>
		<el-menu-item class="el-menu-item" index="/about">关于A站</el-menu-item>
		<el-menu-item class="el-menu-item" @click=open()>管理员入口</el-menu-item>
		<!-- <div style="position:absolute;right: 10px;top:-15px;color: #13CE66;">
		<h1 >
			GILIGILI超和平
		</h1></div> -->

	</el-menu>
</template>

<script>
	export default {
		name: 'NavBar',
		data() {
			return {
				disPlay1: "list-item",
				disPlay2: "none",
				//监听事件
				addTodo: "",
			};
		},
		methods: {

			load() {
				//console.log(this.$cookies.isKey("gin-ess"));
				if (this.$cookies.isKey("gin-ess")) {
					this.disPlay1 = "none";
					this.disPlay2 = "list-item";
				} else {
					this.disPlay1 = "list-item";
					this.disPlay2 = "none";
				}
			},
			open() {
				if (this.$cookies.isKey("gin-adminess")){
					this.$router.push({
						name: 'AdminVideo'
					});
				} else {
					this.$router.push({
					name: 'AdminLogin'
					});
				}
			}
		},
		created() {
			//监听事件
			//console.log("监听事件");
			this.$bus.on('myspace', () => {
				//console.log(8989);
				this.load();
			});
		},
		beforeDestroy() {
		  this.$bus.off('myspace');
		},
		beforeMount() {
			this.load();
		},
	};
</script>
<style>
	/* .active1 {
		display:none;
	}
	.active2 {
		display:list-item;
	} */
</style>
