import {GET_CHAPTER_LIST, GET_LESSON_LIST, BATCH_DEL_LESSON , BATCH_DEL_CHAPTER} from './constant'

const initChapterList = {
    total: 0,
    items: []
}

export default function chapterList(prevState = initChapterList, action) {

    switch (action.type){
        case GET_CHAPTER_LIST:
            // console.log('获取列表函数执行了')
            action.data.items.forEach(item => {
                item.children = []
            })
            return action.data
        case GET_LESSON_LIST:
              // 1. 从返回的数据中， 获取chapterId
              if(action.data.length > 0) {
                const chapterId = action.data[0].chapterId

                prevState.items.forEach(chapter => {
                    if(chapter._id === chapterId) {
                        chapter.children = action.data
                    }
                })
            }
        return {
            ...prevState
        }
        case BATCH_DEL_CHAPTER:
            // 删除指定章节数据
            const chapterIds = action.data
            // 1. 需要知道删除那些action。data就是要删除的章节
            const newChapters = prevState.items.filter(chapter => {
                if(chapterIds.indexOf(chapter._id) > -1) {
                    // 要删除的数据， 包含这一条数据
                    return false
                }
                return true
            })
        return {
            ...prevState,
            items: newChapters
        }

        case BATCH_DEL_LESSON: 
        // 1. 获取所有要删除的课时的ids
            const lessonIds = action.data
            let chapterList = prevState.items
        // 2.遍历章节, 找到章节后， 要遍历章节的children
        chapterList.forEach(chapter => {
            const newChildren = chapter.children.filter(lesson => {
                if(lessonIds.indexOf(lesson._id) > -1) {
                    return false
                }
                return true
            })
             // 给chapter 的children属性重新赋值
         chapter.children = newChildren
        })
 
          return {
              ...prevState,
              items: chapterList
          }
        default:
            return prevState
    }
}