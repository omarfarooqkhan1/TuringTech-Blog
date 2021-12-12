import * as React from 'react';
import { Form, Input, Alert } from 'antd';
import Button from 'components/Button';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { createClient } from 'contentful';
import router from 'next/router';
import { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoginPage: NextPage = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  }

  const login = async (event) => {
    event.preventDefault();
    const client = createClient({
        space: process.env.CF_SPACE_ID,
        accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
    });

    const response = await client.getEntries({
        content_type: 'author',
        'fields.username': username,
        'fields.password': password
    });

    if(response.items[0]){
        localStorage.setItem(
            "username",
            JSON.stringify(username)
            );
        router.push('/');
    }
    else {
      toggleAlert();
    }
  }

  return (
    <Container>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            type="password"
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot Password?
          </a>
        </Form.Item>
        { showAlert ?
          <Alert
            message="Error!"
            description="Username or password is invalid!"
            type="error"
            closable
            showIcon
            onClose={toggleAlert}
          /> : <></>}
        <Form.Item>
          <a>
            <Button primary className="login-form-button" onClick={login}>
              Log in
            </Button>
          </a>
          Or <a href="">Register Now!</a>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default LoginPage;