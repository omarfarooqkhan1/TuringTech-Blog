import React from 'react';
import { Layout, Divider } from 'antd';
import AppHeader from './Header';
import 'antd/dist/antd.css';
const { Content, Footer } = Layout;
function PageLayout({ children }) {
  return (
    <Layout className="layout" style={{ backgroundColor: 'white' }}>
      <AppHeader />
      <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
        <div className="site-layout-content">
          <Divider />
          {children}
          <Divider />
        </div>
      </Content>
      <Footer
        style={{
          backgroundColor: 'white',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}>
        TuringTech Blog ©2021 | Created by Omar Farooq
      </Footer>
    </Layout>
  );
}

export default PageLayout;
