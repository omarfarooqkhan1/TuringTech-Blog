import React from 'react';
import { Typography, Row, List } from 'antd';
const { Title } = Typography;
import { createClient } from 'contentful';
import PostCard from '../components/PostCard';
import styled from 'styled-components';

const Heading = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 95%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

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
    <>
      <Heading>
        <Title level={2}>Latest Blog Posts</Title>
      </Heading>
      <Section>
        <List
          dataSource={blogPosts}
          renderItem={(blogPost) => (
            <List.Item>
              <PostCard key={blogPost.sys.id} blogPost={blogPost} />
            </List.Item>
          )}
        />
      </Section>
    </>
  );
}

export default BlogPosts;
