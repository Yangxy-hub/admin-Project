import {GET_SUBJECT_LIST, UPDATE_SUBJECT, GET_SECSUBJECT_LIST} from './constants'
const initSubjectList = {
    total: 0,   // 总数
    items: []   // 详细user数据
}
export default function subjectList(prevState = initSubjectList, action) {
    switch (action.type) {
        case GET_SUBJECT_LIST:
            // 为了实现展示二级课程分类，需要给items中的每一个数据添加children属性
            action.data.items.forEach(item => {
                item.children = []
            })
            return action.data
        case GET_SECSUBJECT_LIST:
            // 把二级分类数据，添加到对应的一级分类数据的children属性上面
            // 1.获取一级分类id,需要先知道把这个数据添加到哪个一级上面
            // 如果没有二级分类数据 不执行后面代码
            if(action.data.items.length > 0) {
                const parentId = action.data.items[0].parentId

                 // 2.找到对应的一级分类数据
                prevState.items.forEach(item => {
                    // 找到对应的一级分类
                    if(item._id === parentId) {
                        // 给一级分类的children赋值
                        item.children = action.data.items
                    }
                })
            } 
            return {
                ...prevState
            }  

           
        case UPDATE_SUBJECT:
            // 1.遍历prevState 是个对象 items 中存储了所以的数据
            // 注意修改的课程分类有可能是一级的有可能是二级的
            prevState.items.forEach(subject => {
                // console.log(prevState.items)
                // console.log(action.data)
                // 传过来的id 是不是一级课程分类
                if(subject._id === action.data.id) {
                    console.log(subject._id, action.data.id)
                    // 修改title 然后return掉
                    subject.title = action.data.title
                    return
                }

                // 遍历这个一级课程分类下面的二级课程分类
                subject.children.forEach(secSubject => {
                    if(secSubject._id === action.data.id) {
                        secSubject.title = action.data.title
                    }
                })
            })

            return {
                ...prevState
            }
        default:
            return prevState
    }
} 