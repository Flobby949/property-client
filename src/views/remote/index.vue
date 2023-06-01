<template>
	<NavBar title="远程开门" />
	<van-field v-model="fieldLabel" is-link readonly label="小区" placeholder="选择小区" @click="showPicker = true" />
	<van-popup v-model:show="showPicker" round position="bottom">
		<van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
	</van-popup>

	<div class="flex flex-col justify-center items-center">
		<template v-for="item in doorList" :key="item.id">
			<door-item :door-item="item" @open-door="openDoor" />
		</template>
	</div>

	<!-- 加载框 -->
	<van-dialog v-model:show="show" :show-confirm-button="false" width="300px">
		<div class="flex flex-col justify-center items-center">
			<div class="w-[100%] p-2 bg-[#409efe] text-center text-white">等待开门中 ...</div>
			<van-icon class="animate-spin flex-1 m-5" name="setting" size="5rem" color="#409efe" />
		</div>
	</van-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDoorListApi, openDoorApi } from '@/api/smart'
import doorItem from '@/components/door-item/index.vue'
import { showDialog } from 'vant'

onMounted(() => {
	getDoorList(1)
})

// 选择小区
const fieldLabel = ref('万象城')
const showPicker = ref(false)

const columns = [
	{ text: '万象城', value: 1 },
	{ text: '汤臣一品', value: 2 },
	{ text: '左岸汀芷', value: 3 },
	{ text: '璀璨天城', value: 4 },
	{ text: '欧鼎华庭', value: 5 }
]

const onConfirm = ({ selectedOptions }) => {
	showPicker.value = false
	fieldLabel.value = selectedOptions[0].text
	getDoorList(selectedOptions[0].value)
}

// 选择门禁
const getDoorList = (communityId: number) => {
	getDoorListApi(communityId).then(res => {
		doorList.value = res.data
	})
}

const doorList = ref([])

// 开门
const show = ref(false)

const openDoor = (doorId: number) => {
	show.value = true
	openDoorApi(doorId)
		.then((res: any) => {
			if (res.code === 1) {
				showDialog({
					message: '开门成功！'
				})
			} else {
				showDialog({
					message: res.msg || '开门失败！'
				})
			}
		})
		.catch((err: any) => {
			showDialog({
				message: err.msg || '开门失败！'
			})
		})
		.finally(() => {
			show.value = false
		})
}
</script>

<style scoped>
@keyframes spin {
	from {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
@-webkit-keyframes spin {
	from {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
.animate-spin {
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
}
</style>
