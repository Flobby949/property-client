import axios from 'axios'

const service = axios.create({
	baseURL: 'http://localhost:8080',
	timeout: 5000
})

service.interceptors.request.use(
	data => {
		return data
	},
	err => {
		return Promise.reject(err)
	}
)

service.interceptors.response.use(
	responese => {
		return responese.data
	},
	err => {
		return Promise.reject(err)
	}
)

export default service
