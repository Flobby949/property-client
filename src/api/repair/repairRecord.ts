import service from '@/utils/http'

//查看报修处理表
export function getRepairRecord(data){
    return service.get(`/repair/record/page`,data)
}

//查看报修表
export function getRepair(data){
    return service.get(`/repair/repair/page`, data)
}