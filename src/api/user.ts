import service from '@/utils/http'

// 登录
export function login(data: any) {
	return service.post('/auth/login', data)
}

// 发送短信
export function sendSms(phone: string) {
	return service.post('/auth/sendCode?phone=' + phone)
}

// 忘记密码
export function forget(data: any) {
	return service.post('/auth/repassword', data)
}

//获取用户信息
export function useUserInfoApi(phone : string){
	return service.get('/auth/info', {params:{phone: phone}})
}
