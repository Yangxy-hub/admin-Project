import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button, message } from "antd";
import { connect } from 'react-redux'
// 导入获取所有讲师的方法
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqAllSubjectList, reqGetSecSubjectList } from '@api/edu/subject'
import { getCourseList } from '../redux'

// 导入国际化包
// 页面中不是所有都支持FormattedMessage组件 不支持的地方可以使用useIntl钩子函数
import {FormattedMessage, useIntl} from 'react-intl'
import "./index.less";

const { Option } = Select;

function SearchForm(props) {
  const [form] = Form.useForm();
  // 定义存储讲师列表的状态
  const [teacherList, setTeacherList] = useState([])
  // 定义存储所以一级课程分类的状态
  const [subjectList, setSubjectList] = useState([])

  // 利用useEffect 实现组件挂载获取数据
  useEffect(() => {
    async function fetchData() {
      // 等所有数据响应成功后， 会拿到对应的数据
      const [teachers, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqAllSubjectList()
      ])
      // 获取一级分类数据 重构  由于使用了cascader组件,我们需要将subjectList中的数据结构,改成cascader组件要求的数据结构
      const options = subjectList.map(subject => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false
        }
      })
      setSubjectList(options)
      setTeacherList(teachers)

    }
    fetchData()
  }, [])


  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = async selectedOptions => {
    // 获取一级分类数据
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    // 发送异步请求
    let secSubject = await reqGetSecSubjectList(targetOption.value)

    // 由于cascader组件 对渲染的数据 有格式要求 所以必须将二级分类数据也进行重构
    secSubject = secSubject.items.map(item => {
      return {
        value: item._id,
        label: item.title
      }
    })
    // 让小圆圈隐藏 、 加载效果
    targetOption.loading = false
    // 优化 数据展示 
    if (secSubject.length > 0) {
      // 将二级分类数据添加给一级的children属性
      targetOption.children = secSubject
    } else {
      targetOption.isLeaf = true
    }

    // 更新subject
    setSubjectList([...subjectList])
  }

  const resetForm = () => {
    form.resetFields();
  };

  const finish = async value => {
    // console.log(value)

    // 有可能subject没选 就是undefined
    let subjectId
    let subjectParentId
    if (value.subject && value.subject.length === 1) {
      // 有一级和二级
      subjectId = value.subject[0]
      subjectParentId = 0
    }

    // 请求接口 获取课程分页数据
    const data = {
      page: 1,
      limit: 5,
      title: value.title,
      teacherId: value.teacherId,
      subjectId,
      subjectParentId
    }
    await props.getCourseList(data)
    // 提示
    message.success('课程数据获取成功')
  }
  return (
    <Form layout="inline" form={form} onFinish={finish}>
      <Form.Item name="title" label={<FormattedMessage id= 'title' />}>
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id='teacher' />}>
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(item =>
            (
              <Option key={item._id} value={item._id}>{item.name}</Option>
            )
          )}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id='subject' />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          <FormattedMessage id='searchBtn' />
        </Button>
        <Button onClick={resetForm}><FormattedMessage id= 'resetBtn' /></Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getCourseList })(SearchForm)
