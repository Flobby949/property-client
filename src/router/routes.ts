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
	},
	{
		path: '/remote',
		name: 'remote',
		component: () => import('@/views/remote/index.vue'),
		meta: {
			title: '远程'
		}
	},
	{
		path: '/patrolRecord',
		name: 'patrolRecord',
		component: () => import('@/views/patrolRecord/index.vue'),
		meta: {
			title: '巡检记录'
		}
	},
	{
		path: '/patrolDetail:recordId',
		name: 'patrolDetail',
		component: () => import('@/views/patrolDetail/index.vue'),
		meta: {
			title: '巡检详情'
		}
	},
	{
		path: '/submitPatrol',
		name: 'submitPatrol',
		component: () => import('@/views/submitPatrol/index.vue'),
		meta: {
			title: '提交巡检'
		}
	},
	{
		path: '/patrol',
		name: 'patrol',
		component: () => import('@/views/patrol/index.vue'),
		meta: {
			title: '巡检'
		}
	},
	{
		path: '/orderhall',
		name: 'orderhall',
		component: () => import('@/views/orderhall/index.vue'),
		meta: {
			title: '工单大厅'
		}
	},
	{
		path: '/orderDetail/:orderId',
		name: 'orderDetail',
		component: () => import('@/views/orderDetail/index.vue'),
		meta: {
			title: '工单详情'
		}
	}
]

export default routes
