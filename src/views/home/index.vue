<template>
	<div>
		home

		<!-- 今日巡更开始 -->
		<div class="w-[95%] bg-blue-400 mx-auto h-[150px] rounded-2xl mt-3 flex flex-col">
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
	</div>
</template>

<script setup>
import { useOverNumber, useNoNumber, useAllNumber } from '@/api/safe/record.ts'
import { reactive, ref, computed } from 'vue'

const numberForm = reactive({
	pointNumber: '',
	overPointNumber: '',
	noPointNumber: ''
})

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
</script>

<style scoped></style>
