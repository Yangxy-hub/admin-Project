import {reqGetSubjectList} from '@api/edu/subject'
import {GET_SUBJECT_LIST, UPDATE_SUBJECT, GET_SECSUBJECT_LIST} from './constants'
import { reqUpdateSubject,reqGetSecSubjectList} from '@api/edu/subject'

// 获取一级分类同步actions
const getSubjectListSync = list => ({
    type: GET_SUBJECT_LIST,
    data: list
})

// 获取一级分类异步action
export const getSubjectList = (page, limit) => {
    return dispatch => {
        return reqGetSubjectList(page, limit).then(response => {
            dispatch(getSubjectListSync(response))
            return response
        })
    }
}

// 获取二级分类同步actions
const getSecSubjectListSync = list => ({
    type: GET_SECSUBJECT_LIST,
    data: list
})
// 获取二级分类异步actions
export const getSecSubjectList = parentId => {
    return dispatch => {
        return reqGetSecSubjectList(parentId).then(res => {
            dispatch(getSecSubjectListSync(res))
            return res
        })
    }
}

// 修改课程分类同步actions
const updateSubjectSync = (data)=> ({
    type: UPDATE_SUBJECT,
    data
})

// 修改课程分类异步action
export const updateSubject = (id, title) => {
    // console.log(id, title)
    return dispatch => {
        return reqUpdateSubject(id, title).then(response => {
            // 注意： 这里updateSubjectSync()  接收到的是一个对象 
            dispatch(updateSubjectSync({id, title}))
            return response
        })
    }
}

