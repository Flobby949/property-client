<template>
	<NavBar :fixed="true" :placeholder="true" title="工单大厅"> </NavBar>
	<div class="bg-gray-50">
		<!-- 选项栏开始 -->
		<div class="bg-white flex flex-row justify-center items-center h-[50px]">
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 0 }" @click="changeCurrentOption(0)">
				全部
			</div>
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 1 }" @click="changeCurrentOption(1)">
				待分配
			</div>
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 2 }" @click="changeCurrentOption(2)">
				待解决
			</div>
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 3 }" @click="changeCurrentOption(3)">
				已完成
			</div>
		</div>
		<!-- 选项栏结束 -->

		<!-- 二级选项栏开始 -->
		<div class="flex flex-row bg-gray-50 h-[50px] w-full px-6 justify-center items-center text-xs">
			<div
				class="flex justify-center items-center w-[70px] h-[28px] mx-auto border-[1px] rounded-full border-slate-500"
				:class="{ leve2active: leve2CurrentOption == 0 }"
				@click="changeleve2CurrentOption(0)"
			>
				全部
			</div>
			<div
				class="flex justify-center items-center w-[70px] h-[28px] mx-auto border-[1px] rounded-full border-slate-500"
				:class="{ leve2active: leve2CurrentOption == 1 }"
				@click="changeleve2CurrentOption(1)"
			>
				公共报修
			</div>
			<div
				class="flex justify-center items-center w-[70px] h-[28px] mx-auto border-[1px] rounded-full border-slate-500"
				:class="{ leve2active: leve2CurrentOption == 2 }"
				@click="changeleve2CurrentOption(2)"
			>
				个人保修
			</div>
			<div
				class="flex justify-center items-center w-[70px] h-[28px] mx-auto border-[1px] rounded-full border-slate-500"
				:class="{ leve2active: leve2CurrentOption == 3 }"
				@click="changeleve2CurrentOption(3)"
			>
				其他
			</div>
		</div>
		<!-- 二级选项栏结束 -->

		<!-- 工单开始 -->
		<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<!-- 全部  -->
			<div v-show="currentOption == 0">
				<div
					v-for="item in workOrder"
					:key="item"
					class="w-[95%] mt-1 mb-1 mx-auto bg-white px-2 pb-2 border-slate-200 border-[1px] rounded-md"
					@click="orderClick(item.id)"
				>
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
					<!-- 第三行 -->
					<div class="flex flex-row justify-between items-center mt-3">
						<div class="text-gray-400">报修时间:{{ item.createTime }}</div>
						<div
							v-if="item.employeeIds == '' || item.employeeIds == null"
							class="flex justify-center items-center bg-red-500 text-white w-[70px] h-[25px] rounded-full text-sm"
						>
							分配
						</div>
						<div v-if="item.state == 2" class="flex justify-center items-center bg-gray-400 text-white w-[70px] h-[25px] rounded-full text-sm">
							已完成
						</div>
						<div v-else class="flex justify-center items-center bg-blue-500 text-white w-[70px] h-[25px] rounded-full text-sm">待解决</div>
					</div>
				</div>
			</div>
			<!-- 待分配 -->
			<div v-show="currentOption == 1">
				<div
					v-for="item in workOrder"
					:key="item"
					class="w-[95%] mt-1 mb-1 mx-auto bg-white px-2 pb-2 border-slate-200 border-[1px] rounded-md"
					@click="orderClick(item.id)"
				>
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
					<!-- 第三行 -->
					<div class="flex flex-row justify-between items-center mt-3">
						<div class="text-gray-400">报修时间:{{ item.createTime }}</div>
						<div class="flex justify-center items-center bg-red-500 text-white w-[70px] h-[25px] rounded-full text-sm">分配</div>
					</div>
				</div>
			</div>
			<!-- 待解决 -->
			<div v-show="currentOption == 2">
				<div
					v-for="item in workOrder"
					:key="item"
					class="w-[95%] mt-1 mb-1 mx-auto bg-white px-2 pb-2 border-slate-200 border-[1px] rounded-md"
					@click="orderClick(item.id)"
				>
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
					<!-- 第三行 -->
					<div class="flex flex-row justify-between items-center mt-3">
						<div class="text-gray-400">报修时间:{{ item.createTime }}</div>
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
			<div v-show="currentOption == 3">
				<div
					v-for="item in workOrder"
					:key="item"
					class="w-[95%] mt-1 mb-1 mx-auto bg-white px-2 pb-2 border-slate-200 border-[1px] rounded-md"
					@click="orderClick(item.id)"
				>
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
					<!-- 第三行 -->
					<div class="flex flex-row justify-between items-center mt-3">
						<div class="text-gray-400">报修时间:{{ item.createTime }}</div>
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
		</van-list>
		<!-- 工单结束 -->
	</div>
</template>

<script setup>
import NavBar from '@/components/NavBar/index.vue'
import { ref, reactive, onMounted } from 'vue'
import router from '@/router'
import { getRepair } from '@/api/repair/repairRecord'
const currentOption = ref(0)
const leve2CurrentOption = ref(0)
const workOrder = reactive([])
const type = ref(0)
const total = ref(0)
const loading = ref(false)
const finished = ref(false)

const querForm = reactive({
	type: 0,
	state: 0,
	order: '',
	asc: false,
	page: 1,
	limit: 7
})
const changeCurrentOption = value => {
	currentOption.value = value
	if (value == 0) {
		querForm.state = 0
	} else if (value == 1) {
		querForm.state = 1
	} else if (value == 2) {
		querForm.state = 2
	} else if (value == 3) {
		querForm.state = 3
	}
	//先将数组清空
	workOrder.splice(0, workOrder.length)
	querForm.page = 1
	getOrderLists()
}

const changeleve2CurrentOption = value => {
	leve2CurrentOption.value = value
	if (value == 0) {
		querForm.type = 0
	} else if (value == 1) {
		querForm.type = 1
	} else if (value == 2) {
		querForm.type = 2
	} else if (value == 3) {
		querForm.type = 3
	}
	//先将数组清空
	workOrder.splice(0, workOrder.length)
	querForm.page = 1
	getOrderLists()
}
//需要显示的数据数组

const getOrderLists = () => {
	getRepair({
		params: {
			...querForm
		}
	}).then(res => {
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
}
onMounted(() => {
	getOrderLists()
})

const onLoad = () => {
	// 异步更新数据
	querForm.page = querForm.page + 1
	getOrderLists()
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

.leve2active {
	border-color: #3366ff;
	color: #3399ff;
}
</style>
