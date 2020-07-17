import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// 获取课程分类列表
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET"
  })
}


// 获取二级课程分类
// /admin/edu/subject/get/:parentId
export  function reqGetSecSubjectList(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: 'GET'
  })
}

// 更新/修改课程分类title的方法
export function reqUpdateSubject(id, title) {
  return request({
    url: `${BASE_URL}/update`,
    method: 'PUT',
    data: {
      id,
      title,
    }
  })
}

// 删除课程分类
// /admin/edu/subject/remove/:id
export function reqDelSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: 'DELETE'
  })
}

// 添加课程分类
export function reqAddSubjectList(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: 'POST',
    data:{
      title,
      parentId
    }

  })
}

// 获取所有一级课程分类数据
export function reqAllSubjectList() {
  return request({
    url: `${BASE_URL}`,
    methid: 'GET'
  })
}




