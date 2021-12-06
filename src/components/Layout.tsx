import React from 'react';
import { Layout, Divider } from 'antd';
import AppHeader from './Header';
import 'antd/dist/antd.css';
const { Content, Footer } = Layout;
import styled from 'styled-components';

const StyledFooter = styled(Footer)`
  background-color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const StyledContent = styled(Content)`
  backgroundcolor: white;
  padding: 0 50px;
`;

const StyledLayout = styled(Layout)`
  backgroundcolor: white;
`;

function PageLayout({ children }) {
  return (
    <StyledLayout className="layout" style={{ backgroundColor: 'white' }}>
      <AppHeader />
      <StyledContent>
        <div className="site-layout-content">
          <Divider />
          {children}
          <Divider />
        </div>
      </StyledContent>
      <StyledFooter>TuringTech Blog ©2021 | Created by Omar Farooq</StyledFooter>
    </StyledLayout>
  );
}

export default PageLayout;
