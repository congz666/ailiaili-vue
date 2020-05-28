import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
	routes: [{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/about",
			name: "about",
			component: () =>
				import( /* webpackChunkName: "about" */ "./views/About.vue"),
		},
		{
			path: "/postvideo",
			name: "postVideo",
			component: () =>
				import( /* webpackChunkName: "video" */ "./views/PostVideo.vue"),
		},
		{
			path: "/video/av:videoID",
			name: "ShowVideo",
			component: () =>
				import('./views/ShowVideo.vue'),
		},
		{
			path: "/login",
			name: "Login",
			component: () =>
				import( /* webpackChunkName: "video" */ "./views/Login.vue"),
		},
		{
			path: "/register",
			name: "Register",
			component: () =>
				import('./views/Register.vue'),
		},
		{
			path: "/space",
			name: "Space",
			redirect: "/space/me",
			component: () =>
				import('./views/Space.vue'),
			children: [{
					path: "/space/me",
					name: "Spaces",
					component: () =>
						import('./views/Spaces.vue'),
				},
				{
					path: "/space/revise",
					name: "UserRevise",
					component: () =>
						import('./views/UserRevise.vue'),
				},
				
			]
		},
		{
			path: "/admin/login",
			name: "AdminLogin",
			component: () =>
				import('./views/AdminLogin.vue'),
		},
		{
			path: "/admin/video",
			name: "AdminVideo",
			component: () =>
				import('./views/AdminVideo.vue'),
		},
		{
			path: "/admin/notice",
			name: "AdminNotice",
			component: () =>
				import('./views/AdminNotice.vue'),
		},
		{
			path: "/user/:userID",
			name: "AboutUser",
			component: () =>
				import('./views/AboutUser.vue'),
		},
		{
			path: "/admin/create/notice",
			name: "CreateNotice",
			component: () =>
				import('./views/CreateNotice.vue'),
		},
	]
});
