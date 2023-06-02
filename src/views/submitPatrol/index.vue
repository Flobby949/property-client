<template>
	<div style="background-color: #f5f5f5" class="w-screen h-screen">
		<NavBar :title="title"></NavBar>

		<div class="rounded-b-[50px] h-[150px] w-[99%] mx-auto flex justify-center items-center" style="background-color: #409eff">
			<div class="border-slate-300 border-[1px] w-[350px] mx-auto rounded-md bg-white h-[180px] relative top-[40px]">
				<div class="flex mt-5">
					<div class="flex-9 ml-5 text-[14px] text-black font-normal flex-grow mb-1 relative right-2 bottom-2">{{ item.title }}</div>
				</div>
				<div class="border-b border-slate-300 border-dashed"></div>

				<div class="ml-5 text-[14px]">
					<div v-if="item.type == 0" class="font-normal flex justify-between mt-3">
						<div class="">巡检类型</div>
						<div class="mr-4">巡更点</div>
					</div>
					<div v-if="item.type == 1" class="font-normal flex justify-between">
						<div class="">巡检类型</div>
						<div class="mr-4">巡检项目</div>
					</div>

					<div class="font-normal mt-[10px] flex justify-between">
						<div>巡检时间</div>
						<div class="mr-4">{{ item.startTime }}-{{ item.endTime }}</div>
					</div>

					<div class="font-normal mt-[10px] flex justify-between">
						<div>巡检小区</div>
						<div class="mr-4">{{ item.communityName }}</div>
					</div>
					<div class="font-normal mt-[10px] flex justify-between">
						<div>巡检路线</div>
						<div class="mr-4">{{ item.wayName }}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-[30px]">
			<div class="text-[14px] relative top-[45px] ml-4">巡检结果</div>
			<div class="border-slate-300 border-[1px] w-[350px] rounded-md bg-white h-[300px] relative top-[50px] m-auto">
				<div class="flex flex-col items-center mt-5">
					<van-radio-group v-model="checked" direction="horizontal" class="flex">
						<van-radio name="0" icon-size="14px" class="text-[14px] relative right-11">正常</van-radio>
						<van-radio name="1" icon-size="14px" class="text-[14px] relative left-11">异常</van-radio>
					</van-radio-group>
				</div>

				<div class="flex flex-col items-center mt-5">
					<van-field
						v-model="value"
						placeholder="请写下详细报修内容，有助于工作人员快速帮您解决问题"
						class="border mx-auto rounded-md h-[130px]"
						style="width: 330px"
					/>
				</div>

				<div>
					<van-uploader :after-read="afterRead" upload-icon="plus" class="ml-3 mt-3" />
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center">
			<van-button type="primary" round class="w-[200px] relative top-[77px]" style="height: 40px">提交</van-button>
		</div>
	</div>
</template>

<script setup>
import NavBar from '@/components/NavBar/index.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSubmitRecord } from '@/api/safe/record.ts'
const route = useRoute()
const list = route.query.item
const item = JSON.parse(list)
const dataForm = ref({
	status: '',
	notes: '',
	photo: ''
})
console.log('--------------niah')
console.log(item.title)
console.log('--------------niah')

const title = ref('巡更上报')

const checked = ref('0')

const onSubmit = () => {
	dataForm.value.status = checked.value
	useSubmitRecord(dataForm).then(res => {})
}
</script>

<style scoped></style>
