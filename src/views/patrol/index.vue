<template>
	<div class="w-[100%]" style="background-color: #f5f5f5">
		<NavBar title="今日巡更" right-title="巡更记录" @ClickRight="rightClick"> </NavBar>

		<div class="rounded-b-[50px] h-[170px] w-[99%] mx-auto flex justify-center items-center" style="background-color: #409eff">
			<div class="flex justify-center items-center mb-10">
				<div class="bg-white rounded-md w-[90px] h-[75px] bg-opacity-50 mr-6 text-center text-white font-bold">
					<div class="mt-2 text-2xl">{{ numberForm.pointNumber }}</div>
					<div class="">巡更点</div>
				</div>
				<div class="bg-white rounded-md w-[90px] h-[75px] bg-opacity-50 text-center text-white font-bold">
					<div class="mt-2 text-2xl">{{ numberForm.overPointNumber }}</div>
					<div class="">已巡更</div>
				</div>
				<div class="bg-white rounded-md w-[90px] h-[75px] bg-opacity-50 ml-6 text-center text-white font-bold">
					<div class="mt-2 text-2xl">{{ numberForm.noPointNumber }}</div>
					<div class="">未巡更</div>
				</div>
			</div>
		</div>

		<van-list v-model:loading="loading" finished-text="没有更多了" :finished="finished" class="relative bottom-[46px]" @load="onLoad">
			<div
				v-for="(item, index) in list.values"
				:key="index"
				class="border-slate-300 border-[1px] w-[350px] mx-auto rounded-md bg-white h-[150px] mt-2"
			>
				<div class="flex mt-5">
					<div class="flex-9 ml-5 text-[17px] text-black font-normal mb-1 w-[217px]">{{ item.title }}</div>
					<div v-if="item.status == 0" class="flex-1 relative">
						<van-button plain hairline type="primary" round size="small" class="w-[80px] relative bottom-[8px] left-5" style="height: 28px"
							>未巡更</van-button
						>
					</div>

					<div v-if="item.status == 1" class="flex-1 relative">
						<van-button type="primary" round size="small" class="w-[80px] relative bottom-[8px] left-5" style="height: 28px" color="#ad9ea0"
							>已巡更</van-button
						>
					</div>
				</div>
				<div class="border-b border-slate-300 border-dashed"></div>

				<div class="flex mt-3 ml-5">
					<div class="text-slate-400 flex-grow">
						<div v-if="item.type == 0" class="text-[16px] font-normal">巡检类型:巡更点</div>
						<div v-if="item.type == 1" class="text-[16px] font-normal">巡检类型:巡更项目</div>

						<div class="text-[16px] font-normal mt-[2px]">巡检时间：{{ item.startTime }}-{{ item.endTime }}</div>
						<div class="text-[16px] font-normal mt-[1px]">巡检人：{{ item.realname }}</div>
					</div>
					<div v-if="item.status == 0" class="relative right-9">
						<van-button
							type="danger"
							round
							size="small"
							class="w-[80px] relative top-5 left-6 text-[20px]"
							style="height: 28px"
							@click="onSubmit(item)"
							>去巡更</van-button
						>
					</div>
					<div v-if="item.status == 1" class="relative right-9">
						<van-button
							type="danger"
							round
							size="small"
							class="w-[80px] relative top-5 left-6 text-[20px]"
							style="height: 28px"
							color="#5798e3"
							@click="DetailClick(item.id)"
							>查看</van-button
						>
					</div>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { useOverNumber, useNoNumber, useAllNumber } from '@/api/safe/record'
import { ref } from 'vue'
import { useTodayList } from '@/api/safe/record'
import { reactive } from 'vue'

const router = useRouter()
const route = useRoute()
const userId = route.query.id
const id = userId
console.log(id + 'jsdfiklsdjfkljsdklj')

const numberForm = reactive({
	pointNumber: '',
	overPointNumber: '',
	noPointNumber: ''
})
const inspectorId = ref(10004)
const getPatrolNumbers = () => {
	useAllNumber(id).then(res => {
		console.log(res.data)

		Object.assign(numberForm, res.data)
	})
	useOverNumber(id).then(res => {
		console.log(res.data)
		Object.assign(numberForm, res.data)
	})

	useNoNumber(id).then(res => {
		Object.assign(numberForm, res.data)
	})
}

const rightClick = () => {
	router.push({ path: '/patrolRecord' })
}

const DetailClick = (id: any) => {
	console.log(id)

	router.push({ name: 'patrolDetail', params: { recordId: id } })
}
const onSubmit = (item: any) => {
	console.log('你好' + item.title)
	console.log('你好' + item)

	router.push({ path: '/submitPatrol', query: { item: JSON.stringify(item) } })
	// router.push({ path: '/submitPatrol', query: item })
}

const list = reactive<any>([])

const elements = ref<any>({
	inspectorId: 10004,
	page: 1,
	limit: 5
})
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)

const onLoad = () => {
	loading.value = true
	// 异步更新数据
	// setTimeout 仅做示例，真实场景中一般为 ajax 请求
	setTimeout(() => {
		getPatrolNumbers()
		useTodayList({
			params: {
				...elements.value
			}
		}).then(res => {
			list.values = res.data
		})
		// 加载状态结束
		loading.value = false
		// 数据全部加载完成
		finished.value = true
	}, 1000)
}
</script>

<style scoped></style>
