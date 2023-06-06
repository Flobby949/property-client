<template>
	<div style="background-color: #f5f5f5" class="h-[1100px]">
		<NavBar :fixed="true" :placeholder="true" title="工单详情"> </NavBar>
		<div class="h-56 rounded-bl-br-full" style="z-index: 99; background-color: #409eff"></div>
		<div class="borderb bg-white rounded-md absolute top-[75px] w-[340px] h-[470px] ml-4 border-2 border-stone-200">
			<div class="p-[4px]">
				<div class="inline-block text mt-1 mb-1">{{ orderDetail.title }}</div>
				<div class="float-right mr-3 text-center text-white mt-[6px]">
					<div v-if="orderDetail.state == 0" class="bg-red-500 radiusButton">未处理</div>
					<div v-if="orderDetail.state == 1" class="bg-yellow-500 radiusButton">处理中</div>
					<div v-if="orderDetail.state == 2" class="bg-gray-400 radiusButton">已完成</div>
					<div v-if="orderDetail.state == 3" class="bg-gray-400 radiusButton">已评价</div>
				</div>
			</div>

			<div class="border-dashed border-b border-slate-400 mt-2"></div>
			<div class="text-[15px] ml-6 mt-4">
				<div class="flex justify-between text mt-3">
					<div style="color: #666666">报修分类</div>
					<div class="mr-5">
						<div v-if="orderDetail.type == 0">公共报修</div>
						<div v-if="orderDetail.type == 1">公共报修</div>
					</div>
				</div>
				<div class="flex justify-between text mt-3">
					<div style="color: #666666">报修类型</div>
					<div class="mr-5">
						<div v-if="orderDetail.category == 0">路灯</div>
						<div v-if="orderDetail.category == 1">厕所</div>
					</div>
				</div>
				<div class="flex justify-between text mt-3">
					<div style="color: #666666">报修小区</div>
					<div class="mr-5">
						{{ orderDetail.place }}
					</div>
				</div>

				<div class="flex justify-between text mt-3">
					<div style="color: #666666">报修时间</div>
					<div class="mr-5">
						{{ orderDetail.createTime }}
					</div>
				</div>

				<div class="flex justify-between text mt-3">
					<div style="color: #666666">报修人</div>
					<div class="mr-5">
						{{ orderDetail.username }}
					</div>
				</div>

				<div class="flex justify-between text mt-3">
					<div style="color: #666666">手机号</div>
					<div class="mr-5">
						{{ orderDetail.phone }}
					</div>
				</div>

				<div class="mt-5 relative right-3">报修内容</div>
			</div>
			<div class="border-dashed border-b border-slate-400 mt-3"></div>

			<div>
				<div class="mt-3 text-[14px] ml-5 w-[300px]" style="color: #666666">
					{{ orderDetail.content }}
				</div>

				<div class="flex m-2">
					<template v-for="img in imgs" :key="img">
						<img class="img" :src="img" />
					</template>
				</div>
			</div>
		</div>

		<div class="mt-[300px] ml-4">报修处理</div>

		<div class="rounded-md bg-white mt-1 ml-4 w-[340px] h-[400px] flex border-2 border-stone-200">
			<div class="mt-3 ml-5">
				<div class="rounded-full w-8 h-8 border-[2.5px] border-blue-500 bg-white">
					<div v-if="orderDetail.state <= 1" class="cross-icon ml-[6px] relative top-[7px]"></div>
					<span v-else class="checkmark ml-[10px] relative top-1"></span>
				</div>
				<div v-if="orderDetail.handlerName != null" class="bg-blue-500 w-[3px] h-[55px] ml-[15px]"></div>
				<div v-if="orderDetail.handlerName != null" class="rounded-full w-8 h-8 border-[2.5px] border-blue-500 bg-white">
					<!-- <span class="checkmark ml-[10px] relative top-1"></span> -->
					<div v-if="orderDetail.state <= 1" class="cross-icon ml-[6px] relative top-[7px]"></div>
					<span v-else class="checkmark ml-[10px] relative top-1"></span>
				</div>
				<div v-if="orderDetail.state > 1" class="bg-blue-500 w-[3px] h-[55px] ml-[15px]"></div>
				<div v-if="orderDetail.state > 1" class="rounded-full w-8 h-8 border-[2.5px] border-blue-500 bg-white">
					<!-- <span class="checkmark ml-[10px] relative top-1"></span> -->
					<div v-if="orderDetail.state <= 1" class="cross-icon ml-[6px] relative top-[7px]"></div>
					<span v-else class="checkmark ml-[10px] relative top-1"></span>
				</div>
			</div>
			<div class="ml-5 mt-4">
				<div class="text-[15px]">
					<div style="color: #666666" class="font-bold mt-1">{{ orderDetail.createTime }}</div>
					<div class="text-blue-500 flex">
						<div>报修人:</div>
						<div class="ml-1">{{ orderDetail.username }}</div>
					</div>
					<div class="text-blue-500 flex">
						<div>状 态:</div>
						<div v-if="orderDetail.state == 0" class="ml-1">未处理</div>
						<div v-if="orderDetail.state == 1" class="ml-1">处理中</div>
						<div v-if="orderDetail.state > 1" class="ml-1">已完成</div>
					</div>
				</div>
				<div v-if="orderDetail.handlerName != null" class="mt-[17px] text-[15px]">
					<div class="font-bold" style="color: #666666">{{ orderDetail.allocateTime }}</div>
					<div class="text-blue-500 flex">
						<div>处理人:</div>
						<div class="ml-1">{{ orderDetail.handlerName }}</div>
					</div>
					<div class="text-blue-500 flex">
						<div>状态:</div>
						<div v-if="orderDetail.state == 0" class="ml-1">未处理</div>
						<div v-if="orderDetail.state == 1" class="ml-1">处理中</div>
						<div v-if="orderDetail.state > 1" class="ml-1">已完成</div>
					</div>
				</div>
				<div v-if="orderDetail.state > 1" style="color: #666666" class="text-[15px] mt-[20px]">
					<div class="font-bold">2021/05/31 10:01:45</div>
					<div class="flex mt-1">
						<div>处理人:</div>
						<div class="ml-1">{{ orderDetail.handlerName }}</div>
					</div>
					<div class="flex mt-1">
						<div>状态:</div>
						<div v-if="orderDetail.state == 0" class="ml-1">未处理</div>
						<div v-if="orderDetail.state == 1" class="ml-1">处理中</div>
						<div v-if="orderDetail.state > 1" class="ml-1">已完成</div>
					</div>

					<div class="flex mt-1">
						<div>处理内容:</div>
						<div class="ml-1">{{ orderDetail.result }}</div>
					</div>

					<div class="flex mt-1">
						<div>现场照片:</div>
						<div class="ml-1 flex">
							<template v-for="img in resultimgs" :key="img">
								<img class="img" :src="img" />
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRepairById } from '@/api/repair/repairRecord'
const route = useRoute()
const orderId: any = ref('')
const orderDetail: any = ref('')
const imgs = ref([])
const resultimgs = ref([])
onMounted(() => {
	orderId.value = route.params.orderId
	console.log(orderId.value)
	getDetial(orderId.value)
})

const getDetial = (id: number) => {
	getRepairById(id).then(res => {
		orderDetail.value = res.data
		imgs.value = orderDetail.value.imgs.split(',')
		if (orderDetail.value.resultImgs != null) {
			console.log('AAAAAAAAAA')
			resultimgs.value = orderDetail.value.resultImgs.split(',')
		}
	})
}
</script>

<style scoped>
.rounded-bl-br-full {
	border-bottom-left-radius: 80px;
	border-bottom-right-radius: 80px;
}
.radiusButton {
	display: inline-block;
	padding: 1px 10px;
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 25px;
	width: 66px;
	font-size: 10px;
}

.bordera {
	/* @apply border border-solid border-sky-900; */
}

.borderb {
	@apply border border-solid border-gray-200;
}

.borderButton {
	@apply border border-solid border-blue-500 ml-3 flex justify-center items-center;
	border-radius: 5px;
	width: 80px;
	height: 30px;
}

.img {
	width: 90px;
	border-radius: 5px;
	margin: 3px;
}
.checkmark::before {
	content: '';
	display: inline-block;
	width: 7px;
	height: 14px;
	border: solid #0079fe;
	border-width: 0 3px 3px 0;
	transform: rotate(45deg);
}
.cross-icon {
	width: 15px;
	height: 15px;
	position: relative;
	transform: rotate(45deg);
}

.cross-icon:before,
.cross-icon:after {
	content: '';
	position: absolute;
	background-color: #0079fe;
}

.cross-icon:before {
	width: 100%;
	height: 2px;
	top: 50%;
	transform: translateY(-50%);
}

.cross-icon:after {
	height: 100%;
	width: 2px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
