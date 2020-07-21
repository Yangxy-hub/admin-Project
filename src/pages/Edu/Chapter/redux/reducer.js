import {GET_CHAPTER_LIST} from './contant'

export default function chapterList(prevState = initChapterList, action) {
    switch (action.type) {
        case GET_CHAPTER_LIST:
            action.data.items.forEach(item => {
                item.children = []
            })
            return action.data
        default:
            return prevState
    }
}