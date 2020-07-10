import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";
// 从 mock 上面获取数据, 所以重新定义一个请求mock
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取讲师
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  })
}