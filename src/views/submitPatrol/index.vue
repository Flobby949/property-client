<template>
	<div>
		<NavBar :title="title"></NavBar>
	</div>
</template>

<script setup>
import NavBar from '@/components/NavBar/index.vue'
import { ref } from 'vue'
const title = ref('巡更上报')
</script>

<style scoped></style>
