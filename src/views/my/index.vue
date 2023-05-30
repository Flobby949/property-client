<template>
	<smartinput title="车位编号">
		<van-switch />
	</smartinput>
	<smarticon :list="myiconList" />
	<smartitem :list="myList" />
	<template v-for="(item, index) in list" :key="index">
		<smartlistitem :name="item.name" :title="item.title" />
	</template>
	<div>我的</div>
</template>

<script setup lang="ts">
import smartinput from '@/components/smart-input/index.vue'
import smarticon from '@/components/smart-icon/index.vue'
import smartitem from '@/components/smart-item/index.vue'
import smartlistitem from '@/components/smart-list-item/index.vue'
const myiconList = [
	{
		name: 'chat-o',
		title: '我的消息',
		color: '#fbbd08'
	},
	{
		name: 'friends-o',
		title: '我的好友',
		color: '#38f'
	},
	{
		name: 'setting-o',
		title: '设置',
		color: '#ff4949'
	},
	{
		name: 'chat-o',
		title: '我的消息',
		color: '#fbbd08'
	},
	{
		name: 'friends-o',
		title: '我的好友',
		color: '#38f'
	},
	{
		name: 'setting-o',
		title: '设置',
		color: '#ff4949'
	}
]
const myList = [
	{
		name: 'chat-o',
		title: '我的消息',
		color: '#fbbd08'
	},
	{
		name: 'friends-o',
		title: '我的好友',
		color: '#38f'
	},
	{
		name: 'setting-o',
		title: '设置',
		color: '#ff4949'
	},
	{
		name: 'chat-o',
		title: '我的消息',
		color: '#fbbd08'
	},
	{
		name: 'friends-o',
		title: '我的好友',
		color: '#38f'
	},
	{
		name: 'setting-o',
		title: '设置',
		color: '#ff4949'
	}
]
const list = [
	{
		name: 'chat-o',
		title: '我的消息'
	},
	{
		name: 'friends-o',
		title: '我的好友'
	},
	{
		name: 'setting-o',
		title: '设置'
	}
]
</script>

<style scoped></style>
