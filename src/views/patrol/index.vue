<!-- <template>
	<div style="background-color: #f5f5f5" class="w-screen h-screen">
		<NavBar title="今日巡更" right-title="巡更记录" @ClickRight="rightClick"> </NavBar>

		<div class="rounded-b-[50px] h-[170px] w-[99%] mx-auto flex justify-center items-center" style="background-color: #409eff">
			<div class="flex justify-center items-center mb-10">
				<div class="bg-white rounded-md w-[90px] h-[75px] bg-opacity-50 mr-6 text-center text-white font-bold">
					<div class="mt-2 text-2xl">6</div>
					<div class="">巡更点</div>
				</div>
				<div class="bg-white rounded-md w-[90px] h-[75px] bg-opacity-50 text-center text-white font-bold">
					<div class="mt-2 text-2xl">0</div>
					<div class="">已巡更</div>
				</div>
				<div class="bg-white rounded-md w-[90px] h-[75px] bg-opacity-50 ml-6 text-center text-white font-bold">
					<div class="mt-2 text-2xl">6</div>
					<div class="">未巡更</div>
				</div>
			</div>
		</div>

		<van-list finished-text="没有更多了" text="" class="relative bottom-[46px]">
			<div
				class="border-slate-300 border-[1px] w-[350px] mx-auto rounded-md bg-white h-[150px] mt-2"
				v-for="(item, index) in list.values"
				:key="index"
			>
				<div class="flex mt-5">
					<div class="flex-9 ml-5 text-[17px] text-black font-normal flex-grow mb-1">{{ item.title }}</div>
					<div class="flex-1 relative right-8" v-if="item.status == 0">
						<van-button plain hairline type="primary" round size="small" class="w-[80px] relative bottom-[8px] left-5" style="height: 28px"
							>未巡更</van-button
						>
					</div>

					<div class="flex-1 relative right-8" v-if="item.status == 1">
						<van-button type="primary" round size="small" class="w-[80px] relative bottom-[8px] left-5" style="height: 28px" color="#ad9ea0"
							>已巡更</van-button
						>
					</div>
				</div>
				<div class="border-b border-slate-300 border-dashed"></div>

				<div class="flex mt-3 ml-5">
					<div class="text-slate-400 flex-grow">
						<div class="text-[16px] font-normal" v-if="item.type == 0">巡检类型:巡更点</div>
						<div class="text-[16px] font-normal" v-if="item.type == 1">巡检类型:巡更项目</div>

						<div class="text-[16px] font-normal mt-[2px]">巡检时间：{{ item.startTime }}-{{ item.endTime }}</div>
						<div class="text-[16px] font-normal mt-[1px]">巡检人：{{ item.realname }}</div>
					</div>
					<div v-if="item.status == 0" class="relative right-9">
						<van-button
							type="danger"
							round
							size="small"
							class="w-[80px] relative top-5 left-6 text-[20px]"
							style="height: 28px"
							@click="onSubmit(item)"
							>去巡更</van-button
						>
					</div>
					<div v-if="item.status == 1" class="relative right-9">
						<van-button type="danger" round size="small" class="w-[80px] relative top-5 left-6 text-[20px]" style="height: 28px" color="#5798e3"
							>查看</van-button
						>
					</div>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useTodayList } from '@/api/safe/record'
import { reactive } from 'vue'

const router = useRouter()
const rightClick = () => {
	router.push({ path: '/patrolRecord' })
}
const onSubmit = (item: any) => {
	console.log('你好' + item.title)
	console.log('你好' + item)

	router.push({ path: '/submitPatrol', query: { item: JSON.stringify(item) } })
	// router.push({ path: '/submitPatrol', query: item })
}

const list = <any>reactive([])

const id = reactive({
	inspectorId: 10004,
	page: 1,
	limit: 5
})
const loading = ref(false)
// const finished = ref(false)

const onLoad = () => {
	// 异步更新数据
	// setTimeout 仅做示例，真实场景中一般为 ajax 请求
	setTimeout(() => {
		useTodayList({
			params: {
				...id
			}
		}).then(res => {
			console.log(res)

			console.log('----------------------' + res.data)
			list.values = res.data
			console.log(list.values)
		})
		// 加载状态结束
		loading.value = true
		// 数据全部加载完成
	}, 1000)
}
onLoad()
</script>

<style scoped></style> -->
