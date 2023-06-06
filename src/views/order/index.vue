<template>
	<div class="bg-gray-50">
		<!-- 标题栏开始 -->
		<div class="bg-white fixed top-0 left-0 w-full flex justify-center items-center h-[45px]">我的工单</div>
		<div class="bg-gray-50 w-full h-[5px] mt-[45px]"></div>
		<!-- 标题栏结束 -->

		<!-- 选项栏开始 -->
		<div class="bg-white flex flex-row justify-center items-center h-[50px]">
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 0 }" @click="changeCurrentOption(0)">
				全部
			</div>
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 1 }" @click="changeCurrentOption(1)">
				待解决
			</div>
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 2 }" @click="changeCurrentOption(2)">
				已完成
			</div>
		</div>
		<!-- 选项栏结束 -->
		<!-- 工单开始 -->
		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<!-- 全部  -->
			<div v-show="currentOption == 0">
				<div v-for="item in workOrder" :key="item" class="w-[95%] mt-1 mb-1 mx-auto bg-white px-2 pb-2 border-slate-200 border-[1px] rounded-md">
					<div @click="orderClick(item.repairId)">
						<!-- 工单第一行 -->
						<div class="flex flex-row justify-between items-center h-[40px] border-b-[1px] border-dashed">
							<div class="text-base">{{ item.title }}</div>
							<div
								v-if="item.type == 0"
								class="border-blue-500 border-[1px] w-[80px] h-[25px] text-sm rounded-md flex justify-center items-center text-blue-500"
							>
								公共报修
							</div>
							<div v-else class="border-blue-500 border-[1px] w-[80px] h-[25px] text-sm rounded-md flex justify-center items-center text-blue-500">
								个人报修
							</div>
						</div>
						<!-- 工单第二行 -->
						<div class="bg-gray-50 mt-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.content }}</div>
					</div>
					<!-- 第三行 -->
					<div class="flex flex-row justify-between items-center mt-3">
						<div class="text-gray-400">报修时间:{{ item.createTimeRepair }}</div>
						<div v-if="item.state == 0" class="flex justify-center items-center bg-blue-500 text-white w-[70px] h-[25px] rounded-full text-sm">
							待解决
						</div>
						<div v-if="item.state == 1" class="flex justify-center items-center bg-red-500 text-white w-[70px] h-[25px] rounded-full text-sm">
							处理中
						</div>
						<div v-if="item.state == 2" class="flex justify-center items-center bg-gray-400 text-white w-[70px] h-[25px] rounded-full text-sm">
							已完成
						</div>
					</div>
				</div>
			</div>
			<!-- 待解决 -->
			<div v-show="currentOption == 1">
				<div v-for="item in workOrder" :key="item" class="w-[95%] mt-1 mb-1 mx-auto bg-white px-2 pb-2 border-slate-200 border-[1px] rounded-md">
					<div @click="orderClick(item.repairId)">
						<!-- 工单第一行 -->
						<div class="flex flex-row justify-between items-center h-[40px] border-b-[1px] border-dashed">
							<div class="text-base">{{ item.title }}</div>
							<div
								v-if="item.type == 0"
								class="border-blue-500 border-[1px] w-[80px] h-[25px] text-sm rounded-md flex justify-center items-center text-blue-500"
							>
								公共报修
							</div>
							<div v-else class="border-blue-500 border-[1px] w-[80px] h-[25px] text-sm rounded-md flex justify-center items-center text-blue-500">
								个人报修
							</div>
						</div>
						<!-- 工单第二行 -->
						<div class="bg-gray-50 mt-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.content }}</div>
					</div>
					<!-- 第三行 -->
					<div class="flex flex-row justify-between items-center mt-3">
						<div class="text-gray-400">报修时间:{{ item.createTimeRepair }}</div>
						<div v-if="item.state == 0" class="flex justify-center items-center bg-blue-500 text-white w-[70px] h-[25px] rounded-full text-sm">
							待解决
						</div>
						<div v-if="item.state == 1" class="flex justify-center items-center bg-red-500 text-white w-[70px] h-[25px] rounded-full text-sm">
							处理中
						</div>
						<div v-if="item.state == 2" class="flex justify-center items-center bg-gray-400 text-white w-[70px] h-[25px] rounded-full text-sm">
							已完成
						</div>
					</div>
				</div>
			</div>
			<!-- 已完成 -->
			<div v-show="currentOption == 2">
				<div v-for="item in workOrder" :key="item" class="w-[95%] mt-1 mb-1 mx-auto bg-white px-2 pb-2 border-slate-200 border-[1px] rounded-md">
					<div @click="orderClick(item.repairId)">
						<!-- 工单第一行 -->
						<div class="flex flex-row justify-between items-center h-[40px] border-b-[1px] border-dashed">
							<div class="text-base">{{ item.title }}</div>
							<div
								v-if="item.type == 0"
								class="border-blue-500 border-[1px] w-[80px] h-[25px] text-sm rounded-md flex justify-center items-center text-blue-500"
							>
								公共报修
							</div>
							<div v-else class="border-blue-500 border-[1px] w-[80px] h-[25px] text-sm rounded-md flex justify-center items-center text-blue-500">
								个人报修
							</div>
						</div>
						<!-- 工单第二行 -->
						<div class="bg-gray-50 mt-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.content }}</div>
					</div>
					<!-- 第三行 -->
					<div class="flex flex-row justify-between items-center mt-3">
						<div class="text-gray-400">报修时间:{{ item.createTimeRepair }}</div>
						<div v-if="item.state == 0" class="flex justify-center items-center bg-blue-500 text-white w-[70px] h-[25px] rounded-full text-sm">
							待解决
						</div>
						<div v-if="item.state == 1" class="flex justify-center items-center bg-red-500 text-white w-[70px] h-[25px] rounded-full text-sm">
							处理中
						</div>
						<div v-if="item.state == 2" class="flex justify-center items-center bg-gray-400 text-white w-[70px] h-[25px] rounded-full text-sm">
							已完成
						</div>
					</div>
				</div>
			</div>
			<!-- 工单结束 -->
		</van-list>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getRepairRecord } from '@/api/repair/repairRecord'
import router from '@/router'

const userId = localStorage.getItem('user')
const total = ref(0)
const loading = ref(false)
const finished = ref(false)
const querForm = reactive({
	employeeIds: userId,
	status: '',
	order: 'create_time',
	asc: false,
	page: 1,
	limit: 7
})

onMounted(() => {
	getRepairList()
})

const currentOption = ref(0)
//需要显示的数据数组
const workOrder = reactive([])

const changeCurrentOption = value => {
	currentOption.value = value
	if (value == 0) {
		querForm.status = ''
	} else if (value == 1) {
		querForm.status = 1
	} else if (value == 2) {
		querForm.status = 2
	}
	//先将数组清空
	workOrder.splice(0, workOrder.length)
	querForm.page = 1
	getRepairList()
}

const getRepairList = () => {
	console.log(querForm)
	getRepairRecord({
		params: {
			...querForm
		}
	}).then(res => {
		console.log(res)
		total.value = res.data.total
		res.data.list.forEach(element => {
			workOrder.push(element)
		})
		loading.value = false
		// 数据全部加载完成
		if (workOrder.length >= total.value) {
			finished.value = true
		}
	})
	console.log('aaa')
}
const onLoad = () => {
	// 异步更新数据
	querForm.page = querForm.page + 1
	getRepairList()
}

//工单被点击
const orderClick = id => {
	router.push({
		name: 'orderDetail',
		params: {
			orderId: id
		}
	})
}
</script>

<style scoped>
.activation {
	color: #3399ff;
	border-bottom: 2px solid #3366ff;
}
</style>
