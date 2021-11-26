import React from 'react';
import { Layout, Image } from 'antd';
import "antd/dist/antd.css";
const { Header, Content, Footer } = Layout;
function PageLayout({ children }) {
  return (
    <Layout className="layout">
      <Header style={{ height: '120px', backgroundColor: 'white' }}>
        <Image width={200} src="/images/logo.png" preview={false} style={{ alignSelf: 'center' }}/>
      </Header>
      <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
        <div className="site-layout-content">
          { children }
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        TuringTech Blog ©2021 | Created by Omar Farooq
      </Footer>
    </Layout>
  );
}

export default PageLayout;
