<template>
	<NavBar :fixed="true" :placeholder="true" title="工单大厅"> </NavBar>
	<div class="bg-gray-50">
		<!-- 选项栏开始 -->
		<div class="bg-white flex flex-row justify-center items-center h-[50px]">
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 0 }" @click="changeCurrentOption(0)">
				全部
			</div>
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 1 }" @click="changeCurrentOption(1)">
				待解决
			</div>
			<div class="flex-1 flex justify-center items-center h-full" :class="{ activation: currentOption === 2 }" @click="changeCurrentOption(2)">
				处理中
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
		<!-- 全部 -->
		<div v-show="currentOption == 0">
			<div v-for="item in 9" :key="item" class="w-[95%] mt-2 mb-1 mx-auto bg-white px-2 pb-2 border-slate-200 border-[1px] rounded-md">
				<!-- 工单第一行 -->
				<div class="flex flex-row justify-between items-center h-[40px] border-b-[1px] border-dashed">
					<div class="text-base">幸福愿小区1号楼1单元入户门</div>
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
				<div class="bg-gray-50 mt-2">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;幸福愿小区道路路灯不亮了，并且亮度不够，请物业公司即使更换，防止意外发生事故
				</div>
				<!-- 第三行 -->
				<div class="flex flex-row justify-between items-center mt-3">
					<div class="text-gray-400">报修时间:2023/06/05 20：28:21</div>
					<div v-if="true" class="flex justify-center items-center bg-blue-500 text-white w-[70px] h-[25px] rounded-full text-sm">待解决</div>
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
	</div>
</template>

<script setup>
import NavBar from '@/components/NavBar/index.vue'
import { ref, reactive } from 'vue'
const currentOption = ref(0)
const leve2CurrentOption = ref(0)
const changeCurrentOption = value => {
	currentOption.value = value
	// if (value == 0) {
	// 	querForm.status = ''
	// } else if (value == 1) {
	// 	querForm.status = 0
	// } else if (value == 2) {
	// 	querForm.status = 1
	// } else if (value == 3) {
	// 	querForm.status = 2
	// }
	// //先将数组清空
	// workOrder.splice(0, workOrder.length)
	// querForm.page = 1
	// getRepairList()
}

const changeleve2CurrentOption = value => {
	leve2CurrentOption.value = value
}
//需要显示的数据数组
const workOrder = reactive([])
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
