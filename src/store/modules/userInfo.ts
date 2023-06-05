import { defineStore } from 'pinia'
import {useUserInfoApi} from '@/api/user'

export const userStore = defineStore('userStore', {
    state: () => ({
        user: {
			id: '',
			username: ''
		}
    }),
    actions:{
        // 获取用户信息
		async getUserInfoAction(phone: string) {
			const { data } = await useUserInfoApi(phone)
			console.log(data)
            this.user = data
            
		}
    }
})