import React from 'react';
import { Image, Row, Col, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Button from 'components/Button';
import Link from 'next/link';
import router from 'next/router';

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

  const [userState, setUserState] = React.useState('Login');
  
  React.useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    if(username){
      setUserState('Logout');
    }
  });

  const loginHandler = () => {
    if(userState === 'Logout'){
      setUserState('Login');
      localStorage.removeItem("username");
      router.push('/');
    }
    else {
      router.push('/login');
    }
  };

  return (
    <StyledRow>
      <StyledCol span={6}>
        <Link href="/">
          <a>
            <Image
              width={200}
              src="/images/logo.png"
              preview={false}
              style={{ alignSelf: 'center' }}
            />
          </a>
        </Link>
      </StyledCol>
      <StyledCol span={6} offset={5}>
        <Input
          size="large"
          addonAfter={<SendOutlined style={{ color: '#01696E' }} />}
          placeholder="Subscribe to our Blog!"
        />
      </StyledCol>
      <StyledCol span={6} offset={1}>
          <a>
            <Button primary={false} onClick={loginHandler}>{userState}</Button>
          </a>
      </StyledCol>
    </StyledRow>
  );
}

export default AppHeader;
