<template>
	<div>
		<NavBar title="今日巡更" right-title="巡更记录" @ClickRight="rightClick"> </NavBar>

		<div class="rounded-b-[50px] h-[150px] w-[99%] mx-auto flex justify-center items-center" style="background-color: #409eff">
			<div class="flex justify-center items-center">
				<div class="bg-white rounded-md w-[90px] h-[75px] opacity-50 mr-6 text-center">
					<div class="mt-3">6</div>
					<div>巡更点</div>
				</div>
				<div class="bg-white rounded-md w-[90px] h-[75px] opacity-50 text-center">
					<div class="mt-3">0</div>
					<div>已巡更</div>
				</div>
				<div class="bg-white rounded-md w-[90px] h-[75px] opacity-50 ml-6 text-center">
					<div class="mt-3">6</div>
					<div>未巡更</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'
import { useRouter } from 'vue-router'
// import{} from '@/views/home/index.vue'

const router = useRouter()
const rightClick = () => {
	router.push({ path: '/patrolRecord' })
}
</script>

<style scoped></style>
