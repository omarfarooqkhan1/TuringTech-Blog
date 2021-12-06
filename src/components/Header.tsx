import React from 'react';
import { Image, Row, Col, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Button from 'components/Button';

const StyledRow = styled(Row)`
  display: flex;
  align-self: center;
  align-items: space-around;
  background-styledcolor: white;
  width: 95%;
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2;
`;

function AppHeader() {
  return (
    <StyledRow>
      <StyledCol span={6}>
        <Image width={200} src="/images/logo.png" preview={false} style={{ alignSelf: 'center' }} />
      </StyledCol>
      <StyledCol span={6} offset={5}>
        <Input
          size="large"
          addonAfter={<SendOutlined style={{ color: '#01696E' }} />}
          placeholder="Subscribe to our Blog!"
        />
      </StyledCol>
      <StyledCol span={6} offset={1}>
        <Button>Get Started</Button>
      </StyledCol>
    </StyledRow>
  );
}

export default AppHeader;
