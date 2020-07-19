import React, { Component } from 'react'
// 导入bizcharts   
// 面积图
import { AreaChart, ColumnChart } from 'bizcharts';
// 导入antd 中栅格布局的组件
// row 表示一行
// Col 表示一列
import { Row, Col, Statistic, Progress } from 'antd'
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
    { year: '1991', value: 3 },
    { year: '1992', value: 8 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 7 },
    { year: '1995', value: 13 },
    { year: '1996', value: 6 },
    { year: '1997', value: 6 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
];
const data2 = [
    {
        type: '家具家电',
        sales: 38,
    },
    {
        type: '粮油副食',
        sales: 52,
    },
    {
        type: '生鲜水果',
        sales: 61,
    },
    {
        type: '美容洗护',
        sales: 145,
    },
    {
        type: '母婴用品',
        sales: 48,
    },
    {
        type: '进口食品',
        sales: 38,
    },
    {
        type: '食品饮料',
        sales: 38,
    },
    {
        type: '家庭清洁',
        sales: 38,
    },
];
export default class Analysis extends Component {
    state = {
        loading: false
    }
    componentDidMount() {
        // 请求之前 改成展示
        this.setState({
            loading: true
        })

        setTimeout(() => {
            // 表示数据拿到了
            this.setState({
                loading: false
            })
        }, 2000)
    }
    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col {...firstRowCol}>
                        <Card title={
                            <Statistic title='总销售额' value={112893} prefix={'￥'} />
                        }
                            footer={<span>日销售额 ￥12,423</span>}
                            loading={this.state.loading}  // 表示展示骨架
                        >
                            {/* card的内容 写在子节点的位置 */}
                            <span>周同比 12% <CaretUpOutlined style={{ color: 'red' }} /></span>
                            <span>日同比 10% <CaretDownOutlined style={{ color: 'red' }} /></span>
                        </Card>
                    </Col>

                    <Col {...firstRowCol}>
                        <Card title={
                            <Statistic title='访问量' value={22222} />
                        }
                            footer={<span>日销售额 ￥12,423</span>}
                            loading={this.state.loading}  // 表示展示骨架
                        >
                            {/* card的内容 写在子节点的位置 */}
                            <AreaChart
                                data={data}   // 数据源
                                // title={{
                                //     visible: true,
                                //     text: '面积图',
                                // }}
                                xField='year'   // 表示水平方向展示数据中哪个字段
                                yField='value'  // 表示垂直方向展示数据中哪个字段
                                xAxis={       // 表示水平方向坐标是否展示
                                    {
                                        visible: false
                                    }
                                }
                                yAxis={
                                    {
                                        visible: false
                                    }
                                }
                                smooth={true}  // 表示图表是否曲线展示
                                padding='0'   // 清除默认内边距
                                forceFit={true}   // 自适应容器宽度
                                color={['pink']}  // 控制面积图颜色
                            />

                        </Card>
                    </Col>

                    <Col {...firstRowCol}>
                        <Card title={
                            <Statistic title='总销售额' value={33333} />
                        }
                            footer={<span>转化率 60%</span>}
                            loading={this.state.loading}  // 表示展示骨架
                        >
                            <ColumnChart
                                data={data2}
                                forceFit
                                padding='auto'
                                xField='type'
                                yField='sales'
                                meta={{
                                    type: {
                                        alias: '类别',
                                    },
                                    sales: {
                                        alias: '销售额(万)',
                                    },
                                }}
                                xAxis={
                                    {
                                        visible: false
                                    }
                                }
                                yAxis={
                                    {
                                        visible: false
                                    }
                                }
                                padding='0'
                                forceFit={true}
                            />
                        </Card>
                    </Col>

                    <Col {...firstRowCol}>
                        <Card title={
                            <Statistic title='运营结果' value={44444} />
                        }
                            footer={<span>转换比 69%</span>}
                            loading={this.state.loading}  // 表示展示骨架
                        >
                            <Progress percent={69} strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            status="active"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
