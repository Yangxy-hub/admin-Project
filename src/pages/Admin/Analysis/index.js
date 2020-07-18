import React, { Component } from 'react'
// 导入bizcharts  
import { DonutChart } from 'bizcharts';
// 导入antd 中栅格布局的组件
// row 表示一行
// Col 表示一列
import { Row, Col, Statistic } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

// 导入项目中自己封装的Card组件
import Card from '@comps/Card'
const firstRowCol = {
    // 一共占24格
    xs: { span: 24 },
    md: { span: 12 },
    lg: { span: 6 }
}

// 数据源
const data = [
    {
        type: '分类一',
        value: 27,
    },
    {
        type: '分类二',
        value: 25,
    },
    {
        type: '分类三',
        value: 18,
    },
    {
        type: '分类四',
        value: 15,
    },
    {
        type: '分类五',
        value: 10,
    },
    {
        type: '其它',
        value: 5,
    },
];
export default class Analysis extends Component {
    
    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col {...firstRowCol}>
                        <Card title={
                            <Statistic title='总销售额' value={112893} prefix={'￥'} />
                        }
                            footer={<span>日销售额 ￥12,423</span>}
                        >
                            {/* card的内容 写在子节点的位置 */}
                        
                            <span>周同比 12% <CaretUpOutlined style={{ color: 'red' }} /></span>
                            <span>日同比 10% <CaretDownOutlined style={{ color: 'red' }} /></span>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
