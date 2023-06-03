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
		<!-- 全部  -->
		<div v-show="currentOption == 0">
			<div v-for="item in 6" :key="item" class="w-[95%] mt-1 mb-1 mx-auto bg-white px-2 pb-2 border-slate-100 border-[1px] rounded-md">
				<!-- 工单第一行 -->
				<div class="flex flex-row justify-between items-center h-[40px] border-b-[1px] border-dashed">
					<div class="text-base">幸福苑小区1号楼1单元入户门</div>
					<div v-if="false" class="border-blue-500 border-[1px] w-[80px] h-[25px] text-sm rounded-md flex justify-center items-center text-blue-500">
						公共报修
					</div>
					<div v-else class="border-blue-500 border-[1px] w-[80px] h-[25px] text-sm rounded-md flex justify-center items-center text-blue-500">
						个人报修
					</div>
				</div>
				<!-- 工单第二行 -->
				<div class="bg-gray-50 mt-2">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信服校园道路路灯不亮了，并且亮度不够，请物业公司即使更换，防止发生意外事故
				</div>
				<!-- 第三行 -->
				<div class="flex flex-row justify-between items-center mt-3">
					<div class="text-gray-400">报修时间:2023/06/02 18:21:45</div>
					<div v-if="false" class="flex justify-center items-center bg-blue-500 text-white w-[70px] h-[25px] rounded-full text-sm">待解决</div>
					<div v-else class="flex justify-center items-center bg-gray-400 text-white w-[70px] h-[25px] rounded-full text-sm">已完成</div>
				</div>
			</div>
			<!-- 待解决 -->

			<!-- 已完成 -->
		</div>
		<!-- 工单结束 -->
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const currentOption = ref(0)
//需要显示的数据数组
const workOrder = reactive([])

const changeCurrentOption = value => {
	currentOption.value = value
	console.log(currentOption.value == 0)
}
</script>

<style scoped>
.activation {
	color: #3399ff;
	border-bottom: 2px solid #3366ff;
}
</style>
