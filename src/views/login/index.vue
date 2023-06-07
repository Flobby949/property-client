<template>
	<div class="login-box">
		<div class="logo">
			<img src="@/assets/log.png" alt="" />
		</div>
		<div class="title">
			<span>智慧管家</span>
		</div>
		<div class="form">
			<van-form @submit="onSubmit">
				<van-cell-group inset>
					<van-field
						v-model="form.phone"
						label="+86>"
						label-width="35"
						name="请输入手机号"
						placeholder="请输入手机号"
						:rules="[
							{ required: true, message: '请填写您的手机号码！' },
							{ pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
						]"
					/>
					<van-field
						v-model="form.password"
						type="password"
						name="请输入密码"
						placeholder="请输入密码"
						:rules="[{ required: true, message: '请输入密码' }]"
					/>
				</van-cell-group>
				<div style="margin: 16px">
					<van-button round block type="primary" native-type="submit"> 提交 </van-button>
				</div>
			</van-form>
		</div>
		<div class="tips">
			<span @click="repassword">忘记密码?</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { showSuccessToast, showFailToast } from 'vant'
import { login } from '@/api/user'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = reactive({
	phone: '15729611641',
	password: '123456'
})

function onSubmit() {
	login(form).then((res: any) => {
		if (res.code != 1) {
			return showFailToast(res.msg)
		}
		showSuccessToast('登录成功')
		localStorage.setItem('accessToken', res.data.accessToken)
		router.push('/')
	})
}

const repassword = () => {
	router.push('/repassword')
}
</script>

<style scoped>
.title {
	padding-top: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.title span {
	font-size: 26px;
	font-weight: 500;
	text-align: center;
}
.form {
	padding: 40px 10px;
}
.tips {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-right: 20px;
	font-size: 14px;
}
.logo {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 20px;
}
.logo img {
	height: 100px;
	width: 100px;
}
</style>
