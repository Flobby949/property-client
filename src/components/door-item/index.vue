<template>
	<div class="w-[90vw] h-32 box-border flex flex-col rounded-md card p-2 m-2">
		<div class="flex flex-row justify-between h-[30%] border-style p-2">
			<div>{{ doorItem.doorName }}</div>
			<van-tag v-if="doorItem.onlineStatus === 0" type="primary" size="medium">在线</van-tag>
			<van-tag v-else type="danger" size="medium">离线</van-tag>
		</div>
		<div class="flex flex-1 justify-center items-center">
			<van-button type="primary" icon="desktop-o" round :disabled="doorItem.onlineStatus === 1" @click="open">立即开门</van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	doorItem: {
		doorId: number
		doorImg: string
		doorName: string
		onlineStatus: number
	}
}>()

const emits = defineEmits(['openDoor'])

const open = () => {
	emits('openDoor', props.doorItem.doorId)
}
</script>

<style scoped>
.card {
	box-shadow: 2px 2px 5px #ddd, -2px -2px 5px #ddd;
}
.border-style {
	border-bottom: 1px dashed #999;
}
</style>
