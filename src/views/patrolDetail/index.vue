<script setup lang="ts">
import { cloneVNode, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRecordDetail } from '@/api/safe/Trecords'
const route = useRoute()
const recordId: any = ref('')
const recordDetail: any = reactive({})
const photoUrl: RecordItem | any = reactive([])

onMounted(async () => {
	recordId.value = route.params.recordId
	console.log(recordId.value)
	getRecordDetail(recordId.value).then(res => {
		Object.assign(recordDetail, res.data)
		console.log(recordDetail)
		const urls: any = recordDetail.photo.split('-')
		console.log('-------------------------' + urls)
		for (let i = 0; i < urls.length; i++) {
			photoUrl.push(urls[i])
		}
	})
})

//详情类型
interface RecordItem {
	id: number
	planId: number
	pathId: number
	wayName: string
	communityName: string
	buildingName?: string
	units?: number
	startTime: string
	endTime: string
	pointId: number
	pointName: string
	inspectorId: number
	realname: string
	phone: string
	type: number
	inspectorTime?: string
	inspectorResult?: string
	photoRequirement: number
	photo: string
	notes?: string
	status: number
}
</script>
<template>
	<div class="w-full bg-gray-100">
		<NavBar title="巡更详情"> </NavBar>
		<div class="bg-blue-500 rounded-b-[50px] h-[150px] w-[99%] mx-auto"></div>
		<div class="bg-white w-[93%] mx-auto relative top-[-100px] border-t-[1px] border-r-[1px] border-slate-600">
			<div v-if="recordDetail.type == 0" class="flex flex-row items-center justify-between border-b border-slate-300 border-dashed w-[100%] h-[50px]">
				<div class="ml-2 text-base font-semibold">
					{{ recordDetail.communityName }}-{{ recordDetail.buildingName }}{{ recordDetail.units }}单元{{ recordDetail.pointName }}
				</div>
				<div v-if="recordDetail.status == 0" class="mr-2 todo rounded-full border border-blue-400 text-blue-400">未巡更</div>
				<div v-if="recordDetail.status == 1" class="mr-2 done rounded-full bg-gray-400 text-white">已巡更</div>
			</div>
			<div v-if="recordDetail.type == 1" class="flex flex-row justify-between items-center border-b border-slate-300 border-dashed w-[100%] h-[50px]">
				<div class="ml-2 text-base font-semibold">{{ recordDetail.communityName }}-{{ recordDetail.pointName }}</div>
				<div v-if="recordDetail.status == 0" class="mr-2 todo rounded-full border border-blue-400 text-blue-400">未巡更</div>
				<div v-if="recordDetail.status == 1" class="mr-2 done rounded-full bg-gray-400 text-white">已巡更</div>
			</div>

			<div class="flex flex-row justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">巡检类型</div>
				<div v-if="recordDetail.type == 0" class="font-semibold text-base">巡更点</div>
				<div v-if="recordDetail.type == 1" class="font-semibold text-base">巡更项目</div>
			</div>

			<div class="flex flex-row justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">巡检时间</div>
				<div class="font-semibold text-base">{{ recordDetail.startTime }}-{{ recordDetail.endTime }}</div>
			</div>
			<div class="flex flex-row justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">巡检小区</div>
				<div v-if="recordDetail.type == 0" class="font-semibold text-base tracking-wide">
					{{ recordDetail.communityName }}{{ recordDetail.buildingName }}{{ recordDetail.units }}
				</div>
				<div v-if="recordDetail.type == 1" class="font-semibold text-base tracking-wide">
					{{ recordDetail.communityName }}
				</div>
			</div>
			<div class="flex flex-row justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">巡更路线</div>
				<div class="font-semibold text-base tracking-wide">
					{{ recordDetail.wayName }}
				</div>
			</div>
			<div class="flex flex-row justify-between mx-4 mt-3 pb-2">
				<div class="text-gray-500 font-bold text-base">巡检人</div>
				<div class="font-semibold text-base tracking-wide">
					{{ recordDetail.realname }}
				</div>
			</div>
		</div>
		<div class="w-[93%] mx-auto relative top-[-80px] font-semibold">巡更详情</div>
		<div class="bg-white w-[93%] mx-auto relative top-[-70px] border-t-[1px] border-r-[1px] border-slate-600 pb-3">
			<div class="flex flex-row justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">巡检人</div>
				<div class="font-semibold text-base tracking-wide">
					{{ recordDetail.realname }}
				</div>
			</div>
			<div class="flex flex-row justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">手机号</div>
				<div class="font-semibold text-base">
					{{ recordDetail.phone }}
				</div>
			</div>
			<div class="flex flex-row justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">巡检时间</div>
				<div class="font-semibold text-base">
					{{ recordDetail.inspectorTime }}
				</div>
			</div>
			<div class="flex flex-col justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">巡检结果</div>
				<div class="font-semibold text-base bg-gray-100 mt-1">
					{{ recordDetail.inspectorResult }}
				</div>
			</div>
			<div class="flex flex-col justify-between mx-4 mt-3">
				<div class="text-gray-500 font-bold text-base">照片</div>
				<div class="flex flex-row mt-1">
					<img v-for="(item, index) in photoUrl" :key="index" :src="item" class="w-[100px] h-[100px] ml-2 mt-1 rounded-lg" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.done {
	width: 70px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	border-radius: 25px;
}
.todo {
	width: 70px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	border-radius: 25px;
}
</style>
