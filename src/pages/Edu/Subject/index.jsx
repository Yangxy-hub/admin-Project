import React, { Component } from 'react'
import {Button, Table} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import './index.less'
export default class Subject extends Component {
  render() {
    return (
      <div className= 'subject'>
        <Button type='primary' className='subject-btn' onClick={this.handleGoAddSubject}>
          <PlusOutlined />
          新建
        </Button>

        <Table>
            
        </Table>

        
      </div>
    )
  }
}

