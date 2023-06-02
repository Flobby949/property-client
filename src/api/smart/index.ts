import service from '@/utils/http/index'

interface openDoorParam {
	doorId: number
	passWay: number
}

export function getDoorListApi(communityId: number) {
	return service.post('/smart/doorList?communityId=' + communityId)
}

export function openDoorApi(doorId: number) {
	return service.post(`/smart/openDoor?doorId=${doorId}`)
}
