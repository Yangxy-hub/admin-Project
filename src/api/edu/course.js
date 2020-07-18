import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

// 获取课程
export function reqGetCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  })
}

// 获取课程分页数据
export function reqGetCourseLimitList({page,limit,teacherId,subjectId,subjectParentId,title}) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET',
    params: {
      page,
      limit,
      teacherId,
      subjectId,
      subjectParentId,
      title
    }
  })
}

