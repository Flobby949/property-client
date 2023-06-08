<template>
	<div>
		<div class="h-52 bg-blue-400"></div>
		<div class="flex -mt-32">
			<van-image class="ml-10 -mt-8" round width="5rem" height="5rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
			<p class="text-white ml-5">用户2023</p>
		</div>
		<van-sidebar class="mt-20 ml-4">
			<van-sidebar-item title="服务工具" />
		</van-sidebar>
		<van-cell-group class="">
			<van-cell title="上报记录" size="large" is-link @click="repair">
				<template #icon>
					<van-icon class="ml-1 mr-1" name="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/shangbao.png" size="22"></van-icon>
				</template>
			</van-cell>
			<van-cell title="巡更记录" size="large" is-link @click="patrolRecordClick">
				<template #icon>
					<van-icon class="mr-1" name="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/xungeng.png" size="26"></van-icon>
				</template>
			</van-cell>
			<van-cell title="工单记录" url="" size="large" is-link @click="orderRecordClick">
				<template #icon>
					<van-icon class="mr-1" name="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/gongdan.png" size="26"></van-icon>
				</template>
			</van-cell>
			<van-cell title="设置" url="" size="large" is-link>
				<template #icon>
					<van-icon class="mr-1" name="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/shezhi.png" size="24"></van-icon>
				</template>
			</van-cell>
		</van-cell-group>
	</div>
</template>

<script setup lang="ts">
import router from '@/router'

const patrolRecordClick = () => {
	router.push({
		path: '/patrolRecord'
	})
}
const orderRecordClick = () => {
	router.push({
		path: 'order'
	})
}
const repair = () => {
	router.push({
		path: '/repair'
	})
}
</script>

<style scoped></style>
