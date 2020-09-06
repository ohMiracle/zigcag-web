import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import '../../../assets/css/index.css'
export default class Login extends React.Component {
  handleSubmit = (e) => {
    const _this = this
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post('/login', values)
          .then(function (response) {
            if (response.data.code === 200) {
              _this.props.history.push({
                pathname: '/app',
                query: { user: response.data.data.user },
              })
            } else {
              message.error(response.data.message)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    })
  }
  render() {
    return (
      <div
        style={{
          margin: 0,
        }}
      >
        <Form
          style={{
            margin: 'auto',
            marginTop: 300,
            padding: 40,
            borderRadius: 10,
          }}
          onSubmit={this.handleSubmit}
          className="login-form"
          initialValues={{ remember: true }}
        >
          <h2 style={{ textAlign: 'center' }}>账号登录</h2>
          <Form.Item
            style={{ width: '100%', marginTop: 30 }}
            name="account"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
            style={{ width: '100%' }}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{
              float: 'left',
              marginLeft: 10,
              marginTop: -5,
              marginBottom: 10,
            }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item style={{ marginLeft: 200, marginTop: -5 }}>
            <a className="login-form-forgot" href="">
              忘记密码？
            </a>
          </Form.Item>
          <Form.Item style={{ width: '100%', marginTop: -20 }}>
            <Button
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
          <div style={{ float: 'left', marginTop: -20 }}>
            <a
              href=""
              onClick={() => {
                //   this.props.history.push('/index')
              }}
            >
              注册账号
            </a>
          </div>
        </Form>
      </div>
    )
  }
}
