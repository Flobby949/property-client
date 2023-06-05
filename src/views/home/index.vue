<template>
	<div class="bg-gray-100 h-[770px] pb-[50px]">
		<!-- 轮播图开始 -->
		<div>
			<van-swipe class="bg-red-50 w-[99%] mx-auto h-[200px]" :autoplay="4000" indicator-color="white">
				<van-swipe-item v-for="image in images" :key="image">
					<img :src="image" class="h-[200px] w-full" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<!-- 轮播图结束 -->

		<!-- 通知栏开始 -->
		<div class="mt-3">
			<van-notice-bar class="noticebar" color="#003333" background="#FFFFFF" left-icon="volume-o" :scrollable="false">
				<van-swipe vertical class="notice-swipe" :autoplay="10000" :touchable="false" :show-indicators="false">
					<van-swipe-item>明月直入，无心可猜。</van-swipe-item>
					<van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
					<van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
				</van-swipe>
			</van-notice-bar>
		</div>
		<!-- 通知栏结束 -->
		<!-- 今日巡更开始 -->
		<div class="w-[95%] bg-gradient-to-b from-blue-500 bg-white to-blue-400 mx-auto h-[150px] rounded-2xl mt-3 flex flex-col" @click="toPatrol">
			<div class="h-[35px] text-white font-medium text-lg flex flex-row justify-center mt-3">今日巡更</div>
			<div class="h-[35px] text-white flex flex-row justify-center">随时随地更新概况</div>
			<div class="h-[80px] flex flex-row items-center justify-center mt-5 pb-3">
				<div class="w-[70px] h-[60px] bg-white bg-opacity-30 rounded-lg flex flex-col justify-center items-center text-white">
					<div class="font-bold text-2xl">{{ numberForm.pointNumber }}</div>
					<div class="text-xs">巡更点</div>
				</div>
				<div class="w-[70px] h-[60px] mx-8 bg-white bg-opacity-30 rounded-lg flex flex-col justify-center items-center text-white">
					<div class="font-bold text-2xl">{{ numberForm.overPointNumber }}</div>
					<div class="text-xs">已巡更</div>
				</div>
				<div class="w-[70px] h-[60px] bg-white bg-opacity-30 rounded-lg flex flex-col justify-center items-center text-white">
					<div class="font-bold text-2xl">{{ numberForm.noPointNumber }}</div>
					<div class="text-xs">未巡更</div>
				</div>
			</div>
		</div>
		<!-- 今日巡更结束-->

		<!-- 物业管理开始 -->
		<div class="mt-4 bg-white w-full flex flex-col pb-[10px] px-[20px] pt-[10px]">
			<div class="flex flex-row items-center">
				<div class="w-2 h-6 rounded-full bg-blue-400"></div>
				<div class="ml-2">物管服务</div>
			</div>
			<div class="flex flex-row items-center mt-4">
				<div class="w-[160px] h-[70px] bg-red-100 rounded-lg flex flex-row justify-between px-3 items-center">
					<div>住户管理</div>
					<div class="w-[40px] h-[40px] bg-blue-400 rounded-full flex flex-row justify-center items-center">
						<img src="../../assets/home.png" class="icon" />
					</div>
				</div>
				<div class="w-[160px] h-[70px] bg-purple-100 rounded-lg ml-4 flex flex-row justify-between px-3 items-center">
					<div>故障上报</div>
					<div class="w-[40px] h-[40px] bg-red-400 rounded-full flex flex-row justify-center items-center">
						<img src="../../assets/weixian.png" class="icon1" />
					</div>
				</div>
			</div>
			<div class="flex flex-row items-center mt-4">
				<div class="w-[160px] h-[70px] bg-green-100 rounded-lg flex flex-row justify-between px-3 items-center" @click="remoteClick">
					<div>远程开门</div>
					<div class="w-[40px] h-[40px] bg-green-400 rounded-full flex flex-row justify-center items-center">
						<img class="icon" src="../../assets/opendoor.png" />
					</div>
				</div>
				<div class="w-[160px] h-[70px] bg-blue-100 rounded-lg ml-4 flex flex-row justify-between px-3 items-center" @click="hallClick">
					<div>工单大厅</div>
					<div class="w-[40px] h-[40px] bg-blue-300 rounded-full flex flex-row justify-center items-center">
						<img class="icon" src="../../assets/page.png" />
					</div>
				</div>
			</div>
		</div>
		<!-- 物业管理结束 -->
	</div>
</template>

<script setup>
import { useOverNumber, useNoNumber, useAllNumber } from '@/api/safe/record.ts'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const width = ref('20px')

const router = useRouter()

const images = reactive([
	'https://img1.baidu.com/it/u=3086004583,4040837842&fm=253&fmt=auto&app=138&f=JPEG?w=929&h=500',
	'	https://img2.baidu.com/it/u=812172674,2357715273&fm=253&fmt=auto&app=138&f=PNG?w=687&h=500',
	'https://img1.baidu.com/it/u=2954759472,3173416665&fm=253&fmt=auto&app=138&f=JPEG?w=561&h=346'
])

const numberForm = reactive({
	pointNumber: '',
	overPointNumber: '',
	noPointNumber: ''
})

const remoteClick = () => {
	router.push({
		path: '/remote'
	})
}

const getPatrolNumbers = () => {
	useAllNumber().then(res => {
		console.log(res.data)
		Object.assign(numberForm, res.data)
	})
	useOverNumber().then(res => {
		Object.assign(numberForm, res.data)
	})

	useNoNumber().then(res => {
		Object.assign(numberForm, res.data)
	})
}
getPatrolNumbers()

const toPatrol = () => {
	router.push({ path: '/patrol' })
}

const hallClick = () => {
	router.push({ path: '/orderhall' })
}
</script>

<style scoped>
.notice-swipe {
	height: 40px;
	line-height: 40px;
}
.icon {
	width: 20px;
	height: 20px;
}
.icon1 {
	width: 25px;
	height: 25px;
}
</style>
