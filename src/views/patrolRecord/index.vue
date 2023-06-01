<template>
	<div class="bg-gray-100">
		<NavBar title="巡更记录"> </NavBar>
		<div class="bg-blue-500 rounded-b-[50px] h-[150px] w-[99%] mx-auto">
			<div class="flex flex-row justify-center relative top-8 mx-5 text-gray-400 font-semibold" @click="showPopup">
				<div class="bg-white mx-auto w-[95px] rounded-sm h-12 flex flex-row items-center justify-center">{{ chooseDate[0] }} 年</div>
				<div class="bg-white mx-auto w-[95px] rounded-sm h-12 flex flex-row items-center justify-center">{{ chooseDate[1] }}月</div>
				<div class="bg-white mx-auto w-[95px] rounded-sm h-12 flex flex-row items-center justify-center">{{ chooseDate[2] }} 号</div>
			</div>
			<van-popup v-model:show="show" position="bottom" :style="{ height: '35%' }">
				<van-date-picker v-model="currentDate" title="选择日期" @cancel="clonsePopup" @confirm="selectDate" />
			</van-popup>
		</div>

		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" class="w-[92%] mx-auto relative top-[-35px]" @load="onLoad">
			<!-- 数据展示开始 -->
			<div v-for="(item, index) in records" :key="index" class="w-[100%] h-[180px] bg-white mb-3">
				<div v-if="item.type == 0" class="flex flex-row items-center justify-between border-b border-slate-300 border-dotted w-[100%] h-[50px]">
					<div class="ml-2 font-semibold">{{ item.communityName }}-{{ item.buildingName }}{{ item.units }}单元{{ item.pointName }}</div>
					<div v-if="item.status == 0" class="mr-2 todo rounded-full border border-blue-400 text-blue-400">未巡更</div>
					<div v-if="item.status == 1" class="mr-2 done rounded-full bg-gray-400 text-white">已巡更</div>
				</div>
				<div v-if="item.type == 1" class="flex flex-row justify-between items-center border-b border-slate-300 border-dotted w-[100%] h-[50px]">
					<div class="ml-2 font-semibold">{{ item.communityName }}-{{ item.pointName }}</div>
					<div v-if="item.status == 0" class="mr-2 todo rounded-full border border-blue-400 text-blue-400">未巡更</div>
					<div v-if="item.status == 1" class="mr-2 done rounded-full bg-gray-400 text-white">已巡更</div>
				</div>
				<div class="text-gray-500 font-semibold ml-3 mt-3">
					<div v-if="item.type == 0">巡检类型：巡更点</div>
					<div v-if="item.type == 1">巡检类型：巡检项目</div>
				</div>
				<div class="text-gray-500 flex flex-row items-center justify-between font-semibold ml-3 mt-3 mr-3">
					<div>巡检时间 ：{{ item.startTime }}-{{ item.endTime }}</div>
					<div v-if="item.status == 0" class="rounded-full w-[80px] h-[28px] text-white bg-red-400 flex justify-center items-center font-normal">
						去巡更
					</div>
					<div
						v-if="item.status == 1"
						class="rounded-full w-[80px] h-[28px] text-white bg-blue-400 flex justify-center items-center font-normal"
						@click="getInfo(item.id)"
					>
						查看
					</div>
				</div>
				<div class="text-gray-500 font-semibold ml-3 mt-3">
					<div>巡检人：{{ item.realname }}</div>
				</div>
			</div>
			<!-- 数据展示结束 -->
		</van-list>
	</div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'
import { onMounted, reactive, ref } from 'vue'
import { useRecordsList } from '@/api/safe/Trecords'
import router from '@/router'

//获取当前日期
const date = new Date()

const chooseDate = ref([date.getFullYear(), date.getMonth() + 1, date.getDate()])
const currentDate = ref([date.getFullYear(), date.getMonth() + 1, date.getDate()])
const show = ref(false)
//请求条件
const dataform = reactive({
	patrolDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
	inspectorId: 10004,
	order: '',
	asc: false,
	page: 1,
	limit: 5
})

onMounted(() => {
	getRecords()
})

//数据
const records: RecordItem[] = reactive([])
const total = ref(0)
const getRecords = () => {
	console.log(dataform)
	useRecordsList({
		params: {
			...dataform
		}
	}).then(res => {
		console.log(res.data)
		total.value = res.data.total
		res.data.list.forEach(element => {
			records.push(element)
		})
		// 加载状态结束
		loading.value = false
		// 数据全部加载完成
		if (records.length >= total.value) {
			finished.value = true
		}
		console.log(records)
	})
}
//显示日期选择器
const showPopup = () => {
	currentDate.value = []
	currentDate.value = [...chooseDate.value]
	show.value = true
}

//关闭日期选择器
const clonsePopup = () => {
	show.value = false
}

const selectDate = selectedValues => {
	chooseDate.value = []
	chooseDate.value = [...selectedValues.selectedValues]
	dataform.patrolDate = chooseDate.value[0] + '-' + chooseDate.value[1] + '-' + chooseDate.value[2]
	records.splice(0, records.length)
	getRecords()
	show.value = false
}

//list组件loading和finished属性
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
	// 异步更新数据
	dataform.page = dataform.page + 1
	console.log(dataform.page)
	getRecords()
}

//查看详情
const getInfo = (recordId: number) => {
	router.push({
		name: 'patrolDetail',
		params: {
			recordId: recordId
		}
	})
}

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

<style scoped>
.done {
	width: 90px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border-radius: 25px;
}
.todo {
	width: 90px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border-radius: 25px;
}
</style>
