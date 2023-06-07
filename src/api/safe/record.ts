import service from '@/utils/http'
export const useTodayList = (id: any) => {
	return service.get('/safe/record/page', id)
}

export const useOverNumber = (inspectorId: any) => {
	return service.get('/safe/record/overPointNumber/' + inspectorId)
}

export const useNoNumber = (inspectorId: any) => {
	return service.get('/safe/record/noPointNumber/' + inspectorId)
}

export const useAllNumber = (inspectorId: any) => {
	return service.get('/safe/record/allPointNumber/' + inspectorId)
}

export const useSubmitRecord = (dataForm: any) => {
	return service.put(`/safe/record`, dataForm)
}

export const useUploadImage = (url: any, file: any) => {
	return service.post(url, file)
}

export function uploadFile(data:any){
	return service.post('/safe/record/upload', data)
}

