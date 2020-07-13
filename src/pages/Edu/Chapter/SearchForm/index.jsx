import React ,{useEffect, useState} from "react";
import { Form, Select, Button, message } from "antd";
import {reqGetCourseList} from '@api/edu/course'

import { connect } from "react-redux";
import { getChapterList } from '../redux'
import "./index.less";
const { Option } = Select; 


function SearchForm(props) {
  // 定义课程列表的状态
  const [courseList, setCourseList] = useState([])
  const [form] = Form.useForm();

  const resetForm = () => {
    // console.log('执行了')
    form.resetFields(['courseId']);
  };
// 获取课程列表数据  
  useEffect(() => {
    async function fetchData(){
      const res = await reqGetCourseList()
      console.log(res)
      // 给课程列表赋值
      setCourseList(res)
    }
    fetchData()
  },[])

  // 根据课程获取章节列表数据的方法
  const handleGetChaterList = async value => {
    const data = {
      page: 1,
      limit: 10,
      courseId: value.courseId
    }
    await props.getChapterList(data)
    message.success('课程章节列表数据获取成功')
  }
  // handleCourseList =  () => {
  //   // const res =  reqGetCourse()
  //   // console.log(res)
  //   console.log('+1')
  // }
  return (
    <Form layout="inline" form={form} onFinish={handleGetChaterList}>
      <Form.Item name="courseId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
         
        >
          {courseList.map(course => (
            <Option key={course._id} value={course.getChapterList_id}>{course.title}</Option>
          ))}
{/*           
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
export default connect(null, {getChapterList})(SearchForm)

