import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function SubjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      return action.data

    case GET_SECSUBJECT_LIST:
      if(action.data.items.length > 0) {
        // console.log(action.data.items.length)
        const parentId = action.data.items[0].parentId
        // console.log(parentId)
        // 遍历一级分类
        prevState.items.forEach(item => {
          // console.log(prevState, item)
          // 找到对应的一级分类
          if(item._id === parentId) {
            // 给一级分类的children 赋值
            item.children = action.data.items
          }
        })
      }
        // 刚才的代码一直在修改原来的数据,redux也是浅层对比
      // 所以要创建一个新的对象
      return {
        ...prevState
      }
    default:
      return prevState;
  }
}
