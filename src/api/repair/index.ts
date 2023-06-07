import service from '@/utils/http'

export function getRepairPage(data: any) {
	return service.get('/property/repair/page', {
		params: data
	})
}

export function getRepairById(id: any) {
	return service.get('/property/repair/' + id)
}

export function addRepair(dataa: any) {
	return service.post('/property/repair',dataa)
}
