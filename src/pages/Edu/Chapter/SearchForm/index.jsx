import React, {useState,useEffect} from "react";
import { Form, Select, Button } from "antd";

import { reqGetCourseList } from '@api/edu/course'
import { getChapterList } from '../redux'

import "./index.less";

const { Option } = Select;

// 注意： 函数组件不能使用修饰器语法
function SearchForm() {
  //  定义课程列表的状态
  const [conrseList, setCourseList] = useState([])

  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields(['courseId']);
  }

  // 利用useEffect 实现组件挂载成功获取数据
  useEffect(() => {
    // 模拟类组件的componentDidMount
    // useEffect 的回调函数不允许是一个异步函数，所以，在回调函数中重新定义一个异步函数
    async function fetchData() {
      const res = await reqGetCourseList()
      console.log(res)
      // 给课程列表状态赋值
      setCourseList(res)
    }
    fetchData()
  },[])

  return (
    <Form layout="inline" form={form}>
      <Form.Item name="teacherId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {conrseList.map(course => (
            <Option value={course._id} key={course._id}>{course.title}</Option>
          ))}
          {/* <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
