import { createRouter, createWebHashHistory, type RouteLocationNormalized } from 'vue-router'
import routes from './routes'
import { useCachedViewStoreHook } from '@/store/modules/cachedView'
import NProgress from '@/utils/progress'

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export interface toRouteType extends RouteLocationNormalized {
	meta: {
		title?: string
		noCache?: boolean
	}
}

const whiteList = ['/login', '/first', '/repassword']
router.beforeEach((to: toRouteType, from, next) => {
	const token = localStorage.getItem('accessToken')

	NProgress.start()
	// 路由缓存
	// useCachedViewStoreHook().addCachedView(to);

	// 判断是否登录
	if (!token && !whiteList.includes(to.path)) {
		next('/first')
	}

	// 页面 title
	document.title = '智慧管家物业' + '-' + to.meta.title
	next()
})

router.afterEach(() => {
	NProgress.done()
})

export default router
