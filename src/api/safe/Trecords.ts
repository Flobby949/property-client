import service from '@/utils/http'
export const useRecordsList = (dataForm: any) => {
	return service.get(`/safe/record2/page`, dataForm)
}

export const getRecordDetail = (id: any) => {
	return service.get('/safe/record2/' + id)
}
