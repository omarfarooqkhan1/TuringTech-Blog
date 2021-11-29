import React from 'react';
import { Image, Row, Col, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

function AppHeader() {
  return (
    <Row
      style={{
        display: 'flex',
        alignSelf: 'center',
        alignItems: 'space-around',
        backgroundColor: 'white',
        width: '95%',
      }}>
      <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image width={200} src="/images/logo.png" preview={false} style={{ alignSelf: 'center' }} />
      </Col>
      <Col
        span={6}
        offset={5}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
        <Input
          size="large"
          addonAfter={<SendOutlined style={{ color: '#01696E' }} />}
          placeholder="Subscribe to our Blog!"
        />
      </Col>
      <Col
        span={6}
        offset={1}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
        <Button
          size="large"
          style={{
            color: '#01696E',
            borderColor: '#01696E',
            borderWidth: 2,
            fontWeight: 'bold',
            borderRadius: 5,
          }}>
          Get Started
        </Button>
      </Col>
    </Row>
  );
}

export default AppHeader;
