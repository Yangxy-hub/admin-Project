import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// 导入antd 组件
import {Card, Button, Form, Input, Select, message} from 'antd'
// 导入图标
import { ArrowLeftOutlined } from '@ant-design/icons'
// 导入redux 方法
// import {getSubjectList} from '../../redux'

import {reqGetSubjectList, reqAddSubjectList} from '@api/edu/subject'
// 导入样式
import './index.less'
// import { connect } from 'react-redux'

// 获取option组件
const Option = Select.Option

//表单布局属性
const layout = {
    // antd把一个宽度分为24份
    // 表单文字描述部分
    labelCol: {
      span: 3
    },
    // 表单项部分
    wrapperCol: {
      span: 6
    }
  }


// @connect(state => ({subjectList: state.SubjectList}), {getSubjectList})
class addSubject extends Component {
  state = {
    subjectList: {
      total: 0,
      items: []
    }
  }
  // 加载时获取
  page = 1
   async componentDidMount() {
      // 组件挂载成功， 立刻发送请求获取一级课程列表数据
        // this.props.getSubjectList(1, 10)
        const res = await reqGetSubjectList(this.page++, 10)
        this.setState({
          subjectList: res
        })
    }

    // 加载更多一级课程分类数据
    handleloadMore = async() => {
      const res = await reqGetSubjectList(this.page++, 10)
      // 获取原来的数据 
      // this.state.subject.items 
      // 新的数据和老的数据拼接 
      const newItems = [...this.state.subjectList.items, ...res.items]
      this.setState({ 
        subjectList: { 
          total: res.total, 
          items: newItems
        }
      })
    }

    // 点击添加按钮， 表单效验成功之后的回调函数
    onFinish = async values => {
      console.log('添加任务进来了')
      // console.log(values)
      try {
        console.log('建立了')
        // 发送请求新增课程分类
      await reqAddSubjectList(values.subjectname, values.parentid)
      // console.log(res)
        console.log( values)
        
        message.success('课程分类添加成功')
        // 跳回到subjectList 页面
        this.props.history.push('/edu/subject/list')
      }catch {

        message.error('课程分类添加失败')
      }
    }
    render() {
        return (
          <Card  title={
            <>
            <Link to='/edu/subject/list'><ArrowLeftOutlined /></Link>
            <span className='add-subject'>新增课程</span>
            </>
        }>
        <Form
          // 给表单中的表单项布局
          {...layout}
          name='subject'
          // 当点击表单内的提交按钮,onFinish会触发
          onFinish={this.onFinish}
          // // 提交失败的时候会触发
          // onFinishFailed={onFinishFailed}
        >
          {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
          <Form.Item
            // 表示提示文字
            label='课程分类名称'
            // 表单项提交时的属性
            name='subjectname'
            // 校验规则
            rules={[
              {
                required: true,
                // 校验不通过时的提示文字
                message: '请输入课程分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='父级分类id'
            name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}
          >
            <Select
               /* // 自定义下拉列表中展示内 */
               dropdownRender = {menu => {
                return (
                  <>
                  {menu}
                  {this.state.subjectList.total >
                  this.state.subjectList.items.length && (
                    <Button type='link' onClick={this.handleloadMore}>加载更多数据</Button>
                  )}
                  </>
                )
              }}          
            >
              <Option value={0} key={0}>{'一级菜单'}</Option>
              {this.state.subjectList.items.map(subject => {
               return (<Option value={subject._id} key={subject._id}>{subject.title}</Option>)
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            {/* htmlType表示这个按钮是表单内的提交按钮 */}
            <Button type='primary' htmlType='submit'>
              添加
            </Button>
          </Form.Item>
        </Form>
        </Card>
        )
    }
}
export default  addSubject
