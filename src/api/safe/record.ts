import service from '@/utils/http'
export const useTodayList = (dataForm: any ) => {
	return service.get(`/safe/record/overPointNumber` , dataForm)
}

export const useOverNumber=()=>{

    return service.get('/safe/record/overPointNumber')
    
}

export const useNoNumber=()=>{
    return service.get('/safe/record/noPointNumber')
    
}

export const useAllNumber=()=>{
    return service.get('/safe/record/allPointNumber')
    
}

export const useSubmitRecordr=(dataForm: any)=>{
    return service.put(`/safe/record`,dataForm)
    
}