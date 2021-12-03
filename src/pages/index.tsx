import React from 'react';
import { Typography, Row, List } from 'antd';
const { Title } = Typography;

import { createClient } from 'contentful';
import PostCard from '../components/PostCard';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CF_SPACE_ID,
    accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN,
  });

  const response = await client.getEntries({
    content_type: 'blogPost',
  });

  return {
    props: {
      blogPosts: response.items,
      revalidate: 1,
    },
  };
}

function BlogPosts({ blogPosts }) {
  return (
    <div>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '95%',
        }}>
        <Title level={2}>Latest Blog Posts</Title>
      </Row>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <List
          dataSource={blogPosts}
          renderItem={(blogPost) => (
            <List.Item>
              <PostCard key={blogPost.sys.id} blogPost={blogPost} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default BlogPosts;
