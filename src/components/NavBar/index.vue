<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
	title: {
		type: String,
		default: '标题'
	},
	rightTitle: {
		type: String,
		default: ''
	},
	fixed: {
		type: Boolean,
		default: false
	},
	placeholder: {
		type: Boolean,
		default: false
	}
})
const emit = defineEmits(['ClickRight'])
const onClickLeft = () => {
	router.back()
}
const onClickRight = () => {
	emit('ClickRight')
}
</script>

<template>
	<van-nav-bar
		:fixed="props.fixed"
		:placeholder="props.placeholder"
		:title="props.title"
		:right-text="props.rightTitle"
		left-arrow
		@click-left="onClickLeft"
		@click-right="onClickRight"
	>
	</van-nav-bar>
</template>

<style scoped></style>
