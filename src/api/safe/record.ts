import service from '@/utils/http'
export const useTodayList = (id: any ) => {
	return service.get('/safe/record/page', id)
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

export const useSubmitRecord=(dataForm: any)=>{
    return service.put(`/safe/record`,dataForm)
    
}