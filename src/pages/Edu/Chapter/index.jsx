import React, { Component } from "react";
import { Button, message, Tooltip, Modal, Alert, Table} from "antd";
import Player from 'griffith'
import screenfull from 'screenfull'
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import {getLessonList, batchDelChapter,batchDelLesson } from './redux'

import "./index.less";

dayjs.extend(relativeTime);

@connect(
  state => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList
  }),
  {getLessonList, batchDelChapter, batchDelLesson}
  // { getcourseList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
    video: ''
  };

  // video就是要预览的视频的路径
  showModal = video => () => {
      this.setState({
        previewVisible: true,
        video
      });
  };

  // 函数珂里化
// showModal = video => {
//   return ()=>{
//     this.setState({
//       previewVisible: true,
//       video
//     });
//   }
// }



  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };
  // handleClickExpand  定义的点击展开按钮的事件处理函数
  handleClickExpand = (expand, record) => {
    console.log(expand, record)
    if(expand) {
      console.log(this.props)
      this.props.getLessonList(record._id)
    }
  }

  // 点击跳转到新增课时页面
  handleGoAddLesson = data => () => {
    // console.log(this.props)
    this.props.history.push('/edu/chapter/addlesson',data)
  }

  // 批量删除按钮的事件处理函数 
  handleBatchDel = () => {
    Modal.confirm({
      title: '确定要批量删除吗?',
      onOk:async () => {
        // selectedRowKeys  里面存储的是所以选中的课时
        let chapterIds = []   // 存储选中章节id
        let lessonIds = []  // 存储选中课时id

      // 拿到所以选中的id 
      let selectedRowKeys = this.state.selectedRowKeys
      // 所有的章节数据
      let chapterList = this.props.chapterList.items

      // 遍历找到章节id 
      chapterList.forEach(chapter => {
        // 找到每一条章节id
        let chapterId = chapter._id

        // 如果selectedRowKeys里面有chapterId,就返回这个id对应的下标,否则返回-1
        let index = selectedRowKeys.indexOf(chapterId)
        if(index > -1) {
          // 证明找到了
          let newArr = selectedRowKeys.splice(index, 1)
          chapterIds.push(newArr[0])
        }
      })

      lessonIds = [...selectedRowKeys]

     await this.props.batchDelChapter(chapterIds)
     await this.props.batchDelLesson(lessonIds)

      console.log(chapterIds)
      console.log(selectedRowKeys)

      }
    })
  }

  // 全屏功能
  handlescreenFull = () => {
    // screenfull.request()   // 整个页面全屏 只能打开全屏 按esc 退出全屏
    screenfull.toggle() // 可以展开也可以关闭
  }
  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state;

    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: "视频",
        //  dataIndex: "free",
        render: value => {
          if(!value.free) return 
          return <Button onClick={this.showModal(value.video)}>预览</Button>
        }
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: data => {
          // if ("free" in data) {
            return  (
              <div>
               {data.free === undefined && <Tooltip title="新增课时">
                  <Button type='primary' style={{marginRight: 10}} onClick={this.handleGoAddLesson(data)}>
                    <PlusOutlined />
                  </Button>
                </Tooltip>}
                <Tooltip title={data.free === undefined ? '更新章节' : '更新课时'}>
                  <Button type="primary" style={{marginRight: 10}}>
                    <FormOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title={data.free === undefined ? '更新章节' : '更新课时'}>
                  <Button style={{marginRight: 10}} type="danger">
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </div>
            );
          }
        // },
      },
    ];

    const sources = {
      hd: {
        play_url: this.state.video, //真正需要的属性 , 预览视频的路径
        // 下面这些属性,其实不写也可以,但是会提示这个必须属性,所以为了不展示错误提示,加了这些属性,值随便写就可以
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
      // sd: {
      //   // play_url:
      // }
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }} onClick={this.handleBatchDel}>
                <span >批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn" onClick={this.handlescreenFull}>
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            expandable = {{
              onExpand: this.handleClickExpand
            }}
          />
        </div>

        <Modal
        title = '视频'
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
          footer = {null}
          destroyOnClose = {true}
        >
         <Player
          sources = {sources}
          id = {'2'}
          cover = {'http://localhost:3000/logo512.png'}
          duration = {1000}
         ></Player>
        </Modal>
      </div>
    );
  }
}

export default Chapter;
