import {GET_COURSE_LIMIT_LIST} from './constant'
import {reqGetCourseLimitList} from '@api/edu/course'
// 定义同步action
function getCourseListSync(data) {
    return {type: GET_COURSE_LIMIT_LIST, data}
}

// 定义异步action
export function getCourseList(data) {
    return dispatch => {
        return reqGetCourseLimitList(data).then(res => {
            dispatch(getCourseListSync(res))
            return res
        })
        
    }
}