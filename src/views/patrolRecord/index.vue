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

		<div class="w-[92%] mx-auto relative top-[-35px]">
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
					<div v-if="item.status == 1" class="rounded-full w-[80px] h-[28px] text-white bg-blue-400 flex justify-center items-center font-normal">
						查看
					</div>
				</div>
				<div class="text-gray-500 font-semibold ml-3 mt-3">
					<div>巡检人：{{ item.REALNAME }}</div>
				</div>
			</div>
			<!-- 数据展示结束 -->
		</div>
	</div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'
import { reactive, ref } from 'vue'

//获取当前日期
const date = new Date()

const chooseDate = ref([date.getFullYear(), date.getMonth() + 1, date.getDate()])
const currentDate = ref([date.getFullYear(), date.getMonth() + 1, date.getDate()])
const show = ref(false)
const showPopup = () => {
	currentDate.value = []
	currentDate.value = [...chooseDate.value]
	show.value = true
}
const clonsePopup = () => {
	show.value = false
}

const selectDate = selectedValues => {
	chooseDate.value = []
	chooseDate.value = [...selectedValues.selectedValues]
	dataform.nowDate = chooseDate.value[0] + '-' + chooseDate.value[1] + '-' + chooseDate.value[2]
	show.value = false
}

//数据
const records = ref<any>([
	{
		type: 0,
		communityName: '万象城',
		buildingName: '文宇楼',
		units: 1,
		pointName: '27栋点1',
		REALNAME: '张三',
		startTime: '8:00',
		endTime: '9:00',
		status: 1
	},
	{
		type: 0,
		communityName: '万象城',
		buildingName: '文宇楼',
		units: 1,
		pointName: '27栋点2',
		REALNAME: '张三',
		startTime: '8:00',
		endTime: '9:00',
		status: 1
	},
	{
		type: 0,
		communityName: '万象城',
		buildingName: '文宇楼',
		units: 1,
		pointName: '27栋点3',
		REALNAME: '张三',
		startTime: '8:00',
		endTime: '9:00',
		status: 0
	},
	{
		type: 1,
		units: 1,
		communityName: '万象城',
		pointName: '28栋电梯',
		REALNAME: '张三',
		startTime: '8:00',
		endTime: '9:00',
		status: 1
	},
	{
		type: 0,
		communityName: '万象城',
		buildingName: '文宇楼',
		units: 1,
		pointName: '',
		REALNAME: '张三',
		startTime: '8:00',
		endTime: '9:00',
		status: 0
	},
	{
		type: 1,
		units: 1,
		communityName: '万象城',
		pointName: '27栋电梯',
		REALNAME: '张三',
		startTime: '8:00',
		endTime: '9:00',
		status: 1
	}
])

//请求条件
const dataform = reactive({
	nowDate: '',
	inspectorId: localStorage.getItem('')
})
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
