<template>
	<div>
		<NavBar title="今日巡更" right-title="巡更记录" @ClickRight="rightClick"> </NavBar>
		patrol
	</div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const rightClick = () => {
	router.push({ path: '/patrolRecord' })
}
</script>

<style scoped></style>
