import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";
// 从 mock 上面获取数据, 所以重新定义一个请求mock
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取一级分类
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  })
}

// 获取二级分类
export function reqGetSecSubjectList(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  })
}

// 添加课程分类
export function reqAddSubjectList(title, parentId) {
  // console.log(title, parentId)
  return request({
    url: `${BASE_URL}/save`,
    method: 'POST',
    data: {
      title, 
      parentId
    }
  })
}

// 更新课程
export function reqUpdateSubjectList(id, title) {
  return request({
    url: `${BASE_URL}/update`,
    method: 'PUT',
    data: {
      id,
      title
    }
  })
}

// 删除课程
export function reqDelSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: 'DELETE'
  })
}