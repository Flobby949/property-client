<template>
	<div class="w-full bg-gray-100 pb-5">
		<NavBar :fixed="true" :placeholder="true" title="工单分配"> </NavBar>
		<div class="h-56 rounded-b-[50px] bg-blue-500"></div>
		<div class="w-[98%] rounded-lg ml-1 h-[200px] bg-white absolute top-[80px] flex justify-center items-center">
			<van-form @submit="onSubmit">
				<van-field
					v-model="username"
					name="执行人"
					label="执行人"
					is-link
					placeholder="用户"
					:rules="[{ required: true, message: '请选择用户名' }]"
					@click="showPicker = true"
				/>
				<van-popup v-model:show="showPicker" round position="bottom">
					<van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
				</van-popup>
				<div class="flex flex-col items-center mt-5">
					<div class="border-[1px] flex justify-center items-center border-slate-300 w-[200px] h-[40px] rounded-full" @click="clear">清空</div>
				</div>
				<div class="flex flex-col items-center mt-5">
					<van-button type="primary" native-type="submit" round class="w-[200px]" style="height: 40px">提交</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<script setup>
import NavBar from '@/components/NavBar/index.vue'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserList, useallowcation } from '@/api/repair/repairRecord'
import router from '@/router'
import { showSuccessToast, showFailToast } from 'vant'

const route = useRoute()
const orderId = ref('')
const username = ref('')
const showPicker = ref(false)
const userList = ref([])
const columns = []
const updateForm = reactive({
	employeeIds: '',
	id: '',
	state: 1
})

onMounted(() => {
	orderId.value = route.params.orderId
	updateForm.id = orderId.value
	console.log(orderId.value)
	getUserLists()
})
const onConfirm = ({ selectedOptions }) => {
	username.value += selectedOptions[0].text + ' '
	updateForm.employeeIds += selectedOptions[0].value + ','
	showPicker.value = false
}
const getUserLists = () => {
	getUserList().then(res => {
		userList.value = res.data
		userList.value.forEach(element => {
			const item = {
				text: element.realName,
				value: element.id
			}
			columns.push(item)
		})
	})
}
const onSubmit = () => {
	updateForm.employeeIds = updateForm.employeeIds.slice(0, -1)
	useallowcation(updateForm).then(res => {
		if (res.code == 1) {
			showSuccessToast('成功')
			router.back()
		} else {
			showFailToast('失败')
		}
	})
}
const clear = () => {
	updateForm.employeeIds = ''
	username.value = ''
}
</script>

<style scoped></style>
