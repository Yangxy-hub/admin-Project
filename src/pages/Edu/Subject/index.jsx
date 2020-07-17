import React, { Component } from 'react'
import { Button, Table, Tooltip, Input, message, Modal} from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

// 导入connect 
import { connect } from 'react-redux'
// 导入redux 的异步action
import { getSubjectList, updateSubject, getSecSubjectList } from './redux'
// 导入删除课程的api
import { reqDelSubject } from '@api/edu/subject'
// 导入样式
import './index.less'

const {confirm} = Modal
@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList, updateSubject, getSecSubjectList }
)
class Subject extends Component {
  // 给当前组件实例添加currentPage 属性 表示当前第几页
  currentPage = 1
  pageSize = 10

  state = {
    // subjectId作用:
    // 1.如果subjectId 没有表示表格每一行直接展示课程分类的title， 如果有值(应该就是要修改的id),就展示input
    // 2.修改数据需要subjectid
    subjectId: '',
    subjectTitle: ''   // 用于设置受控组件
  }
  // 组件挂载时调用方法获取数据
  componentDidMount() {
    this.props.getSubjectList(1, 10)
  }
  // 点击页码， 获取对应页的数据
  handlePageChange =(page, pageSize) => {
    console.log(page, pageSize)
    // page 当前第几页  pageSize  当前页有几条数据
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }
  // 一页展示几条数据变化时触发的回调函数
  handleSizeChange = (current, size) => {
    // console.log(current, size)
    this.props.getSubjectList(current, size)
    // 动态给currentPage赋值, 抱住当前高亮的页码和获取的页码数据保持一致
    this.currentPage = current
    this.pageSize = size
  }

  // 更新事件的处理函数
  handleUpdateClick = value => () => {
    // 修改subjectId
    this.setState({
      subjectId: value._id,
      subjectTitle: value.title
    })
    // 存储一下老的subjectTitle
    this.oldSubjecTitle = value.title
  }

  // input框触发的事件处理函数
  handleTitleChange = e => {
    this.setState({
      subjectTitle: e.target.value.trim()
    })
  }

  // 更新取消按钮的事件处理函数
  handleCancle = () => {
    this.setState({
      subjectId: '',
      subjectTitle: ''
    })
  }
  // 更新确认按钮的事件处理函数
  handleUpdate = async () => {
    let { subjectId, subjectTitle } = this.state

    // 1.如果用户输入的是空字符串， 就不执行后面的操作
    if (subjectTitle.length === 0) {
      message.error('课程分类名称不能为空')
      return
    }
    // 2.如果用户输入的内容和原来的内容相同,则不执行后面的操作
    if (this.oldSubjecTitle === subjectTitle) {
      message.error('课程分类名称不能和之前的相同')
      return
    }
    console.log(subjectId, subjectTitle)
    await this.props.updateSubject(subjectId, subjectTitle)
    message.success('更改成功')

    // 手动调用取消按钮的事件处理函数, 让表格行展示内容
    this.handleCancle()
  }

  // 点击展开按钮触发的事件处理函数
  handleClickExpand = (expanded, record) => {
    // console.log(expanded, record)
    if (expanded) {
      // 请求二级菜单数据
      // 需要传入parentId
      this.props.getSecSubjectList(record._id)
    }
  }

  // 点击删除按钮的事件处理函数
  handleDel = value => () => {
    confirm({
      title: (
        <>
          <div>
            确定要删除<span style={{ color: 'pink', fontSize: 24 }}>{value.title}</span>
            吗?
          </div>
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        // 真正去删除这条数据
        await reqDelSubject(value._id)
        message.success('删除成功了')

        //  this.props.subjectList.total 表示所有数据
        //  this.pageSize 表示一页有多少条数据
        // totalPage 表示有多少页
        // currentPage  表示当前页
        const totalPage = Math.ceil(
          this.props.subjectList.total / this.pageSize)

        if (
          this.currentPage !== 1 &&
          this.props.subjectList.items.length === 1 &&
          totalPage === this.this.currentPage
        ) {
          console.log(111)
          this.props.getSubjectList(--this.currentPage, this.pageSize)
        }
        this.props.getSubjectList(this.currentPage, this.pageSize)
      }
    })
  }

  // 点击新建跳转新建页面
  handleGoAddSubject = () => {
    this.props.history.push('/edu/subject/add')
  }
  render() {
    const columns = [
      {
        title: '分类名称',
        key: 'title',
        render: value => {
          // subjectId就是我设置的id值，点击更新按钮是将value._id赋值给了subjectId
          // 只要他们值相同说明点击了更新按钮  则渲染出input框
          if (this.state.subjectId === value._id) {
            return (
              <Input value={this.state.subjectTitle} className='subject-input' onChange={this.handleTitleChange}></Input>
            )
          }
          return <span >{value.title}</span>
        }
      },

      {
        title: '操作',
        dataIndex: '',    // 表示这一列不渲染data里的数据
        key: 'x',
        // 自定义这一列要渲染的内容
        render: value => {

          if (this.state.subjectId === value._id) {
            // 说明点击了更新按钮  渲染确认和取消按钮  
            return (
              <>
                <Button type='primary' className='update-btn' onClick={this.handleUpdate}>确认</Button>
                <Button type='danger' onClick={this.handleCancle}>取消</Button>
              </>
            )
          }

          return (
            <>
              <Tooltip title='更新课程分类'>
                <Button type='primary' className='update-btn' onClick={this.handleUpdateClick(value)}><FormOutlined /></Button>
              </Tooltip>
              <Tooltip title='删除课程分类'>
                <Button type='danger' onClick={this.handleDel(value)}><DeleteOutlined /></Button>
              </Tooltip>
            </>
          )

        },
        // 设置这一列的宽度
        width: 200
      },
    ]
   
    return (
      <div className='subject'>
        <Button type='primary' className='subject-btn' onClick={this.handleGoAddSubject} onClick={this.handleGoAddSubject}>
          <PlusOutlined />
          新建
        </Button>
        <Table
          // 控制列
          columns={columns}
          
          // 控制可展开项
          expandable={{
            // 使用这个属性会把二级菜单数据渲染到一级菜单数据
            // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            // 点击展开按钮的事件处理函数
            onExpand: this.handleClickExpand
          }}
          // 表示里面的数据 
          dataSource={this.props.subjectList.items}
          // 告诉table组件,使用数据中的_id 作为key的值
          rowKey='_id'
          pagination={{
            total: this.props.subjectList.total,   // total表示数据总数
            showQuickJumper: true,  // 是否显示快速跳转
            showSizeChanger: true,  // 显示是否修改每页显示修改每页显示数据数量
            pageSizeOptions: ['5', '10', '15'],  // 设置每天显示数据数量的配置项
            // defaultPageSize: 10, // 每页默认显示数据条数  默认10
            onChange: this.handlePageChange,
            onShowSizeChange: this.handleSizeChange,
            current: this.currentPage
          }}

        />
      </div>
    )
  }
}
export default Subject

