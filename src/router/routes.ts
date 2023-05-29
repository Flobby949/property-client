import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/index.vue'
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'root',
		component: Layout,
		meta: {
			title: '首页'
		},
		redirect: 'home',
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '主页'
				}
			},
			{
				path: 'order',
				name: 'order',
				component: () => import('@/views/order/index.vue'),
				meta: {
					title: '工单'
				}
			},
			{
				path: 'my',
				name: 'my',
				component: () => import('@/views/my/index.vue'),
				meta: {
					title: '我的',
					noCache: true
				}
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录'
		},
		component: Login
	},
	{
		path: '/first',
		name: 'first',
		meta: {
			title: '启动页'
		},
		component: () => import('@/views/first/index.vue')
	},
	{
		path: '/repassword',
		name: 'repassword',
		meta: {
			title: '重置密码'
		},
		component: () => import('@/views/login/repassword/index.vue')
	}
]

export default routes
