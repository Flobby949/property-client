<template>
	<div class="box"></div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let timer: any = null
// 封装函数定时器跳转
const jump = () => {
	timer = setTimeout(() => {
		router.push('/login')
	}, 3000)
}
onMounted(() => {
	jump()
})
onUnmounted(() => {
	clearTimeout(timer)
})
</script>

<style scoped>
.box {
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.3);
}
</style>
