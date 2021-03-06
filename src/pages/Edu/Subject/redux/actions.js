import {
  reqGetSubjectList,
  reqGetSecSubjectList,
  reqUpdateSubjectList,
  
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  UPDATE_SUBJECTLIST,
  
} from "./constants";
import { reqDelSubject } from "../../../../api/edu/subject";
/**
 * 获取一级分类列表信息
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubjectList(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response
    });
  };
};

// 获取二级分类
const getSecSubjectListSync = (list) => ({
  type: GET_SECSUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSecSubjectList(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response
    });
  };
};

// 更新课程
const updateSubjectListSync = data => ({
  type: UPDATE_SUBJECTLIST,
  data
})

export const updateSubjectList = (id, title) => {
  return dispatch => {
   return reqUpdateSubjectList(id, title).then(res => {
      dispatch(updateSubjectListSync({id, title}))
      return res
    })
  }
}
