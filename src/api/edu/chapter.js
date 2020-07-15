import request from '@utils/request'

// 请求路径不写主机名， 会将这个路劲和package.js中配置的代理proxy的主机名进行拼接
const BASE_URL = '/admin/edu/chapter'

// 获取所有课程数据
export function reqGetChaterList({page, limit,courseId}) {
    return request({
        url: `${BASE_URL}/${page}/${limit}`,
        method: 'GET',
        params: {
            courseId
        }
    })
}

// 删除章节数据
// /admin/edu/chapter/batchRemove
export function reqBatchDelChapter (chapterIds) {
    return request ({
        url: `${BASE_URL}/batchRemove`,
        method: 'DELETE',
        data: {
           idList: chapterIds
        }
    })
}