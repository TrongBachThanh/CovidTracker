import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input, Button, Checkbox, Card, Modal } from 'antd';
import { UserOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons';

import { checkIsLogin } from '../../redux/slices/checkUserLoginSlice';
import { checkUserLogin } from '../../utils/localStorage/localStorage';

export default function LoginPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = userLogin => {
    setIsLoading(true);
    setTimeout(() => {
      let isLogin = checkUserLogin(userLogin);
      if (isLogin) {
        dispatch(checkIsLogin(true));
        localStorage.setItem('userLogin', JSON.stringify(userLogin));
        setIsLoading(false);
        props.history.push('/global');
      } else {
        error();
        setIsLoading(false);
      }
    }, 3000);
  };
  function error() {
    Modal.error({
      title: 'Login fail!',
      content: 'Username or password is invalid!'
    });
  }
  return (
    <div className="app-section">
      <div className="container-form">
        <Card title="Login">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!'
                }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="#">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
                Log in
              </Button>
              Or <Link to="/signup">register now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
