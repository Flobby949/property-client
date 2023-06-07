import service from '@/utils/http'
import type { promises } from 'node:dns'

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

//上报

export function uploadOrder(uploadForm){
    return service.put('/repair/record',uploadForm)

}

//查询所有用户
export function getUserList(){
    return service.get('/repair/repair/getUser')
}

//分配
export function useallowcation(dataform){
    return service.put('/repair/repair/allowcation',dataform)
}