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
		<van-form @submit="onSubmit">
			<div class="w-[340px] h-[250px] bg-white mx-auto mt-1 border-2 border-stone-200 rounded-lg flex flex-col px-2">
				<div class="flex flex-col items-center mt-5">
					<van-field
						v-model="updateForm.result"
						type="textarea"
						placeholder="请写下详细报修内容"
						class="border mx-auto rounded-md h-[130px]"
						style="width: 320px"
						:rules="[{ required: true, message: '不能为空' }]"
					/>
				</div>
				<!-- 文件上传 -->
				<div class="mt-1">
					<van-uploader v-model="fileList" multiple :after-read="afterRead" @delete="picDelete" />
				</div>
				<div class="flex flex-col items-center mt-5">
					<van-button type="primary" native-type="submit" round class="w-[200px]" style="height: 40px">提交</van-button>
				</div>
			</div>
		</van-form>
	</div>
</template>

<script setup>
import NavBar from '@/components/NavBar/index.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
import { getRepairRecordById, uploadOrder } from '@/api/repair/repairRecord'
import service from '@/utils/http'
import { showNotify } from 'vant'
const recordId = ref('')
const route = useRoute()
const orderDetail = ref('')
const fileList = ref([])
const updateForm = reactive({
	id: '',
	repairId: '',
	employeeIds: '',
	state: 2,
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
		updateForm.repairId = orderDetail.value.id
	})
}
const tokan = localStorage.getItem('accessToken')
//文件上传后的函数
const afterRead = file => {
	// 此时可以自行将文件上传至服务器
	console.log(fileList.value)
}

const onSubmit = () => {
	if (fileList.value.length > 0) {
		//上传同时先进性图片的上传
		fileList.value.forEach(element => {
			const formData = new FormData()
			formData.append('file', element.file)
			service
				.post('/repair/record/upload?accessToken=' + tokan, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(res => {
					updateForm.imgs += res.data.url + ','
					console.log(updateForm)
					//上传完后进行后续操作
					uploadOrder(updateForm).then(res => {
						if (res.code == 1) {
							router.back()
						}
					})
				})
		})
	} else {
		// 警告通知
		showNotify({ color: '#FFFFFF', message: '请上传图片', background: '#3399FF' })
	}
}
</script>

<style scoped></style>
