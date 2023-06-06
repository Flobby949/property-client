<template>
	<NavBar :fixed="true" :placeholder="true" title="报修上报"> </NavBar>
	<div class="bg-gray-50">
		<div class="h-52 bg-blue-500 rounded-b-[50px]"></div>
		<div class="borderb bg-white rounded-md absolute top-[75px] w-[340px] ml-4 border-2 border-stone-200">
			<div class="px-5 flex flex-row items-center justify-between h-[35px]">
				<div class="inline-block text mt-1">{{ orderDetail.title }}</div>
				<div class="float-right text-sm text-center text-white mt-[6px]">
					<div v-if="orderDetail.state == 0" class="bg-red-500 radiusButton w-[60px] h-[25px] flex items-center justify-center rounded-full">
						未处理
					</div>
					<div v-if="orderDetail.state == 1" class="bg-yellow-500 radiusButton w-[60px] h-[25px] flex items-center justify-center rounded-full">
						处理中
					</div>
					<div v-if="orderDetail.state == 2" class="bg-gray-400 radiusButton w-[60px] h-[25px] flex items-center justify-center rounded-full">
						已完成
					</div>
					<div v-if="orderDetail.state == 3" class="bg-gray-400 radiusButton w-[60px] h-[25px] flex items-center justify-center rounded-full">
						已评价
					</div>
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
		<div class="w-[340px] mx-auto mt-[210px]">报修处理</div>
		<div class="w-[340px] h-[250px] bg-white mx-auto mt-1 border-2 border-stone-200 rounded-lg flex flex-col px-2">
			<div class="flex flex-col items-center mt-5">
				<van-field
					v-model="updateForm.result"
					type="textarea"
					placeholder="请写下详细报修内容"
					class="border mx-auto rounded-md h-[130px]"
					style="width: 320px"
				/>
			</div>
			<!-- 文件上传 -->
			<div class="mt-1">
				<van-uploader v-model="fileList" multiple />
			</div>
		</div>
		<div class="flex flex-col items-center mt-5" @click="onSubmit()">
			<van-button type="primary" round class="w-[200px]" style="height: 40px">提交</van-button>
		</div>
	</div>
</template>

<script setup>
import NavBar from '@/components/NavBar/index.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
import { getRepairRecordById } from '@/api/repair/repairRecord'
const recordId = ref('')
const route = useRoute()
const orderDetail = ref('')
const fileList = ref([])
const updateForm = reactive({
	id: '',
	recordId: '',
	employeeIds: '',
	state: '',
	result: '',
	imgs: ''
})
onMounted(() => {
	recordId.value = route.params.orderId
	console.log(recordId.value)
	getDetail(recordId.value)
})

const getDetail = id => {
	getRepairRecordById(id).then(res => {
		orderDetail.value = res.data
		updateForm.id = recordId.value
		updateForm.employeeIds = orderDetail.value.employeeIds
		updateForm.recordId = orderDetail.value.id
	})
}
const onSubmit = () => {}
</script>

<style scoped></style>
