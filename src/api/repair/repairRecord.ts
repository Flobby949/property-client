import service from '@/utils/http'

//查看报修处理表
export function getRepairRecord(data){
    return service.get(`/repair/record/page`,data)
}

//查看报修表
export function getRepair(data){
    return service.get(`/repair/repair/page`, data)
}

//根据保修表id查询
export function getRepairById(orderId){
    return service.get(`/repair/repair/`+orderId)
}

//根据保修记录表id查询
export function getRepairRecordById(orderId){
    return service.get(`/repair/record/`+orderId)
}