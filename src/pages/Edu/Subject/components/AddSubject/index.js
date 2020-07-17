import React, { Component } from 'react'
// 导入antd组件和相关图标
import { Card, Form, Input, Select, message, Button} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
// 导入Link
import { Link } from 'react-router-dom'
// 导入api
import { reqGetSubjectList, reqAddSubjectList } from '@api/edu/subject'
// 导入样式
import './index.less'

const Option = Select.Option
// 表单属性
const layout = {
    // antd 把一个宽度分为24份
    labelCol: {
        span: 3
    },
    // 表单项部分
    wrapperCol: {
        span: 6
    }
}
class AddSubject extends Component {
    state = {
        subjectList: {
            total: 0,
            items: []
        }
    }
    // 用来存储下一次请求的页数
    page = 1
    async componentDidMount(){
        // 请求数据
        const res = await reqGetSubjectList(this.page++, 10)
        console.log(res)
        this.setState({
            subjectList: res
        })
    }

    // 加载更多一级分裂数据
    handleloadMore = async () => {
        const res  = await reqGetSubjectList(this.page++, 10)
        // 获取原来的数据  新的数据和原来的数据拼接
        const newItems = [...this.state.subjectList.items, ...res.items]
        this.setState({
            subjectList: {
                total: res.total,
                items: newItems
            }
        })
    }

    // 点击添加按钮  表单效验成功之后的回调函数
    onFinish = async values => {
        try {
            await reqAddSubjectList(values.subjectname, values.parentid)
            // 提示
            message.success('课程分类添加成功')
            // 跳转到subjectList界面
            this.props.history.push('/edu/subject/list')
        }catch {
            message.error('课程分类添加失败')
        }
    }
    render() {
        return (
            <Card title={
                <>
                    <Link to='/edu/subject/list'>
                        <ArrowLeftOutlined />
                    </Link>
                    <span className='add-subject'>新增课程</span>
                </>
            }>
                <Form
                    // 给表单中的表单项布局
                    {...layout}
                    name='subject'
                    // 当点击表单项的提交按钮, onFinish会触发
                    onFinish={this.onFinish}
                >
                    {/* // 表单项 */}
                    <Form.Item
                        label='课程分类名称'
                        // 表单项提交时的属性
                        name='subjectname'
                        // 效验规则
                        rules={[
                            {
                                required: true,
                                // 效验不通过时的提示文字
                                message: '请输入课程分类！'
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
                            // 自定义下拉列表中展示的内容
                            dropdownRender={menu => {
                                return (
                                    <>
                                        {/* 表示把我们写在子节点位置的option渲染到这里 */}
                                        {menu}
                                        {/* 如果total的值 比items的长度大 说明还有数据 */}
                                        {this.state.subjectList.total > this.state.subjectList.items.length && (<Button type='link' onClick={this.handleloadMore}>加载更多数据</Button>)}
                                    </>
                                )
                            }}
                        >
                            <Option value={0} key={0}>
                                {'一级课程分类'}
                            </Option>
                            {/* 根据拿到一级分类课程分类 动态渲染 */}
                            {this.state.subjectList.items.map(subject => {
                                return (
                                    <Option value={subject._id} key={subject._id}>
                                        {subject.title}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            添加
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        )
    }
}
export default AddSubject
