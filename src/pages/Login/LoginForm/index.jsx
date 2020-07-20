import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login,mobileLogin} from "@redux/actions/login";

import {reqGetverifyCode} from '@api/acl/oauth'
import "./index.less";

const { TabPane } = Tabs;


function LoginForm (props){
  // 调用useForm  拿到form实例 
  const [form] = Form.useForm()

  const [isShowDownCount, setIsShowDownCount] = useState(false)
  let [downCount, setDownCount] = useState(5)
  const [activeKey, setActiveKey] = useState('user')
  // 登录按钮点击事件的事件处理函数
 const onFinish =  () => {
   // 1.判断当前这个登录按钮， 是用户名密码登录还是手机登录
    if(activeKey === 'user') {
      // 账户密码登录
      // 校验用户名和密码
      form.validateFields(['username', 'password']).then(res => {
        let {username, password} = res
         props.login(username, password).then((token) => {
        // 登录成功
        // console.log("登陆成功~");
        // 持久存储token
        localStorage.setItem("user_token", token);
        props.history.replace("/");
      });
      })
    }else{
      // 手机号登录
       // 校验用户名和密码
       form.validateFields(['phone', 'verify']).then(res => {
        let {phone, verify} = res
         props.mobileLogin(phone, verify).then((token) => {
        // 登录成功
        // console.log("登陆成功~");
        // 持久存储token
        localStorage.setItem("user_token", token);
        props.history.replace("/");
      });
      })

    }
  }
 
// 表单校验的第二种方法
 const validator = (rules, value) => {
    // rules  要校验的是谁   field：password   type: string
    // value 你输入的值
    // console.log(rules, value)
    return new Promise((resolve, reject) => {
      if(!value){
        return  reject('密码不能为空')
          
        }
        if(value.length < 4) {
          return reject('密码不能少于4个字符')
        }
        if(value.length > 16) {
          return reject('密码不能大于16个字符')
        }
        if(!/^[0-9a-zA-Z_]+$/.test(value)) {
          return reject('密码只能是数字字母下划线')
        }
        return resolve()
    })
  }
   // 获取验证码的处理函数
 const getVerifyCode = async() => {
    // 1.手动触发表单的表单校验 只有校验通过了才去执行后续代码
    // 2.调用form实例的validate  
    // validateFields 不传值就是 校验表单所有的表单  传谁校验谁
    // form.validateFields(['phone'])
    // .then(res => {
          // console.log(res)
    // })
    // button获取验证码按钮不是form的表单项  所以获取的不会触发表单验证  需要手动触发表单验证
    const res = await form.validateFields(['phone'])
    // 如果验证不成功 后面就不会执行 成功了 后面代码就可以执行
    // console.log(res)
    // 2.发送请求获取验证码
    // 真实开发中 为了节省开支 不用的时候就注释掉 不要一直发送请求获取验证码
     await reqGetverifyCode(res.phone)

    // 后面代码可以执行说明验证码请求成功了
    // 3.当请求发出去之后 按钮应该展示倒计时 并且倒计时的过程中 按钮不能点击
    setIsShowDownCount(true)
    // 定义一个定时器
   let timeId = setInterval(() => {
      setDownCount(--downCount)
      if(downCount <= 0){
        // 清除定时器
        clearInterval(timeId)
        // 取消按钮禁用
        setIsShowDownCount(false)
        setDownCount(5)
      }
    },1000)
   
  }
  // tab切换触发的事件处理函数
  const handleChange = key => {
    // console.log(key)
    setActiveKey(key)
  }

  const gitOauthLogin = () => {
    
  }


    return (
      <>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // 将form实例和form 关联
          form = {form}
        >
          <Tabs
            defaultActiveKey={activeKey}
            tabBarStyle={{ display: "flex", justifyContent: "center" }}
            // 切换页签的时候触发
            onChange={handleChange}
          >
            <TabPane tab="账户密码登陆" key="user">
              <Form.Item name="username" rules={
                [
                  {
                    required: true,
                    message: '必须输入用户名'
                  },
                  {
                    min: 4,
                    message: '用户名至少四个字符'
                  },
                  {
                    max: 16,
                    message: '用户名不能超过16个字符'
                  },
                  {
                    pattern: /^[0-9a-zA-Z_]+$/,
                    message: '只能输入数字字母下划线'
                  }
                ]
              }>
                <Input
                  prefix={<UserOutlined className="form-icon" />}
                  placeholder="用户名: admin"
                />
              </Form.Item>
              <Form.Item name="password" rules={[{validator: validator}]}>
                <Input
                  prefix={<LockOutlined className="form-icon" />}
                  type="password"
                  placeholder="密码: 111111"
                />
              </Form.Item>
            </TabPane>
            <TabPane tab="手机号登陆" key="phone">
              <Form.Item name="phone" rules={[
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '你输入的不是手机号'
                }
              ]}>
                <Input
                  prefix={<MobileOutlined className="form-icon" />}
                  placeholder="手机号"
                />
              </Form.Item>

              <Row justify="space-between">
                <Col span={16}>
                  <Form.Item name="verify" rules={[
                    {
                      required: true,
                      message: '请输入验证码'
                    },
                    {
                      pattern: /^[\d]{6}$/,
                      message: '请填写正确验证码'
                    }
                  ]}>
                    <Input
                      prefix={<MailOutlined className="form-icon" />}
                      placeholder="验证码"
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Button className="verify-btn" onClick = {getVerifyCode} disabled={isShowDownCount}>{isShowDownCount ? `${downCount}秒后获取` : '获取验证码'}</Button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
          <Row justify="space-between">
            <Col span={7}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登陆</Checkbox>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Button type="link">忘记密码</Button>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              // htmlType="submit"
              className="login-form-button"
              onClick={onFinish}
            >
              登陆
            </Button>
          </Form.Item>
          <Form.Item>
            <Row justify="space-between">
              <Col span={16}>
                <span>
                  其他登陆方式
                  <GithubOutlined className="login-icon" onClick={gitOauthLogin}/>
                  <WechatOutlined className="login-icon" />
                  <QqOutlined className="login-icon" />
                </span>
              </Col>
              <Col span={3}>
                <Button type="link">注册</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </>
    );
  
}

export default  withRouter(connect(null, { login,mobileLogin})(LoginForm))
