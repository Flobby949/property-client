import service from '@/utils/http'

export function getRepairRecord(data){
    return service.get(`/repair/record/page`,data)
}