import React, { Component } from 'react'
// 导入antd组件
import { Button, Table, Tooltip, Input} from 'antd'
// 导入antd-图标
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'

// 引入redux 中的代码
import {getSubjectList, getSecSubjectList} from './redux'
// 导入定义的发送请求的方法
// import {reqGetSubjectList} from '@api/edu/subject'

//导入样式文件
import './index.less'
import { connect } from 'react-redux'

@connect(state => ({subjectList: state.SubjectList}),{getSubjectList,getSecSubjectList})

class Subject extends Component {
   currentPage = 1
    state = {
      // 1.  如果subjectId 没有表示表格每一行直接展示课程分类的title, 如果有值(就是要修改数据的id ) 就展示input 
      // 2. 修改数据需要subjectid
      subjectId: '',
      subjectTitle: ''
    }
  componentDidMount() {
    // this.getSubjectList(1, 10)
    this.props.getSubjectList(1, 10)

  }

  handlePageChange = (page, pageSize) => {
    // this.getSubjectList(page, pageSize)
    this.currentPage = page
    this.props.getSubjectList(page, pageSize)
  }

  handleSizeChange = (current, size) => {
    // this.getSubjectList(current, size)
    this.currentPage = current
    this.props.getSubjectList(current, size)
  }

  handleAddSubject = () => {
    this.props.history.push('/Edu/subject/add')
  }

  handleClickExpand = (expanded, record) => {
    // console.log(expanded, record)
    if(expanded){
      this.props.getSecSubjectList(record._id)
    }
  }

  // 点击更新按钮的事件处理函数
  handleUpdateClick = value => {
    // 修改subjectid
    return () => {
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title
      })
    }
  }
  // 修改数据时， 受控组件input 的change回调函数
  handleTitleChange = e => {
    this.setState({
      subjectTitle: e.target.value
    })
  }

  render() {
    // console.log(this.props)
    // console.log(this.props.subjectList)
    const columns = [
      {
        title: '分类名称',
        key: 'title',
        render: value => {
          // console.log(this.state.subjectId)
          if(this.state.subjectId === value._id) {
            return (
              <Input
                value = {this.state.subjectTitle}
                className = 'subject-input'
                onChange={this.handleTitleChange}
              ></Input>
            )
          }
          // console.log(value.title)
        return <span>{value.title}</span>
        }
      },

      {
        title: '操作',
        dataIndex: '',   // 表示这一列不渲染data里的数据
        key: 'x',
        // 自定义这一列要渲染的内容
        render: value => {
          // console.log(value, this.state)
          // 判断当前数据的id 是否和state 里面的subjectId 的值是相同的， 如果相同， 展示确认和取消按钮， 否则展示修改和删除按钮
          if(this.state.subjectId === value._id) {
            return (
              <>
                <Button type='primary' className='update-btn'>
                  确认
                </Button>
                <Button type='danger'>取消</Button>
              </>
            )
          }

          return (
            <>
            <Tooltip title='更新课程分类'>
              <Button type='primary' className='update-btn' onClick={this.handleUpdateClick(value)}>
              <FormOutlined/>
              </Button>
            </Tooltip>
            <Tooltip title='删除课程分类'>
              <Button type='danger'>
                <DeleteOutlined />
              </Button>
            </Tooltip>
            </>
          )
        },
        // 设置这一列的宽度
        width: 200
      }
    ]
    return (
      <div className='subject'>
        <Button type='primary' className='subject-btn' onClick={this.handleAddSubject}>
          <PlusOutlined />
          新建
        </Button>
        <Table
          // 控制列
          columns={columns}
          // 控制可展开项
          expandable={{
            onExpand: this.handleClickExpand
          }}
          //表示里面的数据
          dataSource={this.props.subjectList.items}
          
          rowKey='_id'
          pagination={{
            total: this.props.subjectList.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions:['3','5','10'], //设置每天显示数据数量的配置项
            // defaultPageSize: 5, //每页默认显示数据条数 默认是10,
            onChange: this.handlePageChange, //页码改变的时候触发,
            onShowSizeChange: this.handleSizeChange, //一页展示几条数据变化时触发 current 当前页码, size 一页几条
            current: this.currentPage
         }}
        />
      </div>
    )
  }
}
export default Subject
