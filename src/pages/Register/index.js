import React, { useState } from 'react';
import { Form, Input, Select, Checkbox, Button, Card, Modal } from 'antd';
import './Register.css';

import { checkUserRegister, addUserRegister } from '../../utils/localStorage/localStorage';
import { useDispatch } from 'react-redux';

import { GlobalActions } from '../../redux/slices/globalSlice';
import GlobalLoading from '../../components/GlobalLoading';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const Register = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = user => {
    //setIsLoading(true);
    dispatch(GlobalActions.toggleLoading(true));
    setTimeout(() => {
      const isRegistration = checkUserRegister(user.username);
      if (isRegistration) {
        error();
      } else {
        addUserRegister(user);
        props.history.push('/login');
      }
      dispatch(GlobalActions.toggleLoading(false));
    }, 3000);
  };
  const error = () => {
    Modal.error({
      title: 'Register fail!',
      content: 'Username has already exist!'
    });
  };

  return (
    <div className="app-section">
      <div className="container-form">
        <Card title="Register">
          <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                },
                {
                  min: 6,
                  message: 'Please at least 6 character!'
                },
                {
                  max: 10,
                  message: 'Max length is not more than 10!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  min: 6,
                  message: 'Please at least 6 character!'
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  min: 6,
                  message: 'Please at least 6 character!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: 'Please select gender!'
                }
              ]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
                }
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
